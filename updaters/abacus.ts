import Decimal from "decimal.js";

import type { ProgressReporter } from "../progress.ts";

export const outputDirectory = "data/providers/abacus/models";

export type Modality = "audio" | "file" | "image" | "text" | "video";

// Intermediate format (subset of the shared schema; only what Abacus's
// /v1/models endpoint actually exposes).
export type ProviderModel = {
  // Required
  id: string;
  name: string;

  features?: {
    attachment?: boolean;
  };

  pricing?: {
    input?: number; // USD per million tokens
    output?: number;
    cache_read?: number;
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

// Abacus /v1/models types (just what we use)
type ApiModel = {
  id: string;
  name?: string;
  display_name?: string;
  description?: string;
  model_type?: string;
  input_modalities?: Modality[];
  output_modalities?: Modality[];
  input_token_rate?: string;
  output_token_rate?: string;
  cached_input_token_rate?: string;
  context_length?: number;
  max_completion_tokens?: number;
};

type ApiResponse = {
  data: ApiModel[];
};

// Helpers
function compact<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as T;
}

function pricePerMillion(raw: string | undefined): number | undefined {
  if (raw === undefined) return undefined;
  try {
    return new Decimal(raw).mul(1_000_000).toNumber();
  } catch {
    return undefined;
  }
}

const VALID_MODALITIES: ReadonlySet<Modality> = new Set([
  "audio",
  "file",
  "image",
  "text",
  "video",
]);

function filterModalities(input: unknown): Modality[] | undefined {
  if (!Array.isArray(input)) return undefined;
  const filtered = input.filter((m): m is Modality =>
    VALID_MODALITIES.has(m as Modality),
  );
  return filtered.length > 0 ? filtered : undefined;
}

function convert(model: ApiModel): ProviderModel {
  const inputMods = filterModalities(model.input_modalities);
  const outputMods = filterModalities(model.output_modalities);
  const hasAttachment =
    inputMods !== undefined &&
    (inputMods.includes("image") ||
      inputMods.includes("file") ||
      inputMods.includes("audio") ||
      inputMods.includes("video"));

  return compact({
    id: model.id,
    name: model.display_name || model.name || model.id,

    features: compact({
      attachment: hasAttachment || undefined,
    }),

    pricing: compact({
      input: pricePerMillion(model.input_token_rate),
      output: pricePerMillion(model.output_token_rate),
      cache_read: pricePerMillion(model.cached_input_token_rate),
    }),

    limit: compact({
      context:
        model.context_length !== undefined && model.context_length > 0
          ? model.context_length
          : undefined,
      output:
        model.max_completion_tokens !== undefined &&
        model.max_completion_tokens > 0
          ? model.max_completion_tokens
          : undefined,
    }),

    modalities: compact({
      input: inputMods ? [...inputMods].sort() : undefined,
      output: outputMods ? [...outputMods].sort() : undefined,
    }),
  });
}

// Exported fetch function
export async function fetchModels(
  progress?: ProgressReporter,
): Promise<ProviderModel[]> {
  // Abacus exposes everything in a single request and does not require an
  // API key, so the fetch phase is just one tick.
  progress?.beginPhase("fetching", 1);

  const apiKey = process.env.ABACUS_API_KEY;
  const headers: Record<string, string> = {};

  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const response = await fetch("https://routellm.abacus.ai/v1/models", {
    headers,
  });

  if (!response.ok) {
    progress?.tick("routellm.abacus.ai/v1/models", false);
    throw new Error(
      `Abacus API error: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as ApiResponse;

  progress?.tick(`routellm.abacus.ai/v1/models (${data.length})`, true);

  return data.map(convert);
}
