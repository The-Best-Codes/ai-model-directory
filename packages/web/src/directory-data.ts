export type DirectoryData = Record<string, ProviderRecord>;

type ProviderRecord = {
  id: string;
  name?: string;
  website?: string;
  apiBaseUrl?: string;
  aiSdk?: {
    npmPackage?: string;
    defaultApiKeyEnv?: string[];
  };
  models: Record<string, ModelRecord>;
};

type ModelRecord = {
  id: string;
  name?: string;
  knowledge_cutoff?: string;
  release_date?: string;
  last_updated?: string;
  open_weights?: boolean;
  features?: {
    attachment?: boolean;
    reasoning?: boolean;
    tool_call?: boolean;
    structured_output?: boolean;
    temperature?: boolean;
  };
  pricing?: {
    input?: number;
    output?: number;
    reasoning?: number;
    cache_read?: number;
    cache_write?: number;
    input_audio?: number;
    output_audio?: number;
  };
  limit?: {
    context?: number;
    input?: number;
    output?: number;
  };
  modalities?: {
    input?: string[];
    output?: string[];
  };
};

export async function loadDirectoryData() {
  const response = await fetch(
    "https://raw.githubusercontent.com/The-Best-Codes/ai-model-directory/main/data/all.min.json",
    { headers: { accept: "application/json" }, next: { revalidate: 3600 } },
  );

  if (!response.ok) {
    throw new Error(`Failed to load model directory: ${response.status}`);
  }

  return response.json() as Promise<DirectoryData>;
}
