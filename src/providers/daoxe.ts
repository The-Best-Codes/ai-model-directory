import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { fetchCurrencyExchangeRate } from "../lib/pricing.ts";
import type { ModelRecord } from "../schema.ts";
import { openrouterProvider } from "./openrouter.ts";
import type { ProviderDefinition } from "./types.ts";

const quotaPerMillionTokens = new Decimal(2);
const unsetModelRatio = 37.5;
const firstTierPattern = /tier\(\s*"[^"]*"\s*,([^)]*)\)/;
const expressionTermPattern = /^(p|c|cr|cc)\s*\*\s*(\d+(?:\.\d+)?)$/;

const apiModelSchema = z.object({
  model_name: z.string(),
  quota_type: z.number(),
  model_ratio: z.number(),
  completion_ratio: z.number(),
  cache_ratio: z.number().optional(),
  create_cache_ratio: z.number().optional(),
  enable_groups: z.array(z.string()).optional(),
  billing_expr: z.string().optional(),
});

const responseSchema = z.object({
  data: z.array(apiModelSchema),
  group_ratio: z.record(z.string(), z.number()),
});

const statusSchema = z.object({ data: z.object({ price: z.number() }) });

type Pricing = NonNullable<ModelRecord["pricing"]>;

const expressionKeys = new Map<string, keyof Pricing>([
  ["p", "input"],
  ["c", "output"],
  ["cr", "cache_read"],
  ["cc", "cache_write"],
]);

function normalizeKey(id: string): string {
  return id.split("/").at(-1)!.toLowerCase().replace(/[.:]/g, "-");
}

function groupMultiplier(
  groups: readonly string[] | undefined,
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

function expressionPricing(
  expression: string,
  usdPerQuota: Decimal,
): Pricing | undefined {
  const body = expression.match(firstTierPattern)?.[1];

  if (!body) {
    return undefined;
  }

  const pricing: Pricing = {};

  for (const term of body.split("+")) {
    const match = term.trim().match(expressionTermPattern);
    const key = match ? expressionKeys.get(match[1]!) : undefined;

    if (!match || !key) {
      return undefined;
    }

    pricing[key] = new Decimal(match[2]!).mul(usdPerQuota).toNumber();
  }

  return pricing;
}

function ratioPricing(
  model: z.infer<typeof apiModelSchema>,
  usdPerRatio: Decimal,
): Pricing | undefined {
  if (model.quota_type !== 0 || model.model_ratio === unsetModelRatio) {
    return undefined;
  }

  const input = usdPerRatio.mul(model.model_ratio);
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

export const daoxeProvider: ProviderDefinition = {
  name: "daoxe",
  outputDirectory: "data/providers/daoxe/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 4);

    const response = await fetchJson("https://daoxe.com/api/pricing", {
      schema: responseSchema,
      label: "DaoXE pricing API error",
    });

    progress?.tick(`daoxe.com/api/pricing (${response.data.length})`, true);

    const status = await fetchJson("https://daoxe.com/api/status", {
      schema: statusSchema,
      label: "DaoXE status API error",
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
      const usdPerGroupQuota = usdPerQuota.mul(
        groupMultiplier(model.enable_groups, response.group_ratio),
      );

      return compactObject({
        id: model.model_name,
        name: matched?.name ?? model.model_name,
        knowledge_cutoff: matched?.knowledge_cutoff,
        release_date: matched?.release_date,
        open_weights: matched?.open_weights,
        features: matched?.features,
        pricing: model.billing_expr
          ? expressionPricing(model.billing_expr, usdPerGroupQuota)
          : ratioPricing(model, quotaPerMillionTokens.mul(usdPerGroupQuota)),
        limit: matched?.limit,
        modalities: matched?.modalities,
      });
    });
  },
};
