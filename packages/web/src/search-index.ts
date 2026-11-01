import { loadDirectoryData } from "#/directory-data";
import { getDoc, getDocPages } from "#/lib/docs";
import { uniqueSearchTokens } from "#/lib/search-text";
import { loadModelIndex, summarizeModelGroup } from "#/model-groups";

export type SearchModel = [
  slug: string,
  name: string,
  providerCount: number,
  input: number | null,
  output: number | null,
  context: number | null,
  keywords: string,
];

export type SearchProvider = [id: string, name: string, modelCount: number];

export type SearchDoc = [title: string, href: string, keywords: string];

export type SearchIndex = {
  models: SearchModel[];
  providers: SearchProvider[];
  docs: SearchDoc[];
};

export async function buildSearchIndex(): Promise<SearchIndex> {
  const [{ ranked }, directory] = await Promise.all([
    loadModelIndex(),
    loadDirectoryData(),
  ]);

  const models = ranked.map((group): SearchModel => {
    const summary = summarizeModelGroup(group);

    return [
      group.slug,
      group.name,
      group.providerCount,
      summary.cheapestInput?.price ?? null,
      summary.cheapestOutput?.price ?? null,
      summary.maxContext ?? null,
      uniqueSearchTokens(
        [
          ...group.offerings.map(
            (offering) => offering.model.id.split("/").at(-1) ?? "",
          ),
          ...summary.features,
          ...summary.modalitiesInput,
          ...summary.modalitiesOutput,
          summary.openWeights ? "open weights" : "",
        ],
        [group.name, group.slug],
      ),
    ];
  });

  const providers = Object.values(directory)
    .map((provider): SearchProvider => [
      provider.id,
      provider.name ?? provider.id,
      Object.keys(provider.models).length,
    ])
    .sort((a, b) => b[2] - a[2]);

  const docs = getDocPages().map((page): SearchDoc => {
    const headings =
      getDoc(page.slug)
        ?.content.match(/^#{2,3} .+$/gm)
        ?.map((heading) => heading.replace(/^#+ /, "")) ?? [];

    return [
      page.title,
      page.href,
      uniqueSearchTokens([page.description ?? "", ...headings], [page.title]),
    ];
  });

  return { models, providers, docs };
}
