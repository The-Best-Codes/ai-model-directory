import { parse } from "smol-toml";
import { z } from "zod";

import { fetchJson, fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromDateInput,
} from "../lib/model.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const modelsBaseUrl =
  "https://raw.githubusercontent.com/anomalyco/models.dev/refs/heads/dev/providers/opencode/models";

const apiModelSchema = z.object({
  id: z.string(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

const detailsSchema = z.object({
  name: z.string().optional(),
  release_date: z.string().optional(),
  last_updated: z.string().optional(),
  knowledge: z.string().optional(),
  attachment: z.boolean().optional(),
  reasoning: z.boolean().optional(),
  temperature: z.boolean().optional(),
  tool_call: z.boolean().optional(),
  structured_output: z.boolean().optional(),
  open_weights: z.boolean().optional(),
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
  limit: z
    .object({
      context: z.number().optional(),
      output: z.number().optional(),
    })
    .optional(),
  modalities: z
    .object({
      input: z.array(z.string()).optional(),
      output: z.array(z.string()).optional(),
    })
    .optional(),
});

type ModelDetails = z.infer<typeof detailsSchema>;

function parseModelDetails(text: string): ModelDetails {
  return detailsSchema.parse(parse(text));
}

export const opencodeZenProvider: ProviderDefinition = {
  name: "opencode-zen",
  outputDirectory: "data/providers/opencode-zen/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://opencode.ai/zen/v1/models", {
      schema: responseSchema,
      label: "OpenCode Zen API error",
    });

    progress?.tick(`opencode.ai/zen/v1/models (${response.data.length})`, true);
    progress?.beginPhase("details", response.data.length);

    const detailsById = new Map<string, ModelDetails>();

    for (const model of response.data) {
      try {
        const text = await fetchText(`${modelsBaseUrl}/${model.id}.toml`, {
          label: `OpenCode Zen model details error (${model.id})`,
        });

        detailsById.set(model.id, parseModelDetails(text));
        progress?.tick(model.id, true);
      } catch {
        progress?.tick(model.id, false);
      }
    }

    return response.data.map((model) => {
      const details = detailsById.get(model.id);
      const input = filterModalities(details?.modalities?.input);
      const output = filterModalities(details?.modalities?.output);

      return compactObject({
        id: model.id,
        name: details?.name ?? model.id,
        knowledge_cutoff: timestampFromDateInput(details?.knowledge),
        release_date: timestampFromDateInput(details?.release_date),
        last_updated: timestampFromDateInput(details?.last_updated),
        open_weights: details?.open_weights,
        features: compactObject({
          attachment: details?.attachment ?? hasAttachmentSupport(input),
          reasoning: details?.reasoning,
          structured_output: details?.structured_output,
          temperature: details?.temperature,
          tool_call: details?.tool_call,
        }),
        pricing: compactObject({
          input: nonNegativeNumber(details?.cost?.input),
          output: nonNegativeNumber(details?.cost?.output),
          cache_read: nonNegativeNumber(details?.cost?.cache_read),
          cache_write: nonNegativeNumber(details?.cost?.cache_write),
          input_audio: nonNegativeNumber(details?.cost?.input_audio),
          output_audio: nonNegativeNumber(details?.cost?.output_audio),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(details?.limit?.context),
          output: integerGreaterThanZero(details?.limit?.output),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
