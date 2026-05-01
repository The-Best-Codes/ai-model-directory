import type { ProgressReporter } from "../progress.ts";
import type { ModelRecord } from "../schema.ts";

export type ProviderDefinition = {
  name: string;
  outputDirectory: string;
  fetchModels: (progress?: ProgressReporter) => Promise<ModelRecord[]>;
};
