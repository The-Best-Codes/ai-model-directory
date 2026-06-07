import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, pricePerMillion } from "../lib/model.ts";
import { filterModalities, hasAttachmentSource } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  created: z.number().optional(),
  context_length: z.number().optional(),
  max_completion_tokens: z.number().optional(),
  architecture: z
    .object({
      input_modalities: z.array(z.string()).nullable().optional(),
      output_modalities: z.array(z.string()).nullable().optional(),
    })
    .optional(),
  pricing: z
    .object({
      prompt: z.string().optional(),
      completion: z.string().optional(),
    })
    .optional(),
});

const responseSchema = z.object({
  data: z.array(apiModelSchema),
  success: z.boolean(),
});

export const orcarouterProvider: ProviderDefinition = {
  name: "orcarouter",
  outputDirectory: "data/providers/orcarouter/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.orcarouter.ai/v1/models", {
      schema: responseSchema,
      label: "OrcaRouter API error",
    });

    progress?.tick(
      `api.orcarouter.ai/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = filterModalities(
        model.architecture?.input_modalities ?? null,
      );
      const output = filterModalities(
        model.architecture?.output_modalities ?? null,
      );

      return compactObject({
        id: model.id,
        name: model.name,
        features: compactObject({
          attachment: hasAttachmentSource(
            model.architecture?.input_modalities ?? null,
          ),
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing?.prompt),
          output: pricePerMillion(model.pricing?.completion),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_completion_tokens),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
