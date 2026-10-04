import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const responseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      endpoints: z.array(z.string()),
      supports_tool_calling: z.boolean(),
      max_context_tokens: z.number().optional(),
      max_output_tokens: z.number().optional(),
    }),
  ),
});

export const voidAiProvider: ProviderDefinition = {
  name: "void-ai",
  outputDirectory: "data/providers/void-ai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const response = await fetchJson("https://api.voidai.app/v1/models", {
      schema: responseSchema,
      label: "void-ai models API error",
    });
    progress?.tick(
      `https://api.voidai.app/v1/models (${response.data.length})`,
      true,
    );
    return response.data.map((model) => {
      const geminiImage = /^gemini-.*-image(?:-|$)/.test(model.id);
      const image =
        geminiImage ||
        model.endpoints.some((endpoint) => endpoint.includes("/images/"));
      const speech = model.endpoints.includes("/v1/audio/speech");
      const transcription = model.endpoints.some((endpoint) =>
        /audio\/(transcriptions|translations)/.test(endpoint),
      );
      const chat = model.endpoints.some((endpoint) =>
        /chat\/completions|responses|messages/.test(endpoint),
      );
      const input = filterModalities([
        transcription ? "audio" : "text",
        ...(geminiImage || model.endpoints.includes("/v1/images/edits")
          ? ["image"]
          : []),
      ]);
      const output = filterModalities(
        image
          ? geminiImage
            ? ["text", "image"]
            : ["image"]
          : speech
            ? ["audio"]
            : transcription || chat
              ? ["text"]
              : undefined,
      );
      return compactObject({
        id: model.id,
        limit: compactObject({
          context: integerGreaterThanZero(model.max_context_tokens),
          output: integerGreaterThanZero(model.max_output_tokens),
        }),
        features: compactObject({
          attachment: hasAttachmentSupport(input) || undefined,
          tool_call: model.supports_tool_calling,
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
