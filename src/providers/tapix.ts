import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { timestampFromDateInput } from "../lib/model.ts";
import type { ProviderDefinition } from "./types.ts";

const chatType = "对话";

const apiModelSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  type: z.string(),
  created: z.string().nullish(),
  sell_in: z.number().nullish(),
  sell_out: z.number().nullish(),
  servable: z.boolean().nullish(),
});

const responseSchema = z.object({ models: z.array(apiModelSchema) });

export const tapixProvider: ProviderDefinition = {
  name: "tapix",
  outputDirectory: "data/providers/tapix/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://tapixai.com/api/models", {
      schema: responseSchema,
      label: "Tapix AI API error",
    });

    progress?.tick(`tapixai.com/api/models (${response.models.length})`, true);

    return response.models
      .filter((model) => model.type === chatType && model.servable !== false)
      .map((model) =>
        compactObject({
          id: model.id,
          name: model.name ?? model.id,
          release_date: timestampFromDateInput(model.created),
          pricing: compactObject({
            input: model.sell_in ?? undefined,
            output: model.sell_out ?? undefined,
          }),
        }),
      );
  },
};
