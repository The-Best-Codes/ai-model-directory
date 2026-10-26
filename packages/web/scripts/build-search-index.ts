import { writeFile } from "node:fs/promises";

import { buildSearchIndex } from "#/search-index";

await writeFile(
  "public/search-index.json",
  JSON.stringify(await buildSearchIndex()),
);
