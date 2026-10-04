import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import {
  filterModalities,
  hasAttachmentSupport,
  hasAnyString,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const responseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      context_length: z.number().nullish(),
      hugging_face_id: z.string().nullish(),
      architecture: z.object({
        input_modalities: z.array(z.string()),
        output_modalities: z.array(z.string()),
      }),
      capabilities: z.object({ function_calling: z.boolean() }),
      top_provider: z.object({
        context_length: z.number().nullish(),
        max_completion_tokens: z.number().nullish(),
      }),
      limits: z.object({ max_completion_tokens: z.number().nullish() }),
      supported_parameters: z.array(z.string()),
      pricing: z.object({
        audio_per_minute: z.union([z.string(), z.number()]).nullish(),
        prompt: z.union([z.string(), z.number()]).nullish(),
        completion: z.union([z.string(), z.number()]).nullish(),
        input_cache_read: z.union([z.string(), z.number()]).nullish(),
        input_cache_write: z.union([z.string(), z.number()]).nullish(),
        internal_reasoning: z.union([z.string(), z.number()]).nullish(),
      }),
    }),
  ),
});
function perMillion(
  value: string | number | null | undefined,
): number | undefined {
  if (value === null || value === undefined) return undefined;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}
export const meganovaProvider: ProviderDefinition = {
  name: "meganova",
  outputDirectory: "data/providers/meganova/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const response = await fetchJson("https://api.meganova.ai/v1/models", {
      schema: responseSchema,
      label: "meganova models API error",
    });
    progress?.tick(
      `https://api.meganova.ai/v1/models (${response.data.length})`,
      true,
    );
    return [
      ...new Map(response.data.map((model) => [model.id, model])).values(),
    ].map((model) => {
      const input = filterModalities(model.architecture.input_modalities);
      const output = filterModalities(model.architecture.output_modalities);
      const chat = input?.includes("text") && output?.includes("text");
      const tokenPriced =
        (!perMillion(model.pricing.audio_per_minute) &&
          output?.includes("text")) ||
        model.architecture.output_modalities.some((modality) =>
          ["embedding", "rerank"].includes(modality),
        );
      return compactObject({
        id: model.id,
        name: model.name,
        open_weights: model.hugging_face_id ? true : undefined,
        limit: compactObject({
          context: integerGreaterThanZero(
            model.top_provider.context_length ?? model.context_length,
          ),
          output: integerGreaterThanZero(
            model.top_provider.max_completion_tokens ??
              model.limits.max_completion_tokens,
          ),
        }),
        modalities: compactObject({ input, output }),
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: chat
            ? hasAnyString(
                model.supported_parameters,
                "reasoning",
                "reasoning_effort",
                "include_reasoning",
              )
            : undefined,
          tool_call: model.capabilities.function_calling,
          structured_output: chat
            ? hasAnyString(
                model.supported_parameters,
                "response_format",
                "structured_outputs",
              )
            : undefined,
          temperature: chat
            ? hasAnyString(model.supported_parameters, "temperature")
            : undefined,
        }),
        pricing: tokenPriced
          ? compactObject({
              input: perMillion(model.pricing.prompt),
              output: perMillion(model.pricing.completion),
              cache_read: perMillion(model.pricing.input_cache_read),
              cache_write: perMillion(model.pricing.input_cache_write),
              reasoning: perMillion(model.pricing.internal_reasoning),
            })
          : undefined,
      });
    });
  },
};
