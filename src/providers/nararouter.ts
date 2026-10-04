import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const responseSchema = z.object({
  usd_to_idr: z.number().positive(),
  data: z.array(
    z.object({
      alias: z.string(),
      display_name: z.string(),
      input_credit_per_1k: z.number().nonnegative(),
      output_credit_per_1k: z.number().nonnegative(),
      cache_read_credit_per_1k: z.number().nonnegative().nullable(),
      supports_vision: z.boolean(),
      supports_image_generation: z.boolean(),
      supports_video_generation: z.boolean(),
      reasoning: z.boolean(),
      max_context_tokens: z.number().nullable(),
    }),
  ),
});

export const nararouterProvider: ProviderDefinition = {
  name: "nararouter",
  outputDirectory: "data/providers/nararouter/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const response = await fetchJson("https://router.bynara.id/api/pricing", {
      schema: responseSchema,
      label: "NaraRouter pricing API error",
    });
    progress?.tick(
      `router.bynara.id/api/pricing (${response.data.length})`,
      true,
    );
    const price = (value: number | null) =>
      value === null
        ? undefined
        : new Decimal(value).mul(1000).div(response.usd_to_idr).toNumber();
    return response.data.map((model) => {
      const input: ModelModality[] = model.supports_vision
        ? ["text", "image"]
        : ["text"];
      const output: ModelModality[] = model.supports_video_generation
        ? ["video"]
        : model.supports_image_generation
          ? ["image"]
          : ["text"];
      return compactObject({
        id: model.alias,
        name: model.display_name,
        features: {
          attachment: model.supports_vision,
          reasoning: model.reasoning,
        },
        limit: compactObject({
          context: integerGreaterThanZero(model.max_context_tokens),
        }),
        modalities: { input, output },
        pricing: output.includes("text")
          ? compactObject({
              input: price(model.input_credit_per_1k),
              output: price(model.output_credit_per_1k),
              cache_read: price(model.cache_read_credit_per_1k),
            })
          : undefined,
      });
    });
  },
};
