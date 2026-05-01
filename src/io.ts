import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { ZodError } from "zod";

import {
  applyModelOverride,
  formatZodError,
  normalizeModel,
  normalizeModelId,
  parseModelOverrideToml,
  serializeModelToml,
} from "./lib/model.ts";
import type { ProgressBar } from "./progress.ts";
import type { ProviderDefinition } from "./providers/types.ts";
import type { ModelOverride, ModelRecord } from "./schema.ts";

export type ProviderRunResult = {
  written: number;
  errors: number;
};

async function readOverrideFile(
  modelDirectory: string,
): Promise<ModelOverride | null> {
  const overrideFile = Bun.file(join(modelDirectory, "overrides.toml"));

  if (!(await overrideFile.exists())) {
    return null;
  }

  return parseModelOverrideToml(await overrideFile.text());
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

export async function writeProviderModels(
  rootDirectory: string,
  provider: ProviderDefinition,
  progress: ProgressBar,
): Promise<ProviderRunResult> {
  const apiModels = await provider.fetchModels(progress);
  const outputDirectory = join(rootDirectory, provider.outputDirectory);

  await mkdir(outputDirectory, { recursive: true });

  const collisions = detectCollisions(apiModels);
  const models = apiModels.filter(
    (model) => collisions.get(normalizeModelId(model.id))?.[0] === model.id,
  );

  for (const [directoryName, ids] of collisions) {
    if (ids.length > 1) {
      progress.log(
        `Directory collision at ${directoryName}: ${ids.join(", ")}`,
      );
    }
  }

  progress.beginPhase("writing", models.length);

  let written = 0;
  let errors = 0;

  for (const model of models) {
    const directoryName = normalizeModelId(model.id);
    const modelDirectory = join(outputDirectory, directoryName);
    const outputFile = join(modelDirectory, "index.toml");

    try {
      await mkdir(modelDirectory, { recursive: true });

      const normalized = normalizeModel(model);
      const override = await readOverrideFile(modelDirectory);
      const finalModel = applyModelOverride(normalized, override);

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

  return { written, errors };
}
