import { z } from "zod";

import { fetchJson, fetchText, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  normalizeModelId,
  // timestampFromUnixSeconds,
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

const pricingEntrySchema = z
  .object({
    value: z.string(),
    price_dollar: z.string().nullish(),
  })
  .loose();

const pricingModelSchema = z
  .object({
    api: z.string().optional(),
    api_endpoint: z.string().optional(),
    name: z.string().optional(),
    licence: z.string().optional(),
    price: z.array(pricingEntrySchema).optional(),
  })
  .loose();

type PricingMetadata = {
  name?: string;
  open_weights?: boolean;
  pricing?: ModelRecord["pricing"];
};

function parseDollarAmount(
  value: string | null | undefined,
): number | undefined {
  if (!value) {
    return undefined;
  }

  const match = value
    .replace(/<[^>]*>/g, " ")
    .match(/\$+\s*([0-9]+(?:\.[0-9]+)?)/);

  if (!match?.[1]) {
    return undefined;
  }

  const parsed = Number(match[1]);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parseHydrationPayloads(html: string): string[] {
  const payloads: string[] = [];

  for (const match of html.matchAll(
    /self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)<\/script>/g,
  )) {
    const raw = match[1];

    if (!raw) {
      continue;
    }

    try {
      payloads.push(JSON.parse(`"${raw}"`) as string);
    } catch {
      continue;
    }
  }

  return payloads;
}

function findJsonObjectEnd(text: string, start: number): number | undefined {
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < text.length; index += 1) {
    const character = text[index];

    if (!character) {
      continue;
    }

    if (escaped) {
      escaped = false;
      continue;
    }

    if (character === "\\" && inString) {
      escaped = true;
      continue;
    }

    if (character === '"') {
      inString = !inString;
      continue;
    }

    if (inString) {
      continue;
    }

    if (character === "{") {
      depth += 1;
      continue;
    }

    if (character !== "}" || depth === 0) {
      continue;
    }

    depth -= 1;

    if (depth === 0) {
      return index + 1;
    }
  }

  return undefined;
}

function extractContainingJsonObject(
  text: string,
  targetIndex: number,
): unknown | undefined {
  for (let start = targetIndex; start >= 0; start -= 1) {
    if (text[start] !== "{") {
      continue;
    }

    const end = findJsonObjectEnd(text, start);

    if (end === undefined || end <= targetIndex) {
      continue;
    }

    try {
      return JSON.parse(text.slice(start, end));
    } catch {
      continue;
    }
  }

  return undefined;
}

function mergePricingMetadata(
  previous: PricingMetadata | undefined,
  next: PricingMetadata,
): PricingMetadata {
  return compactObject({
    name: previous?.name ?? next.name,
    open_weights: previous?.open_weights ?? next.open_weights,
    pricing: compactObject({
      input:
        Math.max(previous?.pricing?.input ?? 0, next.pricing?.input ?? 0) ||
        undefined,
      output:
        Math.max(previous?.pricing?.output ?? 0, next.pricing?.output ?? 0) ||
        undefined,
    }),
  });
}

function parsePricingPage(html: string): Map<string, PricingMetadata> {
  const result = new Map<string, PricingMetadata>();

  for (const payload of parseHydrationPayloads(html)) {
    for (const match of payload.matchAll(/"(?:api|api_endpoint)":"([^"]+)"/g)) {
      const candidate = extractContainingJsonObject(payload, match.index ?? 0);

      if (!candidate) {
        continue;
      }

      const parsed = pricingModelSchema.safeParse(candidate);

      if (!parsed.success) {
        continue;
      }

      const endpoint = parsed.data.api_endpoint ?? parsed.data.api;

      if (!endpoint) {
        continue;
      }

      const pricing: NonNullable<ModelRecord["pricing"]> = {};

      for (const entry of parsed.data.price ?? []) {
        const value = parseDollarAmount(entry.price_dollar);
        const label = entry.value.trim().toLowerCase();

        if (value === undefined) {
          continue;
        }

        if (label.startsWith("input")) {
          pricing.input = value;
        }

        if (label.startsWith("output")) {
          pricing.output = value;
        }
      }

      const metadata = compactObject({
        name: parsed.data.name,
        open_weights:
          /open model/i.test(parsed.data.licence ?? "") || undefined,
        pricing: compactObject(pricing),
      });

      if (Object.keys(metadata).length === 0) {
        continue;
      }

      result.set(
        endpoint,
        mergePricingMetadata(result.get(endpoint), metadata),
      );
    }
  }

  return result;
}

async function fetchPricing(): Promise<Map<string, PricingMetadata>> {
  try {
    const html = await fetchText("https://mistral.ai/pricing#api", {
      init: { redirect: "follow" },
      label: "Mistral pricing page error",
    });

    return parsePricingPage(html);
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
        // release_date: timestampFromUnixSeconds(model.created), // Omitted for now, as API returns current date
        features: compactObject({
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
