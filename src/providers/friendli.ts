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
  name: z.string(),
  max_completion_tokens: z.number().nullish(),
  context_length: z.number().nullish(),
  functionality: z
    .object({
      tool_call: z.boolean().optional(),
      structured_output: z.boolean().optional(),
    })
    .nullish(),
  pricing: z
    .object({
      input: z.number().nullish(),
      output: z.number().nullish(),
      input_cache_read: z.number().nullish(),
    })
    .nullish(),
  created: z.number(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const friendliProvider: ProviderDefinition = {
  name: "friendli",
  outputDirectory: "data/providers/friendli/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://api.friendli.ai/serverless/v1/models",
      {
        schema: responseSchema,
        headers: withBearerToken(process.env.FRIENDLI_TOKEN),
        label: "Friendli API error",
      },
    );

    progress?.tick(
      `api.friendli.ai/serverless/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) =>
      compactObject({
        id: model.id,
        name: model.name,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          tool_call: model.functionality?.tool_call,
          structured_output: model.functionality?.structured_output,
        }),
        pricing: compactObject({
          input: nonNegativeNumber(model.pricing?.input),
          output: nonNegativeNumber(model.pricing?.output),
          cache_read: nonNegativeNumber(model.pricing?.input_cache_read),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_completion_tokens),
        }),
      }),
    );
  },
};
