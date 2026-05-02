import { z } from "zod";

import { fetchJson, fetchText, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ModelRecord } from "../schema.ts";
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
  pricing?: NonNullable<ModelRecord["pricing"]>;
};

function parseTokenPrice(
  value: string,
  label: "input" | "output",
): number | undefined {
  const pattern = new RegExp(
    `\\$\\s*([0-9]+(?:\\.[0-9]+)?)\\s*${label}\\b`,
    "i",
  );
  const match = value.match(pattern);

  if (!match?.[1]) {
    return undefined;
  }

  const parsed = Number(match[1]);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parseModelIdCell(
  cell: string,
): { id: string; name?: string } | undefined {
  const match = cell.match(
    /\[!\[[^\]]*\]\([^)]*\)([^\]]+)\]\([^)]*\)([\w./-]+)\s*$/,
  );

  if (!match?.[2]) {
    return undefined;
  }

  return { id: match[2].trim(), name: match[1]?.trim() };
}

function parseDocsTables(text: string): Map<string, DocInfo> {
  const result = new Map<string, DocInfo>();

  for (const rawLine of text.split("\n")) {
    const trimmed = rawLine.trim();

    if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) {
      continue;
    }

    const cells = trimmed
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

    if (cells.length < 3) {
      continue;
    }

    const idCell = cells[0]!;
    const priceCell = cells[2]!;
    const parsed = parseModelIdCell(idCell);

    if (!parsed) {
      continue;
    }

    const info: DocInfo = {};

    if (parsed.name) {
      info.name = parsed.name;
    }

    const pricing: NonNullable<ModelRecord["pricing"]> = {};
    const input = parseTokenPrice(priceCell, "input");
    const output = parseTokenPrice(priceCell, "output");

    if (input !== undefined) {
      pricing.input = input;
    }

    if (output !== undefined) {
      pricing.output = output;
    }

    if (Object.keys(pricing).length > 0) {
      info.pricing = pricing;
    }

    result.set(parsed.id, info);
  }

  return result;
}

async function fetchDocs(): Promise<Map<string, DocInfo>> {
  try {
    const text = await fetchText("https://console.groq.com/docs/models.md", {
      label: "Groq docs error",
    });
    return parseDocsTables(text);
  } catch {
    return new Map();
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

    progress?.beginPhase("fetching", 2);

    const [response, docs] = await Promise.all([
      fetchJson("https://api.groq.com/openai/v1/models", {
        schema: responseSchema,
        headers: withBearerToken(apiKey),
        label: "Groq API error",
      }),
      fetchDocs(),
    ]);

    progress?.tick(
      `api.groq.com/openai/v1/models (${response.data.length})`,
      true,
    );
    progress?.tick(`console.groq.com/docs/models (${docs.size})`, true);

    return response.data.map((model) => {
      const info = docs.get(model.id);

      return compactObject({
        id: model.id,
        name: info?.name || model.id,
        release_date: timestampFromUnixSeconds(model.created),
        pricing: info?.pricing,
        limit: compactObject({
          context: integerGreaterThanZero(model.context_window),
          output: integerGreaterThanZero(model.max_completion_tokens),
        }),
      });
    });
  },
};
