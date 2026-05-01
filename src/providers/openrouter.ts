import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { pricePerMillion, timestampFromUnixSeconds } from "../lib/model.ts";
import {
  filterModalities,
  hasAnyString,
  hasAttachmentSource,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  created: z.number(),
  context_length: z.number(),
  knowledge_cutoff: z.string().nullable(),
  architecture: z.object({
    input_modalities: z.array(z.string()),
    output_modalities: z.array(z.string()),
  }),
  pricing: z.object({
    prompt: z.string(),
    completion: z.string(),
    input_cache_read: z.string().optional(),
    input_cache_write: z.string().optional(),
    internal_reasoning: z.string().optional(),
    audio: z.string().optional(),
  }),
  top_provider: z.object({
    context_length: z.number().nullable(),
    max_completion_tokens: z.number().nullable(),
  }),
  supported_parameters: z.array(z.string()),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const openrouterProvider: ProviderDefinition = {
  name: "openrouter",
  outputDirectory: "data/providers/openrouter/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://openrouter.ai/api/v1/models", {
      schema: responseSchema,
      label: "OpenRouter API error",
    });

    progress?.tick(
      `openrouter.ai/api/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = filterModalities(model.architecture.input_modalities);
      const output = filterModalities(model.architecture.output_modalities);
      const reasoningPrice = pricePerMillion(model.pricing.internal_reasoning);

      return compactObject({
        id: model.id,
        name: model.name,
        knowledge_cutoff: model.knowledge_cutoff ?? undefined,
        release_date: timestampFromUnixSeconds(model.created),
        features: {
          attachment:
            hasAttachmentSource(model.architecture.input_modalities) ?? false,
          reasoning:
            hasAnyString(
              model.supported_parameters,
              "reasoning",
              "reasoning_effort",
              "include_reasoning",
            ) || reasoningPrice !== undefined,
          tool_call: hasAnyString(
            model.supported_parameters,
            "tools",
            "tool_choice",
            "parallel_tool_calls",
          ),
          structured_output: hasAnyString(
            model.supported_parameters,
            "structured_outputs",
            "response_format",
          ),
          temperature: hasAnyString(model.supported_parameters, "temperature"),
        },
        pricing: compactObject({
          input: pricePerMillion(model.pricing.prompt),
          output: pricePerMillion(model.pricing.completion),
          reasoning: reasoningPrice,
          cache_read: pricePerMillion(model.pricing.input_cache_read),
          cache_write: pricePerMillion(model.pricing.input_cache_write),
          input_audio: pricePerMillion(model.pricing.audio),
        }),
        limit: compactObject({
          context: model.top_provider.context_length ?? model.context_length,
          output: model.top_provider.max_completion_tokens ?? undefined,
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
