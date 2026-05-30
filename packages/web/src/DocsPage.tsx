import { Button } from "#/components/ui/button";
import { Link } from "react-router";
import DocsIndex from "./docs/index.mdx";

export function DocsPage() {
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
				<DocsIndex />
			</article>
		</main>
	);
}
