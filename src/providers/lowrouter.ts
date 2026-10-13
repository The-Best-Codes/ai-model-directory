import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import {
  convertCurrencyAmount,
  fetchCurrencyExchangeRate,
} from "../lib/pricing.ts";
import type { ModelModality } from "../schema.ts";
import { filterModalities, hasAnyString } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const regionPricingSchema = z.object({
  currency: z.string(),
  prompt_per_1m_tokens: z.number().optional(),
  completion_per_1m_tokens: z.number().optional(),
  cache_read_per_1m_tokens: z.number().optional(),
  cache_write_per_1m_tokens: z.number().optional(),
});

const rangeSchema = z.object({ min: z.number(), max: z.number() });

const apiModelSchema = z.object({
  id: z.string(),
  modality: z.string().optional(),
  context_length: z.number().optional(),
  max_output_tokens: z.number().optional(),
  architecture: z
    .object({
      input_modalities: z.array(z.string()).optional(),
      output_modalities: z.array(z.string()).optional(),
    })
    .optional(),
  capabilities: z
    .object({ function_calling: z.boolean().optional() })
    .optional(),
  supported_parameters: z.array(z.string()).optional(),
  regions: z
    .array(z.object({ pricing: regionPricingSchema.optional() }))
    .optional(),
  auto_routing: z
    .object({
      pricing_range: z
        .object({
          currency: z.string(),
          prompt_per_1m_tokens: rangeSchema.optional(),
          completion_per_1m_tokens: rangeSchema.optional(),
          cache_read_per_1m_tokens: rangeSchema.optional(),
          cache_write_per_1m_tokens: rangeSchema.optional(),
        })
        .optional(),
    })
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

type PriceKey =
  | "prompt_per_1m_tokens"
  | "completion_per_1m_tokens"
  | "cache_read_per_1m_tokens"
  | "cache_write_per_1m_tokens";

function normalizeModalities(
  values: readonly string[] | undefined,
): ModelModality[] | undefined {
  return filterModalities(
    values?.map((value) => (value === "document" ? "file" : value)),
  );
}

function uniformPrice(
  model: z.infer<typeof apiModelSchema>,
  key: PriceKey,
  rates: ReadonlyMap<string, Decimal>,
): number | undefined {
  const candidates: Array<{ value: number; currency: string }> = [];
  const range = model.auto_routing?.pricing_range;
  const rangeValue = range?.[key];

  if (range && rangeValue) {
    if (rangeValue.min !== rangeValue.max) {
      return undefined;
    }

    candidates.push({ value: rangeValue.min, currency: range.currency });
  }

  for (const region of model.regions ?? []) {
    const value = region.pricing?.[key];

    if (region.pricing && value !== undefined) {
      candidates.push({ value, currency: region.pricing.currency });
    }
  }

  const converted = candidates.map(({ value, currency }) => {
    const rate = rates.get(currency.toLowerCase());
    return rate ? convertCurrencyAmount(value, rate) : undefined;
  });
  const first = converted[0];

  return first !== undefined &&
    first >= 0 &&
    converted.every((value) => value === first)
    ? first
    : undefined;
}

export const lowrouterProvider: ProviderDefinition = {
  name: "lowrouter",
  outputDirectory: "data/providers/lowrouter/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 2);

    const response = await fetchJson("https://api.lowrouter.ai/v1/models", {
      schema: responseSchema,
      label: "LowRouter API error",
    });

    progress?.tick(
      `api.lowrouter.ai/v1/models (${response.data.length})`,
      true,
    );

    const currencies = new Set<string>();

    for (const model of response.data) {
      const range = model.auto_routing?.pricing_range;

      if (range) {
        currencies.add(range.currency.toLowerCase());
      }

      for (const region of model.regions ?? []) {
        if (region.pricing) {
          currencies.add(region.pricing.currency.toLowerCase());
        }
      }
    }

    const rates = new Map<string, Decimal>();

    for (const currency of currencies) {
      rates.set(currency, await fetchCurrencyExchangeRate(currency, "usd"));
    }

    progress?.tick(`exchange rates (${rates.size})`, true);

    return response.data.map((model) => {
      const input = normalizeModalities(model.architecture?.input_modalities);
      const isEmbedding = model.modality === "embedding";
      const toolCall =
        model.capabilities?.function_calling ??
        (model.supported_parameters
          ? hasAnyString(model.supported_parameters, "tools")
          : undefined);

      return compactObject({
        id: model.id,
        name: model.id,
        features: compactObject({
          attachment: input
            ? input.some((entry) => entry !== "text")
            : undefined,
          tool_call: isEmbedding ? undefined : toolCall,
        }),
        pricing: compactObject({
          input: uniformPrice(model, "prompt_per_1m_tokens", rates),
          output: uniformPrice(model, "completion_per_1m_tokens", rates),
          cache_read: uniformPrice(model, "cache_read_per_1m_tokens", rates),
          cache_write: uniformPrice(model, "cache_write_per_1m_tokens", rates),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_output_tokens),
        }),
        modalities: compactObject({
          input,
          output: normalizeModalities(model.architecture?.output_modalities),
        }),
      });
    });
  },
};
