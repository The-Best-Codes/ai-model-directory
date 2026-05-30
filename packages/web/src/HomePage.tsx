import { Button } from "#/components/ui/button";
import { IconExternalLink } from "@tabler/icons-react";
import { Link } from "react-router";

export function HomePage() {
	return (
		<main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-6 px-6 py-16">
			<div className="space-y-4">
				<h1 className="text-4xl font-bold tracking-tight">
					AI Model Directory
				</h1>
				<p className="text-lg text-muted-foreground">
					The most comprehensive list of AI models. Browse pricing, context
					limits, features, and more across all major providers.
				</p>
			</div>
			<div className="flex flex-row gap-2">
				<Button asChild size="lg">
					<Link to="/list">Browse all models</Link>
				</Button>
				<Button asChild size="lg" variant="secondary">
					<a
						href="https://github.com/The-Best-Codes/ai-model-directory"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
						<IconExternalLink />
					</a>
				</Button>
			</div>
		</main>
	);
}
