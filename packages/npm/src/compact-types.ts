export type CompactAiSdk = readonly [
  npmPackage?: string | null,
  defaultApiKeyEnv?: readonly string[] | null,
];

export type CompactFeatures = readonly [
  presentMask: number,
  truthyMask: number,
];

export type CompactPricing = readonly [
  input?: number | null,
  output?: number | null,
  reasoning?: number | null,
  cacheRead?: number | null,
  cacheWrite?: number | null,
  inputAudio?: number | null,
  outputAudio?: number | null,
];

export type CompactLimit = readonly [
  context?: number | null,
  input?: number | null,
  output?: number | null,
];

export type CompactModalities = readonly [
  inputMask?: number | null,
  outputMask?: number | null,
];

export type CompactModelEntry = readonly [
  id: string,
  name?: string | null,
  releaseDate?: number | null,
  knowledgeCutoff?: number | null,
  lastUpdated?: number | null,
  openWeights?: boolean | null,
  features?: CompactFeatures | null,
  pricing?: CompactPricing | null,
  limit?: CompactLimit | null,
  modalities?: CompactModalities | null,
];

export type CompactProviderEntry = readonly [
  id: string,
  name: string,
  website?: string | null,
  apiBaseUrl?: string | null,
  aiSdk?: CompactAiSdk | null,
  models?: readonly CompactModelEntry[] | null,
];
