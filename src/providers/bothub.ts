import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import { allModalities } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiParamSchema = z.object({
  code: z.string(),
  maximum: z.number().optional(),
});

const childSchema = z.object({
  id: z.string(),
  features: z.array(z.string()),
  apiParams: z.array(apiParamSchema).nullish(),
  descriptions: z.array(z.object({ name: z.string().nullish() })).nullish(),
});

const parentSchema = z.object({
  disabled: z.boolean(),
  disabledApi: z.boolean(),
  children: z.array(childSchema).nullish(),
});

const responseSchema = z.array(parentSchema);

const inputByFeature = new Map<string, ModelModality[]>([
  ["TEXT_TO_TEXT", ["text"]],
  ["IMAGE_TO_TEXT", ["image"]],
  ["DOCUMENT_TO_TEXT", ["file"]],
  ["NATIVE_DOCUMENT_TO_TEXT", ["file"]],
  ["FILE_TO_TEXT", ["file"]],
  ["AUDIO_TO_TEXT", ["audio"]],
  ["BIG_AUDIO_TO_TEXT", ["audio"]],
  ["TEXT_TO_IMAGE", ["text"]],
  ["TEXT_TO_IMAGE_LLM", ["text"]],
  ["IMAGE_TO_IMAGE", ["image"]],
  ["TEXT_TO_VIDEO", ["text"]],
  ["IMAGE_TO_VIDEO", ["image"]],
  ["VIDEO_TO_VIDEO", ["video"]],
  ["TEXT_TO_AUDIO", ["text"]],
  ["TEXT_TO_MUSIC", ["text"]],
  ["AUDIO_TO_AUDIO", ["audio"]],
  ["EMBEDDING", ["text"]],
  ["RERANKER", ["text"]],
]);

const outputByFeature = new Map<string, ModelModality>([
  ["TEXT_TO_TEXT", "text"],
  ["IMAGE_TO_TEXT", "text"],
  ["DOCUMENT_TO_TEXT", "text"],
  ["NATIVE_DOCUMENT_TO_TEXT", "text"],
  ["FILE_TO_TEXT", "text"],
  ["AUDIO_TO_TEXT", "text"],
  ["BIG_AUDIO_TO_TEXT", "text"],
  ["TEXT_TO_IMAGE", "image"],
  ["TEXT_TO_IMAGE_LLM", "image"],
  ["IMAGE_TO_IMAGE", "image"],
  ["TEXT_TO_VIDEO", "video"],
  ["IMAGE_TO_VIDEO", "video"],
  ["VIDEO_TO_VIDEO", "video"],
  ["TEXT_TO_AUDIO", "audio"],
  ["TEXT_TO_MUSIC", "audio"],
  ["AUDIO_TO_AUDIO", "audio"],
]);

function orderedModalities(
  values: ReadonlySet<ModelModality>,
): ModelModality[] | undefined {
  return values.size > 0
    ? allModalities.filter((entry) => values.has(entry))
    : undefined;
}

export const bothubProvider: ProviderDefinition = {
  name: "bothub",
  outputDirectory: "data/providers/bothub/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://bothub.chat/api/v2/model/list", {
      schema: responseSchema,
      label: "BotHub API error",
    });

    const children = response
      .filter((parent) => !parent.disabled && !parent.disabledApi)
      .flatMap((parent) => parent.children ?? []);

    progress?.tick(`bothub.chat/api/v2/model/list (${children.length})`, true);

    return children.map((model) => {
      const features = new Set(model.features);
      const input = new Set<ModelModality>();
      const output = new Set<ModelModality>();

      for (const feature of features) {
        for (const modality of inputByFeature.get(feature) ?? []) {
          input.add(modality);
        }

        const modality = outputByFeature.get(feature);

        if (modality) {
          output.add(modality);
        }
      }

      const params = model.apiParams ?? [];
      const maxTokens = params.find((param) => param.code === "max_tokens");
      const hasTextOutput = output.has("text");
      const name = model.descriptions?.find((entry) => entry.name)?.name;

      return compactObject({
        id: model.id,
        name: name ?? model.id,
        features: compactObject({
          attachment: [...input].some((entry) => entry !== "text"),
          reasoning: hasTextOutput
            ? features.has("REASONING") || features.has("CHAIN_OF_THOUGHT")
            : undefined,
          tool_call: hasTextOutput ? features.has("TOOLS") : undefined,
          temperature: hasTextOutput
            ? params.some((param) => param.code === "temperature")
            : undefined,
        }),
        limit: compactObject({
          output: hasTextOutput
            ? integerGreaterThanZero(maxTokens?.maximum)
            : undefined,
        }),
        modalities: compactObject({
          input: orderedModalities(input),
          output: orderedModalities(output),
        }),
      });
    });
  },
};
