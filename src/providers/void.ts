import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import { filterModalities } from "./helpers.ts";
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

export const voidProvider: ProviderDefinition = {
  name: "void",
  outputDirectory: "data/providers/void/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const response = await fetchJson("https://api.voidai.app/v1/models", {
      schema: responseSchema,
      label: "void models API error",
    });
    progress?.tick(
      `https://api.voidai.app/v1/models (${response.data.length})`,
      true,
    );
    return response.data.map((model) => {
      const image = model.endpoints.some((endpoint) =>
        endpoint.includes("/images/"),
      );
      const speech = model.endpoints.includes("/v1/audio/speech");
      const transcription = model.endpoints.some((endpoint) =>
        /audio\/(transcriptions|translations)/.test(endpoint),
      );
      const chat = model.endpoints.some((endpoint) =>
        /chat\/completions|responses|messages/.test(endpoint),
      );
      const input = filterModalities([
        transcription ? "audio" : "text",
        ...(model.endpoints.includes("/v1/images/edits") ? ["image"] : []),
      ]);
      const output = filterModalities(
        image
          ? ["image"]
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
        features: { tool_call: model.supports_tool_calling },
        modalities: compactObject({ input, output }),
      });
    });
  },
};
