import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { filterModalities, hasAttachmentSource } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const pricingEntrySchema = z.object({
  value: z.number(),
  unit: z.string(),
  currency: z.string().optional(),
});

const apiModelSchema = z.object({
  id: z.string(),
  display_name: z.string().optional(),
  created: z.number().optional(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
  context_length: z.number().nullish(),
  capabilities: z
    .object({
      reasoning: z.boolean().optional(),
    })
    .optional(),
  pricings: z
    .object({
      prompt: z.array(pricingEntrySchema).optional(),
      completion: z.array(pricingEntrySchema).optional(),
      input_cache_read: z.array(pricingEntrySchema).optional(),
      input_cache_write: z.array(pricingEntrySchema).optional(),
      input_cache_write_5_min: z.array(pricingEntrySchema).optional(),
      input_cache_write_1_h: z.array(pricingEntrySchema).optional(),
      internal_reasoning: z.array(pricingEntrySchema).optional(),
      audio_input: z.array(pricingEntrySchema).optional(),
      audio_cache_read: z.array(pricingEntrySchema).optional(),
      completion_audio: z.array(pricingEntrySchema).optional(),
    })
    .nullish(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function pickLowestPerMillion(
  entries: z.infer<typeof pricingEntrySchema>[] | undefined,
): number | undefined {
  if (!entries || entries.length === 0) {
    return undefined;
  }

  const values = entries
    .filter((entry) => entry.unit === "perMTokens")
    .map((entry) => entry.value)
    .filter((value) => Number.isFinite(value) && value >= 0);

  if (values.length === 0) {
    return undefined;
  }

  return Math.min(...values);
}

export const zenmuxProvider: ProviderDefinition = {
  name: "zenmux",
  outputDirectory: "data/providers/zenmux/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://zenmux.ai/api/v1/models", {
      schema: responseSchema,
      label: "ZenMux API error",
    });

    progress?.tick(`zenmux.ai/api/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const input = filterModalities(model.input_modalities);
      const output = filterModalities(model.output_modalities);

      return compactObject({
        id: model.id,
        name: model.display_name ?? model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: hasAttachmentSource(model.input_modalities),
          reasoning: model.capabilities?.reasoning,
        }),
        pricing: compactObject({
          input: pickLowestPerMillion(model.pricings?.prompt),
          output: pickLowestPerMillion(model.pricings?.completion),
          reasoning: pickLowestPerMillion(model.pricings?.internal_reasoning),
          cache_read: pickLowestPerMillion(model.pricings?.input_cache_read),
          cache_write:
            pickLowestPerMillion(model.pricings?.input_cache_write) ??
            pickLowestPerMillion(model.pricings?.input_cache_write_5_min) ??
            pickLowestPerMillion(model.pricings?.input_cache_write_1_h),
          input_audio: pickLowestPerMillion(model.pricings?.audio_input),
          output_audio: pickLowestPerMillion(model.pricings?.completion_audio),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
