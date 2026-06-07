import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { timestampFromUnixSeconds } from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const waferPricingSchema = z.object({
  currency: z.string(),
  input_cents_per_million: z.number(),
  output_cents_per_million: z.number(),
  cache_read_cents_per_million: z.number(),
});

const waferCapabilitiesSchema = z.object({
  vision: z.boolean(),
  tools: z.boolean(),
  reasoning: z.boolean(),
});

const waferInfoSchema = z.object({
  display_name: z.string(),
  description: z.string(),
  tier: z.string(),
  context_length: z.number(),
  capabilities: waferCapabilitiesSchema,
  pricing: waferPricingSchema,
});

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  owned_by: z.string(),
  max_model_len: z.number(),
  wafer: waferInfoSchema,
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function centsToDollars(cents: number): number {
  return new Decimal(cents).div(100).toNumber();
}

export const waferAiProvider: ProviderDefinition = {
  name: "wafer-ai",
  outputDirectory: "data/providers/wafer-ai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://pass.wafer.ai/v1/models", {
      schema: responseSchema,
      label: "Wafer API error",
    });

    progress?.tick(`pass.wafer.ai/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const wafer = model.wafer;
      const caps = wafer.capabilities;

      return compactObject({
        id: model.id,
        name: wafer.display_name,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: caps.vision || undefined,
          tool_call: caps.tools || undefined,
          reasoning: caps.reasoning || undefined,
        }),
        pricing: compactObject({
          input: centsToDollars(wafer.pricing.input_cents_per_million),
          output: centsToDollars(wafer.pricing.output_cents_per_million),
          cache_read: centsToDollars(
            wafer.pricing.cache_read_cents_per_million,
          ),
        }),
        limit: compactObject({
          context: wafer.context_length,
        }),
        modalities: compactObject({
          input: caps.vision
            ? (["text", "image"] as ModelModality[])
            : (["text"] as ModelModality[]),
          output: ["text"] as ModelModality[],
        }),
      });
    });
  },
};
