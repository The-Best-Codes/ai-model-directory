import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { nonNegativeInteger } from "../lib/model.ts";
import {
  allModalities,
  hasAttachmentSource,
  parseCommaSet,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const priceBase = new Decimal(2);
const pageSize = 100;

const apiModelSchema = z.object({
  id: z.string(),
});

const apiResponseSchema = z.object({ data: z.array(apiModelSchema) });

const paginationModelSchema = z.object({
  model: z.string(),
  features: z.string().optional(),
  modalities: z.string().optional(),
  context_window: z.number().optional(),
  model_ratio: z.number().optional(),
  completion_ratio: z.number().optional(),
  cache_ratio: z.number().optional(),
  display_input: z.string().optional(),
  display_output: z.string().optional(),
  img_price_config: z.string().optional(),
});

const paginationResponseSchema = z.object({
  data: z.array(paginationModelSchema),
  total: z.number(),
});

const modalityMap = new Map<string, (typeof allModalities)[number]>([
  ["text", "text"],
  ["image", "image"],
  ["audio", "audio"],
  ["video", "video"],
  ["file", "file"],
  ["pdf", "file"],
]);

function parseModalities(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const result = new Set<(typeof allModalities)[number]>();

  for (const entry of value.split(",")) {
    const mapped = modalityMap.get(entry.trim().toLowerCase());

    if (mapped) {
      result.add(mapped);
    }
  }

  return result.size > 0
    ? allModalities.filter((entry) => result.has(entry))
    : undefined;
}

function priceFromRatio(
  ratio: number | undefined,
  multiplier: number | undefined,
): number | undefined {
  if (
    ratio === undefined ||
    multiplier === undefined ||
    ratio < 0 ||
    multiplier < 0
  ) {
    return undefined;
  }

  return new Decimal(ratio).mul(multiplier).mul(priceBase).toNumber();
}

export const aihubmixProvider: ProviderDefinition = {
  name: "aihubmix",
  outputDirectory: "data/providers/aihubmix/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const basicResponse = await fetchJson("https://aihubmix.com/v1/models", {
      schema: apiResponseSchema,
      headers: withBearerToken(process.env.AIHUBMIX_API_KEY),
      label: "AIHubMix API error",
    });

    progress?.tick(
      `aihubmix.com/v1/models (${basicResponse.data.length})`,
      true,
    );

    const firstPage = await fetchJson(
      `https://aihubmix.com/call/mdl_info_pagination?p=0&num=${pageSize}&sort_by=&sort_order=desc`,
      {
        schema: paginationResponseSchema,
        label: "AIHubMix pagination error",
      },
    );

    const byId = new Map(firstPage.data.map((entry) => [entry.model, entry]));
    const pageCount = Math.max(
      1,
      Math.ceil(Math.max(firstPage.total, firstPage.data.length) / pageSize),
    );

    progress?.beginPhase("details", pageCount);
    progress?.tick(`page 1/${pageCount} (${firstPage.data.length})`, true);

    for (let page = 1; page < pageCount; page += 1) {
      try {
        const response = await fetchJson(
          `https://aihubmix.com/call/mdl_info_pagination?p=${page}&num=${pageSize}&sort_by=&sort_order=desc`,
          {
            schema: paginationResponseSchema,
            label: `AIHubMix pagination error (page ${page + 1})`,
          },
        );

        for (const model of response.data) {
          byId.set(model.model, model);
        }

        progress?.tick(
          `page ${page + 1}/${pageCount} (${response.data.length})`,
          true,
        );
      } catch {
        progress?.tick(`page ${page + 1}/${pageCount} (0)`, false);
      }
    }

    const seen = new Set<string>();
    const merged = [] as Array<{
      id: string;
      details: z.infer<typeof paginationModelSchema> | undefined;
    }>;

    for (const model of basicResponse.data) {
      seen.add(model.id);
      merged.push({ id: model.id, details: byId.get(model.id) });
    }

    for (const [id, details] of byId) {
      if (!seen.has(id)) {
        merged.push({ id, details });
      }
    }

    return merged.map(({ id, details }) => {
      const featureSet = parseCommaSet(details?.features);
      const input = parseModalities(details?.modalities);
      const featuresProvided = details?.features !== undefined;
      const hasNonTokenPricing =
        (details?.display_input?.length ?? 0) > 0 ||
        (details?.display_output?.length ?? 0) > 0 ||
        (details?.img_price_config?.length ?? 0) > 0;

      return compactObject({
        id,
        name: id,
        features: compactObject({
          attachment: hasAttachmentSource(
            details?.modalities
              ?.split(",")
              .map((entry) => entry.trim())
              .filter((entry) => entry.length > 0),
          ),
          reasoning: featuresProvided ? featureSet.has("thinking") : undefined,
          tool_call: featuresProvided
            ? featureSet.has("tools") || featureSet.has("function_calling")
            : undefined,
          structured_output: featuresProvided
            ? featureSet.has("structured_outputs")
            : undefined,
        }),
        pricing: compactObject({
          input: hasNonTokenPricing
            ? undefined
            : priceFromRatio(details?.model_ratio, 1),
          output:
            hasNonTokenPricing ||
            details?.completion_ratio === undefined ||
            details.completion_ratio <= 0
              ? undefined
              : priceFromRatio(details.model_ratio, details.completion_ratio),
          cache_read:
            hasNonTokenPricing ||
            details?.cache_ratio === undefined ||
            details.cache_ratio < 0 ||
            details.cache_ratio === 1
              ? undefined
              : priceFromRatio(details.model_ratio, details.cache_ratio),
        }),
        limit: compactObject({
          context: nonNegativeInteger(details?.context_window),
        }),
        modalities: compactObject({
          input,
        }),
      });
    });
  },
};
