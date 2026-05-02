import { mkdir, readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { ZodError } from "zod";

import {
  formatZodError,
  mergeModelSources,
  normalizeModel,
  normalizeModelId,
  parseMetadataToml,
  parseModelToml,
  serializeModelToml,
} from "./lib/model.ts";
import type { ProgressBar } from "./progress.ts";
import type { ProviderDefinition } from "./providers/types.ts";
import type { MetadataRecord, ModelRecord } from "./schema.ts";

export type ProviderRunResult = {
  written: number;
  errors: number;
};

async function readMetadata(
  modelDirectory: string,
): Promise<MetadataRecord | null> {
  const file = Bun.file(join(modelDirectory, "metadata.toml"));

  if (!(await file.exists())) {
    return null;
  }

  return parseMetadataToml(await file.text());
}

async function readExtendsTarget(
  rootDirectory: string,
  metadata: MetadataRecord | null,
): Promise<ModelRecord | null> {
  if (!metadata?.extends) {
    return null;
  }

  const targetFile = Bun.file(
    join(
      rootDirectory,
      "data",
      "providers",
      metadata.extends.path,
      "index.toml",
    ),
  );

  if (!(await targetFile.exists())) {
    throw new Error(
      `extends.path '${metadata.extends.path}' does not exist on disk`,
    );
  }

  return parseModelToml(await targetFile.text());
}

function detectCollisions(models: ModelRecord[]): Map<string, string[]> {
  const seen = new Map<string, string>();
  const collisions = new Map<string, string[]>();

  for (const model of models) {
    const directoryName = normalizeModelId(model.id);
    const existing = seen.get(directoryName);

    if (!existing) {
      seen.set(directoryName, model.id);
      collisions.set(directoryName, [model.id]);
      continue;
    }

    collisions.get(directoryName)?.push(model.id);
  }

  return collisions;
}

async function removeStaleModelDirectories(
  outputDirectory: string,
  activeDirectories: ReadonlySet<string>,
  progress: ProgressBar,
): Promise<void> {
  const entries = await readdir(outputDirectory, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory() || activeDirectories.has(entry.name)) {
      continue;
    }

    const directoryPath = join(outputDirectory, entry.name);
    const metadata = await readMetadata(directoryPath).catch(() => null);

    if (metadata?.preserve === true) {
      continue;
    }

    await rm(directoryPath, { recursive: true, force: true });
    progress.log(`Removed stale model directory: ${entry.name}`);
  }
}

export async function writeProviderModels(
  rootDirectory: string,
  provider: ProviderDefinition,
  progress: ProgressBar,
): Promise<ProviderRunResult> {
  const apiModels = await provider.fetchModels(progress);
  const outputDirectory = join(rootDirectory, provider.outputDirectory);

  await mkdir(outputDirectory, { recursive: true });

  const collisions = detectCollisions(apiModels);
  const modelsByDirectory = new Map<string, ModelRecord>();

  for (const model of apiModels) {
    const directoryName = normalizeModelId(model.id);

    if (!directoryName) {
      progress.log(`Skipping ${model.id}: normalized model directory is empty`);
      continue;
    }

    modelsByDirectory.set(directoryName, model);
  }

  const models = [...modelsByDirectory.entries()];

  for (const [directoryName, ids] of collisions) {
    if (ids.length > 1) {
      progress.log(
        `Directory collision at ${directoryName}: ${ids.join(", ")} (using last entry ${ids[ids.length - 1]})`,
      );
    }
  }

  progress.beginPhase("writing", models.length);

  let written = 0;
  let errors = 0;

  for (const [directoryName, model] of models) {
    const modelDirectory = join(outputDirectory, directoryName);
    const outputFile = join(modelDirectory, "index.toml");

    try {
      await mkdir(modelDirectory, { recursive: true });

      const normalized = normalizeModel(model);
      const metadata = await readMetadata(modelDirectory);
      const extendsTarget = await readExtendsTarget(rootDirectory, metadata);

      const finalModel = mergeModelSources({
        api: normalized,
        manual_data: metadata?.manual_data ?? null,
        extends: extendsTarget,
        priorities: metadata?.priorities,
      });

      await Bun.write(outputFile, serializeModelToml(finalModel));
      written += 1;
      progress.tick(model.id, true);
    } catch (error) {
      errors += 1;

      if (error instanceof ZodError) {
        progress.log(`Skipping ${model.id}: ${formatZodError(error)}`);
      } else {
        progress.log(
          `Skipping ${model.id}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }

      progress.tick(model.id, false);
    }
  }

  await removeStaleModelDirectories(
    outputDirectory,
    new Set(modelsByDirectory.keys()),
    progress,
  );

  return { written, errors };
}
