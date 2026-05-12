export type ModelModality = "text" | "image" | "audio" | "video" | "file";

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
  knowledge_cutoff?: string;
  release_date?: string;
  last_updated?: string;
  open_weights?: boolean;
  features?: ModelFeatures;
  pricing?: ModelPricing;
  limit?: ModelLimit;
  modalities?: ModelModalities;
};

export type FlatModel = ModelRecord & {
  provider: string;
};

export type RouteQuery = {
  provider?: string;
  inputModalities?: ModelModality[];
  outputModalities?: ModelModality[];
  features?: Partial<ModelFeatures>;
  minContext?: number;
  maxInputPrice?: number;
  maxOutputPrice?: number;
  openWeights?: boolean;
  sort?: "context" | "input_price" | "output_price" | "id";
  order?: "asc" | "desc";
  limit?: number;
  offset?: number;
};

export type RouteResult = {
  models: FlatModel[];
  total: number;
  hasMore: boolean;
};

export type CostRequest = {
  inputTokens: number;
  outputTokens: number;
  reasoningTokens?: number;
  cacheReadTokens?: number;
  cacheWriteTokens?: number;
  inputAudioTokens?: number;
  outputAudioTokens?: number;
};

export type CostBreakdown = {
  input: number;
  output: number;
  reasoning: number;
  cacheRead: number;
  cacheWrite: number;
  inputAudio: number;
  outputAudio: number;
  total: number;
};

export type FallbackOptions = {
  matchFeatures?: boolean;
  matchModalities?: boolean;
  maxContextDifference?: number;
  maxPriceMultiplier?: number;
  limit?: number;
};

export type FallbackChain = {
  models: FlatModel[];
  original: FlatModel;
};

export type ContextFit = {
  fits: boolean;
  model: FlatModel;
  availableContext: number;
  requestedTokens: number;
  overhead: number;
  shouldCompact: boolean;
  betterAlternatives: FlatModel[];
};

export type ComparisonField = {
  field: string;
  values: Record<string, string | number | boolean | null>;
  winner?: string;
};

export type ModelComparison = {
  models: FlatModel[];
  fields: ComparisonField[];
};
