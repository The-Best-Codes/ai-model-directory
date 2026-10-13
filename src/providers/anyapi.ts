import * as cheerio from "cheerio";
import { z } from "zod";

import { mapWithConcurrency } from "../lib/async.ts";
import { documentationTimestamp, parseScaledNumber } from "../lib/docs.ts";
import { fetchJson, fetchText } from "../lib/http.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import { compactObject } from "../lib/object.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import {
  allModalities,
  filterModalities,
  hasAttachmentSupport,
  mergeModelLists,
} from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const modelPagePattern = /^https:\/\/anyapi\.ai\/ai-models\/[a-z0-9-]+$/;

const responseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      tags: z.array(z.string()).optional(),
      max_input_tokens: z.number().nullish(),
      max_output_tokens: z.number().nullish(),
    }),
  ),
});

const inputModalityTags: Record<string, ModelModality> = {
  vision: "image",
  pdf_input: "file",
  audio_input: "audio",
};

function parseApiModel(
  model: z.infer<typeof responseSchema>["data"][number],
): ModelRecord {
  const tags = new Set(
    (model.tags ?? []).map((tag) => tag.slice(tag.indexOf(":") + 1)),
  );
  const tagged = Object.entries(inputModalityTags).flatMap(([tag, modality]) =>
    tags.has(tag) ? [modality] : [],
  );
  const input =
    tagged.length > 0
      ? allModalities.filter(
          (modality) => modality === "text" || tagged.includes(modality),
        )
      : undefined;

  return compactObject({
    id: model.id,
    limit: compactObject({
      context: integerGreaterThanZero(model.max_input_tokens),
      output: integerGreaterThanZero(model.max_output_tokens),
    }),
    modalities: compactObject({ input }),
    features: compactObject({
      attachment: input ? true : undefined,
      reasoning: tags.has("reasoning") ? true : undefined,
      tool_call: tags.has("function_calling") ? true : undefined,
    }),
  });
}

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
    const apiKey = process.env.ANYAPI_API_KEY;

    if (!apiKey) {
      throw new Error("ANYAPI_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 2);
    const response = await fetchJson("https://api.anyapi.ai/v1/models", {
      schema: responseSchema,
      headers: { Authorization: `Bearer ${apiKey}` },
      label: "AnyAPI models API error",
    });
    progress?.tick(`api.anyapi.ai/v1/models (${response.data.length})`, true);
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

    return mergeModelLists(response.data.map(parseApiModel), [
      ...unique.values(),
    ]);
  },
};
