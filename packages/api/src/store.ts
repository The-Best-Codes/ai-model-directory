import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import type {
  ModelDirectory,
  ProviderEntry,
  ModelRecord,
  FlatModel,
} from "./types.ts";

let cachedDirectory: ModelDirectory | undefined;
let cachedFlatModels: FlatModel[] | undefined;
let cachedProviders: ProviderEntry[] | undefined;
let dataPath: string | undefined;

function resolveDataPath(): string {
  if (dataPath) return dataPath;

  const candidates = [
    resolve(import.meta.dir, "../../../data/all.min.json"),
    resolve(import.meta.dir, "../../../data/all.json"),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      dataPath = candidate;
      return dataPath;
    }
  }

  throw new Error(
    "Cannot find data file. Expected data/all.min.json or data/all.json in the repository root."
  );
}

export function loadDirectory(): ModelDirectory {
  if (cachedDirectory) return cachedDirectory;

  const path = resolveDataPath();
  const raw = readFileSync(path, "utf-8");
  cachedDirectory = JSON.parse(raw) as ModelDirectory;
  return cachedDirectory;
}

export function loadProviders(): ProviderEntry[] {
  if (cachedProviders) return cachedProviders;

  const dir = loadDirectory();
  cachedProviders = Object.values(dir);
  return cachedProviders;
}

export function loadFlatModels(): FlatModel[] {
  if (cachedFlatModels) return cachedFlatModels;

  const providers = loadProviders();
  const models: FlatModel[] = [];

  for (const provider of providers) {
    for (const model of Object.values(provider.models)) {
      models.push({ ...model, provider: provider.id });
    }
  }

  cachedFlatModels = models;
  return cachedFlatModels;
}

export function getProviderById(id: string): ProviderEntry | undefined {
  return loadProviders().find((p) => p.id === id);
}

export function getModelById(id: string): FlatModel | undefined {
  return loadFlatModels().find((m) => m.id === id);
}

export function getModelsByProvider(providerId: string): FlatModel[] {
  return loadFlatModels().filter((m) => m.provider === providerId);
}

export function invalidateCache(): void {
  cachedDirectory = undefined;
  cachedFlatModels = undefined;
  cachedProviders = undefined;
}
