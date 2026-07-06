import { z } from "zod";

import { fetchJson, fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromDateInput,
} from "../lib/model.ts";
import { allModalities } from "./helpers.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const pricingEntrySchema = z.object({
  unit_name: z.string(),
  unit_size: z.number(),
  unit_price_usd: z.number(),
});

const pricingTierSchema = z.object({
  details_v2: z.record(z.string(), pricingEntrySchema),
});

const modelSchema = z.object({
  id: z.string(),
  name: z.string(),
  features: z.array(z.string()),
  retirement_at: z.string(),
  release_at: z.string(),
  created_time: z.string(),
  architecture: z.object({
    input_modalities: z.array(z.string()).nullish(),
    output_modalities: z.array(z.string()).nullish(),
    schema_output: z.object({ supported: z.boolean() }).nullish(),
    function_calling: z.object({ supported: z.boolean() }).nullish(),
    reasoning: z.object({ supported: z.boolean() }).nullish(),
    content_cache: z.object({ supported: z.boolean() }).nullish(),
  }),
  model_constraints: z.object({
    context_length: z.number().nullish(),
    max_tokens: z.number().nullish(),
    max_completion_tokens: z.number().nullish(),
  }),
  pricing_rules_v2: z.array(pricingTierSchema),
});

const responseSchema = z.object({
  pageProps: z.object({
    models: z.array(modelSchema),
  }),
});

type PricingMap = Record<string, number | undefined>;

const tokenMultiplier = 1000;

function mapModality(value: string): ModelModality | undefined {
  const normalized = value.toLowerCase();

  if (normalized === "document") {
    return "file";
  }

  return allModalities.includes(normalized as ModelModality)
    ? (normalized as ModelModality)
    : undefined;
}

async function fetchBuildId(): Promise<string> {
  const html = await fetchText("https://www.qiniu.com/ai/models", {
    label: "Qiniu page error",
  });

  const match = html.match(/"buildId"\s*:\s*"([^"]+)"/);
  if (!match) {
    throw new Error("Failed to extract build ID from Qiniu page");
  }

  return match[1]!;
}

function extractPricing(
  pricingRules: z.infer<typeof pricingTierSchema>[],
): PricingMap {
  const result: PricingMap = {};
  const keys = new Set<string>();

  for (const tier of pricingRules) {
    for (const key of Object.keys(tier.details_v2)) {
      keys.add(key);
    }
  }

  for (const key of [...keys].sort()) {
    for (const tier of pricingRules) {
      const entry = tier.details_v2[key];
      if (entry && entry.unit_name === "token" && entry.unit_size === 1000) {
        const price = nonNegativeNumber(entry.unit_price_usd * tokenMultiplier);
        if (price !== undefined) {
          if (result[key] === undefined || price < result[key]!) {
            result[key] = price;
          }
        }
      }
    }
  }

  return result;
}

const inputKeys = ["input", "ncache", "nth_input", "bi_input"] as const;
const outputKeys = ["output", "nth_output", "bi_output", "th_output"] as const;
const cacheReadKeys = ["cache", "cache_read"] as const;
const cacheWriteKeys = ["c_cache", "cache_write"] as const;

function findPrice(
  pricing: PricingMap,
  candidates: string[],
): number | undefined {
  for (const key of candidates) {
    if (pricing[key] !== undefined) {
      return pricing[key];
    }
  }
  return undefined;
}

export const qiniuProvider: ProviderDefinition = {
  name: "qiniu",
  outputDirectory: "data/providers/qiniu/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 2);

    const buildId = await fetchBuildId();

    progress?.tick(`buildId=${buildId}`, true);

    const url = `https://www-static.qbox.me/_next/data/${buildId}/ai/models.json`;

    const response = await fetchJson(url, {
      schema: responseSchema,
      label: "Qiniu data error",
    });

    const models = response.pageProps.models;

    progress?.tick(`qiniu data (${models.length} models)`, true);

    return models
      .filter((model) => {
        const pricing = extractPricing(model.pricing_rules_v2);
        return (
          findPrice(pricing, [...inputKeys]) !== undefined ||
          findPrice(pricing, [...outputKeys]) !== undefined
        );
      })
      .map((model) => {
        const pricing = extractPricing(model.pricing_rules_v2);
        const inputModalities = parseModalities(
          model.architecture.input_modalities,
        );
        const outputModalities = parseModalities(
          model.architecture.output_modalities,
        );
        const inputPrice = findPrice(pricing, [...inputKeys]);
        const outputPrice = findPrice(pricing, [...outputKeys]);

        return compactObject({
          id: model.id,
          name: model.name,
          release_date: timestampFromDateInput(model.release_at),
          features: compactObject({
            attachment: hasNonTextModality(inputModalities),
            reasoning: model.architecture.reasoning?.supported ?? undefined,
            tool_call:
              model.architecture.function_calling?.supported ?? undefined,
            structured_output:
              model.architecture.schema_output?.supported ?? undefined,
          }),
          pricing:
            inputPrice === undefined && outputPrice === undefined
              ? undefined
              : compactObject({
                  input: inputPrice,
                  output: outputPrice,
                  cache_read: findPrice(pricing, [...cacheReadKeys]),
                  cache_write: findPrice(pricing, [...cacheWriteKeys]),
                }),
          limit: compactObject({
            context: integerGreaterThanZero(
              model.model_constraints.context_length,
            ),
            output: integerGreaterThanZero(
              model.model_constraints.max_tokens ??
                model.model_constraints.max_completion_tokens,
            ),
          }),
          modalities: compactObject({
            input: inputModalities,
            output: outputModalities,
          }),
        });
      });
  },
};

function parseModalities(
  values: readonly string[] | null | undefined,
): ModelModality[] | undefined {
  if (!values || values.length === 0) {
    return undefined;
  }

  const unique = new Set<ModelModality>();

  for (const value of values) {
    const mapped = mapModality(value);
    if (mapped) {
      unique.add(mapped);
    }
  }

  return unique.size > 0
    ? allModalities.filter((entry) => unique.has(entry))
    : undefined;
}

function hasNonTextModality(
  modalities: ModelModality[] | undefined,
): boolean | undefined {
  if (!modalities) {
    return undefined;
  }

  return modalities.some((m) => m !== "text") || undefined;
}
