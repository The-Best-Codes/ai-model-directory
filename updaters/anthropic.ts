import type { ProgressReporter } from "../progress.ts";

export const outputDirectory = "data/providers/anthropic/models";

export type Modality = "audio" | "file" | "image" | "text" | "video";

// Intermediate format (subset of the shared schema; only what Anthropic's
// /v1/models endpoint actually exposes).
export type ProviderModel = {
  // Required
  id: string;
  name: string;

  // Optional scalars
  release_date?: string; // yyyy-mm-dd

  features?: {
    attachment?: boolean;
    reasoning?: boolean;
    structured_output?: boolean;
  };

  limit?: {
    context?: number;
    output?: number;
  };

  modalities?: {
    input?: Modality[];
    output?: Modality[];
  };
};

// Anthropic /v1/models types (just what we use)
type CapabilitySupport = { supported: boolean };

type ApiModel = {
  id: string;
  display_name: string;
  created_at: string; // RFC 3339, may be epoch if unknown
  max_input_tokens: number;
  max_tokens: number;
  type: "model";
  capabilities: {
    image_input?: CapabilitySupport;
    pdf_input?: CapabilitySupport;
    structured_outputs?: CapabilitySupport;
    thinking?: { supported: boolean };
  };
};

type ApiResponse = {
  data: ApiModel[];
  has_more: boolean;
  last_id: string | null;
};

// Helpers
function compact<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as T;
}

function isoDate(rfc3339: string): string | undefined {
  const d = new Date(rfc3339);

  if (Number.isNaN(d.getTime())) return undefined;
  // Treat epoch (or near-epoch) as "release date unknown"
  if (d.getTime() <= 0) return undefined;

  return d.toISOString().slice(0, 10);
}

function convert(model: ApiModel): ProviderModel {
  const caps = model.capabilities ?? {};
  const imageInput = caps.image_input?.supported === true;
  const pdfInput = caps.pdf_input?.supported === true;
  const reasoning = caps.thinking?.supported === true;
  const structured = caps.structured_outputs?.supported === true;

  const inputMods: Modality[] = ["text"];
  if (imageInput) inputMods.push("image");
  if (pdfInput) inputMods.push("file");

  return compact({
    id: model.id,
    name: model.display_name || model.id,
    release_date: isoDate(model.created_at),

    features: compact({
      attachment: imageInput || pdfInput || undefined,
      reasoning: reasoning || undefined,
      structured_output: structured || undefined,
    }),

    limit: compact({
      context: model.max_input_tokens > 0 ? model.max_input_tokens : undefined,
      output: model.max_tokens > 0 ? model.max_tokens : undefined,
    }),

    modalities: compact({
      input: [...inputMods].sort(),
      output: ["text"] as Modality[],
    }),
  });
}

// Exported fetch function
export async function fetchModels(
  progress?: ProgressReporter,
): Promise<ProviderModel[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }

  // Phase 1: list models from the API. The endpoint paginates, so we may
  // need a few requests; we don't know the total upfront, so the bar just
  // ticks once per page fetched.
  progress?.beginPhase("fetching", 1);

  const all: ApiModel[] = [];
  let afterId: string | null = null;
  let pages = 0;

  while (true) {
    const url = new URL("https://api.anthropic.com/v1/models");
    url.searchParams.set("limit", "1000");

    if (afterId) url.searchParams.set("after_id", afterId);

    const response = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
    });

    if (!response.ok) {
      progress?.tick(`api.anthropic.com/v1/models (page ${pages + 1})`, false);
      throw new Error(
        `Anthropic API error: ${response.status} ${response.statusText}`,
      );
    }

    const body = (await response.json()) as ApiResponse;

    all.push(...body.data);
    pages++;

    progress?.tick(`api.anthropic.com/v1/models (${all.length})`, true);

    if (!body.has_more || !body.last_id) break;

    afterId = body.last_id;
  }

  return all.map(convert);
}
