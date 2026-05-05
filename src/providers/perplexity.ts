import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson, fetchText, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import type { ModelRecord } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  owned_by: z.string(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function parsePriceCell(value: string): number | undefined {
  const match = value.replace(/\\\$/g, "$").match(/\$\s*([0-9]+(?:\.[0-9]+)?)/);

  if (!match?.[1]) {
    return undefined;
  }

  const parsed = new Decimal(match[1]);
  return parsed.isFinite() && parsed.gte(0) ? parsed.toNumber() : undefined;
}

function parseCacheReadPrice(
  value: string,
  inputPrice: number | undefined,
): number | undefined {
  const directPrice = parsePriceCell(value);

  if (directPrice !== undefined) {
    return directPrice;
  }

  if (inputPrice === undefined) {
    return undefined;
  }

  const discountMatch = value.match(/([0-9]+(?:\.[0-9]+)?)%\s+discount/i);

  if (!discountMatch?.[1]) {
    return undefined;
  }

  const discount = new Decimal(discountMatch[1]);

  if (!discount.isFinite() || discount.lt(0) || discount.gt(100)) {
    return undefined;
  }

  return new Decimal(inputPrice)
    .mul(new Decimal(100).minus(discount).div(100))
    .toNumber();
}

function parsePricing(
  text: string,
): Map<string, NonNullable<ModelRecord["pricing"]>> {
  const pricing = new Map<string, NonNullable<ModelRecord["pricing"]>>();

  for (const line of text.split(/\r?\n/)) {
    if (!line.startsWith("|")) {
      continue;
    }

    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());

    if (cells.length < 5) {
      continue;
    }

    const id = cells[0]?.match(/^`([^`]+)`$/)?.[1];

    if (!id) {
      continue;
    }

    const input = parsePriceCell(cells[1] ?? "");
    const output = parsePriceCell(cells[2] ?? "");
    const cache_read = parseCacheReadPrice(cells[3] ?? "", input);
    const entry = compactObject({ input, output, cache_read });

    if (Object.keys(entry).length > 0) {
      pricing.set(id, entry);
    }
  }

  return pricing;
}

async function fetchPricing(): Promise<
  Map<string, NonNullable<ModelRecord["pricing"]>>
> {
  try {
    const text = await fetchText(
      "https://docs.perplexity.ai/docs/agent-api/models.md",
      {
        init: { redirect: "follow" },
        label: "Perplexity pricing docs error",
      },
    );

    return parsePricing(text);
  } catch {
    return new Map();
  }
}

export const perplexityProvider: ProviderDefinition = {
  name: "perplexity",
  outputDirectory: "data/providers/perplexity/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 2);

    const [response, pricing] = await Promise.all([
      fetchJson("https://api.perplexity.ai/v1/models", {
        schema: responseSchema,
        headers: withBearerToken(process.env.PERPLEXITY_API_KEY),
        label: "Perplexity API error",
      }),
      fetchPricing(),
    ]);

    progress?.tick(
      `api.perplexity.ai/v1/models (${response.data.length})`,
      true,
    );
    progress?.tick(
      `docs.perplexity.ai/docs/agent-api/models (${pricing.size})`,
      true,
    );

    return response.data.map((model) =>
      compactObject({
        id: model.id,
        pricing: pricing.get(model.id),
      }),
    );
  },
};
