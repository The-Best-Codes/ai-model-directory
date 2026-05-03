import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import type { ModelModality } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  preview: z.boolean().optional(),
  capabilities: z.object({
    limits: z
      .object({
        max_context_window_tokens: z.number().nullish().optional(),
        max_output_tokens: z.number().nullish().optional(),
        max_prompt_tokens: z.number().nullish().optional(),
        vision: z
          .object({
            max_prompt_images: z.number().nullish().optional(),
          })
          .nullish()
          .optional(),
      })
      .nullish()
      .optional(),
    supports: z
      .object({
        parallel_tool_calls: z.boolean().optional(),
        reasoning_effort: z.array(z.string()).optional(),
        streaming: z.boolean().optional(),
        structured_outputs: z.boolean().optional(),
        tool_calls: z.boolean().optional(),
        vision: z.boolean().optional(),
      })
      .nullish()
      .optional(),
  }),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const githubCopilotProvider: ProviderDefinition = {
  name: "github-copilot",
  outputDirectory: "data/providers/github-copilot/models",
  async fetchModels(progress) {
    const apiKey = process.env.GITHUB_TOKEN ?? process.env.COPILOT_GITHUB_TOKEN;

    if (!apiKey) {
      throw new Error("GITHUB_TOKEN or COPILOT_GITHUB_TOKEN is not set");
    }

    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.githubcopilot.com/models", {
      schema: responseSchema,
      headers: withBearerToken(apiKey),
      label: "GitHub Copilot API error",
    });

    progress?.tick(
      `api.githubcopilot.com/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      const supports = model.capabilities.supports;
      const limits = model.capabilities.limits;
      const input = [
        "text",
        ...(supports?.vision ? ["image"] : []),
      ] as ModelModality[];
      const output = ["text"] as ModelModality[];

      return compactObject({
        id: model.id,
        name: model.name,
        features: compactObject({
          attachment: supports?.vision,
          reasoning: (supports?.reasoning_effort?.length ?? 0) > 0,
          structured_output: supports?.structured_outputs,
          tool_call: supports?.tool_calls || supports?.parallel_tool_calls,
        }),
        limit: compactObject({
          context: integerGreaterThanZero(limits?.max_context_window_tokens),
          input: integerGreaterThanZero(limits?.max_prompt_tokens),
          output: integerGreaterThanZero(limits?.max_output_tokens),
        }),
        modalities: compactObject({
          input,
          output,
        }),
      });
    });
  },
};
