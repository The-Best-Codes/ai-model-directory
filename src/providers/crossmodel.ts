import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  timestampFromDateInput,
} from "../lib/model.ts";
import { filterModalities, hasAttachmentSource } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const tierSchema = z.object({
  threshold: z.number(),
  input_micro_per_1m: z.number().nullish(),
  output_micro_per_1m: z.number().nullish(),
  cache_read_micro_per_1m: z.number().nullish(),
  cache_creation_micro_per_1m: z.number().nullish(),
});

const apiModelSchema = z.object({
  id: z.string(),
  display_name: z.string().optional(),
  context_window_tokens: z.number().nullish(),
  max_output_tokens: z.number().nullish(),
  currency: z.string().optional(),
  capabilities: z
    .object({
      reasoning: z.object({ supported: z.boolean().nullish() }).optional(),
      tool_use: z.object({ supported: z.boolean().nullish() }).optional(),
      structured_output: z
        .object({ json_schema: z.boolean().nullish() })
        .optional(),
    })
    .optional(),
  modalities: z
    .object({
      input: z.array(z.string()).optional(),
      output: z.array(z.string()).optional(),
    })
    .optional(),
  identity: z.object({ released_at: z.string().nullish() }).optional(),
  pricing: z.object({ tiers: z.array(tierSchema).optional() }).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

const microsPerUnit = new Decimal(1_000_000);

function fromMicros(value: number | null | undefined): number | undefined {
  if (value === null || value === undefined || value < 0) {
    return undefined;
  }

  return new Decimal(value).div(microsPerUnit).toNumber();
}

export const crossmodelProvider: ProviderDefinition = {
  name: "crossmodel",
  outputDirectory: "data/providers/crossmodel/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://www.crossmodel.ai/api/models", {
      schema: responseSchema,
      label: "CrossModel API error",
    });

    progress?.tick(
      `www.crossmodel.ai/api/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const capabilities = model.capabilities;
      const baseTier = model.pricing?.tiers?.find(
        (tier) => tier.threshold === 0,
      );
      const usd = model.currency?.toUpperCase() === "USD";

      return compactObject({
        id: model.id,
        name: model.display_name ?? model.id,
        release_date: timestampFromDateInput(model.identity?.released_at),
        features: compactObject({
          attachment: hasAttachmentSource(model.modalities?.input),
          reasoning: capabilities?.reasoning?.supported ?? undefined,
          tool_call: capabilities?.tool_use?.supported ?? undefined,
          structured_output:
            capabilities?.structured_output?.json_schema ?? undefined,
        }),
        pricing:
          usd && baseTier
            ? compactObject({
                input: fromMicros(baseTier.input_micro_per_1m),
                output: fromMicros(baseTier.output_micro_per_1m),
                cache_read: fromMicros(baseTier.cache_read_micro_per_1m),
                cache_write: fromMicros(baseTier.cache_creation_micro_per_1m),
              })
            : undefined,
        limit: compactObject({
          context: integerGreaterThanZero(model.context_window_tokens),
          output: integerGreaterThanZero(model.max_output_tokens),
        }),
        modalities: compactObject({
          input: filterModalities(model.modalities?.input),
          output: filterModalities(model.modalities?.output),
        }),
      });
    });
  },
};
