import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  created: z.number().optional(),
  type: z.string().optional(),
  context_window: z.number().optional(),
  multimodal: z.boolean().optional(),
  reasoning: z.boolean().optional(),
  tool_calling: z.boolean().optional(),
  pricing: z
    .object({
      inputTokenPricePer1M: z.number().optional(),
      outputTokenPricePer1M: z.number().optional(),
      cachedInputTokenPricePer1M: z.number().optional(),
    })
    .optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

const tokenPricedTypes = new Set(["chat", "embedding"]);

function modalitiesForType(
  type: string | undefined,
  multimodal: boolean | undefined,
): { input?: ModelModality[]; output?: ModelModality[] } {
  switch (type) {
    case "chat":
      return {
        input: multimodal ? ["text", "image"] : ["text"],
        output: ["text"],
      };
    case "embedding":
      return { input: ["text"] };
    case "audio":
      return { input: ["audio"], output: ["text"] };
    case "tts":
      return { input: ["text"], output: ["audio"] };
    case "document":
      return { input: ["file"], output: ["text"] };
    default:
      return {};
  }
}

export const tinfoilProvider: ProviderDefinition = {
  name: "tinfoil",
  outputDirectory: "data/providers/tinfoil/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://inference.tinfoil.sh/v1/models", {
      schema: responseSchema,
      label: "Tinfoil API error",
    });

    progress?.tick(
      `inference.tinfoil.sh/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const isChat = model.type === "chat";
      const modalities = modalitiesForType(model.type, model.multimodal);

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        release_date: timestampFromUnixSeconds(model.created),
        open_weights: isChat ? true : undefined,
        features: compactObject({
          attachment: modalities.input
            ? modalities.input.some((entry) => entry !== "text")
            : undefined,
          reasoning: isChat ? model.reasoning : undefined,
          tool_call: isChat ? model.tool_calling : undefined,
        }),
        pricing: tokenPricedTypes.has(model.type ?? "")
          ? compactObject({
              input: nonNegativeNumber(model.pricing?.inputTokenPricePer1M),
              output: isChat
                ? nonNegativeNumber(model.pricing?.outputTokenPricePer1M)
                : undefined,
              cache_read: nonNegativeNumber(
                model.pricing?.cachedInputTokenPricePer1M,
              ),
            })
          : undefined,
        limit: compactObject({
          context: integerGreaterThanZero(model.context_window),
        }),
        modalities: compactObject(modalities),
      });
    });
  },
};
