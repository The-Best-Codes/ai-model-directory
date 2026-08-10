import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, pricePerMillion } from "../lib/model.ts";
import { filterModalities, hasAttachmentSource } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  created: z.number(),
  context_length: z.number(),
  architecture: z.object({
    input_modalities: z.array(z.string()),
    output_modalities: z.array(z.string()),
  }),
  pricing: z.object({
    prompt: z.string(),
    completion: z.string(),
  }),
  top_provider: z.object({
    context_length: z.number().nullable(),
    max_completion_tokens: z.number().nullable(),
  }),
  trustedrouter: z.object({
    open_weights: z.boolean(),
  }),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const trustedrouterProvider: ProviderDefinition = {
  name: "trustedrouter",
  outputDirectory: "data/providers/trustedrouter/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://api.trustedrouter.com/v1/models",
      {
        schema: responseSchema,
        label: "TrustedRouter API error",
      },
    );

    progress?.tick(
      `api.trustedrouter.com/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = filterModalities(model.architecture.input_modalities);
      const output = filterModalities(model.architecture.output_modalities);

      return compactObject({
        id: model.id,
        name: model.name.replace(/[\t\r\n]/g, ""),
        open_weights: model.trustedrouter.open_weights,
        features: compactObject({
          attachment: hasAttachmentSource(model.architecture.input_modalities),
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing.prompt),
          output: pricePerMillion(model.pricing.completion),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(
            model.top_provider.max_completion_tokens,
          ),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
