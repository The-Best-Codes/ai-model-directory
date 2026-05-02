import { z } from "zod";

import { mapWithConcurrency } from "../lib/async.ts";
import { fetchJson, fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  timestampFromDateInput,
} from "../lib/model.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  display_name: z.string().optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

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

function parseDetails(text: string): Omit<ModelRecord, "id"> | undefined {
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
      limit.context = integerGreaterThanZero(parseInteger(inputLimit));
    }

    if (outputLimit) {
      limit.output = integerGreaterThanZero(parseInteger(outputLimit));
    }
  }

  const capabilitiesRow = extractRow(text, /capabilities/i);

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
    result.release_date = timestampFromDateInput(latestUpdateRow, {
      rejectEpoch: true,
    });
  }

  const knowledgeCutoffRow = extractRow(text, /knowledge cutoff/i);

  if (knowledgeCutoffRow) {
    result.knowledge_cutoff = timestampFromDateInput(knowledgeCutoffRow, {
      rejectEpoch: true,
    });
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

function parseDollarAmount(value: string): number | undefined {
  const match = value.match(/\$\s*(\d+(?:\.\d+)?)/);

  if (!match?.[1]) {
    return undefined;
  }

  const parsed = Number(match[1]);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function extractSectionTable(section: string): string | undefined {
  const standardIndex = section.search(/^###\s+Standard\b/m);
  const start = standardIndex >= 0 ? standardIndex : 0;
  const after = section.slice(start);
  const tableMatch = after.match(/(\|[\s\S]*?)(?=\n\n|\n###\s|$)/);
  return tableMatch?.[1];
}

function parsePricingSections(
  text: string,
): Map<string, ModelRecord["pricing"]> {
  const result = new Map<string, ModelRecord["pricing"]>();
  const sections = text.split(/^## /m).slice(1);

  for (const section of sections) {
    const idsMatch = section.match(/\*((?:`[^`]+`(?:[^*`]*))+)\*/);

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

    const inputRow = extractRow(table, /^\s*Input price\s*$/i);
    const outputRow = extractRow(table, /^\s*Output price(\s+\(.*\))?\s*$/i);
    const cacheRow = extractRow(table, /^\s*Context caching price\s*$/i);

    const pricing: NonNullable<ModelRecord["pricing"]> = {};

    if (inputRow) {
      const value = parseDollarAmount(inputRow);

      if (value !== undefined) {
        pricing.input = value;
      }
    }

    if (outputRow) {
      const value = parseDollarAmount(outputRow);

      if (value !== undefined) {
        pricing.output = value;
      }
    }

    if (cacheRow) {
      const value = parseDollarAmount(cacheRow);

      if (value !== undefined) {
        pricing.cache_read = value;
      }
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
  try {
    const text = await fetchText(
      "https://ai.google.dev/gemini-api/docs/pricing.md.txt",
      {
        init: { redirect: "follow" },
        label: "Google pricing docs error",
      },
    );

    return parsePricingSections(text);
  } catch {
    return new Map();
  }
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
      fetchJson(
        "https://generativelanguage.googleapis.com/v1beta/openai/models",
        {
          schema: responseSchema,
          headers: { Authorization: `Bearer ${apiKey}` },
          label: "Google API error",
        },
      ),
      fetchPricing(),
    ]);

    progress?.tick(
      `generativelanguage.googleapis.com/v1beta/openai/models (${response.data.length})`,
      true,
    );
    progress?.tick(
      `ai.google.dev/gemini-api/docs/pricing (${pricing.size})`,
      true,
    );

    const basicModels = response.data.map((model) => {
      const id = model.id.replace(/^models\//, "");

      return {
        id,
        name: model.display_name?.trim() || id,
      };
    });

    progress?.beginPhase("scraping", basicModels.length);

    return mapWithConcurrency(basicModels, 8, async (model) => {
      const details = await fetchModelDetails(model.id);
      progress?.tick(model.id, true);

      const modelPricing = pricing.get(model.id);
      const merged: ModelRecord = details ? { ...details, ...model } : model;

      if (modelPricing) {
        merged.pricing = modelPricing;
      }

      return merged;
    });
  },
};
