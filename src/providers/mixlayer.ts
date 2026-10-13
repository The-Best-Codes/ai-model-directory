import * as cheerio from "cheerio";

import { parseScaledNumber } from "../lib/docs.ts";
import { fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

export const mixlayerProvider: ProviderDefinition = {
  name: "mixlayer",
  outputDirectory: "data/providers/mixlayer/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const $ = cheerio.load(
      await fetchText("https://www.mixlayer.com/pricing", {
        label: "Mixlayer pricing page error",
      }),
    );
    const rows = $(".ml-pricerow").toArray();
    progress?.tick(`www.mixlayer.com/pricing (${rows.length})`, true);

    return rows.flatMap((row) => {
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
  },
};
