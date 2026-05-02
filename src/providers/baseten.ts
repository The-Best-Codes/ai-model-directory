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
  name: z.string().optional(),
  created: z.number(),
  context_length: z.number().nullish(),
  max_completion_tokens: z.number().nullish(),
  pricing: z
    .object({
      prompt: z.string().nullish(),
      completion: z.string().nullish(),
    })
    .nullish(),
  supported_sampling_parameters: z.array(z.string()).optional(),
  supported_features: z.array(z.string()).optional(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const basetenProvider: ProviderDefinition = {
  name: "baseten",
  outputDirectory: "data/providers/baseten/models",
  async fetchModels(progress) {
    const apiKey = process.env.BASETEN_API_KEY;

    if (!apiKey) {
      throw new Error("BASETEN_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://inference.baseten.co/v1/models", {
      schema: responseSchema,
      headers: withBearerToken(apiKey),
      label: "Baseten API error",
    });

    progress?.tick(
      `inference.baseten.co/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = filterModalities(model.input_modalities);
      const output = filterModalities(model.output_modalities);
      const features = model.supported_features;
      const sampling = model.supported_sampling_parameters;

      return compactObject({
        id: model.id,
        name: model.name || model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment:
            hasAttachmentSource(model.input_modalities) ??
            (features !== undefined
              ? hasAnyString(features, "vision")
              : undefined),
          reasoning:
            features !== undefined
              ? hasAnyString(features, "reasoning", "reasoning_effort")
              : undefined,
          tool_call:
            features !== undefined
              ? hasAnyString(features, "tools")
              : undefined,
          structured_output:
            features !== undefined
              ? hasAnyString(features, "structured_outputs", "json_mode")
              : undefined,
          temperature:
            sampling !== undefined
              ? hasAnyString(sampling, "temperature")
              : undefined,
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing?.prompt),
          output: pricePerMillion(model.pricing?.completion),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_completion_tokens),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
