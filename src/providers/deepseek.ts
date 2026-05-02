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

type PricingInfo = { input?: number; output?: number; cache_hit?: number };
type FeatureInfo = {
  tool_call?: boolean;
  structured_output?: boolean;
  reasoning?: boolean;
};
type LimitInfo = { context?: number; output?: number };
type ModelInfo = {
  pricing?: PricingInfo;
  features?: FeatureInfo;
  limits?: LimitInfo;
};

const KNOWN_MODELS = ["deepseek-v4-flash", "deepseek-v4-pro"] as const;

function parsePrice(value: string): number | undefined {
  const match = value.match(/\$([0-9.]+)/);
  if (!match) return undefined;
  const parsed = Number(match[1]);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parseTokenSize(value: string): number | undefined {
  const match = value.match(/([0-9]+(?:\.[0-9]+)?)\s*([KMB])/i);
  if (!match) return undefined;
  const num = Number(match[1]);
  if (!Number.isFinite(num)) return undefined;
  const unit = match[2]!.toUpperCase();
  const multiplier =
    unit === "K" ? 1_000 : unit === "M" ? 1_000_000 : 1_000_000_000;
  return Math.round(num * multiplier);
}

function cleanText(
  $: cheerio.CheerioAPI,
  el: cheerio.BasicAcceptedElems<any>,
): string {
  const $cell = $(el).clone();
  $cell.find("sup").remove();
  $cell.find("del").remove();
  return $cell.text().trim();
}

function mapFeatureLabel(label: string): keyof FeatureInfo | null {
  const normalized = label.toLowerCase();
  if (normalized === "json output") return "structured_output";
  if (normalized === "tool calls") return "tool_call";
  return null;
}

function parseDocsTable(html: string): Map<string, ModelInfo> {
  const $ = cheerio.load(html);
  const result = new Map<string, ModelInfo>();

  for (const table of $("table").toArray()) {
    const rows = $(table).find("tr").toArray();
    if (rows.length === 0) continue;

    const modelNames: string[] = [];
    const headerCells = $(rows[0]!).find("td").toArray();
    for (let i = 1; i < headerCells.length; i++) {
      const text = cleanText($, headerCells[i]!);
      if ((KNOWN_MODELS as readonly string[]).includes(text)) {
        modelNames.push(text);
      }
    }
    if (modelNames.length === 0) continue;

    for (const name of modelNames) {
      if (!result.has(name)) result.set(name, {});
    }

    let section: "features" | "pricing" | null = null;

    for (let r = 1; r < rows.length; r++) {
      const cells = $(rows[r]!).find("td").toArray();
      if (cells.length === 0) continue;

      const firstCellText = cleanText($, cells[0]!);
      let dataCells = cells;
      let label = firstCellText;

      if (firstCellText === "FEATURES") {
        section = "features";
        dataCells = cells.slice(1);
        label = dataCells[0] ? cleanText($, dataCells[0]!) : "";
      } else if (firstCellText === "PRICING") {
        section = "pricing";
        dataCells = cells.slice(1);
        label = dataCells[0] ? cleanText($, dataCells[0]!) : "";
      } else if (
        firstCellText === "CONTEXT LENGTH" ||
        firstCellText === "MAX OUTPUT" ||
        firstCellText === "THINKING MODE" ||
        firstCellText === "MODEL VERSION" ||
        firstCellText.startsWith("BASE URL")
      ) {
        section = null;
      }

      if (firstCellText === "CONTEXT LENGTH") {
        const value = parseTokenSize(cells[1] ? cleanText($, cells[1]!) : "");
        if (value !== undefined) {
          for (const name of modelNames) {
            const info = result.get(name)!;
            info.limits = { ...(info.limits ?? {}), context: value };
          }
        }
        continue;
      }

      if (firstCellText === "MAX OUTPUT") {
        const value = parseTokenSize(cells[1] ? cleanText($, cells[1]!) : "");
        if (value !== undefined) {
          for (const name of modelNames) {
            const info = result.get(name)!;
            info.limits = { ...(info.limits ?? {}), output: value };
          }
        }
        continue;
      }

      if (firstCellText === "THINKING MODE") {
        const value = cells[1] ? cleanText($, cells[1]!) : "";
        if (/thinking/i.test(value)) {
          for (const name of modelNames) {
            const info = result.get(name)!;
            info.features = { ...(info.features ?? {}), reasoning: true };
          }
        }
        continue;
      }

      if (section === "features" && dataCells.length >= 1 + modelNames.length) {
        const featureKey = mapFeatureLabel(label);
        if (!featureKey) continue;
        for (let i = 0; i < modelNames.length; i++) {
          const supported = cleanText($, dataCells[i + 1]!) === "✓";
          if (!supported) continue;
          const info = result.get(modelNames[i]!)!;
          info.features = { ...(info.features ?? {}), [featureKey]: true };
        }
        continue;
      }

      if (section === "pricing" && dataCells.length >= 1 + modelNames.length) {
        for (let i = 0; i < modelNames.length; i++) {
          const price = parsePrice(cleanText($, dataCells[i + 1]!));
          if (price === undefined) continue;
          const info = result.get(modelNames[i]!)!;
          const pricing = (info.pricing ??= {});
          if (label.includes("CACHE HIT")) pricing.cache_hit = price;
          else if (label.includes("CACHE MISS")) pricing.input = price;
          else if (label.includes("OUTPUT TOKENS")) pricing.output = price;
        }
        continue;
      }
    }

    if (result.size > 0) break;
  }

  return result;
}

async function fetchDocs(): Promise<Map<string, ModelInfo>> {
  try {
    const html = await fetchText(
      "https://api-docs.deepseek.com/quick_start/pricing",
      {
        label: "DeepSeek pricing page error",
      },
    );
    return parseDocsTable(html);
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

    const docsMap = await fetchDocs();
    progress?.tick("fetched docs data", true);

    return response.data.map((model) => {
      const info = docsMap.get(model.id);
      const pricing = info?.pricing;
      const features = info?.features;
      const limits = info?.limits;

      return compactObject({
        id: model.id,
        name: model.id,
        limit: limits
          ? compactObject({
              context: limits.context,
              output: limits.output,
            })
          : undefined,
        features: features
          ? compactObject({
              tool_call: features.tool_call,
              structured_output: features.structured_output,
              reasoning: features.reasoning,
            })
          : undefined,
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
