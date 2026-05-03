import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import {
  integerGreaterThanZero,
  timestampFromDateInput,
} from "../lib/model.ts";
import { compactObject } from "../lib/object.ts";
import {
  filterModalities,
  hasAttachmentSupport,
  hasAnyString,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string().optional(),
  supported_input_modalities: z.array(z.string()).optional(),
  supported_output_modalities: z.array(z.string()).optional(),
  capabilities: z.array(z.string()).optional(),
  limits: z
    .object({
      max_input_tokens: z.number().nullish().optional(),
      max_output_tokens: z.number().nullish().optional(),
    })
    .nullish()
    .optional(),
});

const responseSchema = z.array(apiModelSchema);

function versionToTimestamp(version: string | undefined): string | undefined {
  if (!version || !/^\d{4}-\d{2}-\d{2}$/.test(version)) {
    return undefined;
  }

  return timestampFromDateInput(version, { rejectEpoch: true });
}

export const githubModelsProvider: ProviderDefinition = {
  name: "github-models",
  outputDirectory: "data/providers/github-models/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://models.github.ai/catalog/models",
      {
        schema: responseSchema,
        label: "GitHub Models API error",
      },
    );

    progress?.tick(
      `models.github.ai/catalog/models (${response.length})`,
      true,
    );

    return response.map((model) => {
      const input = filterModalities(model.supported_input_modalities);
      const output = filterModalities(model.supported_output_modalities);

      return compactObject({
        id: model.id,
        name: model.name,
        release_date: versionToTimestamp(model.version),
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: hasAnyString(model.capabilities, "reasoning"),
          tool_call: hasAnyString(model.capabilities, "tool-calling"),
        }),
        limit: compactObject({
          input: integerGreaterThanZero(model.limits?.max_input_tokens),
          output: integerGreaterThanZero(model.limits?.max_output_tokens),
        }),
        modalities: compactObject({ input, output }),
      });
    });
  },
};
