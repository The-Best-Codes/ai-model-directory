import * as cheerio from "cheerio";
import { z } from "zod";

import { parseScaledNumber } from "../lib/docs.ts";
import { fetchJson, fetchText } from "../lib/http.ts";
import { timestampFromDateInput } from "../lib/model.ts";
import { compactObject } from "../lib/object.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const responseSchema = z.array(
  z.object({
    id: z.string(),
    display_name: z.string().optional(),
  }),
);

type ModelDetails = { context?: number; releaseDate?: string };

function parseModelTable(html: string): Map<string, ModelDetails> {
  const $ = cheerio.load(html);
  const details = new Map<string, ModelDetails>();

  $("table").each((_, table) => {
    const headers = $(table)
      .find("thead th")
      .map((_, cell) => $(cell).text().trim().toLowerCase())
      .get();
    const idIndex = headers.indexOf("model id");
    const contextIndex = headers.findIndex((header) =>
      header.startsWith("context window"),
    );
    const releaseIndex = headers.findIndex((header) =>
      header.startsWith("release date"),
    );

    if (idIndex < 0) return;

    $(table)
      .find("tbody tr")
      .each((_, row) => {
        const cells = $(row)
          .find("td")
          .map((_, cell) => $(cell).text().trim())
          .get();
        const id = cells[idIndex];

        if (!id) return;

        details.set(id, {
          context:
            contextIndex >= 0
              ? parseScaledNumber(cells[contextIndex] ?? "")
              : undefined,
          releaseDate:
            releaseIndex >= 0
              ? timestampFromDateInput(cells[releaseIndex])
              : undefined,
        });
      });
  });

  return details;
}

function modalitiesFor(id: string) {
  if (id.includes("asr")) {
    return { input: filterModalities(["audio"]), output: ["text" as const] };
  }

  if (id.includes("ocr")) {
    return {
      input: filterModalities(["text", "image", "file"]),
      output: ["text" as const],
    };
  }

  return { input: filterModalities(["text"]), output: ["text" as const] };
}

export const typhoonProvider: ProviderDefinition = {
  name: "typhoon",
  outputDirectory: "data/providers/typhoon/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 2);
    const response = await fetchJson("https://api.opentyphoon.ai/v1/models", {
      schema: responseSchema,
      label: "Typhoon models API error",
    });
    progress?.tick(
      `https://api.opentyphoon.ai/v1/models (${response.length})`,
      true,
    );
    const details = parseModelTable(
      await fetchText("https://docs.opentyphoon.ai/en/models/", {
        label: "Typhoon model docs error",
      }),
    );
    progress?.tick(`docs.opentyphoon.ai/en/models (${details.size})`, true);

    return response.map((model) => {
      const detail = details.get(model.id);
      const modalities = modalitiesFor(model.id);
      const chat = model.id.includes("instruct");

      return compactObject({
        id: model.id,
        name: model.display_name,
        release_date: detail?.releaseDate,
        open_weights: true,
        limit: compactObject({ context: detail?.context }),
        modalities: compactObject(modalities),
        features: compactObject({
          attachment: hasAttachmentSupport(modalities.input),
          temperature: chat ? true : undefined,
        }),
      });
    });
  },
};
