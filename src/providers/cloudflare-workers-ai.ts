import * as cheerio from "cheerio";

import { mapWithConcurrency } from "../lib/async.ts";
import { fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import type { ProviderDefinition } from "./types.ts";

function tokenPrices(text: string): ModelRecord["pricing"] {
  const pricing: NonNullable<ModelRecord["pricing"]> = {};
  const labels = {
    input: "Input",
    output: "Output",
    cache_read: "Cached input",
  } as const;
  for (const [key, label] of Object.entries(labels)) {
    const value = text.match(
      new RegExp(`${label} \\(per 1M tokens\\): \\$([\\d.]+)`, "i"),
    )?.[1];
    if (value) pricing[key as keyof typeof labels] = Number(value);
  }
  return compactObject(pricing);
}

export const cloudflareWorkersAiProvider: ProviderDefinition = {
  name: "cloudflare-workers-ai",
  outputDirectory: "data/providers/cloudflare-workers-ai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const html = await fetchText(
      "https://developers.cloudflare.com/workers-ai/models/",
      { label: "Cloudflare catalog error" },
    );
    const $ = cheerio.load(html);
    const cells = $("[data-models-cell]").toArray();
    const advertised = $("[data-models]")
      .text()
      .match(/We found (\d+) models/)?.[1];
    if (!cells.length || (advertised && cells.length !== Number(advertised)))
      throw new Error("Cloudflare catalog is empty or incomplete");
    progress?.tick(`Workers AI catalog (${cells.length})`, true);
    progress?.beginPhase("scraping", cells.length);
    return mapWithConcurrency(cells, 6, async (cell) => {
      const node = $(cell);
      const id = node.attr("data-model-id");
      const path = node.attr("data-model-href");
      if (
        !id ||
        !path ||
        !/^\/workers-ai\/models\/[a-zA-Z0-9._-]+\/$/.test(path)
      )
        throw new Error("Cloudflare catalog has an invalid model entry");
      const detail = await fetchText(
        `https://developers.cloudflare.com${path}`,
        { label: `Cloudflare model docs error (${id})` },
      );
      const page = cheerio.load(detail);
      page("script, style").remove();

      const schemaText = page("astro-island[component-url*=SchemaTree]")
        .toArray()
        .map((element) => page(element).attr("props") ?? "")
        .join("\n");
      const task = node.attr("data-model-task") ?? "";
      const capabilities = node
        .attr("data-model-capabilities")
        ?.split(",")
        .map((value) => value.trim());
      const vision =
        capabilities?.includes("Vision") || task === "Image-to-Text";
      const input: ModelModality[] =
        task === "Automatic Speech Recognition" || task === "Dumb Pipe"
          ? ["audio"]
          : task === "Image Classification" || task === "Object Detection"
            ? ["image"]
            : ["text"];
      if (vision && !input.includes("image")) input.push("image");
      if (
        /"name":\[0,"(?:image|image_b64)"\]/.test(schemaText) &&
        task === "Text-to-Image"
      )
        input.push("image");
      const output: ModelModality[] | undefined =
        task === "Text-to-Speech"
          ? ["audio"]
          : task === "Text-to-Image"
            ? ["image"]
            : [
                  "Text Generation",
                  "Image-to-Text",
                  "Automatic Speech Recognition",
                  "Translation",
                ].includes(task)
              ? ["text"]
              : undefined;

      progress?.tick(id, true);
      return compactObject({
        id,
        name: node.attr("data-model-label"),
        limit: compactObject({
          context: integerGreaterThanZero(
            Number(node.attr("data-model-context")),
          ),
          output: integerGreaterThanZero(
            Number(node.attr("data-model-output")),
          ),
        }),
        pricing: tokenPrices(node.attr("data-model-pricing") ?? ""),
        modalities: compactObject({ input, output }),
        features: compactObject({
          attachment: input.some((value) => value !== "text"),
          reasoning: capabilities
            ? capabilities.includes("Reasoning")
            : undefined,
          tool_call: capabilities
            ? capabilities.includes("Function calling")
            : undefined,
          structured_output:
            /response_format/.test(schemaText) &&
            /json_schema|json_object/.test(schemaText)
              ? true
              : undefined,
          temperature: /"name":\[0,"temperature"\]/.test(schemaText)
            ? true
            : undefined,
        }),
      });
    });
  },
};
