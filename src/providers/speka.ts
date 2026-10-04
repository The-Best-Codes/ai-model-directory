import * as cheerio from "cheerio";
import { z } from "zod";

import { fetchJson, fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const responseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      endpoint: z.string(),
      context_window: z.number(),
      pricing: z.object({
        input_per_1m: z.number().nullable(),
        output_per_1m: z.number().nullable(),
      }),
    }),
  ),
});

export const spekaProvider: ProviderDefinition = {
  name: "speka",
  outputDirectory: "data/providers/speka/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 2);
    const response = await fetchJson("https://speka.me/v1/models", {
      schema: responseSchema,
      label: "speka models API error",
    });
    progress?.tick(
      `https://speka.me/v1/models (${response.data.length})`,
      true,
    );
    const html = await fetchText("https://speka.me/models", {
      label: "Speka model catalog error",
    });
    const $ = cheerio.load(html);
    const details = new Map<string, { name: string; capability: string }>();
    $(".model-id code").each((_, element) => {
      const card = $(element).parent().parent();
      details.set($(element).text().trim(), {
        name: card.find("h3").text().trim(),
        capability: card.find(".cap-badge").text().trim(),
      });
    });
    if (response.data.some((model) => !details.has(model.id)))
      throw new Error("Speka API and model catalog disagree");
    progress?.tick(`speka.me/models (${details.size})`, true);
    return response.data.map((model) => {
      const detail = details.get(model.id)!;
      const image = model.endpoint === "image";
      const chat = model.endpoint === "chat";
      const input = filterModalities(
        detail.capability === "vision" ? ["text", "image"] : ["text"],
      );
      const output = filterModalities(
        image ? ["image"] : chat ? ["text"] : undefined,
      );
      return compactObject({
        id: model.id,
        name: detail.name,
        limit: compactObject({
          context: integerGreaterThanZero(model.context_window),
        }),
        modalities: compactObject({ input, output }),
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: detail.capability === "reasoning" ? true : undefined,
          temperature: chat ? true : undefined,
        }),
        pricing: !image
          ? compactObject({
              input: model.pricing.input_per_1m ?? undefined,
              output: model.pricing.output_per_1m ?? undefined,
            })
          : undefined,
      });
    });
  },
};
