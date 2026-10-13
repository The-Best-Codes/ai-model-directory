import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { timestampFromDateInput } from "../lib/model.ts";
import { fetchCurrencyExchangeRate } from "../lib/pricing.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import { openrouterProvider } from "./openrouter.ts";
import type { ProviderDefinition } from "./types.ts";

const quotaPerMillionTokens = new Decimal(2);
const unsetModelRatio = 37.5;

const tierSchema = z.object({
  model_ratio: z.number(),
  completion_ratio: z.number(),
});

const apiModelSchema = z.object({
  model_name: z.string(),
  credits_type: z.number(),
  model_ratio: z.number(),
  completion_ratio: z.number(),
  enable_groups: z.array(z.string()).nullish(),
  tags: z.array(z.string()).nullish(),
  tiers: z.array(tierSchema).optional(),
  info: z.object({ release_date: z.string().optional() }).optional(),
});

const responseSchema = z.object({
  data: z.array(apiModelSchema),
  group_ratio: z.record(z.string(), z.number()),
});

const statusSchema = z.object({ data: z.object({ price: z.number() }) });

function normalizeKey(id: string): string {
  return id.split("/").at(-1)!.toLowerCase().replace(/[.:]/g, "-");
}

function groupMultiplier(
  groups: readonly string[] | null | undefined,
  ratios: Record<string, number>,
): Decimal {
  if (!groups || groups.length === 0 || groups.includes("default")) {
    return new Decimal(ratios.default ?? 1);
  }

  const known = groups
    .map((group) => ratios[group])
    .filter((ratio): ratio is number => ratio !== undefined && ratio >= 0);

  return known.length > 0 ? Decimal.min(...known) : new Decimal(1);
}

function modelPricing(
  model: z.infer<typeof apiModelSchema>,
  usdPerRatio: Decimal,
): NonNullable<ModelRecord["pricing"]> | undefined {
  const baseTier = model.tiers?.[0];
  const ratio = baseTier?.model_ratio ?? model.model_ratio;
  const completion = baseTier?.completion_ratio ?? model.completion_ratio;

  if (model.credits_type !== 0 || (!baseTier && ratio === unsetModelRatio)) {
    return undefined;
  }

  const input = usdPerRatio.mul(ratio);

  return compactObject({
    input: input.toNumber(),
    output: completion > 0 ? input.mul(completion).toNumber() : undefined,
  });
}

function pastReleaseDate(value: string | undefined): string | undefined {
  const timestamp = timestampFromDateInput(value, { rejectEpoch: true });

  return timestamp !== undefined &&
    new Decimal(timestamp).lte(Math.floor(Date.now() / 1000))
    ? timestamp
    : undefined;
}

function tagModalities(tags: readonly string[]): {
  input?: ModelModality[];
  output?: ModelModality[];
} {
  if (tags.some((tag) => tag.startsWith("绘图") || tag.startsWith("改图"))) {
    return { output: ["image"] };
  }

  if (tags.includes("音乐生成")) {
    return { output: ["audio"] };
  }

  return tags.includes("多模态")
    ? { input: ["text", "image"], output: ["text"] }
    : {};
}

export const qihangAiProvider: ProviderDefinition = {
  name: "qihang-ai",
  outputDirectory: "data/providers/qihang-ai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 3);

    const response = await fetchJson("https://www.qhaigc.net/api/pricing", {
      schema: responseSchema,
      label: "QiHang AI pricing API error",
    });

    progress?.tick(`qhaigc.net/api/pricing (${response.data.length})`, true);

    const status = await fetchJson("https://www.qhaigc.net/api/status", {
      schema: statusSchema,
      label: "QiHang AI status API error",
    });
    const cnyToUsd = await fetchCurrencyExchangeRate("cny", "usd");
    const usdPerQuota = new Decimal(status.data.price).mul(cnyToUsd);

    progress?.tick(
      `top-up rate (¥${status.data.price} per quota dollar)`,
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
      const matched = openrouterByKey.get(normalizeKey(model.model_name));
      const fallback = tagModalities(model.tags ?? []);
      const input = matched?.modalities?.input ?? fallback.input;
      const usdPerRatio = quotaPerMillionTokens
        .mul(usdPerQuota)
        .mul(groupMultiplier(model.enable_groups, response.group_ratio));

      return compactObject({
        id: model.model_name,
        name: matched?.name ?? model.model_name,
        knowledge_cutoff: matched?.knowledge_cutoff,
        release_date:
          pastReleaseDate(model.info?.release_date) ?? matched?.release_date,
        open_weights: matched?.open_weights,
        features: compactObject({
          ...matched?.features,
          attachment:
            matched?.features?.attachment ??
            (input ? input.length > 1 : undefined),
        }),
        pricing: modelPricing(model, usdPerRatio),
        limit: matched?.limit,
        modalities: compactObject({
          input,
          output: matched?.modalities?.output ?? fallback.output,
        }),
      });
    });
  },
};
