import * as cheerio from "cheerio";
import { z } from "zod";

import { parseScaledNumber } from "../lib/docs.ts";
import { fetchJson, fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import type { ModelRecord } from "../schema.ts";
import {
  filterModalities,
  hasAttachmentSupport,
  mergeModelLists,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const responseSchema = z.object({
  data: z.array(z.object({ id: z.string() })),
});

function parsePricingPage(html: string): ModelRecord[] {
  const $ = cheerio.load(html);

  return $(".ml-pricerow")
    .toArray()
    .flatMap((row) => {
      const cells = $(row)
        .children()
        .map((_, cell) => $(cell))
        .get();
      const id = cells[0]
        ?.find("span")
        .filter((_, span) => $(span).children().length === 0)
        .map((_, span) => $(span).text().trim())
        .get()
        .find((text) => text.includes("/"));

      if (!id) return [];

      const capabilities = cells[4]?.text().toLowerCase() ?? "";
      const input = filterModalities(
        capabilities.includes("vision") ? ["text", "image"] : ["text"],
      );

      return [
        compactObject({
          id,
          open_weights: true,
          limit: compactObject({
            context: parseScaledNumber(cells[1]?.text() ?? ""),
          }),
          modalities: compactObject({
            input,
            output: filterModalities(["text"]),
          }),
          features: compactObject({
            attachment: hasAttachmentSupport(input),
            temperature: true,
          }),
          pricing: compactObject({
            input: parseScaledNumber(cells[2]?.text() ?? ""),
            output: parseScaledNumber(cells[3]?.text() ?? ""),
          }),
        }),
      ];
    });
}

export const mixlayerProvider: ProviderDefinition = {
  name: "mixlayer",
  outputDirectory: "data/providers/mixlayer/models",
  async fetchModels(progress) {
    const apiKey = process.env.MIXLAYER_API_KEY;

    if (!apiKey) {
      throw new Error("MIXLAYER_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 2);
    const response = await fetchJson("https://models.mixlayer.ai/v1/models", {
      schema: responseSchema,
      headers: { Authorization: `Bearer ${apiKey}` },
      label: "Mixlayer models API error",
    });
    progress?.tick(
      `models.mixlayer.ai/v1/models (${response.data.length})`,
      true,
    );
    const pricing = parsePricingPage(
      await fetchText("https://www.mixlayer.com/pricing", {
        label: "Mixlayer pricing page error",
      }),
    );
    progress?.tick(`www.mixlayer.com/pricing (${pricing.length})`, true);

    return mergeModelLists(
      response.data.map((model) => ({ id: model.id })),
      pricing,
    );
  },
};
