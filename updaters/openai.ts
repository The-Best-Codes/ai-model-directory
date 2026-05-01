import * as cheerio from "cheerio";

import type { Modality, ProviderModel } from "../schema.ts";
import type { ProgressReporter } from "../progress.ts";
import { compact, isoDateFromUnix, mapWithConcurrency } from "./_lib.ts";

export const outputDirectory = "data/providers/openai/models";

// OpenAI /v1/models types
type ApiModel = {
  id: string;
  object: string;
  created: number;
  owned_by: string;
};

type ApiResponse = {
  object: string;
  data: ApiModel[];
};

// Scraping helpers (specific to the developer-docs HTML format)
function parseLooseDate(s: string): string | undefined {
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10);
}

function parseCount(s: string): number | undefined {
  const n = Number(s.replace(/[,_\s]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

function parsePrice(s: string): number | undefined {
  const n = Number(s.replace(/[$,\s]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

const MODALITY_KEYS: Record<string, Modality> = {
  text: "text",
  image: "image",
  audio: "audio",
  video: "video",
  file: "file",
};

// Scraper
type ScrapedDetails = Omit<ProviderModel, "id">;

function parseDetailsHtml(html: string): ScrapedDetails | undefined {
  const $ = cheerio.load(html);

  // Title format: "GPT-5.5 Model | OpenAI API"
  const title = $("title").text().trim();
  const nameMatch = title.match(/^(.*?)\s+Model\s*\|\s*OpenAI/i);
  const name = nameMatch?.[1]?.trim();

  if (!name) return undefined;

  const result: ScrapedDetails = { name };
  const limit: NonNullable<ScrapedDetails["limit"]> = {};
  const features: NonNullable<ScrapedDetails["features"]> = {};
  const pricing: NonNullable<ScrapedDetails["pricing"]> = {};
  const inputMods = new Set<Modality>();
  const outputMods = new Set<Modality>();

  // Top hero badges: <div>1,050,000 context window</div>, etc.
  $("div").each((_, el) => {
    const t = $(el).text().trim();
    if (t.length === 0 || t.length > 80) return;

    const ctx = t.match(/^([\d,_\s]+)\s+context window$/i);

    if (ctx) {
      const n = parseCount(ctx[1] ?? "");
      if (n !== undefined) limit.context = n;
      return;
    }

    const out = t.match(/^([\d,_\s]+)\s+max output tokens$/i);

    if (out) {
      const n = parseCount(out[1] ?? "");
      if (n !== undefined) limit.output = n;
      return;
    }

    const cut = t.match(/^(.+?)\s+knowledge cutoff$/i);

    if (cut) {
      const d = parseLooseDate(cut[1] ?? "");
      if (d) result.knowledge_cutoff = d;
      return;
    }

    if (/^Reasoning token support$/i.test(t)) {
      features.reasoning = true;
    }
  });

  // Sectioned blocks: <div class="flex w-[200px]">LABEL</div> + sibling
  $("div.flex.w-\\[200px\\]").each((_, el) => {
    const label = $(el).text().trim();
    const content = $(el).next();

    if (label === "Features") {
      content.find("div.text-sm.font-semibold").each((_, n) => {
        const fname = $(n).text().trim().toLowerCase();
        const status = $(n).next().text().trim().toLowerCase();
        const supported = status === "supported";

        if (fname === "function calling") features.tool_call = supported;
        else if (fname === "structured outputs")
          features.structured_output = supported;
      });
    } else if (label === "Modalities") {
      content.find("div.text-sm.font-semibold").each((_, n) => {
        const mname = $(n).text().trim().toLowerCase();
        const status = $(n).next().text().trim().toLowerCase();
        const mod = MODALITY_KEYS[mname];

        if (!mod) return;
        // "Input and output" matches both; "Input only" matches input; etc.
        if (status.includes("input")) inputMods.add(mod);
        if (status.includes("output")) outputMods.add(mod);
      });
    } else if (label === "Pricing") {
      content.find("div.text-2xl.font-semibold").each((_, n) => {
        const value = $(n).text().trim();
        const fname = $(n).prev().text().trim().toLowerCase();
        const v = parsePrice(value);

        if (v === undefined) return;
        if (fname === "input") pricing.input = v;
        else if (fname === "output") pricing.output = v;
        else if (fname === "cached input") pricing.cache_read = v;
      });
    }
  });

  // Derive attachment support from input modalities
  if (inputMods.has("image") || inputMods.has("file")) {
    features.attachment = true;
  }

  if (Object.keys(features).length > 0) result.features = compact(features);
  if (Object.keys(pricing).length > 0) result.pricing = compact(pricing);
  if (Object.keys(limit).length > 0) result.limit = compact(limit);

  if (inputMods.size > 0 || outputMods.size > 0) {
    result.modalities = compact({
      input: inputMods.size > 0 ? [...inputMods].sort() : undefined,
      output: outputMods.size > 0 ? [...outputMods].sort() : undefined,
    });
  }

  return result;
}

async function fetchModelDetails(
  id: string,
): Promise<ScrapedDetails | undefined> {
  const url = `https://developers.openai.com/api/docs/models/${encodeURIComponent(id)}`;
  const response = await fetch(url, { redirect: "follow" });

  if (!response.ok) return undefined;

  const html = await response.text();

  return parseDetailsHtml(html);
}

export async function fetchModels(
  progress?: ProgressReporter,
): Promise<ProviderModel[]> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  // Phase 1: list models from the API (single request).
  progress?.beginPhase("fetching", 1);

  const response = await fetch("https://api.openai.com/v1/models", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    progress?.tick("api.openai.com/v1/models", false);
    throw new Error(
      `OpenAI API error: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as ApiResponse;

  progress?.tick(`api.openai.com/v1/models (${data.length})`, true);

  const basics: ProviderModel[] = data.map((m) => ({
    id: m.id,
    name: m.id,
    release_date: isoDateFromUnix(m.created),
  }));

  // Phase 2: scrape developer docs for richer metadata. Many model snapshots
  // don't have a docs page; we silently skip 404s.
  progress?.beginPhase("scraping", basics.length);

  const detailed = await mapWithConcurrency(basics, 8, async (model) => {
    let details: ScrapedDetails | undefined;
    let ok = true;

    try {
      details = await fetchModelDetails(model.id);
    } catch {
      ok = false;
    }

    progress?.tick(model.id, ok);

    if (!details) return model;

    return { ...model, ...details };
  });

  return detailed;
}
