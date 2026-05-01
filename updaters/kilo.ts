import type { Modality, ProviderModel } from "../schema.ts";
import type { ProgressReporter } from "../progress.ts";
import { compact, isoDateFromUnix, pricePerMillion } from "./_lib.ts";

export const outputDirectory = "data/providers/kilo/models";

type ApiModel = {
  id: string;
  name: string;
  created: number;
  description?: string;
  architecture?: {
    input_modalities?: string[];
    output_modalities?: string[];
  };
  top_provider?: {
    context_length?: number | null;
    max_completion_tokens?: number | null;
  };
  pricing?: {
    prompt?: string;
    completion?: string;
    input_cache_read?: string;
    input_cache_write?: string;
    internal_reasoning?: string;
  };
  supported_parameters?: string[];
  structured_outputs?: boolean;
};

type ApiResponse = { data: ApiModel[] };

const VALID_MODALITIES: ReadonlySet<Modality> = new Set([
  "audio",
  "file",
  "image",
  "text",
  "video",
]);

function filterModalities(input: string[] | undefined): Modality[] | undefined {
  if (!Array.isArray(input)) return undefined;
  const filtered = input.filter((m): m is Modality =>
    VALID_MODALITIES.has(m as Modality),
  );
  return filtered.length > 0 ? filtered : undefined;
}

function hasParam(params: string[] | undefined, ...names: string[]): boolean {
  return Array.isArray(params) && names.some((name) => params.includes(name));
}

function convert(model: ApiModel): ProviderModel {
  const inputMods = filterModalities(model.architecture?.input_modalities);
  const outputMods = filterModalities(model.architecture?.output_modalities);

  return compact({
    id: model.id,
    name: model.name,
    release_date:
      model.created > 0 ? isoDateFromUnix(model.created) : undefined,
    features: compact({
      attachment: inputMods?.some((m) => m !== "text"),
      reasoning:
        hasParam(
          model.supported_parameters,
          "reasoning",
          "include_reasoning",
        ) || pricePerMillion(model.pricing?.internal_reasoning) !== undefined,
      tool_call: hasParam(model.supported_parameters, "tools", "tool_choice"),
      structured_output:
        model.structured_outputs ??
        hasParam(
          model.supported_parameters,
          "structured_outputs",
          "response_format",
        ),
      temperature: hasParam(model.supported_parameters, "temperature"),
    }),
    pricing: compact({
      input: pricePerMillion(model.pricing?.prompt),
      output: pricePerMillion(model.pricing?.completion),
      reasoning: pricePerMillion(model.pricing?.internal_reasoning),
      cache_read: pricePerMillion(model.pricing?.input_cache_read),
      cache_write: pricePerMillion(model.pricing?.input_cache_write),
    }),
    limit: compact({
      context: model.top_provider?.context_length ?? undefined,
      output: model.top_provider?.max_completion_tokens ?? undefined,
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
  progress?.beginPhase("fetching", 1);
  const apiKey = process.env.KILO_API_KEY;
  const headers: Record<string, string> = {};
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const response = await fetch("https://api.kilo.ai/api/gateway/models", {
    headers,
  });

  if (!response.ok) {
    progress?.tick("api.kilo.ai/api/gateway/models", false);
    throw new Error(
      `Kilo API error: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as ApiResponse;
  progress?.tick(`api.kilo.ai/api/gateway/models (${data.length})`, true);
  return data.map(convert);
}
