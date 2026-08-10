import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, nonNegativeNumber } from "../lib/model.ts";
import { filterModalities } from "./helpers.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const pricingSchema = z.object({
  input_per_mtok_usd: z.number().optional(),
  output_per_mtok_usd: z.number().optional(),
  cached_input_per_mtok_usd: z.number().optional(),
  cache_write_per_mtok_usd: z.number().optional(),
});

const apiModelSchema = z.object({
  id: z.string(),
  display_name: z.string(),
  context_window: z.number().optional(),
  output_modality: z.string().optional(),
  input_modalities: z.array(z.string()).optional(),
  endpoints: z.array(z.string()).optional(),
  pricing: pricingSchema.optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

const outputModalityMap = new Map<string, ModelModality[]>([
  ["text", ["text"]],
  ["image", ["image"]],
  ["audio_speech", ["audio"]],
  ["audio_transcription", ["text"]],
]);

export const impossiblProvider: ProviderDefinition = {
  name: "impossibl",
  outputDirectory: "data/providers/impossibl/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.impossibl.com/v1/models", {
      schema: responseSchema,
      label: "Impossibl API error",
    });

    progress?.tick(
      `api.impossibl.com/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = filterModalities(model.input_modalities);
      const output = outputModalityMap.get(model.output_modality ?? "");

      return compactObject({
        id: model.id,
        name: model.display_name,
        pricing: compactObject({
          input: nonNegativeNumber(model.pricing?.input_per_mtok_usd),
          output: nonNegativeNumber(model.pricing?.output_per_mtok_usd),
          cache_read: nonNegativeNumber(
            model.pricing?.cached_input_per_mtok_usd,
          ),
          cache_write: nonNegativeNumber(
            model.pricing?.cache_write_per_mtok_usd,
          ),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_window),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
