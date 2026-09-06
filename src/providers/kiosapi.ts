import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import { allModalities } from "./helpers.ts";
import { openrouterProvider } from "./openrouter.ts";
import type { ProviderDefinition } from "./types.ts";

const priceBase = new Decimal(2);
const oneDecimal = new Decimal(1);

const apiModelSchema = z.object({
  model_name: z.string(),
  quota_type: z.number(),
  model_ratio: z.number(),
  model_price: z.number(),
  completion_ratio: z.number(),
  cache_ratio: z.number().optional(),
  create_cache_ratio: z.number().optional(),
  enable_groups: z.array(z.string()).optional(),
  tags: z.string().optional(),
});

const responseSchema = z.object({
  success: z.boolean(),
  data: z.array(apiModelSchema),
  group_ratio: z.record(z.string(), z.number()),
});

const contextTagPattern = /^(\d+(?:\.\d+)?)M$/;
const kContextTagPattern = /^(\d+)K$/;
const modalityByTag = new Map<string, ModelModality>([
  ["audio", "audio"],
  ["files", "file"],
  ["video", "video"],
  ["vision", "image"],
]);

function normalizeKey(id: string): string {
  return id.split("/").at(-1)!.toLowerCase().replace(/\./g, "-");
}

function priceFromRatio(
  ratio: number,
  multiplier: number = 1,
  groupMultiplier: Decimal = oneDecimal,
): number | undefined {
  if (ratio < 0 || multiplier < 0) {
    return undefined;
  }

  return priceBase.mul(ratio).mul(multiplier).mul(groupMultiplier).toNumber();
}

function groupMultiplier(
  groups: readonly string[] | undefined,
  ratios: Record<string, number>,
): Decimal {
  if (!groups || groups.length === 0) {
    return oneDecimal;
  }

  for (const group of groups) {
    if (ratios[group] === 0) {
      return new Decimal(0);
    }
  }

  return oneDecimal;
}

function contextFromTags(
  tags: readonly string[] | undefined,
): number | undefined {
  for (const tag of tags ?? []) {
    const match = contextTagPattern.exec(tag);

    if (match) {
      const value = match[1] ?? "";
      return new Decimal(value).mul(1_000_000).toNumber();
    }

    const kMatch = kContextTagPattern.exec(tag);

    if (kMatch) {
      return Number(kMatch[1] ?? "") * 1000;
    }
  }

  return undefined;
}

function fallbackDetails(tags: readonly string[] | undefined) {
  const set = new Set<ModelModality>(["text"]);

  for (const tag of tags ?? []) {
    const modality = modalityByTag.get(tag);

    if (modality) {
      set.add(modality);
    }
  }

  const input = allModalities.filter((entry) => set.has(entry));

  return compactObject({
    attachment:
      tags?.includes("files") || tags?.includes("vision") ? true : undefined,
    context: contextFromTags(tags),
    input: input.length > 0 ? input : undefined,
    open_weights: tags?.includes("open weights") ? true : undefined,
    reasoning: tags?.includes("reasoning") ? true : undefined,
    tool_call: tags?.includes("tools") ? true : undefined,
  });
}

export const kiosapiProvider: ProviderDefinition = {
  name: "kiosapi",
  outputDirectory: "data/providers/kiosapi/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 2);

    const response = await fetchJson("https://kiosapi.com/api/pricing", {
      schema: responseSchema,
      label: "KiosAPI pricing API error",
    });

    progress?.tick(`kiosapi.com/api/pricing (${response.data.length})`, true);

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
      const tags = model.tags
        ?.split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0);
      const matched = openrouterByKey.get(normalizeKey(model.model_name));
      const fallback = fallbackDetails(tags);
      const hasNonTokenPricing = model.quota_type !== 0;
      const group = groupMultiplier(model.enable_groups, response.group_ratio);

      return compactObject({
        id: model.model_name,
        name: matched?.name ?? model.model_name,
        knowledge_cutoff: matched?.knowledge_cutoff,
        release_date: matched?.release_date,
        open_weights: matched?.open_weights ?? fallback.open_weights,
        features: compactObject({
          attachment:
            matched?.features?.attachment ?? fallback.attachment ?? false,
          reasoning: matched?.features?.reasoning ?? fallback.reasoning,
          tool_call: matched?.features?.tool_call ?? fallback.tool_call,
          structured_output: matched?.features?.structured_output,
          temperature: matched?.features?.temperature,
        }),
        pricing: compactObject({
          input: hasNonTokenPricing
            ? undefined
            : priceFromRatio(model.model_ratio, 1, group),
          output: hasNonTokenPricing
            ? priceFromRatio(model.model_price, 1, group)
            : model.completion_ratio <= 0
              ? undefined
              : priceFromRatio(
                  model.model_ratio,
                  model.completion_ratio,
                  group,
                ),
          cache_read:
            hasNonTokenPricing ||
            model.cache_ratio === undefined ||
            model.cache_ratio < 0 ||
            model.cache_ratio === 1
              ? undefined
              : priceFromRatio(model.model_ratio, model.cache_ratio, group),
          cache_write:
            hasNonTokenPricing ||
            model.create_cache_ratio === undefined ||
            model.create_cache_ratio <= 0
              ? undefined
              : priceFromRatio(
                  model.model_ratio,
                  model.create_cache_ratio,
                  group,
                ),
        }),
        limit: compactObject({
          context: matched?.limit?.context ?? fallback.context,
          output: matched?.limit?.output,
        }),
        modalities: compactObject({
          input: matched?.modalities?.input ?? fallback.input,
          output: matched?.modalities?.output,
        }),
      });
    });
  },
};
