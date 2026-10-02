import { z } from "zod";

import { mapWithConcurrency } from "../lib/async.ts";
import { documentationTimestamp, markdownTables } from "../lib/docs.ts";
import { fetchJson, fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  timestampFromDateInput,
} from "../lib/model.ts";
import type { ProviderDefinition } from "./types.ts";
import type { ModelRecord } from "../schema.ts";

const capabilitySchema = z.object({ supported: z.boolean() });

const apiModelSchema = z.object({
  id: z.string(),
  display_name: z.string(),
  created_at: z.string(),
  max_input_tokens: z.number().nullable(),
  max_tokens: z.number().nullable(),
  capabilities: z
    .object({
      image_input: capabilitySchema.optional(),
      pdf_input: capabilitySchema.optional(),
      structured_outputs: capabilitySchema.optional(),
      thinking: capabilitySchema.optional(),
    })
    .nullable(),
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

export function parsePricingMarkdown(
  markdown: string,
): Map<string, PricingInfo> {
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

export function parseOverview(
  markdown: string,
): Map<string, Omit<ModelRecord, "id">> {
  const result = new Map<string, Omit<ModelRecord, "id">>();
  for (const table of markdownTables(markdown)) {
    const ids = table.find((row) => row[0] === "Claude API ID");
    const aliases = table.find((row) => row[0] === "Claude API alias");
    const cutoff = table.find((row) => row[0] === "Reliable knowledge cutoff");
    if (!ids) continue;
    for (let index = 1; index < ids.length; index += 1) {
      const details = compactObject({
        knowledge_cutoff: documentationTimestamp(cutoff?.[index]),
        features: /All current models support[^\n]+tool use\./.test(markdown)
          ? { tool_call: true }
          : undefined,
      });
      for (const id of [ids[index], aliases?.[index]]) {
        if (id?.startsWith("claude-")) result.set(id, details);
      }
    }
  }
  return result;
}

export function parseModelDocs(markdown: string): Omit<ModelRecord, "id"> {
  const rows = markdownTables(markdown).flat();
  let cutoff = rows.find((row) => row[0] === "Reliable knowledge cutoff")?.[1];
  for (const table of markdownTables(markdown)) {
    const column = table[0]?.indexOf("Knowledge cutoff") ?? -1;
    const model = table.find((row) => row[0]?.includes("(this model)"));
    if (!cutoff && column >= 0 && model) cutoff = model[column];
  }
  const toolUse = rows.find((row) =>
    /^(?:Tool use|Tool calling)$/i.test(row[0] ?? ""),
  )?.[1];
  return compactObject({
    knowledge_cutoff: documentationTimestamp(cutoff),
    features: compactObject({
      tool_call: toolUse ? /^supported|^yes$/i.test(toolUse) : undefined,
      temperature:
        /Setting `temperature`[^\n]+(?:returns a 400 error|not supported)/i.test(
          markdown,
        )
          ? false
          : undefined,
    }),
  });
}

async function fetchOverview(): Promise<Map<string, Omit<ModelRecord, "id">>> {
  try {
    return parseOverview(
      await fetchText(
        "https://platform.claude.com/docs/en/models/overview.md",
        {
          label: "Anthropic model overview error",
        },
      ),
    );
  } catch {
    return new Map();
  }
}

async function fetchModelDocs(id: string): Promise<Omit<ModelRecord, "id">> {
  const slug = id.replace(/^claude-/, "").replace(/-\d{8}$/, "");
  try {
    return parseModelDocs(
      await fetchText(
        `https://platform.claude.com/docs/en/models/${encodeURIComponent(slug)}/overview.md`,
        {
          label: "Anthropic model docs error",
        },
      ),
    );
  } catch {
    return {};
  }
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

    const [pricingMap, overview] = await Promise.all([
      fetchPricing(),
      fetchOverview(),
    ]);
    progress?.tick("fetched pricing data", true);

    progress?.beginPhase("scraping", models.length);
    return mapWithConcurrency(
      models,
      4,
      async (model): Promise<ModelRecord> => {
        const docs = await fetchModelDocs(model.id);
        progress?.tick(model.id, true);
        const details = overview.get(model.id);
        const imageInput = model.capabilities?.image_input?.supported;
        const pdfInput = model.capabilities?.pdf_input?.supported;
        const pricing = pricingMap.get(normalizeModelName(model.display_name));

        return compactObject({
          id: model.id,
          name: model.display_name || model.id,
          knowledge_cutoff: docs.knowledge_cutoff ?? details?.knowledge_cutoff,
          release_date: timestampFromDateInput(model.created_at, {
            rejectEpoch: true,
          }),
          features: compactObject({
            ...details?.features,
            ...docs.features,
            attachment:
              imageInput === undefined && pdfInput === undefined
                ? undefined
                : imageInput === true || pdfInput === true,
            reasoning: model.capabilities?.thinking?.supported,
            structured_output:
              model.capabilities?.structured_outputs?.supported,
          }),
          limit: compactObject({
            context: integerGreaterThanZero(model.max_input_tokens),
            input: integerGreaterThanZero(model.max_input_tokens),
            output: integerGreaterThanZero(model.max_tokens),
          }),
          modalities: model.capabilities
            ? {
                input: [
                  "text" as const,
                  ...(imageInput ? (["image"] as const) : []),
                  ...(pdfInput ? (["file"] as const) : []),
                ],
                output: ["text" as const],
              }
            : undefined,
          pricing: pricing
            ? compactObject({
                input: pricing.input,
                output: pricing.output,
                cache_read: pricing.cache_read,
                cache_write: pricing.cache_write,
              })
            : undefined,
        });
      },
    );
  },
};
