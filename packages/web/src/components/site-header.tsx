"use client";

import Image from "next/image";
import Link from "next/link";
import { IconBrandGithub, IconMenu2 } from "@tabler/icons-react";

import { SiteSearch, type SearchPage } from "#/components/site-search";
import { Button } from "#/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "#/components/ui/sheet";

const navItems = [
  { href: "/list", label: "Models" },
  { href: "/providers", label: "Providers" },
  { href: "/docs", label: "Docs" },
];

const githubUrl = "https://github.com/The-Best-Codes/ai-model-directory";

export function SiteHeader({ docPages }: { docPages: SearchPage[] }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="flex h-14 w-full items-center gap-2 px-3">
        <Link
          href="/"
          className="mr-2 flex shrink-0 items-center gap-2 font-semibold"
        >
          <Image src="/icon.svg" alt="" width={24} height={24} />
          <span className="hidden sm:inline">AI Model Directory</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <SiteSearch docPages={docPages} />
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <IconBrandGithub />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <IconMenu2 />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>AI Model Directory</SheetTitle>
                <SheetDescription>Browse models and providers</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-2">
                {navItems.map((item) => (
                  <SheetClose key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <IconBrandGithub className="size-4" />
                  GitHub
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
