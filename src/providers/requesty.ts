import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  pricePerMillion,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number().optional(),
  input_price: z.number().nullish(),
  output_price: z.number().nullish(),
  caching_price: z.number().nullish(),
  cached_price: z.number().nullish(),
  context_window: z.number().nullish(),
  max_output_tokens: z.number().nullish(),
  supports_caching: z.boolean().optional(),
  supports_vision: z.boolean().optional(),
  supports_reasoning: z.boolean().optional(),
  supports_tool_calling: z.boolean().optional(),
  supports_image_generation: z.boolean().optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function buildModalities(model: z.infer<typeof apiModelSchema>) {
  const input = ["text"] as ModelModality[];

  if (model.supports_vision || model.supports_image_generation) {
    input.push("image");
  }

  const output = model.supports_image_generation
    ? (["text", "image"] as ModelModality[])
    : (["text"] as ModelModality[]);

  return { input, output };
}

export const requestyProvider: ProviderDefinition = {
  name: "requesty",
  outputDirectory: "data/providers/requesty/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://router.requesty.ai/v1/models", {
      schema: responseSchema,
      label: "Requesty API error",
    });

    progress?.tick(
      `router.requesty.ai/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const modalities = buildModalities(model);

      return compactObject({
        id: model.id,
        name: model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: model.supports_vision || model.supports_image_generation,
          reasoning: model.supports_reasoning,
          tool_call: model.supports_tool_calling,
        }),
        pricing: compactObject({
          input: pricePerMillion(model.input_price),
          output: pricePerMillion(model.output_price),
          cache_read:
            model.supports_caching === false
              ? undefined
              : pricePerMillion(model.cached_price),
          cache_write:
            model.supports_caching === false
              ? undefined
              : pricePerMillion(model.caching_price),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_window),
          output: integerGreaterThanZero(model.max_output_tokens),
        }),
        modalities,
      });
    });
  },
};
