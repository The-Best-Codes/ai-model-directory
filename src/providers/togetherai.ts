import { z } from "zod";

import { fetchJson, fetchText, withBearerToken } from "../lib/http.ts";
import { markdownTables, parseScaledNumber } from "../lib/docs.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const pricingBreakdownSchema = z
  .object({
    example_price: z.number().nullish().optional(),
    price_per_minute: z.number().nullish().optional(),
  })
  .passthrough();

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  type: z.string().optional(),
  display_name: z.string().optional(),
  context_length: z.number().nullish(),
  pricing: z
    .object({
      input: z.number().nullish(),
      output: z.number().nullish(),
      cached_input: z.number().nullish().optional(),
      transcribe: z.union([z.number(), pricingBreakdownSchema]).nullish(),
      image: z.union([z.number(), pricingBreakdownSchema]).nullish(),
      video: z.union([z.number(), pricingBreakdownSchema]).nullish(),
    })
    .nullish(),
});

const responseSchema = z.array(apiModelSchema);

export function parseModelDocs(
  markdown: string,
): Map<string, Omit<ModelRecord, "id">> {
  const result = new Map<string, Omit<ModelRecord, "id">>();
  for (const section of markdown.split(/^## /m)) {
    if (!/^(Chat|Vision) models\b/.test(section)) continue;
    for (const table of markdownTables(section)) {
      const headers = table[0] ?? [];
      const idIndex = headers.indexOf("API model string");
      if (idIndex < 0) continue;
      for (const row of table.slice(1)) {
        const field = (name: string) => row[headers.indexOf(name)];
        const id = row[idIndex];
        if (!id) continue;
        const support = (name: string) =>
          field(name) === "Yes"
            ? true
            : field(name) === "No"
              ? false
              : undefined;
        const input: ModelModality[] = section.startsWith("Vision")
          ? ["text", "image"]
          : ["text"];
        const previous = result.get(id);
        result.set(
          id,
          compactObject({
            name: field("Model name"),
            features: {
              ...previous?.features,
              ...compactObject({
                tool_call: support("Function calling"),
                structured_output: support("Structured outputs"),
                attachment: input.includes("image"),
              }),
            },
            pricing: {
              ...previous?.pricing,
              ...compactObject({
                input: parseScaledNumber(
                  field("Input pricing (per 1M tokens)") ?? "",
                ),
                output: parseScaledNumber(
                  field("Output pricing (per 1M tokens)") ?? "",
                ),
                cache_read: parseScaledNumber(
                  field("Cached input pricing (per 1M tokens)") ?? "",
                ),
              }),
            },
            limit: compactObject({
              context: integerGreaterThanZero(
                parseScaledNumber(field("Context length") ?? ""),
              ),
            }),
            modalities: { input, output: ["text" as const] },
          }),
        );
      }
    }
  }
  return result;
}

async function fetchDocumentation(): Promise<
  Map<string, Omit<ModelRecord, "id">>
> {
  try {
    return parseModelDocs(
      await fetchText("https://docs.together.ai/docs/serverless/models.md", {
        label: "Together AI model docs error",
      }),
    );
  } catch {
    return new Map();
  }
}

function inferModalities(type: string | undefined): {
  input?: ModelModality[];
  output?: ModelModality[];
} {
  const normalized = type?.trim().toLowerCase();

  if (!normalized) {
    return {};
  }

  if (
    normalized.includes("transcription") ||
    normalized.includes("transcribe") ||
    normalized.includes("speech-to-text")
  ) {
    return { input: ["audio"], output: ["text"] };
  }

  if (
    normalized.includes("text-to-speech") ||
    normalized.includes("speech") ||
    normalized.includes("audio")
  ) {
    return { input: ["text"], output: ["audio"] };
  }

  if (normalized.includes("image")) {
    return { input: ["text"], output: ["image"] };
  }

  if (normalized.includes("embedding") || normalized.includes("rerank")) {
    return { input: ["text"] };
  }

  if (
    normalized.includes("chat") ||
    normalized.includes("code") ||
    normalized.includes("language") ||
    normalized.includes("moderation") ||
    normalized.includes("completion")
  ) {
    return { input: ["text"], output: ["text"] };
  }

  return {};
}

export const togetheraiProvider: ProviderDefinition = {
  name: "togetherai",
  outputDirectory: "data/providers/togetherai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const [response, documentation] = await Promise.all([
      fetchJson("https://api.together.ai/v1/models", {
        schema: responseSchema,
        headers: withBearerToken(process.env.TOGETHER_API_KEY),
        label: "Together AI API error",
      }),
      fetchDocumentation(),
    ]);

    progress?.tick(`api.together.ai/v1/models (${response.length})`, true);

    return response.map((model) => {
      const details = documentation.get(model.id);
      const modalities = {
        ...inferModalities(model.type),
        ...details?.modalities,
      };
      const hasAttachments = modalities.input?.some(
        (modality) => modality !== "text",
      );
      const hasSpecializedPricing =
        typeof model.pricing?.image === "object" ||
        typeof model.pricing?.video === "object" ||
        typeof model.pricing?.transcribe === "object";
      const inputPrice = nonNegativeNumber(model.pricing?.input);
      const outputPrice = nonNegativeNumber(model.pricing?.output);
      const cacheReadPrice = nonNegativeNumber(model.pricing?.cached_input);

      return compactObject({
        id: model.id,
        name: model.display_name ?? details?.name ?? model.id,
        release_date:
          model.created > 0
            ? timestampFromUnixSeconds(model.created)
            : undefined,
        features: compactObject({
          ...details?.features,
          attachment: hasAttachments,
        }),
        pricing: compactObject({
          ...details?.pricing,
          input:
            hasSpecializedPricing && inputPrice === 0
              ? undefined
              : (inputPrice ?? details?.pricing?.input),
          output:
            hasSpecializedPricing && outputPrice === 0
              ? undefined
              : (outputPrice ?? details?.pricing?.output),
          cache_read:
            hasSpecializedPricing && cacheReadPrice === 0
              ? undefined
              : (cacheReadPrice ?? details?.pricing?.cache_read),
        }),
        limit: compactObject({
          context:
            integerGreaterThanZero(model.context_length) ??
            details?.limit?.context,
        }),
        modalities: compactObject(modalities),
      });
    });
  },
};
