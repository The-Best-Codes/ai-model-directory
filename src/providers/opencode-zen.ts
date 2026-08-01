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

const repositoryBaseUrl =
  "https://raw.githubusercontent.com/anomalyco/models.dev/refs/heads/dev";

const apiModelSchema = z.object({
  id: z.string(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

const detailsSchema = z.object({
  base_model: z.string().optional(),
  base_model_omit: z.array(z.string()).optional(),
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
  reasoning_options: z.array(z.unknown()).optional(),
  interleaved: z.unknown().optional(),
  cost: z
    .object({
      input: z.number().optional(),
      output: z.number().optional(),
      reasoning: z.number().optional(),
      cache_read: z.number().optional(),
      cache_write: z.number().optional(),
      input_audio: z.number().optional(),
      output_audio: z.number().optional(),
    })
    .optional(),
  limit: z
    .object({
      context: z.number().optional(),
      input: z.number().optional(),
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

function mergeModelDetails(
  base: ModelDetails,
  overrides: ModelDetails,
): ModelDetails {
  const merged = {
    ...base,
    ...overrides,
    cost:
      base.cost || overrides.cost
        ? { ...base.cost, ...overrides.cost }
        : undefined,
    limit:
      base.limit || overrides.limit
        ? { ...base.limit, ...overrides.limit }
        : undefined,
    modalities:
      base.modalities || overrides.modalities
        ? { ...base.modalities, ...overrides.modalities }
        : undefined,
  };

  for (const path of overrides.base_model_omit ?? []) {
    const [group, field] = path.split(".");

    if (!field) {
      delete merged[group as keyof ModelDetails];
      continue;
    }

    const value = merged[group as "cost" | "limit" | "modalities"];
    if (value && typeof value === "object") {
      delete value[field as keyof typeof value];
    }
  }

  return detailsSchema.parse(merged);
}

async function fetchModelDetails(
  path: string,
  cache: Map<string, Promise<ModelDetails>>,
): Promise<ModelDetails> {
  const cached = cache.get(path);
  if (cached) {
    return cached;
  }

  const request = (async () => {
    const text = await fetchText(`${repositoryBaseUrl}/${path}.toml`, {
      label: `OpenCode Zen model details error (${path})`,
    });
    const details = parseModelDetails(text);

    if (!details.base_model) {
      return details;
    }

    const base = await fetchModelDetails(`models/${details.base_model}`, cache);
    return mergeModelDetails(base, details);
  })();

  cache.set(path, request);
  return request;
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
    const detailsCache = new Map<string, Promise<ModelDetails>>();

    for (const model of response.data) {
      try {
        const details = await fetchModelDetails(
          `providers/opencode/models/${model.id}`,
          detailsCache,
        );
        detailsById.set(model.id, details);
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
          reasoning:
            details?.reasoning ??
            (details?.reasoning_options || details?.interleaved
              ? true
              : undefined),
          structured_output: details?.structured_output,
          temperature: details?.temperature,
          tool_call: details?.tool_call,
        }),
        pricing: compactObject({
          input: nonNegativeNumber(details?.cost?.input),
          output: nonNegativeNumber(details?.cost?.output),
          reasoning: nonNegativeNumber(details?.cost?.reasoning),
          cache_read: nonNegativeNumber(details?.cost?.cache_read),
          cache_write: nonNegativeNumber(details?.cost?.cache_write),
          input_audio: nonNegativeNumber(details?.cost?.input_audio),
          output_audio: nonNegativeNumber(details?.cost?.output_audio),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(details?.limit?.context),
          input: integerGreaterThanZero(details?.limit?.input),
          output: integerGreaterThanZero(details?.limit?.output),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
