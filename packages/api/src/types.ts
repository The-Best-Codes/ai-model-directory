type UnixTimestamp = string;

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
  knowledge_cutoff?: UnixTimestamp;
  release_date?: UnixTimestamp;
  last_updated?: UnixTimestamp;
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

type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    count: number;
    offset: number;
    has_more: boolean;
  };
};

type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export type {
  UnixTimestamp,
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
  PaginatedResponse,
  ErrorResponse,
};
