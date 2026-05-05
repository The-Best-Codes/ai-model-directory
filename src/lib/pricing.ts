import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson } from "./http.ts";

const exchangeRateResponseSchema = z
  .object({ date: z.string() })
  .catchall(z.unknown());
const exchangeRateMapSchema = z.record(z.string(), z.number());

const exchangeRateCache = new Map<string, Promise<Decimal>>();

function exchangeRateUrls(base: string) {
  return [
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.min.json`,
    `https://latest.currency-api.pages.dev/v1/currencies/${base}.min.json`,
  ];
}

function parseExchangeRate(
  response: z.infer<typeof exchangeRateResponseSchema>,
  base: string,
  target: string,
): Decimal {
  const ratesResult = exchangeRateMapSchema.safeParse(response[base]);

  if (!ratesResult.success) {
    throw new Error(`missing '${base}' rates map in currency response`);
  }

  const value = ratesResult.data[target];

  if (value === undefined || !Number.isFinite(value) || value <= 0) {
    throw new Error(`missing '${target}' exchange rate for '${base}'`);
  }

  return new Decimal(value);
}

export async function fetchCurrencyExchangeRate(
  baseCurrency: string,
  targetCurrency: string,
): Promise<Decimal> {
  const base = baseCurrency.trim().toLowerCase();
  const target = targetCurrency.trim().toLowerCase();

  if (!base || !target) {
    throw new Error("currency codes are required");
  }

  if (base === target) {
    return new Decimal(1);
  }

  const cacheKey = `${base}:${target}`;
  const cached = exchangeRateCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const pending = (async () => {
    let lastError: unknown;

    for (const url of exchangeRateUrls(base)) {
      try {
        const response = await fetchJson(url, {
          schema: exchangeRateResponseSchema,
          label: `Exchange rate API error (${base}->${target})`,
        });

        return parseExchangeRate(response, base, target);
      } catch (error) {
        lastError = error;
      }
    }

    throw new Error(
      `Failed to fetch exchange rate ${base}->${target}${lastError instanceof Error ? `: ${lastError.message}` : ""}`,
    );
  })();

  exchangeRateCache.set(cacheKey, pending);

  try {
    return await pending;
  } catch (error) {
    exchangeRateCache.delete(cacheKey);
    throw error;
  }
}

export function convertCurrencyAmount(
  value: number | undefined,
  exchangeRate: Decimal,
): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  return new Decimal(value).mul(exchangeRate).toNumber();
}
