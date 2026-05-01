import type { ProviderModel } from "../schema.ts";
import type { ProgressReporter } from "../progress.ts";
import { compact, isoDateFromUnix } from "./_lib.ts";

export const outputDirectory = "data/providers/cortecs/models";

type ApiPricing = {
  input_token?: number;
  output_token?: number;
  cache_read_cost?: number;
  currency?: string;
};

type ApiModel = {
  id: string;
  object: string;
  created: number;
  owned_by: string;
  description?: string;
  pricing?: ApiPricing;
  context_size?: number;
  tags?: string[];
};

type ApiResponse = {
  object: string;
  data: ApiModel[];
};

function hasTag(tags: string[] | undefined, name: string): boolean | undefined {
  if (!Array.isArray(tags)) return undefined;
  return tags.some((tag) => tag.toLowerCase() === name);
}

function nonNegativeNumber(value: number | undefined): number | undefined {
  return value !== undefined && Number.isFinite(value) && value >= 0
    ? value
    : undefined;
}

function convert(model: ApiModel): ProviderModel {
  return compact({
    id: model.id,
    name: model.id,
    release_date: isoDateFromUnix(model.created),

    features: compact({
      attachment: hasTag(model.tags, "image"),
      reasoning: hasTag(model.tags, "reasoning"),
      tool_call: hasTag(model.tags, "tools"),
    }),

    pricing: compact({
      input: nonNegativeNumber(model.pricing?.input_token),
      output: nonNegativeNumber(model.pricing?.output_token),
      cache_read: nonNegativeNumber(model.pricing?.cache_read_cost),
    }),

    limit: compact({
      context: nonNegativeNumber(model.context_size),
    }),
  });
}

export async function fetchModels(
  progress?: ProgressReporter,
): Promise<ProviderModel[]> {
  progress?.beginPhase("fetching", 1);

  const apiKey = process.env.CORTECS_API_KEY;
  const headers: Record<string, string> = {};

  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const response = await fetch("https://api.cortecs.ai/v1/models", {
    headers,
  });

  if (!response.ok) {
    progress?.tick("api.cortecs.ai/v1/models", false);
    throw new Error(
      `Cortecs API error: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as ApiResponse;

  progress?.tick(`api.cortecs.ai/v1/models (${data.length})`, true);

  return data.map(convert);
}
