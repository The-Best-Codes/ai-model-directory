import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  pricePerMillion,
  timestampFromDateInput,
} from "../lib/model.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const responseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      context_length: z.number().nullish(),
      max_completion_tokens: z.number().nullish(),
      knowledge_cutoff: z.string().nullish(),
      architecture: z.object({
        input_modalities: z.array(z.string()),
        output_modalities: z.array(z.string()),
      }),
      reasoning: z
        .object({
          mandatory: z.boolean().optional(),
          default_enabled: z.boolean().optional(),
          supported_efforts: z.array(z.string()).optional(),
        })
        .optional(),
      pricing: z.object({
        prompt: z.union([z.string(), z.number()]).nullish(),
        completion: z.union([z.string(), z.number()]).nullish(),
      }),
    }),
  ),
});

export const bazaarlinkProvider: ProviderDefinition = {
  name: "bazaarlink",
  outputDirectory: "data/providers/bazaarlink/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const response = await fetchJson(
      "https://api.bazaarlink.ai/v1/models?output_modalities=all",
      {
        schema: responseSchema,
        label: "bazaarlink models API error",
      },
    );
    progress?.tick(
      `https://api.bazaarlink.ai/v1/models?output_modalities=all (${response.data.length})`,
      true,
    );
    return response.data.map((model) => {
      const input = filterModalities(model.architecture.input_modalities);
      const output = filterModalities(model.architecture.output_modalities);
      return compactObject({
        id: model.id,
        name: model.name,
        knowledge_cutoff: timestampFromDateInput(model.knowledge_cutoff),
        limit: compactObject({
          context: integerGreaterThanZero(model.context_length),
          output: integerGreaterThanZero(model.max_completion_tokens),
        }),
        modalities: compactObject({ input, output }),
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: model.reasoning ? true : undefined,
        }),
        pricing: output?.includes("video")
          ? undefined
          : compactObject({
              input: pricePerMillion(model.pricing.prompt),
              output: pricePerMillion(model.pricing.completion),
            }),
      });
    });
  },
};
