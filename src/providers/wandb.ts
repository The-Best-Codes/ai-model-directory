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
  name: z.string().optional(),
  created: z.number().optional(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
  context_length: z.number().nullish(),
  max_output_length: z.number().nullish(),
  pricing: z
    .object({
      prompt: z.string().nullish(),
      completion: z.string().nullish(),
      input_cache_read: z.string().nullish(),
      input_cache_write: z.string().nullish(),
    })
    .nullish(),
  supported_sampling_parameters: z.array(z.string()).optional(),
  supported_features: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const wandbProvider: ProviderDefinition = {
  name: "wandb",
  outputDirectory: "data/providers/wandb/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://trace.wandb.ai/inference/analysis/artificialanalysis/models",
      {
        schema: responseSchema,
        label: "Weights & Biases API error",
      },
    );

    progress?.tick(
      `trace.wandb.ai/inference/analysis/artificialanalysis/models (${response.data.length})`,
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
          input: pricePerMillion(model.pricing?.prompt),
          output: pricePerMillion(model.pricing?.completion),
          cache_read: pricePerMillion(model.pricing?.input_cache_read),
          cache_write: pricePerMillion(model.pricing?.input_cache_write),
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
