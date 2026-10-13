import * as cheerio from "cheerio";

import { mapWithConcurrency } from "../lib/async.ts";
import { documentationTimestamp, parseScaledNumber } from "../lib/docs.ts";
import { fetchText } from "../lib/http.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import { compactObject } from "../lib/object.ts";
import type { ModelRecord } from "../schema.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const modelPagePattern = /^https:\/\/anyapi\.ai\/ai-models\/[a-z0-9-]+$/;

function parseModelPage(html: string): ModelRecord | undefined {
  const $ = cheerio.load(html);
  const labelOf = (label: string) =>
    $("div")
      .filter(
        (_, element) =>
          $(element).children().length === 0 &&
          $(element).text().trim() === label,
      )
      .first();
  const valueOf = (label: string) => labelOf(label).next();
  const id = valueOf("model ID").children().first().text().trim();

  if (!id) return undefined;

  const modalitiesIn = (container: cheerio.Cheerio<any>) =>
    filterModalities(
      container
        .find("[role='listitem']")
        .map((_, item) => $(item).text().trim().replace(/^pdf$/i, "file"))
        .get(),
    );
  const heroContext = $("h3")
    .filter((_, element) => /^context window/i.test($(element).text().trim()))
    .first()
    .parent()
    .next()
    .children()
    .first()
    .text();
  const input =
    modalitiesIn(valueOf("Input modalities")) ??
    modalitiesIn(labelOf("Modality:").parent().next());
  const reasoning = valueOf("Reasoning").text().trim().toLowerCase();

  return compactObject({
    id,
    name: $("title")
      .text()
      .replace(/\s*\|\s*AnyAPI\.ai\s*$/, "")
      .trim(),
    knowledge_cutoff: documentationTimestamp(
      valueOf("Knowledge cutoff").text().trim() || undefined,
    ),
    limit: compactObject({
      context: integerGreaterThanZero(
        parseScaledNumber(valueOf("Context window").text() || heroContext),
      ),
      output: integerGreaterThanZero(
        parseScaledNumber(valueOf("Maximum output tokens").text()),
      ),
    }),
    modalities: compactObject({
      input,
      output: modalitiesIn(valueOf("output modalities")),
    }),
    features: compactObject({
      attachment: hasAttachmentSupport(input),
      reasoning:
        reasoning === "yes" ? true : reasoning === "no" ? false : undefined,
    }),
  });
}

export const anyapiProvider: ProviderDefinition = {
  name: "anyapi",
  outputDirectory: "data/providers/anyapi/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const sitemap = cheerio.load(
      await fetchText("https://anyapi.ai/sitemap.xml", {
        label: "AnyAPI sitemap error",
      }),
      { xml: true },
    );
    const pages = sitemap("loc")
      .map((_, element) => sitemap(element).text().trim())
      .get()
      .filter((url) => modelPagePattern.test(url));
    progress?.tick(`anyapi.ai/sitemap.xml (${pages.length})`, true);
    progress?.beginPhase("scraping", pages.length);

    const models = await mapWithConcurrency(pages, 8, async (url) => {
      try {
        const model = parseModelPage(
          await fetchText(url, { label: "AnyAPI model page error" }),
        );
        progress?.tick(url, model !== undefined);
        return model;
      } catch {
        progress?.tick(url, false);
        return undefined;
      }
    });

    const unique = new Map<string, ModelRecord>();

    for (const model of models) {
      if (model && !unique.has(model.id)) unique.set(model.id, model);
    }

    return [...unique.values()];
  },
};
