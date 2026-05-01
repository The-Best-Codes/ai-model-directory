import type { ProgressReporter } from "../progress.ts";

export const outputDirectory = "data/providers/openai/models";

// Intermediate format (subset of the shared schema; only what OpenAI's
// /v1/models endpoint actually exposes).
export type ProviderModel = {
  id: string;
  name: string;
  release_date?: string; // yyyy-mm-dd
};

// OpenAI API types (just what we need)
type ApiModel = {
  id: string;
  object: string;
  created: number;
  owned_by: string;
};

type ApiResponse = {
  object: string;
  data: ApiModel[];
};

function isoDate(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toISOString().slice(0, 10);
}

function convert(model: ApiModel): ProviderModel {
  return {
    id: model.id,
    name: model.id,
    release_date: isoDate(model.created),
  };
}

export async function fetchModels(
  progress?: ProgressReporter,
): Promise<ProviderModel[]> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  // OpenAI exposes everything in a single request, so the fetch phase is
  // just one tick.
  progress?.beginPhase("fetching", 1);

  const response = await fetch("https://api.openai.com/v1/models", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    progress?.tick("api.openai.com/v1/models", false);
    throw new Error(
      `OpenAI API error: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as ApiResponse;

  progress?.tick(`api.openai.com/v1/models (${data.length})`, true);

  return data.map(convert);
}
