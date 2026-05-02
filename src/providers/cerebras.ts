import { z } from "zod";

import { fetchJson, withBearerToken } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { timestampFromUnixSeconds } from "../lib/model.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const cerebrasProvider: ProviderDefinition = {
  name: "cerebras",
  outputDirectory: "data/providers/cerebras/models",
  async fetchModels(progress) {
    const apiKey = process.env.CEREBRAS_API_KEY;

    if (!apiKey) {
      throw new Error("CEREBRAS_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.cerebras.ai/v1/models", {
      schema: responseSchema,
      headers: withBearerToken(apiKey),
      label: "Cerebras API error",
    });

    progress?.tick(`api.cerebras.ai/v1/models (${response.data.length})`, true);

    return response.data.map((model) =>
      compactObject({
        id: model.id,
        name: model.id,
        release_date:
          model.created > 0
            ? timestampFromUnixSeconds(model.created)
            : undefined,
      }),
    );
  },
};
