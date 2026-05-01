import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  integerGreaterThanZero,
  timestampFromDateInput,
} from "../lib/model.ts";
import type { ProviderDefinition } from "./types.ts";

const capabilitySchema = z.object({ supported: z.boolean() });

const apiModelSchema = z.object({
  id: z.string(),
  display_name: z.string(),
  created_at: z.string(),
  max_input_tokens: z.number(),
  max_tokens: z.number(),
  capabilities: z.object({
    image_input: capabilitySchema.optional(),
    pdf_input: capabilitySchema.optional(),
    structured_outputs: capabilitySchema.optional(),
    thinking: capabilitySchema.optional(),
  }),
});

const responseSchema = z.object({
  data: z.array(apiModelSchema),
  has_more: z.boolean(),
  last_id: z.string().nullable(),
});

export const anthropicProvider: ProviderDefinition = {
  name: "anthropic",
  outputDirectory: "data/providers/anthropic/models",
  async fetchModels(progress) {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 1);

    const models = [] as z.infer<typeof apiModelSchema>[];
    let afterId: string | null = null;
    let page = 0;

    while (true) {
      const url = new URL("https://api.anthropic.com/v1/models");
      url.searchParams.set("limit", "1000");

      if (afterId) {
        url.searchParams.set("after_id", afterId);
      }

      const response = await fetchJson(url, {
        schema: responseSchema,
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        label: "Anthropic API error",
      });

      models.push(...response.data);
      page += 1;
      progress?.tick(`api.anthropic.com/v1/models (${models.length})`, true);

      if (!response.has_more || !response.last_id) {
        break;
      }

      afterId = response.last_id;
    }

    return models.map((model) => {
      const imageInput = model.capabilities.image_input?.supported === true;
      const pdfInput = model.capabilities.pdf_input?.supported === true;

      return compactObject({
        id: model.id,
        name: model.display_name || model.id,
        release_date: timestampFromDateInput(model.created_at, {
          rejectEpoch: true,
        }),
        features: {
          attachment: imageInput || pdfInput,
          reasoning: model.capabilities.thinking?.supported === true,
          structured_output:
            model.capabilities.structured_outputs?.supported === true,
        },
        limit: compactObject({
          context: integerGreaterThanZero(model.max_input_tokens),
          output: integerGreaterThanZero(model.max_tokens),
        }),
        modalities: {
          input: [
            "text",
            ...(imageInput ? (["image"] as const) : []),
            ...(pdfInput ? (["file"] as const) : []),
          ],
          output: ["text"],
        },
      });
    });
  },
};
