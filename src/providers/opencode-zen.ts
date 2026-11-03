import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromDateInput,
} from "../lib/model.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const priceSchema = z
  .object({
    price: z.number().optional(),
    cache: z
      .object({
        read: z.number().optional(),
        write: z.number().optional(),
      })
      .optional(),
  })
  .optional();

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
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
  capabilities: z
    .object({
      tools: z.object({ supported: z.boolean().optional() }).optional(),
      reasoning: z.object({ supported: z.boolean().optional() }).optional(),
      structured_output: z.boolean().optional(),
      temperature: z.boolean().optional(),
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
      text: z
        .object({
          input: priceSchema,
          output: priceSchema,
        })
        .optional(),
      audio: z
        .object({
          input: priceSchema,
          output: priceSchema,
        })
        .optional(),
    })
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

const mimeModalities: Record<string, string> = {
  image: "image",
  audio: "audio",
  video: "video",
  application: "file",
};

function normalizeModalities(values: readonly string[] | undefined) {
  return filterModalities(
    values?.map((value) => {
      const [type, subtype] = value.split("/");
      return subtype ? (mimeModalities[type!] ?? value) : value;
    }),
  );
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

    return response.data.map((model) => {
      const input = normalizeModalities(model.modalities?.input);
      const output = normalizeModalities(model.modalities?.output);
      const text = model.cost?.text;
      const audio = model.cost?.audio;

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        knowledge_cutoff: timestampFromDateInput(model.knowledge),
        release_date: timestampFromDateInput(model.release_date),
        last_updated: timestampFromDateInput(model.last_updated),
        open_weights: model.open_weights,
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: model.capabilities?.reasoning?.supported,
          structured_output: model.capabilities?.structured_output,
          temperature: model.capabilities?.temperature,
          tool_call: model.capabilities?.tools?.supported,
        }),
        pricing: compactObject({
          input: nonNegativeNumber(text?.input?.price),
          output: nonNegativeNumber(text?.output?.price),
          cache_read: nonNegativeNumber(text?.input?.cache?.read),
          cache_write: nonNegativeNumber(text?.input?.cache?.write),
          input_audio: nonNegativeNumber(audio?.input?.price),
          output_audio: nonNegativeNumber(audio?.output?.price),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.limit?.context),
          input: integerGreaterThanZero(model.limit?.input),
          output: integerGreaterThanZero(model.limit?.output),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
