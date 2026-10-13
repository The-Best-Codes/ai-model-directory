import { mapWithConcurrency } from "../lib/async.ts";
import {
  documentationTimestamp,
  markdownTables,
  parseScaledNumber,
} from "../lib/docs.ts";
import { fetchText } from "../lib/http.ts";
import { compactObject } from "../lib/object.ts";
import { integerGreaterThanZero } from "../lib/model.ts";
import type { ModelModality, ModelRecord } from "../schema.ts";
import { filterModalities, hasAttachmentSupport } from "./helpers.ts";
import type { ProviderDefinition } from "./types.ts";

const modelLinkPattern = /\(\/docs\/models\/([a-z0-9][a-z0-9.-]*)\)/g;

export function parseModelIds(markdown: string): string[] {
  return [
    ...new Set(
      [...markdown.matchAll(modelLinkPattern)].map((match) => match[1]!),
    ),
  ];
}

function parseYesNo(value: string | undefined): boolean | undefined {
  if (value === "Yes") return true;
  if (value === "No") return false;
  return undefined;
}

export function parseModelDocs(markdown: string): Omit<ModelRecord, "id"> {
  const tables = markdownTables(markdown);
  const specs = new Map<string, string>();

  for (const table of tables) {
    if (table[0]?.[0] !== "Field" || table[0]?.[1] !== "Value") continue;

    for (const [field, value] of table.slice(1)) {
      if (field && value) specs.set(field, value);
    }
  }

  const pricingTable = tables.find(
    (table) => table[0]?.[0] === "Input" && table.length > 1,
  );
  const prices = new Map<string, number | undefined>(
    pricingTable?.[0]?.map((header, index) => [
      header,
      parseScaledNumber(pricingTable[1]?.[index] ?? ""),
    ]) ?? [],
  );
  const input = filterModalities(
    specs.get("Modalities")?.split(",") ?? undefined,
  );
  const outputsImage = prices.has("Output (image)");
  const output: ModelModality[] | undefined = input
    ? outputsImage
      ? ["text", "image"]
      : ["text"]
    : undefined;
  const cutoff = specs.get("Knowledge cutoff");

  return compactObject({
    name: specs.get("Model ID"),
    knowledge_cutoff:
      cutoff && cutoff !== "—" ? documentationTimestamp(cutoff) : undefined,
    features: compactObject({
      attachment: hasAttachmentSupport(input),
      tool_call: parseYesNo(specs.get("Tool / function calling")),
    }),
    pricing: compactObject({
      input: prices.get("Input"),
      output: prices.get("Output") ?? prices.get("Output (text)"),
      cache_read: prices.get("Cached input"),
    }),
    limit: compactObject({
      context: integerGreaterThanZero(
        parseScaledNumber(specs.get("Context window") ?? ""),
      ),
      output: integerGreaterThanZero(
        parseScaledNumber(specs.get("Max output") ?? ""),
      ),
    }),
    modalities: compactObject({ input, output }),
  });
}

export const vivgridProvider: ProviderDefinition = {
  name: "vivgrid",
  outputDirectory: "data/providers/vivgrid/models",
  async fetchModels(progress) {
    progress?.beginPhase("fetching", 1);

    const catalog = await fetchText("https://vivgrid.com/docs/models.md", {
      label: "Vivgrid models docs error",
    });
    const ids = parseModelIds(catalog);

    progress?.tick(`vivgrid.com/docs/models.md (${ids.length})`, true);
    progress?.beginPhase("details", ids.length);

    return mapWithConcurrency(ids, 8, async (id) => {
      try {
        const markdown = await fetchText(
          `https://vivgrid.com/docs/models/${id}.md`,
          { label: `Vivgrid model docs error (${id})` },
        );
        const details = parseModelDocs(markdown);

        progress?.tick(id, true);

        return compactObject({ ...details, id, name: details.name ?? id });
      } catch {
        progress?.tick(id, false);
        return { id, name: id };
      }
    });
  },
};
