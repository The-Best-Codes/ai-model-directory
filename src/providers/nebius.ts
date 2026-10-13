import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromDateInput,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import { hasAnyString } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const flavorSchema = z.object({
  model_id: z.string(),
  model_name: z.string().optional(),
  model_type: z.string().optional(),
  max_model_len: z.number().optional(),
  input_price_per_million_tokens: z.number().nullish(),
  input_cached_price_per_million_tokens: z.number().nullish(),
  output_price_per_million_tokens: z.number().nullish(),
});

const apiModelSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  created_at: z.union([z.string(), z.number()]).optional(),
  huggingface_url: z.string().optional(),
  tags: z.array(z.string()).optional(),
  use_cases: z.array(z.string()).optional(),
  flavors: z.array(flavorSchema),
});

const responseSchema = z.array(apiModelSchema);

function modalitiesForType(type: string | undefined): {
  input?: ModelModality[];
  output?: ModelModality[];
} {
  switch (type) {
    case "text2text":
      return { input: ["text"], output: ["text"] };
    case "image2text":
      return { input: ["text", "image"], output: ["text"] };
    case "embedding":
      return { input: ["text"] };
    case "text2image":
      return { input: ["text"], output: ["image"] };
    default:
      return {};
  }
}

export const nebiusProvider: ProviderDefinition = {
  name: "nebius",
  outputDirectory: "data/providers/nebius/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://tokenfactory.nebius.com/api/public/models_info",
      {
        schema: responseSchema,
        label: "Nebius Token Factory API error",
      },
    );

    progress?.tick(
      `tokenfactory.nebius.com/api/public/models_info (${response.length})`,
      true,
    );

    return response.flatMap((model) =>
      model.flavors.map((flavor) => {
        const type = flavor.model_type ?? model.type;
        const isText = type === "text2text" || type === "image2text";
        const modalities = modalitiesForType(type);
        const useCases = model.use_cases;

        return compactObject({
          id: flavor.model_id,
          name: flavor.model_name ?? model.name ?? flavor.model_id,
          release_date:
            typeof model.created_at === "number"
              ? timestampFromUnixSeconds(model.created_at)
              : timestampFromDateInput(model.created_at, { rejectEpoch: true }),
          open_weights: model.huggingface_url?.startsWith(
            "https://huggingface.co/",
          )
            ? true
            : undefined,
          features: compactObject({
            attachment: modalities.input
              ? modalities.input.some((entry) => entry !== "text")
              : undefined,
            reasoning:
              (isText && useCases && hasAnyString(useCases, "reasoning")) ||
              undefined,
            tool_call:
              (isText &&
                useCases &&
                hasAnyString(useCases, "function_calling")) ||
              undefined,
            structured_output:
              (isText && model.tags && hasAnyString(model.tags, "JSON mode")) ||
              undefined,
          }),
          pricing: compactObject({
            input: nonNegativeNumber(flavor.input_price_per_million_tokens),
            output: isText
              ? nonNegativeNumber(flavor.output_price_per_million_tokens)
              : undefined,
            cache_read: nonNegativeNumber(
              flavor.input_cached_price_per_million_tokens,
            ),
          }),
          limit: compactObject({
            context: integerGreaterThanZero(flavor.max_model_len),
          }),
          modalities: compactObject(modalities),
        });
      }),
    );
  },
};
