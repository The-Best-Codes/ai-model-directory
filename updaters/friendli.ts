import type { ProviderModel } from "../schema.ts";
import type { ProgressReporter } from "../progress.ts";
import { compact, isoDateFromUnix, nonNegativeNumber } from "./_lib.ts";

export const outputDirectory = "data/providers/friendli/models";

type ApiModel = {
  id: string;
  name: string;
  max_completion_tokens?: number;
  context_length?: number;
  functionality?: {
    tool_call?: boolean;
    structured_output?: boolean;
  };
  pricing?: {
    input?: number;
    output?: number;
    input_cache_read?: number;
  };
  created: number;
};

type ApiResponse = {
  data: ApiModel[];
};

function convert(model: ApiModel): ProviderModel {
  return compact({
    id: model.id,
    name: model.name,
    release_date: isoDateFromUnix(model.created),
    features: compact({
      tool_call: model.functionality?.tool_call,
      structured_output: model.functionality?.structured_output,
    }),
    pricing: compact({
      input: nonNegativeNumber(model.pricing?.input),
      output: nonNegativeNumber(model.pricing?.output),
      cache_read: nonNegativeNumber(model.pricing?.input_cache_read),
    }),
    limit: compact({
      context: nonNegativeNumber(model.context_length),
      output: nonNegativeNumber(model.max_completion_tokens),
    }),
  });
}

export async function fetchModels(
  progress?: ProgressReporter,
): Promise<ProviderModel[]> {
  progress?.beginPhase("fetching", 1);

  const apiKey = process.env.FRIENDLI_TOKEN;
  const headers: Record<string, string> = {};
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const response = await fetch("https://api.friendli.ai/serverless/v1/models", {
    headers,
  });

  if (!response.ok) {
    progress?.tick("api.friendli.ai/serverless/v1/models", false);
    throw new Error(
      `Friendli API error: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as ApiResponse;
  progress?.tick(`api.friendli.ai/serverless/v1/models (${data.length})`, true);
  return data.map(convert);
}
