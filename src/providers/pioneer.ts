import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, nonNegativeNumber } from "../lib/model.ts";
import { filterModalities } from "./helpers.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const capabilitiesSchema = z.object({
  image_input: z.object({ supported: z.boolean() }),
  pdf_input: z.object({ supported: z.boolean() }),
  structured_outputs: z.object({ supported: z.boolean() }),
  thinking: z.object({ supported: z.boolean() }),
});

const apiModelSchema = z.object({
  id: z.string(),
  display_name: z.string(),
  deprecated: z.boolean(),
  max_input_tokens: z.number(),
  max_tokens: z.number(),
  capabilities: capabilitiesSchema,
  input_price_per_million: z.number(),
  output_price_per_million: z.number(),
  cache_read_price_per_million: z.number(),
  cache_write_price_per_million: z.number(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function buildModalities(model: z.infer<typeof apiModelSchema>) {
  const input = ["text"] as ModelModality[];

  if (model.capabilities.image_input.supported) {
    input.push("image");
  }

  if (model.capabilities.pdf_input.supported) {
    input.push("file");
  }

  return compactObject({
    input: filterModalities(input),
    output: filterModalities(["text"]),
  });
}

export const pioneerProvider: ProviderDefinition = {
  name: "pioneer",
  outputDirectory: "data/providers/pioneer/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.pioneer.ai/v1/models", {
      schema: responseSchema,
      label: "Pioneer API error",
    });

    progress?.tick(`api.pioneer.ai/v1/models (${response.data.length})`, true);

    return response.data
      .filter((model) => !model.deprecated)
      .map((model) => {
        const modalities = buildModalities(model);

        return compactObject({
          id: model.id,
          name: model.display_name,
          features: compactObject({
            attachment:
              model.capabilities.image_input.supported ||
              model.capabilities.pdf_input.supported,
            reasoning: model.capabilities.thinking.supported,
            structured_output: model.capabilities.structured_outputs.supported,
          }),
          pricing: compactObject({
            input: nonNegativeNumber(model.input_price_per_million),
            output: nonNegativeNumber(model.output_price_per_million),
            cache_read: nonNegativeNumber(model.cache_read_price_per_million),
            cache_write: nonNegativeNumber(model.cache_write_price_per_million),
          }),
          limit: compactObject({
            input: integerGreaterThanZero(model.max_input_tokens),
            output: integerGreaterThanZero(model.max_tokens),
          }),
          modalities,
        });
      });
  },
};
