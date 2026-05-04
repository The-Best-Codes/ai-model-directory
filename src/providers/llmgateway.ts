import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  pricePerMillion,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import {
  filterModalities,
  hasAnyString,
  hasAttachmentSource,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiProviderSchema = z.object({
  tools: z.boolean().optional(),
  reasoning: z.boolean().optional(),
});

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  created: z.number().nullish(),
  architecture: z
    .object({
      input_modalities: z.array(z.string()).nullish().optional(),
      output_modalities: z.array(z.string()).nullish().optional(),
    })
    .optional(),
  providers: z.array(apiProviderSchema).optional(),
  pricing: z
    .object({
      prompt: z.string().nullish(),
      completion: z.string().nullish(),
      input_cache_read: z.string().nullish().optional(),
      input_cache_write: z.string().nullish().optional(),
      internal_reasoning: z.string().nullish().optional(),
    })
    .optional(),
  context_length: z.number().nullish().optional(),
  supported_parameters: z.array(z.string()).optional(),
  structured_outputs: z.boolean().optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const llmgatewayProvider: ProviderDefinition = {
  name: "llmgateway",
  outputDirectory: "data/providers/llmgateway/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.llmgateway.io/v1/models", {
      schema: responseSchema,
      label: "LLM Gateway API error",
    });

    progress?.tick(
      `api.llmgateway.io/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = filterModalities(model.architecture?.input_modalities);
      const output = filterModalities(model.architecture?.output_modalities);

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment:
            model.architecture !== undefined
              ? (hasAttachmentSource(model.architecture.input_modalities) ??
                false)
              : undefined,
          reasoning:
            model.providers?.some((provider) => provider.reasoning) ||
            hasAnyString(model.supported_parameters, "reasoning"),
          tool_call:
            model.providers?.some((provider) => provider.tools) ||
            hasAnyString(
              model.supported_parameters,
              "tools",
              "tool_choice",
              "parallel_tool_calls",
            ),
          structured_output:
            model.structured_outputs ||
            hasAnyString(
              model.supported_parameters,
              "structured_outputs",
              "response_format",
            ),
          temperature: hasAnyString(model.supported_parameters, "temperature"),
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing?.prompt),
          output: pricePerMillion(model.pricing?.completion),
          reasoning: pricePerMillion(model.pricing?.internal_reasoning),
          cache_read: pricePerMillion(model.pricing?.input_cache_read),
          cache_write: pricePerMillion(model.pricing?.input_cache_write),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
