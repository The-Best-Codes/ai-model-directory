import type { Dirent } from "node:fs";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "smol-toml";
import { ZodError } from "zod";

import { formatZodError, parseModelToml } from "./lib/model.ts";
import {
  type ModelRecord,
  type ProviderInfo,
  providerInfoSchema,
} from "./schema.ts";

type ProviderEntry = ProviderInfo & {
  id: string;
  models: Record<string, ModelRecord>;
};

async function readProviderInfo(
  providerDirectory: string,
): Promise<ProviderInfo | null> {
  const file = Bun.file(join(providerDirectory, "index.toml"));

  if (!(await file.exists())) {
    return null;
  }

  return providerInfoSchema.parse(parse(await file.text()));
}

async function readProviderModels(
  modelsDirectory: string,
): Promise<Record<string, ModelRecord>> {
  let entries: Dirent<string>[] = [];

  try {
    entries = (await readdir(modelsDirectory, {
      withFileTypes: true,
    })) as Dirent<string>[];
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code: string }).code === "ENOENT"
    ) {
      return {};
    }

    throw error;
  }

  const models: Record<string, ModelRecord> = {};

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) {
      continue;
    }

    const file = Bun.file(join(modelsDirectory, entry.name, "index.toml"));

    if (!(await file.exists())) {
      continue;
    }

    try {
      const model = parseModelToml(await file.text());
      models[model.id] = model;
    } catch (error) {
      const message =
        error instanceof ZodError
          ? formatZodError(error)
          : error instanceof Error
            ? error.message
            : String(error);

      throw new Error(
        `Failed to parse ${join(modelsDirectory, entry.name, "index.toml")}: ${message}`,
      );
    }
  }

  return models;
}

export async function buildAll(rootDirectory: string): Promise<{
  outputFile: string;
  providers: number;
  models: number;
}> {
  const providersDirectory = join(rootDirectory, "data", "providers");
  const entries = await readdir(providersDirectory, { withFileTypes: true });
  const result: Record<string, ProviderEntry> = {};
  let modelCount = 0;

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) {
      continue;
    }

    const providerDirectory = join(providersDirectory, entry.name);
    const info = await readProviderInfo(providerDirectory);

    if (!info) {
      continue;
    }

    const models = await readProviderModels(join(providerDirectory, "models"));

    modelCount += Object.keys(models).length;
    result[entry.name] = { id: entry.name, ...info, models };
  }

  const outputFile = join(rootDirectory, "data", "all.json");
  const minOutputFile = join(rootDirectory, "data", "all.min.json");

  await Bun.write(outputFile, `${JSON.stringify(result, null, 2)}\n`);
  await Bun.write(minOutputFile, JSON.stringify(result));

  return {
    outputFile,
    providers: Object.keys(result).length,
    models: modelCount,
  };
}

async function main(): Promise<void> {
  const rootDirectory = fileURLToPath(new URL("..", import.meta.url));
  const summary = await buildAll(rootDirectory);

  console.log(
    `Wrote ${summary.providers} provider(s) and ${summary.models} model(s) to ${summary.outputFile}`,
  );
}

await main();
