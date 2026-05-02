import * as cheerio from "cheerio";
import { z } from "zod";

import { fetchJson, fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  object: z.string(),
  owned_by: z.string(),
});

const responseSchema = z.object({
  object: z.string(),
  data: z.array(apiModelSchema),
});

type PricingInfo = { input: number; output: number; cache_hit: number };

function parsePrice(value: string): number | undefined {
  const match = value.match(/\$([0-9.]+)/);
  if (!match) return undefined;
  const parsed = Number(match[1]);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parsePricingTable(html: string): Map<string, PricingInfo> {
  const $ = cheerio.load(html);
  const result = new Map<string, PricingInfo>();

  const tables = $("table").toArray();
  outer: for (const table of tables) {
    const rows = $(table).find("tr").toArray();
    const modelNames: string[] = [];

    const headerRow = rows[0];
    if (headerRow) {
      const headers = $(headerRow).find("td").toArray();
      for (let i = 1; i < headers.length; i++) {
        const $cell = $(headers[i]);
        $cell.find("sup").remove();
        const text = $cell.text().trim();
        if (text === "deepseek-v4-flash" || text === "deepseek-v4-pro") {
          modelNames.push(text);
        }
      }
    }
    if (modelNames.length === 0) continue;

    for (const row of rows) {
      const cells = $(row).find("td").toArray();
      if (cells.length < 3) continue;

      const $firstCell = $(cells[0]);
      $firstCell.find("sup").remove();
      const firstCellText = $firstCell.text().trim();

      const prices: number[] = [];
      let label = "";

      if (firstCellText === "PRICING") {
        const labelCell = $(cells[1]);
        labelCell.find("sup").remove();
        label = labelCell.text().trim();
        for (let i = 2; i < cells.length; i++) {
          const $cell = $(cells[i]);
          $cell.find("sup").remove();
          $cell.find("del").remove();
          const price = parsePrice($cell.text().trim());
          if (price !== undefined) prices.push(price);
        }
      } else if (
        firstCellText.includes("1M INPUT TOKENS") ||
        firstCellText.includes("1M OUTPUT TOKENS")
      ) {
        label = firstCellText;
        for (let i = 1; i < cells.length; i++) {
          const $cell = $(cells[i]);
          $cell.find("sup").remove();
          $cell.find("del").remove();
          const price = parsePrice($cell.text().trim());
          if (price !== undefined) prices.push(price);
        }
      }

      if (prices.length !== modelNames.length || prices.length === 0) continue;

      if (label.includes("1M INPUT TOKENS (CACHE HIT)")) {
        for (let i = 0; i < modelNames.length; i++) {
          const name = modelNames[i]!;
          const entry = result.get(name);
          if (!entry)
            result.set(name, { input: 0, output: 0, cache_hit: prices[i]! });
          else entry.cache_hit = prices[i]!;
        }
      } else if (label.includes("1M INPUT TOKENS (CACHE MISS)")) {
        for (let i = 0; i < modelNames.length; i++) {
          const name = modelNames[i]!;
          const entry = result.get(name);
          if (!entry)
            result.set(name, { input: prices[i]!, output: 0, cache_hit: 0 });
          else entry.input = prices[i]!;
        }
      } else if (label.includes("1M OUTPUT TOKENS")) {
        for (let i = 0; i < modelNames.length; i++) {
          const name = modelNames[i]!;
          const entry = result.get(name);
          if (!entry)
            result.set(name, { input: 0, output: prices[i]!, cache_hit: 0 });
          else entry.output = prices[i]!;
        }
      }
    }

    if (modelNames.length > 0 && result.size > 0) break outer;
  }

  return result;
}

async function fetchPricing(): Promise<Map<string, PricingInfo>> {
  try {
    const html = await fetchText(
      "https://api-docs.deepseek.com/quick_start/pricing",
      {
        label: "DeepSeek pricing page error",
      },
    );
    return parsePricingTable(html);
  } catch {
    return new Map();
  }
}

export const deepseekProvider: ProviderDefinition = {
  name: "deepseek",
  outputDirectory: "data/providers/deepseek/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const apiKey = process.env.DEEPSEEK_API_KEY;
    const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : undefined;

    const response = await fetchJson("https://api.deepseek.com/v1/models", {
      schema: responseSchema,
      headers,
      label: "DeepSeek API error",
    });

    progress?.tick(
      `api.deepseek.com/v1/models (${response.data.length})`,
      true,
    );

    const pricingMap = await fetchPricing();
    progress?.tick("fetched pricing data", true);

    return response.data.map((model) => {
      const pricing = pricingMap.get(model.id);

      return compactObject({
        id: model.id,
        name: model.id,
        limit: compactObject({
          context: 1_000_000,
          output: 384_000,
        }),
        features: compactObject({
          tool_call: true,
          structured_output: true,
        }),
        modalities: {
          input: ["text"],
          output: ["text"],
        },
        pricing: pricing
          ? compactObject({
              input: pricing.input,
              output: pricing.output,
              cache_read: pricing.cache_hit,
            })
          : undefined,
      });
    });
  },
};
