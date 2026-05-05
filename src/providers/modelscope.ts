import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { timestampFromUnixSeconds } from "../lib/model.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

export const modelscopeProvider: ProviderDefinition = {
  name: "modelscope",
  outputDirectory: "data/providers/modelscope/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const response = await fetchJson(
      "https://api-inference.modelscope.cn/v1/models",
      {
        schema: responseSchema,
        label: "ModelScope API error",
      },
    );

    progress?.tick(
      `api-inference.modelscope.cn/v1/models (${response.data.length})`,
      true,
    );

    return response.data.map((model) => {
      return compactObject({
        id: model.id,
        name: model.id,
        release_date:
          model.created > 0
            ? timestampFromUnixSeconds(model.created)
            : undefined,
      });
    });
  },
};
