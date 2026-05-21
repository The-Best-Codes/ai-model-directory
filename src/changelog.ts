import { readdir } from "node:fs/promises";
import { join } from "node:path";

import { parseModelToml } from "./lib/model.ts";
import type { ModelRecord } from "./schema.ts";

export type ModelMap = Map<string, ModelRecord>;

export type FieldDiff = {
  lost: number;
  gained: number;
  changed: number;
};

export type ProviderDiff = {
  added: string[];
  removed: string[];
  fields: Map<string, FieldDiff>;
};

export type ProviderChangelogEntry = {
  name: string;
  diff: ProviderDiff;
  total?: number;
};

const trackedFields: readonly string[] = [
  "name",
  "knowledge_cutoff",
  "release_date",
  "last_updated",
  "open_weights",
  "features.attachment",
  "features.reasoning",
  "features.structured_output",
  "features.temperature",
  "features.tool_call",
  "pricing.input",
  "pricing.output",
  "pricing.reasoning",
  "pricing.cache_read",
  "pricing.cache_write",
  "pricing.input_audio",
  "pricing.output_audio",
  "limit.context",
  "limit.input",
  "limit.output",
  "modalities.input",
  "modalities.output",
];

export async function snapshotProviderModels(
  outputDirectory: string,
): Promise<ModelMap> {
  const map: ModelMap = new Map();
  let entries;

  try {
    entries = await readdir(outputDirectory, { withFileTypes: true });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code: string }).code === "ENOENT"
    ) {
      return map;
    }

    throw error;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const file = Bun.file(join(outputDirectory, entry.name, "index.toml"));

    if (!(await file.exists())) {
      continue;
    }

    try {
      const model = parseModelToml(await file.text());
      map.set(model.id, model);
    } catch {
      continue;
    }
  }

  return map;
}

function getValue(model: ModelRecord, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = model;

  for (const part of parts) {
    if (current === null || current === undefined) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

function valueExists(value: unknown): boolean {
  if (value === undefined || value === null) {
    return false;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return true;
}

function valueEquals(a: unknown, b: unknown): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    return a.every((value, index) => value === b[index]);
  }

  return a === b;
}

export function diffProviderModels(
  before: ModelMap,
  after: ModelMap,
): ProviderDiff {
  const added: string[] = [];
  const removed: string[] = [];
  const fields = new Map<string, FieldDiff>();

  for (const id of after.keys()) {
    if (!before.has(id)) {
      added.push(id);
    }
  }

  for (const id of before.keys()) {
    if (!after.has(id)) {
      removed.push(id);
    }
  }

  added.sort();
  removed.sort();

  for (const [id, oldModel] of before) {
    const newModel = after.get(id);

    if (!newModel) {
      continue;
    }

    for (const field of trackedFields) {
      const oldValue = getValue(oldModel, field);
      const newValue = getValue(newModel, field);
      const oldExists = valueExists(oldValue);
      const newExists = valueExists(newValue);
      const diff = fields.get(field) ?? { lost: 0, gained: 0, changed: 0 };

      if (oldExists && !newExists) {
        diff.lost += 1;
      } else if (!oldExists && newExists) {
        diff.gained += 1;
      } else if (oldExists && newExists && !valueEquals(oldValue, newValue)) {
        diff.changed += 1;
      }

      fields.set(field, diff);
    }
  }

  return { added, removed, fields };
}

function renderModelList(title: string, ids: string[]): string {
  if (ids.length === 0) {
    return "";
  }

  const items = ids.map((id) => `- \`${id}\``).join("\n");

  return `<details>\n<summary>${title} (${ids.length})</summary>\n\n${items}\n\n</details>\n`;
}

function renderProviderSection(entry: ProviderChangelogEntry): string {
  const { name, diff, total } = entry;

  const fieldRows = trackedFields
    .map((field) => ({
      field,
      diff: diff.fields.get(field) ?? { lost: 0, gained: 0, changed: 0 },
    }))
    .filter(
      ({ diff: fieldDiff }) =>
        fieldDiff.lost > 0 || fieldDiff.gained > 0 || fieldDiff.changed > 0,
    );

  const fieldChangeCount = fieldRows.reduce(
    (sum, { diff: fieldDiff }) =>
      sum + fieldDiff.lost + fieldDiff.gained + fieldDiff.changed,
    0,
  );

  const headlineParts: string[] = [
    `${diff.added.length} added`,
    `${diff.removed.length} removed`,
    `${fieldChangeCount} field changes`,
  ];

  if (typeof total === "number") {
    headlineParts.unshift(`${total} models`);
  }

  const headline = headlineParts.join(", ");

  const bodyLines: string[] = ["#### Summary", ""];

  if (typeof total === "number") {
    bodyLines.push(`- Models currently tracked: ${total}`);
  }

  bodyLines.push(`- Models added: ${diff.added.length}`);
  bodyLines.push(`- Models removed: ${diff.removed.length}`);
  bodyLines.push(`- Total field changes: ${fieldChangeCount}`);

  if (fieldRows.length > 0) {
    bodyLines.push("");
    bodyLines.push("<details>");
    bodyLines.push("<summary>Changed fields</summary>");
    bodyLines.push("");
    bodyLines.push("| Field | Lost | Gained | Changed |");
    bodyLines.push("| --- | ---: | ---: | ---: |");

    for (const { field, diff: fieldDiff } of fieldRows) {
      bodyLines.push(
        `| \`${field}\` | ${fieldDiff.lost} | ${fieldDiff.gained} | ${fieldDiff.changed} |`,
      );
    }

    bodyLines.push("");
    bodyLines.push("</details>");
  } else {
    bodyLines.push("");
    bodyLines.push("_No field-level changes among existing models._");
  }

  const addedBlock = renderModelList("Added models", diff.added);
  const removedBlock = renderModelList("Removed models", diff.removed);

  if (addedBlock) {
    bodyLines.push("");
    bodyLines.push(addedBlock.trimEnd());
  }

  if (removedBlock) {
    bodyLines.push("");
    bodyLines.push(removedBlock.trimEnd());
  }

  return `<details>\n<summary><strong>${name}</strong> — ${headline}</summary>\n\n${bodyLines.join("\n")}\n\n</details>`;
}

export type RunTotals = {
  totalModels?: number;
  totalProviders?: number;
};

function renderSummarySection(
  entries: ProviderChangelogEntry[],
  totals: RunTotals,
): string {
  const totalAdded = entries.reduce(
    (total, entry) => total + entry.diff.added.length,
    0,
  );
  const totalRemoved = entries.reduce(
    (total, entry) => total + entry.diff.removed.length,
    0,
  );
  const totalsByField = new Map<string, FieldDiff>();

  for (const entry of entries) {
    for (const field of trackedFields) {
      const fieldDiff = entry.diff.fields.get(field);

      if (!fieldDiff) {
        continue;
      }

      const total = totalsByField.get(field) ?? {
        lost: 0,
        gained: 0,
        changed: 0,
      };

      total.lost += fieldDiff.lost;
      total.gained += fieldDiff.gained;
      total.changed += fieldDiff.changed;
      totalsByField.set(field, total);
    }
  }

  const totalFieldChanges = [...totalsByField.values()].reduce(
    (sum, fieldDiff) =>
      sum + fieldDiff.lost + fieldDiff.gained + fieldDiff.changed,
    0,
  );

  const lines: string[] = ["### Summary", ""];

  if (typeof totals.totalModels === "number") {
    const providerSuffix =
      typeof totals.totalProviders === "number"
        ? ` across ${totals.totalProviders} providers`
        : "";
    lines.push(
      `- **Total models currently tracked: ${totals.totalModels}**${providerSuffix}`,
    );
  }

  lines.push(`- Providers with changes this run: ${entries.length}`);
  lines.push(`- Total models added: ${totalAdded}`);
  lines.push(`- Total models removed: ${totalRemoved}`);
  lines.push(`- Total field changes: ${totalFieldChanges}`);

  const fieldRows = trackedFields
    .map((field) => ({
      field,
      diff: totalsByField.get(field) ?? { lost: 0, gained: 0, changed: 0 },
    }))
    .filter(({ diff }) => diff.lost > 0 || diff.gained > 0 || diff.changed > 0);

  if (fieldRows.length > 0) {
    lines.push("");
    lines.push("| Field | Lost | Gained | Changed |");
    lines.push("| --- | ---: | ---: | ---: |");

    for (const { field, diff } of fieldRows) {
      lines.push(
        `| \`${field}\` | ${diff.lost} | ${diff.gained} | ${diff.changed} |`,
      );
    }
  }

  return lines.join("\n");
}

export function renderChangelogSection(
  timestamp: number,
  entries: ProviderChangelogEntry[],
  totals: RunTotals = {},
): string {
  const sections: string[] = [`## Run at ${timestamp}`, ""];

  if (entries.length === 0) {
    sections.push(renderSummarySection(entries, totals));
    sections.push("");
    sections.push("_No providers reported model changes this run._");
    return `${sections.join("\n")}\n`;
  }

  sections.push(renderSummarySection(entries, totals));
  sections.push("");
  sections.push("<details>");
  sections.push("<summary><strong>Full details</strong></summary>");
  sections.push("");

  for (const entry of entries) {
    sections.push(renderProviderSection(entry));
    sections.push("");
  }

  sections.push("</details>");

  return `${sections.join("\n")}\n`;
}

export async function prependChangelog(
  changelogPath: string,
  section: string,
): Promise<void> {
  const file = Bun.file(changelogPath);
  const header = "# Changelog\n\n";
  let existingBody = "";

  if (await file.exists()) {
    const existing = await file.text();

    if (existing.startsWith(header)) {
      existingBody = existing.slice(header.length);
    } else {
      existingBody = existing;
    }
  }

  const next = `${header}${section}${existingBody.length > 0 ? `\n${existingBody}` : ""}`;

  await Bun.write(changelogPath, next);
}
