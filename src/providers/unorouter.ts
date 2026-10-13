import Decimal from "decimal.js";
import { z } from "zod";

import { documentationTimestamp } from "../lib/docs.ts";
import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  timestampFromDateInput,
} from "../lib/model.ts";
import type { ModelRecord } from "../schema.ts";
import {
  filterModalities,
  hasAnyString,
  hasAttachmentSource,
} from "./helpers.ts";
import { openrouterProvider } from "./openrouter.ts";
import type { ProviderDefinition } from "./types.ts";

const usdPerMillionTokensPerRatio = new Decimal(2);

const metadataSchema = z.object({
  releaseDate: z.string().optional(),
  knowledgeCutoff: z.string().optional(),
  contextWindow: z.number().optional(),
  maxInputTokens: z.number().optional(),
  maxOutputTokens: z.number().optional(),
  inputModalities: z.array(z.string()).optional(),
  outputModalities: z.array(z.string()).optional(),
  isReasoning: z.boolean().optional(),
  supportsTools: z.boolean().optional(),
  supportsResponseFormat: z.boolean().optional(),
  supportedParameters: z.array(z.string()).optional(),
});

const apiModelSchema = z.object({
  model_name: z.string(),
  quota_type: z.number(),
  model_ratio: z.number(),
  completion_ratio: z.number(),
  cache_ratio: z.number().optional(),
  create_cache_ratio: z.number().optional(),
  enable_groups: z.array(z.string()).optional(),
  metadata: z.string().optional(),
  is_free: z.boolean().optional(),
});

const responseSchema = z.object({
  data: z.array(apiModelSchema),
  group_ratio: z.record(z.string(), z.number()),
});

function normalizeKey(id: string): string {
  return id.split("/").at(-1)!.toLowerCase().replace(/[.:]/g, "-");
}

function parseMetadata(
  value: string | undefined,
): z.infer<typeof metadataSchema> | undefined {
  if (!value) {
    return undefined;
  }

  try {
    const result = metadataSchema.safeParse(JSON.parse(value));
    return result.success ? result.data : undefined;
  } catch {
    return undefined;
  }
}

function cheapestGroupRatio(
  groups: readonly string[] | undefined,
  ratios: Record<string, number>,
): Decimal {
  const known = (groups ?? [])
    .map((group) => ratios[group])
    .filter((ratio): ratio is number => ratio !== undefined && ratio >= 0);

  return known.length > 0 ? Decimal.min(...known) : new Decimal(1);
}

function modelPricing(
  model: z.infer<typeof apiModelSchema>,
  groupRatios: Record<string, number>,
): NonNullable<ModelRecord["pricing"]> | undefined {
  if (model.is_free) {
    return { input: 0, output: 0 };
  }

  if (model.quota_type !== 0 || model.model_ratio <= 0) {
    return undefined;
  }

  const input = usdPerMillionTokensPerRatio
    .mul(model.model_ratio)
    .mul(cheapestGroupRatio(model.enable_groups, groupRatios));
  const price = (multiplier: number | undefined) =>
    multiplier === undefined || multiplier <= 0
      ? undefined
      : input.mul(multiplier).toNumber();

  return compactObject({
    input: input.toNumber(),
    output: price(model.completion_ratio),
    cache_read: model.cache_ratio === 1 ? undefined : price(model.cache_ratio),
    cache_write: price(model.create_cache_ratio),
  });
}

export const unorouterProvider: ProviderDefinition = {
  name: "unorouter",
  outputDirectory: "data/providers/unorouter/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 2);

    const response = await fetchJson("https://api.unorouter.com/api/pricing", {
      schema: responseSchema,
      label: "UnoRouter pricing API error",
    });

    progress?.tick(
      `api.unorouter.com/api/pricing (${response.data.length})`,
      true,
    );

    const openrouterModels = await openrouterProvider.fetchModels();
    const openrouterByKey = new Map<string, ModelRecord>();

    for (const model of openrouterModels) {
      const key = normalizeKey(model.id);

      if (!openrouterByKey.has(key)) {
        openrouterByKey.set(key, model);
      }
    }

    progress?.tick(
      `openrouter.ai/api/v1/models (${openrouterModels.length})`,
      true,
    );

    return response.data.map((model) => {
      const metadata = parseMetadata(model.metadata);
      const matched = openrouterByKey.get(normalizeKey(model.model_name));
      const parameters = metadata?.supportedParameters;
      const input = filterModalities(metadata?.inputModalities);

      return compactObject({
        id: model.model_name,
        name: matched?.name ?? model.model_name,
        knowledge_cutoff:
          documentationTimestamp(metadata?.knowledgeCutoff) ??
          matched?.knowledge_cutoff,
        release_date:
          timestampFromDateInput(metadata?.releaseDate, {
            rejectEpoch: true,
          }) ?? matched?.release_date,
        open_weights: matched?.open_weights,
        features: compactObject({
          attachment:
            hasAttachmentSource(metadata?.inputModalities) ??
            matched?.features?.attachment,
          reasoning: metadata?.isReasoning ?? matched?.features?.reasoning,
          tool_call: metadata?.supportsTools ?? matched?.features?.tool_call,
          structured_output:
            metadata?.supportsResponseFormat ??
            matched?.features?.structured_output,
          temperature: parameters
            ? hasAnyString(parameters, "temperature")
            : matched?.features?.temperature,
        }),
        pricing: modelPricing(model, response.group_ratio),
        limit: compactObject({
          context:
            integerGreaterThanZero(metadata?.contextWindow) ??
            matched?.limit?.context,
          input: integerGreaterThanZero(metadata?.maxInputTokens),
          output:
            integerGreaterThanZero(metadata?.maxOutputTokens) ??
            matched?.limit?.output,
        }),
        modalities: compactObject({
          input: input ?? matched?.modalities?.input,
          output:
            filterModalities(metadata?.outputModalities) ??
            matched?.modalities?.output,
        }),
      });
    });
  },
};
