import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, pricePerMillion } from "../lib/model.ts";
import {
  filterModalities,
  hasAttachmentSupport,
  hasAnyString,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const responseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      display_name: z.string(),
      context_window: z.number().nullish(),
      architecture: z.object({
        input_modalities: z.array(z.string()),
        output_modalities: z.array(z.string()),
      }),
      supported_parameters: z.array(z.string()).optional(),
      pricing: z.object({
        per_input_token: z.union([z.string(), z.number()]).nullish(),
        per_input_text_token: z.union([z.string(), z.number()]).nullish(),
        per_token: z.union([z.string(), z.number()]).nullish(),
        per_output_token: z.union([z.string(), z.number()]).nullish(),
        per_cached_input_token: z.union([z.string(), z.number()]).nullish(),
        per_input_audio_token: z.union([z.string(), z.number()]).nullish(),
      }),
    }),
  ),
});

export const nagaProvider: ProviderDefinition = {
  name: "naga",
  outputDirectory: "data/providers/naga/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const response = await fetchJson("https://api.naga.ac/v1/models", {
      schema: responseSchema,
      label: "naga models API error",
    });
    progress?.tick(
      `https://api.naga.ac/v1/models (${response.data.length})`,
      true,
    );
    return response.data.map((model) => {
      const input = filterModalities(model.architecture.input_modalities);
      const output = filterModalities(model.architecture.output_modalities);
      const parameters = model.supported_parameters;
      return compactObject({
        id: model.id,
        name: model.display_name,
        limit: compactObject({
          context: integerGreaterThanZero(model.context_window),
        }),
        modalities: compactObject({ input, output }),
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: parameters
            ? hasAnyString(parameters, "reasoning_effort")
            : undefined,
          tool_call: parameters
            ? hasAnyString(
                parameters,
                "tools",
                "tool_choice",
                "parallel_tool_calls",
              )
            : undefined,
          structured_output:
            parameters && input?.includes("text") && output?.includes("text")
              ? hasAnyString(parameters, "response_format")
              : undefined,
          temperature: parameters
            ? hasAnyString(parameters, "temperature")
            : undefined,
        }),
        pricing: compactObject({
          input: pricePerMillion(
            model.pricing.per_input_text_token ??
              model.pricing.per_input_token ??
              model.pricing.per_token,
          ),
          output:
            output?.length === 1 && output.includes("audio")
              ? undefined
              : pricePerMillion(model.pricing.per_output_token),
          output_audio:
            output?.length === 1 && output.includes("audio")
              ? pricePerMillion(model.pricing.per_output_token)
              : undefined,
          cache_read: pricePerMillion(model.pricing.per_cached_input_token),
          input_audio: pricePerMillion(model.pricing.per_input_audio_token),
        }),
      });
    });
  },
};
