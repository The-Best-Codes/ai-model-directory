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
  name: z.string(),
  created: z.number(),
  context_length: z.number(),
  architecture: z.object({
    input_modalities: z.array(z.string()),
    output_modalities: z.array(z.string()),
  }),
  pricing: z.object({
    prompt: z.string(),
    completion: z.string(),
    input_cache_read: z.string().optional(),
    input_cache_write_5m: z.string().optional(),
  }),
  top_provider: z.object({
    max_completion_tokens: z.number().nullable(),
  }),
  supported_parameters: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const ofoxProvider: ProviderDefinition = {
  name: "ofox",
  outputDirectory: "data/providers/ofox/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.ofox.ai/v1/models", {
      schema: responseSchema,
      label: "Ofox API error",
    });

    progress?.tick(`api.ofox.ai/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const input = filterModalities(model.architecture.input_modalities);
      const output = filterModalities(model.architecture.output_modalities);

      return compactObject({
        id: model.id,
        name: model.name,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: hasAttachmentSource(model.architecture.input_modalities),
          reasoning: model.supported_parameters?.includes("reasoning"),
          tool_call: model.supported_parameters?.includes("tools"),
          structured_output:
            model.supported_parameters?.includes("response_format"),
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing.prompt),
          output: pricePerMillion(model.pricing.completion),
          cache_read: pricePerMillion(model.pricing.input_cache_read),
          cache_write: pricePerMillion(model.pricing.input_cache_write_5m),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(
            model.top_provider.max_completion_tokens,
          ),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
