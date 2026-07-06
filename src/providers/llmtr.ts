import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromDateInput,
} from "../lib/model.ts";
import { filterModalities, hasAttachmentSource } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const pricingRowSchema = z.object({
  operation: z.string(),
  metric: z.string(),
  unit: z.string(),
  priceUsd: z.string(),
});

const apiModelSchema = z.object({
  canonicalId: z.string(),
  name: z.string(),
  slug: z.string(),
  contextWindow: z.number().nullish(),
  createdAt: z.string(),
  supportedOperations: z.array(z.string()),
  modalities: z.array(z.string()),
  capabilities: z.array(z.string()),
  isActive: z.boolean(),
  isRetired: z.boolean(),
  isRetiring: z.boolean(),
  primaryPricingRows: z.array(pricingRowSchema),
});

const responseSchema = z.object({
  data: z.object({
    models: z.array(apiModelSchema),
  }),
});

export const llmtrProvider: ProviderDefinition = {
  name: "llmtr",
  outputDirectory: "data/providers/llmtr/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://llmtr.com/api/models/catalog?sort=newest&locale=en",
      { schema: responseSchema, label: "LLMTR API error" },
    );

    const models = response.data.models.filter(
      (model) => model.isActive && !model.isRetired,
    );

    progress?.tick(`llmtr.com/api/models/catalog (${models.length})`, true);

    return models.map((model) => {
      const input = filterModalities(model.modalities);
      const featureSet = new Set(
        model.capabilities.map((c) => c.toLowerCase()),
      );

      const inputPrice = findPrice(
        model.primaryPricingRows,
        "CHAT_COMPLETIONS",
        "INPUT_TEXT",
      );
      const outputPrice = findPrice(
        model.primaryPricingRows,
        "CHAT_COMPLETIONS",
        "OUTPUT_TEXT",
      );
      const cacheReadPrice = findPrice(
        model.primaryPricingRows,
        "CHAT_COMPLETIONS",
        "CACHE_READ",
      );
      const cacheWritePrice = findPrice(
        model.primaryPricingRows,
        "CHAT_COMPLETIONS",
        "CACHE_WRITE",
      );
      const inputAudioPrice = findPrice(
        model.primaryPricingRows,
        "CHAT_COMPLETIONS",
        "INPUT_AUDIO",
      );
      const outputAudioPrice = findPrice(
        model.primaryPricingRows,
        "CHAT_COMPLETIONS",
        "OUTPUT_AUDIO",
      );
      const reasoningPrice = findPrice(
        model.primaryPricingRows,
        "CHAT_COMPLETIONS",
        "REASONING_TOKENS",
      );

      return compactObject({
        id: model.canonicalId,
        name: model.name,
        release_date: timestampFromDateInput(model.createdAt),
        features: compactObject({
          attachment: hasAttachmentSource(model.modalities),
          reasoning: featureSet.has("thinking") || undefined,
          tool_call: featureSet.has("function_calling") || undefined,
          structured_output:
            featureSet.has("structured_outputs") ||
            featureSet.has("json_mode") ||
            undefined,
        }),
        pricing: compactObject({
          input: inputPrice,
          output: outputPrice,
          cache_read: cacheReadPrice,
          cache_write: cacheWritePrice,
          input_audio: inputAudioPrice,
          output_audio: outputAudioPrice,
          reasoning: reasoningPrice,
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.contextWindow),
        }),
        modalities: compactObject({ input }),
      });
    });
  },
};

function findPrice(
  rows: z.infer<typeof pricingRowSchema>[],
  operation: string,
  metric: string,
): number | undefined {
  const row = rows.find(
    (r) => r.operation === operation && r.metric === metric,
  );

  if (!row || row.unit !== "PER_1M_TOKENS") {
    return undefined;
  }

  return nonNegativeNumber(Number(row.priceUsd));
}
