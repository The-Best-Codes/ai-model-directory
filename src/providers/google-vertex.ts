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

const billingHeaders = { referer: "https://console.cloud.google.com" };

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

const serviceSchema = z.object({
  serviceId: z.string(),
  displayName: z.string(),
});

const servicesResponseSchema = z.object({
  services: z.array(serviceSchema).optional(),
  nextPageToken: z.string().optional(),
});

const skuSchema = z.object({
  skuId: z.string(),
  displayName: z.string(),
});

const skusResponseSchema = z.object({
  skus: z.array(skuSchema).optional(),
  nextPageToken: z.string().optional(),
});

const priceSchema = z.object({
  rate: z
    .object({
      tiers: z.array(
        z.object({
          listPrice: z
            .object({
              units: z.string().optional(),
              nanos: z.number().optional(),
            })
            .optional(),
        }),
      ),
      unitInfo: z
        .object({
          unitQuantity: z.object({ value: z.string() }),
        })
        .optional(),
    })
    .optional(),
});

type SkuInfo = z.infer<typeof skuSchema>;

type PricingField =
  | "input"
  | "output"
  | "reasoning"
  | "cache_read"
  | "cache_write"
  | "input_audio"
  | "output_audio";

const allModalities: readonly ModelModality[] = [
  "text",
  "image",
  "audio",
  "video",
  "file",
];

const skuPatterns: ReadonlyArray<{ pattern: RegExp; field: PricingField }> = [
  {
    pattern:
      /^(.+?)\s+Thinking\s+Text\s+Output(?:\s+\([^)]*\))?\s+-\s+Predictions$/i,
    field: "reasoning",
  },
  {
    pattern:
      /^(.+?)\s+Reasoning\s+Text\s+Output(?:\s+\([^)]*\))?\s+-\s+Predictions$/i,
    field: "reasoning",
  },
  {
    pattern: /^(.+?)\s+Text\s+Input\s+-\s+Predictions$/i,
    field: "input",
  },
  {
    pattern: /^(.+?)\s+Text\s+Output(?:\s+\([^)]*\))?\s+-\s+Predictions$/i,
    field: "output",
  },
  {
    pattern: /^(.+?)\s+Input\s+Text\s+Caching$/i,
    field: "cache_read",
  },
  {
    pattern: /^(.+?)\s+Cached\s+Text\s+Input\s+Tokens?$/i,
    field: "cache_read",
  },
  {
    pattern: /^(.+?)\s+Input\s+Text\s+Caching\s+Storage$/i,
    field: "cache_write",
  },
  {
    pattern: /^(.+?)\s+Text\s+Input\s+Cache\s+Storage\s+-\s+Predictions$/i,
    field: "cache_write",
  },
  {
    pattern:
      /^(.+?)\s+(?:Text|Image|Audio|Video)\s+Input\s+Cach(?:e|ing)\s+Storage(?:\s+-\s+Predictions)?$/i,
    field: "cache_write",
  },
  {
    pattern:
      /^(.+?)\s+Input\s+(?:Text|Image|Audio|Video)\s+Cach(?:e|ing)\s+Storage$/i,
    field: "cache_write",
  },
  {
    pattern: /^(.+?)\s+Audio\s+Input\s+-\s+Predictions$/i,
    field: "input_audio",
  },
  {
    pattern: /^(.+?)\s+Audio\s+Output\s+-\s+Predictions$/i,
    field: "output_audio",
  },
  {
    pattern: /^(.+?)\s+Input\s+Tokens?$/i,
    field: "input",
  },
  {
    pattern: /^(.+?)\s+Output\s+Tokens?$/i,
    field: "output",
  },
];

const maasPrefix =
  /^Cloud\s+Vertex\s+AI\s+Model\s+Garden\s+Model\s+as\s+a\s+Service\s+/i;

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

function modelIdFromName(name: string): string {
  return name.split("/").at(-1) ?? name;
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

function modalitiesFromTypes(
  values: string[] | null | undefined,
): ModelModality[] | undefined {
  if (!values || values.length === 0) {
    return undefined;
  }

  const result = new Set<ModelModality>();

  for (const value of values) {
    switch (value.toUpperCase()) {
      case "LANGUAGE":
      case "TEXT":
        result.add("text");
        break;
      case "VISION":
      case "IMAGE":
        result.add("image");
        break;
      case "VIDEO":
        result.add("video");
        break;
      case "DOCS":
      case "FILE":
        result.add("file");
        break;
      case "DIALOGUE":
      case "AUDIO":
        result.add("audio");
        break;
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

function hasTokenLimitSource(text: string | undefined): boolean {
  if (!text) {
    return false;
  }

  return /maximum input tokens|input token limit|context length|maximum output tokens|output token limit|max output|\binputs?:\s*\d|\boutputs?:\s*\d/i.test(
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
    supportedInputsOutputs?.match(/Outputs?:\s*(.+)$/i)?.[1],
  );
  const context = extractTokenLimit(tokenLimits, [
    /(?:Maximum input tokens|Input token limit|Context length):\s*([^|]+)/i,
    /Inputs?:\s*([^|]+)/i,
  ]);
  const output = extractTokenLimit(tokenLimits, [
    /(?:Maximum output tokens|Max output|Output token limit):\s*([^|]+)/i,
    /Outputs?:\s*([^|]+)/i,
  ]);
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
      tool_call:
        /\bfunction calling\b|\btool use\b|\bcomputer use\b|\btool orchestration\b/i.test(
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
    model.versionExternalName?.split("@").at(0),
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
    ["cache_write", /(?:5m\s+)?Cache Write\s*:\s*(\$\s*\d+(?:\.\d+)?)/i],
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

    if (Object.keys(compact ?? {}).length > 0) {
      result.set(modelKey, compact);
    }
  });

  return result;
}

function normalizeKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/\bga\b/g, " ")
    .replace(/\b(global|regional)\b/g, " ")
    .replace(/\b(openai)\b/g, " ")
    .replace(/(\d+)\.0\b/g, "$1")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function modelKeys(model: ApiModel): string[] {
  const id = modelIdFromName(model.name);
  const stripped = id
    .replace(/-maas$/i, "")
    .replace(/-preview(?:-.*)?$/i, "")
    .replace(/-experimental$/i, "");
  const versionExternalName = model.versionExternalName
    ?.split("/")
    .at(-1)
    ?.replace(/@.*$/, "");

  const candidates = new Set<string>([
    stripped,
    stripped.replace(/-instruct$/i, ""),
    stripped.replace(/-it$/i, ""),
    idToDisplayName(stripped),
  ]);

  if (model.displayName) {
    candidates.add(model.displayName);
  }

  if (versionExternalName) {
    candidates.add(versionExternalName);
  }

  return [...candidates].map(normalizeKey).filter((entry) => entry.length > 0);
}

function classifySku(sku: SkuInfo):
  | {
      field: PricingField;
      key: string;
    }
  | undefined {
  const cleaned = sku.displayName.trim().replace(maasPrefix, "");

  for (const { pattern, field } of skuPatterns) {
    const match = cleaned.match(pattern);

    if (match?.[1]) {
      return { field, key: normalizeKey(match[1]) };
    }
  }

  return undefined;
}

function buildPricingAliases(
  model: ApiModel,
  resolvedId: string,
  name: string,
): string[] {
  const versionExternalName =
    model.versionExternalName?.split("/").at(-1) ?? "";
  const versionAlias = versionExternalName.replace(/@.*$/, "");
  const aliases = new Set<string>([
    name,
    model.displayName ?? "",
    resolvedId,
    resolvedId.replace(/-maas$/i, ""),
    idToDisplayName(resolvedId),
    idToDisplayName(resolvedId.replace(/-maas$/i, "")),
    model.versionExternalName ?? "",
    versionExternalName,
    versionAlias,
  ]);

  if (/flash-lite/i.test(name) || /flash-lite/i.test(resolvedId)) {
    aliases.add(name.replace(/flash-lite/gi, "Flash Lite"));
  }

  if (/^gemini-live-2\.5-flash/i.test(resolvedId)) {
    aliases.add("Gemini 2.5 Flash Live API");
  }

  if (/^gemini-embedding-2/.test(resolvedId)) {
    aliases.add("Gemini Embedding 2");
    aliases.add("Gemini Embedding 2 Preview");
  }

  if (/gpt-oss/i.test(resolvedId)) {
    aliases.add("gpt-oss-120b");
    aliases.add("gpt-oss-20b");
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

async function fetchVertexServiceId(): Promise<string> {
  let pageToken: string | undefined;

  while (true) {
    const url = new URL("https://cloudbilling.googleapis.com/v2beta/services");
    url.searchParams.set("key", apiKey ?? "");
    url.searchParams.set("pageSize", "100");

    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    const response = await fetchJson(url, {
      schema: servicesResponseSchema,
      headers: billingHeaders,
      label: "Google Vertex billing services error",
    });

    const match = response.services?.find(
      (service) => service.displayName === "Vertex AI",
    );

    if (match) {
      return match.serviceId;
    }

    if (!response.nextPageToken) {
      throw new Error("Vertex AI service not found in Cloud Billing catalog");
    }

    pageToken = response.nextPageToken;
  }
}

async function fetchVertexSkus(serviceId: string): Promise<SkuInfo[]> {
  const result: SkuInfo[] = [];
  let pageToken: string | undefined;

  while (true) {
    const url = new URL("https://cloudbilling.googleapis.com/v2beta/skus");
    url.searchParams.set("key", apiKey ?? "");
    url.searchParams.set("pageSize", "5000");
    url.searchParams.set("filter", `service="services/${serviceId}"`);

    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    const response = await fetchJson(url, {
      schema: skusResponseSchema,
      headers: billingHeaders,
      label: "Google Vertex billing skus error",
    });

    if (response.skus) {
      result.push(...response.skus);
    }

    if (!response.nextPageToken) {
      return result;
    }

    pageToken = response.nextPageToken;
  }
}

async function fetchSkuPricePerMillion(
  skuId: string,
): Promise<number | undefined> {
  const url = `https://cloudbilling.googleapis.com/v1beta/skus/${skuId}/price?key=${apiKey}&currencyCode=USD`;

  try {
    const response = await fetchJson(url, {
      schema: priceSchema,
      headers: billingHeaders,
      label: "Google Vertex sku price error",
    });

    const tier = response.rate?.tiers[0]?.listPrice;
    const quantityValue = response.rate?.unitInfo?.unitQuantity?.value;

    if (!tier || !quantityValue) {
      return undefined;
    }

    const dollars = Number(tier.units ?? "0") + (tier.nanos ?? 0) / 1e9;
    const quantity = Number(quantityValue);

    if (
      !Number.isFinite(dollars) ||
      !Number.isFinite(quantity) ||
      quantity <= 0
    ) {
      return undefined;
    }

    const perMillion = (dollars / quantity) * 1_000_000;
    return Number.isFinite(perMillion) && perMillion >= 0
      ? perMillion
      : undefined;
  } catch {
    return undefined;
  }
}

async function fetchPricingFallback(): Promise<
  Map<string, ModelRecord["pricing"]>
> {
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

function indexSkus(skus: SkuInfo[]): Map<string, Map<PricingField, string>> {
  const index = new Map<string, Map<PricingField, string>>();

  for (const sku of skus) {
    const classified = classifySku(sku);

    if (!classified) {
      continue;
    }

    const fieldsForKey =
      index.get(classified.key) ?? new Map<PricingField, string>();

    if (!fieldsForKey.has(classified.field)) {
      fieldsForKey.set(classified.field, sku.skuId);
      index.set(classified.key, fieldsForKey);
    }
  }

  return index;
}

function lookupSkuIdsForModel(
  model: ApiModel,
  index: Map<string, Map<PricingField, string>>,
): Map<PricingField, string> {
  const result = new Map<PricingField, string>();

  for (const key of modelKeys(model)) {
    const fields = index.get(key);

    if (!fields) {
      continue;
    }

    for (const [field, skuId] of fields) {
      if (!result.has(field)) {
        result.set(field, skuId);
      }
    }
  }

  return result;
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
    ) ?? modalitiesFromTypes(model.inputTypes);
  const output =
    parseModalities(supportedDataTypes?.match(/Outputs?:\s*(.+)$/i)?.[1]) ??
    modalitiesFromTypes(model.outputTypes);
  const modalities = refineModalities(model, supportedDataTypes, input, output);
  const tokenLimitSource = hasTokenLimitSource(tokenLimits)
    ? tokenLimits
    : hasTokenLimitSource(documentationText)
      ? documentationText
      : (tokenLimits ?? documentationText);
  const context = extractTokenLimit(tokenLimitSource, [
    /(?:Maximum input tokens|Input token limit|Context length):\s*([^|\n]+)/i,
    /Inputs?:\s*([^|\n]+)/i,
  ]);
  const maxOutput = extractTokenLimit(tokenLimitSource, [
    /(?:Maximum output tokens|Output token limit|Max output):\s*([^|\n]+)/i,
    /Outputs?:\s*([^|\n]+)/i,
    /Output:\s*([^|\n]+)/i,
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
    if (!apiKey) {
      throw new Error("GOOGLE_VERTEX_TOKEN is not set");
    }

    progress?.beginPhase("fetching", 3);

    const apiModels = await fetchFoundationModels();
    progress?.tick(`foundation models (${apiModels.length})`, true);

    const serviceId = await fetchVertexServiceId();
    progress?.tick(`vertex service ${serviceId}`, true);

    const skus = await fetchVertexSkus(serviceId);
    progress?.tick(`vertex skus (${skus.length})`, true);

    const skuIndex = indexSkus(skus);
    const modelSkuIds: Array<Map<PricingField, string>> = apiModels.map(
      (model) => lookupSkuIdsForModel(model, skuIndex),
    );
    const uniqueSkuIds = [
      ...new Set(modelSkuIds.flatMap((skuIds) => [...skuIds.values()])),
    ];

    progress?.beginPhase("pricing", uniqueSkuIds.length);

    const priceMap = new Map<string, number>();

    await mapWithConcurrency(uniqueSkuIds, 8, async (skuId) => {
      const price = await fetchSkuPricePerMillion(skuId);

      if (price !== undefined) {
        priceMap.set(skuId, price);
      }

      progress?.tick(skuId, price !== undefined);
    });

    let pricingFallbackPromise:
      | Promise<Map<string, ModelRecord["pricing"]>>
      | undefined;

    progress?.beginPhase("enriching", apiModels.length);

    return mapWithConcurrency(apiModels, 8, async (apiModel, index) => {
      const id = modelIdFromName(apiModel.name);
      const apiRecord = deriveApiModel(apiModel);
      const docsRecord = await fetchDocsPageModel(id);
      const name =
        apiRecord.name ?? apiModel.displayName ?? docsRecord?.name ?? id;
      const skuIds = modelSkuIds[index] ?? new Map<PricingField, string>();
      const billingPricing = {} as Partial<NonNullable<ModelRecord["pricing"]>>;

      for (const [field, skuId] of skuIds) {
        const price = priceMap.get(skuId);

        if (price !== undefined) {
          billingPricing[field] = price;
        }
      }

      const needsPricingFallback =
        Object.keys(billingPricing).length === 0 ||
        billingPricing.cache_write === undefined;

      const pricingFallback = needsPricingFallback
        ? await (pricingFallbackPromise ??= fetchPricingFallback())
        : undefined;
      const fallbackPricing = pricingFallback
        ? buildPricingAliases(apiModel, id, name)
            .map((alias) => pricingFallback.get(normalizePriceKey(alias)))
            .find((value) => value !== undefined)
        : undefined;
      const pricing = compactObject({
        ...(fallbackPricing ?? {}),
        ...billingPricing,
      }) as ModelRecord["pricing"] | undefined;

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
        pricing,
      }) as ModelRecord;
    });
  },
};
