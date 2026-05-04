import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  pricePerMillion,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  created: z.number(),
  context_window: z.number().nullish(),
  max_tokens: z.number().nullish(),
  supports_images_input: z.boolean().nullish(),
  supports_prompt_cache: z.boolean().nullish(),
  input_token_price: z.number().nullish(),
  output_token_price: z.number().nullish(),
  cache_read_token_price: z.number().nullish(),
  cache_write_token_price: z.number().nullish(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const ioNetProvider: ProviderDefinition = {
  name: "io-net",
  outputDirectory: "data/providers/io-net/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://api.intelligence.io.solutions/api/v1/models",
      {
        schema: responseSchema,
        headers: withBearerToken(process.env.IOINTELLIGENCE_API_KEY),
        label: "IO.NET API error",
      },
    );

    progress?.tick(
      `api.intelligence.io.solutions/api/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const supportsCache = model.supports_prompt_cache === true;
      const supportsImages = model.supports_images_input === true;
      const input: ModelModality[] = supportsImages
        ? ["text", "image"]
        : ["text"];

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        release_date:
          model.created > 0
            ? timestampFromUnixSeconds(model.created)
            : undefined,
        features: compactObject({
          attachment: supportsImages,
        }),
        pricing: compactObject({
          input: pricePerMillion(model.input_token_price),
          output: pricePerMillion(model.output_token_price),
          cache_read: supportsCache
            ? pricePerMillion(model.cache_read_token_price)
            : undefined,
          cache_write: supportsCache
            ? pricePerMillion(model.cache_write_token_price)
            : undefined,
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_window),
          output: integerGreaterThanZero(model.max_tokens),
        }),
        modalities: compactObject({
          input,
        }),
      });
    });
  },
};
