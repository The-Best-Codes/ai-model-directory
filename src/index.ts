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

process.on("unhandledRejection", (reason) => {
  console.error(
    "[unhandledRejection]",
    reason instanceof Error
      ? `${reason.message}\n${reason.stack ?? ""}`
      : reason,
  );
});

process.on("uncaughtException", (error) => {
  console.error(
    "[uncaughtException]",
    error instanceof Error ? `${error.message}\n${error.stack ?? ""}` : error,
  );
});

const providerTimeoutMs = 10 * 60 * 1000;

function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  label: string,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`${label} timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
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
  let totalWritten = 0;
  let providersWithWrites = 0;
  let providersFailed = 0;

  try {
    for (const [index, provider] of selected.entries()) {
      try {
        progress.beginProvider(index + 1, selected.length, provider.name);
      } catch (error) {
        console.error(
          `[${provider.name}] failed to begin progress: ${error instanceof Error ? error.message : String(error)}`,
        );
      }

      const outputDirectory = join(rootDirectory, provider.outputDirectory);
      let before = null;

      if (options.changelog) {
        try {
          before = await snapshotProviderModels(outputDirectory);
        } catch (error) {
          progress.log(
            `${provider.name}: failed to snapshot existing models: ${error instanceof Error ? error.message : String(error)}`,
          );
        }
      }

      try {
        const result = await withTimeout(
          writeProviderModels(rootDirectory, provider, progress),
          providerTimeoutMs,
          provider.name,
        );
        summaries.push(
          `${provider.name}: wrote ${result.written} model files to ${provider.outputDirectory}${result.errors > 0 ? ` (${result.errors} errors)` : ""}`,
        );

        if (result.written > 0) {
          providersWithWrites += 1;
          totalWritten += result.written;
        }

        if (options.changelog && before) {
          try {
            const after = await snapshotProviderModels(outputDirectory);
            changelogEntries.push({
              name: provider.name,
              diff: diffProviderModels(before, after),
            });
          } catch (error) {
            progress.log(
              `${provider.name}: failed to compute changelog diff: ${error instanceof Error ? error.message : String(error)}`,
            );
          }
        }
      } catch (error) {
        providersFailed += 1;
        summaries.push(
          `${provider.name}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
  } finally {
    try {
      progress.stop();
    } catch (error) {
      console.error(
        `Failed to stop progress bar: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  for (const summary of summaries) {
    console.log(sanitizeTerminalText(summary));
  }

  if (options.changelog && changelogEntries.length > 0) {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const section = renderChangelogSection(timestamp, changelogEntries);
      const changelogPath = join(rootDirectory, "CHANGELOG.md");

      await prependChangelog(changelogPath, section);
      console.log(`Updated ${changelogPath}`);
    } catch (error) {
      console.error(
        `Failed to write changelog: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  console.log(
    `Run summary: ${providersWithWrites}/${selected.length} providers wrote models (${totalWritten} files total), ${providersFailed} failed.`,
  );

  if (totalWritten > 0 || providersFailed < selected.length) {
    process.exitCode = 0;
  } else {
    process.exitCode = 1;
  }
}

try {
  await main();
} catch (error) {
  console.error(
    `Fatal error in main: ${error instanceof Error ? `${error.message}\n${error.stack ?? ""}` : String(error)}`,
  );
  process.exitCode = 1;
}
