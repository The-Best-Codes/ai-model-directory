import { decodeModelDirectory } from "./codec.js";
import { compactModelDirectoryData } from "./data.js";
import type { ModelDirectory, ModelRecord, ProviderEntry } from "./types.js";

let cachedModelDirectory: ModelDirectory | undefined;

export function getModelDirectory(): ModelDirectory {
  cachedModelDirectory ??= decodeModelDirectory(compactModelDirectoryData);
  return cachedModelDirectory;
}

export function getProviders(): ProviderEntry[] {
  return Object.values(getModelDirectory());
}

export function getProvider(providerId: string): ProviderEntry | undefined {
  return getModelDirectory()[providerId];
}

export function getModel(
  providerId: string,
  modelId: string,
): ModelRecord | undefined {
  return getProvider(providerId)?.models[modelId];
}
