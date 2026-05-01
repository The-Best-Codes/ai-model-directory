import type { Modality, ProviderModel } from "../schema.ts";
import type { ProgressReporter } from "../progress.ts";
import { compact, isoDateFromUnix, pricePerMillion } from "./_lib.ts";

export const outputDirectory = "data/providers/fastrouter/models";

type ApiModel = {
  id: string;
  name: string;
  created: number;
  context_length: number;
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
    audio_input?: string;
    audio_output?: string;
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
    release_date: isoDateFromUnix(model.created),

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
      input_audio: pricePerMillion(model.pricing.audio_input),
      output_audio: pricePerMillion(model.pricing.audio_output),
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

export async function fetchModels(
  progress?: ProgressReporter,
): Promise<ProviderModel[]> {
  progress?.beginPhase("fetching", 1);

  const apiKey = process.env.FASTROUTER_API_KEY;
  const headers: Record<string, string> = {};

  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const response = await fetch("https://go.fastrouter.ai/api/v1/models", {
    headers,
  });

  if (!response.ok) {
    progress?.tick("go.fastrouter.ai/api/v1/models", false);
    throw new Error(
      `FastRouter API error: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as ApiResponse;

  progress?.tick(`go.fastrouter.ai/api/v1/models (${data.length})`, true);

  return data.map(convert);
}
