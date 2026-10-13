import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { filterModalities } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const responseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      modality: z.array(z.string()).optional(),
    }),
  ),
});

export const literouterProvider: ProviderDefinition = {
  name: "literouter",
  outputDirectory: "data/providers/literouter/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const response = await fetchJson("https://literouter.com/models", {
      schema: responseSchema,
      label: "LiteRouter models API error",
    });
    progress?.tick(`literouter.com/models (${response.data.length})`, true);

    return response.data.map((model) =>
      compactObject({
        id: model.id,
        modalities: compactObject({
          output: filterModalities(model.modality),
        }),
      }),
    );
  },
};
