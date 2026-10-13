import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import type { ModelRecord } from "../schema.ts";
import { openrouterProvider } from "./openrouter.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({ model_name: z.string() });

const responseSchema = z.object({ data: z.array(apiModelSchema) });

function normalizeKey(id: string): string {
  return id.split("/").at(-1)!.toLowerCase().replace(/[.:]/g, "-");
}

export const agentrouterProvider: ProviderDefinition = {
  name: "agentrouter",
  outputDirectory: "data/providers/agentrouter/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 2);

    const response = await fetchJson("https://agentrouter.org/api/pricing", {
      schema: responseSchema,
      label: "AgentRouter pricing API error",
    });

    progress?.tick(
      `agentrouter.org/api/pricing (${response.data.length})`,
      true,
    );

    const openrouterModels = await openrouterProvider.fetchModels();
    const openrouterByKey = new Map<string, ModelRecord>();

    for (const model of openrouterModels) {
      const key = normalizeKey(model.id);

      if (!openrouterByKey.has(key)) {
        openrouterByKey.set(key, model);
      }
    }

    progress?.tick(
      `openrouter.ai/api/v1/models (${openrouterModels.length})`,
      true,
    );

    return response.data.map((model) => {
      const matched = openrouterByKey.get(normalizeKey(model.model_name));

      return compactObject({
        id: model.model_name,
        name: matched?.name ?? model.model_name,
        knowledge_cutoff: matched?.knowledge_cutoff,
        release_date: matched?.release_date,
        open_weights: matched?.open_weights,
        features: matched?.features,
        limit: matched?.limit,
        modalities: matched?.modalities,
      });
    });
  },
};
