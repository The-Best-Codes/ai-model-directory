import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  pricePerMillion,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { filterModalities, hasAttachmentSource } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number().optional(),
  context_length: z.number().nullish(),
  capabilities: z
    .object({
      input_modalities: z.array(z.string()).optional(),
      output_modalities: z.array(z.string()).optional(),
      supports_reasoning: z.boolean().optional(),
      supports_function_calling: z.boolean().optional(),
      supports_response_schema: z.boolean().optional(),
    })
    .nullish(),
  pricing: z
    .object({
      input_cost_per_token: z.number().optional(),
      output_cost_per_token: z.number().optional(),
      output_cost_per_reasoning_token: z.number().optional(),
      cache_read_input_token_cost: z.number().optional(),
      cache_creation_input_token_cost: z.number().optional(),
      input_cost_per_audio_token: z.number().optional(),
      output_cost_per_audio_token: z.number().optional(),
    })
    .nullish(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const edenaiProvider: ProviderDefinition = {
  name: "edenai",
  outputDirectory: "data/providers/edenai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.edenai.run/v3/models", {
      schema: responseSchema,
      label: "Eden AI API error",
    });

    progress?.tick(`api.edenai.run/v3/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const capabilities = model.capabilities;
      const pricing = model.pricing;

      return compactObject({
        id: model.id,
        name: model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: hasAttachmentSource(capabilities?.input_modalities),
          reasoning: capabilities?.supports_reasoning,
          tool_call: capabilities?.supports_function_calling,
          structured_output: capabilities?.supports_response_schema,
        }),
        pricing: compactObject({
          input: pricePerMillion(pricing?.input_cost_per_token),
          output: pricePerMillion(pricing?.output_cost_per_token),
          reasoning: pricePerMillion(pricing?.output_cost_per_reasoning_token),
          cache_read: pricePerMillion(pricing?.cache_read_input_token_cost),
          cache_write: pricePerMillion(
            pricing?.cache_creation_input_token_cost,
          ),
          input_audio: pricePerMillion(pricing?.input_cost_per_audio_token),
          output_audio: pricePerMillion(pricing?.output_cost_per_audio_token),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
        }),
        modalities: compactObject({
          input: filterModalities(capabilities?.input_modalities),
          output: filterModalities(capabilities?.output_modalities),
        }),
      });
    });
  },
};
