import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import {
  integerGreaterThanZero,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { compactObject } from "../lib/object.ts";
import {
  filterModalities,
  hasAnyString,
  hasAttachmentSupport,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const responseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      created: z.number().optional(),
      input_modalities: z.array(z.string()).optional(),
      output_modalities: z.array(z.string()).optional(),
      context_length: z.number().nullish(),
      max_output_length: z.number().nullish(),
      hugging_face_id: z.string().nullish(),
      supported_sampling_parameters: z.array(z.string()).optional(),
      supported_features: z.array(z.string()).optional(),
    }),
  ),
});

export const sensenovaTokenPlanProvider: ProviderDefinition = {
  name: "sensenova-token-plan",
  outputDirectory: "data/providers/sensenova-token-plan/models",
  async fetchModels(progress) {
    const apiKey = process.env.SENSENOVA_API_KEY;

    if (!apiKey) {
      throw new Error("SENSENOVA_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 1);
    const response = await fetchJson("https://token.sensenova.ai/v1/models", {
      schema: responseSchema,
      headers: { Authorization: `Bearer ${apiKey}` },
      label: "SenseNova models API error",
    });
    progress?.tick(
      `https://token.sensenova.ai/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = filterModalities(model.input_modalities);
      const features = model.supported_features;
      const samplingParameters = model.supported_sampling_parameters;

      return compactObject({
        id: model.id,
        name: model.name,
        release_date: timestampFromUnixSeconds(model.created),
        open_weights: model.hugging_face_id ? true : undefined,
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_output_length),
        }),
        modalities: compactObject({
          input,
          output: filterModalities(model.output_modalities),
        }),
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: features ? hasAnyString(features, "reasoning") : undefined,
          tool_call: features ? hasAnyString(features, "tools") : undefined,
          structured_output: features
            ? hasAnyString(features, "json_mode", "structured_outputs")
            : undefined,
          temperature: samplingParameters
            ? hasAnyString(samplingParameters, "temperature")
            : undefined,
        }),
      });
    });
  },
};
