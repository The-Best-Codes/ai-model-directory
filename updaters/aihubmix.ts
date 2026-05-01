import Decimal from "decimal.js";

import type { Modality, ProviderModel } from "../schema.ts";
import type { ProgressReporter } from "../progress.ts";
import { compact } from "./_lib.ts";

export const outputDirectory = "data/providers/aihubmix/models";

// AIHubMix /v1/models types
type ApiModel = {
  id: string;
  object: string;
  created: number;
  owned_by: string;
};

type ApiResponse = {
  data: ApiModel[];
};

// AIHubMix /call/mdl_info_pagination types (just what we use)
type PaginationModel = {
  model: string;
  developer?: string;
  desc?: string;
  desc_en?: string;
  features?: string;
  modalities?: string;
  context_window?: number;
  model_ratio?: number;
  completion_ratio?: number;
  cache_ratio?: number;
  display_input?: string;
  display_output?: string;
  img_price_config?: string;
};

type PaginationResponse = {
  data: PaginationModel[];
  total: number;
  message?: string;
  success?: boolean;
};

const PAGE_SIZE = 100;

// AIHubMix uses the OneAPI/NewAPI billing convention where token prices are
// derived from `model_ratio` against a base of $0.002 / 1K tokens
// (i.e. $2.00 / 1M tokens).
const PRICE_BASE_PER_MILLION = new Decimal(2);

const MODALITY_MAP: Record<string, Modality> = {
  text: "text",
  image: "image",
  audio: "audio",
  video: "video",
  pdf: "file",
  file: "file",
};

function parseModalities(raw: string | undefined): Modality[] | undefined {
  if (!raw) return undefined;

  const out = new Set<Modality>();

  for (const part of raw.split(",")) {
    const key = part.trim().toLowerCase();
    const m = MODALITY_MAP[key];

    if (m) out.add(m);
  }

  return out.size > 0 ? [...out].sort() : undefined;
}

function parseFeatures(raw: string | undefined): Set<string> {
  const out = new Set<string>();

  if (!raw) return out;

  for (const part of raw.split(",")) {
    const f = part.trim().toLowerCase();

    if (f) out.add(f);
  }

  return out;
}

function priceFromRatio(
  ratio: number | undefined,
  multiplier: number | undefined,
): number | undefined {
  if (ratio === undefined || ratio < 0) return undefined;
  if (multiplier === undefined || multiplier < 0) return undefined;

  try {
    return new Decimal(ratio)
      .mul(multiplier)
      .mul(PRICE_BASE_PER_MILLION)
      .toNumber();
  } catch {
    return undefined;
  }
}

function convert(
  id: string,
  basic: ApiModel | undefined,
  details: PaginationModel | undefined,
): ProviderModel {
  const features = parseFeatures(details?.features);
  const inputMods = parseModalities(details?.modalities);

  // AIHubMix lists a single `modalities` field that conflates inputs and
  // outputs. Treat all listed modalities as inputs and leave outputs unset
  // since we can't reliably distinguish (e.g. veo generates video, gemini
  // generates text).
  const hasAttachment =
    inputMods !== undefined &&
    inputMods.some(
      (m) => m === "image" || m === "file" || m === "audio" || m === "video",
    );

  // Skip token-based pricing for models priced per-second/per-image so we
  // don't publish nonsense numbers (model_ratio is meaningless for them).
  const hasNonTokenPricing =
    (details?.display_input?.length ?? 0) > 0 ||
    (details?.display_output?.length ?? 0) > 0 ||
    (details?.img_price_config?.length ?? 0) > 0;

  const ratio = details?.model_ratio;
  const compRatio = details?.completion_ratio;
  const cacheRatio = details?.cache_ratio;

  const inputPrice = hasNonTokenPricing ? undefined : priceFromRatio(ratio, 1);
  const outputPrice =
    hasNonTokenPricing || compRatio === undefined || compRatio <= 0
      ? undefined
      : priceFromRatio(ratio, compRatio);
  // cache_ratio of 1 means no caching discount (price equals input); only
  // emit when there's an actual discount to avoid noise.
  const cachePrice =
    hasNonTokenPricing ||
    cacheRatio === undefined ||
    cacheRatio < 0 ||
    cacheRatio === 1
      ? undefined
      : priceFromRatio(ratio, cacheRatio);

  return compact({
    id,
    name: basic?.id ?? id,

    features: compact({
      attachment: hasAttachment || undefined,
      reasoning: features.has("thinking") || undefined,
      tool_call:
        features.has("tools") || features.has("function_calling") || undefined,
      structured_output: features.has("structured_outputs") || undefined,
    }),

    pricing: compact({
      input: inputPrice,
      output: outputPrice,
      cache_read: cachePrice,
    }),

    limit: compact({
      context:
        details?.context_window !== undefined && details.context_window > 0
          ? details.context_window
          : undefined,
    }),

    modalities: compact({
      input: inputMods,
    }),
  });
}

async function fetchPaginationPage(page: number): Promise<PaginationResponse> {
  const url = `https://aihubmix.com/call/mdl_info_pagination?p=${page}&num=${PAGE_SIZE}&sort_by=&sort_order=desc`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `AIHubMix pagination error (page ${page}): ${response.status} ${response.statusText}`,
    );
  }

  return (await response.json()) as PaginationResponse;
}

export async function fetchModels(
  progress?: ProgressReporter,
): Promise<ProviderModel[]> {
  // Phase 1: list models from /v1/models. AIHubMix's endpoint doesn't
  // require an API key but we'll send one if available.
  progress?.beginPhase("fetching", 1);

  const apiKey = process.env.AIHUBMIX_API_KEY;
  const headers: Record<string, string> = {};

  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const response = await fetch("https://aihubmix.com/v1/models", { headers });

  if (!response.ok) {
    progress?.tick("aihubmix.com/v1/models", false);
    throw new Error(
      `AIHubMix API error: ${response.status} ${response.statusText}`,
    );
  }

  const { data: basics } = (await response.json()) as ApiResponse;

  progress?.tick(`aihubmix.com/v1/models (${basics.length})`, true);

  // Phase 2: walk the pagination endpoint to collect detailed metadata.
  // `p` is a zero-based page index.
  // The first request tells us the grand total so we can size the bar.
  const detailsByModel = new Map<string, PaginationModel>();
  const firstPage = await fetchPaginationPage(0);
  const total = Math.max(
    firstPage.total ?? firstPage.data.length,
    firstPage.data.length,
  );
  const numPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  progress?.beginPhase("details", numPages);

  for (const m of firstPage.data) detailsByModel.set(m.model, m);
  progress?.tick(`page 1/${numPages} (${firstPage.data.length})`, true);

  for (let page = 1; page < numPages; page++) {
    let ok = true;
    let added = 0;

    try {
      const body = await fetchPaginationPage(page);

      for (const m of body.data) detailsByModel.set(m.model, m);
      added = body.data.length;
    } catch {
      ok = false;
    }

    progress?.tick(`page ${page + 1}/${numPages} (${added})`, ok);
  }

  // Merge: every model from /v1/models, plus any pagination-only entries.
  const seen = new Set<string>();
  const result: ProviderModel[] = [];

  for (const m of basics) {
    seen.add(m.id);
    result.push(convert(m.id, m, detailsByModel.get(m.id)));
  }

  for (const [id, details] of detailsByModel) {
    if (seen.has(id)) continue;
    result.push(convert(id, undefined, details));
  }

  return result;
}
