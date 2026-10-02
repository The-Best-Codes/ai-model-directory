import { z } from "zod";

import { mapWithConcurrency } from "../lib/async.ts";
import { fetchJson, fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { documentationTimestamp } from "../lib/docs.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  name: z.string(),
  displayName: z.string().optional(),
  inputTokenLimit: z.number().optional(),
  outputTokenLimit: z.number().optional(),
  thinking: z.boolean().optional(),
  temperature: z.number().optional(),
});

const responseSchema = z.object({
  models: z.array(apiModelSchema),
  nextPageToken: z.string().optional(),
});

const modalityKeywords: ReadonlyArray<[RegExp, ModelModality]> = [
  [/\baudio\b/i, "audio"],
  [/\bimages?\b/i, "image"],
  [/\bvideos?\b/i, "video"],
  [/\bpdfs?\b/i, "file"],
  [/\bfiles?\b/i, "file"],
  [/\btext\b/i, "text"],
];

function parseModalities(value: string): ModelModality[] {
  const found = new Set<ModelModality>();

  for (const [pattern, modality] of modalityKeywords) {
    if (pattern.test(value)) {
      found.add(modality);
    }
  }

  return ["text", "image", "audio", "video", "file"].filter(
    (entry): entry is ModelModality => found.has(entry as ModelModality),
  );
}

function parseInteger(value: string): number | undefined {
  const parsed = Number(value.replace(/[,_\s]/g, ""));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function extractRow(table: string, label: RegExp): string | undefined {
  const lines = table.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed.startsWith("|")) {
      continue;
    }

    const cells = trimmed
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

    if (cells.length >= 2 && cells[0] && label.test(cells[0])) {
      return cells.slice(1).join(" | ");
    }
  }

  return undefined;
}

function extractField(row: string, field: string): string | undefined {
  const pattern = new RegExp(
    `\\*\\*${field}\\*\\*\\s+([\\s\\S]*?)(?=\\*\\*[^*]+\\*\\*|$)`,
    "i",
  );
  const match = row.match(pattern);
  return match?.[1]?.trim();
}

function isSupported(value: string | undefined): boolean | undefined {
  if (!value) {
    return undefined;
  }

  if (/^supported\b/i.test(value)) {
    return true;
  }

  if (/^not supported\b/i.test(value)) {
    return false;
  }

  return undefined;
}

export function parseDetails(
  text: string,
): Omit<ModelRecord, "id"> | undefined {
  if (text.includes('class="devsite-404"')) {
    return undefined;
  }

  if (!/Model code/i.test(text)) {
    return undefined;
  }

  const result: Omit<ModelRecord, "id"> = {};
  const features: NonNullable<ModelRecord["features"]> = {};
  const limit: NonNullable<ModelRecord["limit"]> = {};
  const modalities: { input: ModelModality[]; output: ModelModality[] } = {
    input: [],
    output: [],
  };

  const dataTypesRow = extractRow(text, /supported data types/i);

  if (dataTypesRow) {
    const inputs = extractField(dataTypesRow, "Inputs");
    const output = extractField(dataTypesRow, "Output");

    if (inputs) {
      modalities.input = parseModalities(inputs);
    }

    if (output) {
      modalities.output = parseModalities(output);
    }
  }

  const tokenLimitsRow = extractRow(text, /token limits/i);

  if (tokenLimitsRow) {
    const inputLimit = extractField(tokenLimitsRow, "Input token limit");
    const outputLimit = extractField(tokenLimitsRow, "Output token limit");

    if (inputLimit) {
      limit.input = integerGreaterThanZero(parseInteger(inputLimit));
      limit.context = limit.input;
    }

    if (outputLimit) {
      limit.output = integerGreaterThanZero(parseInteger(outputLimit));
    }
  }

  const capabilitiesRow = extractRow(text, /capabilities/i)?.replace(
    /\[([^\]]+)\]\([^)]*\)/g,
    "$1",
  );

  if (capabilitiesRow) {
    const functionCalling = isSupported(
      extractField(capabilitiesRow, "Function calling"),
    );
    const structuredOutputs = isSupported(
      extractField(capabilitiesRow, "Structured outputs"),
    );
    const thinking = isSupported(extractField(capabilitiesRow, "Thinking"));
    const imageGeneration = isSupported(
      extractField(capabilitiesRow, "Image generation"),
    );
    const audioGeneration = isSupported(
      extractField(capabilitiesRow, "Audio generation"),
    );

    if (functionCalling !== undefined) {
      features.tool_call = functionCalling;
    }

    if (structuredOutputs !== undefined) {
      features.structured_output = structuredOutputs;
    }

    if (thinking !== undefined) {
      features.reasoning = thinking;
    }

    if (imageGeneration && !modalities.output.includes("image")) {
      modalities.output.push("image");
    }

    if (audioGeneration && !modalities.output.includes("audio")) {
      modalities.output.push("audio");
    }
  }

  if (modalities.input.length > 0) {
    features.attachment =
      modalities.input.includes("image") ||
      modalities.input.includes("audio") ||
      modalities.input.includes("video") ||
      modalities.input.includes("file");
  }

  const latestUpdateRow = extractRow(text, /latest update/i);

  if (latestUpdateRow) {
    result.last_updated = documentationTimestamp(latestUpdateRow);
  }

  const knowledgeCutoffRow = extractRow(text, /knowledge cutoff/i);

  if (knowledgeCutoffRow) {
    result.knowledge_cutoff = documentationTimestamp(knowledgeCutoffRow);
  }

  if (modalities.input.length > 0 || modalities.output.length > 0) {
    result.modalities = compactObject({
      input: modalities.input.length > 0 ? modalities.input : undefined,
      output: modalities.output.length > 0 ? modalities.output : undefined,
    });
  }

  return compactObject({
    ...result,
    features: compactObject(features),
    limit: compactObject(limit),
  });
}

async function fetchModelDetails(
  id: string,
): Promise<Omit<ModelRecord, "id"> | undefined> {
  try {
    const text = await fetchText(
      `https://ai.google.dev/gemini-api/docs/models/${encodeURIComponent(id)}.md.txt`,
      {
        init: { redirect: "follow" },
        label: "Google model docs error",
      },
    );

    return parseDetails(text);
  } catch {
    return undefined;
  }
}

function parseTokenPrices(value: string): { token?: number; audio?: number } {
  const result: { token?: number; audio?: number } = {};

  const tokenPrices = value.replace(/\s+or\s+\$[\d.]+\s*\/min\b/gi, "");

  for (const match of tokenPrices.matchAll(/\$\s*(\d+(?:\.\d+)?)([^$]*)/g)) {
    const amount = match[1];
    const description = match[2] ?? "";

    if (!amount || /^\s*(?:per\b|\/)/i.test(description)) {
      continue;
    }

    const modalities = description.match(/\(([^)]+)\)/)?.[1] ?? "";
    const audio = /\baudio\b/i.test(modalities);
    const text = /\btext\b/i.test(modalities);

    if (audio) {
      result.audio ??= Number(amount);
    }

    if (text || !/\b(audio|image|images|video)\b/i.test(modalities)) {
      result.token ??= Number(amount);
    }
  }

  return result;
}

function extractSectionTable(section: string): string | undefined {
  const standardIndex = section.search(/^###\s+Standard\b/m);
  const start = standardIndex >= 0 ? standardIndex : 0;
  const after = section.slice(start);
  const tableMatch = after.match(/(\|[\s\S]*?)(?=\n\n|\n###\s|$)/);
  return tableMatch?.[1];
}

export function parsePricingSections(
  text: string,
): Map<string, ModelRecord["pricing"]> {
  const result = new Map<string, ModelRecord["pricing"]>();
  const sections = text.split(/^## /m).slice(1);

  for (const section of sections) {
    const idsMatch = section.match(/^\*([^\n]+)\*\s*$/m);

    if (!idsMatch?.[1]) {
      continue;
    }

    const ids = Array.from(idsMatch[1].matchAll(/`([^`]+)`/g)).map(
      (entry) => entry[1] as string,
    );

    if (ids.length === 0) {
      continue;
    }

    const table = extractSectionTable(section);

    if (!table) {
      continue;
    }

    const inputRow = extractRow(
      table,
      /^\s*(?:Text )?Input price(\s+\(.*\))?\s*$/i,
    );
    const outputRow = extractRow(table, /^\s*Output price(\s+\(.*\))?\s*$/i);
    const cacheRow = extractRow(table, /^\s*Context caching price\s*$/i);

    const pricing: NonNullable<ModelRecord["pricing"]> = {};

    if (inputRow) {
      const prices = parseTokenPrices(inputRow);
      pricing.input = prices.token;
      pricing.input_audio = prices.audio;
    }

    const audioInputRow = extractRow(table, /^Audio input price$/i);

    if (audioInputRow) {
      pricing.input_audio = parseTokenPrices(audioInputRow).token;
    }

    if (outputRow) {
      const prices = parseTokenPrices(outputRow);
      pricing.output = prices.token;
      pricing.output_audio = prices.audio;
    }

    if (cacheRow) {
      pricing.cache_read = parseTokenPrices(cacheRow).token;
    }

    const compact = compactObject(pricing);

    if (Object.keys(compact).length === 0) {
      continue;
    }

    for (const id of ids) {
      result.set(id, compact);
    }
  }

  return result;
}

async function fetchPricing(): Promise<Map<string, ModelRecord["pricing"]>> {
  const text = await fetchText(
    "https://ai.google.dev/gemini-api/docs/pricing.md.txt",
    {
      init: { redirect: "follow" },
      label: "Google pricing docs error",
    },
  );
  const pricing = parsePricingSections(text);

  if (pricing.size === 0) {
    throw new Error("Google pricing docs contained no recognized token prices");
  }

  return pricing;
}

async function fetchModels(
  apiKey: string,
): Promise<z.infer<typeof apiModelSchema>[]> {
  const models: z.infer<typeof apiModelSchema>[] = [];
  let pageToken: string | undefined;
  const seen = new Set<string>();

  do {
    const url = new URL(
      "https://generativelanguage.googleapis.com/v1beta/models",
    );
    url.searchParams.set("pageSize", "1000");
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    const response = await fetchJson(url, {
      schema: responseSchema,
      headers: { "x-goog-api-key": apiKey },
      label: "Google API error",
    });
    models.push(...response.models);
    pageToken = response.nextPageToken;
    if (pageToken && seen.has(pageToken))
      throw new Error("Google API repeated a page token");
    if (pageToken) seen.add(pageToken);
  } while (pageToken);

  return models;
}

export const googleProvider: ProviderDefinition = {
  name: "google",
  outputDirectory: "data/providers/google/models",
  async fetchModels(progress) {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 2);

    const [response, pricing] = await Promise.all([
      fetchModels(apiKey),
      fetchPricing(),
    ]);

    progress?.tick(
      `generativelanguage.googleapis.com/v1beta/models (${response.length})`,
      true,
    );
    progress?.tick(
      `ai.google.dev/gemini-api/docs/pricing (${pricing.size})`,
      true,
    );

    const basicModels = response.map((model) => {
      const id = model.name.replace(/^models\//, "");

      return compactObject({
        id,
        name: model.displayName?.trim() || id,
        features: compactObject({
          reasoning: model.thinking,
          temperature: model.temperature === undefined ? undefined : true,
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.inputTokenLimit),
          input: integerGreaterThanZero(model.inputTokenLimit),
          output: integerGreaterThanZero(model.outputTokenLimit),
        }),
      });
    });

    progress?.beginPhase("scraping", basicModels.length);

    return mapWithConcurrency(basicModels, 8, async (model) => {
      const details = await fetchModelDetails(model.id);
      progress?.tick(model.id, true);

      const modelPricing = pricing.get(model.id);
      const merged: ModelRecord = compactObject({
        ...details,
        ...model,
        features: compactObject({ ...details?.features, ...model.features }),
        limit: compactObject({ ...details?.limit, ...model.limit }),
      });

      if (modelPricing) {
        merged.pricing = modelPricing;
      }

      return merged;
    });
  },
};
