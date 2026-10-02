import * as cheerio from "cheerio";
import Decimal from "decimal.js";
import { mapWithConcurrency } from "../lib/async.ts";
import { documentationTimestamp } from "../lib/docs.ts";
import { z } from "zod";

import { fetchJson, fetchText, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  normalizeModelId,
  nonNegativeNumber,
} from "../lib/model.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiCapabilitiesSchema = z.object({
  completion_chat: z.boolean(),
  function_calling: z.boolean(),
  reasoning: z.boolean(),
  completion_fim: z.boolean(),
  fine_tuning: z.boolean(),
  vision: z.boolean(),
  ocr: z.boolean(),
  classification: z.boolean(),
  moderation: z.boolean(),
  audio: z.boolean(),
  audio_transcription: z.boolean(),
  audio_transcription_realtime: z.boolean(),
  audio_speech: z.boolean(),
});

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  name: z.string(),
  aliases: z.array(z.string()),
  max_context_length: z.number().nullable().optional(),
  default_model_temperature: z.number().nullable().optional(),
  capabilities: apiCapabilitiesSchema,
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

type PricingMetadata = Omit<ModelRecord, "id">;

type PricingCard = {
  name: string;
  url?: string;
  open_weights?: boolean;
  pricing?: ModelRecord["pricing"];
};

export function parsePricingPage(html: string): PricingCard[] {
  const $ = cheerio.load(html);
  const cards: PricingCard[] = [];
  $(".model-item[data-name]").each((_, element) => {
    const card = $(element);
    const name = card.find(".text-h5").first().text().trim();
    if (!name) return;
    const pricing: NonNullable<ModelRecord["pricing"]> = {};
    card.find("mistral-atom-text-price[data-prices]").each((_, node) => {
      const label = $(node).prev().text().trim();
      if (!/^(Input|Output) \(\/M tokens\)$/.test(label)) return;
      try {
        const value = nonNegativeNumber(
          z
            .object({ priceUsd: z.number() })
            .parse(JSON.parse($(node).attr("data-prices") ?? "")).priceUsd,
        );
        if (label.startsWith("Input")) {
          pricing.input = value;
          if (
            value !== undefined &&
            JSON.parse($(node).attr("data-discounts") ?? "[]").includes("cache")
          )
            pricing.cache_read = new Decimal(value).mul("0.1").toNumber();
        } else pricing.output = value;
      } catch {}
    });
    const licence = card.attr("data-licence");
    cards.push({
      name,
      url: card
        .find('a[href^="https://docs.mistral.ai/models/"]')
        .first()
        .attr("href"),
      open_weights:
        licence &&
        ["open", "apache-20", "modified-mit", "cc-by-nc-40"].includes(licence)
          ? true
          : undefined,
      pricing: Object.keys(pricing).length ? pricing : undefined,
    });
  });
  return cards;
}

export function parseModelPage(html: string): Map<string, PricingMetadata> {
  const $ = cheerio.load(html);
  const result = new Map<string, PricingMetadata>();
  const main = $("main");
  if (!main.find("h1").length) return result;
  let names: string[] = [];
  for (const script of $("script").toArray()) {
    const text = $(script).text();
    const payload = text.match(
      /self\.__next_f\.push\(\[1,("[\s\S]*")\]\)/,
    )?.[1];
    if (!payload) continue;
    try {
      const decoded = JSON.parse(payload) as string;
      const matches = decoded.match(/"names":(\[[^\]]+\])/);
      if (matches?.[1]) {
        names = z.array(z.string()).parse(JSON.parse(matches[1]));
        break;
      }
    } catch {}
  }
  if (!names.length) return result;
  const release = main
    .find("span")
    .toArray()
    .map((node) => $(node).clone().children().remove().end().text().trim())
    .find((value) => /^[A-Z][a-z]+ \d{1,2}, \d{4}$/.test(value));
  const featureLabels = main
    .find('span[class*="LinkItem_title"]')
    .toArray()
    .filter((node) => $(node).parent().text().includes("/v1/chat/completions"))
    .map((node) => $(node).text().trim());
  const details = compactObject({
    release_date: documentationTimestamp(release),
    features: compactObject({
      structured_output: featureLabels.includes("Structured Outputs")
        ? true
        : undefined,
      tool_call: featureLabels.includes("Function Calling") ? true : undefined,
    }),
  });
  for (const name of names) result.set(name, details);
  return result;
}

async function fetchPricing(): Promise<Map<string, PricingMetadata>> {
  try {
    const html = await fetchText("https://mistral.ai/pricing/api/", {
      label: "Mistral pricing page error",
    });
    const cards = parsePricingPage(html);
    const result = new Map<string, PricingMetadata>();
    const details = await mapWithConcurrency(cards, 4, async (card) => {
      try {
        return card.url
          ? parseModelPage(
              await fetchText(card.url, { label: "Mistral model docs error" }),
            )
          : new Map<string, PricingMetadata>();
      } catch {
        return new Map<string, PricingMetadata>();
      }
    });
    for (let index = 0; index < cards.length; index += 1) {
      const card = cards[index]!;
      const metadata = compactObject({
        name: card.name,
        open_weights: card.open_weights,
        pricing: card.pricing,
      });
      result.set(card.name, metadata);
      for (const [id, detail] of details[index] ?? [])
        result.set(id, { ...metadata, ...detail });
    }
    return result;
  } catch {
    return new Map();
  }
}

function pickPricingMetadata(
  model: z.infer<typeof apiModelSchema>,
  pricing: Map<string, PricingMetadata>,
): PricingMetadata | undefined {
  const exact = pricing.get(model.id);

  if (exact) {
    return exact;
  }

  for (const key of model.aliases) {
    const match = pricing.get(key);

    if (match) {
      return match;
    }
  }

  return pricing.get(model.name);
}

function orderedModalities(
  values: Set<ModelModality>,
): ModelModality[] | undefined {
  if (values.size === 0) {
    return undefined;
  }

  return ["text", "image", "audio", "video", "file"].filter(
    (entry): entry is ModelModality => values.has(entry as ModelModality),
  );
}

function buildModalities(
  model: z.infer<typeof apiModelSchema>,
): ModelRecord["modalities"] | undefined {
  const input = new Set<ModelModality>();
  const output = new Set<ModelModality>();
  const { capabilities } = model;
  const lowerId = model.id.toLowerCase();

  if (
    capabilities.completion_chat ||
    capabilities.function_calling ||
    capabilities.reasoning ||
    capabilities.completion_fim ||
    capabilities.classification ||
    capabilities.moderation ||
    lowerId.includes("embed")
  ) {
    input.add("text");
  }

  if (
    capabilities.completion_chat ||
    capabilities.function_calling ||
    capabilities.reasoning ||
    capabilities.completion_fim ||
    capabilities.classification ||
    capabilities.moderation
  ) {
    output.add("text");
  }

  if (capabilities.vision) {
    input.add("image");
  }

  if (capabilities.ocr || lowerId.includes("ocr")) {
    input.add("image");
    input.add("file");
    output.add("text");
  }

  if (
    capabilities.audio ||
    capabilities.audio_transcription ||
    capabilities.audio_transcription_realtime
  ) {
    input.add("audio");
  }

  if (capabilities.audio_speech) {
    input.add("text");
    output.add("audio");
  }

  if (
    capabilities.audio_transcription ||
    capabilities.audio_transcription_realtime
  ) {
    output.add("text");
  }

  return compactObject({
    input: orderedModalities(input),
    output: orderedModalities(output),
  });
}

function dedupeModels(models: ModelRecord[]): ModelRecord[] {
  const uniqueById = new Map<string, ModelRecord>();

  for (const model of models) {
    uniqueById.set(model.id, model);
  }

  const byDirectory = new Map<string, ModelRecord>();

  for (const model of uniqueById.values()) {
    const directoryName = normalizeModelId(model.id);
    const existing = byDirectory.get(directoryName);

    if (!existing) {
      byDirectory.set(directoryName, model);
      continue;
    }

    const existingIsNormalized = existing.id === directoryName;
    const currentIsNormalized = model.id === directoryName;

    if (!existingIsNormalized && currentIsNormalized) {
      byDirectory.set(directoryName, model);
    }
  }

  return [...byDirectory.values()];
}

export const mistralProvider: ProviderDefinition = {
  name: "mistral",
  outputDirectory: "data/providers/mistral/models",
  async fetchModels(progress) {
    const apiKey = process.env.MISTRAL_API_KEY;

    if (!apiKey) {
      throw new Error("MISTRAL_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 2);

    const [response, pricing] = await Promise.all([
      fetchJson("https://api.mistral.ai/v1/models", {
        schema: responseSchema,
        headers: withBearerToken(apiKey),
        label: "Mistral API error",
      }),
      fetchPricing(),
    ]);

    progress?.tick(`api.mistral.ai/v1/models (${response.data.length})`, true);
    progress?.tick(`mistral.ai/pricing (${pricing.size})`, true);

    const models = response.data.map((model) => {
      const metadata = pickPricingMetadata(model, pricing);
      const modalities = buildModalities(model);
      const hasAttachments =
        modalities?.input?.some((modality) => modality !== "text") ?? false;

      return compactObject({
        id: model.id,
        name: metadata?.name ?? model.name,
        open_weights: metadata?.open_weights,
        release_date: metadata?.release_date,
        features: compactObject({
          ...metadata?.features,
          attachment: hasAttachments,
          reasoning: model.capabilities.reasoning,
          tool_call: model.capabilities.function_calling,
          temperature:
            model.default_model_temperature !== null &&
            model.default_model_temperature !== undefined,
        }),
        pricing: metadata?.pricing,
        limit: compactObject({
          context: integerGreaterThanZero(
            model.max_context_length ?? undefined,
          ),
        }),
        modalities,
      });
    });

    return dedupeModels(models);
  },
};
