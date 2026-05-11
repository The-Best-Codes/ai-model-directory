import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

type ModelModality = "text" | "image" | "audio" | "video" | "file";

type ModelFeatures = {
  attachment?: boolean;
  reasoning?: boolean;
  tool_call?: boolean;
  structured_output?: boolean;
  temperature?: boolean;
};

type ModelPricing = {
  input?: number;
  output?: number;
  reasoning?: number;
  cache_read?: number;
  cache_write?: number;
  input_audio?: number;
  output_audio?: number;
};

type ModelLimit = {
  context?: number;
  input?: number;
  output?: number;
};

type ModelModalities = {
  input?: ModelModality[];
  output?: ModelModality[];
};

type ModelRecord = {
  id: string;
  name?: string;
  knowledge_cutoff?: string;
  release_date?: string;
  last_updated?: string;
  open_weights?: boolean;
  features?: ModelFeatures;
  pricing?: ModelPricing;
  limit?: ModelLimit;
  modalities?: ModelModalities;
};

type ProviderAiSdk = {
  npmPackage?: string;
  defaultApiKeyEnv?: string[];
};

type ProviderEntry = {
  id: string;
  name: string;
  website?: string;
  apiBaseUrl?: string;
  aiSdk?: ProviderAiSdk;
  models: Record<string, ModelRecord>;
};

type ModelDirectory = Record<string, ProviderEntry>;

type FlatModel = ModelRecord & {
  provider: string;
};

let cachedDirectory: ModelDirectory | undefined;
let cachedFlatModels: FlatModel[] | undefined;
let cachedProviders: ProviderEntry[] | undefined;

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

export function loadDirectory(): ModelDirectory {
  if (cachedDirectory) return cachedDirectory;
  const raw = readFileSync(resolveDataPath(), "utf-8");
  cachedDirectory = JSON.parse(raw) as ModelDirectory;
  return cachedDirectory;
}

export function loadProviders(): ProviderEntry[] {
  if (cachedProviders) return cachedProviders;
  cachedProviders = Object.values(loadDirectory());
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

export type {
  ModelModality,
  ModelFeatures,
  ModelPricing,
  ModelLimit,
  ModelModalities,
  ModelRecord,
  ProviderAiSdk,
  ProviderEntry,
  ModelDirectory,
  FlatModel,
};
