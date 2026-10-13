import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  pricePerMillion,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  created: z.number(),
  pricing: z
    .object({
      prompt: z.string().optional(),
      completion: z.string().optional(),
    })
    .optional(),
  capabilities: z
    .object({
      vision: z.boolean().optional(),
      tools: z.boolean().optional(),
      structured_outputs: z.boolean().optional(),
      reasoning: z.boolean().optional(),
    })
    .optional(),
  supported_parameters: z
    .object({
      temperature: z.boolean().optional(),
    })
    .optional(),
  limits: z
    .object({
      max_context_length: z.number().nullish(),
      max_completion_tokens: z.number().nullish(),
    })
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const cerebrasProvider: ProviderDefinition = {
  name: "cerebras",
  outputDirectory: "data/providers/cerebras/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://api.cerebras.ai/public/v1/models",
      {
        schema: responseSchema,
        label: "Cerebras API error",
      },
    );

    progress?.tick(
      `api.cerebras.ai/public/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const vision = model.capabilities?.vision ?? false;
      const input: ModelModality[] = vision ? ["image", "text"] : ["text"];

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        release_date:
          model.created > 0
            ? timestampFromUnixSeconds(model.created)
            : undefined,
        features: compactObject({
          attachment: vision,
          reasoning: model.capabilities?.reasoning,
          tool_call: model.capabilities?.tools,
          structured_output: model.capabilities?.structured_outputs,
          temperature: model.supported_parameters?.temperature,
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing?.prompt),
          output: pricePerMillion(model.pricing?.completion),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.limits?.max_context_length),
          output: integerGreaterThanZero(model.limits?.max_completion_tokens),
        }),
        modalities: { input, output: ["text"] as ModelModality[] },
      });
    });
  },
};
