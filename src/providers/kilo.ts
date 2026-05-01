import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { pricePerMillion, timestampFromUnixSeconds } from "../lib/model.ts";
import { filterModalities, hasAnyString, hasAttachmentSource } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  created: z.number(),
  architecture: z
    .object({
      input_modalities: z.array(z.string()).optional(),
      output_modalities: z.array(z.string()).optional(),
    })
    .optional(),
  top_provider: z
    .object({
      context_length: z.number().nullable().optional(),
      max_completion_tokens: z.number().nullable().optional(),
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
  supported_parameters: z.array(z.string()).optional(),
  structured_outputs: z.boolean().optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const kiloProvider: ProviderDefinition = {
  name: "kilo",
  outputDirectory: "data/providers/kilo/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.kilo.ai/api/gateway/models", {
      schema: responseSchema,
      headers: withBearerToken(process.env.KILO_API_KEY),
      label: "Kilo API error",
    });

    progress?.tick(`api.kilo.ai/api/gateway/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const input = filterModalities(model.architecture?.input_modalities);
      const output = filterModalities(model.architecture?.output_modalities);
      const supportedParameters = model.supported_parameters ?? [];
      const reasoningPrice = pricePerMillion(model.pricing?.internal_reasoning);

      return compactObject({
        id: model.id,
        name: model.name,
        release_date:
          model.created > 0 ? timestampFromUnixSeconds(model.created) : undefined,
        features: compactObject({
          attachment: hasAttachmentSource(model.architecture?.input_modalities),
          reasoning:
            hasAnyString(
              supportedParameters,
              "reasoning",
              "include_reasoning",
            ) || reasoningPrice !== undefined,
          tool_call: hasAnyString(supportedParameters, "tools", "tool_choice"),
          structured_output:
            model.structured_outputs ??
            hasAnyString(
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
          context: model.top_provider?.context_length ?? undefined,
          output: model.top_provider?.max_completion_tokens ?? undefined,
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
