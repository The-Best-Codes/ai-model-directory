import * as cheerio from "cheerio";
import { z } from "zod";

import { fetchJson, fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { parseScaledNumber } from "../lib/docs.ts";
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
  attachment?: boolean;
};
type LimitInfo = { context?: number; output?: number };
type ModelInfo = {
  pricing?: PricingInfo;
  features?: FeatureInfo;
  limits?: LimitInfo;
  vision?: boolean;
};

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

export function parseDocsTable(html: string): Map<string, ModelInfo> {
  const $ = cheerio.load(html);
  const result = new Map<string, ModelInfo>();

  for (const table of $("table").toArray()) {
    const grid: string[][] = [];
    const spans = new Map<number, { text: string; remaining: number }>();

    for (const row of $(table).find("tr").toArray()) {
      const values: string[] = [];
      for (const [column, span] of spans) {
        values[column] = span.text;
        span.remaining -= 1;
        if (span.remaining === 0) spans.delete(column);
      }
      let column = 0;
      for (const cell of $(row).find("td, th").toArray()) {
        while (values[column] !== undefined) column += 1;
        const text = cleanText($, cell);
        const width = Number($(cell).attr("colspan") ?? 1);
        const height = Number($(cell).attr("rowspan") ?? 1);
        for (let offset = 0; offset < width; offset += 1) {
          values[column + offset] = text;
          if (height > 1)
            spans.set(column + offset, { text, remaining: height - 1 });
        }
        column += width;
      }
      grid.push(values);
    }

    const header = grid.find((row) =>
      row.some((cell) => /^deepseek-[a-z0-9-]+$/.test(cell)),
    );
    if (!header) continue;

    for (let column = 0; column < header.length; column += 1) {
      const id = header[column];
      if (!id || !/^deepseek-[a-z0-9-]+$/.test(id)) continue;
      const info: ModelInfo = {};
      for (const row of grid) {
        const label = row[0]?.toUpperCase() ?? "";
        const value = row[column] ?? "";
        if (label === "CONTEXT LENGTH" || label === "MAX OUTPUT") {
          const count = parseScaledNumber(value);
          if (count !== undefined)
            info.limits = {
              ...info.limits,
              [label === "CONTEXT LENGTH" ? "context" : "output"]: count,
            };
        }
        if (label === "THINKING MODE" && /thinking/i.test(value)) {
          info.features = { ...info.features, reasoning: true };
        }
        if (label === "FEATURES") {
          const feature = mapFeatureLabel(row[1] ?? "");
          const supported =
            value === "✓"
              ? true
              : /not supported|^✗$/.test(value.toLowerCase())
                ? false
                : undefined;
          if (feature && supported !== undefined)
            info.features = { ...info.features, [feature]: supported };
          if (row[1]?.toLowerCase() === "vision" && supported !== undefined) {
            info.vision = supported;
            info.features = { ...info.features, attachment: supported };
          }
        }
        if (
          label === "PRICING" &&
          !row.slice(0, column).some((cell) => /OFF-PEAK/i.test(cell))
        ) {
          const price = parseScaledNumber(value);
          if (price === undefined) continue;
          const tokenLabel = row[1]?.toUpperCase() ?? "";
          const key = tokenLabel.includes("CACHE HIT")
            ? "cache_hit"
            : tokenLabel.includes("CACHE MISS")
              ? "input"
              : tokenLabel.includes("OUTPUT TOKENS")
                ? "output"
                : undefined;
          if (key) info.pricing = { ...info.pricing, [key]: price };
        }
      }
      result.set(id, info);
    }
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
              attachment: features.attachment,
            })
          : undefined,
        modalities: {
          input: ["text", ...(info?.vision ? (["image"] as const) : [])],
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
