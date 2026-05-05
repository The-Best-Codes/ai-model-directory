import { z } from "zod";

import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, pricePerMillion } from "../lib/model.ts";
import { fetchJson } from "../lib/http.ts";
import {
  filterModalities,
  hasAnyString,
  hasAttachmentSupport,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const pricingSchema = z
  .object({
    prompt: z.string().nullable().optional(),
    completion: z.string().nullable().optional(),
    input_cache_read: z.string().nullable().optional(),
    input_cache_write: z.string().nullable().optional(),
  })
  .nullable();

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number().optional(),
  description: z.string().optional(),
  architecture: z
    .object({
      input_modalities: z.array(z.string()).optional(),
      output_modalities: z.array(z.string()).optional(),
    })
    .optional(),
  supported_features: z.array(z.string()).optional(),
  pricing: pricingSchema.optional(),
  context_window: z
    .object({
      context_length: z.number().nullable().optional(),
      max_output_tokens: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
  context_length: z.number().nullable().optional(),
  metadata: z
    .object({
      display_name: z.string().optional(),
    })
    .optional(),
  reasoning: z
    .object({
      required: z.boolean().optional(),
      supports_reasoning_effort: z.boolean().optional(),
    })
    .nullable()
    .optional(),
  parameters: z
    .array(
      z.object({
        name: z.string(),
      }),
    )
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function timestampFromUnixMilliseconds(
  value: number | null | undefined,
): string | undefined {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(value) ||
    value < 0
  ) {
    return undefined;
  }

  return String(Math.trunc(value / 1000));
}

export const poeProvider: ProviderDefinition = {
  name: "poe",
  outputDirectory: "data/providers/poe/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.poe.com/v1/models", {
      schema: responseSchema,
      label: "Poe API error",
    });

    progress?.tick(`api.poe.com/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const input = filterModalities(model.architecture?.input_modalities);
      const output = filterModalities(model.architecture?.output_modalities);
      const parameterNames =
        model.parameters?.map((parameter) => parameter.name) ?? [];
      const context =
        model.context_window?.context_length ??
        model.context_length ??
        undefined;
      const outputLimit = model.context_window?.max_output_tokens ?? undefined;

      return compactObject({
        id: model.id,
        name: model.metadata?.display_name?.trim() || model.id,
        release_date: timestampFromUnixMilliseconds(model.created),
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning:
            model.reasoning?.required === true ||
            model.reasoning?.supports_reasoning_effort === true ||
            hasAnyString(
              parameterNames,
              "enable_thinking",
              "thinking_budget",
              "reasoning_effort",
            ),
          tool_call: hasAnyString(model.supported_features, "tools"),
          temperature: hasAnyString(parameterNames, "temperature"),
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing?.prompt),
          output: pricePerMillion(model.pricing?.completion),
          cache_read: pricePerMillion(model.pricing?.input_cache_read),
          cache_write: pricePerMillion(model.pricing?.input_cache_write),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(context),
          output: integerGreaterThanZero(outputLimit),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
