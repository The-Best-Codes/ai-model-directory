import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";

const siteUrl = "https://models.agent-one.dev";
const rootPath = join(import.meta.dirname, "..");
const srcPath = join(rootPath, "src");
const sitemapPath = join(import.meta.dirname, "..", "public", "sitemap.xml");

const routes = await discoverRoutes();
const urls = routes
	.map(
		(route) => `\t<url>\n\t\t<loc>${siteUrl}${route}</loc>\n\t</url>`,
	)
	.join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

await mkdir(dirname(sitemapPath), { recursive: true });
await writeFile(sitemapPath, sitemap);

async function discoverRoutes() {
	const [appRoutes, docRoutes] = await Promise.all([
		discoverAppRoutes(),
		discoverDocRoutes(),
	]);

	return [...new Set([...appRoutes, ...docRoutes])].sort((a, b) => {
		if (a === "/") {
			return -1;
		}

		if (b === "/") {
			return 1;
		}

		return a.localeCompare(b);
	});
}

async function discoverAppRoutes() {
	const main = await readFile(join(srcPath, "main.tsx"), "utf8");
	const routeMatches = main.matchAll(/path:\s*["']([^"']+)["']/g);

	return [...routeMatches]
		.map((match) => match[1])
		.filter((route) => route && route.startsWith("/") && route !== "*")
		.map((route) => route.replace(/\/\*$/, ""));
}

async function discoverDocRoutes() {
	const docsPath = join(srcPath, "docs");
	const files = await listFiles(docsPath);

	return files
		.filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
		.map((file) => {
			const docPath = relative(docsPath, file)
				.split(sep)
				.join("/")
				.replace(/\.(md|mdx)$/, "")
				.replace(/(^|\/)index$/, "");

			return `/docs/${docPath}`.replace(/\/$/, "") || "/docs";
		});
}

async function listFiles(path: string): Promise<string[]> {
	const entries = await readdir(path, { withFileTypes: true });
	const files = await Promise.all(
		entries.map((entry) => {
			const entryPath = join(path, entry.name);

			return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
		}),
	);

	return files.flat();
}
