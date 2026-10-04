import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  pricePerMillion,
  timestampFromDateInput,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const responseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      date: z.string().optional(),
      created: z.number().optional(),
      context_length: z.number(),
      max_completion_tokens: z.number(),
      reasoning: z.boolean(),
      architecture: z.object({ modality: z.string() }),
      pricing: z.object({
        prompt: z.union([z.string(), z.number()]).nullish(),
        completion: z.union([z.string(), z.number()]).nullish(),
        input_cache_read: z.union([z.string(), z.number()]).nullish(),
      }),
    }),
  ),
});

export const aionProvider: ProviderDefinition = {
  name: "aion",
  outputDirectory: "data/providers/aion/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const response = await fetchJson("https://api.aionlabs.ai/v1/models", {
      schema: responseSchema,
      label: "aion models API error",
    });
    progress?.tick(
      `https://api.aionlabs.ai/v1/models (${response.data.length})`,
      true,
    );
    return response.data.map((model) => {
      const [inputTypes, outputTypes] = model.architecture.modality.split("->");
      const input = filterModalities(inputTypes?.split("+"));
      const output = filterModalities(outputTypes?.split("+"));
      return compactObject({
        id: model.id,
        name: model.name,
        release_date:
          timestampFromDateInput(model.date) ??
          timestampFromUnixSeconds(model.created),
        limit: {
          context: model.context_length,
          output: model.max_completion_tokens,
        },
        modalities: compactObject({ input, output }),
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: model.reasoning,
          temperature: true,
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing.prompt),
          output: pricePerMillion(model.pricing.completion),
          cache_read: pricePerMillion(model.pricing.input_cache_read),
        }),
      });
    });
  },
};
