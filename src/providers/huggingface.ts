import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { filterModalities, hasAttachmentSource } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const providerEntrySchema = z.object({
  context_length: z.number().optional(),
  pricing: z
    .object({
      input: z.number().optional(),
      output: z.number().optional(),
    })
    .optional(),
  supports_tools: z.boolean().optional(),
  supports_structured_output: z.boolean().optional(),
  is_model_author: z.boolean().optional(),
});

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
  architecture: z
    .object({
      input_modalities: z.array(z.string()).optional(),
      output_modalities: z.array(z.string()).optional(),
    })
    .optional(),
  providers: z.array(providerEntrySchema).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function pickCapabilityProvider(
  providers: z.infer<typeof providerEntrySchema>[] | undefined,
) {
  if (!providers || providers.length === 0) {
    return undefined;
  }

  return (
    providers.find((provider) => provider.is_model_author) ??
    providers.find(
      (provider) =>
        provider.supports_tools !== undefined ||
        provider.supports_structured_output !== undefined,
    ) ??
    providers[0]
  );
}

function pickPricingProvider(
  providers: z.infer<typeof providerEntrySchema>[] | undefined,
) {
  return (
    providers?.find(
      (provider) => provider.is_model_author && provider.pricing !== undefined,
    ) ?? providers?.find((provider) => provider.pricing !== undefined)
  );
}

function pickContextProvider(
  providers: z.infer<typeof providerEntrySchema>[] | undefined,
) {
  return (
    providers?.find(
      (provider) =>
        provider.is_model_author && provider.context_length !== undefined,
    ) ?? providers?.find((provider) => provider.context_length !== undefined)
  );
}

export const huggingfaceProvider: ProviderDefinition = {
  name: "huggingface",
  outputDirectory: "data/providers/huggingface/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://router.huggingface.co/v1/models",
      {
        schema: responseSchema,
        headers: withBearerToken(process.env.HF_TOKEN),
        label: "Hugging Face API error",
      },
    );

    progress?.tick(
      `router.huggingface.co/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const capabilityProvider = pickCapabilityProvider(model.providers);
      const pricingProvider = pickPricingProvider(model.providers);
      const contextProvider = pickContextProvider(model.providers);
      const input = filterModalities(model.architecture?.input_modalities);
      const output = filterModalities(model.architecture?.output_modalities);

      return compactObject({
        id: model.id,
        name: model.id,
        release_date: timestampFromUnixSeconds(model.created),
        features: compactObject({
          attachment: hasAttachmentSource(model.architecture?.input_modalities),
          tool_call: capabilityProvider?.supports_tools,
          structured_output: capabilityProvider?.supports_structured_output,
        }),
        pricing: compactObject({
          input: nonNegativeNumber(pricingProvider?.pricing?.input),
          output: nonNegativeNumber(pricingProvider?.pricing?.output),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(contextProvider?.context_length),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
