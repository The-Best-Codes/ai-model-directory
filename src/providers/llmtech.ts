import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, nonNegativeNumber } from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import { hasAnyString } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  context_length: z.number().optional(),
  max_output_tokens: z.number().optional(),
  features: z.array(z.string()).optional(),
  pricing: z
    .object({
      currency: z.string().optional(),
      input: z.number().optional(),
      output: z.number().optional(),
      cached_input: z.number().optional(),
    })
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const llmtechProvider: ProviderDefinition = {
  name: "llmtech",
  outputDirectory: "data/providers/llmtech/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.llmtech.eu/v1/models", {
      schema: responseSchema,
      label: "LLM Tech API error",
    });

    progress?.tick(`api.llmtech.eu/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const features = model.features;
      const vision = features ? hasAnyString(features, "vision") : undefined;
      const usd = model.pricing?.currency?.toUpperCase() === "USD";
      const input: ModelModality[] | undefined =
        vision === undefined
          ? undefined
          : vision
            ? ["text", "image"]
            : ["text"];

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        features: compactObject({
          attachment: vision,
          reasoning: features ? hasAnyString(features, "reasoning") : undefined,
          tool_call: features ? hasAnyString(features, "tools") : undefined,
          structured_output: features
            ? hasAnyString(features, "structured_outputs")
            : undefined,
        }),
        pricing: usd
          ? compactObject({
              input: nonNegativeNumber(model.pricing?.input),
              output: nonNegativeNumber(model.pricing?.output),
              cache_read: nonNegativeNumber(model.pricing?.cached_input),
            })
          : undefined,
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_output_tokens),
        }),
        modalities: compactObject({
          input,
          output: input ? (["text"] as ModelModality[]) : undefined,
        }),
      });
    });
  },
};
