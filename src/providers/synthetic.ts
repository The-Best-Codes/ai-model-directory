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

const apiModelSchema = z.object({
  provider: z.string(),
  id: z.string(),
  name: z.string().optional(),
  created: z.number().optional(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
  context_length: z.number().nullish(),
  max_output_length: z.number().nullish().optional(),
  pricing: z
    .object({
      prompt: z.string().nullish(),
      completion: z.string().nullish(),
      input_cache_reads: z.string().nullish().optional(),
      input_cache_writes: z.string().nullish().optional(),
      image: z.string().nullish().optional(),
    })
    .optional(),
  supported_sampling_parameters: z.array(z.string()).optional(),
  supported_features: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function parseSyntheticPrice(value: string | null | undefined) {
  return pricePerMillion(value?.replace(/^\$/, ""));
}

export const syntheticProvider: ProviderDefinition = {
  name: "synthetic",
  outputDirectory: "data/providers/synthetic/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://api.synthetic.new/openai/v1/models",
      {
        schema: responseSchema,
        label: "Synthetic API error",
      },
    );

    progress?.tick(
      `api.synthetic.new/openai/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = filterModalities(model.input_modalities);
      const output = filterModalities(model.output_modalities);

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: hasAttachmentSource(model.input_modalities),
          reasoning: hasAnyString(
            model.supported_features,
            "reasoning",
            "thinking",
          ),
          tool_call: hasAnyString(model.supported_features, "tools"),
          structured_output: hasAnyString(
            model.supported_features,
            "structured_outputs",
            "json_mode",
          ),
          temperature: hasAnyString(
            model.supported_sampling_parameters,
            "temperature",
          ),
        }),
        pricing: compactObject({
          input: parseSyntheticPrice(model.pricing?.prompt),
          output: parseSyntheticPrice(model.pricing?.completion),
          cache_read: parseSyntheticPrice(model.pricing?.input_cache_reads),
          cache_write: parseSyntheticPrice(model.pricing?.input_cache_writes),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_output_length),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
