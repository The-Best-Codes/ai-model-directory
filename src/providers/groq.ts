import { z } from "zod";

import { mapWithConcurrency } from "../lib/async.ts";
import { fetchJson, fetchText, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  timestampFromDateInput,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  owned_by: z.string(),
  context_window: z.number().optional(),
  max_completion_tokens: z.number().optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

type DocInfo = {
  name?: string;
  knowledge_cutoff?: ModelRecord["knowledge_cutoff"];
  open_weights?: ModelRecord["open_weights"];
  features?: NonNullable<ModelRecord["features"]>;
  pricing?: NonNullable<ModelRecord["pricing"]>;
  limit?: NonNullable<ModelRecord["limit"]>;
  modalities?: NonNullable<ModelRecord["modalities"]>;
};

const modalityKeywords: ReadonlyArray<[RegExp, ModelModality]> = [
  [/\baudio\b/i, "audio"],
  [/\bimages?\b/i, "image"],
  [/\bvideos?\b/i, "video"],
  [/\bpdfs?\b/i, "file"],
  [/\bfiles?\b/i, "file"],
  [/\btext\b/i, "text"],
];

function parseNumber(value: string): number | undefined {
  const parsed = Number(value.replace(/[$,_\s]/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parseModalities(
  value: string | undefined,
): ModelModality[] | undefined {
  if (!value) {
    return undefined;
  }

  const found = new Set<ModelModality>();

  for (const [pattern, modality] of modalityKeywords) {
    if (pattern.test(value)) {
      found.add(modality);
    }
  }

  if (found.size === 0) {
    return undefined;
  }

  return ["audio", "file", "image", "text", "video"].filter(
    (entry): entry is ModelModality => found.has(entry as ModelModality),
  );
}

function extractInlineSection(text: string, label: string): string | undefined {
  const match = text.match(
    new RegExp(`^${label}\\s*$\\n+(?:\\s*\\n)*([^\\n]+)`, "im"),
  );
  return match?.[1]?.trim();
}

function extractHeadingSection(
  text: string,
  heading: string,
): string | undefined {
  const match = text.match(
    new RegExp(`^###\\s+${heading}\\s*$([\\s\\S]*?)(?=^###\\s+|\\Z)`, "im"),
  );
  return match?.[1]?.trim();
}

function sectionLines(section: string | undefined): string[] {
  if (!section) {
    return [];
  }

  return section
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && line !== "---");
}

function parsePricingSection(
  section: string | undefined,
): NonNullable<ModelRecord["pricing"]> | undefined {
  if (!section || /underlying model pricing/i.test(section)) {
    return undefined;
  }

  const pricing: NonNullable<ModelRecord["pricing"]> = {};
  const lines = sectionLines(section);

  for (let index = 0; index < lines.length - 1; index += 1) {
    const label = lines[index]?.toLowerCase();
    const value = parseNumber(lines[index + 1] ?? "");

    if (value === undefined) {
      continue;
    }

    if (label === "input") {
      pricing.input = value;
    }

    if (label === "output") {
      pricing.output = value;
    }

    if (label === "cached input") {
      pricing.cache_read = value;
    }
  }

  return Object.keys(pricing).length > 0 ? pricing : undefined;
}

function parseLimitSection(
  section: string | undefined,
): NonNullable<ModelRecord["limit"]> | undefined {
  const limit: NonNullable<ModelRecord["limit"]> = {};
  const lines = sectionLines(section);

  for (let index = 0; index < lines.length - 1; index += 1) {
    const label = lines[index]?.toLowerCase();
    const value = integerGreaterThanZero(parseNumber(lines[index + 1] ?? ""));

    if (value === undefined) {
      continue;
    }

    if (label === "context window") {
      limit.context = value;
    }

    if (label === "max output tokens" || label === "max completion tokens") {
      limit.output = value;
    }
  }

  return Object.keys(limit).length > 0 ? limit : undefined;
}

function parseFeatures(
  capabilities: string | undefined,
  input: ModelModality[] | undefined,
): NonNullable<ModelRecord["features"]> | undefined {
  const normalized = capabilities?.toLowerCase();
  const features: NonNullable<ModelRecord["features"]> = {};

  if (normalized) {
    if (
      normalized.includes("tool use") ||
      normalized.includes("web search") ||
      normalized.includes("browser search") ||
      normalized.includes("visit website") ||
      normalized.includes("browser automation") ||
      normalized.includes("code execution") ||
      normalized.includes("wolfram alpha")
    ) {
      features.tool_call = true;
    }

    if (
      normalized.includes("json object mode") ||
      normalized.includes("json schema mode")
    ) {
      features.structured_output = true;
    }

    if (normalized.includes("reasoning")) {
      features.reasoning = true;
    }
  }

  if (input) {
    features.attachment = input.some((modality) => modality !== "text");
  }

  return Object.keys(features).length > 0 ? features : undefined;
}

function parseKnowledgeCutoff(text: string): string | undefined {
  const match = text.match(
    /knowledge cutoff(?:\s+of|\s+is|:)?\s+([A-Za-z]+\s+(?:\d{1,2},\s+)?\d{4})/i,
  );
  return match?.[1]
    ? timestampFromDateInput(match[1], { rejectEpoch: true })
    : undefined;
}

function parseDocPage(text: string): Omit<ModelRecord, "id"> | undefined {
  const name = text.match(/^#\s+(.+)$/m)?.[1]?.trim();

  if (!name) {
    return undefined;
  }

  const input = parseModalities(extractInlineSection(text, "INPUT"));
  const output = parseModalities(extractInlineSection(text, "OUTPUT"));
  const features = parseFeatures(
    extractInlineSection(text, "CAPABILITIES"),
    input,
  );
  const modalities = compactObject({
    input,
    output,
  }) as ModelRecord["modalities"];

  return compactObject({
    name,
    knowledge_cutoff: parseKnowledgeCutoff(text),
    open_weights: /\bopen-weights?\b|\bopen weights\b/i.test(text)
      ? true
      : undefined,
    features,
    pricing: parsePricingSection(extractHeadingSection(text, "PRICING")),
    limit: parseLimitSection(extractHeadingSection(text, "LIMITS")),
    modalities,
  });
}

function getModelDocUrl(model: z.infer<typeof apiModelSchema>): string {
  if (model.id.startsWith("groq/compound")) {
    const slug = model.id.split("/").at(-1) ?? model.id;
    return `https://console.groq.com/docs/compound/systems/${slug}.md`;
  }

  return `https://console.groq.com/docs/model/${model.id}.md`;
}

async function fetchModelDetails(
  model: z.infer<typeof apiModelSchema>,
): Promise<DocInfo | undefined> {
  try {
    const text = await fetchText(getModelDocUrl(model), {
      init: { redirect: "follow" },
      label: "Groq model docs error",
    });

    return parseDocPage(text);
  } catch {
    return undefined;
  }
}

export const groqProvider: ProviderDefinition = {
  name: "groq",
  outputDirectory: "data/providers/groq/models",
  async fetchModels(progress) {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.groq.com/openai/v1/models", {
      schema: responseSchema,
      headers: withBearerToken(apiKey),
      label: "Groq API error",
    });

    progress?.tick(
      `api.groq.com/openai/v1/models (${response.data.length})`,
      true,
    );
    const docDetails = new Map<string, DocInfo>();

    progress?.beginPhase("scraping", response.data.length);

    const detailResults = await mapWithConcurrency(
      response.data,
      8,
      async (model) => {
        const detail = await fetchModelDetails(model);
        progress?.tick(model.id, detail !== undefined);
        return { id: model.id, detail };
      },
    );

    for (const entry of detailResults) {
      if (entry.detail) {
        docDetails.set(entry.id, entry.detail);
      }
    }

    return response.data.map((model) => {
      const detail = docDetails.get(model.id);

      return compactObject({
        id: model.id,
        name: detail?.name || model.id,
        knowledge_cutoff: detail?.knowledge_cutoff,
        release_date: timestampFromUnixSeconds(model.created),
        open_weights: detail?.open_weights,
        features: detail?.features,
        pricing: detail?.pricing,
        limit: compactObject({
          context: integerGreaterThanZero(
            detail?.limit?.context ?? model.context_window,
          ),
          output: integerGreaterThanZero(
            detail?.limit?.output ?? model.max_completion_tokens,
          ),
        }),
        modalities: detail?.modalities,
      });
    });
  },
};
