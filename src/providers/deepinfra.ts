import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  nonNegativeInteger,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { hasAnyString } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  metadata: z
    .object({
      context_length: z.number().nullish(),
      max_tokens: z.number().nullish(),
      pricing: z
        .object({
          input_tokens: z.number().nullish(),
          output_tokens: z.number().nullish(),
          cache_read_tokens: z.number().nullish(),
        })
        .nullish(),
      tags: z.array(z.string()).optional(),
    })
    .nullable()
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const deepinfraProvider: ProviderDefinition = {
  name: "deepinfra",
  outputDirectory: "data/providers/deepinfra/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.deepinfra.com/v1/models", {
      schema: responseSchema,
      headers: withBearerToken(process.env.DEEPINFRA_API_KEY),
      label: "DeepInfra API error",
    });

    progress?.tick(
      `api.deepinfra.com/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const tags = model.metadata?.tags;

      return compactObject({
        id: model.id,
        name: model.id,
        release_date:
          model.created > 0
            ? timestampFromUnixSeconds(model.created)
            : undefined,
        features: compactObject({
          attachment:
            tags !== undefined ? hasAnyString(tags, "vision") : undefined,
          reasoning:
            tags !== undefined
              ? hasAnyString(tags, "reasoning", "reasoning_effort")
              : undefined,
        }),
        pricing: compactObject({
          input: nonNegativeNumber(model.metadata?.pricing?.input_tokens),
          output: nonNegativeNumber(model.metadata?.pricing?.output_tokens),
          cache_read: nonNegativeNumber(
            model.metadata?.pricing?.cache_read_tokens,
          ),
        }),
        limit: compactObject({
          context: nonNegativeInteger(model.metadata?.context_length),
          output: nonNegativeInteger(model.metadata?.max_tokens),
        }),
      });
    });
  },
};
