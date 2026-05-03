import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { nonNegativeNumber, timestampFromUnixSeconds } from "../lib/model.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  input_modalities: z.array(z.string()).optional(),
  output_modalities: z.array(z.string()).optional(),
  prompt_text_token_price: z.number().optional(),
  cached_prompt_text_token_price: z.number().optional(),
  completion_text_token_price: z.number().optional(),
  aliases: z.array(z.string()).optional(),
});

const responseSchema = z.object({ models: z.array(apiModelSchema) });

function tokenPriceToMillion(
  value: number | null | undefined,
): number | undefined {
  const normalized = nonNegativeNumber(value);
  return normalized === undefined ? undefined : normalized / 10000;
}

export const xaiProvider: ProviderDefinition = {
  name: "xai",
  outputDirectory: "data/providers/xai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.x.ai/v1/language-models", {
      schema: responseSchema,
      headers: withBearerToken(process.env.XAI_API_KEY),
      label: "xAI API error",
    });

    progress?.tick(
      `api.x.ai/v1/language-models (${response.models.length})`,
      true,
    );

    return response.models.flatMap((model) => {
      const input = filterModalities(model.input_modalities);
      const output = filterModalities(model.output_modalities);
      const record = compactObject({
        name: model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: /reasoning/i.test(model.id),
        }),
        pricing: compactObject({
          input: tokenPriceToMillion(model.prompt_text_token_price),
          output: tokenPriceToMillion(model.completion_text_token_price),
          cache_read: tokenPriceToMillion(model.cached_prompt_text_token_price),
        }),
        modalities: compactObject({ input, output }),
      });

      return [model.id, ...(model.aliases ?? [])].map((id) => ({
        id,
        ...record,
        name: id,
      }));
    });
  },
};
