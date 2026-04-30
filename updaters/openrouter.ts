export const outputDirectory = "data/providers/openrouter/models";

// Intermediate format
export type Modality = "audio" | "file" | "image" | "text" | "video";

export type ProviderModel = {
  // Required fields: if these are absent the model will be skipped entirely
  id: string;
  name: string;

  // Optional fields: if invalid/absent they are simply omitted
  knowledge_cutoff?: string; // yyyy-mm-dd
  release_date?: string; // yyyy-mm-dd

  features?: {
    attachment?: boolean;
    reasoning?: boolean;
    tool_call?: boolean;
    structured_output?: boolean;
    temperature?: boolean;
  };

  pricing?: {
    input?: number; // USD per million tokens
    output?: number;
    reasoning?: number;
    cache_read?: number;
    cache_write?: number;
    input_audio?: number;
    output_audio?: number;
  };

  limit?: {
    context?: number;
    input?: number;
    output?: number;
  };

  modalities?: {
    input?: Modality[];
    output?: Modality[];
  };
};

// OpenRouter API types (just what we need)
type ApiModel = {
  id: string;
  name: string;
  created: number;
  context_length: number;
  knowledge_cutoff: string | null;
  architecture: {
    input_modalities: Modality[];
    output_modalities: Modality[];
  };
  pricing: {
    prompt: string;
    completion: string;
    input_cache_read?: string;
    input_cache_write?: string;
    internal_reasoning?: string;
    audio?: string;
  };
  top_provider: {
    context_length: number | null;
    max_completion_tokens: number | null;
  };
  supported_parameters: string[];
};

type ApiResponse = {
  data: ApiModel[];
};

// Conversion helpers
function pricePerMillion(raw: string | undefined): number | undefined {
  if (raw === undefined) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n * 1_000_000 : undefined;
}

function isoDate(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toISOString().slice(0, 10);
}

function hasParam(params: string[], ...names: string[]): boolean {
  return names.some((name) => params.includes(name));
}

function compact<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as T;
}

function convert(model: ApiModel): ProviderModel {
  const params = model.supported_parameters;
  const inputMods = model.architecture.input_modalities;
  const outputMods = model.architecture.output_modalities;

  return compact({
    id: model.id,
    name: model.name,
    knowledge_cutoff: model.knowledge_cutoff ?? undefined,
    release_date: isoDate(model.created),

    features: compact({
      attachment: inputMods.some((m) => m !== "text") || undefined,
      reasoning:
        hasParam(
          params,
          "reasoning",
          "reasoning_effort",
          "include_reasoning",
        ) ||
        pricePerMillion(model.pricing.internal_reasoning) !== undefined ||
        undefined,
      tool_call:
        hasParam(params, "tools", "tool_choice", "parallel_tool_calls") ||
        undefined,
      structured_output:
        hasParam(params, "structured_outputs", "response_format") || undefined,
      temperature: hasParam(params, "temperature") || undefined,
    }),

    pricing: compact({
      input: pricePerMillion(model.pricing.prompt),
      output: pricePerMillion(model.pricing.completion),
      reasoning: pricePerMillion(model.pricing.internal_reasoning),
      cache_read: pricePerMillion(model.pricing.input_cache_read),
      cache_write: pricePerMillion(model.pricing.input_cache_write),
      input_audio: pricePerMillion(model.pricing.audio),
    }),

    limit: compact({
      context: model.top_provider.context_length ?? model.context_length,
      output: model.top_provider.max_completion_tokens ?? undefined,
    }),

    modalities: compact({
      input: inputMods.length > 0 ? [...inputMods].sort() : undefined,
      output: outputMods.length > 0 ? [...outputMods].sort() : undefined,
    }),
  });
}

// Exported fetch function
export async function fetchModels(): Promise<ProviderModel[]> {
  const response = await fetch("https://openrouter.ai/api/v1/models");

  if (!response.ok) {
    throw new Error(
      `OpenRouter API error: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as ApiResponse;

  return data.map(convert);
}
