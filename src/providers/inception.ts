import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
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
  id: z.string(),
  name: z.string(),
  created: z.number(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
  context_length: z.number().optional(),
  max_output_length: z.number().optional(),
  pricing: z
    .object({
      prompt: z.string().optional(),
      completion: z.string().optional(),
      input_cache_reads: z.string().optional(),
      input_cache_writes: z.string().optional(),
    })
    .optional(),
  supported_sampling_parameters: z.array(z.string()).optional(),
  supported_features: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const inceptionProvider: ProviderDefinition = {
  name: "inception",
  outputDirectory: "data/providers/inception/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.inceptionlabs.ai/v1/models", {
      schema: responseSchema,
      headers: withBearerToken(process.env.INCEPTION_API_KEY),
      label: "Inception API error",
    });

    progress?.tick(
      `api.inceptionlabs.ai/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = filterModalities(model.input_modalities);
      const output = filterModalities(model.output_modalities);

      return compactObject({
        id: model.id,
        name: model.name,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: hasAttachmentSource(model.input_modalities),
          tool_call:
            model.supported_features !== undefined
              ? hasAnyString(model.supported_features, "tools")
              : undefined,
          structured_output:
            model.supported_features !== undefined
              ? hasAnyString(
                  model.supported_features,
                  "structured_outputs",
                  "json_mode",
                )
              : undefined,
          temperature:
            model.supported_sampling_parameters !== undefined
              ? hasAnyString(model.supported_sampling_parameters, "temperature")
              : undefined,
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing?.prompt),
          output: pricePerMillion(model.pricing?.completion),
          cache_read: pricePerMillion(model.pricing?.input_cache_reads),
          cache_write: pricePerMillion(model.pricing?.input_cache_writes),
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
