import Decimal from "decimal.js";
import * as cheerio from "cheerio";
import { z } from "zod";

import { fetchJson, fetchText, withBearerToken } from "../lib/http.ts";
import {
  documentationTimestamp,
  markdownTables,
  parseScaledNumber,
} from "../lib/docs.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";
import type { ModelRecord } from "../schema.ts";
import { mapWithConcurrency } from "../lib/async.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
  prompt_text_token_price: z.number().optional(),
  cached_prompt_text_token_price: z.number().optional(),
  completion_text_token_price: z.number().optional(),
  aliases: z.array(z.string()).optional(),
  capabilities: z.object({ reasoning_effort: z.array(z.string()) }).nullish(),
});

const responseSchema = z.object({ models: z.array(apiModelSchema) });

const publicModelSchema = z.object({
  name: z.string(),
  maxPromptLength: z.number().optional(),
  features: z
    .object({
      functionCalling: z.boolean().optional(),
      structuredOutputs: z.boolean().optional(),
      reasoning: z.boolean().optional(),
    })
    .optional(),
});

export function parsePublicModels(
  html: string,
): Map<string, Omit<ModelRecord, "id">> {
  const $ = cheerio.load(html);
  const result = new Map<string, Omit<ModelRecord, "id">>();
  const script = $("script")
    .toArray()
    .map((node) => $(node).text())
    .find((text) =>
      text.trim().startsWith("globalThis.__XAI_PUBLIC_MODELS__="),
    );
  if (!script) return result;
  const parsed = z
    .object({
      clusterConfigs: z.array(
        z.object({
          languageModels: z.array(publicModelSchema).optional(),
        }),
      ),
    })
    .safeParse(
      JSON.parse(
        script
          .slice(script.indexOf("=") + 1)
          .trim()
          .replace(/;$/, ""),
      ),
    );
  if (!parsed.success) return result;
  for (const cluster of parsed.data.clusterConfigs) {
    for (const model of cluster.languageModels ?? []) {
      if (result.has(model.name)) continue;
      result.set(
        model.name,
        compactObject({
          features: compactObject({
            reasoning: model.features?.reasoning,
            tool_call: model.features?.functionCalling,
            structured_output: model.features?.structuredOutputs,
          }),
          limit: compactObject({
            input: integerGreaterThanZero(model.maxPromptLength),
          }),
        }),
      );
    }
  }
  return result;
}

export function parseModelIndex(markdown: string): Map<string, number> {
  const result = new Map<string, number>();
  for (const table of markdownTables(markdown)) {
    if (table[0]?.[1] !== "Context") continue;
    for (const row of table.slice(1)) {
      const id = row[0]?.replace(/\s+\(.*$/, "");
      const context = parseScaledNumber(row[1] ?? "");
      if (id && context !== undefined) result.set(id, context);
    }
  }
  return result;
}

async function fetchPublicModels(): Promise<
  Map<string, Omit<ModelRecord, "id">>
> {
  try {
    const [html, markdown] = await Promise.all([
      fetchText("https://docs.x.ai/developers/models", {
        label: "xAI public models error",
      }).catch(() => ""),
      fetchText("https://docs.x.ai/developers/models.md", {
        label: "xAI model index error",
      }).catch(() => ""),
    ]);
    const models = parsePublicModels(html);
    for (const [id, context] of parseModelIndex(markdown)) {
      const previous = models.get(id);
      models.set(id, { ...previous, limit: { ...previous?.limit, context } });
    }
    const cutoff = markdown.match(
      /knowledge cut[- ]?off date of ([\w. -]+?) is ([A-Za-z]+ \d{4})/i,
    );
    if (cutoff?.[1] && cutoff[2]) {
      const id = cutoff[1].toLowerCase().replace(/\s+/g, "-");
      models.set(id, {
        ...models.get(id),
        knowledge_cutoff: documentationTimestamp(cutoff[2]),
      });
    }
    return models;
  } catch {
    return new Map();
  }
}

export function parseModelDocs(markdown: string): Omit<ModelRecord, "id"> {
  const cutoff = markdown.match(
    /knowledge cut[- ]?off(?: date)?(?: of [\w.-]+)? is ([A-Za-z]+ \d{4})/i,
  )?.[1];
  const support = (label: string): boolean | undefined => {
    const value = markdown.match(
      new RegExp(`\\*\\*${label}:\\*\\*\\s*(Yes|No)\\b`, "i"),
    )?.[1];
    return value ? value.toLowerCase() === "yes" : undefined;
  };
  return compactObject({
    knowledge_cutoff: documentationTimestamp(cutoff),
    features: compactObject({
      reasoning: support("Reasoning"),
      tool_call: support("Function calling"),
      structured_output: support("Structured outputs"),
    }),
    limit: compactObject({
      context: integerGreaterThanZero(
        parseScaledNumber(
          markdown.match(/\*\*Context window:\*\*\s*([^\n]+)/)?.[1] ?? "",
        ),
      ),
    }),
  });
}

function tokenPriceToMillion(
  value: number | null | undefined,
): number | undefined {
  const normalized = nonNegativeNumber(value);
  return normalized === undefined
    ? undefined
    : new Decimal(normalized).div(10000).toNumber();
}

export const xaiProvider: ProviderDefinition = {
  name: "xai",
  outputDirectory: "data/providers/xai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const [response, publicModels] = await Promise.all([
      fetchJson("https://api.x.ai/v1/language-models", {
        schema: responseSchema,
        headers: withBearerToken(process.env.XAI_API_KEY),
        label: "xAI API error",
      }),
      fetchPublicModels(),
    ]);

    progress?.tick(
      `api.x.ai/v1/language-models (${response.models.length})`,
      true,
    );

    progress?.beginPhase("scraping", response.models.length);
    const records = await mapWithConcurrency(
      response.models,
      4,
      async (model) => {
        const detail =
          publicModels.get(model.id) ??
          model.aliases?.map((id) => publicModels.get(id)).find(Boolean);
        let docs: Omit<ModelRecord, "id"> = {};
        try {
          docs = parseModelDocs(
            await fetchText(
              `https://docs.x.ai/developers/models/${encodeURIComponent(model.id)}.md`,
              { label: "xAI model docs error" },
            ),
          );
        } catch {}
        progress?.tick(model.id, true);
        const input = filterModalities(model.input_modalities);
        const output = filterModalities(model.output_modalities);
        const record = compactObject({
          name: model.id,
          release_date: timestampFromUnixSeconds(model.created),
          knowledge_cutoff: docs.knowledge_cutoff ?? detail?.knowledge_cutoff,
          features: compactObject({
            attachment: hasAttachmentSupport(input),
            ...detail?.features,
            ...docs.features,
            reasoning:
              docs.features?.reasoning ??
              detail?.features?.reasoning ??
              (model.capabilities
                ? model.capabilities.reasoning_effort.some(
                    (effort) => effort !== "none",
                  )
                : /non-reasoning/i.test(model.id)
                  ? false
                  : undefined),
          }),
          pricing: compactObject({
            input: tokenPriceToMillion(model.prompt_text_token_price),
            output: tokenPriceToMillion(model.completion_text_token_price),
            cache_read: tokenPriceToMillion(
              model.cached_prompt_text_token_price,
            ),
          }),
          modalities: compactObject({ input, output }),
          limit: compactObject({ ...detail?.limit, ...docs.limit }),
        });

        return [model.id, ...(model.aliases ?? [])].map((id) => ({
          id,
          ...record,
          name: id,
        }));
      },
    );
    return records.flat();
  },
};
