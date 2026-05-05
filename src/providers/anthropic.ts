import { z } from "zod";

import { fetchJson, fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  timestampFromDateInput,
} from "../lib/model.ts";
import type { ProviderDefinition } from "./types.ts";

const capabilitySchema = z.object({ supported: z.boolean() });

const apiModelSchema = z.object({
  id: z.string(),
  display_name: z.string(),
  created_at: z.string(),
  max_input_tokens: z.number(),
  max_tokens: z.number(),
  capabilities: z.object({
    image_input: capabilitySchema.optional(),
    pdf_input: capabilitySchema.optional(),
    structured_outputs: capabilitySchema.optional(),
    thinking: capabilitySchema.optional(),
  }),
});

const responseSchema = z.object({
  data: z.array(apiModelSchema),
  has_more: z.boolean(),
  last_id: z.string().nullable(),
});

type PricingInfo = {
  input?: number;
  output?: number;
  cache_read?: number;
  cache_write?: number;
};

function parsePrice(value: string): number | undefined {
  const match = value.match(/\$\s*([0-9]+(?:\.[0-9]+)?)/);

  if (!match) {
    return undefined;
  }

  const parsed = Number(match[1]);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function normalizeModelName(value: string): string {
  return value
    .replace(/\(deprecated\)/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function parsePricingMarkdown(markdown: string): Map<string, PricingInfo> {
  const result = new Map<string, PricingInfo>();
  const sectionMatch = markdown.match(
    /##\s+Model pricing[\s\S]*?(?=\n##\s+|$)/,
  );

  if (!sectionMatch) {
    return result;
  }

  const lines = sectionMatch[0].split("\n");

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed.startsWith("|") || !trimmed.includes("$")) {
      continue;
    }

    const cells = trimmed
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());

    if (cells.length < 6) {
      continue;
    }

    const name = cells[0];

    if (!name) {
      continue;
    }

    const pricing = compactObject({
      input: parsePrice(cells[1] ?? ""),
      cache_write: parsePrice(cells[2] ?? ""),
      cache_read: parsePrice(cells[4] ?? ""),
      output: parsePrice(cells[5] ?? ""),
    }) as PricingInfo;

    if (Object.keys(pricing).length === 0) {
      continue;
    }

    result.set(normalizeModelName(name), pricing);
  }

  return result;
}

async function fetchPricing(): Promise<Map<string, PricingInfo>> {
  try {
    const markdown = await fetchText(
      "https://platform.claude.com/docs/en/about-claude/pricing.md",
      { label: "Anthropic pricing page error" },
    );
    return parsePricingMarkdown(markdown);
  } catch {
    return new Map();
  }
}

export const anthropicProvider: ProviderDefinition = {
  name: "anthropic",
  outputDirectory: "data/providers/anthropic/models",
  async fetchModels(progress) {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 1);

    const models = [] as z.infer<typeof apiModelSchema>[];
    let afterId: string | null = null;
    let page = 0;

    while (true) {
      const url = new URL("https://api.anthropic.com/v1/models");
      url.searchParams.set("limit", "1000");

      if (afterId) {
        url.searchParams.set("after_id", afterId);
      }

      const response = await fetchJson(url, {
        schema: responseSchema,
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        label: "Anthropic API error",
      });

      models.push(...response.data);
      page += 1;
      progress?.tick(`api.anthropic.com/v1/models (${models.length})`, true);

      if (!response.has_more || !response.last_id) {
        break;
      }

      afterId = response.last_id;
    }

    const pricingMap = await fetchPricing();
    progress?.tick("fetched pricing data", true);

    return models.map((model) => {
      const imageInput = model.capabilities.image_input?.supported === true;
      const pdfInput = model.capabilities.pdf_input?.supported === true;
      const pricing = pricingMap.get(normalizeModelName(model.display_name));

      return compactObject({
        id: model.id,
        name: model.display_name || model.id,
        release_date: timestampFromDateInput(model.created_at, {
          rejectEpoch: true,
        }),
        features: {
          attachment: imageInput || pdfInput,
          reasoning: model.capabilities.thinking?.supported === true,
          structured_output:
            model.capabilities.structured_outputs?.supported === true,
        },
        limit: compactObject({
          context: integerGreaterThanZero(model.max_input_tokens),
          output: integerGreaterThanZero(model.max_tokens),
        }),
        modalities: {
          input: [
            "text",
            ...(imageInput ? (["image"] as const) : []),
            ...(pdfInput ? (["file"] as const) : []),
          ],
          output: ["text"],
        },
        pricing: pricing
          ? compactObject({
              input: pricing.input,
              output: pricing.output,
              cache_read: pricing.cache_read,
              cache_write: pricing.cache_write,
            })
          : undefined,
      });
    });
  },
};
