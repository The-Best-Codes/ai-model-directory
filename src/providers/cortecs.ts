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
  pricing: z
    .object({
      input_token: z.number().optional(),
      output_token: z.number().optional(),
      cache_read_cost: z.number().nullish(),
    })
    .optional(),
  context_size: z.number().optional(),
  tags: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const cortecsProvider: ProviderDefinition = {
  name: "cortecs",
  outputDirectory: "data/providers/cortecs/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.cortecs.ai/v1/models", {
      schema: responseSchema,
      headers: withBearerToken(process.env.CORTECS_API_KEY),
      label: "Cortecs API error",
    });

    progress?.tick(`api.cortecs.ai/v1/models (${response.data.length})`, true);

    return response.data.map((model) =>
      compactObject({
        id: model.id,
        name: model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment:
            model.tags !== undefined
              ? hasAnyString(model.tags, "image")
              : undefined,
          reasoning:
            model.tags !== undefined
              ? hasAnyString(model.tags, "reasoning")
              : undefined,
          tool_call:
            model.tags !== undefined
              ? hasAnyString(model.tags, "tools")
              : undefined,
        }),
        pricing: compactObject({
          input: nonNegativeNumber(model.pricing?.input_token),
          output: nonNegativeNumber(model.pricing?.output_token),
          cache_read: nonNegativeNumber(model.pricing?.cache_read_cost),
        }),
        limit: compactObject({
          context: nonNegativeInteger(model.context_size),
        }),
      }),
    );
  },
};
