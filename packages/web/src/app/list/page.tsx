import type { Metadata } from "next";

import { loadDirectoryData } from "#/directory-data";
import { ListPage } from "#/ListPage";

export const metadata: Metadata = {
  title: "AI Models | AI Model Directory",
  description:
    "Search and compare AI model pricing, limits, modalities, features, and provider metadata.",
};

export const revalidate = 3600;

export default async function Page() {
  const directory = await loadDirectoryData();

  return <ListPage directory={directory} />;
}
