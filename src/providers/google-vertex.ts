import * as cheerio from "cheerio";
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

const apiKey = process.env.GOOGLE_VERTEX_TOKEN;

const foundationModelsUrl = `https://cloudconsole-pa.clients6.google.com/v3/entityServices/AiplatformEntityService/schemas/AIPLATFORM_GRAPHQL:batchGraphql?key=${apiKey}`;
const pricingUrl =
  "https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing";

const foundationModelsBody = {
  querySignature: "2/xEeh3Pe+CKXh61+RgeHWE6OBq0ZltELzkScRWKeNLps=",
  operationName: "ListPublisherModel",
  variables: {
    parent: "publishers/*",
    apiFilter: "is_hf_wildcard(false)",
    pageSize: 5000,
  },
};

const apiDocumentationSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const apiModelSchema = z.object({
  name: z.string(),
  categories: z.array(z.string()),
  displayName: z.string().optional(),
  versionExternalName: z.string().optional(),
  versionId: z.string().optional(),
  overview: z.string().nullable().optional(),
  modelServingType: z.string().optional(),
  openSourceCategory: z.string().optional(),
  createTime: z.string().optional(),
  updateTime: z.string().optional(),
  supportedTasks: z.array(z.string()).nullable().optional(),
  inputTypes: z.array(z.string()).nullable().optional(),
  outputTypes: z.array(z.string()).nullable().optional(),
  documentations: z.array(apiDocumentationSchema).nullable().optional(),
});

const foundationModelsResponseSchema = z.array(
  z.object({
    results: z.array(
      z.object({
        data: z.object({
          ui: z.object({
            listPublisherModel: z.object({
              data: z.array(apiModelSchema),
            }),
          }),
        }),
      }),
    ),
  }),
);

type ApiModel = z.infer<typeof apiModelSchema>;

const allModalities: readonly ModelModality[] = [
  "text",
  "image",
  "audio",
  "video",
  "file",
];

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeListText(value: string): string {
  return normalizeWhitespace(
    value
      .replace(/\[[^\]]+\]\([^)]*\)/g, (match) =>
        match.replace(/^\[([^\]]+)\]\([^)]*\)$/, "$1"),
      )
      .replace(/`/g, "")
      .replace(/\\&/g, "&"),
  );
}

function normalizePropertyKey(value: string): string {
  return normalizeWhitespace(value).replace(/[*:`]/g, "").toLowerCase();
}

function normalizePriceKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function normalizePriceName(value: string): string {
  return normalizeWhitespace(value)
    .replace(/\s*\(.*?\)\s*/g, " ")
    .replace(/\bPreview\b/gi, " ")
    .replace(/\bExperimental\b/gi, " ")
    .replace(/\bDeprecated\b/gi, " ")
    .replace(/\bModel Optimizer\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function idToDisplayName(id: string): string {
  return id
    .replace(/-maas$/i, " MaaS")
    .replace(/(\d)-(\d)/g, "$1.$2")
    .replace(/\btts\b/gi, "TTS")
    .replace(/\bocr\b/gi, "OCR")
    .replace(/\bgpt\b/gi, "GPT")
    .replace(/\boss\b/gi, "OSS")
    .replace(/\bglm\b/gi, "GLM")
    .replace(/-/g, " ")
    .replace(/\bmaas\b/g, "MaaS")
    .replace(/\b([a-z])/g, (match) => match.toUpperCase())
    .trim();
}

function modelIdFromName(name: string): string {
  return name.split("/").at(-1) ?? name;
}

function parseCurrency(value: string): number | undefined {
  const match = value.match(/\$\s*(\d+(?:\.\d+)?)/);

  if (!match?.[1]) {
    return undefined;
  }

  const parsed = Number(match[1]);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parseInteger(value: string): number | undefined {
  const match = value.match(/(\d+(?:[\d,]*)(?:\.\d+)?)\s*([kKmM])?/);

  if (!match?.[1]) {
    return undefined;
  }

  const base = Number(match[1].replace(/,/g, ""));

  if (!Number.isFinite(base)) {
    return undefined;
  }

  const multiplier =
    match[2]?.toLowerCase() === "k"
      ? 1_000
      : match[2]?.toLowerCase() === "m"
        ? 1_000_000
        : 1;

  return base * multiplier;
}

function extractTokenLimit(
  source: string | undefined,
  patterns: readonly RegExp[],
): number | undefined {
  if (!source) {
    return undefined;
  }

  for (const pattern of patterns) {
    const match = source.match(pattern)?.[1];
    const value = integerGreaterThanZero(parseInteger(match ?? ""));

    if (value !== undefined) {
      return value;
    }
  }

  return undefined;
}

function orderedModalities(
  values: Set<ModelModality>,
): ModelModality[] | undefined {
  return values.size > 0
    ? allModalities.filter((entry) => values.has(entry))
    : undefined;
}

function parseModalities(
  value: string | undefined,
): ModelModality[] | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = normalizeListText(value).toLowerCase();
  const result = new Set<ModelModality>();

  if (
    /\btexts?\b|\bcode\b|\blanguage\b|\banswers?\b|\bcaptions?\b|\bmarkdown\b/.test(
      normalized,
    )
  ) {
    result.add("text");
  }

  if (/\bimages?\b|\bvision\b/.test(normalized)) {
    result.add("image");
  }

  if (
    /\baudios?\b|\bvoices?\b|\bmusic\b|\bsongs?\b|\bspeech\b|\bdialogue\b/.test(
      normalized,
    )
  ) {
    result.add("audio");
  }

  if (/\bvideos?\b/.test(normalized)) {
    result.add("video");
  }

  if (/\bdocuments?\b|\bpdfs?\b|\bfiles?\b/.test(normalized)) {
    result.add("file");
  }

  return orderedModalities(result);
}

function coarseModalitiesFromTypes(
  values: string[] | null | undefined,
): ModelModality[] | undefined {
  if (!values || values.length === 0) {
    return undefined;
  }

  const result = new Set<ModelModality>();

  for (const value of values) {
    const normalized = value.toUpperCase();

    if (normalized === "LANGUAGE") {
      result.add("text");
    }

    if (normalized === "VISION") {
      result.add("image");
    }

    if (normalized === "VIDEO") {
      result.add("video");
    }

    if (normalized === "DOCS") {
      result.add("file");
    }

    if (normalized === "DIALOGUE") {
      result.add("audio");
    }
  }

  return orderedModalities(result);
}

function refineModalities(
  model: ApiModel,
  supportedDataTypes: string | undefined,
  input: ModelModality[] | undefined,
  output: ModelModality[] | undefined,
) {
  const id = modelIdFromName(model.name);

  if (/^gemini-live-.*native-audio/i.test(id)) {
    return {
      input: ["audio", "image", "text", "video"] as ModelModality[],
      output: ["audio", "text"] as ModelModality[],
    };
  }

  const summaryText = normalizeListText(
    [
      model.displayName,
      model.overview,
      supportedDataTypes,
      ...(model.supportedTasks ?? []),
    ]
      .filter(Boolean)
      .join(" "),
  ).toLowerCase();
  const explicitOutputText =
    supportedDataTypes?.match(/Outputs?:\s*(.+)$/i)?.[1] ??
    supportedDataTypes?.match(/Output:\s*(.+)$/i)?.[1];
  const supportsImageOutput =
    /image generation|generate high fidelity images|generate high quality images|image editing|create new images|output:\s*images?|outputs?:\s*images?|images? \+ text|interleaved text and image generation|interleaved images and text|4k resolution output/.test(
      summaryText,
    );
  const textOnlyOutput =
    /caption|vqa|question answering|classification|summari|translation|transcri|chat|dialogue|language model|\bllm\b|coding capabilities|function calling|agentic workflows?|tool use|reasoning|text generation|extract(?:ion|s)?|recognition|detection/.test(
      summaryText,
    ) && !supportsImageOutput;
  const explicitFileOutput = /document|pdf|file/.test(
    explicitOutputText?.toLowerCase() ?? "",
  );
  let refinedOutput = output;

  if (textOnlyOutput) {
    refinedOutput = ["text"];
  } else if (supportsImageOutput) {
    refinedOutput = orderedModalities(
      new Set([...(output ?? []), "image", "text"]),
    );
  }

  if (refinedOutput?.includes("file") && !explicitFileOutput) {
    refinedOutput = orderedModalities(
      new Set(refinedOutput.filter((modality) => modality !== "file")),
    );
  }

  return { input, output: refinedOutput };
}

function hasExplicitTokenLimitSource(text: string | undefined): boolean {
  if (!text) {
    return false;
  }

  return /maximum input tokens|input token limit|context length|maximum output tokens|output token limit|max output/i.test(
    text,
  );
}

function getMarkdownTableValue(
  text: string,
  label: string,
): string | undefined {
  const pattern = new RegExp(
    `^\\|\\s*${label}\\s*\\|\\s*(.*?)\\s*(?:\\|\\|?)$`,
    "im",
  );
  const match = text.match(pattern);
  return match?.[1] ? normalizeListText(match[1]) : undefined;
}

function extractSection(text: string, title: string): string | undefined {
  const pattern = new RegExp(
    `^${title}\\s*$([\\s\\S]*?)(?=^\\S.*\\s*$|^#{1,6}\\s|\\Z)`,
    "im",
  );
  const match = text.match(pattern);
  return match?.[1] ? normalizeListText(match[1]) : undefined;
}

function extractCapabilitiesText(text: string): string | undefined {
  return (
    getMarkdownTableValue(text, "Capabilities") ??
    extractSection(text, "Capabilities")
  );
}

function extractSupportedCapabilities(text: string): string {
  return normalizeListText(text.split(/\bNot supported\b/i)[0] ?? text);
}

function sanitizeHeadingName(heading: string | undefined): string | undefined {
  if (!heading) {
    return undefined;
  }

  const cleaned = heading
    .replace(/\s+Stay organized with collections.*$/i, "")
    .replace(/\s+(?:is|delivers)\b.*$/i, "")
    .trim();

  return cleaned.length > 0 ? cleaned : undefined;
}

function splitDocsPageSections(text: string): Array<{
  heading: string | undefined;
  body: string;
}> {
  const matches = [...text.matchAll(/^\|\s*Model ID\s*\|/gm)];

  if (matches.length === 0) {
    return [];
  }

  return matches.map((match, index) => {
    const start = match.index ?? 0;
    const end = matches[index + 1]?.index ?? text.length;
    const prefix = text.slice(0, start);
    const heading = [...prefix.matchAll(/^#{1,6}\s+(.+)$/gm)]
      .at(-1)?.[1]
      ?.trim();
    return { heading, body: text.slice(start, end) };
  });
}

function parseDocsPageSection(
  text: string,
  heading: string | undefined,
  multipleModels: boolean,
): ModelRecord | undefined {
  const id =
    getMarkdownTableValue(text, "Model ID") ??
    text.match(/^Model ID\s*`([^`]+)`/im)?.[1]?.trim();

  if (!id) {
    return undefined;
  }

  const supportedInputsOutputs =
    getMarkdownTableValue(text, "Supported inputs \\& outputs") ??
    extractSection(text, "Supported inputs & outputs");
  const tokenLimits =
    getMarkdownTableValue(text, "Token limits") ??
    extractSection(text, "Token limits") ??
    extractSection(text, "Limits");
  const capabilitiesText = extractCapabilitiesText(text);
  const supportedCapabilities = capabilitiesText
    ? extractSupportedCapabilities(capabilitiesText)
    : "";
  const input = parseModalities(
    supportedInputsOutputs?.match(/Inputs:\s*(.+?)(?=\s*-\s*Outputs:|$)/i)?.[1],
  );
  const outputModalities = parseModalities(
    supportedInputsOutputs?.match(/Outputs:\s*(.+)$/i)?.[1],
  );
  const context = integerGreaterThanZero(
    parseInteger(
      tokenLimits?.match(
        /(?:Maximum input tokens|Context length):\s*([^|]+)/i,
      )?.[1] ?? "",
    ),
  );
  const output = integerGreaterThanZero(
    parseInteger(
      tokenLimits?.match(
        /(?:Maximum output tokens|Max output):\s*([^|]+)/i,
      )?.[1] ?? "",
    ),
  );
  const releaseDate = text.match(
    /Release date:\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})/i,
  )?.[1];
  const knowledgeCutoff =
    getMarkdownTableValue(text, "Knowledge cutoff date") ??
    text.match(/^Knowledge cutoff date\s+(.+)$/im)?.[1]?.trim();

  return compactObject({
    id,
    name: multipleModels ? undefined : sanitizeHeadingName(heading),
    knowledge_cutoff: timestampFromDateInput(knowledgeCutoff, {
      rejectEpoch: true,
    }),
    release_date: timestampFromDateInput(releaseDate, { rejectEpoch: true }),
    features: compactObject({
      attachment: input ? input.some((entry) => entry !== "text") : undefined,
      reasoning: /\bthinking\b|\breasoning\b|\bextended thinking\b/i.test(
        supportedCapabilities,
      )
        ? true
        : undefined,
      tool_call: /\bfunction calling\b|\btool use\b|\bcomputer use\b/i.test(
        supportedCapabilities,
      )
        ? true
        : undefined,
      structured_output: /\bstructured output\b/i.test(supportedCapabilities)
        ? true
        : undefined,
      temperature: /\bTemperature:\s*/i.test(text) ? true : undefined,
    }),
    limit: compactObject({ context, output }),
    modalities: compactObject({
      input,
      output: outputModalities,
    }),
  });
}

function documentationToText(content: string): string {
  const $ = cheerio.load(`<div>${content.replace(/<br\s*\/?>/gi, "\n")}</div>`);
  return normalizeListText($.text());
}

function extractTableRows(content: string): string[][] {
  const rows: string[][] = [];

  for (const line of content.split("\n")) {
    const trimmed = line.trim();

    if (!trimmed.startsWith("|")) {
      continue;
    }

    const cells = trimmed
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => normalizeListText(cell))
      .filter((cell) => cell.length > 0);

    if (cells.length >= 2 && !cells.every((cell) => /^:?-{2,}:?$/.test(cell))) {
      rows.push(cells);
    }
  }

  const $ = cheerio.load(`<div>${content.replace(/<br\s*\/?>/gi, "\n")}</div>`);

  $("tr").each((_, row) => {
    const cells = $(row)
      .children("th,td")
      .toArray()
      .map((cell) => normalizeListText($(cell).text()))
      .filter((cell) => cell.length > 0);

    if (cells.length >= 2) {
      rows.push(cells);
    }
  });

  return rows;
}

function collectPropertyMap(
  documentations: ApiModel["documentations"],
): Map<string, string> {
  const result = new Map<string, string>();

  for (const documentation of documentations ?? []) {
    for (const row of extractTableRows(documentation.content)) {
      const key = normalizePropertyKey(row[0] ?? "");
      const value = normalizeListText(row.slice(1).join(" | "));

      if (!key || !value || key === "property" || key === "description") {
        continue;
      }

      if (!result.has(key)) {
        result.set(key, value);
      }
    }
  }

  return result;
}

function getProperty(
  propertyMap: Map<string, string>,
  ...labels: string[]
): string | undefined {
  for (const label of labels) {
    const value = propertyMap.get(normalizePropertyKey(label));

    if (value) {
      return value;
    }
  }

  return undefined;
}

function extractReleaseDateFromDocumentations(
  model: ApiModel,
  id: string,
): string | undefined {
  const identifiers = [
    id,
    model.versionExternalName,
    model.versionExternalName?.split("/").at(-1),
  ].filter((value): value is string => Boolean(value));

  for (const documentation of model.documentations ?? []) {
    for (const row of extractTableRows(documentation.content)) {
      const firstCell = normalizeListText(row[0] ?? "");
      const secondCell = normalizeListText(row[1] ?? "");

      if (
        identifiers.some((identifier) => firstCell === identifier) &&
        secondCell.length > 0
      ) {
        return secondCell;
      }
    }

    const text = documentation.content;

    for (const identifier of identifiers) {
      const escaped = identifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const match = text.match(
        new RegExp(
          `${escaped}[\\s\\S]{0,120}?(\\d{4}-\\d{2}-\\d{2}|[A-Za-z]+\\s+\\d{1,2}(?:st|nd|rd|th)?,\\s+\\d{4})`,
          "i",
        ),
      );

      if (match?.[1]) {
        return match[1];
      }
    }
  }

  return undefined;
}

function extractInlinePrices(
  text: string,
): Partial<NonNullable<ModelRecord["pricing"]>> {
  const pricing: Partial<NonNullable<ModelRecord["pricing"]>> = {};
  const patterns = [
    [
      "reasoning",
      /Reasoning(?: token)?(?: output)?\s*:\s*(\$\s*\d+(?:\.\d+)?)/i,
    ],
    [
      "cache_read",
      /(?:Cache Hit|Cache Read|cached input)\s*:\s*(\$\s*\d+(?:\.\d+)?)/i,
    ],
    ["cache_write", /Cache Write\s*:\s*(\$\s*\d+(?:\.\d+)?)/i],
    ["input_audio", /Input audio\s*:\s*(\$\s*\d+(?:\.\d+)?)/i],
    ["output_audio", /Output audio\s*:\s*(\$\s*\d+(?:\.\d+)?)/i],
    ["input", /(?:^|\b)Input\s*:\s*(\$\s*\d+(?:\.\d+)?)/i],
    ["output", /(?:^|\b)Output\s*:\s*(\$\s*\d+(?:\.\d+)?)/i],
  ] as const;

  for (const [field, pattern] of patterns) {
    const value = parseCurrency(text.match(pattern)?.[1] ?? "");

    if (value !== undefined) {
      pricing[field] = value;
    }
  }

  return pricing;
}

function looksLikeModelName(text: string): boolean {
  return (
    /[A-Za-z]/.test(text) &&
    !/^Input\b|^Output\b|^Batch\b|^Grounding\b|^Web Grounding\b|^Context Cache\b|^Region\b|^Modality\b|^Usage type\b/i.test(
      text,
    ) &&
    !/^\$/.test(text)
  );
}

function parsePricingRows(html: string): Map<string, ModelRecord["pricing"]> {
  const $ = cheerio.load(html);
  const result = new Map<string, ModelRecord["pricing"]>();
  let currentModelName: string | undefined;

  $("table tr").each((_, row) => {
    const cells = $(row)
      .children("td,th")
      .toArray()
      .map((cell) => {
        const fragment = cheerio.load(
          `<div>${($(cell).html() ?? "").replace(/<br\s*\/?>/gi, "\n")}</div>`,
        );

        return normalizeWhitespace(fragment.text().replace(/\u00a0/g, " "));
      })
      .filter((cell) => cell.length > 0);

    if (cells.length === 0) {
      return;
    }

    const firstCell = $(row).children("td,th").first();
    let rowCells = cells;

    if (firstCell.is("td") && looksLikeModelName(cells[0] ?? "")) {
      currentModelName = normalizePriceName(cells[0] ?? "");
      rowCells = cells.slice(1);
    }

    if (!currentModelName || rowCells.length === 0) {
      return;
    }

    const joined = rowCells.join(" | ");
    const existing = {
      ...(result.get(normalizePriceKey(currentModelName)) ?? {}),
    };
    const inline = extractInlinePrices(joined);

    Object.assign(existing, inline);

    if (Object.keys(inline).length === 0) {
      const firstCurrency = parseCurrency(joined);
      const label = rowCells[0]?.toLowerCase() ?? "";

      if (firstCurrency !== undefined) {
        if (/reasoning/.test(label)) {
          existing.reasoning ??= firstCurrency;
        } else if (/cache hit|cached input|cache read/.test(label)) {
          existing.cache_read ??= firstCurrency;
        } else if (/cache write/.test(label)) {
          existing.cache_write ??= firstCurrency;
        } else if (
          /^1m input audio tokens$|^input audio\b|^audio input\b/.test(label)
        ) {
          existing.input_audio ??= firstCurrency;
        } else if (
          /^1m output audio tokens$|^output audio\b|^audio output\b/.test(label)
        ) {
          existing.output_audio ??= firstCurrency;
        } else if (
          /^input \(/.test(label) ||
          /^1m input tokens$/.test(label) ||
          /^input text\b/.test(label) ||
          /^input\b/.test(label)
        ) {
          existing.input ??= firstCurrency;
        } else if (
          /^output \(/.test(label) ||
          /^1m output tokens$/.test(label) ||
          /^output text\b/.test(label) ||
          /^output\b/.test(label)
        ) {
          existing.output ??= firstCurrency;
        }
      }
    }

    const compact = compactObject(existing) as ModelRecord["pricing"];
    const modelKey = normalizePriceKey(currentModelName);

    if (Object.keys(compact ?? {}).length > 0 && !result.has(modelKey)) {
      result.set(modelKey, compact);
    }
  });

  return result;
}

function buildPricingAliases(
  model: ApiModel,
  resolvedId: string,
  name: string,
): string[] {
  const aliases = new Set<string>([
    name,
    model.displayName ?? "",
    resolvedId,
    idToDisplayName(resolvedId),
    model.versionExternalName ?? "",
    model.versionExternalName?.split("/").at(-1) ?? "",
  ]);

  if (/flash-lite/i.test(name) || /flash-lite/i.test(resolvedId)) {
    aliases.add(name.replace(/flash-lite/gi, "Flash Lite"));
  }

  if (/^gemini-live-2\.5-flash/i.test(resolvedId)) {
    aliases.add("Gemini 2.5 Flash Live API");
  }

  if (/^gemini-embedding-2/i.test(resolvedId)) {
    aliases.add("Gemini Embedding 2");
    aliases.add("Gemini Embedding 2 Preview");
  }

  if (/gpt-oss/i.test(resolvedId)) {
    aliases.add("OpenAI gpt-oss 120B");
    aliases.add("OpenAI gpt-oss 20B");
  }

  return [...aliases]
    .map(normalizePriceName)
    .filter((alias) => alias.length > 0);
}

function fallbackDocsPageUrl(id: string): string | undefined {
  if (/^gemini-live-2\.5-flash/i.test(id)) {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-live-api";
  }

  if (/^gemini-2\.5-pro/.test(id)) {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro";
  }

  if (/^gemini-2\.5-flash-lite/.test(id)) {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-lite";
  }

  if (/^gemini-2\.5-flash-image/.test(id)) {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-image";
  }

  if (/^gemini-2\.5-flash/.test(id)) {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash";
  }

  if (/^gemini-2\.0-flash-lite/.test(id)) {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash-lite";
  }

  if (/^gemini-2\.0-flash/.test(id)) {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash";
  }

  if (/^gemini-3\.1-pro/.test(id)) {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-1-pro";
  }

  if (/^gemini-3-pro-image/.test(id)) {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-pro-image";
  }

  if (/^gemini-3-pro/.test(id)) {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-pro";
  }

  if (/^gemini-3\.1-flash-image/.test(id)) {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-1-flash-image";
  }

  if (/^gemini-3\.1-flash-lite/.test(id)) {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-1-flash-lite";
  }

  if (/^gemini-3-flash/.test(id)) {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-flash";
  }

  if (/^gemini-embedding-2/.test(id)) {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/embedding-2";
  }

  if (id === "gpt-oss-120b-maas") {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/maas/openai/gpt-oss-120b";
  }

  if (id === "gpt-oss-20b-maas") {
    return "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/maas/openai/gpt-oss-20b";
  }

  return undefined;
}

async function fetchFoundationModels(): Promise<ApiModel[]> {
  const response = await fetchJson(foundationModelsUrl, {
    schema: foundationModelsResponseSchema,
    headers: {
      "content-type": "application/json",
      referer: "https://console.cloud.google.com/",
    },
    init: {
      method: "POST",
      body: JSON.stringify(foundationModelsBody),
    },
    label: "Google Vertex API error",
  });

  return (
    response[0]?.results[0]?.data.ui.listPublisherModel.data.filter((model) =>
      model.categories.includes("FOUNDATION"),
    ) ?? []
  );
}

async function fetchPricing(): Promise<Map<string, ModelRecord["pricing"]>> {
  try {
    const html = await fetchText(pricingUrl, {
      init: { redirect: "follow" },
      label: "Google Vertex pricing error",
    });

    return parsePricingRows(html);
  } catch {
    return new Map();
  }
}

async function fetchDocsPageModel(
  id: string,
): Promise<ModelRecord | undefined> {
  const url = fallbackDocsPageUrl(id);

  if (!url) {
    return undefined;
  }

  try {
    const text = await fetchText(`${url}.md.txt`, {
      init: { redirect: "follow" },
      label: "Google Vertex model docs error",
    });

    return (
      splitDocsPageSections(text)
        .map((section, index, sections) =>
          parseDocsPageSection(
            section.body,
            section.heading,
            sections.length > 1,
          ),
        )
        .find((model): model is ModelRecord => model?.id === id) ??
      splitDocsPageSections(text)
        .map((section, index, sections) =>
          parseDocsPageSection(
            section.body,
            section.heading,
            sections.length > 1,
          ),
        )
        .find((model): model is ModelRecord => model !== undefined)
    );
  } catch {
    return undefined;
  }
}

function deriveApiModel(model: ApiModel): ModelRecord {
  const id = modelIdFromName(model.name);
  const propertyMap = collectPropertyMap(model.documentations);
  const documentationText = normalizeListText(
    (model.documentations ?? [])
      .map(
        (documentation) =>
          `${documentation.title}\n${documentationToText(documentation.content)}`,
      )
      .join("\n\n"),
  );
  const supportedDataTypes = getProperty(
    propertyMap,
    "Supported Data Types",
    "Supported inputs & outputs",
  );
  const tokenLimits = getProperty(propertyMap, "Token Limits");
  const input =
    parseModalities(
      supportedDataTypes?.match(
        /Inputs?:\s*(.+?)(?=Output:|Outputs?:|$)/i,
      )?.[1],
    ) ?? coarseModalitiesFromTypes(model.inputTypes);
  const output =
    parseModalities(supportedDataTypes?.match(/Outputs?:\s*(.+)$/i)?.[1]) ??
    coarseModalitiesFromTypes(model.outputTypes);
  const modalities = refineModalities(model, supportedDataTypes, input, output);
  const tokenLimitSource = hasExplicitTokenLimitSource(tokenLimits)
    ? tokenLimits
    : hasExplicitTokenLimitSource(documentationText)
      ? documentationText
      : undefined;
  const context = extractTokenLimit(tokenLimitSource, [
    /(?:Maximum input tokens|Input token limit|Context length):\s*([^|\n]+)/i,
  ]);
  const maxOutput = extractTokenLimit(tokenLimitSource, [
    /(?:Maximum output tokens|Output token limit|Max output):\s*([^|\n]+)/i,
  ]);
  const releaseDate = extractReleaseDateFromDocumentations(model, id);
  const knowledgeCutoff =
    getProperty(propertyMap, "Knowledge cutoff date") ??
    documentationText.match(/Knowledge cutoff date\s+([^\n]+)/i)?.[1]?.trim();
  const supportedCapabilities =
    documentationText.split(/\bnot supported\b/i)[0] ?? documentationText;
  const attachment =
    modalities.input?.some((entry) => entry !== "text") ??
    Boolean(
      model.inputTypes?.some((entry) =>
        ["VISION", "VIDEO", "DOCS", "MULTIMODAL", "DIALOGUE"].includes(entry),
      ),
    );
  const openWeights =
    /OSS/.test(model.openSourceCategory ?? "") ||
    /open-weight|open weight|apache 2\.0|open source/i.test(documentationText);

  return compactObject({
    id,
    name: model.displayName?.trim() || idToDisplayName(id),
    knowledge_cutoff: timestampFromDateInput(knowledgeCutoff, {
      rejectEpoch: true,
    }),
    release_date:
      timestampFromDateInput(releaseDate, { rejectEpoch: true }) ??
      timestampFromDateInput(model.createTime, { rejectEpoch: true }),
    last_updated: timestampFromDateInput(model.updateTime, {
      rejectEpoch: true,
    }),
    open_weights: openWeights ? true : undefined,
    features: compactObject({
      attachment,
      reasoning: /\bthinking\b|\breasoning\b|\bextended thinking\b/i.test(
        supportedCapabilities,
      )
        ? true
        : undefined,
      tool_call:
        /\bfunction calling\b|\btool use\b|\bcomputer use\b|\btool orchestration\b/i.test(
          supportedCapabilities,
        )
          ? true
          : undefined,
      structured_output: /\bstructured output\b/i.test(supportedCapabilities)
        ? true
        : undefined,
      temperature: /\btemperature\b/i.test(documentationText)
        ? true
        : undefined,
    }),
    limit: compactObject({
      context,
      output: maxOutput,
    }),
    modalities: compactObject(modalities),
  });
}

export const googleVertexProvider: ProviderDefinition = {
  name: "google-vertex",
  outputDirectory: "data/providers/google-vertex/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 2);

    const [apiModels, pricing] = await Promise.all([
      fetchFoundationModels(),
      fetchPricing(),
    ]);

    progress?.tick(`${foundationModelsUrl} (${apiModels.length})`, true);
    progress?.tick(`${pricingUrl} (${pricing.size})`, true);

    progress?.beginPhase("enriching", apiModels.length);

    const models = await mapWithConcurrency(apiModels, 8, async (apiModel) => {
      const id = modelIdFromName(apiModel.name);
      const apiRecord = deriveApiModel(apiModel);
      const docsRecord = await fetchDocsPageModel(id);
      const name =
        apiRecord.name ?? apiModel.displayName ?? docsRecord?.name ?? id;
      const pricingRecord = buildPricingAliases(apiModel, id, name)
        .map((alias) => pricing.get(normalizePriceKey(alias)))
        .find((value) => value !== undefined);

      progress?.tick(id, true);

      return compactObject({
        id,
        name,
        knowledge_cutoff:
          docsRecord?.knowledge_cutoff ?? apiRecord.knowledge_cutoff,
        release_date: docsRecord?.release_date ?? apiRecord.release_date,
        last_updated: apiRecord.last_updated,
        open_weights: docsRecord?.open_weights ?? apiRecord.open_weights,
        features: compactObject({
          ...(apiRecord.features ?? {}),
          ...(docsRecord?.features ?? {}),
        }),
        limit: compactObject({
          ...(apiRecord.limit ?? {}),
          ...(docsRecord?.limit ?? {}),
        }),
        modalities: compactObject({
          input: apiRecord.modalities?.input ?? docsRecord?.modalities?.input,
          output:
            apiRecord.modalities?.output ?? docsRecord?.modalities?.output,
        }),
        pricing: pricingRecord,
      }) as ModelRecord;
    });

    return models;
  },
};
