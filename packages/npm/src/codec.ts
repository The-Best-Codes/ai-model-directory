import type {
  CompactAiSdk,
  CompactFeatures,
  CompactLimit,
  CompactModalities,
  CompactModelEntry,
  CompactPricing,
  CompactProviderEntry,
} from "./compact-types.js";
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

const modelNameSameAsId = "";

const modalityOrder: readonly ModelModality[] = [
  "audio",
  "file",
  "image",
  "text",
  "video",
];

const featureKeys = [
  "attachment",
  "reasoning",
  "tool_call",
  "structured_output",
  "temperature",
] as const satisfies readonly (keyof ModelFeatures)[];

const pricingKeys = [
  "input",
  "output",
  "reasoning",
  "cache_read",
  "cache_write",
  "input_audio",
  "output_audio",
] as const satisfies readonly (keyof ModelPricing)[];

const limitKeys = [
  "context",
  "input",
  "output",
] as const satisfies readonly (keyof ModelLimit)[];

function toTimestamp(value: number | null | undefined): string | undefined {
  return value === null || value === undefined ? undefined : String(value);
}

function decodeAiSdk(
  value: CompactAiSdk | null | undefined,
): ProviderAiSdk | undefined {
  if (!value) {
    return undefined;
  }

  const [npmPackage, defaultApiKeyEnv] = value;
  const result: ProviderAiSdk = {};

  if (npmPackage !== null && npmPackage !== undefined) {
    result.npmPackage = npmPackage;
  }

  if (defaultApiKeyEnv !== null && defaultApiKeyEnv !== undefined) {
    result.defaultApiKeyEnv = [...defaultApiKeyEnv];
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

function decodeFeatures(
  value: CompactFeatures | null | undefined,
): ModelFeatures | undefined {
  if (!value) {
    return undefined;
  }

  const [presentMask, truthyMask] = value;
  const result: ModelFeatures = {};

  for (let index = 0; index < featureKeys.length; index += 1) {
    const key = featureKeys[index];

    if (!key) {
      continue;
    }

    const bit = 1 << index;

    if ((presentMask & bit) === 0) {
      continue;
    }

    result[key] = (truthyMask & bit) !== 0;
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

function decodePricing(
  value: CompactPricing | null | undefined,
): ModelPricing | undefined {
  if (!value) {
    return undefined;
  }

  const result: ModelPricing = {};

  for (let index = 0; index < pricingKeys.length; index += 1) {
    const key = pricingKeys[index];
    const entry = value[index];

    if (key && entry !== null && entry !== undefined) {
      result[key] = entry;
    }
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

function decodeLimit(
  value: CompactLimit | null | undefined,
): ModelLimit | undefined {
  if (!value) {
    return undefined;
  }

  const result: ModelLimit = {};

  for (let index = 0; index < limitKeys.length; index += 1) {
    const key = limitKeys[index];
    const entry = value[index];

    if (key && entry !== null && entry !== undefined) {
      result[key] = entry;
    }
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

function decodeModalityMask(
  mask: number | null | undefined,
): ModelModality[] | undefined {
  if (mask === null || mask === undefined || mask === 0) {
    return undefined;
  }

  const result: ModelModality[] = [];

  for (let index = 0; index < modalityOrder.length; index += 1) {
    const modality = modalityOrder[index];

    if (modality && (mask & (1 << index)) !== 0) {
      result.push(modality);
    }
  }

  return result.length > 0 ? result : undefined;
}

function decodeModalities(
  value: CompactModalities | null | undefined,
): ModelModalities | undefined {
  if (!value) {
    return undefined;
  }

  const [inputMask, outputMask] = value;
  const result: ModelModalities = {};
  const input = decodeModalityMask(inputMask);
  const output = decodeModalityMask(outputMask);

  if (input) {
    result.input = input;
  }

  if (output) {
    result.output = output;
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

function decodeModel(entry: CompactModelEntry): ModelRecord {
  const [
    id,
    compactName,
    releaseDate,
    knowledgeCutoff,
    lastUpdated,
    openWeights,
    features,
    pricing,
    limit,
    modalities,
  ] = entry;

  const model: ModelRecord = { id };

  const releaseDateValue = toTimestamp(releaseDate);
  const knowledgeCutoffValue = toTimestamp(knowledgeCutoff);
  const lastUpdatedValue = toTimestamp(lastUpdated);
  const decodedFeatures = decodeFeatures(features);
  const decodedPricing = decodePricing(pricing);
  const decodedLimit = decodeLimit(limit);
  const decodedModalities = decodeModalities(modalities);

  if (compactName === modelNameSameAsId) {
    model.name = id;
  } else if (compactName !== null && compactName !== undefined) {
    model.name = compactName;
  }

  if (knowledgeCutoffValue !== undefined) {
    model.knowledge_cutoff = knowledgeCutoffValue;
  }

  if (releaseDateValue !== undefined) {
    model.release_date = releaseDateValue;
  }

  if (lastUpdatedValue !== undefined) {
    model.last_updated = lastUpdatedValue;
  }

  if (openWeights !== null && openWeights !== undefined) {
    model.open_weights = openWeights;
  }

  if (decodedFeatures) {
    model.features = decodedFeatures;
  }

  if (decodedPricing) {
    model.pricing = decodedPricing;
  }

  if (decodedLimit) {
    model.limit = decodedLimit;
  }

  if (decodedModalities) {
    model.modalities = decodedModalities;
  }

  return model;
}

function decodeProvider(entry: CompactProviderEntry): ProviderEntry {
  const [id, name, website, apiBaseUrl, aiSdk, models = []] = entry;
  const compactModels = models ?? [];
  const provider = {
    id,
    name,
  } as ProviderEntry;

  if (website !== null && website !== undefined) {
    provider.website = website;
  }

  if (apiBaseUrl !== null && apiBaseUrl !== undefined) {
    provider.apiBaseUrl = apiBaseUrl;
  }

  const decodedAiSdk = decodeAiSdk(aiSdk);

  if (decodedAiSdk) {
    provider.aiSdk = decodedAiSdk;
  }

  provider.models = {};

  for (const modelEntry of compactModels) {
    const model = decodeModel(modelEntry);
    provider.models[model.id] = model;
  }

  return provider;
}

export function decodeModelDirectory(
  data: readonly CompactProviderEntry[],
): ModelDirectory {
  const result: ModelDirectory = {};

  for (const providerEntry of data) {
    const provider = decodeProvider(providerEntry);
    result[provider.id] = provider;
  }

  return result;
}
