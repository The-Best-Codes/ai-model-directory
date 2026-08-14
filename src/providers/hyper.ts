import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const textOutputModalities: ModelModality[] = ["text"];

const apiReasoningSchema = z
  .object({
    effort_levels: z.array(z.object({ value: z.string() })).optional(),
    default_effort_level: z.string().optional(),
  })
  .optional();

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  display_name: z.string().optional(),
  context_window: z.number().nullish().optional(),
  max_output_tokens: z.number().nullish().optional(),
  capabilities: z
    .object({
      vision: z.boolean().optional(),
    })
    .optional(),
  reasoning: apiReasoningSchema,
  pricing: z
    .object({
      input: z.number().nullish().optional(),
      output: z.number().nullish().optional(),
      cache_create: z.number().nullish().optional(),
      cache_hit: z.number().nullish().optional(),
    })
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const hyperProvider: ProviderDefinition = {
  name: "hyper",
  outputDirectory: "data/providers/hyper/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://hyper.charm.land/v1/models", {
      schema: responseSchema,
      label: "Hyper API error",
    });

    progress?.tick(
      `hyper.charm.land/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const vision = model.capabilities?.vision ?? false;
      const input: ModelModality[] = vision ? ["text", "image"] : ["text"];

      return compactObject({
        id: model.id,
        name: model.display_name ?? model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: vision ? true : undefined,
          reasoning: model.reasoning ? true : undefined,
        }),
        pricing: compactObject({
          input: nonNegativeNumber(model.pricing?.input),
          output: nonNegativeNumber(model.pricing?.output),
          cache_read: nonNegativeNumber(model.pricing?.cache_hit),
          cache_write: nonNegativeNumber(model.pricing?.cache_create),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_window),
          output: integerGreaterThanZero(model.max_output_tokens),
        }),
        modalities: compactObject({
          input,
          output: textOutputModalities,
        }),
      });
    });
  },
};
