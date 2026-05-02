import type { Dirent } from "node:fs";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "smol-toml";
import { ZodError } from "zod";

import {
  formatZodError,
  mergeModelSources,
  parseMetadataToml,
} from "./lib/model.ts";
import {
  type MetadataRecord,
  type ModelRecord,
  type ProviderInfo,
  modelSchema,
  providerInfoSchema,
} from "./schema.ts";

type ProviderEntry = ProviderInfo & {
  id: string;
  models: Record<string, ModelRecord>;
};

type RawModel = {
  api: ModelRecord | null;
  metadata: MetadataRecord | null;
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

async function readApiModel(
  modelDirectory: string,
): Promise<ModelRecord | null> {
  const file = Bun.file(join(modelDirectory, "index.toml"));

  if (!(await file.exists())) {
    return null;
  }

  return modelSchema.parse(parse(await file.text()));
}

async function readMetadata(
  modelDirectory: string,
): Promise<MetadataRecord | null> {
  const file = Bun.file(join(modelDirectory, "metadata.toml"));

  if (!(await file.exists())) {
    return null;
  }

  return parseMetadataToml(await file.text());
}

async function readProviderRawModels(
  modelsDirectory: string,
): Promise<Record<string, RawModel>> {
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

  const result: Record<string, RawModel> = {};

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) {
      continue;
    }

    const modelDirectory = join(modelsDirectory, entry.name);

    try {
      const [api, metadata] = await Promise.all([
        readApiModel(modelDirectory),
        readMetadata(modelDirectory),
      ]);

      if (!api && !metadata) {
        continue;
      }

      result[entry.name] = { api, metadata };
    } catch (error) {
      const message =
        error instanceof ZodError
          ? formatZodError(error)
          : error instanceof Error
            ? error.message
            : String(error);

      throw new Error(`Failed to parse ${join(modelDirectory)}: ${message}`);
    }
  }

  return result;
}

function resolveExtends(
  providerId: string,
  metadata: MetadataRecord | null,
  rawModelsByProvider: Record<string, Record<string, RawModel>>,
  visited: ReadonlySet<string>,
): ModelRecord | null {
  if (!metadata?.extends) {
    return null;
  }

  const [targetProvider, targetModel] = metadata.extends.path.split("/");

  if (!targetProvider || !targetModel) {
    return null;
  }

  const key = `${targetProvider}/${targetModel}`;

  if (visited.has(key)) {
    throw new Error(
      `Cycle detected resolving extends from ${providerId}: ${[...visited, key].join(" -> ")}`,
    );
  }

  const targetEntries = rawModelsByProvider[targetProvider];

  if (!targetEntries) {
    throw new Error(
      `extends.path '${metadata.extends.path}' references unknown provider '${targetProvider}'`,
    );
  }

  const target = targetEntries[targetModel];

  if (!target) {
    throw new Error(
      `extends.path '${metadata.extends.path}' references unknown model '${targetModel}' in provider '${targetProvider}'`,
    );
  }

  return resolveModel(
    targetProvider,
    target,
    rawModelsByProvider,
    new Set([...visited, key]),
  );
}

function resolveModel(
  providerId: string,
  raw: RawModel,
  rawModelsByProvider: Record<string, Record<string, RawModel>>,
  visited: ReadonlySet<string>,
): ModelRecord {
  const extendsModel = resolveExtends(
    providerId,
    raw.metadata,
    rawModelsByProvider,
    visited,
  );

  return mergeModelSources({
    api: raw.api,
    manual_data: raw.metadata?.manual_data ?? null,
    extends: extendsModel,
    priorities: raw.metadata?.priorities,
  });
}

export async function buildAll(rootDirectory: string): Promise<{
  outputFile: string;
  providers: number;
  models: number;
}> {
  const providersDirectory = join(rootDirectory, "data", "providers");
  const entries = await readdir(providersDirectory, { withFileTypes: true });

  const providerInfos: Record<string, ProviderInfo & { id: string }> = {};
  const rawModelsByProvider: Record<string, Record<string, RawModel>> = {};

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) {
      continue;
    }

    const providerDirectory = join(providersDirectory, entry.name);
    const info = await readProviderInfo(providerDirectory);

    if (!info) {
      continue;
    }

    providerInfos[entry.name] = { id: entry.name, ...info };
    rawModelsByProvider[entry.name] = await readProviderRawModels(
      join(providerDirectory, "models"),
    );
  }

  const result: Record<string, ProviderEntry> = {};
  let modelCount = 0;

  for (const [providerId, info] of Object.entries(providerInfos)) {
    const models: Record<string, ModelRecord> = {};
    const raws = rawModelsByProvider[providerId] ?? {};

    for (const [modelKey, raw] of Object.entries(raws)) {
      try {
        const resolved = resolveModel(
          providerId,
          raw,
          rawModelsByProvider,
          new Set([`${providerId}/${modelKey}`]),
        );
        models[resolved.id] = resolved;
      } catch (error) {
        const message =
          error instanceof ZodError
            ? formatZodError(error)
            : error instanceof Error
              ? error.message
              : String(error);

        throw new Error(
          `Failed to resolve ${providerId}/${modelKey}: ${message}`,
        );
      }
    }

    modelCount += Object.keys(models).length;
    result[providerId] = { ...info, models };
  }

  const outputFile = join(rootDirectory, "data", "all.json");
  await Bun.write(outputFile, `${JSON.stringify(result, null, 2)}\n`);

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
