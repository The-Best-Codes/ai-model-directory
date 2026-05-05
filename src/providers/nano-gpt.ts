import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number().nullish(),
  name: z.string().nullish(),
  context_length: z.number().nullish(),
  max_output_tokens: z.number().nullish(),
  architecture: z
    .object({
      input_modalities: z.array(z.string()).nullish(),
      output_modalities: z.array(z.string()).nullish(),
    })
    .nullish(),
  capabilities: z
    .object({
      reasoning: z.boolean().nullish(),
      tool_calling: z.boolean().nullish(),
      structured_output: z.boolean().nullish(),
    })
    .nullish(),
  pricing: z
    .object({
      prompt: z.number().nullish(),
      completion: z.number().nullish(),
      currency: z.string().nullish(),
      unit: z.string().nullish(),
    })
    .nullish(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function parseTokenPrice(
  value: number | null | undefined,
  currency: string | null | undefined,
  unit: string | null | undefined,
): number | undefined {
  if (currency !== "USD" || unit !== "per_million_tokens") {
    return undefined;
  }

  return nonNegativeNumber(value);
}

export const nanoGptProvider: ProviderDefinition = {
  name: "nano-gpt",
  outputDirectory: "data/providers/nano-gpt/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://nano-gpt.com/api/v1/models?detailed=true",
      {
        schema: responseSchema,
        label: "NanoGPT API error",
      },
    );

    progress?.tick(
      `nano-gpt.com/api/v1/models?detailed=true (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = filterModalities(model.architecture?.input_modalities);
      const output = filterModalities(model.architecture?.output_modalities);

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        release_date: timestampFromUnixSeconds(model.created ?? undefined),
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: model.capabilities?.reasoning ?? undefined,
          tool_call: model.capabilities?.tool_calling ?? undefined,
          structured_output: model.capabilities?.structured_output ?? undefined,
        }),
        pricing: compactObject({
          input: parseTokenPrice(
            model.pricing?.prompt,
            model.pricing?.currency,
            model.pricing?.unit,
          ),
          output: parseTokenPrice(
            model.pricing?.completion,
            model.pricing?.currency,
            model.pricing?.unit,
          ),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_output_tokens),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
