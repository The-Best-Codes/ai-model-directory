"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  IconArrowsLeftRight,
  IconBook,
  IconBuilding,
  IconCube,
  IconFileText,
  IconHome,
  IconList,
  IconSearch,
} from "@tabler/icons-react";

import { Button } from "#/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "#/components/ui/command";
import { formatPrice, formatTokenCount } from "#/lib/format";
import { comparisonSlug } from "#/lib/model-slug";
import { normalizeSearchText } from "#/lib/search-text";
import type { SearchIndex } from "#/search-index";

export type SearchPage = {
  title: string;
  href: string;
};

type Searchable = {
  title: string;
  titleText: string;
  haystack: string;
};

type PreparedModel = Searchable & {
  slug: string;
  providerCount: number;
  input?: number;
  output?: number;
  context?: number;
};

type PreparedProvider = Searchable & {
  id: string;
  modelCount: number;
};

type PreparedDoc = Searchable & {
  href: string;
};

type PreparedIndex = {
  models: PreparedModel[];
  providers: PreparedProvider[];
  docs: PreparedDoc[];
};

const modelResultLimit = 50;
const providerResultLimit = 8;

const mainPages = [
  { title: "Home", href: "/", icon: IconHome, keywords: "start" },
  {
    title: "All models",
    href: "/list",
    icon: IconList,
    keywords: "list table browse pricing",
  },
  {
    title: "Providers",
    href: "/providers",
    icon: IconBuilding,
    keywords: "platforms labs",
  },
  {
    title: "Docs",
    href: "/docs",
    icon: IconBook,
    keywords: "documentation help",
  },
].map((page) => ({
  ...page,
  ...toSearchable(page.title, page.keywords),
}));

function toSearchable(title: string, keywords: string): Searchable {
  const titleText = normalizeSearchText(title);

  return { title, titleText, haystack: ` ${titleText} ${keywords} ` };
}

function prepareIndex(index: SearchIndex): PreparedIndex {
  return {
    models: index.models.map(
      ([slug, name, providerCount, input, output, context, keywords]) => ({
        ...toSearchable(name, `${normalizeSearchText(slug)} ${keywords}`),
        slug,
        providerCount,
        input: input ?? undefined,
        output: output ?? undefined,
        context: context ?? undefined,
      }),
    ),
    providers: index.providers.map(([id, name, modelCount]) => ({
      ...toSearchable(name, normalizeSearchText(id)),
      id,
      modelCount,
    })),
    docs: index.docs.map(([title, href, keywords]) => ({
      ...toSearchable(title, keywords),
      href,
    })),
  };
}

let searchIndexPromise: Promise<PreparedIndex> | undefined;

function loadSearchIndex() {
  searchIndexPromise ??= fetch("/search-index.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Search index request failed: ${response.status}`);
      }

      return response.json() as Promise<SearchIndex>;
    })
    .then(prepareIndex)
    .catch((error: unknown) => {
      searchIndexPromise = undefined;
      throw error;
    });

  return searchIndexPromise;
}

function search<T extends Searchable>(
  items: T[],
  query: string,
  limit: number,
) {
  const terms = query.split(" ");
  const tiers: T[][] = [[], [], [], []];

  for (const item of items) {
    if (!terms.every((term) => item.haystack.includes(term))) {
      continue;
    }

    const tier =
      item.titleText === query
        ? 0
        : item.titleText.startsWith(query)
          ? 1
          : item.haystack.includes(` ${query}`)
            ? 2
            : 3;
    tiers[tier]!.push(item);
  }

  return tiers.flat().slice(0, limit);
}

function findComparison(models: PreparedModel[], rawQuery: string) {
  const sides = rawQuery
    .toLowerCase()
    .split(/\s+vs\.?\s+/)
    .map(normalizeSearchText);

  if (sides.length !== 2 || !sides[0] || !sides[1]) {
    return undefined;
  }

  const left = search(models, sides[0], 1)[0];
  const right = search(models, sides[1], 1)[0];

  if (!left || !right || left === right) {
    return undefined;
  }

  return {
    title: `${left.title} vs ${right.title}`,
    href: `/compare/${comparisonSlug(left.slug, right.slug)}`,
  };
}

function describeModel(model: PreparedModel) {
  return [
    `${model.providerCount} ${model.providerCount === 1 ? "provider" : "providers"}`,
    model.input === undefined ? undefined : `${formatPrice(model.input)} in`,
    model.output === undefined ? undefined : `${formatPrice(model.output)} out`,
    model.context === undefined
      ? undefined
      : `${formatTokenCount(model.context)} context`,
  ]
    .filter(Boolean)
    .join(" · ");
}

function useShortcutLabel() {
  return React.useSyncExternalStore(
    () => () => {},
    () => (/mac|iphone|ipad/i.test(navigator.userAgent) ? "⌘K" : "Ctrl K"),
    () => "⌘K",
  );
}

export function SiteSearch({ docPages }: { docPages: SearchPage[] }) {
  const router = useRouter();
  const shortcutLabel = useShortcutLabel();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [index, setIndex] = React.useState<PreparedIndex>();
  const [failed, setFailed] = React.useState(false);
  const deferredQuery = React.useDeferredValue(query);

  const prefetch = React.useCallback(() => {
    loadSearchIndex().then(
      (loaded) => {
        setIndex(loaded);
        setFailed(false);
      },
      () => setFailed(true),
    );
  }, []);

  React.useEffect(() => {
    if (open) {
      prefetch();
    }
  }, [open, prefetch]);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";

      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      } else if (event.key === "/" && !isTyping) {
        event.preventDefault();
        setOpen(true);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const docs = React.useMemo(
    () =>
      index?.docs ??
      docPages.map((page) => ({ ...toSearchable(page.title, ""), ...page })),
    [index, docPages],
  );

  const results = React.useMemo(() => {
    const normalized = normalizeSearchText(deferredQuery);

    if (!normalized) {
      return undefined;
    }

    return {
      comparison: index
        ? findComparison(index.models, deferredQuery)
        : undefined,
      pages: search(mainPages, normalized, mainPages.length),
      models: index ? search(index.models, normalized, modelResultLimit) : [],
      providers: index
        ? search(index.providers, normalized, providerResultLimit)
        : [],
      docs: search(docs, normalized, docs.length),
    };
  }, [deferredQuery, index, docs]);

  const firstValue = results
    ? (results.comparison?.href ??
      results.pages[0]?.href ??
      (results.providers[0] && `/providers/${results.providers[0].id}`) ??
      (results.models[0] && `/models/${results.models[0].slug}`) ??
      (results.docs[0] && `docs:${results.docs[0].href}`))
    : mainPages[0]!.href;
  const [selectedValue, setSelectedValue] = React.useState(firstValue);

  React.useEffect(() => {
    setSelectedValue(firstValue);
  }, [results, firstValue]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const hasResults =
    results &&
    (results.comparison ||
      results.pages.length > 0 ||
      results.models.length > 0 ||
      results.providers.length > 0 ||
      results.docs.length > 0);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        onPointerEnter={prefetch}
        onFocus={prefetch}
        className="w-full max-w-64 justify-start gap-2 font-normal text-muted-foreground"
      >
        <IconSearch />
        <span className="truncate">Search models, providers, docs…</span>
        <kbd className="ml-auto hidden rounded border bg-muted px-1.5 font-mono text-[10px] sm:inline">
          {shortcutLabel}
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search"
        description="Search models, providers, and docs"
        className="top-4 translate-y-0 sm:top-[12vh] sm:max-w-2xl"
      >
        <Command
          shouldFilter={false}
          value={selectedValue ?? ""}
          onValueChange={setSelectedValue}
        >
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search models, providers, docs…"
          />
          <CommandList className="max-h-[min(70dvh,28rem)]">
            {results ? (
              <>
                {hasResults ? null : index || failed ? (
                  <CommandEmpty>
                    {failed
                      ? "Search is unavailable right now."
                      : "No results found."}
                  </CommandEmpty>
                ) : null}
                {results.comparison ? (
                  <CommandGroup heading="Compare">
                    <CommandItem
                      value={results.comparison.href}
                      onSelect={() => go(results.comparison!.href)}
                    >
                      <IconArrowsLeftRight />
                      {results.comparison.title}
                    </CommandItem>
                  </CommandGroup>
                ) : null}
                {results.pages.length > 0 ? (
                  <CommandGroup heading="Pages">
                    {results.pages.map((page) => (
                      <CommandItem
                        key={page.href}
                        value={page.href}
                        onSelect={() => go(page.href)}
                      >
                        <page.icon />
                        {page.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : null}
                {!index && !failed ? (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Loading models…
                  </div>
                ) : null}
                {results.providers.length > 0 ? (
                  <CommandGroup heading="Providers">
                    {results.providers.map((provider) => (
                      <CommandItem
                        key={provider.id}
                        value={`/providers/${provider.id}`}
                        onSelect={() => go(`/providers/${provider.id}`)}
                      >
                        <IconBuilding />
                        <span className="truncate">{provider.title}</span>
                        <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                          {provider.modelCount} models
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : null}
                {results.models.length > 0 ? (
                  <CommandGroup heading="Models">
                    {results.models.map((model) => (
                      <CommandItem
                        key={model.slug}
                        value={`/models/${model.slug}`}
                        onSelect={() => go(`/models/${model.slug}`)}
                      >
                        <IconCube />
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate">{model.title}</span>
                          <span className="truncate text-xs text-muted-foreground">
                            {describeModel(model)}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : null}
                {results.docs.length > 0 ? (
                  <CommandGroup heading="Docs">
                    {results.docs.map((doc) => (
                      <CommandItem
                        key={doc.href}
                        value={`docs:${doc.href}`}
                        onSelect={() => go(doc.href)}
                      >
                        <IconFileText />
                        {doc.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : null}
              </>
            ) : (
              <>
                <CommandGroup heading="Pages">
                  {mainPages.map((page) => (
                    <CommandItem
                      key={page.href}
                      value={page.href}
                      onSelect={() => go(page.href)}
                    >
                      <page.icon />
                      {page.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandGroup heading="Docs">
                  {docPages.map((page) => (
                    <CommandItem
                      key={page.href}
                      value={`docs:${page.href}`}
                      onSelect={() => go(page.href)}
                    >
                      <IconFileText />
                      {page.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
