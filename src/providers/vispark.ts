import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, pricePerMillion } from "../lib/model.ts";
import {
  filterModalities,
  hasAnyString,
  hasAttachmentSource,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  context_length: z.number().optional(),
  max_output_length: z.number().optional(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
  pricing: z
    .object({
      prompt: z.string().optional(),
      completion: z.string().optional(),
      input_cache_read: z.string().optional(),
    })
    .optional(),
  supported_features: z.array(z.string()).optional(),
  supported_sampling_parameters: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const visparkProvider: ProviderDefinition = {
  name: "vispark",
  outputDirectory: "data/providers/vispark/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.lab.vispark.in/v1/models", {
      schema: responseSchema,
      label: "Vispark API error",
    });

    progress?.tick(
      `api.lab.vispark.in/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const features = model.supported_features;
      const sampling = model.supported_sampling_parameters;
      const cacheRead = pricePerMillion(model.pricing?.input_cache_read);

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        features: compactObject({
          attachment: hasAttachmentSource(model.input_modalities),
          reasoning: features ? hasAnyString(features, "reasoning") : undefined,
          tool_call: features ? hasAnyString(features, "tools") : undefined,
          structured_output: features
            ? hasAnyString(features, "structured_outputs")
            : undefined,
          temperature: sampling
            ? hasAnyString(sampling, "temperature")
            : undefined,
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing?.prompt),
          output: pricePerMillion(model.pricing?.completion),
          cache_read: cacheRead === 0 ? undefined : cacheRead,
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_output_length),
        }),
        modalities: compactObject({
          input: filterModalities(model.input_modalities),
          output: filterModalities(model.output_modalities),
        }),
      });
    });
  },
};
