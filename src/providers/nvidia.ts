import Decimal from "decimal.js";
import { z } from "zod";

import { mapWithConcurrency } from "../lib/async.ts";
import { fetchJson, fetchText } from "../lib/http.ts";
import {
  integerGreaterThanZero,
  timestampFromDateInput,
} from "../lib/model.ts";
import { compactObject } from "../lib/object.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import { allModalities } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

const genericHeadings = new Set([
  "overview",
  "model overview",
  "description",
  "usage",
  "input",
  "output",
  "release notes",
  "model architecture",
]);

const modalityAliases = new Map<string, ModelModality>([
  ["text", "text"],
  ["string", "text"],
  ["strings", "text"],
  ["image", "image"],
  ["images", "image"],
  ["vision", "image"],
  ["audio", "audio"],
  ["speech", "audio"],
  ["video", "video"],
  ["videos", "video"],
  ["file", "file"],
  ["files", "file"],
  ["pdf", "file"],
  ["pdfs", "file"],
]);

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function collectHeadings(markdown: string): string[] {
  return [...markdown.matchAll(/^#\s+(.+)$/gm)]
    .map((match) => match[1]?.trim())
    .filter((heading): heading is string => Boolean(heading));
}

function parseName(markdown: string, id: string): string | undefined {
  const headings = collectHeadings(markdown);

  for (const heading of headings) {
    if (heading.includes(" / ")) {
      continue;
    }

    if (!genericHeadings.has(heading.trim().toLowerCase())) {
      return heading;
    }
  }

  return id;
}

function extractSection(markdown: string, title: string): string | undefined {
  const pattern = new RegExp(
    `^#{2,3}\\s+${escapeRegex(title)}:?\\s*$([\\s\\S]*?)(?=^#{2,3}\\s+|$)`,
    "gim",
  );
  const match = pattern.exec(markdown);
  return match?.[1]?.trim();
}

function parseScaledInteger(value: string): number | undefined {
  const match = value.match(/(\d+(?:\.\d+)?)\s*([kmbt])?\b/i);

  if (!match?.[1]) {
    return undefined;
  }

  const multipliers: Record<string, Decimal> = {
    k: new Decimal(1_000),
    m: new Decimal(1_000_000),
    b: new Decimal(1_000_000_000),
    t: new Decimal(1_000_000_000_000),
  };

  try {
    const multiplier = match[2]
      ? multipliers[match[2].toLowerCase()]
      : undefined;
    const result = multiplier
      ? new Decimal(match[1]).mul(multiplier)
      : new Decimal(match[1]);
    const number = result.toNumber();

    return Number.isSafeInteger(number) && number > 0 ? number : undefined;
  } catch {
    return undefined;
  }
}

function parseReleaseDate(markdown: string): string | undefined {
  const section = extractSection(markdown, "Release Date");

  if (!section) {
    return undefined;
  }

  const candidates = [
    ...section.matchAll(/\b([A-Z][a-z]+\s+\d{1,2},\s+\d{4})\b/g),
    ...section.matchAll(/\b([A-Z][a-z]+\s+\d{4})\b/g),
  ];

  for (const match of candidates) {
    const value = match[1]?.trim();
    const timestamp = timestampFromDateInput(value);

    if (timestamp) {
      return timestamp;
    }
  }

  return undefined;
}

function parseKnowledgeCutoff(markdown: string): string | undefined {
  const match =
    markdown.match(
      /knowledge cutoff[:\s]*([A-Z][a-z]+\s+\d{4}|[A-Z][a-z]+\s+\d{1,2},\s+\d{4})/i,
    ) ??
    markdown.match(
      /cutoff date of\s+([A-Z][a-z]+\s+\d{4}|[A-Z][a-z]+\s+\d{1,2},\s+\d{4})/i,
    );

  return timestampFromDateInput(match?.[1]);
}

function parseContextLength(markdown: string): number | undefined {
  const labeledMatch = markdown.match(
    /\*\*(?:Context Length|Context Window|Max Input Tokens|Input Context Length \(ISL\)):\*\*\s*([^\n\\]+)/i,
  );

  if (labeledMatch?.[1]) {
    return integerGreaterThanZero(parseScaledInteger(labeledMatch[1]));
  }

  const proseMatch = markdown.match(
    /\b(\d+(?:\.\d+)?\s*[KMBT])\s+token context length\b/i,
  );
  return integerGreaterThanZero(parseScaledInteger(proseMatch?.[1] ?? ""));
}

function normalizeModalityToken(value: string): ModelModality | undefined {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z]+/g, " ")
    .trim();

  if (!normalized) {
    return undefined;
  }

  if (normalized.includes("image")) {
    return "image";
  }

  if (normalized.includes("audio") || normalized.includes("speech")) {
    return "audio";
  }

  if (normalized.includes("video")) {
    return "video";
  }

  if (normalized.includes("pdf") || normalized.includes("file")) {
    return "file";
  }

  for (const token of normalized.split(/\s+/)) {
    const mapped = modalityAliases.get(token);

    if (mapped) {
      return mapped;
    }
  }

  return undefined;
}

function parseModalitiesFromLabel(
  markdown: string,
  labels: readonly string[],
): ModelModality[] | undefined {
  const values = new Set<ModelModality>();

  for (const label of labels) {
    const pattern = new RegExp(
      `\\*\\*${escapeRegex(label)}:\\*\\*\\s*([^\\n]+)`,
      "ig",
    );

    for (const match of markdown.matchAll(pattern)) {
      const body = match[1]
        ?.replace(/<br\s*\\?>/gi, " ")
        .replace(/\\/g, " ")
        .trim();

      if (!body) {
        continue;
      }

      for (const piece of body.split(/[;,]|\band\b/gi)) {
        const mapped = normalizeModalityToken(piece);

        if (mapped) {
          values.add(mapped);
        }
      }
    }
  }

  return values.size > 0
    ? allModalities.filter((entry) => values.has(entry))
    : undefined;
}

function hasPhrase(markdown: string, pattern: RegExp): boolean {
  return pattern.test(markdown);
}

function parseDoc(markdown: string, id: string): Omit<ModelRecord, "id"> {
  const input = parseModalitiesFromLabel(markdown, [
    "Input Type",
    "Input Types",
    "Input Type(s)",
  ]);
  const output = parseModalitiesFromLabel(markdown, [
    "Output Type",
    "Output Types",
    "Output Type(s)",
  ]);
  const attachment = input?.some((entry) => entry !== "text") ?? false;

  return compactObject({
    name: parseName(markdown, id),
    release_date: parseReleaseDate(markdown),
    knowledge_cutoff: parseKnowledgeCutoff(markdown),
    features: compactObject({
      attachment: attachment || undefined,
      reasoning:
        /(?:^|\/|[-_])(reasoning|thinking)(?:$|[-_])/i.test(id) || undefined,
      tool_call:
        hasPhrase(
          markdown,
          /function calling|tool calling|tool-use|tool use|tool call/i,
        ) || undefined,
      structured_output:
        hasPhrase(
          markdown,
          /structured outputs?|json-structured outputs?|json schema format/i,
        ) || undefined,
    }),
    limit: compactObject({
      context: parseContextLength(markdown),
    }),
    modalities: compactObject({
      input,
      output:
        output?.includes("text") ||
        output?.includes("image") ||
        output?.includes("audio") ||
        output?.includes("video") ||
        output?.includes("file")
          ? output
          : undefined,
    }),
  });
}

function buildDocSlugs(id: string): string[] {
  const normalized = id.toLowerCase();
  const primary = normalized
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const secondary = normalized
    .replace(/\//g, "-")
    .replace(/(\d)\.(\d)/g, "$1_$2")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  const compact = normalized
    .replace(/\//g, "")
    .replace(/(\d)\.(\d)/g, "$1$2")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  const compactUnderscore = normalized
    .replace(/\//g, "")
    .replace(/(\d)\.(\d)/g, "$1_$2")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  return [...new Set([primary, secondary, compact, compactUnderscore])];
}

function isMarkdownDocument(value: string): boolean {
  const trimmed = value.trimStart();
  return !trimmed.startsWith("<!DOCTYPE html") && !trimmed.startsWith("<html");
}

async function fetchModelDoc(id: string): Promise<string | undefined> {
  for (const slug of buildDocSlugs(id)) {
    try {
      const markdown = await fetchText(
        `https://docs.api.nvidia.com/nim/reference/${slug}.md`,
        { label: `Nvidia docs error (${id})` },
      );

      if (isMarkdownDocument(markdown)) {
        return markdown;
      }
    } catch {
      continue;
    }
  }

  return undefined;
}

export const nvidiaProvider: ProviderDefinition = {
  name: "nvidia",
  outputDirectory: "data/providers/nvidia/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://integrate.api.nvidia.com/v1/models",
      {
        schema: responseSchema,
        label: "Nvidia API error",
      },
    );

    const ids = [...new Set(response.data.map((model) => model.id))];
    progress?.tick(`integrate.api.nvidia.com/v1/models (${ids.length})`, true);

    progress?.beginPhase("scraping", ids.length);

    return mapWithConcurrency(ids, 8, async (id) => {
      const markdown = await fetchModelDoc(id);
      progress?.tick(id, markdown !== undefined);

      return markdown
        ? ({ id, ...parseDoc(markdown, id) } satisfies ModelRecord)
        : ({ id, name: id } satisfies ModelRecord);
    });
  },
};
