import type { Modality, ProviderModel } from "../schema.ts";
import type { ProgressReporter } from "../progress.ts";
import { compact, isoDateFromUnix } from "./_lib.ts";

export const outputDirectory = "data/providers/chutes/models";

// Chutes /v1/models types (just what we use)
type ApiModel = {
  id: string;
  created: number;
  owned_by?: string;
  context_length?: number;
  max_model_len?: number;
  max_output_length?: number;
  input_modalities?: Modality[];
  output_modalities?: Modality[];
  supported_features?: string[];
  pricing?: {
    prompt?: number;
    completion?: number;
    input_cache_read?: number;
  };
};

type ApiResponse = {
  data: ApiModel[];
};

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

function nonNegativeNumber(n: number | undefined): number | undefined {
  return n !== undefined && Number.isFinite(n) && n >= 0 ? n : undefined;
}

function convert(model: ApiModel): ProviderModel {
  const inputMods = filterModalities(model.input_modalities);
  const outputMods = filterModalities(model.output_modalities);

  // If `supported_features` is provided (even empty), absence of an entry
  // means the model definitively does not support it. If undefined, we
  // don't know and leave the feature unset.
  const featuresProvided = Array.isArray(model.supported_features);
  const featureSet = new Set(
    (model.supported_features ?? []).map((f) => f.toLowerCase()),
  );

  const hasAttachment =
    inputMods !== undefined
      ? inputMods.some(
          (m) =>
            m === "image" || m === "file" || m === "audio" || m === "video",
        )
      : undefined;

  const context = nonNegativeNumber(
    model.context_length ?? model.max_model_len,
  );
  const output = nonNegativeNumber(model.max_output_length);

  return compact({
    id: model.id,
    name: model.id,
    release_date: isoDateFromUnix(model.created),

    features: compact({
      attachment: hasAttachment,
      reasoning: featuresProvided ? featureSet.has("reasoning") : undefined,
      tool_call: featuresProvided ? featureSet.has("tools") : undefined,
      structured_output: featuresProvided
        ? featureSet.has("structured_outputs")
        : undefined,
    }),

    pricing: compact({
      input: nonNegativeNumber(model.pricing?.prompt),
      output: nonNegativeNumber(model.pricing?.completion),
      cache_read: nonNegativeNumber(model.pricing?.input_cache_read),
    }),

    limit: compact({
      context,
      output,
    }),

    modalities: compact({
      input: inputMods ? [...inputMods].sort() : undefined,
      output: outputMods ? [...outputMods].sort() : undefined,
    }),
  });
}

export async function fetchModels(
  progress?: ProgressReporter,
): Promise<ProviderModel[]> {
  // Chutes exposes everything in a single request. An API key is optional
  // for the public listing, but we'll send one if available.
  progress?.beginPhase("fetching", 1);

  const apiKey = process.env.CHUTES_API_KEY;
  const headers: Record<string, string> = {};

  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const response = await fetch("https://llm.chutes.ai/v1/models", { headers });

  if (!response.ok) {
    progress?.tick("llm.chutes.ai/v1/models", false);
    throw new Error(
      `Chutes API error: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as ApiResponse;

  progress?.tick(`llm.chutes.ai/v1/models (${data.length})`, true);

  return data.map(convert);
}
