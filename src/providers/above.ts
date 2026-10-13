import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  context_length: z.number().optional(),
  max_output_tokens: z.number().optional(),
  max_completion_tokens: z.number().optional(),
  capabilities: z
    .object({
      supports_tool_calls: z.boolean().optional(),
      supports_reasoning: z.boolean().optional(),
      supports_vision: z.boolean().optional(),
      supports_structured_output: z.boolean().optional(),
    })
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const aboveProvider: ProviderDefinition = {
  name: "above",
  outputDirectory: "data/providers/above/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.above.dev/v1/models", {
      schema: responseSchema,
      label: "Above API error",
    });

    progress?.tick(`api.above.dev/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const vision = model.capabilities?.supports_vision;
      const input: ModelModality[] | undefined =
        vision === undefined
          ? undefined
          : vision
            ? ["text", "image"]
            : ["text"];

      return compactObject({
        id: model.id,
        name: model.id,
        features: compactObject({
          attachment: vision,
          reasoning: model.capabilities?.supports_reasoning,
          tool_call: model.capabilities?.supports_tool_calls,
          structured_output: model.capabilities?.supports_structured_output,
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(
            model.max_output_tokens ?? model.max_completion_tokens,
          ),
        }),
        modalities: compactObject({
          input,
          output: input ? (["text"] as ModelModality[]) : undefined,
        }),
      });
    });
  },
};
