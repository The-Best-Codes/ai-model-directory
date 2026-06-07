import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  created: z.number(),
  context_length: z.number(),
  max_completion_tokens: z.number(),
  custom_reasoning: z.boolean().optional(),
  pricing: z.object({
    prompt: z.string(),
    completion: z.string(),
    cache_prompt: z.string().optional(),
  }),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function parsePrice(value: string | undefined): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  try {
    const result = new Decimal(value).toNumber();
    return Number.isFinite(result) && result >= 0 ? result : undefined;
  } catch {
    return undefined;
  }
}

export const crofProvider: ProviderDefinition = {
  name: "crof",
  outputDirectory: "data/providers/crof/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://crof.ai/v1/models", {
      schema: responseSchema,
      label: "Crof AI API error",
    });

    progress?.tick(`crof.ai/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      return compactObject({
        id: model.id,
        name: model.name,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          reasoning: model.custom_reasoning || undefined,
        }),
        pricing: compactObject({
          input: parsePrice(model.pricing.prompt),
          output: parsePrice(model.pricing.completion),
          cache_read: parsePrice(model.pricing.cache_prompt),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_completion_tokens),
        }),
      });
    });
  },
};
