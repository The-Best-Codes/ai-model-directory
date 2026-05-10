import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  timestampFromDateInput,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  owned_by: z.string(),
});

const listResponseSchema = z.object({
  object: z.literal("list"),
  data: z.array(apiModelSchema),
});

const modelDetailsSchema = z.object({
  details: z.object({
    parent_model: z.string(),
    format: z.string(),
    family: z.string(),
    families: z.array(z.string()).nullable(),
    parameter_size: z.string(),
    quantization_level: z.string(),
  }),
  model_info: z.record(
    z.string(),
    z.union([z.number(), z.string(), z.boolean(), z.null()]),
  ),
  capabilities: z.array(z.string()),
  modified_at: z.string().optional(),
});

async function fetchModelDetails(
  modelId: string,
): Promise<z.infer<typeof modelDetailsSchema> | null> {
  try {
    const response = await fetch("https://ollama.com/api/show", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: modelId }),
      signal: AbortSignal.timeout(60_000),
    });

    if (!response.ok) {
      return null;
    }

    return modelDetailsSchema.parse(await response.json());
  } catch {
    return null;
  }
}

function findContextLength(
  modelInfo: Record<string, unknown>,
): number | undefined {
  for (const value of Object.values(modelInfo)) {
    if (typeof value === "number" && value > 0 && value <= 1_000_000_000) {
      return value;
    }
  }
  return undefined;
}

function parseCapabilities(capabilities: string[]): {
  features: NonNullable<ModelRecord["features"]>;
  modalities: NonNullable<ModelRecord["modalities"]>;
} {
  const features: NonNullable<ModelRecord["features"]> = {};
  const modalities: { input: ModelModality[]; output: ModelModality[] } = {
    input: ["text" as ModelModality],
    output: ["text" as ModelModality],
  };

  const capsLower = capabilities.map((c) => c.toLowerCase());

  if (capsLower.includes("thinking")) {
    features.reasoning = true;
  }

  if (capsLower.includes("tools")) {
    features.tool_call = true;
  }

  if (capsLower.includes("vision")) {
    modalities.input.push("image");
  }

  return { features, modalities };
}

export const ollamaCloudProvider: ProviderDefinition = {
  name: "ollama-cloud",
  outputDirectory: "data/providers/ollama-cloud/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const listResponse = await fetchJson("https://ollama.com/v1/models", {
      schema: listResponseSchema,
      label: "Ollama models list error",
    });

    progress?.tick(`ollama.com/v1/models (${listResponse.data.length})`, true);

    progress?.beginPhase("fetching details", listResponse.data.length);

    const detailsResults = await Promise.all(
      listResponse.data.map(async (model) => {
        const details = await fetchModelDetails(model.id);
        progress?.tick(model.id, details !== null);
        return { model, details };
      }),
    );

    return detailsResults.map(({ model, details }) => {
      let contextLength: number | undefined;

      if (details?.model_info) {
        contextLength = findContextLength(details.model_info);
      }

      const { features, modalities } = details?.capabilities
        ? parseCapabilities(details.capabilities)
        : {
            features: {},
            modalities: {
              input: ["text" as ModelModality],
              output: ["text" as ModelModality],
            },
          };

      return compactObject({
        id: model.id,
        name: model.id,
        release_date:
          model.created > 0
            ? timestampFromUnixSeconds(model.created)
            : undefined,
        last_updated: details?.modified_at
          ? timestampFromDateInput(details.modified_at, { rejectEpoch: true })
          : undefined,
        features: Object.keys(features).length > 0 ? features : undefined,
        limit: compactObject({
          context: integerGreaterThanZero(contextLength),
        }),
        modalities: compactObject(modalities),
      });
    });
  },
};
