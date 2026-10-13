import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  nonNegativeNumber,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import {
  filterModalities,
  hasAnyString,
  hasAttachmentSource,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number().optional(),
  display_name: z.string().nullish(),
  serving: z.string().optional(),
  pricing: z
    .object({
      input_usd_per_mtok: z.number().nullish(),
      output_usd_per_mtok: z.number().nullish(),
      cache_read_usd_per_mtok: z.number().nullish(),
      cache_write_usd_per_mtok: z.number().nullish(),
    })
    .nullish(),
  specs: z
    .object({
      context_window: z.number().nullish(),
      max_output_tokens: z.number().nullish(),
      modalities: z
        .object({
          input: z.array(z.string()).optional(),
          output: z.array(z.string()).optional(),
        })
        .nullish(),
      supports_reasoning: z.boolean().nullish(),
    })
    .nullish(),
  supported_parameters: z.array(z.string()).optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const primeProvider: ProviderDefinition = {
  name: "prime",
  outputDirectory: "data/providers/prime/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://api.pinference.ai/api/v1/models",
      {
        schema: responseSchema,
        label: "Prime Intellect API error",
      },
    );

    progress?.tick(
      `api.pinference.ai/api/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const specs = model.specs;
      const parameters = model.supported_parameters;

      return compactObject({
        id: model.id,
        name: model.display_name ?? model.id,
        release_date:
          model.serving === "hosted"
            ? timestampFromUnixSeconds(model.created)
            : undefined,
        features: compactObject({
          attachment: hasAttachmentSource(specs?.modalities?.input),
          reasoning: specs?.supports_reasoning ?? undefined,
          tool_call: parameters
            ? hasAnyString(parameters, "tools", "tool_choice")
            : undefined,
          structured_output: parameters
            ? hasAnyString(parameters, "structured_outputs", "response_format")
            : undefined,
          temperature: parameters
            ? hasAnyString(parameters, "temperature")
            : undefined,
        }),
        pricing: compactObject({
          input: nonNegativeNumber(model.pricing?.input_usd_per_mtok),
          output: nonNegativeNumber(model.pricing?.output_usd_per_mtok),
          cache_read: nonNegativeNumber(model.pricing?.cache_read_usd_per_mtok),
          cache_write: nonNegativeNumber(
            model.pricing?.cache_write_usd_per_mtok,
          ),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(specs?.context_window),
          output: integerGreaterThanZero(specs?.max_output_tokens),
        }),
        modalities: compactObject({
          input: filterModalities(specs?.modalities?.input),
          output: filterModalities(specs?.modalities?.output),
        }),
      });
    });
  },
};
