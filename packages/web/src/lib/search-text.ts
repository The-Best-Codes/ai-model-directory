export function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function searchTokens(texts: string[]): Set<string> {
  return new Set(texts.flatMap((text) => normalizeSearchText(text).split(" ")));
}

export function uniqueSearchTokens(
  texts: string[],
  excludedTexts: string[] = [],
): string {
  const excluded = searchTokens(excludedTexts);

  return [...searchTokens(texts)]
    .filter((token) => token && !excluded.has(token))
    .join(" ");
}
