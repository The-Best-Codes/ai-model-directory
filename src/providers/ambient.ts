import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  pricePerMillion,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { filterModalities, hasAnyString } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiPriceSchema = z.object({
  input: z.number().nullish(),
  output: z.number().nullish(),
  input_cache_read: z.string().nullish(),
  input_cache_write: z.string().nullish(),
});

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  created: z.number().nullish(),
  input_modalities: z.array(z.string()).nullish(),
  output_modalities: z.array(z.string()).nullish(),
  context_length: z.number().nullish(),
  max_output_length: z.number().nullish(),
  pricing: apiPriceSchema.nullish(),
  supported_features: z.array(z.string()).nullish(),
  is_ready: z.boolean().nullish(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

const controlCharacterPattern = /[\u0000-\u001f\u007f]/g;

function sanitizeName(value: string | null | undefined): string | undefined {
  if (!value) return undefined;

  const sanitized = value.replace(controlCharacterPattern, "").trim();
  return sanitized.length > 0 ? sanitized : undefined;
}

export const ambientProvider: ProviderDefinition = {
  name: "ambient",
  outputDirectory: "data/providers/ambient/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.ambient.xyz/v1/models", {
      schema: responseSchema,
      label: "Ambient API error",
    });

    progress?.tick(`api.ambient.xyz/v1/models (${response.data.length})`, true);

    return response.data
      .filter((model) => model.is_ready !== false)
      .map((model) => {
        const inputModalities = filterModalities(model.input_modalities);
        const outputModalities = filterModalities(model.output_modalities);
        const features = model.supported_features ?? [];
        const pricing = model.pricing;

        return compactObject({
          id: model.id,
          name: sanitizeName(model.name) ?? model.id,
          release_date: timestampFromUnixSeconds(model.created ?? undefined),
          features: compactObject({
            attachment:
              inputModalities?.some(
                (modality: string) => modality !== "text",
              ) ?? undefined,
            reasoning: hasAnyString(features, "reasoning"),
            structured_output: hasAnyString(features, "structured_outputs"),
            tool_call: hasAnyString(features, "tools"),
          }),
          pricing: compactObject({
            input: nonNegativeNumber(pricing?.input),
            output: nonNegativeNumber(pricing?.output),
            cache_read: pricePerMillion(pricing?.input_cache_read),
            cache_write: pricePerMillion(pricing?.input_cache_write),
          }),
          limit: compactObject({
            context: integerGreaterThanZero(model.context_length),
            output: integerGreaterThanZero(model.max_output_length),
          }),
          modalities: compactObject({
            input: inputModalities,
            output: outputModalities,
          }),
        });
      });
  },
};
