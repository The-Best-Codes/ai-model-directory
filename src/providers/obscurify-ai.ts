import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, pricePerMillion } from "../lib/model.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  context_length: z.number().nullish(),
  tools: z.boolean().nullish(),
  pricing: z
    .object({
      prompt: z.number().nullish(),
      completion: z.number().nullish(),
    })
    .nullish(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const obscurifyAiProvider: ProviderDefinition = {
  name: "obscurify-ai",
  outputDirectory: "data/providers/obscurify-ai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://obscurify.ai/v1/models", {
      schema: responseSchema,
      label: "Obscurify.ai API error",
    });

    progress?.tick(`obscurify.ai/v1/models (${response.data.length})`, true);

    return response.data.map((model) =>
      compactObject({
        id: model.id,
        name: model.name ?? model.id,
        features: compactObject({
          tool_call: model.tools ?? undefined,
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing?.prompt),
          output: pricePerMillion(model.pricing?.completion),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
        }),
      }),
    );
  },
};
