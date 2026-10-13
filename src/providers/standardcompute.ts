import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import {
  filterModalities,
  hasAnyString,
  hasAttachmentSource,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  display_name: z.string().optional(),
  context_length: z.number().optional(),
  architecture: z
    .object({
      input_modalities: z.array(z.string()).optional(),
      output_modalities: z.array(z.string()).optional(),
    })
    .optional(),
  supported_parameters: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const standardcomputeProvider: ProviderDefinition = {
  name: "standardcompute",
  outputDirectory: "data/providers/standardcompute/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.stdcmpt.com/v1/models", {
      schema: responseSchema,
      label: "Standard Compute API error",
    });

    progress?.tick(`api.stdcmpt.com/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const parameters = model.supported_parameters;

      return compactObject({
        id: model.id,
        name: model.display_name ?? model.id,
        features: compactObject({
          attachment: hasAttachmentSource(model.architecture?.input_modalities),
          reasoning: parameters
            ? hasAnyString(parameters, "reasoning", "reasoning_effort")
            : undefined,
          tool_call: parameters
            ? hasAnyString(parameters, "tools", "tool_choice")
            : undefined,
          structured_output: parameters
            ? hasAnyString(parameters, "response_format")
            : undefined,
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
        }),
        modalities: compactObject({
          input: filterModalities(model.architecture?.input_modalities),
          output: filterModalities(model.architecture?.output_modalities),
        }),
      });
    });
  },
};
