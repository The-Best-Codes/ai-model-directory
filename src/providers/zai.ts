import { mapWithConcurrency } from "../lib/async.ts";
import { markdownTables, parseScaledNumber } from "../lib/docs.ts";
import { fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

type ModelSpecs = {
  input?: ModelModality[];
  output?: ModelModality[];
  context?: number;
  maxOutput?: number;
  reasoning?: boolean;
};

const docsBaseUrl = "https://docs.z.ai";

function parsePricingPage(text: string): ModelRecord[] {
  const models: ModelRecord[] = [];

  for (const section of text.split(/^\s*#{2,3} /m)) {
    const heading = section.split("\n")[0]?.trim().toLowerCase() ?? "";
    const input: ModelModality[] =
      heading === "vision models" ? ["text", "image"] : ["text"];

    for (const [header, ...body] of markdownTables(section)) {
      if (!header) continue;

      const column = (name: string) =>
        header.findIndex((cell) => cell.toLowerCase() === name);
      const columns = {
        model: column("model"),
        input: column("input"),
        cacheRead: column("cached input"),
        output: column("output"),
      };

      if (columns.model < 0 || columns.input < 0 || columns.output < 0) {
        continue;
      }

      for (const cells of body) {
        const name = cells[columns.model];

        if (!name) continue;

        models.push({
          id: name.toLowerCase(),
          name,
          modalities: { input, output: ["text"] },
          pricing: compactObject({
            input: parseScaledNumber(cells[columns.input] ?? ""),
            output: parseScaledNumber(cells[columns.output] ?? ""),
            cache_read: parseScaledNumber(cells[columns.cacheRead] ?? ""),
          }),
        });
      }
    }
  }

  return models;
}

function modelNamesFromTitle(title: string): string[] {
  const [first, ...variants] = title.split("/").map((part) => part.trim());

  if (!first) return [];

  const prefix = first.slice(0, first.lastIndexOf("-") + 1);
  return [first, ...variants.map((variant) => `${prefix}${variant}`)];
}

function parseModelSpecs(text: string): ModelSpecs {
  const cards = new Map(
    [
      ...text.matchAll(/<Card title="([^"]+)"[^>]*>\s*([^<]*?)\s*<\/Card>/g),
    ].map((match) => [match[1]?.toLowerCase() ?? "", match[2] ?? ""]),
  );
  const modalities = (title: string) =>
    filterModalities(cards.get(title)?.split("/"));

  return {
    input: modalities("input modality"),
    output: modalities("output modality"),
    context: parseScaledNumber(
      cards.get("context length") ??
        text.match(/([\d.]+[KM])-token context window/)?.[1] ??
        "",
    ),
    maxOutput: parseScaledNumber(
      cards.get("maximum output tokens") ??
        text.match(/maximum output length of ([\d.]+[KM]) tokens/)?.[1] ??
        "",
    ),
    reasoning: /thinking\.type/.test(text) ? true : undefined,
  };
}

async function fetchModelSpecs(): Promise<Map<string, ModelSpecs>> {
  const index = await fetchText(`${docsBaseUrl}/llms.txt`, {
    label: "Z.ai docs index error",
  });
  const pages = [
    ...index.matchAll(
      /\[([^\]]+)\]\((https:\/\/docs\.z\.ai\/guides\/(?:llm|vlm)\/[^)]+\.md)\)/g,
    ),
  ];
  const specs = new Map<string, ModelSpecs>();

  await mapWithConcurrency(pages, 4, async ([, title, url]) => {
    if (!title || !url) return;

    try {
      const pageSpecs = parseModelSpecs(
        await fetchText(url, { label: "Z.ai model docs error" }),
      );

      for (const name of modelNamesFromTitle(title)) {
        specs.set(name.toLowerCase(), pageSpecs);
      }
    } catch {
      return;
    }
  });

  return specs;
}

export const zaiProvider: ProviderDefinition = {
  name: "zai",
  outputDirectory: "data/providers/zai/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 2);
    const models = parsePricingPage(
      await fetchText(`${docsBaseUrl}/guides/overview/pricing.md`, {
        label: "Z.ai pricing docs error",
      }),
    );
    progress?.tick(
      `docs.z.ai/guides/overview/pricing (${models.length})`,
      true,
    );
    const specs = await fetchModelSpecs();
    progress?.tick(`docs.z.ai model guides (${specs.size})`, true);

    return models.map((model) => {
      const spec = specs.get(model.id);
      const input = spec?.input ?? model.modalities?.input;

      return compactObject({
        ...model,
        limit: compactObject({
          context: spec?.context,
          output: spec?.maxOutput,
        }),
        modalities: compactObject({
          input,
          output: spec?.output ?? model.modalities?.output,
        }),
        features: compactObject({
          attachment: hasAttachmentSupport(input),
          reasoning: spec?.reasoning,
          temperature: true,
        }),
      });
    });
  },
};
