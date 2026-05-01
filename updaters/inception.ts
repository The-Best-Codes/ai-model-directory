import type { Modality, ProviderModel } from "../schema.ts";
import type { ProgressReporter } from "../progress.ts";
import { compact, isoDateFromUnix, pricePerMillion } from "./_lib.ts";

export const outputDirectory = "data/providers/inception/models";

type ApiModel = {
  id: string;
  name: string;
  created: number;
  input_modalities?: Modality[];
  output_modalities?: Modality[];
  context_length?: number;
  max_output_length?: number;
  pricing?: {
    prompt?: string;
    completion?: string;
    input_cache_reads?: string;
    input_cache_writes?: string;
  };
  supported_sampling_parameters?: string[];
  supported_features?: string[];
};

type ApiResponse = { data: ApiModel[] };

function hasFeature(
  features: string[] | undefined,
  name: string,
): boolean | undefined {
  if (!Array.isArray(features)) return undefined;
  return features.includes(name);
}

function hasParam(
  params: string[] | undefined,
  name: string,
): boolean | undefined {
  if (!Array.isArray(params)) return undefined;
  return params.includes(name);
}

function hasAttachment(
  modalities: Modality[] | undefined,
): boolean | undefined {
  return Array.isArray(modalities)
    ? modalities.some(
        (m) => m === "image" || m === "file" || m === "audio" || m === "video",
      )
    : undefined;
}

function convert(model: ApiModel): ProviderModel {
  return compact({
    id: model.id,
    name: model.name,
    release_date: isoDateFromUnix(model.created),
    features: compact({
      attachment: hasAttachment(model.input_modalities),
      tool_call: hasFeature(model.supported_features, "tools"),
      structured_output:
        hasFeature(model.supported_features, "structured_outputs") ??
        hasFeature(model.supported_features, "json_mode"),
      temperature: hasParam(model.supported_sampling_parameters, "temperature"),
    }),
    pricing: compact({
      input: pricePerMillion(model.pricing?.prompt),
      output: pricePerMillion(model.pricing?.completion),
      cache_read: pricePerMillion(model.pricing?.input_cache_reads),
      cache_write: pricePerMillion(model.pricing?.input_cache_writes),
    }),
    limit: compact({
      context: model.context_length,
      output: model.max_output_length,
    }),
    modalities: compact({
      input: model.input_modalities?.length
        ? [...model.input_modalities].sort()
        : undefined,
      output: model.output_modalities?.length
        ? [...model.output_modalities].sort()
        : undefined,
    }),
  });
}

export async function fetchModels(
  progress?: ProgressReporter,
): Promise<ProviderModel[]> {
  progress?.beginPhase("fetching", 1);
  const apiKey = process.env.INCEPTION_API_KEY;
  const headers: Record<string, string> = {};
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const response = await fetch("https://api.inceptionlabs.ai/v1/models", {
    headers,
  });

  if (!response.ok) {
    progress?.tick("api.inceptionlabs.ai/v1/models", false);
    throw new Error(
      `Inception API error: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as ApiResponse;
  progress?.tick(`api.inceptionlabs.ai/v1/models (${data.length})`, true);
  return data.map(convert);
}
