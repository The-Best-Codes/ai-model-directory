import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromDateInput,
} from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import { filterModalities, hasAnyString } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const pageSize = 500;

const tieredPriceSchema = z.union([z.number(), z.array(z.number())]).nullish();

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  capabilities: z.array(z.string()).optional(),
  context_window: z.number().nullish(),
  max_output_tokens: z.number().nullish(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
  params: z
    .object({ temperature: z.unknown().optional() })
    .passthrough()
    .nullish(),
  pricing: z
    .object({
      billing_unit: z.string().optional(),
      input: tieredPriceSchema,
      output: tieredPriceSchema,
      cached_input: tieredPriceSchema,
      cache_creation: tieredPriceSchema,
    })
    .nullish(),
  release: z.object({ date: z.string().nullish() }).nullish(),
});

const responseSchema = z.object({
  models: z.array(apiModelSchema),
  total: z.number(),
});

const modalityAliases = new Map<string, ModelModality>([
  ["pdf", "file"],
  ["speech", "audio"],
  ["sound", "audio"],
  ["music", "audio"],
]);

function normalizeModalities(
  values: readonly string[] | undefined,
): ModelModality[] | undefined {
  return filterModalities(
    values?.map((value) => modalityAliases.get(value) ?? value),
  );
}

function basePrice(
  value: z.infer<typeof tieredPriceSchema>,
): number | undefined {
  return nonNegativeNumber(Array.isArray(value) ? value[0] : value);
}

export const opperProvider: ProviderDefinition = {
  name: "opper",
  outputDirectory: "data/providers/opper/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const fetchPage = (offset: number) =>
      fetchJson(
        `https://api.opper.ai/v3/models?limit=${pageSize}&offset=${offset}`,
        {
          schema: responseSchema,
          label: `Opper API error (offset ${offset})`,
        },
      );

    const firstPage = await fetchPage(0);
    const models = [...firstPage.models];
    const pageCount = Math.max(1, Math.ceil(firstPage.total / pageSize));

    progress?.beginPhase("pages", pageCount);
    progress?.tick(`page 1/${pageCount} (${firstPage.models.length})`, true);

    for (let page = 1; page < pageCount; page += 1) {
      const response = await fetchPage(page * pageSize);
      models.push(...response.models);
      progress?.tick(
        `page ${page + 1}/${pageCount} (${response.models.length})`,
        true,
      );
    }

    return models.map((model) => {
      const capabilities = model.capabilities;
      const input = normalizeModalities(model.input_modalities);
      const output = normalizeModalities(model.output_modalities);
      const tokenPriced = model.pricing?.billing_unit === "per_mtok";
      const isText = output?.includes("text") ?? false;

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        release_date: timestampFromDateInput(model.release?.date),
        features: compactObject({
          attachment: input
            ? input.some((entry) => entry !== "text")
            : undefined,
          reasoning:
            isText && capabilities
              ? hasAnyString(capabilities, "reasoning", "thinking")
              : undefined,
          tool_call:
            isText && capabilities
              ? hasAnyString(capabilities, "tools")
              : undefined,
          structured_output:
            isText && capabilities
              ? hasAnyString(capabilities, "structured_output")
              : undefined,
          temperature:
            isText && model.params
              ? model.params.temperature !== undefined
              : undefined,
        }),
        pricing: tokenPriced
          ? compactObject({
              input: basePrice(model.pricing?.input),
              output: basePrice(model.pricing?.output),
              cache_read: basePrice(model.pricing?.cached_input),
              cache_write: basePrice(model.pricing?.cache_creation),
            })
          : undefined,
        limit: compactObject({
          context: integerGreaterThanZero(model.context_window),
          output: integerGreaterThanZero(model.max_output_tokens),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
