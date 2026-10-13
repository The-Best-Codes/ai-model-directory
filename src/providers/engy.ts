import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, pricePerMillion } from "../lib/model.ts";
import { filterModalities, hasAttachmentSource } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
  context_length: z.number().optional(),
  pricing: z
    .object({
      prompt: z.string().optional(),
      completion: z.string().optional(),
      input_cache_read: z.string().optional(),
    })
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const engyProvider: ProviderDefinition = {
  name: "engy",
  outputDirectory: "data/providers/engy/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.engy.ai/v1/models", {
      schema: responseSchema,
      label: "Engy API error",
    });

    progress?.tick(`api.engy.ai/v1/models (${response.data.length})`, true);

    return response.data.map((model) =>
      compactObject({
        id: model.id,
        name: model.id,
        features: compactObject({
          attachment: hasAttachmentSource(model.input_modalities),
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing?.prompt),
          output: pricePerMillion(model.pricing?.completion),
          cache_read: pricePerMillion(model.pricing?.input_cache_read),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
        }),
        modalities: compactObject({
          input: filterModalities(model.input_modalities),
          output: filterModalities(model.output_modalities),
        }),
      }),
    );
  },
};
