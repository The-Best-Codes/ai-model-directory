import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromDateInput,
} from "../lib/model.ts";
import {
  filterModalities,
  hasAnyString,
  hasAttachmentSource,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const endpointPricingSchema = z.object({
  prompt: z.number().nullish(),
  completion: z.number().nullish(),
  cacheRead: z.number().nullish(),
  cacheWrite: z.number().nullish(),
});

const endpointSchema = z.object({
  provider: z.string(),
  providerSlug: z.string(),
  pricing: endpointPricingSchema.optional(),
});

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  contextLength: z.number().nullish(),
  maxOutput: z.number().nullish(),
  trainingDate: z.string().nullish(),
  inputModalities: z.array(z.string()).optional().default([]),
  outputModalities: z.array(z.string()).optional().default([]),
  supportedParameters: z.array(z.string()).optional().default([]),
  endpoints: z.array(endpointSchema).optional().default([]),
});

const responseSchema = z.object({
  data: z.object({ models: z.array(apiModelSchema) }),
});

function pickPricing(
  endpoints: ReadonlyArray<z.infer<typeof endpointSchema>>,
): z.infer<typeof endpointPricingSchema> | undefined {
  const helicone = endpoints.find((entry) => entry.providerSlug === "helicone");
  return (helicone ?? endpoints[0])?.pricing;
}

export const heliconeProvider: ProviderDefinition = {
  name: "helicone",
  outputDirectory: "data/providers/helicone/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://jawn.helicone.ai/v1/public/model-registry/models",
      {
        schema: responseSchema,
        label: "Helicone API error",
      },
    );

    progress?.tick(
      `jawn.helicone.ai/v1/public/model-registry/models (${response.data.models.length})`,
      true,
    );

    return response.data.models.map((model) => {
      const input = filterModalities(model.inputModalities);
      const output = filterModalities(model.outputModalities);
      const pricing = pickPricing(model.endpoints);

      return compactObject({
        id: model.id,
        name: model.name,
        knowledge_cutoff: timestampFromDateInput(model.trainingDate, {
          rejectEpoch: true,
        }),
        features: {
          attachment: hasAttachmentSource(model.inputModalities) ?? false,
          reasoning: hasAnyString(
            model.supportedParameters,
            "reasoning",
            "reasoning_effort",
            "include_reasoning",
          ),
          tool_call: hasAnyString(
            model.supportedParameters,
            "tools",
            "tool_choice",
            "parallel_tool_calls",
          ),
          structured_output: hasAnyString(
            model.supportedParameters,
            "structured_outputs",
            "response_format",
          ),
          temperature: hasAnyString(model.supportedParameters, "temperature"),
        },
        pricing: compactObject({
          input: nonNegativeNumber(pricing?.prompt),
          output: nonNegativeNumber(pricing?.completion),
          cache_read: nonNegativeNumber(pricing?.cacheRead),
          cache_write: nonNegativeNumber(pricing?.cacheWrite),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.contextLength ?? undefined),
          output: integerGreaterThanZero(model.maxOutput ?? undefined),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
