import Link from "next/link";

import { cn } from "#/lib/utils";
import type { DocPage } from "#/lib/docs";

type DocsSidebarProps = {
  pages: DocPage[];
  currentSlug: string;
};

export function DocsSidebar({ pages, currentSlug }: DocsSidebarProps) {
  return (
    <nav className="flex flex-col gap-1">
      {pages.map((page) => (
        <Link
          key={page.href}
          href={page.href}
          aria-current={page.slug === currentSlug ? "page" : undefined}
          className={cn(
            "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            page.slug === currentSlug && "bg-accent text-accent-foreground",
          )}
        >
          {page.title}
        </Link>
      ))}
    </nav>
  );
}
