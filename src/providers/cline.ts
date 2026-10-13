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
  created: z.number().optional(),
  context_length: z.number().nullish(),
  architecture: z
    .object({
      input_modalities: z.array(z.string()).optional(),
      output_modalities: z.array(z.string()).optional(),
    })
    .optional(),
  pricing: z
    .object({
      prompt: z.string().optional(),
      completion: z.string().optional(),
      input_cache_read: z.string().optional(),
      input_cache_write: z.string().optional(),
      internal_reasoning: z.string().optional(),
    })
    .optional(),
  top_provider: z
    .object({
      context_length: z.number().nullish(),
      max_completion_tokens: z.number().nullish(),
    })
    .optional(),
  supported_parameters: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const clineProvider: ProviderDefinition = {
  name: "cline",
  outputDirectory: "data/providers/cline/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://api.cline.bot/api/v1/ai/cline/models",
      {
        schema: responseSchema,
        label: "Cline API error",
      },
    );

    progress?.tick(
      `api.cline.bot/api/v1/ai/cline/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const supportedParameters = model.supported_parameters ?? [];
      const reasoningPrice = pricePerMillion(model.pricing?.internal_reasoning);

      return compactObject({
        id: model.id,
        name: model.name,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: hasAttachmentSource(model.architecture?.input_modalities),
          reasoning:
            hasAnyString(
              supportedParameters,
              "reasoning",
              "reasoning_effort",
              "include_reasoning",
            ) || reasoningPrice !== undefined,
          tool_call: hasAnyString(supportedParameters, "tools", "tool_choice"),
          structured_output: hasAnyString(
            supportedParameters,
            "structured_outputs",
            "response_format",
          ),
          temperature: hasAnyString(supportedParameters, "temperature"),
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing?.prompt),
          output: pricePerMillion(model.pricing?.completion),
          reasoning: reasoningPrice,
          cache_read: pricePerMillion(model.pricing?.input_cache_read),
          cache_write: pricePerMillion(model.pricing?.input_cache_write),
        }),
        limit: compactObject({
          context:
            model.top_provider?.context_length ??
            model.context_length ??
            undefined,
          output: model.top_provider?.max_completion_tokens ?? undefined,
        }),
        modalities: compactObject({
          input: filterModalities(model.architecture?.input_modalities),
          output: filterModalities(model.architecture?.output_modalities),
        }),
      });
    });
  },
};
