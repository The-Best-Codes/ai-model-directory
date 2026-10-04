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
    input: [
      /^Input text$/,
      /^Input$/,
      /^Input <=\d+k$/,
      /^Short-context input$/,
    ],
    output: [
      /^Output text$/,
      /^Output$/,
      /^Output <=\d+k$/,
      /^Short-context output$/,
    ],
    cache_read: [
      /^Cached input$/,
      /^Cached input <=\d+k$/,
      /^Short-context cached input$/,
    ],
    cache_write: [/^Cache creation$/, /^Short-context cache write$/],
    input_audio: [/^Input audio$/],
    output_audio: [/^Output audio$/],
    reasoning: [/^Reasoning$/],
  } as const;
  const rates = text.split("\n").flatMap((line) => {
    const match = line.match(/^(.+?) \(per 1M(?: tokens)?\): \$([\d.]+)$/);
    return match ? [{ label: match[1]!, value: Number(match[2]) }] : [];
  });
  for (const [key, patterns] of Object.entries(labels)) {
    for (const pattern of patterns) {
      const rate = rates.find((entry) => pattern.test(entry.label));
      if (rate) {
        pricing[key as keyof typeof labels] = rate.value;
        break;
      }
    }
  }
  return compactObject(pricing);
}

export const cloudflareWorkersAiProvider: ProviderDefinition = {
  name: "cloudflare-workers-ai",
  outputDirectory: "data/providers/cloudflare-workers-ai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);
    const html = await fetchText(
      "https://developers.cloudflare.com/ai/models/",
      { label: "Cloudflare catalog error" },
    );
    const $ = cheerio.load(html);
    const cells = $("[data-models-cell]").toArray();
    const advertised = $("[data-models]")
      .text()
      .match(/We found (\d+) models/)?.[1];
    if (!cells.length || (advertised && cells.length !== Number(advertised)))
      throw new Error("Cloudflare catalog is empty or incomplete");
    progress?.tick(`Cloudflare AI catalog (${cells.length})`, true);
    progress?.beginPhase("scraping", cells.length);
    return mapWithConcurrency(cells, 6, async (cell) => {
      const node = $(cell);
      const id = node.attr("data-model-id");
      const path = node.attr("data-model-href");
      if (
        !id ||
        !path ||
        !/^\/(?:workers-ai|ai)\/models\/(?:[@a-zA-Z0-9][a-zA-Z0-9._-]*\/)+$/.test(
          path,
        )
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
      const pricing = tokenPrices(node.attr("data-model-pricing") ?? "");
      const task = node.attr("data-model-task") ?? "";
      const capabilities = node
        .attr("data-model-capabilities")
        ?.split(",")
        .map((value) => value.trim());
      const tags = (node.attr("data-model-tags") ?? "")
        .split(",")
        .map((value) => value.trim());
      const thirdParty = node.attr("data-model-provider") === "AI Gateway";
      const vision =
        capabilities?.includes("Vision") ||
        tags.includes("Vision") ||
        task === "Image-to-Text";
      const input: ModelModality[] =
        task === "Automatic Speech Recognition" || task === "Dumb Pipe"
          ? ["audio"]
          : task === "Image Classification" || task === "Object Detection"
            ? ["image"]
            : ["text"];
      if (
        (vision || ["Image-to-Video", "Image-to-Image"].includes(task)) &&
        !input.includes("image")
      )
        input.push("image");
      if (task === "video-to-video") input.push("video");
      if (pricing?.input_audio !== undefined && !input.includes("audio"))
        input.push("audio");
      if (
        /"name":\[0,"(?:image|image_b64)"\]/.test(schemaText) &&
        task === "Text-to-Image"
      )
        input.push("image");
      let output: ModelModality[] | undefined = [
        "Text-to-Speech",
        "Music Generation",
      ].includes(task)
        ? ["audio"]
        : ["Text-to-Image", "Image-to-Image"].includes(task)
          ? ["image"]
          : ["Text-to-Video", "Image-to-Video", "video-to-video"].includes(task)
            ? ["video"]
            : [
                  "Text Generation",
                  "Image-to-Text",
                  "Automatic Speech Recognition",
                  "Translation",
                ].includes(task)
              ? ["text"]
              : undefined;

      if (pricing?.output_audio !== undefined && !output?.includes("audio"))
        output = [...(output ?? []), "audio"];
      if (
        pricing?.output !== undefined &&
        !output?.includes("text") &&
        /Output text \(per 1M tokens\)/.test(
          node.attr("data-model-pricing") ?? "",
        )
      )
        output = [...(output ?? []), "text"];
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
        pricing,
        modalities: compactObject({ input, output }),
        features: compactObject({
          attachment:
            thirdParty && input.every((value) => value === "text")
              ? undefined
              : input.some((value) => value !== "text"),
          reasoning: tags.includes("Reasoning")
            ? true
            : capabilities
              ? capabilities.includes("Reasoning") ||
                (thirdParty ? undefined : false)
              : undefined,
          tool_call: capabilities
            ? capabilities.includes("Function calling") ||
              (thirdParty ? undefined : false)
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
