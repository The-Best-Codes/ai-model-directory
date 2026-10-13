import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, nonNegativeNumber } from "../lib/model.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  context_length: z.number().optional(),
  pricing: z
    .object({
      input: z.number().optional(),
      output: z.number().optional(),
    })
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const umansAiProvider: ProviderDefinition = {
  name: "umans-ai",
  outputDirectory: "data/providers/umans-ai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.code.umans.ai/v1/models", {
      schema: responseSchema,
      label: "Umans AI API error",
    });

    progress?.tick(
      `api.code.umans.ai/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) =>
      compactObject({
        id: model.id,
        name: model.id,
        pricing: compactObject({
          input: nonNegativeNumber(model.pricing?.input),
          output: nonNegativeNumber(model.pricing?.output),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
        }),
      }),
    );
  },
};
