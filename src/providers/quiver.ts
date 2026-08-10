import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import {
  filterModalities,
  hasAnyString,
  hasAttachmentSupport,
} from "./helpers.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  context_length: z.number().optional(),
  created: z.number(),
  id: z.string(),
  input_modalities: z.array(z.string()).optional(),
  max_output_length: z.number().optional(),
  name: z.string().optional(),
  output_modalities: z.array(z.string()).optional(),
  supported_sampling_parameters: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function filterOutputModalities(
  values: readonly string[] | undefined,
): ModelModality[] | undefined {
  if (!values || values.length === 0) {
    return undefined;
  }

  return filterModalities(
    values.map((value) =>
      value.trim().toLowerCase() === "svg" ? "image" : value,
    ),
  );
}

export const quiverProvider: ProviderDefinition = {
  name: "quiver",
  outputDirectory: "data/providers/quiver/models",
  async fetchModels(progress) {
    const apiKey = process.env.QUIVER_AI_API_KEY;

    if (!apiKey) {
      throw new Error("QUIVER_AI_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.quiver.ai/v1/models", {
      schema: responseSchema,
      headers: withBearerToken(apiKey),
      label: "Quiver API error",
    });

    progress?.tick(`api.quiver.ai/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const input = filterModalities(model.input_modalities);

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          temperature: hasAnyString(
            model.supported_sampling_parameters,
            "temperature",
          ),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_output_length),
        }),
        modalities: compactObject({
          input,
          output: filterOutputModalities(model.output_modalities),
        }),
      });
    });
  },
};
