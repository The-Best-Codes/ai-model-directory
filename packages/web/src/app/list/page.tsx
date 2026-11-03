import type { Metadata } from "next";

import { loadDirectoryData } from "#/directory-data";
import { ListPage } from "#/ListPage";
import { loadModelIndex } from "#/model-groups";

export const metadata: Metadata = {
  title: "All AI Models",
  description:
    "Search and compare AI model pricing, limits, modalities, features, and provider metadata.",
};

export default async function Page() {
  const [directory, { slugOverrides }] = await Promise.all([
    loadDirectoryData(),
    loadModelIndex(),
  ]);

  return <ListPage directory={directory} modelSlugs={slugOverrides} />;
}
