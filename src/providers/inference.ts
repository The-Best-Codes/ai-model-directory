import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, pricePerMillion } from "../lib/model.ts";
import { filterModalities, hasAttachmentSource } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  context_length: z.number().optional(),
  max_completion_tokens: z.number().optional(),
  reasoning_efforts: z.array(z.string()).optional(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
  pricing: z
    .object({
      prompt: z.string().optional(),
      completion: z.string().optional(),
      input_cache_read: z.string().optional(),
    })
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const inferenceProvider: ProviderDefinition = {
  name: "inference",
  outputDirectory: "data/providers/inference/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.inference.net/v1/models", {
      schema: responseSchema,
      label: "Inference.net API error",
    });

    progress?.tick(
      `api.inference.net/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) =>
      compactObject({
        id: model.id,
        name: model.id,
        features: compactObject({
          attachment: hasAttachmentSource(model.input_modalities),
          reasoning: model.reasoning_efforts?.some(
            (effort) => effort !== "none",
          ),
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing?.prompt),
          output: pricePerMillion(model.pricing?.completion),
          cache_read: pricePerMillion(model.pricing?.input_cache_read),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_completion_tokens),
        }),
        modalities: compactObject({
          input: filterModalities(model.input_modalities),
          output: filterModalities(model.output_modalities),
        }),
      }),
    );
  },
};
