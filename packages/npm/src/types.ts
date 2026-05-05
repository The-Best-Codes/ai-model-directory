export type UnixTimestamp = string;

export type ModelModality = "audio" | "file" | "image" | "text" | "video";

export type ModelFeatures = {
  attachment?: boolean;
  reasoning?: boolean;
  tool_call?: boolean;
  structured_output?: boolean;
  temperature?: boolean;
};

export type ModelPricing = {
  input?: number;
  output?: number;
  reasoning?: number;
  cache_read?: number;
  cache_write?: number;
  input_audio?: number;
  output_audio?: number;
};

export type ModelLimit = {
  context?: number;
  input?: number;
  output?: number;
};

export type ModelModalities = {
  input?: ModelModality[];
  output?: ModelModality[];
};

export type ModelRecord = {
  id: string;
  name?: string;
  knowledge_cutoff?: UnixTimestamp;
  release_date?: UnixTimestamp;
  last_updated?: UnixTimestamp;
  open_weights?: boolean;
  features?: ModelFeatures;
  pricing?: ModelPricing;
  limit?: ModelLimit;
  modalities?: ModelModalities;
};

export type ProviderAiSdk = {
  npmPackage?: string;
  defaultApiKeyEnv?: string[];
};

export type ProviderEntry = {
  id: string;
  name: string;
  website?: string;
  apiBaseUrl?: string;
  aiSdk?: ProviderAiSdk;
  models: Record<string, ModelRecord>;
};

export type ModelDirectory = Record<string, ProviderEntry>;
