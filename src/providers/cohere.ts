import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import { hasAnyString } from "./helpers.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  name: z.string(),
  endpoints: z.array(z.string()),
  context_length: z.number().nullish(),
  features: z.array(z.string()).nullish(),
  sampling_defaults: z
    .object({
      temperature: z.number().optional(),
    })
    .nullish(),
});

const responseSchema = z.object({ models: z.array(apiModelSchema) });

function inferModalities(
  endpoints: readonly string[],
  features: readonly string[] | null | undefined,
): { input?: ModelModality[]; output?: ModelModality[] } {
  if (endpoints.includes("transcriptions")) {
    return { input: ["audio"], output: ["text"] };
  }

  if (endpoints.includes("embed_image")) {
    return { input: ["image"] };
  }

  if (endpoints.includes("embed")) {
    return { input: ["text"] };
  }

  if (features?.includes("vision")) {
    return { input: ["text", "image"], output: ["text"] };
  }

  if (
    endpoints.includes("chat") ||
    endpoints.includes("generate") ||
    endpoints.includes("summarize")
  ) {
    return { input: ["text"], output: ["text"] };
  }

  return {};
}

export const cohereProvider: ProviderDefinition = {
  name: "cohere",
  outputDirectory: "data/providers/cohere/models",
  async fetchModels(progress) {
    const apiKey = process.env.COHERE_API_KEY;

    if (!apiKey) {
      throw new Error("COHERE_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.cohere.com/v1/models", {
      schema: responseSchema,
      headers: withBearerToken(apiKey),
      label: "Cohere API error",
    });

    progress?.tick(
      `api.cohere.com/v1/models (${response.models.length})`,
      true,
    );

    return response.models.map((model) => {
      const modalities = inferModalities(model.endpoints, model.features);
      const hasAttachments = modalities.input?.some(
        (modality) => modality !== "text",
      );

      return compactObject({
        id: model.name,
        name: model.name,
        features: compactObject({
          attachment: hasAttachments,
          reasoning:
            model.features !== null
              ? hasAnyString(model.features, "reasoning")
              : undefined,
          tool_call:
            model.features !== null
              ? hasAnyString(
                  model.features,
                  "tools",
                  "strict_tools",
                  "tool_choice",
                )
              : undefined,
          structured_output:
            model.features !== null
              ? hasAnyString(model.features, "json_mode", "json_schema")
              : undefined,
          temperature: model.sampling_defaults?.temperature !== undefined,
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
        }),
        modalities: compactObject(modalities),
      });
    });
  },
};
