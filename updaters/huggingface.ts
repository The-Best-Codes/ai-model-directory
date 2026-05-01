import type { Modality, ProviderModel } from "../schema.ts";
import type { ProgressReporter } from "../progress.ts";
import { compact, isoDateFromUnix, nonNegativeNumber } from "./_lib.ts";

export const outputDirectory = "data/providers/huggingface/models";

type ProviderEntry = {
  context_length?: number;
  pricing?: {
    input?: number;
    output?: number;
  };
  supports_tools?: boolean;
  supports_structured_output?: boolean;
  is_model_author?: boolean;
};

type ApiModel = {
  id: string;
  created: number;
  architecture?: {
    input_modalities?: Modality[];
    output_modalities?: Modality[];
  };
  providers?: ProviderEntry[];
};

type ApiResponse = { object: string; data: ApiModel[] };

function pickProvider(
  providers: ProviderEntry[] | undefined,
): ProviderEntry | undefined {
  if (!Array.isArray(providers) || providers.length === 0) return undefined;
  return (
    providers.find((provider) => provider.is_model_author) ??
    providers.find(
      (provider) =>
        provider.pricing?.input !== undefined ||
        provider.context_length !== undefined,
    ) ??
    providers[0]
  );
}

function convert(model: ApiModel): ProviderModel {
  const provider = pickProvider(model.providers);
  const inputMods = model.architecture?.input_modalities;
  const outputMods = model.architecture?.output_modalities;

  return compact({
    id: model.id,
    name: model.id,
    release_date: isoDateFromUnix(model.created),
    features: compact({
      attachment: inputMods?.some((modality) => modality !== "text"),
      tool_call: provider?.supports_tools,
      structured_output: provider?.supports_structured_output,
    }),
    pricing: compact({
      input: nonNegativeNumber(provider?.pricing?.input),
      output: nonNegativeNumber(provider?.pricing?.output),
    }),
    limit: compact({
      context: nonNegativeNumber(provider?.context_length),
    }),
    modalities: compact({
      input: inputMods?.length ? [...inputMods].sort() : undefined,
      output: outputMods?.length ? [...outputMods].sort() : undefined,
    }),
  });
}

export async function fetchModels(
  progress?: ProgressReporter,
): Promise<ProviderModel[]> {
  progress?.beginPhase("fetching", 1);
  const apiKey = process.env.HF_TOKEN;
  const headers: Record<string, string> = {};
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const response = await fetch("https://router.huggingface.co/v1/models", {
    headers,
  });

  if (!response.ok) {
    progress?.tick("router.huggingface.co/v1/models", false);
    throw new Error(
      `Hugging Face API error: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as ApiResponse;
  progress?.tick(`router.huggingface.co/v1/models (${data.length})`, true);
  return data.map(convert);
}
