import * as React from "react";
import { Button } from "#/components/ui/button";
import { Link, useParams } from "react-router";
import { NotFoundPage } from "./NotFoundPage";

type MdxModule = {
	default: React.ComponentType;
};

const docModules = import.meta.glob<MdxModule>("./docs/**/*.mdx", {
	eager: true,
});
const docs = Object.fromEntries(
	Object.entries(docModules).map(([path, module]) => [
		toDocSlug(path),
		module.default,
	]),
);

export function DocsPage() {
	const params = useParams();
	const slug = params["*"] ?? "";
	const Doc = docs[slug];

	if (!Doc) {
		return <NotFoundPage />;
	}

	return (
		<main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-16">
			<nav className="flex items-center justify-between gap-4">
				<Button asChild variant="secondary">
					<Link to="/">Home</Link>
				</Button>
				<Button asChild>
					<Link to="/list">Browse all models</Link>
				</Button>
			</nav>
			<article className="prose prose-neutral max-w-none dark:prose-invert">
				<Doc />
			</article>
		</main>
	);
}

function toDocSlug(path: string) {
	return path
		.replace(/^\.\/docs\//, "")
		.replace(/\.mdx$/, "")
		.replace(/(^|\/)index$/, "");
}
