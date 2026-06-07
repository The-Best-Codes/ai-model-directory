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

const pricingSchema = z.object({
  input_per_million: z.number().nullish(),
  output_per_million: z.number().nullish(),
  cached_input_per_million: z.number().nullish(),
  cached_output_per_million: z.number().nullish(),
  currency: z.string().optional(),
  pricing_tbd: z.boolean().optional(),
});

const capabilitiesSchema = z.object({
  tools: z.boolean().optional(),
  json_mode: z.boolean().optional(),
  vision: z.boolean().optional(),
  reasoning: z.boolean().optional(),
  reasoning_effort: z.boolean().optional(),
  streaming: z.boolean().optional(),
  system_role: z.boolean().optional(),
  developer_role: z.boolean().optional(),
});

const limitsSchema = z.object({
  max_context_length: z.number().nullish(),
  max_output_tokens: z.number().nullish(),
  max_images: z.number().nullish(),
});

const metadataSchema = z.object({
  display_name: z.string().nullish(),
  description: z.string().nullish(),
  provider: z.string().nullish(),
  huggingface_id: z.string().nullish(),
  pricing: pricingSchema.nullish(),
  capabilities: capabilitiesSchema.nullish(),
  limits: limitsSchema.nullish(),
  deprecated: z.boolean().optional(),
  deprecated_message: z.string().nullish(),
});

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  owned_by: z.string().optional(),
  max_model_len: z.number().nullish(),
  metadata: metadataSchema.nullish(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const neuralwattProvider: ProviderDefinition = {
  name: "neuralwatt",
  outputDirectory: "data/providers/neuralwatt/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.neuralwatt.com/v1/models", {
      schema: responseSchema,
      label: "Neuralwatt API error",
    });

    progress?.tick(
      `api.neuralwatt.com/v1/models (${response.data.length})`,
      true,
    );

    return response.data
      .filter((model) => model.metadata?.deprecated !== true)
      .map((model) => {
        const capabilities = model.metadata?.capabilities ?? undefined;
        const pricing = model.metadata?.pricing ?? undefined;
        const limits = model.metadata?.limits ?? undefined;
        const hasPricing = pricing && !pricing.pricing_tbd;
        const hasVision = capabilities?.vision === true;

        return compactObject({
          id: model.id,
          name: model.metadata?.display_name ?? model.id,
          release_date:
            model.created > 0
              ? timestampFromUnixSeconds(model.created)
              : undefined,
          features: compactObject({
            attachment: capabilities !== undefined ? hasVision : undefined,
            reasoning:
              capabilities !== undefined
                ? capabilities.reasoning === true
                : undefined,
            tool_call:
              capabilities !== undefined
                ? capabilities.tools === true
                : undefined,
            structured_output:
              capabilities !== undefined
                ? capabilities.json_mode === true
                : undefined,
          }),
          pricing: compactObject({
            input: hasPricing
              ? nonNegativeNumber(pricing!.input_per_million)
              : undefined,
            output: hasPricing
              ? nonNegativeNumber(pricing!.output_per_million)
              : undefined,
            cache_read: hasPricing
              ? nonNegativeNumber(pricing!.cached_input_per_million)
              : undefined,
          }),
          limit: compactObject({
            context: integerGreaterThanZero(
              limits?.max_context_length ?? model.max_model_len,
            ),
            output: integerGreaterThanZero(limits?.max_output_tokens),
          }),
          modalities: hasVision
            ? compactObject({
                input: ["text", "image"] as ModelModality[],
                output: ["text"] as ModelModality[],
              })
            : undefined,
        });
      });
  },
};
