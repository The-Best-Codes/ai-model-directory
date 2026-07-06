import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  timestampFromDateInput,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { allModalities, hasAttachmentSource } from "./helpers.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number().nullish(),
  owned_by: z.string().nullish(),
  supports_chat: z.boolean().nullish(),
  supports_images: z.boolean().nullish(),
  supports_audio_input: z.boolean().nullish(),
  supports_video_input: z.boolean().nullish(),
  supports_vision: z.boolean().nullish(),
  supports_tools: z.boolean().nullish(),
  supports_reasoning: z.boolean().nullish(),
  supports_caching: z.boolean().nullish(),
  supports_documents: z.boolean().nullish(),
  supports_web_search: z.boolean().nullish(),
  supported_parameters: z.array(z.string()).nullish(),
  status: z.string(),
  tier: z.string().nullish(),
  context_length: z.number().nullish(),
  max_output_tokens: z.number().nullish(),
  input_modalities: z.array(z.string()).nullish(),
  output_modalities: z.array(z.string()).nullish(),
  pricepermilliontokens: z.number().nullish(),
  output_pricepermilliontokens: z.number().nullish(),
  cache_read_pricepermilliontokens: z.number().nullish(),
  cache_write_5m_pricepermilliontokens: z.number().nullish(),
  knowledge_cutoff: z.string().nullish(),
  released_unix: z.number().nullish(),
  media_type: z.string().nullish(),
});

const responseSchema = z.object({
  data: z.array(apiModelSchema),
});

function mapModality(value: string): ModelModality | undefined {
  if (value === "document") {
    return "file";
  }

  return allModalities.includes(value as ModelModality)
    ? (value as ModelModality)
    : undefined;
}

function parseModalities(
  values: readonly string[] | null | undefined,
): ModelModality[] | undefined {
  if (!values || values.length === 0) {
    return undefined;
  }

  const unique = new Set<ModelModality>();

  for (const value of values) {
    const mapped = mapModality(value);
    if (mapped) {
      unique.add(mapped);
    }
  }

  return unique.size > 0
    ? allModalities.filter((entry) => unique.has(entry))
    : undefined;
}

function inferModalities(model: z.infer<typeof apiModelSchema>): {
  input: ModelModality[] | undefined;
  output: ModelModality[] | undefined;
} {
  const input = new Set(parseModalities(model.input_modalities));
  const output = new Set(parseModalities(model.output_modalities));

  if (model.supports_chat || model.supports_images) {
    if (model.supports_audio_input) input.add("audio");
    if (model.supports_video_input) input.add("video");
    if (model.supports_vision) input.add("image");
    if (model.supports_documents) input.add("file");
    if (input.size === 0) input.add("text");
    if (output.size === 0) output.add("text");
  }

  return {
    input:
      input.size > 0 ? allModalities.filter((m) => input.has(m)) : undefined,
    output:
      output.size > 0 ? allModalities.filter((m) => output.has(m)) : undefined,
  };
}

function centsToPrice(value: number | null | undefined): number | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  return Number.isFinite(value) && value >= 0 ? value / 100 : undefined;
}

export const apiAirforceProvider: ProviderDefinition = {
  name: "api-airforce",
  outputDirectory: "data/providers/api-airforce/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.airforce/v1/models", {
      schema: responseSchema,
      label: "API Airforce error",
    });

    const models = response.data.filter(
      (model) => model.status === "operational",
    );

    progress?.tick(`api.airforce/v1/models (${models.length})`, true);

    return models.map((model) => {
      const hasNonTokenPricing =
        model.media_type === "speech" || model.media_type === "sfx";
      const modalities = inferModalities(model);
      const inputModalities = modalities.input;
      const outputModalities = modalities.output;

      return compactObject({
        id: model.id,
        name: model.id,
        release_date: model.released_unix
          ? timestampFromUnixSeconds(model.released_unix)
          : timestampFromUnixSeconds(model.created),
        knowledge_cutoff: timestampFromDateInput(model.knowledge_cutoff),
        features: compactObject({
          attachment: hasAttachmentSource(inputModalities),
          reasoning: model.supports_reasoning ?? undefined,
          tool_call: model.supports_tools ?? undefined,
          structured_output: hasStructuredOutput(model),
        }),
        pricing:
          hasNonTokenPricing ||
          (model.pricepermilliontokens == null &&
            model.output_pricepermilliontokens == null)
            ? undefined
            : compactObject({
                input: centsToPrice(model.pricepermilliontokens),
                output: centsToPrice(model.output_pricepermilliontokens),
                cache_read: centsToPrice(
                  model.cache_read_pricepermilliontokens,
                ),
                cache_write: centsToPrice(
                  model.cache_write_5m_pricepermilliontokens,
                ),
              }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_output_tokens),
        }),
        modalities: compactObject({
          input: inputModalities,
          output: outputModalities,
        }),
      });
    });
  },
};

function hasStructuredOutput(
  model: z.infer<typeof apiModelSchema>,
): boolean | undefined {
  if (!model.supported_parameters) {
    return undefined;
  }

  return (
    model.supported_parameters.includes("structured_outputs") ||
    model.supported_parameters.includes("response_format") ||
    undefined
  );
}
