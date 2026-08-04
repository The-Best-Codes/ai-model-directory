import { createHash, randomBytes } from "node:crypto";
import { constants } from "node:fs";
import { chmod, mkdir, open, rename, rm } from "node:fs/promises";
import { homedir, platform } from "node:os";
import { basename, dirname, isAbsolute, join } from "node:path";
import { experimental_setModelDirectory } from "./store.js";
import type {
  ModelDirectory,
  ModelFeatures,
  ModelLimit,
  ModelModalities,
  ModelModality,
  ModelPricing,
  ModelRecord,
  ProviderAiSdk,
  ProviderEntry,
} from "./types.js";

export const experimental_defaultModelDirectoryDataUrl =
  "https://raw.githubusercontent.com/The-Best-Codes/ai-model-directory/main/data/all.min.json";

const defaultMaxBytes = 10 * 1024 * 1024;
const defaultTimeoutMs = 30_000;
const maximumRedirects = 5;
const dangerousKeys = new Set(["__proto__", "constructor", "prototype"]);
const modalityValues = new Set<ModelModality>([
  "audio",
  "file",
  "image",
  "text",
  "video",
]);

export type ExperimentalDownloadModelDirectoryDataOptions = {
  destinationPath?: string;
  expectedSha256?: string;
  maxBytes?: number;
  signal?: AbortSignal;
  timeoutMs?: number;
  url?: string | URL;
};

export type ExperimentalLoadModelDirectoryDataOptions = {
  maxBytes?: number;
  path?: string;
};

export type ExperimentalUseModelDirectoryDataOptions = {
  expectedSha256?: string;
  maxBytes?: number;
  onBackgroundError?: (error: unknown) => void;
  path?: string;
  signal?: AbortSignal;
  timeoutMs?: number;
  updateMode?: "background" | "await";
  url?: string | URL;
};

export type ExperimentalDownloadModelDirectoryDataResult = {
  bytes: number;
  path: string;
  sha256: string;
  url: string;
};

function getDefaultModelDirectoryDataPath(): string {
  const home = homedir();
  let cacheDirectory: string;

  if (platform() === "win32") {
    cacheDirectory =
      process.env.LOCALAPPDATA ??
      process.env.APPDATA ??
      join(home, "AppData", "Local");
  } else if (platform() === "darwin") {
    cacheDirectory = join(home, "Library", "Caches");
  } else {
    const xdgCacheHome = process.env.XDG_CACHE_HOME;
    cacheDirectory =
      xdgCacheHome && isAbsolute(xdgCacheHome)
        ? xdgCacheHome
        : join(home, ".cache");
  }

  return join(cacheDirectory, "ai-model-directory", "all.min.json");
}

export async function experimental_downloadModelDirectoryData(
  options: ExperimentalDownloadModelDirectoryDataOptions = {},
): Promise<ExperimentalDownloadModelDirectoryDataResult> {
  const destinationPath =
    options.destinationPath ?? getDefaultModelDirectoryDataPath();
  const maxBytes = validatePositiveInteger(
    options.maxBytes ?? defaultMaxBytes,
    "maxBytes",
  );
  const timeoutMs = validatePositiveInteger(
    options.timeoutMs ?? defaultTimeoutMs,
    "timeoutMs",
  );
  const expectedSha256 = validateExpectedSha256(options.expectedSha256);
  const controller = new AbortController();
  const abort = () => controller.abort(options.signal?.reason);
  const timeout = setTimeout(
    () => controller.abort(new Error("Model directory download timed out")),
    timeoutMs,
  );

  options.signal?.addEventListener("abort", abort, { once: true });

  if (options.signal?.aborted) {
    abort();
  }

  try {
    const response = await fetchWithSafeRedirects(
      options.url ?? experimental_defaultModelDirectoryDataUrl,
      controller.signal,
    );
    const bytes = await readResponseBytes(response, maxBytes);
    parseAndValidate(bytes);
    const sha256 = createHash("sha256").update(bytes).digest("hex");

    if (expectedSha256 && sha256 !== expectedSha256) {
      throw new Error("Downloaded model directory SHA-256 does not match");
    }

    await writeAtomically(destinationPath, bytes);

    return {
      bytes: bytes.byteLength,
      path: destinationPath,
      sha256,
      url: response.url,
    };
  } finally {
    clearTimeout(timeout);
    options.signal?.removeEventListener("abort", abort);
  }
}

export async function experimental_loadModelDirectoryData(
  options: ExperimentalLoadModelDirectoryDataOptions = {},
): Promise<ModelDirectory> {
  const path = options.path ?? getDefaultModelDirectoryDataPath();
  const maxBytes = validatePositiveInteger(
    options.maxBytes ?? defaultMaxBytes,
    "maxBytes",
  );
  const file = await open(path, constants.O_RDONLY);

  try {
    const stats = await file.stat();

    if (!stats.isFile()) {
      throw new Error("Model directory data path is not a regular file");
    }

    if (stats.size > maxBytes) {
      throw new Error(`Model directory data exceeds ${maxBytes} bytes`);
    }

    const bytes = await file.readFile();

    if (bytes.byteLength > maxBytes) {
      throw new Error(`Model directory data exceeds ${maxBytes} bytes`);
    }

    const directory = parseAndValidate(bytes);
    experimental_setModelDirectory(directory);
    return directory;
  } finally {
    await file.close();
  }
}

export async function experimental_useModelDirectoryData(
  options: ExperimentalUseModelDirectoryDataOptions = {},
): Promise<ModelDirectory> {
  const path = options.path ?? getDefaultModelDirectoryDataPath();
  let cachedDirectory: ModelDirectory | undefined;

  try {
    cachedDirectory = await experimental_loadModelDirectoryData({
      maxBytes: options.maxBytes,
      path,
    });
  } catch {
    cachedDirectory = undefined;
  }

  const update = () =>
    downloadAndLoadModelDirectoryData({
      expectedSha256: options.expectedSha256,
      maxBytes: options.maxBytes,
      path,
      signal: options.signal,
      timeoutMs: options.timeoutMs,
      url: options.url,
    });

  if (
    cachedDirectory &&
    (options.updateMode ?? "background") === "background"
  ) {
    void update().catch((error: unknown) => options.onBackgroundError?.(error));
    return cachedDirectory;
  }

  return update();
}

async function downloadAndLoadModelDirectoryData(
  options: Omit<
    ExperimentalUseModelDirectoryDataOptions,
    "onBackgroundError" | "updateMode"
  > & {
    path: string;
  },
): Promise<ModelDirectory> {
  await experimental_downloadModelDirectoryData({
    destinationPath: options.path,
    expectedSha256: options.expectedSha256,
    maxBytes: options.maxBytes,
    signal: options.signal,
    timeoutMs: options.timeoutMs,
    url: options.url,
  });

  return experimental_loadModelDirectoryData({
    maxBytes: options.maxBytes,
    path: options.path,
  });
}

async function fetchWithSafeRedirects(
  input: string | URL,
  signal: AbortSignal,
): Promise<Response> {
  let url = validateDownloadUrl(input);

  for (
    let redirectCount = 0;
    redirectCount <= maximumRedirects;
    redirectCount += 1
  ) {
    const response = await fetch(url, {
      headers: { accept: "application/json" },
      redirect: "manual",
      signal,
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");

      if (!location) {
        throw new Error("Model directory download redirect has no location");
      }

      if (redirectCount === maximumRedirects) {
        throw new Error("Model directory download has too many redirects");
      }

      url = validateDownloadUrl(new URL(location, url));
      continue;
    }

    if (!response.ok) {
      throw new Error(
        `Model directory download failed with HTTP ${response.status}`,
      );
    }

    return response;
  }

  throw new Error("Model directory download has too many redirects");
}

function validateDownloadUrl(input: string | URL): URL {
  const url = new URL(input);

  if (url.protocol !== "https:") {
    throw new Error("Model directory downloads require HTTPS");
  }

  if (url.username || url.password) {
    throw new Error("Model directory download URLs cannot contain credentials");
  }

  return url;
}

async function readResponseBytes(
  response: Response,
  maxBytes: number,
): Promise<Uint8Array> {
  const contentLength = response.headers.get("content-length");

  if (
    contentLength &&
    /^\d+$/.test(contentLength) &&
    Number(contentLength) > maxBytes
  ) {
    throw new Error(`Model directory download exceeds ${maxBytes} bytes`);
  }

  if (!response.body) {
    throw new Error("Model directory download returned an empty response");
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      totalBytes += value.byteLength;

      if (totalBytes > maxBytes) {
        await reader.cancel();
        throw new Error(`Model directory download exceeds ${maxBytes} bytes`);
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return bytes;
}

async function writeAtomically(path: string, bytes: Uint8Array): Promise<void> {
  const directory = dirname(path);
  await mkdir(directory, { mode: 0o700, recursive: true });

  const temporaryPath = join(
    directory,
    `.${basename(path)}.${randomBytes(12).toString("hex")}.tmp`,
  );
  const file = await open(temporaryPath, "wx", 0o600);

  try {
    await file.writeFile(bytes);
    await file.sync();
  } catch (error) {
    await file.close();
    await rm(temporaryPath, { force: true });
    throw error;
  }

  await file.close();

  try {
    await rename(temporaryPath, path);
    await chmod(path, 0o600);
  } catch (error) {
    await rm(temporaryPath, { force: true });
    throw error;
  }
}

function parseAndValidate(bytes: Uint8Array): ModelDirectory {
  let value: unknown;

  try {
    const json = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    value = JSON.parse(json) as unknown;
  } catch {
    throw new Error("Model directory data is not valid UTF-8 JSON");
  }

  return validateDirectory(value);
}

function validateDirectory(value: unknown): ModelDirectory {
  const input = requireRecord(value, "directory");
  const result = Object.create(null) as ModelDirectory;

  for (const [providerId, providerValue] of safeEntries(input, "directory")) {
    requireSafeKey(providerId, "provider id");
    const provider = validateProvider(providerValue, providerId);
    result[providerId] = provider;
  }

  if (Object.keys(result).length === 0) {
    throw new Error("Model directory must contain at least one provider");
  }

  return result;
}

function validateProvider(value: unknown, key: string): ProviderEntry {
  const input = requireRecord(value, `provider ${key}`);
  requireOnlyKeys(
    input,
    ["id", "name", "website", "apiBaseUrl", "aiSdk", "models"],
    `provider ${key}`,
  );
  const id = requireString(input.id, `provider ${key}.id`, 200);

  if (id !== key) {
    throw new Error(`Provider key does not match id for ${key}`);
  }

  const provider: ProviderEntry = {
    id,
    name: requireString(input.name, `provider ${key}.name`, 500),
    models: validateModels(input.models, key),
  };

  if (input.website !== undefined) {
    provider.website = requireString(
      input.website,
      `provider ${key}.website`,
      2_000,
    );
  }

  if (input.apiBaseUrl !== undefined) {
    provider.apiBaseUrl = requireString(
      input.apiBaseUrl,
      `provider ${key}.apiBaseUrl`,
      2_000,
    );
  }

  if (input.aiSdk !== undefined) {
    provider.aiSdk = validateAiSdk(input.aiSdk, key);
  }

  return provider;
}

function validateModels(
  value: unknown,
  providerId: string,
): Record<string, ModelRecord> {
  const input = requireRecord(value, `provider ${providerId}.models`);
  const result = Object.create(null) as Record<string, ModelRecord>;

  for (const [modelId, modelValue] of safeEntries(
    input,
    `provider ${providerId}.models`,
  )) {
    requireSafeKey(modelId, "model id");
    const model = validateModel(modelValue, providerId, modelId);
    result[modelId] = model;
  }

  return result;
}

function validateModel(
  value: unknown,
  providerId: string,
  key: string,
): ModelRecord {
  const path = `provider ${providerId}.models.${key}`;
  const input = requireRecord(value, path);
  requireOnlyKeys(
    input,
    [
      "id",
      "name",
      "knowledge_cutoff",
      "release_date",
      "last_updated",
      "open_weights",
      "features",
      "pricing",
      "limit",
      "modalities",
    ],
    path,
  );
  const id = requireString(input.id, `${path}.id`, 200);

  if (id !== key) {
    throw new Error(`Model key does not match id at ${path}`);
  }

  const model: ModelRecord = { id };

  if (input.name !== undefined) {
    model.name = requireString(input.name, `${path}.name`, 500);
  }

  for (const field of [
    "knowledge_cutoff",
    "release_date",
    "last_updated",
  ] as const) {
    if (input[field] !== undefined) {
      const timestamp = requireString(input[field], `${path}.${field}`, 30);

      if (!/^(0|[1-9]\d*)$/.test(timestamp)) {
        throw new Error(`${path}.${field} must be a Unix timestamp`);
      }

      model[field] = timestamp;
    }
  }

  if (input.open_weights !== undefined) {
    model.open_weights = requireBoolean(
      input.open_weights,
      `${path}.open_weights`,
    );
  }

  if (input.features !== undefined) {
    model.features = validateBooleanRecord<ModelFeatures>(
      input.features,
      [
        "attachment",
        "reasoning",
        "tool_call",
        "structured_output",
        "temperature",
      ],
      `${path}.features`,
    );
  }

  if (input.pricing !== undefined) {
    model.pricing = validateNumberRecord<ModelPricing>(
      input.pricing,
      [
        "input",
        "output",
        "reasoning",
        "cache_read",
        "cache_write",
        "input_audio",
        "output_audio",
      ],
      `${path}.pricing`,
      false,
    );
  }

  if (input.limit !== undefined) {
    model.limit = validateNumberRecord<ModelLimit>(
      input.limit,
      ["context", "input", "output"],
      `${path}.limit`,
      true,
    );
  }

  if (input.modalities !== undefined) {
    model.modalities = validateModalities(
      input.modalities,
      `${path}.modalities`,
    );
  }

  return model;
}

function validateAiSdk(value: unknown, providerId: string): ProviderAiSdk {
  const path = `provider ${providerId}.aiSdk`;
  const input = requireRecord(value, path);
  requireOnlyKeys(input, ["npmPackage", "defaultApiKeyEnv"], path);
  const result: ProviderAiSdk = {};

  if (input.npmPackage !== undefined) {
    result.npmPackage = requireString(
      input.npmPackage,
      `${path}.npmPackage`,
      500,
    );
  }

  if (input.defaultApiKeyEnv !== undefined) {
    if (!Array.isArray(input.defaultApiKeyEnv)) {
      throw new Error(`${path}.defaultApiKeyEnv must be an array`);
    }

    result.defaultApiKeyEnv = input.defaultApiKeyEnv.map((entry, index) =>
      requireString(entry, `${path}.defaultApiKeyEnv[${index}]`, 500),
    );
  }

  return result;
}

function validateModalities(value: unknown, path: string): ModelModalities {
  const input = requireRecord(value, path);
  requireOnlyKeys(input, ["input", "output"], path);
  const result: ModelModalities = {};

  for (const field of ["input", "output"] as const) {
    const entries = input[field];

    if (entries === undefined) {
      continue;
    }

    if (!Array.isArray(entries)) {
      throw new Error(`${path}.${field} must be an array`);
    }

    result[field] = entries.map((entry, index) => {
      if (
        typeof entry !== "string" ||
        !modalityValues.has(entry as ModelModality)
      ) {
        throw new Error(`${path}.${field}[${index}] is not a valid modality`);
      }

      return entry as ModelModality;
    });
  }

  return result;
}

function validateBooleanRecord<T extends object>(
  value: unknown,
  keys: readonly (keyof T & string)[],
  path: string,
): T {
  const input = requireRecord(value, path);
  requireOnlyKeys(input, keys, path);
  const result = {} as T;

  for (const key of keys) {
    if (input[key] !== undefined) {
      Object.assign(result, {
        [key]: requireBoolean(input[key], `${path}.${key}`),
      });
    }
  }

  return result;
}

function validateNumberRecord<T extends object>(
  value: unknown,
  keys: readonly (keyof T & string)[],
  path: string,
  integer: boolean,
): T {
  const input = requireRecord(value, path);
  requireOnlyKeys(input, keys, path);
  const result = {} as T;

  for (const key of keys) {
    const entry = input[key];

    if (entry === undefined) {
      continue;
    }

    if (
      typeof entry !== "number" ||
      !Number.isFinite(entry) ||
      entry < 0 ||
      (integer && !Number.isInteger(entry))
    ) {
      throw new Error(
        `${path}.${key} must be a non-negative ${integer ? "integer" : "number"}`,
      );
    }

    Object.assign(result, { [key]: entry });
  }

  return result;
}

function requireRecord(value: unknown, path: string): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${path} must be an object`);
  }

  return value as Record<string, unknown>;
}

function safeEntries(
  value: Record<string, unknown>,
  path: string,
): [string, unknown][] {
  const entries = Object.entries(value);

  for (const [key] of entries) {
    requireSafeKey(key, path);
  }

  return entries;
}

function requireOnlyKeys(
  value: Record<string, unknown>,
  allowedKeys: readonly string[],
  path: string,
): void {
  const allowed = new Set(allowedKeys);

  for (const key of Object.keys(value)) {
    requireSafeKey(key, path);

    if (!allowed.has(key)) {
      throw new Error(`${path} contains unsupported field ${key}`);
    }
  }
}

function requireSafeKey(key: string, path: string): void {
  if (dangerousKeys.has(key)) {
    throw new Error(`${path} contains an unsafe key`);
  }
}

function requireString(
  value: unknown,
  path: string,
  maxLength: number,
): string {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.length > maxLength ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    throw new Error(`${path} must be a valid non-empty string`);
  }

  return value;
}

function requireBoolean(value: unknown, path: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`${path} must be a boolean`);
  }

  return value;
}

function validatePositiveInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive safe integer`);
  }

  return value;
}

function validateExpectedSha256(value: string | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const normalized = value.toLowerCase();

  if (!/^[a-f0-9]{64}$/.test(normalized)) {
    throw new Error("expectedSha256 must be a 64-character hexadecimal digest");
  }

  return normalized;
}
