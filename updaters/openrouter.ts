import type { Modality, ProviderModel } from "../schema.ts";
import type { ProgressReporter } from "../progress.ts";
import { compact, isoDateFromUnix, pricePerMillion } from "./_lib.ts";

export const outputDirectory = "data/providers/openrouter/models";

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

function hasParam(params: string[], ...names: string[]): boolean {
  return names.some((name) => params.includes(name));
}

function convert(model: ApiModel): ProviderModel {
  const params = model.supported_parameters;
  const inputMods = model.architecture.input_modalities;
  const outputMods = model.architecture.output_modalities;

  return compact({
    id: model.id,
    name: model.name,
    knowledge_cutoff: model.knowledge_cutoff ?? undefined,
    release_date: isoDateFromUnix(model.created),

    // OpenRouter always returns `architecture.input_modalities` and
    // `supported_parameters`, so absence of a capability means the model
    // does not support it — write the explicit boolean either way.
    features: {
      attachment: inputMods.includes("file"),
      reasoning:
        hasParam(
          params,
          "reasoning",
          "reasoning_effort",
          "include_reasoning",
        ) || pricePerMillion(model.pricing.internal_reasoning) !== undefined,
      tool_call: hasParam(
        params,
        "tools",
        "tool_choice",
        "parallel_tool_calls",
      ),
      structured_output: hasParam(
        params,
        "structured_outputs",
        "response_format",
      ),
      temperature: hasParam(params, "temperature"),
    },

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
export async function fetchModels(
  progress?: ProgressReporter,
): Promise<ProviderModel[]> {
  // OpenRouter exposes everything in a single request, so the fetch phase is
  // just one tick. The bulk of progress for this provider happens in the
  // writing phase driven by index.ts.
  progress?.beginPhase("fetching", 1);

  const response = await fetch("https://openrouter.ai/api/v1/models");

  if (!response.ok) {
    progress?.tick("openrouter.ai/api/v1/models", false);
    throw new Error(
      `OpenRouter API error: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as ApiResponse;

  progress?.tick(`openrouter.ai/api/v1/models (${data.length})`, true);

  return data.map(convert);
}
