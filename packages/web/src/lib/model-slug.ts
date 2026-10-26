const regionSegments = new Set(["us", "eu", "europe", "global", "apac"]);

export function canonicalModelSlug(modelId: string): string {
  const segments = modelId.toLowerCase().split("/");
  const last = segments.at(-1) ?? "";
  const base =
    regionSegments.has(last) && segments.length > 1 ? segments.at(-2)! : last;

  return base
    .split(":")[0]!
    .replace(/[._\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function comparisonSlug(a: string, b: string): string {
  return a < b ? `${a}-vs-${b}` : `${b}-vs-${a}`;
}
