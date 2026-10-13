import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  pricePerMillion,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import {
  filterModalities,
  hasAnyString,
  hasAttachmentSource,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const pricingSchema = z.object({
  prompt: z.string().optional(),
  completion: z.string().optional(),
  input_cache_read: z.string().optional(),
});

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  created: z.number().optional(),
  context_length: z.number().optional(),
  max_output_length: z.number().optional(),
  architecture: z
    .object({
      input_modalities: z.array(z.string()).optional(),
      output_modalities: z.array(z.string()).optional(),
    })
    .optional(),
  pricing: z.union([pricingSchema, z.array(pricingSchema)]).optional(),
  supported_parameters: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const xiaomiProvider: ProviderDefinition = {
  name: "xiaomi",
  outputDirectory: "data/providers/xiaomi/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://platform.xiaomimimo.com/api/v1/models",
      {
        schema: responseSchema,
        label: "Xiaomi MiMo API error",
      },
    );

    progress?.tick(
      `platform.xiaomimimo.com/api/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const parameters = model.supported_parameters;
      const pricing = Array.isArray(model.pricing)
        ? model.pricing[0]
        : model.pricing;

      return compactObject({
        id: model.id,
        name: model.name?.replace(/\s*[:：]\s*/, ": ") ?? model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: hasAttachmentSource(model.architecture?.input_modalities),
          reasoning: parameters
            ? hasAnyString(parameters, "reasoning", "include_reasoning")
            : undefined,
          tool_call: parameters
            ? hasAnyString(parameters, "tools", "tool_choice")
            : undefined,
          structured_output: parameters
            ? hasAnyString(parameters, "response_format")
            : undefined,
          temperature: parameters
            ? hasAnyString(parameters, "temperature")
            : undefined,
        }),
        pricing: compactObject({
          input: pricePerMillion(pricing?.prompt),
          output: pricePerMillion(pricing?.completion),
          cache_read: pricePerMillion(pricing?.input_cache_read),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_output_length),
        }),
        modalities: compactObject({
          input: filterModalities(model.architecture?.input_modalities),
          output: filterModalities(model.architecture?.output_modalities),
        }),
      });
    });
  },
};
