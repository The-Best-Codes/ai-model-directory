import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import { allModalities, hasAnyString } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  created: z.number().optional(),
  context_window: z.number().optional(),
  max_output_tokens: z.number().optional(),
  capabilities: z.array(z.string()).optional(),
  currency: z.string().optional(),
  input_per_1m: z.string().optional(),
  output_per_1m: z.string().optional(),
  cached_input_per_1m: z.string().optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

const modalityByCapability = new Map<string, ModelModality>([
  ["vision", "image"],
  ["document", "file"],
  ["video", "video"],
  ["audio", "audio"],
]);

function parsePrice(value: string | undefined): number | undefined {
  return value === undefined ? undefined : nonNegativeNumber(Number(value));
}

function inputModalities(
  capabilities: readonly string[] | undefined,
): ModelModality[] | undefined {
  if (!capabilities) {
    return undefined;
  }

  const set = new Set<ModelModality>(["text"]);

  for (const capability of capabilities) {
    const modality = modalityByCapability.get(capability.toLowerCase());

    if (modality) {
      set.add(modality);
    }
  }

  return allModalities.filter((entry) => set.has(entry));
}

export const aiandProvider: ProviderDefinition = {
  name: "aiand",
  outputDirectory: "data/providers/aiand/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.aiand.com/v1/models", {
      schema: responseSchema,
      label: "ai& API error",
    });

    progress?.tick(`api.aiand.com/v1/models (${response.data.length})`, true);

    return response.data.map((model) => {
      const capabilities = model.capabilities;
      const input = inputModalities(capabilities);
      const usd = model.currency?.toLowerCase() === "usd";

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: input ? input.length > 1 : undefined,
          reasoning: capabilities
            ? hasAnyString(capabilities, "reasoning")
            : undefined,
          tool_call: capabilities
            ? hasAnyString(capabilities, "tool_calling")
            : undefined,
        }),
        pricing: usd
          ? compactObject({
              input: parsePrice(model.input_per_1m),
              output: parsePrice(model.output_per_1m),
              cache_read: parsePrice(model.cached_input_per_1m),
            })
          : undefined,
        limit: compactObject({
          context: integerGreaterThanZero(model.context_window),
          output: integerGreaterThanZero(model.max_output_tokens),
        }),
        modalities: compactObject({
          input,
          output: input ? (["text"] as ModelModality[]) : undefined,
        }),
      });
    });
  },
};
