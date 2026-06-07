import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, pricePerMillion } from "../lib/model.ts";
import { filterModalities } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  attachment: z.boolean(),
  pricing: z.object({
    prompt: z.string(),
    completion: z.string(),
  }),
  modalities: z.object({
    input: z.array(z.string()),
    output: z.array(z.string()),
  }),
  reasoning: z.boolean(),
  limit: z.object({
    context: z.number().nullable(),
    output: z.number().nullable(),
  }),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const routingRunProvider: ProviderDefinition = {
  name: "routing-run",
  outputDirectory: "data/providers/routing-run/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://ai.routing.sh/v1/models", {
      schema: responseSchema,
      label: "routing.run API error",
    });

    progress?.tick(`ai.routing.sh/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const input = filterModalities(model.modalities.input);
      const output = filterModalities(model.modalities.output);

      return compactObject({
        id: model.id,
        name: model.name,
        features: compactObject({
          attachment: model.attachment || undefined,
          reasoning: model.reasoning || undefined,
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing.prompt),
          output: pricePerMillion(model.pricing.completion),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.limit.context),
          output: integerGreaterThanZero(model.limit.output),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
