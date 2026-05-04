import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  owned_by: z.string().optional(),
  display_name: z.string().optional(),
  context_length: z.number().nullish(),
  max_output: z.number().nullish(),
  reasoning: z.boolean().optional(),
  pricing: z
    .object({
      input_per_million: z.number().nullish(),
      output_per_million: z.number().nullish(),
      cache_read_per_million: z.number().nullish(),
    })
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const avianProvider: ProviderDefinition = {
  name: "avian",
  outputDirectory: "data/providers/avian/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.avian.io/v1/models", {
      schema: responseSchema,
      headers: withBearerToken(process.env.AVIAN_API_KEY),
      label: "Avian API error",
    });

    progress?.tick(`api.avian.io/v1/models (${response.data.length})`, true);

    return response.data.map((model) =>
      compactObject({
        id: model.id,
        name: model.display_name || model.id,
        // release_date: timestampFromUnixSeconds(model.created), // Omitted for now, as API returns current date
        features: compactObject({
          reasoning: model.reasoning,
        }),
        pricing: compactObject({
          input: nonNegativeNumber(model.pricing?.input_per_million),
          output: nonNegativeNumber(model.pricing?.output_per_million),
          cache_read: nonNegativeNumber(model.pricing?.cache_read_per_million),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_output),
        }),
      }),
    );
  },
};
