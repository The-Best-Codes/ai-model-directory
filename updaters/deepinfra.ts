import type { ProviderModel } from "../schema.ts";
import type { ProgressReporter } from "../progress.ts";
import { compact, nonNegativeNumber } from "./_lib.ts";

export const outputDirectory = "data/providers/deepinfra/models";

type ApiPricing = {
  input_tokens?: number;
  output_tokens?: number;
  cache_read_tokens?: number;
};

type ApiMetadata = {
  description?: string;
  context_length?: number;
  max_tokens?: number;
  pricing?: ApiPricing;
  tags?: string[];
};

type ApiModel = {
  id: string;
  object: string;
  created: number;
  owned_by: string;
  root?: string;
  parent?: string | null;
  metadata?: ApiMetadata | null;
};

type ApiResponse = {
  object: string;
  data: ApiModel[];
};

function isoDateFromUnixIfKnown(unixSeconds: number): string | undefined {
  return unixSeconds > 0
    ? new Date(unixSeconds * 1000).toISOString().slice(0, 10)
    : undefined;
}

function hasTag(tags: string[], ...names: string[]): boolean {
  const wanted = new Set(names.map((name) => name.toLowerCase()));
  return tags.some((tag) => wanted.has(tag.toLowerCase()));
}

function convert(model: ApiModel): ProviderModel {
  const tags = Array.isArray(model.metadata?.tags)
    ? model.metadata.tags
    : undefined;

  return compact({
    id: model.id,
    name: model.id,
    release_date: isoDateFromUnixIfKnown(model.created),

    features: compact({
      attachment: tags !== undefined ? hasTag(tags, "vision") : undefined,
      reasoning:
        tags !== undefined
          ? hasTag(tags, "reasoning", "reasoning_effort")
          : undefined,
    }),

    pricing: compact({
      input: nonNegativeNumber(model.metadata?.pricing?.input_tokens),
      output: nonNegativeNumber(model.metadata?.pricing?.output_tokens),
      cache_read: nonNegativeNumber(model.metadata?.pricing?.cache_read_tokens),
    }),

    limit: compact({
      context: nonNegativeNumber(model.metadata?.context_length),
      output: nonNegativeNumber(model.metadata?.max_tokens),
    }),
  });
}

export async function fetchModels(
  progress?: ProgressReporter,
): Promise<ProviderModel[]> {
  progress?.beginPhase("fetching", 1);

  const apiKey = process.env.DEEPINFRA_API_KEY;
  const headers: Record<string, string> = {};

  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const response = await fetch("https://api.deepinfra.com/v1/models", {
    headers,
  });

  if (!response.ok) {
    progress?.tick("api.deepinfra.com/v1/models", false);
    throw new Error(
      `DeepInfra API error: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as ApiResponse;

  progress?.tick(`api.deepinfra.com/v1/models (${data.length})`, true);

  return data.map(convert);
}
