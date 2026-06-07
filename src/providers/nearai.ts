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
  id: z.string(),
  name: z.string(),
  created: z.number(),
  context_length: z.number(),
  max_output_length: z.number(),
  architecture: z.object({
    inputModalities: z.array(z.string()),
    outputModalities: z.array(z.string()),
  }),
  pricing: z.object({
    prompt: z.string(),
    completion: z.string(),
    input_cache_read: z.string().optional(),
  }),
  supported_sampling_parameters: z.array(z.string()),
  supported_features: z.array(z.string()),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const nearaiProvider: ProviderDefinition = {
  name: "nearai",
  outputDirectory: "data/providers/nearai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://cloud-api.near.ai/v1/models", {
      schema: responseSchema,
      label: "NEAR AI Cloud API error",
    });

    progress?.tick(
      `cloud-api.near.ai/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = filterModalities(model.architecture.inputModalities);
      const output = filterModalities(model.architecture.outputModalities);

      return compactObject({
        id: model.id,
        name: model.name,
        release_date: timestampFromUnixSeconds(model.created),
        features: {
          attachment:
            hasAttachmentSource(model.architecture.inputModalities) ?? false,
          reasoning: hasAnyString(model.supported_features, "reasoning"),
          tool_call: hasAnyString(model.supported_features, "tools"),
          structured_output: hasAnyString(
            model.supported_features,
            "structured_outputs",
          ),
          temperature: hasAnyString(
            model.supported_sampling_parameters,
            "temperature",
          ),
        },
        pricing: compactObject({
          input: pricePerMillion(model.pricing.prompt),
          output: pricePerMillion(model.pricing.completion),
          cache_read: pricePerMillion(model.pricing.input_cache_read),
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
