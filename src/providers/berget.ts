import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  timestampFromDateInput,
  nonNegativeNumber,
  pricePerMillion,
} from "../lib/model.ts";
import {
  convertCurrencyAmount,
  fetchCurrencyExchangeRate,
} from "../lib/pricing.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const pricingSchema = z.object({
  input: z.number().nullish().optional(),
  output: z.number().nullish().optional(),
  unit: z.string().optional(),
  currency: z.string().optional(),
});

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  created: z.number().int().nonnegative().optional(),
  model_type: z.string().optional(),
  aliases: z.array(z.string()).optional(),
  capabilities: z
    .object({
      vision: z.boolean().optional(),
      function_calling: z.boolean().optional(),
      json_mode: z.boolean().optional(),
      formatted_output: z.boolean().optional(),
      embeddings: z.boolean().optional(),
    })
    .optional(),
  pricing: pricingSchema.optional(),
  license: z.string().optional(),
  release_date: z.string().optional(),
  status: z
    .object({
      up: z.boolean().optional(),
    })
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

const modalityOrder: readonly ModelModality[] = [
  "audio",
  "file",
  "image",
  "text",
  "video",
];

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

function sortModalities(
  values: ReadonlySet<ModelModality>,
): ModelModality[] | undefined {
  return values.size > 0
    ? modalityOrder.filter((value) => values.has(value))
    : undefined;
}

function inferModalities(model: z.infer<typeof apiModelSchema>) {
  const input = new Set<ModelModality>();
  const output = new Set<ModelModality>();
  const type = model.model_type?.trim().toLowerCase();

  if (
    type === "text" ||
    type === "chat" ||
    type === "completion" ||
    type === "language"
  ) {
    input.add("text");
    output.add("text");
  }

  if (type === "embedding" || type === "rerank") {
    input.add("text");
  }

  if (type === "speech-to-text" || type === "transcription") {
    input.add("audio");
    output.add("text");
  }

  if (model.capabilities?.vision) {
    input.add("text");
    input.add("image");

    if (type === "text" || output.size === 0) {
      output.add("text");
    }
  }

  return compactObject({
    input: sortModalities(input),
    output: sortModalities(output),
  });
}

function supportsOpenWeights(license: string | undefined): boolean | undefined {
  if (!license) {
    return undefined;
  }

  const normalized = license.trim().toLowerCase();

  if (!normalized) {
    return undefined;
  }

  return normalized.includes("apache");
}

function isTokenPricing(unit: string | undefined): boolean {
  return /token/i.test(unit ?? "");
}

function inferPricingCurrency(
  pricing: z.infer<typeof pricingSchema> | undefined,
): string | undefined {
  const currency = pricing?.currency?.trim().toLowerCase();

  if (currency) {
    return currency;
  }

  if (pricing?.unit?.includes("€")) {
    return "eur";
  }

  if (pricing?.unit?.includes("$")) {
    return "usd";
  }

  return undefined;
}

function buildPricing(
  model: z.infer<typeof apiModelSchema>,
  exchangeRates: ReadonlyMap<
    string,
    Awaited<ReturnType<typeof fetchCurrencyExchangeRate>>
  >,
): ModelRecord["pricing"] | undefined {
  if (!isTokenPricing(model.pricing?.unit)) {
    return undefined;
  }

  const currency = inferPricingCurrency(model.pricing);

  if (!currency) {
    return undefined;
  }

  const exchangeRate = exchangeRates.get(currency);

  if (!exchangeRate) {
    return undefined;
  }

  return compactObject({
    input: convertCurrencyAmount(
      pricePerMillion(nonNegativeNumber(model.pricing?.input)),
      exchangeRate,
    ),
    output: convertCurrencyAmount(
      pricePerMillion(nonNegativeNumber(model.pricing?.output)),
      exchangeRate,
    ),
  });
}

function buildRecords(
  model: z.infer<typeof apiModelSchema>,
  exchangeRates: ReadonlyMap<
    string,
    Awaited<ReturnType<typeof fetchCurrencyExchangeRate>>
  >,
): ModelRecord[] {
  const modalities = inferModalities(model);
  const inputModalities = modalities.input ?? [];
  const pricing = buildPricing(model, exchangeRates);
  const releaseDate =
    timestampFromDateInput(model.release_date, { rejectEpoch: true }) ??
    timestampFromUnixMilliseconds(model.created);
  const ids = [...new Set([model.id, ...(model.aliases ?? [])])];
  const shared = compactObject({
    release_date: releaseDate,
    open_weights: supportsOpenWeights(model.license),
    features: compactObject({
      attachment:
        inputModalities.some((modality) => modality !== "text") || undefined,
      tool_call: model.capabilities?.function_calling,
      structured_output:
        model.capabilities?.json_mode || model.capabilities?.formatted_output,
    }),
    pricing,
    modalities,
  });

  return ids.map((id) => ({
    id,
    name: id === model.id ? (model.name ?? model.id) : id,
    ...shared,
  }));
}

export const bergetProvider: ProviderDefinition = {
  name: "berget",
  outputDirectory: "data/providers/berget/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.berget.ai/v1/models", {
      schema: responseSchema,
      label: "Berget API error",
    });

    const models = response.data.filter((model) => model.status?.up !== false);

    progress?.tick(`api.berget.ai/v1/models (${models.length})`, true);

    const currencies = [
      ...new Set(
        models
          .map((model) => inferPricingCurrency(model.pricing))
          .filter((currency): currency is string => Boolean(currency)),
      ),
    ];

    const exchangeRates = new Map<
      string,
      Awaited<ReturnType<typeof fetchCurrencyExchangeRate>>
    >();

    if (currencies.length > 0) {
      progress?.beginPhase("exchange-rates", currencies.length);

      const entries = await Promise.all(
        currencies.map(async (currency) => {
          const rate = await fetchCurrencyExchangeRate(currency, "usd");
          progress?.tick(`${currency}->usd (${rate.toString()})`, true);
          return [currency, rate] as const;
        }),
      );

      for (const [currency, rate] of entries) {
        exchangeRates.set(currency, rate);
      }
    }

    return models.flatMap((model) => buildRecords(model, exchangeRates));
  },
};
