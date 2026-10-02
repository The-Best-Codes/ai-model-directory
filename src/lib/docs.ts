import Decimal from "decimal.js";
import { timestampFromDateInput } from "./model.ts";

export function documentationTimestamp(
  value: string | undefined,
): string | undefined {
  return value
    ? timestampFromDateInput(`${value.trim()} UTC`, { rejectEpoch: true })
    : undefined;
}

export function plainMarkdown(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/[*`\\]/g, "")
    .trim();
}

export function parseScaledNumber(value: string): number | undefined {
  const match = plainMarkdown(value).match(
    /^(?:MAXIMUM:\s*)?\$?\s*([\d,]+(?:\.\d+)?)\s*([KMB])?\b/i,
  );

  if (!match?.[1]) {
    return /^free$/i.test(plainMarkdown(value)) ? 0 : undefined;
  }

  const multiplier =
    { K: 1_000, M: 1_000_000, B: 1_000_000_000 }[
      match[2]?.toUpperCase() as "K" | "M" | "B"
    ] ?? 1;
  const parsed = new Decimal(match[1].replaceAll(",", ""))
    .mul(multiplier)
    .toNumber();

  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

export function markdownTables(text: string): string[][][] {
  const tables: string[][][] = [];
  let table: string[][] = [];

  for (const line of text.split(/\r?\n/)) {
    if (!line.trim().startsWith("|")) {
      if (table.length > 1) tables.push(table);
      table = [];
      continue;
    }

    const cells = line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map(plainMarkdown);
    if (cells.every((cell) => /^:?-+:?$/.test(cell))) continue;
    table.push(cells);
  }

  if (table.length > 1) tables.push(table);
  return tables;
}

export function extractJsonArray(
  text: string,
  start: number,
): unknown[] | undefined {
  if (text[start] !== "[") return undefined;
  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let index = start; index < text.length; index += 1) {
    const character = text[index];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (quoted && character === "\\") {
      escaped = true;
      continue;
    }
    if (character === '"') {
      quoted = !quoted;
      continue;
    }
    if (quoted) continue;
    if (character === "[") depth += 1;
    if (character === "]" && --depth === 0) {
      try {
        return JSON.parse(text.slice(start, index + 1)) as unknown[];
      } catch {
        return undefined;
      }
    }
  }
  return undefined;
}
