import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  pricePerMillion,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import { filterModalities, hasAttachmentSource } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const priceSchema = z.object({
  type: z.string(),
  unit: z.string().optional(),
  cost_usd: z.string(),
});

const modalitySchema = z.object({
  type: z.string(),
  supported_inputs: z
    .object({
      max_context_length: z.object({ value: z.number() }).optional(),
    })
    .passthrough()
    .optional(),
  max_length: z.object({ value: z.number() }).optional(),
  supported_parameters: z.record(z.string(), z.unknown()).optional(),
  pricing: z.array(priceSchema).optional(),
});

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  created: z.number().optional(),
  hugging_face_id: z.string().optional(),
  input_modalities: z.array(modalitySchema).optional(),
  output_modalities: z.array(modalitySchema).optional(),
  reasoning: z
    .object({ supported_efforts: z.array(z.string()).optional() })
    .nullish(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function tokenPrice(
  modalities: readonly z.infer<typeof modalitySchema>[] | undefined,
  type: string,
): number | undefined {
  const entry = modalities
    ?.find((modality) => modality.type === "text")
    ?.pricing?.find((price) => price.type === type && price.unit === "token");

  return pricePerMillion(entry?.cost_usd);
}

export const vultrProvider: ProviderDefinition = {
  name: "vultr",
  outputDirectory: "data/providers/vultr/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://api.vultrinference.com/v1/models",
      {
        schema: responseSchema,
        label: "Vultr API error",
      },
    );

    progress?.tick(
      `api.vultrinference.com/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const inputTypes = model.input_modalities?.map((entry) => entry.type);
      const outputTypes = model.output_modalities?.map((entry) => entry.type);
      const textOutput = model.output_modalities?.find(
        (entry) => entry.type === "text",
      );
      const parameters = textOutput?.supported_parameters;
      const context = model.input_modalities?.find(
        (entry) => entry.type === "text",
      )?.supported_inputs?.max_context_length?.value;

      return compactObject({
        id: model.id,
        name: model.name ?? model.id,
        release_date: timestampFromUnixSeconds(model.created),
        open_weights: model.hugging_face_id ? true : undefined,
        features: compactObject({
          attachment: hasAttachmentSource(inputTypes),
          reasoning: textOutput
            ? (model.reasoning?.supported_efforts?.length ?? 0) > 0
            : undefined,
          tool_call: parameters ? "tools" in parameters : undefined,
          structured_output: parameters
            ? "structured_outputs" in parameters ||
              "response_format" in parameters
            : undefined,
          temperature: parameters ? "temperature" in parameters : undefined,
        }),
        pricing: compactObject({
          input: tokenPrice(model.input_modalities, "prompt"),
          output: tokenPrice(model.output_modalities, "completion"),
        }),
        limit: compactObject({
          context: integerGreaterThanZero(context),
          output: integerGreaterThanZero(textOutput?.max_length?.value),
        }),
        modalities: compactObject({
          input: filterModalities(inputTypes),
          output: filterModalities(outputTypes),
        }),
      });
    });
  },
};
