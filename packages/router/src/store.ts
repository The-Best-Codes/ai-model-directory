import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import type { FlatModel, ModelRecord } from "./types.ts";

type ProviderEntry = {
  id: string;
  name: string;
  models: Record<string, ModelRecord>;
};

type ModelDirectory = Record<string, ProviderEntry>;

let cachedDirectory: ModelDirectory | undefined;
let cachedFlatModels: FlatModel[] | undefined;

function resolveDataPath(): string {
  const candidates = [
    resolve(import.meta.dir, "../../../data/all.min.json"),
    resolve(import.meta.dir, "../../../data/all.json"),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }

  throw new Error("Cannot find data/all.min.json or data/all.json");
}

function loadDirectory(): ModelDirectory {
  if (cachedDirectory) return cachedDirectory;
  const raw = readFileSync(resolveDataPath(), "utf-8");
  cachedDirectory = JSON.parse(raw) as ModelDirectory;
  return cachedDirectory;
}

export function loadFlatModels(): FlatModel[] {
  if (cachedFlatModels) return cachedFlatModels;

  const directory = loadDirectory();
  const models: FlatModel[] = [];

  for (const provider of Object.values(directory)) {
    for (const model of Object.values(provider.models)) {
      models.push({ ...model, provider: provider.id });
    }
  }

  cachedFlatModels = models;
  return cachedFlatModels;
}

export function findModel(modelId: string): FlatModel | undefined {
  return loadFlatModels().find((m) => m.id === modelId);
}

export function findModelsByProvider(providerId: string): FlatModel[] {
  const lower = providerId.toLowerCase();
  return loadFlatModels().filter((m) => m.provider.toLowerCase() === lower);
}
