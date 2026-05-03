import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  pricePerMillion,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { filterModalities } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  input_price: z.union([z.string(), z.number()]).nullish(),
  caching_price: z.union([z.string(), z.number()]).nullish(),
  cached_price: z.union([z.string(), z.number()]).nullish(),
  output_price: z.union([z.string(), z.number()]).nullish(),
  max_output_tokens: z.number().nullish(),
  context_window: z.number().nullish(),
  supports_caching: z.boolean().optional(),
  supports_vision: z.boolean().optional(),
  supports_computer_use: z.boolean().optional(),
  supports_reasoning: z.boolean().optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const tetrateProvider: ProviderDefinition = {
  name: "tetrate",
  outputDirectory: "data/providers/tetrate/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://api.router.tetrate.ai/v1/models",
      {
        schema: responseSchema,
        headers: withBearerToken(process.env.TARS_API_KEY),
        label: "Tetrate API error",
      },
    );

    progress?.tick(
      `api.router.tetrate.ai/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = filterModalities([
        "text",
        ...(model.supports_vision ? ["image"] : []),
      ]);

      return compactObject({
        id: model.id,
        name: model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: model.supports_vision,
          reasoning: model.supports_reasoning,
          tool_call: model.supports_computer_use,
        }),
        pricing: compactObject({
          input: pricePerMillion(model.input_price),
          output: pricePerMillion(model.output_price),
          cache_read: pricePerMillion(model.cached_price),
          cache_write:
            model.supports_caching === false
              ? undefined
              : pricePerMillion(model.caching_price),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_window),
          output: integerGreaterThanZero(model.max_output_tokens),
        }),
        modalities: compactObject({ input }),
      });
    });
  },
};
