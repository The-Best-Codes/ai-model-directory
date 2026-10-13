import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  pricePerMillion,
  timestampFromDateInput,
} from "../lib/model.ts";
import { documentationTimestamp } from "../lib/docs.ts";
import { filterModalities, hasAnyString } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  release_date: z.string().nullish(),
  last_updated: z.string().nullish(),
  knowledge_cutoff: z.string().nullish(),
  context_length: z.number().nullish(),
  max_input_tokens: z.number().nullish(),
  max_completion_tokens: z.number().nullish(),
  architecture: z
    .object({
      input_modalities: z.array(z.string()).optional(),
      output_modalities: z.array(z.string()).optional(),
    })
    .optional(),
  pricing: z
    .object({
      prompt: z.number().optional(),
      completion: z.number().optional(),
    })
    .optional(),
  attachments: z.boolean().optional(),
  structured_output: z.boolean().optional(),
  tool_call: z.boolean().optional(),
  reasoning: z
    .object({ supported_efforts: z.array(z.string()).optional() })
    .nullish(),
  supported_parameters: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const theGridAiProvider: ProviderDefinition = {
  name: "the-grid-ai",
  outputDirectory: "data/providers/the-grid-ai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.thegrid.ai/v1/models", {
      schema: responseSchema,
      label: "The Grid API error",
    });

    progress?.tick(`api.thegrid.ai/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const parameters = model.supported_parameters;

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        knowledge_cutoff: documentationTimestamp(
          model.knowledge_cutoff ?? undefined,
        ),
        release_date: timestampFromDateInput(model.release_date),
        last_updated: timestampFromDateInput(model.last_updated),
        features: compactObject({
          attachment: model.attachments,
          reasoning: model.reasoning
            ? (model.reasoning.supported_efforts?.length ?? 0) > 0
            : undefined,
          tool_call: model.tool_call,
          structured_output: model.structured_output,
          temperature: parameters
            ? hasAnyString(parameters, "temperature")
            : undefined,
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing?.prompt),
          output: pricePerMillion(model.pricing?.completion),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          input: integerGreaterThanZero(model.max_input_tokens),
          output: integerGreaterThanZero(model.max_completion_tokens),
        }),
        modalities: compactObject({
          input: filterModalities(model.architecture?.input_modalities),
          output: filterModalities(model.architecture?.output_modalities),
        }),
      });
    });
  },
};
