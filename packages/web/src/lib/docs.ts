import fs from "node:fs";
import path from "node:path";

const docsDirectory = path.join(process.cwd(), "src/docs");

export function getDocSlugs(directory = docsDirectory, prefix = ""): string[] {
  const slugs: string[] = [];

  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const relativePath = prefix ? path.join(prefix, item.name) : item.name;
    const fullPath = path.join(directory, item.name);

    if (item.isDirectory()) {
      slugs.push(...getDocSlugs(fullPath, relativePath));
    } else if (item.isFile() && item.name.endsWith(".mdx")) {
      const slug = relativePath.replace(/\.mdx$/, "").replace(/\\/g, "/");
      slugs.push(slug === "index" ? "" : slug.replace(/\/index$/, ""));
    }
  }

  return slugs;
}

export function getDocPath(slug: string) {
  const filePath = path.join(docsDirectory, `${slug || "index"}.mdx`);
  const indexPath = path.join(docsDirectory, slug, "index.mdx");

  if (fs.existsSync(filePath)) {
    return `${slug || "index"}.mdx`;
  }

  if (fs.existsSync(indexPath)) {
    return `${slug}/index.mdx`;
  }
}
