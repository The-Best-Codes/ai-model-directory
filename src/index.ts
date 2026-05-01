import { fileURLToPath } from "node:url";

import { writeProviderModels } from "./io.ts";
import { ProgressBar, sanitizeTerminalText } from "./progress.ts";
import { providers } from "./providers/index.ts";
import type { ProviderDefinition } from "./providers/types.ts";

function parseProviderFilter(argv: string[]): Set<string> | null {
  const values: string[] = [];
  let sawFlag = false;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (!argument) {
      continue;
    }

    if (
      argument === "--providers" ||
      argument === "--only" ||
      argument === "-p"
    ) {
      sawFlag = true;
      const next = argv[index + 1];

      if (next && !next.startsWith("-")) {
        values.push(...next.split(","));
        index += 1;
      }

      continue;
    }

    const match = argument.match(/^(?:--providers|--only|-p)=(.*)$/);

    if (match) {
      sawFlag = true;
      values.push(...(match[1] ?? "").split(","));
    }
  }

  if (!sawFlag) {
    return null;
  }

  return new Set(
    values
      .map((value) => value.trim().toLowerCase())
      .filter((value) => value.length > 0),
  );
}

function selectProviders(
  allProviders: ProviderDefinition[],
  filter: Set<string> | null,
) {
  if (!filter) {
    return allProviders;
  }

  const available = new Set(allProviders.map((provider) => provider.name));
  const unknown = [...filter].filter((name) => !available.has(name));

  if (unknown.length > 0) {
    throw new Error(
      `Unknown provider(s): ${unknown.join(", ")}\nAvailable: ${[...available].join(", ")}`,
    );
  }

  return allProviders.filter((provider) => filter.has(provider.name));
}

export async function main(): Promise<void> {
  const rootDirectory = fileURLToPath(new URL("..", import.meta.url));
  const progress = new ProgressBar();
  const summaries: string[] = [];

  const selected = selectProviders(
    providers,
    parseProviderFilter(process.argv.slice(2)),
  );

  if (selected.length === 0) {
    console.log("No providers selected.");
    return;
  }

  try {
    for (const [index, provider] of selected.entries()) {
      progress.beginProvider(index + 1, selected.length, provider.name);

      try {
        const result = await writeProviderModels(
          rootDirectory,
          provider,
          progress,
        );
        summaries.push(
          `${provider.name}: wrote ${result.written} model files to ${provider.outputDirectory}${result.errors > 0 ? ` (${result.errors} errors)` : ""}`,
        );
      } catch (error) {
        summaries.push(
          `${provider.name}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
  } finally {
    progress.stop();
  }

  for (const summary of summaries) {
    console.log(sanitizeTerminalText(summary));
  }
}

await main();
