import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  pricePerMillion,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  pricing: z
    .object({
      prompt: z.union([z.string(), z.number()]).nullish(),
      completion: z.union([z.string(), z.number()]).nullish(),
      input_cache_reads: z.union([z.string(), z.number()]).nullish(),
      input_cache_writes: z.union([z.string(), z.number()]).nullish(),
      image: z.union([z.string(), z.number()]).nullish(),
    })
    .optional(),
  context_length: z.number().nullish(),
  max_completion_tokens: z.number().nullish(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const ovhcloudProvider: ProviderDefinition = {
  name: "ovhcloud",
  outputDirectory: "data/providers/ovhcloud/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/models",
      {
        schema: responseSchema,
        headers: withBearerToken(process.env.OVHCLOUD_API_KEY),
        label: "OVHcloud API error",
      },
    );

    progress?.tick(
      `oai.endpoints.kepler.ai.cloud.ovh.net/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const imagePrice = pricePerMillion(model.pricing?.image);

      return compactObject({
        id: model.id,
        name: model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment:
            imagePrice !== undefined && imagePrice > 0 ? true : undefined,
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing?.prompt),
          output: pricePerMillion(model.pricing?.completion),
          cache_read: pricePerMillion(model.pricing?.input_cache_reads),
          cache_write: pricePerMillion(model.pricing?.input_cache_writes),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_completion_tokens),
        }),
      });
    });
  },
};
