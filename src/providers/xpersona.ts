import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ProviderDefinition } from "./types.ts";

const apiPricingSchema = z.object({
  prompt: z.string().nullish(),
  completion: z.string().nullish(),
  request: z.string().nullish(),
  image: z.string().nullish(),
  currency: z.string().nullish(),
});

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  owned_by: z.string(),
  context_length: z.number(),
  max_completion_tokens: z.number().optional(),
  xpersona_max_completion_tokens: z.number().optional(),
  pricing: apiPricingSchema.nullish(),
});

const responseSchema = z.object({
  object: z.string(),
  data: z.array(apiModelSchema),
});

export const xpersonaProvider: ProviderDefinition = {
  name: "xpersona",
  outputDirectory: "data/providers/xpersona/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://www.xpersona.co/v1/models", {
      schema: responseSchema,
      label: "Xpersona API error",
    });

    progress?.tick(`xpersona.co/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const pricing = model.pricing;
      const inputPrice =
        pricing?.prompt == null
          ? undefined
          : nonNegativeNumber(new Decimal(pricing.prompt).toNumber());
      const outputPrice =
        pricing?.completion == null
          ? undefined
          : nonNegativeNumber(new Decimal(pricing.completion).toNumber());

      return compactObject({
        id: model.id,
        name: model.id,
        release_date: timestampFromUnixSeconds(model.created),
        pricing: compactObject({
          input: inputPrice,
          output: outputPrice,
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(
            model.xpersona_max_completion_tokens ?? model.max_completion_tokens,
          ),
        }),
        modalities: {
          input: ["text"],
          output: ["text"],
        },
      });
    });
  },
};
