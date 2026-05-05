import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { filterModalities, hasAnyString } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const controlCharacterPattern = /[\u0000-\u001f\u007f]/g;

const apiModelSchema = z.object({
  created: z.number().nullish(),
  display_name: z.string().nullish(),
  features: z.array(z.string()).nullish(),
  id: z.string(),
  input_modalities: z.array(z.string()).nullish(),
  input_token_price_per_m: z.number().nullish(),
  max_output_tokens: z.number().nullish(),
  output_modalities: z.array(z.string()).nullish(),
  output_token_price_per_m: z.number().nullish(),
  context_size: z.number().nullish(),
  title: z.string().nullish(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function sanitizeName(value: string | null | undefined): string | undefined {
  const sanitized = value?.replace(controlCharacterPattern, "").trim();
  return sanitized && sanitized.length > 0 ? sanitized : undefined;
}

function novitaPrice(value: number | null | undefined): number | undefined {
  const normalized = nonNegativeNumber(value);
  return normalized === undefined
    ? undefined
    : new Decimal(normalized).div(10_000).toNumber();
}

export const novitaProvider: ProviderDefinition = {
  name: "novita",
  outputDirectory: "data/providers/novita/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.novita.ai/openai/models", {
      schema: responseSchema,
      headers: withBearerToken(process.env.NOVITA_API_KEY),
      label: "Novita API error",
    });

    progress?.tick(
      `api.novita.ai/openai/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const inputModalities = filterModalities(model.input_modalities);
      const outputModalities = filterModalities(model.output_modalities);
      const features = model.features ?? [];

      return compactObject({
        id: model.id,
        name:
          sanitizeName(model.display_name) ??
          sanitizeName(model.title) ??
          model.id,
        release_date: timestampFromUnixSeconds(model.created ?? undefined),
        features: compactObject({
          attachment:
            inputModalities?.some((modality) => modality !== "text") ??
            undefined,
          reasoning: hasAnyString(features, "reasoning"),
          structured_output: hasAnyString(features, "structured-outputs"),
          tool_call: hasAnyString(features, "function-calling"),
        }),
        pricing: compactObject({
          input: novitaPrice(model.input_token_price_per_m),
          output: novitaPrice(model.output_token_price_per_m),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_size),
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
