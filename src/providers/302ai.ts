import { z } from "zod";

import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { filterModalities } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const pageSize = 20;

const priceInfoSchema = z.object({
  input_price: z.number().nullable().optional(),
  output_price: z.number().nullable().optional(),
  context_length: z.number().nullable().optional(),
  file_support_type: z.union([z.number(), z.boolean()]).nullable().optional(),
});

const definitionSchema = z.object({ title: z.string().optional() });

const productSchema = z.object({
  name: z.string(),
  alias_name: z.string().nullable().optional(),
  created_on: z.number().nullable().optional(),
  modified_on: z.number().nullable().optional(),
  definition: z.array(definitionSchema).optional(),
  price_info: z.array(priceInfoSchema).optional(),
  model_capabilities: z
    .object({
      audio: z.boolean().optional(),
      image: z.boolean().optional(),
      video: z.boolean().optional(),
      thinking: z.boolean().optional(),
      function_call: z.boolean().optional(),
    })
    .nullable()
    .optional(),
});

const responseSchema = z.object({
  code: z.number(),
  data: z.object({
    total_count: z.number(),
    returned_count: z.number(),
    products: z.array(productSchema),
  }),
});

function looksLikeStructuredOutput(value: string | undefined): boolean {
  return /structured output/i.test(value ?? "");
}

function fileSupportToModalities(
  value: number | boolean | null | undefined,
): readonly string[] {
  if (value === 1) {
    return ["file"];
  }

  if (value === 2) {
    return ["image", "file"];
  }

  return [];
}

async function fetch302Json(page: number) {
  const url = new URL("https://302.ai/api/cache/product-list");
  url.searchParams.set("lang", "en");
  url.searchParams.set("page", String(page));
  url.searchParams.set("pageSize", String(pageSize));
  url.searchParams.set("category", "api");
  url.searchParams.set("tag", "LLM");
  url.searchParams.set("type", "new");

  const previousTlsSetting = process.env.NODE_TLS_REJECT_UNAUTHORIZED;

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  let response: Response;

  try {
    response = await fetch(url, {
      signal: AbortSignal.timeout(60_000),
    });
  } finally {
    if (previousTlsSetting === undefined) {
      delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    } else {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = previousTlsSetting;
    }
  }

  if (!response.ok) {
    throw new Error(
      `302AI API error (page ${page}): ${response.status} ${response.statusText}`,
    );
  }

  return responseSchema.parse(await response.json());
}

export const ai302Provider: ProviderDefinition = {
  name: "302ai",
  outputDirectory: "data/providers/302ai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const firstPage = await fetch302Json(1);
    const products = [...firstPage.data.products];
    const pageCount = Math.max(
      1,
      Math.ceil(
        Math.max(firstPage.data.total_count, firstPage.data.products.length) /
          pageSize,
      ),
    );

    progress?.tick(
      `302.ai page 1/${pageCount} (${firstPage.data.products.length})`,
      true,
    );

    if (pageCount > 1) {
      progress?.beginPhase("details", pageCount - 1);

      for (let page = 2; page <= pageCount; page += 1) {
        try {
          const response = await fetch302Json(page);
          products.push(...response.data.products);
          progress?.tick(
            `302.ai page ${page}/${pageCount} (${response.data.products.length})`,
            true,
          );
        } catch {
          progress?.tick(`302.ai page ${page}/${pageCount} (0)`, false);
        }
      }
    }

    return products.map((product) => {
      const pricingEntries = product.price_info ?? [];
      const maxContext = pricingEntries.reduce<number | undefined>(
        (current, entry) => {
          const next = integerGreaterThanZero(entry.context_length);

          if (next === undefined) {
            return current;
          }

          return current === undefined ? next : Math.max(current, next);
        },
        undefined,
      );
      const inputPrice = pricingEntries.reduce<number | undefined>(
        (current, entry) => {
          const next = nonNegativeNumber(entry.input_price);

          if (next === undefined) {
            return current;
          }

          return current === undefined ? next : Math.min(current, next);
        },
        undefined,
      );
      const outputPrice = pricingEntries.reduce<number | undefined>(
        (current, entry) => {
          const next = nonNegativeNumber(entry.output_price);

          if (next === undefined) {
            return current;
          }

          return current === undefined ? next : Math.min(current, next);
        },
        undefined,
      );
      const inputModalities = filterModalities([
        "text",
        ...(product.model_capabilities?.audio ? ["audio"] : []),
        ...(product.model_capabilities?.image ? ["image"] : []),
        ...(product.model_capabilities?.video ? ["video"] : []),
        ...pricingEntries.flatMap((entry) => [
          ...fileSupportToModalities(entry.file_support_type),
        ]),
      ]);
      const outputModalities = filterModalities([
        "text",
        ...(product.model_capabilities?.audio ? ["audio"] : []),
        ...(product.model_capabilities?.image ? ["image"] : []),
        ...(product.model_capabilities?.video ? ["video"] : []),
      ]);

      return compactObject({
        id: product.alias_name?.trim() || product.name,
        name: product.name,
        release_date: timestampFromUnixSeconds(product.created_on),
        last_updated: timestampFromUnixSeconds(product.modified_on),
        features: compactObject({
          attachment:
            inputModalities !== undefined
              ? inputModalities.some((modality) => modality !== "text")
              : undefined,
          reasoning: product.model_capabilities?.thinking,
          tool_call: product.model_capabilities?.function_call,
          structured_output:
            product.definition !== undefined
              ? product.definition.some((entry) =>
                  looksLikeStructuredOutput(entry.title),
                )
              : undefined,
        }),
        pricing: compactObject({
          input: inputPrice,
          output: outputPrice,
        }),
        limit: compactObject({
          context: maxContext,
        }),
        modalities: compactObject({
          input: inputModalities,
          output: outputModalities,
        }),
      });
    });
  },
};
