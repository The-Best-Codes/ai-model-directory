import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromDateInput,
} from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const modalityOrder: readonly ModelModality[] = [
  "audio",
  "file",
  "image",
  "text",
  "video",
];

const apiPricingSchema = z
  .object({
    input_per_million: z.number().nullish(),
    output_per_million: z.number().nullish(),
    billing_unit: z.string().nullish(),
  })
  .partial();

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  modality: z.string().nullish(),
  capabilities: z.array(z.string()).nullish(),
  context_window: z.number().nullish(),
  max_output_tokens: z.number().nullish(),
  pricing: apiPricingSchema.nullish(),
  is_open_weight: z.boolean().nullish(),
  released_at: z.string().nullish(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function toModalities(
  values: ReadonlySet<string>,
): ModelModality[] | undefined {
  const result = modalityOrder.filter((entry) => values.has(entry));

  return result.length > 0 ? result : undefined;
}

function buildModalities(model: z.infer<typeof apiModelSchema>): {
  input?: ModelModality[];
  output?: ModelModality[];
} {
  const input = new Set<string>();
  const output = new Set<string>();
  const capabilities = new Set(model.capabilities ?? []);

  switch (model.modality) {
    case "image":
      output.add("image");

      if (capabilities.has("text-to-image")) {
        input.add("text");
      }

      if (
        capabilities.has("image-to-image") ||
        capabilities.has("image-editing")
      ) {
        input.add("image");
      }

      break;
    case "video":
      output.add("video");

      if (capabilities.has("text-to-video")) {
        input.add("text");
      }

      if (
        capabilities.has("image-to-video") ||
        capabilities.has("reference-to-video")
      ) {
        input.add("image");
      }

      if (capabilities.has("video-to-video")) {
        input.add("video");
      }

      break;
    case "music":
      output.add("audio");

      if (capabilities.has("text-to-music")) {
        input.add("text");
      }

      if (capabilities.has("audio-to-audio")) {
        input.add("audio");
      }

      break;
    case "3d":
      output.add("file");

      if (capabilities.has("text-to-3d")) {
        input.add("text");
      }

      if (capabilities.has("image-to-3d")) {
        input.add("image");
      }

      break;
    case "stt":
      input.add("audio");
      output.add("text");
      break;
    case "tts":
      input.add("text");
      output.add("audio");
      break;
    default:
      input.add("text");
      output.add("text");
      break;
  }

  if (capabilities.has("vision") || capabilities.has("ocr")) {
    input.add("image");
  }

  if (capabilities.has("audio")) {
    input.add("audio");
  }

  return compactObject({
    input: toModalities(input),
    output: toModalities(output),
  });
}

export const aigatewayProvider: ProviderDefinition = {
  name: "aigateway",
  outputDirectory: "data/providers/aigateway/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.aigateway.sh/v1/models", {
      schema: responseSchema,
      label: "AIgateway API error",
    });

    progress?.tick(
      `api.aigateway.sh/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const capabilities = new Set(model.capabilities ?? []);
      const modalities = buildModalities(model);
      const tokenPricing = model.pricing?.billing_unit === "token";

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        release_date: timestampFromDateInput(model.released_at),
        open_weights: model.is_open_weight ?? undefined,
        features: compactObject({
          attachment: (modalities.input ?? []).some(
            (entry) => entry !== "text",
          ),
          reasoning: capabilities.has("reasoning") ? true : undefined,
          tool_call: capabilities.has("function_calling") ? true : undefined,
        }),
        pricing: compactObject({
          input: tokenPricing
            ? nonNegativeNumber(model.pricing?.input_per_million)
            : undefined,
          output:
            tokenPricing && (model.pricing?.output_per_million ?? 0) > 0
              ? nonNegativeNumber(model.pricing?.output_per_million)
              : undefined,
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
