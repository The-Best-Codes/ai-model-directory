import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  convertCurrencyAmount,
  fetchCurrencyExchangeRate,
} from "../lib/pricing.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number().int().nonnegative().optional(),
});

const modelsResponseSchema = z.object({ data: z.array(apiModelSchema) });

const tagSchema = z.object({ slug: z.string() });

const operationSummarySchema = z
  .object({
    min_input_million_tokens_price: z.number().nullish().optional(),
    min_output_million_tokens_price: z.number().nullish().optional(),
  })
  .passthrough();

const serviceSchema = z.object({
  ident: z.string(),
  created_at: z.number().int().nonnegative().nullish().optional(),
  updated_at: z.number().int().nonnegative().nullish().optional(),
  tags: z.array(tagSchema).nullish().optional(),
  operation_summary: operationSummarySchema.nullish().optional(),
});

const servicesResponseSchema = z.object({ items: z.array(serviceSchema) });

function timestampFromUnixMilliseconds(
  value: number | null | undefined,
): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  return Number.isInteger(value) && value >= 0
    ? String(Math.trunc(value / 1000))
    : undefined;
}

function parseKiloTokenCount(value: string): number | undefined {
  const match = value.match(/^(\d+(?:\.\d+)?)k$/i);

  if (!match) {
    return undefined;
  }

  const parsed = Number(match[1]);

  return Number.isFinite(parsed) && parsed > 0
    ? Math.round(parsed * 1000)
    : undefined;
}

function contextLimitFromTags(tagSet: ReadonlySet<string>): number | undefined {
  let result: number | undefined;

  for (const tag of tagSet) {
    const normalized = tag.toLowerCase();
    const match = normalized.match(/^context_size_(\d+(?:\.\d+)?k)$/);
    const direct = normalized.match(/^(\d+(?:\.\d+)?k)$/);
    const labeled = normalized.match(/^(\d+(?:\.\d+)?k)-label$/);
    const value = match?.[1] ?? direct?.[1] ?? labeled?.[1];
    const parsed = value ? parseKiloTokenCount(value) : undefined;

    if (parsed !== undefined) {
      result = result === undefined ? parsed : Math.max(result, parsed);
    }
  }

  return result;
}

function outputLimitFromTags(tagSet: ReadonlySet<string>): number | undefined {
  let result: number | undefined;

  for (const tag of tagSet) {
    const normalized = tag.toLowerCase();
    const contextMatch = normalized.match(
      /^context_size_output_(\d+(?:\.\d+)?k)$/,
    );
    const maxTokensMatch = normalized.match(/^max_tokens_(\d+(?:\.\d+)?k)$/);
    const value = contextMatch?.[1] ?? maxTokensMatch?.[1];
    const parsed = value ? parseKiloTokenCount(value) : undefined;

    if (parsed !== undefined) {
      result = result === undefined ? parsed : Math.max(result, parsed);
    }
  }

  return result;
}

function sortModalities(
  value: Set<ModelModality>,
): ModelModality[] | undefined {
  const order: readonly ModelModality[] = [
    "audio",
    "file",
    "image",
    "text",
    "video",
  ];

  return value.size > 0 ? order.filter((entry) => value.has(entry)) : undefined;
}

function inferModalities(tags: readonly string[]): {
  input?: ModelModality[];
  output?: ModelModality[];
} {
  const input = new Set<ModelModality>();
  const output = new Set<ModelModality>();
  const tagSet = new Set(tags);

  if (
    tagSet.has("text-generation") ||
    tagSet.has("chat_completion") ||
    tagSet.has("code-generation") ||
    tagSet.has("function_calling") ||
    tagSet.has("deep_reflection_label")
  ) {
    input.add("text");
    output.add("text");
  }

  if (tagSet.has("embedding-rerank")) {
    input.add("text");
  }

  if (
    tagSet.has("vision-language") ||
    tagSet.has("vision-language-label") ||
    tagSet.has("multi-modal") ||
    tagSet.has("document_processing_label") ||
    tagSet.has("text_recognition_label") ||
    tagSet.has("images_caption_label") ||
    tagSet.has("images_classification") ||
    tagSet.has("images_object_detection_label") ||
    tagSet.has("risk_control_identification_label") ||
    tagSet.has("pose-detection")
  ) {
    input.add("text");
    input.add("image");

    if (!tagSet.has("embedding-rerank")) {
      output.add("text");
    }
  }

  if (
    tagSet.has("image_segmentation") ||
    tagSet.has("image_matting_label") ||
    tagSet.has("image_style_transfer_label") ||
    tagSet.has("padding_image_label") ||
    tagSet.has("inpainting_label") ||
    tagSet.has("face-migration-label") ||
    tagSet.has("image_layer")
  ) {
    input.add("text");
    input.add("image");
    output.add("image");
  }

  if (tagSet.has("image_generation") || tagSet.has("3d-generation")) {
    input.add("text");
    output.add("image");
  }

  if (tagSet.has("video-generation")) {
    input.add("text");
    output.add("video");
  }

  if (
    tagSet.has("automatic-speech-recognition") ||
    tagSet.has("audio_analysis") ||
    tagSet.has("subtitles_label")
  ) {
    input.add("audio");
    output.add("text");
  }

  if (tagSet.has("text-to-speech")) {
    input.add("text");
    output.add("audio");
  }

  if (tagSet.has("voice_chat") || tagSet.has("multimodal_audio_processing")) {
    input.add("audio");
    input.add("text");
    output.add("audio");
    output.add("text");
  }

  return compactObject({
    input: sortModalities(input),
    output: sortModalities(output),
  });
}

function isTextLikeService(tagSet: ReadonlySet<string>): boolean {
  return (
    tagSet.has("text-generation") ||
    tagSet.has("chat_completion") ||
    tagSet.has("code-generation") ||
    tagSet.has("function_calling") ||
    tagSet.has("deep_reflection_label") ||
    tagSet.has("vision-language") ||
    tagSet.has("vision-language-label") ||
    tagSet.has("multi-modal")
  );
}

export const moarkProvider: ProviderDefinition = {
  name: "moark",
  outputDirectory: "data/providers/moark/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 3);

    const modelsPromise = fetchJson("https://moark.com/v1/models", {
      schema: modelsResponseSchema,
      label: "Moark models API error",
    });
    const exchangeRatePromise = fetchCurrencyExchangeRate("cny", "usd");
    const servicesPromise = fetchJson(
      "https://moark.com/api/pay/services?type=serverless&status=1&size=1000",
      {
        schema: servicesResponseSchema,
        label: "Moark services API error",
      },
    );

    const modelsResponse = await modelsPromise;

    progress?.tick(`moark.com/v1/models (${modelsResponse.data.length})`, true);

    const servicesResponse = await servicesPromise;

    progress?.tick(
      `moark.com/api/pay/services (${servicesResponse.items.length})`,
      true,
    );

    const cnyToUsdRate = await exchangeRatePromise;

    progress?.tick(`cny->usd exchange rate (${cnyToUsdRate.toString()})`, true);

    const servicesById = new Map(
      servicesResponse.items.map((service) => [
        service.ident.toLowerCase(),
        service,
      ]),
    );

    return modelsResponse.data.map((model) => {
      const service = servicesById.get(model.id.toLowerCase());
      const tags =
        service?.tags?.map((tag) => tag.slug.trim().toLowerCase()) ?? [];
      const tagSet = new Set(tags);
      const modalities = inferModalities(tags);
      const inputModalities = modalities.input;
      const outputModalities = modalities.output;
      const supportsAttachments = inputModalities?.some(
        (modality) => modality !== "text",
      );
      const inputPrice = nonNegativeNumber(
        service?.operation_summary?.min_input_million_tokens_price,
      );
      const outputPrice = nonNegativeNumber(
        service?.operation_summary?.min_output_million_tokens_price,
      );
      const inputPriceUsd = convertCurrencyAmount(inputPrice, cnyToUsdRate);
      const outputPriceUsd = convertCurrencyAmount(outputPrice, cnyToUsdRate);
      const textLike = isTextLikeService(tagSet);
      const embeddings = tagSet.has("embedding-rerank");

      return compactObject({
        id: model.id,
        name: model.id,
        release_date: timestampFromUnixSeconds(model.created),
        last_updated: timestampFromUnixMilliseconds(service?.updated_at),
        features: compactObject({
          attachment: supportsAttachments,
          reasoning: tagSet.has("deep_reflection_label") || undefined,
          tool_call: tagSet.has("function_calling") || undefined,
        }),
        pricing: compactObject({
          input:
            textLike || embeddings
              ? inputPriceUsd
              : inputPriceUsd && inputPriceUsd > 0
                ? inputPriceUsd
                : undefined,
          output:
            !outputModalities || embeddings
              ? undefined
              : textLike
                ? outputPriceUsd
                : outputPriceUsd && outputPriceUsd > 0
                  ? outputPriceUsd
                  : undefined,
        }),
        limit: compactObject({
          context: integerGreaterThanZero(contextLimitFromTags(tagSet)),
          output: integerGreaterThanZero(outputLimitFromTags(tagSet)),
        }),
        modalities: compactObject(modalities),
      });
    });
  },
};
