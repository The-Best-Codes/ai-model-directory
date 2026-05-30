import fs from "node:fs";
import path from "node:path";

const docsDirectory = path.join(process.cwd(), "src/docs");
const defaultTitle = "Docs | AI Model Directory";
const defaultDescription = "Documentation for AI Model Directory.";

type DocFrontmatter = {
  title?: string;
  description?: string;
};

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

export function getDocMetadata(docPath: string) {
  const frontmatter = readFrontmatter(
    fs.readFileSync(path.join(docsDirectory, docPath), "utf8"),
  );

  return {
    title: frontmatter.title
      ? `${frontmatter.title} | AI Model Directory`
      : defaultTitle,
    description: frontmatter.description ?? defaultDescription,
  };
}

function readFrontmatter(source: string): DocFrontmatter {
  if (!source.startsWith("---\n")) {
    return {};
  }

  const end = source.indexOf("\n---", 4);

  if (end === -1) {
    return {};
  }

  return source
    .slice(4, end)
    .split("\n")
    .reduce<DocFrontmatter>((metadata, line) => {
      const separator = line.indexOf(":");

      if (separator === -1) {
        return metadata;
      }

      const key = line.slice(0, separator).trim();
      const value = line
        .slice(separator + 1)
        .trim()
        .replace(/^['\"]|['\"]$/g, "");

      if ((key === "title" || key === "description") && value) {
        metadata[key] = value;
      }

      return metadata;
    }, {});
}
