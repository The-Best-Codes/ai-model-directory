import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "src/docs");
const defaultTitle = "Docs | AI Model Directory";
const defaultDescription = "Documentation for AI Model Directory.";

type DocFrontmatter = {
  title?: string;
  description?: string;
  order?: number;
};

export type DocPage = DocFrontmatter & {
  slug: string;
  href: string;
  title: string;
};

export type Doc = DocPage & {
  content: string;
};

const docPathBySlug = new Map(
  getDocSlugs().flatMap((slug) => {
    const docPath = findDocPath(slug);

    return docPath ? [[slug, docPath]] : [];
  }),
);

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
  return docPathBySlug.get(slug);
}

export function getDocMetadata(docPath: string) {
  const frontmatter = readDocFile(docPath).data;

  return {
    title: frontmatter.title
      ? `${frontmatter.title} | AI Model Directory`
      : defaultTitle,
    description: frontmatter.description ?? defaultDescription,
  };
}

export function getDocPages(): DocPage[] {
  return getDocSlugs()
    .map((slug) => {
      const docPath = getDocPath(slug);

      if (!docPath) {
        return null;
      }

      const frontmatter = readDocFile(docPath).data;

      return {
        slug,
        href: slug ? `/docs/${slug}` : "/docs",
        title: frontmatter.title ?? titleFromSlug(slug),
        description: frontmatter.description,
        order: frontmatter.order,
      };
    })
    .filter((page) => page !== null)
    .sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return a.slug.localeCompare(b.slug);
    });
}

export function getDoc(slug: string): Doc | undefined {
  const docPath = getDocPath(slug);

  if (!docPath) {
    return undefined;
  }

  const { data, content } = readDocFile(docPath);

  return {
    slug,
    href: slug ? `/docs/${slug}` : "/docs",
    title: data.title ?? titleFromSlug(slug),
    description: data.description,
    order: data.order,
    content,
  };
}

function readDocFile(docPath: string) {
  const filePath = path.join(docsDirectory, docPath);

  if (!isPathInside(filePath, docsDirectory)) {
    throw new Error(`Invalid doc path: ${docPath}`);
  }

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));

  return {
    data: {
      title: typeof data.title === "string" ? data.title : undefined,
      description:
        typeof data.description === "string" ? data.description : undefined,
      order: typeof data.order === "number" ? data.order : undefined,
    } satisfies DocFrontmatter,
    content,
  };
}

function findDocPath(slug: string) {
  const filePath = path.join(docsDirectory, `${slug || "index"}.mdx`);
  const indexPath = path.join(docsDirectory, slug, "index.mdx");

  if (!isPathInside(filePath, docsDirectory) || !isPathInside(indexPath, docsDirectory)) {
    return undefined;
  }

  if (fs.existsSync(filePath)) {
    return `${slug || "index"}.mdx`;
  }

  if (fs.existsSync(indexPath)) {
    return `${slug}/index.mdx`;
  }
}

function titleFromSlug(slug: string) {
  if (!slug) {
    return "Overview";
  }

  return slug
    .split("/")
    .at(-1)!
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function isPathInside(filePath: string, directory: string) {
  const relativePath = path.relative(
    path.resolve(directory),
    path.resolve(filePath),
  );

  return relativePath !== "" && !relativePath.startsWith("..") && !path.isAbsolute(relativePath);
}
