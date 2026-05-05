import type { CompactProviderEntry } from "./compact-types.js";
import { rawCompactModelDirectoryData } from "./generated-data.js";

export const compactModelDirectoryData =
  rawCompactModelDirectoryData as unknown as readonly CompactProviderEntry[];
