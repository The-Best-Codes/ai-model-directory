import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromDateInput,
} from "../lib/model.ts";
import { filterModalities } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const modelSchema = z.object({
  id: z.string(),
  name: z.string(),
  attachment: z.boolean().optional(),
  reasoning: z.boolean().optional(),
  tool_call: z.boolean().optional(),
  temperature: z.boolean().optional(),
  structured_output: z.boolean().optional(),
  open_weights: z.boolean().optional(),
  knowledge: z.string().optional(),
  release_date: z.string().optional(),
  last_updated: z.string().optional(),
  modalities: z
    .object({
      input: z.array(z.string()).optional(),
      output: z.array(z.string()).optional(),
    })
    .optional(),
  limit: z
    .object({
      context: z.number().optional(),
      input: z.number().optional(),
      output: z.number().optional(),
    })
    .optional(),
  cost: z
    .object({
      input: z.number().optional(),
      output: z.number().optional(),
      cache_read: z.number().optional(),
      cache_write: z.number().optional(),
      input_audio: z.number().optional(),
      output_audio: z.number().optional(),
    })
    .optional(),
});

const responseSchema = z.object({
  neon: z.object({
    models: z.record(z.string(), modelSchema),
  }),
});

function normalizeModalities(values: readonly string[] | undefined) {
  return filterModalities(
    values?.map((value) => (value.toLowerCase() === "pdf" ? "file" : value)),
  );
}

export const neonProvider: ProviderDefinition = {
  name: "neon",
  outputDirectory: "data/providers/neon/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://neon.com/models.json", {
      schema: responseSchema,
      label: "Neon models error",
    });
    const models = Object.values(response.neon.models);

    progress?.tick(`neon.com/models.json (${models.length})`, true);

    return models.map((model) =>
      compactObject({
        id: model.id,
        name: model.name,
        knowledge_cutoff: timestampFromDateInput(model.knowledge),
        release_date: timestampFromDateInput(model.release_date),
        last_updated: timestampFromDateInput(model.last_updated),
        open_weights: model.open_weights,
        features: compactObject({
          attachment: model.attachment,
          reasoning: model.reasoning,
          tool_call: model.tool_call,
          structured_output: model.structured_output,
          temperature: model.temperature,
        }),
        pricing: compactObject({
          input: nonNegativeNumber(model.cost?.input),
          output: nonNegativeNumber(model.cost?.output),
          cache_read: nonNegativeNumber(model.cost?.cache_read),
          cache_write: nonNegativeNumber(model.cost?.cache_write),
          input_audio: nonNegativeNumber(model.cost?.input_audio),
          output_audio: nonNegativeNumber(model.cost?.output_audio),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.limit?.context),
          input: integerGreaterThanZero(model.limit?.input),
          output: integerGreaterThanZero(model.limit?.output),
        }),
        modalities: compactObject({
          input: normalizeModalities(model.modalities?.input),
          output: normalizeModalities(model.modalities?.output),
        }),
      }),
    );
  },
};
