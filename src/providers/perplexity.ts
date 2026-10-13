import Decimal from "decimal.js";
import { z } from "zod";

import { fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import type { ModelRecord } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const tieredRateSchema = z.object({ low: z.number(), high: z.number() });
const rateSchema = z.union([z.number(), tieredRateSchema]);

const docsModelSchema = z.object({
  id: z.string(),
  input: rateSchema,
  output: rateSchema,
  cache: z.union([rateSchema, z.string()]).nullish(),
});

const docsPricingSchema = z.object({
  agent: z.object({ models: z.array(docsModelSchema) }),
});

const pricingStartMarker = "export const PRICING = ";
const inputMultiplierPattern = /^inputx([0-9]+(?:\.[0-9]+)?)$/;

function baseRate(rate: z.infer<typeof rateSchema>): number {
  return typeof rate === "number" ? rate : rate.low;
}

function cacheReadPrice(
  cache: z.infer<typeof docsModelSchema>["cache"],
  input: number,
): number | undefined {
  if (cache === null || cache === undefined) {
    return undefined;
  }

  if (typeof cache !== "string") {
    return baseRate(cache);
  }

  const multiplier = inputMultiplierPattern.exec(cache)?.[1];

  return multiplier === undefined
    ? undefined
    : new Decimal(input).mul(multiplier).toNumber();
}

function extractPricingJson(text: string): unknown {
  const start = text.indexOf(pricingStartMarker);

  if (start === -1) {
    throw new Error("Perplexity docs are missing the PRICING object");
  }

  const jsonStart = start + pricingStartMarker.length;
  const jsonEnd = text.indexOf("\n};", jsonStart);

  if (jsonEnd === -1) {
    throw new Error("Perplexity docs PRICING object is not terminated");
  }

  return JSON.parse(text.slice(jsonStart, jsonEnd + 2));
}

function buildPricing(
  model: z.infer<typeof docsModelSchema>,
): ModelRecord["pricing"] {
  const input = baseRate(model.input);

  return compactObject({
    input,
    output: baseRate(model.output),
    cache_read: cacheReadPrice(model.cache, input),
  });
}

export const perplexityProvider: ProviderDefinition = {
  name: "perplexity",
  outputDirectory: "data/providers/perplexity/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const text = await fetchText(
      "https://docs.perplexity.ai/docs/agent-api/models.md",
      {
        init: { redirect: "follow" },
        label: "Perplexity docs error",
      },
    );
    const { agent } = docsPricingSchema.parse(extractPricingJson(text));

    progress?.tick(
      `docs.perplexity.ai/docs/agent-api/models (${agent.models.length})`,
      true,
    );

    return agent.models.map((model) =>
      compactObject({
        id: model.id,
        pricing: buildPricing(model),
      }),
    );
  },
};
