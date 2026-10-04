import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero, pricePerMillion } from "../lib/model.ts";
import {
  filterModalities,
  hasAttachmentSupport,
  hasAnyString,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const modelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  context_window: z.number().optional(),
  capabilities: z.array(z.string()).optional(),
  pricing: z.object({ prompt: z.string(), completion: z.string() }),
});
const responseSchema = z.object({
  text: z.array(modelSchema),
  image: z.array(modelSchema),
  submodels: z.array(modelSchema),
});

export const zyloProvider: ProviderDefinition = {
  name: "zylo",
  outputDirectory: "data/providers/zylo/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const response = await fetchJson("https://api.zyloai.net/v1/models", {
      schema: responseSchema,
      label: "Zylo models API error",
    });
    const models = [
      ...response.text.map((model) => ({ model, image: false })),
      ...response.image.map((model) => ({ model, image: true })),
      ...response.submodels.map((model) => ({ model, image: false })),
    ];
    const byId = new Map(models.map((entry) => [entry.model.id, entry]));
    progress?.tick(`api.zyloai.net/v1/models (${byId.size})`, true);
    return [...byId.values()].map(({ model, image }) => {
      const capabilities = model.capabilities;
      const input = filterModalities([
        "text",
        ...(hasAnyString(capabilities, "vision") ||
        (image && hasAnyString(capabilities, "edit"))
          ? ["image"]
          : []),
      ]);
      return compactObject({
        id: model.id,
        name: model.name,
        limit: compactObject({
          context: integerGreaterThanZero(model.context_window),
        }),
        modalities: {
          input,
          output: image ? ["image" as const] : ["text" as const],
        },
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: capabilities
            ? hasAnyString(capabilities, "reasoning", "include_reasoning")
            : undefined,
          tool_call: capabilities
            ? hasAnyString(capabilities, "tool-use", "tools", "tool_choice")
            : undefined,
        }),
        pricing: !image
          ? compactObject({
              input: pricePerMillion(model.pricing.prompt),
              output: pricePerMillion(model.pricing.completion),
            })
          : undefined,
      });
    });
  },
};
