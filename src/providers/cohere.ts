import { z } from "zod";
import * as cheerio from "cheerio";

import { fetchJson, fetchText, withBearerToken } from "../lib/http.ts";
import {
  documentationTimestamp,
  extractJsonArray,
  parseScaledNumber,
} from "../lib/docs.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromDateInput,
} from "../lib/model.ts";
import { hasAnyString } from "./helpers.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import { mapWithConcurrency } from "../lib/async.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  name: z.string(),
  endpoints: z.array(z.string()).default([]),
  context_length: z.number().nullish(),
  features: z.array(z.string()).nullish(),
  sampling_defaults: z
    .object({
      temperature: z.number().optional(),
    })
    .nullish(),
});

const responseSchema = z.object({
  models: z.array(apiModelSchema),
  next_page_token: z.string().nullish(),
});

type DocInfo = Omit<ModelRecord, "id"> & { live?: boolean };

export function parseModelTable(html: string): Map<string, DocInfo> {
  const $ = cheerio.load(html);
  const result = new Map<string, DocInfo>();
  $("table").each((_, table) => {
    const rows = $(table).find("tr").toArray();
    const headers = $(rows[0])
      .find("th, td")
      .toArray()
      .map((cell) => $(cell).text().trim());
    if (
      !headers.includes("Context Length") &&
      !headers.includes("Maximum file size")
    )
      return;
    for (const row of rows.slice(1)) {
      const cells = $(row)
        .find("td")
        .toArray()
        .map((cell) => $(cell).text().trim());
      const field = (name: string) => cells[headers.indexOf(name)];
      const id = field("Model Name");
      if (!id) continue;
      const modality = field("Modality") ?? field("Modalities");
      const input: ModelModality[] | undefined = modality
        ? [
            ...(/text/i.test(modality) ? (["text"] as const) : []),
            ...(/image/i.test(modality) ? (["image"] as const) : []),
            ...(/PDF/i.test(modality) ? (["file"] as const) : []),
          ]
        : undefined;
      const endpoints = field("Endpoints");
      result.set(
        id,
        compactObject({
          live: field("Status") === "Live",
          open_weights: /\bopen source\b/i.test(field("Description") ?? "")
            ? true
            : undefined,
          limit: compactObject({
            context: integerGreaterThanZero(
              parseScaledNumber(field("Context Length") ?? ""),
            ),
            output: integerGreaterThanZero(
              parseScaledNumber(field("Maximum Output Tokens") ?? ""),
            ),
          }),
          modalities: compactObject({
            input,
            output:
              endpoints === "Chat" ? (["text"] as ModelModality[]) : undefined,
          }),
        }),
      );
    }
  });
  return result;
}

const pricingModelSchema = z.object({
  modelName: z.string(),
  per: z.string().optional(),
  pricings: z
    .array(
      z.object({
        inputLabel: z.string().optional(),
        inputPrice: z.number().optional(),
        outputLabel: z.string().optional(),
        outputPrice: z.number().optional(),
        overridePer: z.string().optional(),
      }),
    )
    .optional(),
});

export function parsePricingPage(
  html: string,
): Map<string, ModelRecord["pricing"]> {
  const $ = cheerio.load(html);
  const result = new Map<string, ModelRecord["pricing"]>();
  const payloads = $("script")
    .toArray()
    .flatMap((node) => {
      const match = $(node)
        .text()
        .match(/self\.__next_f\.push\(\[1,("[\s\S]*")\]\)/)?.[1];
      try {
        return match ? [JSON.parse(match) as string] : [];
      } catch {
        return [];
      }
    });
  for (const payload of payloads) {
    const key = '"pricingGroups":';
    const start = payload.indexOf(key);
    if (start < 0) continue;
    const groups = z
      .array(z.object({ models: z.array(pricingModelSchema).optional() }))
      .safeParse(extractJsonArray(payload, start + key.length));
    if (!groups.success) continue;
    for (const model of groups.data.flatMap((group) => group.models ?? [])) {
      if (model.per !== "1M tokens") continue;
      const pricing: NonNullable<ModelRecord["pricing"]> = {};
      for (const entry of model.pricings ?? []) {
        if (entry.overridePer && entry.overridePer !== "1M tokens") continue;
        if (entry.inputLabel === "Input" || entry.inputLabel === "Cost")
          pricing.input = nonNegativeNumber(entry.inputPrice);
        if (entry.outputLabel === "Output")
          pricing.output = nonNegativeNumber(entry.outputPrice);
      }
      if (Object.values(pricing).some((value) => value !== undefined))
        result.set(model.modelName.toLowerCase(), compactObject(pricing));
    }
  }
  return result;
}

export function parseModelDocs(markdown: string): Omit<ModelRecord, "id"> {
  return compactObject({
    release_date: documentationTimestamp(
      markdown.match(/\*\*Release Date\*\*:\s*([^\n]+)/i)?.[1],
    ),
    open_weights:
      /\*\*Open Source Deployment\*\*:[^\n]+available[^\n]+Hugging Face/i.test(
        markdown,
      )
        ? true
        : undefined,
  });
}

async function fetchDocumentation(): Promise<Map<string, DocInfo>> {
  try {
    const [html, prices] = await Promise.all([
      fetchText("https://docs.cohere.com/docs/models", {
        label: "Cohere model docs error",
      }),
      fetchText("https://cohere.com/pricing", {
        label: "Cohere pricing error",
      }).catch(() => ""),
    ]);
    const models = parseModelTable(html);
    const pricing = parsePricingPage(prices);
    const current = [...models].filter(([, details]) => details.live);
    await mapWithConcurrency(current, 4, async ([id, details]) => {
      const family = id.replace(/-\d{2}-\d{4}$/, "");
      const label = family.replace(/-plus\b/, "+").replaceAll("-", " ");
      details.pricing = pricing.get(label);
      try {
        const markdown = await fetchText(
          `https://docs.cohere.com/docs/${family}.md`,
          { label: "Cohere model page error" },
        );
        Object.assign(details, parseModelDocs(markdown));
      } catch {}
    });
    return models;
  } catch {
    return new Map();
  }
}

function inferModalities(
  endpoints: readonly string[],
  features: readonly string[] | null | undefined,
): { input?: ModelModality[]; output?: ModelModality[] } {
  if (endpoints.includes("transcriptions")) {
    return { input: ["audio"], output: ["text"] };
  }

  if (endpoints.includes("embed_image")) {
    return { input: ["image"] };
  }

  if (endpoints.includes("embed")) {
    return { input: ["text"] };
  }

  if (features?.includes("vision")) {
    return { input: ["text", "image"], output: ["text"] };
  }

  if (
    endpoints.includes("chat") ||
    endpoints.includes("generate") ||
    endpoints.includes("summarize")
  ) {
    return { input: ["text"], output: ["text"] };
  }

  return {};
}

export const cohereProvider: ProviderDefinition = {
  name: "cohere",
  outputDirectory: "data/providers/cohere/models",
  async fetchModels(progress) {
    const apiKey = process.env.COHERE_API_KEY;

    if (!apiKey) {
      throw new Error("COHERE_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 1);

    const models: z.infer<typeof apiModelSchema>[] = [];
    let pageToken: string | undefined;
    const seen = new Set<string>();
    do {
      const url = new URL("https://api.cohere.com/v1/models");
      url.searchParams.set("page_size", "1000");
      if (pageToken) url.searchParams.set("page_token", pageToken);
      const response = await fetchJson(url, {
        schema: responseSchema,
        headers: withBearerToken(apiKey),
        label: "Cohere API error",
      });
      models.push(...response.models);
      pageToken = response.next_page_token ?? undefined;
      if (pageToken && seen.has(pageToken))
        throw new Error("Cohere API repeated a page token");
      if (pageToken) seen.add(pageToken);
    } while (pageToken);
    const documentation = await fetchDocumentation();

    progress?.tick(`api.cohere.com/v1/models (${models.length})`, true);

    return models.map((model) => {
      const details = documentation.get(model.name);
      const modalities = {
        ...inferModalities(model.endpoints, model.features),
        ...details?.modalities,
      };
      const hasAttachments = modalities.input?.some(
        (modality) => modality !== "text",
      );

      return compactObject({
        id: model.name,
        name: model.name,
        release_date: details?.release_date,
        open_weights: details?.open_weights,
        pricing: details?.pricing,
        features: compactObject({
          attachment: hasAttachments,
          reasoning:
            model.features != null
              ? hasAnyString(model.features, "reasoning")
              : undefined,
          tool_call:
            model.features != null
              ? hasAnyString(
                  model.features,
                  "tools",
                  "strict_tools",
                  "tool_choice",
                )
              : undefined,
          structured_output:
            model.features != null
              ? hasAnyString(model.features, "json_mode", "json_schema")
              : undefined,
          temperature:
            model.sampling_defaults?.temperature === undefined
              ? undefined
              : true,
        }),
        limit: compactObject({
          ...details?.limit,
          context:
            integerGreaterThanZero(model.context_length) ??
            details?.limit?.context,
        }),
        modalities: compactObject(modalities),
      });
    });
  },
};
