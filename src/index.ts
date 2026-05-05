import { join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  diffProviderModels,
  prependChangelog,
  renderChangelogSection,
  snapshotProviderModels,
  type ProviderChangelogEntry,
} from "./changelog.ts";
import { writeProviderModels } from "./io.ts";
import { ProgressBar, sanitizeTerminalText } from "./progress.ts";
import { providers } from "./providers/index.ts";
import type { ProviderDefinition } from "./providers/types.ts";

type CliOptions = {
  filter: Set<string> | null;
  changelog: boolean;
};

function parseCliOptions(argv: string[]): CliOptions {
  const values: string[] = [];
  let sawFilterFlag = false;
  let changelog = true;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (!argument) {
      continue;
    }

    if (argument === "--no-changelog") {
      changelog = false;
      continue;
    }

    if (
      argument === "--providers" ||
      argument === "--only" ||
      argument === "-p"
    ) {
      sawFilterFlag = true;
      const next = argv[index + 1];

      if (next && !next.startsWith("-")) {
        values.push(...next.split(","));
        index += 1;
      }

      continue;
    }

    const match = argument.match(/^(?:--providers|--only|-p)=(.*)$/);

    if (match) {
      sawFilterFlag = true;
      values.push(...(match[1] ?? "").split(","));
    }
  }

  const filter = sawFilterFlag
    ? new Set(
        values
          .map((value) => value.trim().toLowerCase())
          .filter((value) => value.length > 0),
      )
    : null;

  return { filter, changelog };
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
  const options = parseCliOptions(process.argv.slice(2));

  const selected = selectProviders(providers, options.filter);

  if (selected.length === 0) {
    console.log("No providers selected.");
    return;
  }

  const changelogEntries: ProviderChangelogEntry[] = [];

  try {
    for (const [index, provider] of selected.entries()) {
      progress.beginProvider(index + 1, selected.length, provider.name);

      const outputDirectory = join(rootDirectory, provider.outputDirectory);
      const before = options.changelog
        ? await snapshotProviderModels(outputDirectory)
        : null;

      try {
        const result = await writeProviderModels(
          rootDirectory,
          provider,
          progress,
        );
        summaries.push(
          `${provider.name}: wrote ${result.written} model files to ${provider.outputDirectory}${result.errors > 0 ? ` (${result.errors} errors)` : ""}`,
        );

        if (options.changelog && before) {
          const after = await snapshotProviderModels(outputDirectory);
          changelogEntries.push({
            name: provider.name,
            diff: diffProviderModels(before, after),
          });
        }
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

  if (options.changelog && changelogEntries.length > 0) {
    const timestamp = Math.floor(Date.now() / 1000);
    const section = renderChangelogSection(timestamp, changelogEntries);
    const changelogPath = join(rootDirectory, "CHANGELOG.md");

    await prependChangelog(changelogPath, section);
    console.log(`Updated ${changelogPath}`);
  }
}

await main();
