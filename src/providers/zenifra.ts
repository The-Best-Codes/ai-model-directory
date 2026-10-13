import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, nonNegativeNumber } from "../lib/model.ts";
import {
  filterModalities,
  hasAnyString,
  hasAttachmentSource,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  context_length: z.number().optional(),
  max_output_tokens: z.number().optional(),
  pricing: z
    .object({
      input: z.number().optional(),
      output: z.number().optional(),
      cache_read_input: z.number().optional(),
      unit: z.string().optional(),
    })
    .optional(),
  capabilities: z
    .object({
      vision: z.boolean().optional(),
      pdf_input: z.boolean().optional(),
      audio_input: z.boolean().optional(),
      function_calling: z.boolean().optional(),
      response_schema: z.boolean().optional(),
      structured_outputs: z.boolean().optional(),
      reasoning: z.object({ supported: z.boolean().optional() }).optional(),
    })
    .optional(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
  supported_parameters: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const zenifraProvider: ProviderDefinition = {
  name: "zenifra",
  outputDirectory: "data/providers/zenifra/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://ai.zenifra.com/v1/models", {
      schema: responseSchema,
      label: "Zenifra API error",
    });

    progress?.tick(`ai.zenifra.com/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const capabilities = model.capabilities;
      const input = filterModalities([
        ...(model.input_modalities ?? ["text"]),
        ...(capabilities?.vision ? ["image"] : []),
        ...(capabilities?.pdf_input ? ["file"] : []),
        ...(capabilities?.audio_input ? ["audio"] : []),
      ]);
      const perMillion = model.pricing?.unit === "per_million_tokens";

      return compactObject({
        id: model.id,
        name: model.id,
        features: compactObject({
          attachment: hasAttachmentSource(input),
          reasoning: capabilities?.reasoning?.supported,
          tool_call: capabilities?.function_calling,
          structured_output:
            capabilities?.structured_outputs ?? capabilities?.response_schema,
          temperature: model.supported_parameters
            ? hasAnyString(model.supported_parameters, "temperature")
            : undefined,
        }),
        pricing: perMillion
          ? compactObject({
              input: nonNegativeNumber(model.pricing?.input),
              output: nonNegativeNumber(model.pricing?.output),
              cache_read: nonNegativeNumber(model.pricing?.cache_read_input),
            })
          : undefined,
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_output_tokens),
        }),
        modalities: compactObject({
          input,
          output: filterModalities(model.output_modalities ?? ["text"]),
        }),
      });
    });
  },
};
