import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { filterModalities, hasAttachmentSource } from "./helpers.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const priceBase = new Decimal(2);

const apiModelSchema = z.object({
  model_name: z.string(),
  tags: z.string().optional(),
  quota_type: z.number(),
  model_ratio: z.number(),
  model_price: z.number(),
  completion_ratio: z.number(),
  cache_ratio: z.number().optional(),
  create_cache_ratio: z.number().optional(),
  audio_ratio: z.number().optional(),
  audio_completion_ratio: z.number().optional(),
  supported_endpoint_types: z.array(z.string()).optional(),
});

const responseSchema = z.object({
  success: z.boolean(),
  data: z.array(apiModelSchema),
});

const textModality: ModelModality[] = ["text"];
const imageModality: ModelModality[] = ["image"];

function priceFromRatio(
  ratio: number | undefined,
  multiplier: number | undefined = 1,
): number | undefined {
  if (ratio === undefined || ratio < 0 || multiplier < 0) {
    return undefined;
  }

  return priceBase.mul(ratio).mul(multiplier).toNumber();
}

export const tokenrouterProvider: ProviderDefinition = {
  name: "tokenrouter",
  outputDirectory: "data/providers/tokenrouter/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://www.tokenrouter.com/backend-api/api/pricing?sort_type=5",
      {
        schema: responseSchema,
        label: "TokenRouter pricing API error",
      },
    );

    progress?.tick(
      `tokenrouter.com/backend-api/api/pricing (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const tags = model.tags
        ?.split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      const input = filterModalities(tags) ?? textModality;
      const output = model.supported_endpoint_types?.some((endpoint) =>
        endpoint.includes("image"),
      )
        ? imageModality
        : (filterModalities(tags) ?? textModality);

      return compactObject({
        id: model.model_name,
        name: model.model_name,
        features: compactObject({
          attachment: hasAttachmentSource(input) ?? false,
        }),
        pricing: compactObject({
          input:
            model.quota_type === 0
              ? priceFromRatio(model.model_ratio)
              : undefined,
          output:
            model.quota_type === 0
              ? priceFromRatio(model.model_ratio, model.completion_ratio)
              : priceFromRatio(model.model_price),
          cache_read: priceFromRatio(model.model_ratio, model.cache_ratio),
          cache_write: priceFromRatio(
            model.model_ratio,
            model.create_cache_ratio,
          ),
          input_audio: priceFromRatio(model.model_ratio, model.audio_ratio),
          output_audio: priceFromRatio(
            model.model_ratio,
            model.audio_completion_ratio,
          ),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
