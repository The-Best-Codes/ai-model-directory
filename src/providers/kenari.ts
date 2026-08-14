import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import {
  convertCurrencyAmount,
  fetchCurrencyExchangeRate,
} from "../lib/pricing.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  endpoints: z.array(z.string()).optional(),
  context_length: z.number().nullish().optional(),
  modalities: z
    .object({
      input: z.array(z.string()).optional(),
      output: z.array(z.string()).optional(),
    })
    .optional(),
  pricing: z
    .object({
      currency: z.string().optional(),
      unit: z.string().optional(),
      free: z.boolean().optional(),
      input: z.number().nullish().optional(),
      output: z.number().nullish().optional(),
      cache_read: z.number().nullish().optional(),
      cache_write: z.number().nullish().optional(),
    })
    .optional(),
  reasoning: z.boolean().optional(),
  tool_call: z.boolean().optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function normalizeModalities(values: readonly string[] | undefined) {
  return filterModalities(
    values?.map((value) => (value.toLowerCase() === "pdf" ? "file" : value)),
  );
}

function priceFromMicroIdr(
  value: number | null | undefined,
  exchangeRate: Decimal,
): number | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  const idrPerMillion = new Decimal(value).div(1_000_000);

  return convertCurrencyAmount(idrPerMillion.toNumber(), exchangeRate);
}

export const kenariProvider: ProviderDefinition = {
  name: "kenari",
  outputDirectory: "data/providers/kenari/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 2);

    const responsePromise = fetchJson("https://kenari.id/v1/models", {
      schema: responseSchema,
      label: "Kenari API error",
    });
    const exchangeRatePromise = fetchCurrencyExchangeRate("idr", "usd");

    const response = await responsePromise;

    progress?.tick(`kenari.id/v1/models (${response.data.length})`, true);

    const exchangeRate = await exchangeRatePromise;

    progress?.tick(`idr->usd exchange rate (${exchangeRate.toString()})`, true);

    return response.data.map((model) => {
      const input = normalizeModalities(model.modalities?.input);
      const output = normalizeModalities(model.modalities?.output);
      const pricing = model.pricing;
      const tokenBilled = model.endpoints?.includes("chat");
      const free = pricing?.free === true;

      return compactObject({
        id: model.id,
        name: model.id,
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: model.reasoning ?? undefined,
          tool_call: model.tool_call ?? undefined,
        }),
        pricing:
          pricing && tokenBilled
            ? compactObject({
                input: free
                  ? 0
                  : priceFromMicroIdr(pricing.input, exchangeRate),
                output: free
                  ? 0
                  : priceFromMicroIdr(pricing.output, exchangeRate),
                cache_read: free
                  ? 0
                  : priceFromMicroIdr(pricing.cache_read, exchangeRate),
                cache_write: free
                  ? 0
                  : priceFromMicroIdr(pricing.cache_write, exchangeRate),
              })
            : undefined,
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
