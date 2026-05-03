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

const apiPricingAmountSchema = z
  .object({
    usd: z.number().nullish(),
  })
  .partial();

const apiCapabilitiesSchema = z.object({
  supportsAudioInput: z.boolean().optional(),
  supportsFunctionCalling: z.boolean().optional(),
  supportsMultipleImages: z.boolean().optional(),
  supportsReasoning: z.boolean().optional(),
  supportsReasoningEffort: z.boolean().optional(),
  supportsResponseSchema: z.boolean().optional(),
  supportsVideoInput: z.boolean().optional(),
  supportsVision: z.boolean().optional(),
});

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  context_length: z.number().nullish().optional(),
  model_spec: z
    .object({
      name: z.string().optional(),
      availableContextTokens: z.number().nullish().optional(),
      maxCompletionTokens: z.number().nullish().optional(),
      capabilities: apiCapabilitiesSchema.optional(),
      constraints: z
        .object({
          temperature: z.unknown().optional(),
        })
        .partial()
        .optional(),
      pricing: z
        .object({
          input: apiPricingAmountSchema.optional(),
          output: apiPricingAmountSchema.optional(),
          cache_input: apiPricingAmountSchema.optional(),
          cache_write: apiPricingAmountSchema.optional(),
        })
        .partial()
        .optional(),
    })
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function getInputModalities(
  capabilities: z.infer<typeof apiCapabilitiesSchema> | undefined,
): ModelModality[] {
  const modalities = new Set<ModelModality>(["text"]);

  if (capabilities?.supportsVision || capabilities?.supportsMultipleImages) {
    modalities.add("image");
  }

  if (capabilities?.supportsAudioInput) {
    modalities.add("audio");
  }

  if (capabilities?.supportsVideoInput) {
    modalities.add("video");
  }

  return ["text", "image", "audio", "video", "file"].filter(
    (entry): entry is ModelModality => modalities.has(entry as ModelModality),
  );
}

export const veniceProvider: ProviderDefinition = {
  name: "venice",
  outputDirectory: "data/providers/venice/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.venice.ai/api/v1/models", {
      schema: responseSchema,
      label: "Venice API error",
    });

    progress?.tick(
      `api.venice.ai/api/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const capabilities = model.model_spec?.capabilities;
      const input = getInputModalities(capabilities);

      return compactObject({
        id: model.id,
        name: model.model_spec?.name ?? model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: input.some((modality) => modality !== "text"),
          reasoning:
            capabilities?.supportsReasoning ??
            capabilities?.supportsReasoningEffort,
          tool_call: capabilities?.supportsFunctionCalling,
          structured_output: capabilities?.supportsResponseSchema,
          temperature:
            model.model_spec?.constraints?.temperature !== undefined
              ? true
              : undefined,
        }),
        pricing: compactObject({
          input: nonNegativeNumber(model.model_spec?.pricing?.input?.usd),
          output: nonNegativeNumber(model.model_spec?.pricing?.output?.usd),
          cache_read: nonNegativeNumber(
            model.model_spec?.pricing?.cache_input?.usd,
          ),
          cache_write: nonNegativeNumber(
            model.model_spec?.pricing?.cache_write?.usd,
          ),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(
            model.model_spec?.availableContextTokens ?? model.context_length,
          ),
          output: integerGreaterThanZero(model.model_spec?.maxCompletionTokens),
        }),
        modalities: compactObject({
          input,
          output: textOutputModalities,
        }),
      });
    });
  },
};
