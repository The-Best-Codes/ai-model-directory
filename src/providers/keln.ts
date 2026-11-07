import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  pricePerMillion,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { filterModalities, hasAttachmentSource } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  added: z.number().nullish(),
  context_length: z.number().nullish(),
  input_modalities: z.array(z.string()).nullish(),
  output_modalities: z.array(z.string()).nullish(),
  pricing: z
    .object({
      prompt: z.string().nullish(),
      completion: z.string().nullish(),
      input_cache_read: z.string().nullish(),
    })
    .nullish(),
  reasoning: z.unknown().optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const kelnProvider: ProviderDefinition = {
  name: "keln",
  outputDirectory: "data/providers/keln/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.keln.ai/v1/models", {
      schema: responseSchema,
      label: "Keln API error",
    });

    progress?.tick(`api.keln.ai/v1/models (${response.data.length})`, true);

    return response.data
      .filter((model) => model.output_modalities?.includes("text"))
      .map((model) =>
        compactObject({
          id: model.id,
          name: model.id,
          release_date: timestampFromUnixSeconds(model.added),
          features: compactObject({
            attachment: hasAttachmentSource(model.input_modalities),
            reasoning: model.reasoning != null,
            tool_call: true,
            structured_output: true,
          }),
          pricing: compactObject({
            input: pricePerMillion(model.pricing?.prompt),
            output: pricePerMillion(model.pricing?.completion),
            cache_read: pricePerMillion(model.pricing?.input_cache_read),
          }),
          limit: compactObject({
            context: integerGreaterThanZero(model.context_length),
          }),
          modalities: compactObject({
            input: filterModalities(model.input_modalities),
            output: filterModalities(model.output_modalities),
          }),
        }),
      );
  },
};
