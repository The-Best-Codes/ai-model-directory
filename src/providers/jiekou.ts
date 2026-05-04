import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import {
  filterModalities,
  hasAnyString,
  hasAttachmentSource,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const priceDivisor = new Decimal(10_000);

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number().nullish(),
  display_name: z.string().nullish(),
  title: z.string().nullish(),
  context_size: z.number().nullish(),
  max_output_tokens: z.number().nullish(),
  input_token_price_per_m: z.number().nullish(),
  output_token_price_per_m: z.number().nullish(),
  features: z.array(z.string()).nullish(),
  input_modalities: z.array(z.string()).nullish(),
  output_modalities: z.array(z.string()).nullish(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function priceFromUnits(value: number | null | undefined): number | undefined {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return undefined;
  }

  if (value < 0) {
    return undefined;
  }

  return new Decimal(value).div(priceDivisor).toNumber();
}

export const jiekouProvider: ProviderDefinition = {
  name: "jiekou",
  outputDirectory: "data/providers/jiekou/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.jiekou.ai/openai/models", {
      schema: responseSchema,
      headers: withBearerToken(process.env.JIEKOU_API_KEY),
      label: "Jiekou API error",
    });

    progress?.tick(
      `api.jiekou.ai/openai/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const input = filterModalities(model.input_modalities);
      const output = filterModalities(model.output_modalities);
      const featuresProvided =
        model.features !== undefined && model.features !== null;

      return compactObject({
        id: model.id,
        name: model.display_name?.trim() || model.title?.trim() || model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: hasAttachmentSource(model.input_modalities),
          reasoning: featuresProvided
            ? hasAnyString(model.features, "reasoning")
            : undefined,
          tool_call: featuresProvided
            ? hasAnyString(
                model.features,
                "function-calling",
                "function_calling",
                "tools",
              )
            : undefined,
          structured_output: featuresProvided
            ? hasAnyString(
                model.features,
                "structured-outputs",
                "structured_outputs",
              )
            : undefined,
        }),
        pricing: compactObject({
          input: priceFromUnits(model.input_token_price_per_m),
          output: priceFromUnits(model.output_token_price_per_m),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_size),
          output: integerGreaterThanZero(model.max_output_tokens),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
