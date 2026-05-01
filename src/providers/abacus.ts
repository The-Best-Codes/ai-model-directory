import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { nonNegativeInteger, pricePerMillion } from "../lib/model.ts";
import { filterModalities, hasAttachmentSource } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  display_name: z.string().optional(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
  input_token_rate: z.string().optional(),
  output_token_rate: z.string().optional(),
  cached_input_token_rate: z.string().optional(),
  context_length: z.number().optional(),
  max_completion_tokens: z.number().optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const abacusProvider: ProviderDefinition = {
  name: "abacus",
  outputDirectory: "data/providers/abacus/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://routellm.abacus.ai/v1/models", {
      schema: responseSchema,
      headers: withBearerToken(process.env.ABACUS_API_KEY),
      label: "Abacus API error",
    });

    progress?.tick(
      `routellm.abacus.ai/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = filterModalities(model.input_modalities);
      const output = filterModalities(model.output_modalities);

      return compactObject({
        id: model.id,
        name: model.display_name || model.name || model.id,
        features: compactObject({
          attachment: hasAttachmentSource(model.input_modalities),
        }),
        pricing: compactObject({
          input: pricePerMillion(model.input_token_rate),
          output: pricePerMillion(model.output_token_rate),
          cache_read: pricePerMillion(model.cached_input_token_rate),
        }),
        limit: compactObject({
          context: nonNegativeInteger(model.context_length),
          output: nonNegativeInteger(model.max_completion_tokens),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
