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
      name: z.string(),
      description: z.string(),
      context_length: z.number().nullish(),
      max_input_tokens: z.number().nullish(),
      endpoints: z.array(z.string()),
      metadata: z
        .object({
          vision: z.boolean(),
          function_call: z.boolean(),
          reasoning: z.boolean(),
        })
        .optional(),
      parameters: z.record(z.string(), z.unknown()).optional(),
      pricing: z.object({
        type: z.string(),
        input: z.number().optional(),
        output: z.number().optional(),
        cache_read: z.number().optional(),
        cache_write_5m: z.number().optional(),
      }),
    }),
  ),
});

export const electronhubProvider: ProviderDefinition = {
  name: "electronhub",
  outputDirectory: "data/providers/electronhub/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const response = await fetchJson("https://api.electronhub.ai/v1/models", {
      schema: responseSchema,
      label: "electronhub models API error",
    });
    progress?.tick(
      `https://api.electronhub.ai/v1/models (${response.data.length})`,
      true,
    );
    return response.data.map((model) => {
      const endpoints = model.endpoints;
      const chat = endpoints.includes("/v1/chat/completions");
      const image = endpoints.includes("/v1/images/generations");
      const speech = endpoints.includes("/v1/audio/speech");
      const transcription = endpoints.includes("/v1/audio/transcriptions");
      const input = filterModalities([
        ...(!transcription ? ["text"] : ["audio"]),
        ...(model.metadata?.vision || endpoints.includes("/v1/images/edits")
          ? ["image"]
          : []),
      ]);
      const output = filterModalities(
        image
          ? ["image"]
          : speech
            ? ["audio"]
            : chat || transcription
              ? ["text"]
              : undefined,
      );
      return compactObject({
        id: model.id,
        name: model.name,
        limit: compactObject({
          context: chat
            ? integerGreaterThanZero(model.context_length)
            : undefined,
          input: chat
            ? integerGreaterThanZero(model.max_input_tokens)
            : undefined,
        }),
        modalities: compactObject({ input, output }),
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: model.metadata?.reasoning,
          tool_call: model.metadata?.function_call,
          structured_output:
            chat &&
            /json (?:mode|schema)|structured outputs?/i.test(model.description)
              ? true
              : undefined,
          temperature:
            model.parameters && "temperature" in model.parameters
              ? true
              : undefined,
        }),
        pricing:
          model.pricing.type === "per_million_tokens"
            ? compactObject({
                input: model.pricing.input,
                output: model.pricing.output,
                cache_read: model.pricing.cache_read,
                cache_write: model.pricing.cache_write_5m,
              })
            : undefined,
      });
    });
  },
};
