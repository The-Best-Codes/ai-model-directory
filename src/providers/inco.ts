import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { filterModalities, hasAttachmentSource } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  created: z.number().optional(),
  context_length: z.number().optional(),
  pricing: z
    .object({
      input: z.number().optional(),
      cached_input: z.number().optional(),
      output: z.number().optional(),
    })
    .optional(),
  capabilities: z
    .object({
      reasoning_effort: z.boolean().optional(),
    })
    .optional(),
  modalities: z
    .object({
      input: z.array(z.string()).optional(),
      output: z.array(z.string()).optional(),
    })
    .optional(),
  model_card_url: z.string().optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const incoProvider: ProviderDefinition = {
  name: "inco",
  outputDirectory: "data/providers/inco/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.inco.ai/v1/models", {
      schema: responseSchema,
      label: "Inco API error",
    });

    progress?.tick(`api.inco.ai/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const input = filterModalities(model.modalities?.input);

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        release_date: timestampFromUnixSeconds(model.created),
        open_weights: model.model_card_url?.startsWith(
          "https://huggingface.co/",
        )
          ? true
          : undefined,
        features: compactObject({
          attachment: hasAttachmentSource(model.modalities?.input),
          reasoning: model.capabilities?.reasoning_effort,
        }),
        pricing: compactObject({
          input: nonNegativeNumber(model.pricing?.input),
          output: nonNegativeNumber(model.pricing?.output),
          cache_read: nonNegativeNumber(model.pricing?.cached_input),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
        }),
        modalities: compactObject({
          input,
          output: filterModalities(model.modalities?.output),
        }),
      });
    });
  },
};
