import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import {
  filterModalities,
  hasAttachmentSource,
  parseCommaSet,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  context_length: z.number().optional(),
  max_model_len: z.number().optional(),
  max_output_length: z.number().optional(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
  supported_features: z.array(z.string()).optional(),
  pricing: z
    .object({
      prompt: z.number().optional(),
      completion: z.number().optional(),
      input_cache_read: z.number().optional(),
    })
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const chutesProvider: ProviderDefinition = {
  name: "chutes",
  outputDirectory: "data/providers/chutes/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://llm.chutes.ai/v1/models", {
      schema: responseSchema,
      headers: withBearerToken(process.env.CHUTES_API_KEY),
      label: "Chutes API error",
    });

    progress?.tick(`llm.chutes.ai/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const input = filterModalities(model.input_modalities);
      const output = filterModalities(model.output_modalities);
      const features = parseCommaSet(model.supported_features?.join(","));
      const featuresProvided = model.supported_features !== undefined;

      return compactObject({
        id: model.id,
        name: model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: hasAttachmentSource(model.input_modalities),
          reasoning: featuresProvided ? features.has("reasoning") : undefined,
          tool_call: featuresProvided ? features.has("tools") : undefined,
          structured_output: featuresProvided
            ? features.has("structured_outputs")
            : undefined,
        }),
        pricing: compactObject({
          input: nonNegativeNumber(model.pricing?.prompt),
          output: nonNegativeNumber(model.pricing?.completion),
          cache_read: nonNegativeNumber(model.pricing?.input_cache_read),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(
            model.context_length ?? model.max_model_len,
          ),
          output: integerGreaterThanZero(model.max_output_length),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
