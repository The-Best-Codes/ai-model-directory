import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const pricingBreakdownSchema = z
  .object({
    example_price: z.number().nullish().optional(),
    price_per_minute: z.number().nullish().optional(),
  })
  .passthrough();

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  type: z.string().optional(),
  display_name: z.string().optional(),
  context_length: z.number().nullish(),
  pricing: z
    .object({
      input: z.number().nullish(),
      output: z.number().nullish(),
      cached_input: z.number().nullish().optional(),
      transcribe: z.union([z.number(), pricingBreakdownSchema]).nullish(),
      image: z.union([z.number(), pricingBreakdownSchema]).nullish(),
      video: z.union([z.number(), pricingBreakdownSchema]).nullish(),
    })
    .nullish(),
});

const responseSchema = z.array(apiModelSchema);

function inferModalities(type: string | undefined): {
  input?: ModelModality[];
  output?: ModelModality[];
} {
  const normalized = type?.trim().toLowerCase();

  if (!normalized) {
    return {};
  }

  if (
    normalized.includes("transcription") ||
    normalized.includes("transcribe") ||
    normalized.includes("speech-to-text")
  ) {
    return { input: ["audio"], output: ["text"] };
  }

  if (
    normalized.includes("text-to-speech") ||
    normalized.includes("speech") ||
    normalized.includes("audio")
  ) {
    return { input: ["text"], output: ["audio"] };
  }

  if (normalized.includes("image")) {
    return { input: ["text"], output: ["image"] };
  }

  if (normalized.includes("embedding") || normalized.includes("rerank")) {
    return { input: ["text"] };
  }

  if (
    normalized.includes("chat") ||
    normalized.includes("code") ||
    normalized.includes("language") ||
    normalized.includes("moderation") ||
    normalized.includes("completion")
  ) {
    return { input: ["text"], output: ["text"] };
  }

  return {};
}

export const togetheraiProvider: ProviderDefinition = {
  name: "togetherai",
  outputDirectory: "data/providers/togetherai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.together.ai/v1/models", {
      schema: responseSchema,
      headers: withBearerToken(process.env.TOGETHER_API_KEY),
      label: "Together AI API error",
    });

    progress?.tick(`api.together.ai/v1/models (${response.length})`, true);

    return response.map((model) => {
      const modalities = inferModalities(model.type);
      const hasAttachments = modalities.input?.some(
        (modality) => modality !== "text",
      );
      const hasSpecializedPricing =
        typeof model.pricing?.image === "object" ||
        typeof model.pricing?.video === "object" ||
        typeof model.pricing?.transcribe === "object";
      const inputPrice = nonNegativeNumber(model.pricing?.input);
      const outputPrice = nonNegativeNumber(model.pricing?.output);
      const cacheReadPrice = nonNegativeNumber(model.pricing?.cached_input);

      return compactObject({
        id: model.id,
        name: model.display_name ?? model.id,
        release_date:
          model.created > 0
            ? timestampFromUnixSeconds(model.created)
            : undefined,
        features: compactObject({
          attachment: hasAttachments,
        }),
        pricing: compactObject({
          input:
            hasSpecializedPricing && inputPrice === 0 ? undefined : inputPrice,
          output:
            hasSpecializedPricing && outputPrice === 0
              ? undefined
              : outputPrice,
          cache_read:
            hasSpecializedPricing && cacheReadPrice === 0
              ? undefined
              : cacheReadPrice,
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
        }),
        modalities: compactObject(modalities),
      });
    });
  },
};
