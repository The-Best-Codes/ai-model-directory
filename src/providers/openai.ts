import * as cheerio from "cheerio";
import { z } from "zod";

import { mapWithConcurrency } from "../lib/async.ts";
import { fetchJson, fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import {
  timestampFromDateInput,
  timestampFromUnixSeconds,
} from "../lib/model.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

const apiModelSchema = z.object({
  id: z.string(),
  created: z.number(),
});

const responseSchema = z.object({ data: z.array(apiModelSchema) });

const modalityMap = new Map<string, ModelModality>([
  ["text", "text"],
  ["image", "image"],
  ["audio", "audio"],
  ["video", "video"],
  ["file", "file"],
]);

function parseCount(value: string): number | undefined {
  const parsed = Number(value.replace(/[,_\s]/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parsePrice(value: string): number | undefined {
  const parsed = Number(value.replace(/[$,\s]/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parseDetails(html: string): Omit<ModelRecord, "id"> | undefined {
  const $ = cheerio.load(html);
  const title = $("title").text().trim();
  const name = title.match(/^(.*?)\s+Model\s*\|\s*OpenAI/i)?.[1]?.trim();

  if (!name) {
    return undefined;
  }

  const input = new Set<ModelModality>();
  const output = new Set<ModelModality>();
  const features: NonNullable<ModelRecord["features"]> = {};
  const pricing: NonNullable<ModelRecord["pricing"]> = {};
  const limit: NonNullable<ModelRecord["limit"]> = {};
  const result: Omit<ModelRecord, "id"> = { name };

  $("div").each((_, element) => {
    const text = $(element).text().trim();

    if (text.length === 0 || text.length > 80) {
      return;
    }

    const context = text.match(/^([\d,_\s]+)\s+context window$/i);

    if (context?.[1]) {
      limit.context = parseCount(context[1]);
      return;
    }

    const maxOutput = text.match(/^([\d,_\s]+)\s+max output tokens$/i);

    if (maxOutput?.[1]) {
      limit.output = parseCount(maxOutput[1]);
      return;
    }

    const cutoff = text.match(/^(.+?)\s+knowledge cutoff$/i);

    if (cutoff?.[1]) {
      result.knowledge_cutoff = timestampFromDateInput(cutoff[1]);
      return;
    }

    if (/^Reasoning token support$/i.test(text)) {
      features.reasoning = true;
    }
  });

  $("div.flex.w-\\[200px\\]").each((_, element) => {
    const label = $(element).text().trim();
    const content = $(element).next();

    if (label === "Features") {
      content.find("div.text-sm.font-semibold").each((_, node) => {
        const key = $(node).text().trim().toLowerCase();
        const status =
          $(node).next().text().trim().toLowerCase() === "supported";

        if (key === "function calling") {
          features.tool_call = status;
        }

        if (key === "structured outputs") {
          features.structured_output = status;
        }
      });
    }

    if (label === "Modalities") {
      content.find("div.text-sm.font-semibold").each((_, node) => {
        const key = $(node).text().trim().toLowerCase();
        const status = $(node).next().text().trim().toLowerCase();
        const mapped = modalityMap.get(key);

        if (!mapped) {
          return;
        }

        if (status.includes("input")) {
          input.add(mapped);
        }

        if (status.includes("output")) {
          output.add(mapped);
        }
      });
    }

    if (label === "Pricing") {
      content.find("div.text-2xl.font-semibold").each((_, node) => {
        const value = parsePrice($(node).text().trim());
        const key = $(node).prev().text().trim().toLowerCase();

        if (value === undefined) {
          return;
        }

        if (key === "input") {
          pricing.input = value;
        }

        if (key === "output") {
          pricing.output = value;
        }

        if (key === "cached input") {
          pricing.cache_read = value;
        }
      });
    }
  });

  if (input.size > 0 || output.size > 0) {
    features.attachment =
      input.has("image") ||
      input.has("audio") ||
      input.has("video") ||
      input.has("file");
    result.modalities = compactObject({
      input:
        input.size > 0
          ? ["text", "image", "audio", "video", "file"].filter(
              (entry): entry is ModelModality =>
                input.has(entry as ModelModality),
            )
          : undefined,
      output:
        output.size > 0
          ? ["text", "image", "audio", "video", "file"].filter(
              (entry): entry is ModelModality =>
                output.has(entry as ModelModality),
            )
          : undefined,
    });
  }

  $("div.text-sm.font-semibold").each((_, node) => {
    const key = $(node).text().trim().toLowerCase();

    if (key === "file") {
      const status = $(node).next().text().trim().toLowerCase();

      if (status.includes("input")) {
        features.attachment = true;
      }
    }
  });

  return compactObject({
    ...result,
    features: compactObject(features),
    pricing: compactObject(pricing),
    limit: compactObject(limit),
  });
}

async function fetchModelDetails(
  id: string,
): Promise<Omit<ModelRecord, "id"> | undefined> {
  try {
    const html = await fetchText(
      `https://developers.openai.com/api/docs/models/${encodeURIComponent(id)}`,
      {
        init: { redirect: "follow" },
        label: "OpenAI model docs error",
      },
    );

    return parseDetails(html);
  } catch {
    return undefined;
  }
}

export const openaiProvider: ProviderDefinition = {
  name: "openai",
  outputDirectory: "data/providers/openai/models",
  async fetchModels(progress) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    progress?.beginPhase("fetching", 1);

    const response = await fetchJson("https://api.openai.com/v1/models", {
      schema: responseSchema,
      headers: { Authorization: `Bearer ${apiKey}` },
      label: "OpenAI API error",
    });

    progress?.tick(`api.openai.com/v1/models (${response.data.length})`, true);

    const basicModels = response.data.map((model) => ({
      id: model.id,
      name: model.id,
      release_date: timestampFromUnixSeconds(model.created),
    }));

    progress?.beginPhase("scraping", basicModels.length);

    return mapWithConcurrency(basicModels, 8, async (model) => {
      const details = await fetchModelDetails(model.id);
      progress?.tick(model.id, true);
      return details ? { ...model, ...details } : model;
    });
  },
};
