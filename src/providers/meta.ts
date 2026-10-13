import { z } from "zod";

import { markdownTables, parseScaledNumber } from "../lib/docs.ts";
import { fetchJson, fetchText } from "../lib/http.ts";
import { timestampFromUnixSeconds } from "../lib/model.ts";
import { compactObject } from "../lib/object.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const docsBaseUrl = "https://dev.meta.ai/docs";

const responseSchema = z.object({
  data: z.array(z.object({ id: z.string(), created: z.number() })),
});

const pricingKeys: Record<string, keyof NonNullable<ModelRecord["pricing"]>> = {
  "cached input": "cache_read",
  input: "input",
  output: "output",
};

function sections(text: string, level: string): string[] {
  return text.split(new RegExp(`^${level} `, "m")).slice(1);
}

function codeSpans(text: string): string[] {
  return [...text.matchAll(/`([a-z0-9.-]+)`/g)].flatMap((match) =>
    match[1] ? [match[1]] : [],
  );
}

function parseModalityList(value: string | undefined): ModelModality[] {
  return (
    filterModalities(
      (value?.toLowerCase().match(/text|image|video|audio|pdf/g) ?? []).map(
        (entry) => (entry === "pdf" ? "file" : entry),
      ),
    ) ?? []
  );
}

function parsePricing(pricingPage: string) {
  const pricing = new Map<string, NonNullable<ModelRecord["pricing"]>>();

  for (const section of sections(pricingPage, "###")) {
    const ids = codeSpans(section.split("\n|")[0] ?? "");
    const [table] = markdownTables(section);
    const [header, ...rows] = table ?? [];
    const standardColumn = header?.findIndex((cell) =>
      /^standard mode/i.test(cell),
    );
    const contributorColumn = header?.findIndex((cell) =>
      /^contributor mode/i.test(cell),
    );

    if (!header || standardColumn === undefined || standardColumn < 0) {
      continue;
    }

    for (const id of ids) {
      const column = id.endsWith("-contributor")
        ? contributorColumn
        : standardColumn;
      const modelPricing: NonNullable<ModelRecord["pricing"]> = {};

      for (const row of rows) {
        const key = pricingKeys[row[0]?.toLowerCase() ?? ""];
        const value =
          column !== undefined && column >= 0
            ? parseScaledNumber(row[column] ?? "")
            : undefined;

        if (key && value !== undefined) modelPricing[key] = value;
      }

      pricing.set(id, modelPricing);
    }
  }

  return pricing;
}

function parseModelDetails(modelsPage: string, ids: readonly string[]) {
  const details = new Map<string, Omit<ModelRecord, "id">>();

  for (const section of sections(modelsPage, "##")) {
    const sectionIds = ids.filter((id) => section.includes(`\`${id}\``));

    if (sectionIds.length === 0) continue;

    const rows = markdownTables(section).flat();
    const context = section.match(/([\d,]+)-token context window/)?.[1];
    const prose = section.match(/takes? ([^.]+?) input, returns? (\w+)/i);

    for (const id of sectionIds) {
      const row = rows.find((cells) => cells[0] === id);
      const input = parseModalityList(prose?.[1] ?? row?.[1]);
      const output = parseModalityList(prose?.[2] ?? row?.[2]);
      const heading = section.split("\n")[0]?.trim();
      const listedName = rows
        .map((cells) => cells[0]?.match(/^(.+?)\s*\(([^)]+)\)$/))
        .find((match) => match?.[2] === id)?.[1];
      const version = id.match(/\d+(\.\d+)*/)?.[0];

      details.set(
        id,
        compactObject({
          name:
            listedName ??
            (heading && version ? `${heading} ${version}` : heading),
          limit: compactObject({
            context: context ? parseScaledNumber(context) : undefined,
          }),
          modalities: compactObject({
            input: input.length > 0 ? input : undefined,
            output: output.length > 0 ? output : undefined,
          }),
          features: compactObject({
            attachment:
              input.length > 0 ? hasAttachmentSupport(input) : undefined,
            reasoning: /reasoning/i.test(section) ? true : undefined,
            tool_call: /tool calling/i.test(section) ? true : undefined,
            structured_output: /structured output/i.test(section)
              ? true
              : undefined,
          }),
        }),
      );
    }
  }

  return details;
}

export const metaProvider: ProviderDefinition = {
  name: "meta",
  outputDirectory: "data/providers/meta/models",
  async fetchModels(progress) {
    const apiKey = process.env.MUSE_API_KEY;

    if (!apiKey) {
      throw new Error("MUSE_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 3);
    const response = await fetchJson("https://api.meta.ai/v1/models", {
      schema: responseSchema,
      headers: { Authorization: `Bearer ${apiKey}` },
      label: "Meta models API error",
    });
    const ids = response.data.map((model) => model.id);
    progress?.tick(`api.meta.ai/v1/models (${ids.length})`, true);
    const pricingPage = await fetchText(
      `${docsBaseUrl}/pricing-rate-limits.md`,
      { label: "Meta pricing docs error" },
    );
    progress?.tick("dev.meta.ai/docs/pricing-rate-limits", true);
    const modelsPage = await fetchText(`${docsBaseUrl}/models.md`, {
      label: "Meta models docs error",
    });
    progress?.tick("dev.meta.ai/docs/models", true);
    const pricing = parsePricing(pricingPage);
    const details = parseModelDetails(modelsPage, ids);

    return response.data.map((model) =>
      compactObject({
        id: model.id,
        release_date:
          model.created > 0
            ? timestampFromUnixSeconds(model.created)
            : undefined,
        ...details.get(model.id),
        pricing: pricing.get(model.id),
      }),
    );
  },
};
