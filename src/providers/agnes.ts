import * as cheerio from "cheerio";

import { mapWithConcurrency } from "../lib/async.ts";
import { markdownTables, parseScaledNumber } from "../lib/docs.ts";
import { fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import { hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

type Category = "text" | "image" | "video";
type PricedModel = {
  id: string;
  category: Category;
  pricing: NonNullable<ModelRecord["pricing"]>;
};

const docsBaseUrl = "https://wiki.agnes-ai.com/en/docs";

const categoryHeadings: Record<string, Category> = {
  "text models": "text",
  "image models": "image",
  "video models": "video",
};

const pricingKeys: Record<string, keyof NonNullable<ModelRecord["pricing"]>> = {
  "cached input": "cache_read",
  "input tokens": "input",
  "prefill input": "input",
  "output tokens": "output",
};

function parsePricingPage(text: string): PricedModel[] {
  const models: PricedModel[] = [];

  for (const section of text.split(/^## /m)) {
    const heading = section.split("\n")[0]?.trim().toLowerCase() ?? "";
    const category = categoryHeadings[heading];

    if (!category) continue;

    const $ = cheerio.load(section);
    let current: PricedModel | undefined;

    $("tbody tr").each((_, row) => {
      const cells = $(row).children("td");
      const nameCell = cells.filter((_, cell) => $(cell).is("[rowspan]"));
      const firstCode = cells.first().find("code").first().text().trim();

      if (nameCell.length > 0 || cells.length === 4) {
        const comingSoon = /coming soon/i.test(cells.first().text());
        current = comingSoon
          ? undefined
          : { id: firstCode, category, pricing: {} };
        if (current) models.push(current);
      }

      if (!current || category !== "text") return;

      const item = cells.eq(-3).text().trim().toLowerCase();
      const key = pricingKeys[item];
      const price = parseScaledNumber(cells.last().text());

      if (key && price !== undefined) current.pricing[key] = price;
    });
  }

  return models;
}

function parseModelDocs(text: string) {
  const rows = markdownTables(text).flat();
  const valueOf = (pattern: RegExp) =>
    rows.find((row) => pattern.test(row[0] ?? ""))?.[1];
  const context = valueOf(/^context window/i);
  const output = valueOf(/^max(imum)? output/i);

  return {
    name: text.match(/^# (.+)$/m)?.[1]?.trim(),
    context: context ? parseScaledNumber(context) : undefined,
    output: output ? parseScaledNumber(output) : undefined,
    vision: /image_url/.test(text),
    tools: /`tools`/.test(text),
    reasoning: /thinking/i.test(text),
    temperature: /`temperature`/.test(text),
  };
}

async function fetchModelDocs(id: string) {
  try {
    return parseModelDocs(
      await fetchText(`${docsBaseUrl}/${id.replaceAll(".", "")}.md`, {
        label: "Agnes model docs error",
      }),
    );
  } catch {
    return undefined;
  }
}

export const agnesProvider: ProviderDefinition = {
  name: "agnes",
  outputDirectory: "data/providers/agnes/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const models = parsePricingPage(
      await fetchText(`${docsBaseUrl}/pricing.md`, {
        label: "Agnes pricing docs error",
      }),
    );
    progress?.tick(
      `wiki.agnes-ai.com/en/docs/pricing (${models.length})`,
      true,
    );
    progress?.beginPhase("scraping", models.length);

    return mapWithConcurrency(models, 4, async (model) => {
      const docs = await fetchModelDocs(model.id);
      progress?.tick(model.id, docs !== undefined);
      const text = model.category === "text";
      const input: ModelModality[] =
        !text || docs?.vision ? ["text", "image"] : ["text"];

      return compactObject({
        id: model.id,
        name: docs?.name,
        limit: text
          ? compactObject({ context: docs?.context, output: docs?.output })
          : undefined,
        modalities: { input, output: [model.category] },
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: text ? docs?.reasoning : undefined,
          tool_call: text ? docs?.tools : undefined,
          temperature: text ? docs?.temperature : undefined,
        }),
        pricing: text ? compactObject(model.pricing) : undefined,
      });
    });
  },
};
