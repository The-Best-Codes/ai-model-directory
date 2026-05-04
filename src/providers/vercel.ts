import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  pricePerMillion,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { filterModalities, hasAnyString } from "./helpers.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  created: z.number().optional(),
  released: z.number().optional(),
  context_window: z.number().nullish(),
  max_tokens: z.number().nullish(),
  type: z.string().optional(),
  tags: z.array(z.string()).optional(),
  pricing: z
    .object({
      input: z.string().nullish(),
      output: z.string().nullish(),
      input_cache_read: z.string().nullish(),
      input_cache_write: z.string().nullish(),
    })
    .nullish(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function getInputModalities(
  tags: readonly string[] | undefined,
): string[] | undefined {
  if (!tags) {
    return undefined;
  }

  const result: string[] = ["text"];

  if (hasAnyString(tags, "vision")) {
    result.push("image");
  }

  if (hasAnyString(tags, "file-input")) {
    result.push("file");
  }

  if (hasAnyString(tags, "audio-input")) {
    result.push("audio");
  }

  if (hasAnyString(tags, "video-input")) {
    result.push("video");
  }

  return result;
}

export const vercelProvider: ProviderDefinition = {
  name: "vercel",
  outputDirectory: "data/providers/vercel/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://ai-gateway.vercel.sh/v1/models", {
      schema: responseSchema,
      label: "Vercel AI Gateway API error",
    });

    progress?.tick(
      `ai-gateway.vercel.sh/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const inputSources = getInputModalities(model.tags);
      const input = filterModalities(inputSources);
      const output: ModelModality[] | undefined =
        model.type === "language" ? ["text"] : undefined;
      const hasAttachment = input
        ? input.some((modality) => modality !== "text")
        : undefined;

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        release_date:
          timestampFromUnixSeconds(model.released) ??
          timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: hasAttachment,
          reasoning: model.tags
            ? hasAnyString(model.tags, "reasoning")
            : undefined,
          tool_call: model.tags
            ? hasAnyString(model.tags, "tool-use", "tools")
            : undefined,
        }),
        pricing: compactObject({
          input: pricePerMillion(model.pricing?.input),
          output: pricePerMillion(model.pricing?.output),
          cache_read: pricePerMillion(model.pricing?.input_cache_read),
          cache_write: pricePerMillion(model.pricing?.input_cache_write),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_window),
          output: integerGreaterThanZero(model.max_tokens),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
