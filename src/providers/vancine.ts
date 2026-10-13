import Decimal from "decimal.js";
import { z } from "zod";

import { fetchJson } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import { openrouterProvider } from "./openrouter.ts";
import type { ProviderDefinition } from "./types.ts";

const firstTierPattern = /tier\(\s*"[^"]*"\s*,([^)]*)\)/;
const expressionTermPattern = /^(p|c|cr|cc)\s*\*\s*(\d+(?:\.\d+)?)$/;

const apiModelSchema = z.object({
  model_name: z.string(),
  tags: z.string().optional(),
  billing_expr: z.string().optional(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

type Pricing = NonNullable<ModelRecord["pricing"]>;

const expressionKeys = new Map<string, keyof Pricing>([
  ["p", "input"],
  ["c", "output"],
  ["cr", "cache_read"],
  ["cc", "cache_write"],
]);

function normalizeKey(id: string): string {
  return id.split("/").at(-1)!.toLowerCase().replace(/[.:]/g, "-");
}

function expressionPricing(
  expression: string | undefined,
): Pricing | undefined {
  const body = expression?.match(firstTierPattern)?.[1];

  if (!body) {
    return undefined;
  }

  const pricing: Pricing = {};

  for (const term of body.split("+")) {
    const match = term.trim().match(expressionTermPattern);
    const key = match ? expressionKeys.get(match[1]!) : undefined;

    if (!match || !key) {
      return undefined;
    }

    pricing[key] = new Decimal(match[2]!).toNumber();
  }

  return pricing;
}

function tagModalities(tags: readonly string[]): {
  input?: ModelModality[];
  output?: ModelModality[];
} {
  if (tags.includes("video")) {
    return { output: ["video"] };
  }

  if (tags.includes("image")) {
    return { output: ["image"] };
  }

  return tags.includes("vision")
    ? { input: ["text", "image"], output: ["text"] }
    : {};
}

export const vancineProvider: ProviderDefinition = {
  name: "vancine",
  outputDirectory: "data/providers/vancine/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 2);

    const response = await fetchJson("https://vancine.com/api/pricing", {
      schema: responseSchema,
      label: "Vancine pricing API error",
    });

    progress?.tick(`vancine.com/api/pricing (${response.data.length})`, true);

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
      const tags = (model.tags ?? "")
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0);
      const fallback = tagModalities(tags);
      const input = matched?.modalities?.input ?? fallback.input;

      return compactObject({
        id: model.model_name,
        name: matched?.name ?? model.model_name,
        knowledge_cutoff: matched?.knowledge_cutoff,
        release_date: matched?.release_date,
        open_weights: matched?.open_weights,
        features: compactObject({
          ...matched?.features,
          attachment:
            matched?.features?.attachment ??
            (input ? input.length > 1 : undefined),
          reasoning:
            matched?.features?.reasoning ??
            (tags.includes("reasoning") || undefined),
        }),
        pricing: expressionPricing(model.billing_expr),
        limit: matched?.limit,
        modalities: compactObject({
          input,
          output: matched?.modalities?.output ?? fallback.output,
        }),
      });
    });
  },
};
