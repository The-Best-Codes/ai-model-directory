import { z } from "zod";

import { mapWithConcurrency } from "../lib/async.ts";
import { parseScaledNumber } from "../lib/docs.ts";
import { fetchJson, fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import type { ProviderDefinition } from "./types.ts";

const responseSchema = z.object({
  data: z.array(z.object({ id: z.string() })),
});

type DocPage = { title: string; url: string };

function parseDocPages(index: string): DocPage[] {
  return [
    ...index.matchAll(
      /\[([^\]]+)\]\((https:\/\/docs\.sea-lion\.ai\/models\/[^)]+\.md)\)/g,
    ),
  ].flatMap(([, title, url]) => (title && url ? [{ title, url }] : []));
}

function docPageFor(id: string, pages: readonly DocPage[]) {
  const name = id.slice(id.indexOf("/") + 1).toLowerCase();

  return pages
    .filter((page) => name.startsWith(page.title.toLowerCase()))
    .sort((a, b) => b.title.length - a.title.length)[0];
}

function parseContext(text: string): number | undefined {
  const line =
    text.match(/\*\*Context length:?\*\*:?([^\n]*)/i)?.[1] ??
    text.match(/\*\*context length of ([^*]+)\*\*/i)?.[1];
  const values = (line?.match(/\d[\d,.]*\s*[KM]?\b/gi) ?? []).flatMap(
    (value) => parseScaledNumber(value.replace(/\s+/g, "")) ?? [],
  );

  return values.length > 0 ? Math.max(...values) : undefined;
}

export const seaLionProvider: ProviderDefinition = {
  name: "sea-lion",
  outputDirectory: "data/providers/sea-lion/models",
  async fetchModels(progress) {
    const apiKey = process.env.SEA_LION_API_KEY;

    if (!apiKey) {
      throw new Error("SEA_LION_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 2);
    const response = await fetchJson("https://api.sea-lion.ai/v1/models", {
      schema: responseSchema,
      headers: { Authorization: `Bearer ${apiKey}` },
      label: "SEA-LION models API error",
    });
    progress?.tick(
      `https://api.sea-lion.ai/v1/models (${response.data.length})`,
      true,
    );
    const pages = parseDocPages(
      await fetchText("https://docs.sea-lion.ai/llms.txt", {
        label: "SEA-LION docs index error",
      }),
    );
    progress?.tick(`docs.sea-lion.ai/llms.txt (${pages.length})`, true);
    progress?.beginPhase("scraping", response.data.length);

    return mapWithConcurrency(response.data, 4, async (model) => {
      const page = docPageFor(model.id, pages);
      let context: number | undefined;

      if (page) {
        try {
          context = parseContext(
            await fetchText(page.url, { label: "SEA-LION model docs error" }),
          );
        } catch {
          context = undefined;
        }
      }

      progress?.tick(model.id, context !== undefined);

      return compactObject({
        id: model.id,
        limit: compactObject({ context }),
      });
    });
  },
};
