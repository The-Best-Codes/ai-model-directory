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
  kind: z.string().optional(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
  context_length: z.number().optional(),
  max_output_length: z.number().optional(),
  pricing: z
    .object({
      prompt: z.string().optional(),
      completion: z.string().optional(),
      input_cache_read: z.string().optional(),
    })
    .optional(),
  supported_features: z.array(z.string()).optional(),
  supported_parameters: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const kosmikProvider: ProviderDefinition = {
  name: "kosmik",
  outputDirectory: "data/providers/kosmik/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.koscompute.com/v1/models", {
      schema: responseSchema,
      label: "Kosmik API error",
    });

    progress?.tick(
      `api.koscompute.com/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const isChat = model.kind === "chat";
      const features = model.supported_features;
      const parameters = model.supported_parameters;

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: hasAttachmentSource(model.input_modalities),
          reasoning:
            isChat && features
              ? hasAnyString(features, "reasoning")
              : undefined,
          tool_call:
            isChat && features
              ? hasAnyString(features, "tool_calling")
              : undefined,
          structured_output:
            isChat && features
              ? hasAnyString(features, "structured_outputs")
              : undefined,
          temperature: parameters
            ? hasAnyString(parameters, "temperature")
            : undefined,
        }),
        pricing: isChat
          ? compactObject({
              input: pricePerMillion(model.pricing?.prompt),
              output: pricePerMillion(model.pricing?.completion),
              cache_read: pricePerMillion(model.pricing?.input_cache_read),
            })
          : undefined,
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
