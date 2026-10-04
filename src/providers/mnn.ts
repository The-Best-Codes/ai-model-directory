import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";

import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const responseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      type: z.union([z.string(), z.array(z.string())]),
      vision: z.boolean().optional(),
      audio: z.boolean().optional(),
      function_calling: z.boolean().optional(),
      reasoning_effort: z.boolean().optional(),
      pricing: z.object({
        type: z.string().optional(),
        in_cost_per_million: z.number().optional(),
        out_cost_per_million: z.number().optional(),
      }),
    }),
  ),
});

export const mnnProvider: ProviderDefinition = {
  name: "mnn",
  outputDirectory: "data/providers/mnn/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const response = await fetchJson("https://api.mnnai.ru/v1/models", {
      schema: responseSchema,
      label: "mnn models API error",
    });
    progress?.tick(
      `https://api.mnnai.ru/v1/models (${response.data.length})`,
      true,
    );
    return response.data.map((model) => {
      const types = Array.isArray(model.type) ? model.type : [model.type];
      const chat = types.includes("chat.completions");
      const images = types.some((type) => type.startsWith("images."));
      const speech = types.includes("speech");
      const transcription =
        types.includes("transcriptions") || types.includes("translations");
      const input = filterModalities([
        ...(!transcription ? ["text"] : ["audio"]),
        ...(model.vision || types.includes("images.edits") ? ["image"] : []),
        ...(model.audio ? ["audio"] : []),
      ]);
      const output = filterModalities(
        images
          ? ["image"]
          : speech
            ? ["audio"]
            : chat || transcription
              ? ["text"]
              : undefined,
      );
      return compactObject({
        id: model.id,
        modalities: compactObject({ input, output }),
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: model.reasoning_effort,
          tool_call: model.function_calling,
        }),
        pricing:
          model.pricing.type === "tokens"
            ? compactObject({
                input: model.pricing.in_cost_per_million,
                output: model.pricing.out_cost_per_million,
              })
            : undefined,
      });
    });
  },
};
