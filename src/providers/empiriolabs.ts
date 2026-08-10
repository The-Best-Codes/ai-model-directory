import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  pricePerMillion,
  timestampFromDateInput,
} from "../lib/model.ts";
import { filterModalities } from "./helpers.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const modalityMap = new Map<string, ModelModality>([
  ["text", "text"],
  ["image", "image"],
  ["audio", "audio"],
  ["video", "video"],
  ["file", "file"],
  ["document", "file"],
  ["3d", "image"],
]);

const pricingEntrySchema = z.object({
  prompt: z.string(),
  completion: z.string(),
  input_cache_read: z.string().optional(),
});

const apiModelSchema = z.object({
  id: z.string(),
  display_name: z.string(),
  type: z.string().nullable().optional(),
  input_modalities: z.array(z.string()).nullable().optional(),
  output_modalities: z.array(z.string()).nullable().optional(),
  features: z.array(z.string()).nullable().optional(),
  structured_output: z.string().nullable().optional(),
  context_window: z.number().nullable().optional(),
  context_length: z.number().nullable().optional(),
  max_output_tokens: z.number().nullable().optional(),
  model_released_at: z.string().nullable().optional(),
  capabilities: z
    .object({
      reasoning: z.boolean().optional(),
      images: z.boolean().optional(),
      audio: z.boolean().optional(),
      video: z.boolean().optional(),
    })
    .optional(),
  pricing: z
    .union([pricingEntrySchema, z.array(pricingEntrySchema)])
    .nullable()
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function parseModalities(
  values: readonly string[] | null | undefined,
): ModelModality[] | undefined {
  return filterModalities(
    values?.map((value) => {
      const mapped = modalityMap.get(value.trim().toLowerCase());
      return mapped ?? value;
    }),
  );
}

function basePricing(model: z.infer<typeof apiModelSchema>) {
  const pricing = model.pricing;

  if (Array.isArray(pricing)) {
    return pricing[0];
  }

  return pricing ?? undefined;
}

function hasTokenPricing(entry: z.infer<typeof pricingEntrySchema>) {
  return (
    Number(entry.prompt) > 0 ||
    Number(entry.completion) > 0 ||
    Number(entry.input_cache_read ?? "0") > 0
  );
}

export const empiriolabsProvider: ProviderDefinition = {
  name: "empiriolabs",
  outputDirectory: "data/providers/empiriolabs/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.empiriolabs.ai/v1/models", {
      schema: responseSchema,
      label: "EmpirioLabs API error",
    });

    progress?.tick(
      `api.empiriolabs.ai/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = parseModalities(model.input_modalities);
      const output = parseModalities(model.output_modalities);
      const pricing = basePricing(model);
      const features = new Set(
        model.features?.map((feature) => feature.trim().toLowerCase()),
      );

      return compactObject({
        id: model.id,
        name: model.display_name,
        release_date: timestampFromDateInput(model.model_released_at),
        features: compactObject({
          attachment: input?.some((modality) => modality !== "text"),
          reasoning:
            model.capabilities?.reasoning || features.has("reasoning")
              ? true
              : undefined,
          tool_call:
            features.has("function_calling") ||
            features.has("tool_use") ||
            features.has("tools")
              ? true
              : undefined,
          structured_output:
            model.structured_output === "json_object" ||
            model.structured_output === "json_schema" ||
            features.has("structured_output") ||
            features.has("json_mode")
              ? true
              : undefined,
        }),
        pricing:
          pricing && hasTokenPricing(pricing)
            ? compactObject({
                input: pricePerMillion(pricing.prompt),
                output: pricePerMillion(pricing.completion),
                cache_read: pricePerMillion(pricing.input_cache_read),
              })
            : undefined,
        limit: compactObject({
          context: integerGreaterThanZero(
            model.context_window ?? model.context_length,
          ),
          output: integerGreaterThanZero(model.max_output_tokens),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
