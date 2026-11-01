const regionSegments = new Set(["us", "eu", "europe", "global", "apac"]);

const sameModelVariant =
  /^(free|batch|payg|flex|priority|dev|fast|thinking|high|medium|low|basic|standard|premium|metered|full-context|\d+k-context|us|eu|\d{1,2}|variant\d+|[0-9a-f]{64})$/;

const deploymentRegionSuffix = /@[a-z][a-z0-9-]*$/;

function isSameModelVariant(variant: string) {
  const segments = variant.split(":");

  return segments.every(
    (segment, index) =>
      sameModelVariant.test(segment) ||
      (/^\d+$/.test(segment) && segments[index - 1] === "thinking"),
  );
}

export function canonicalModelSlug(modelId: string): string {
  const segments = modelId.toLowerCase().split("/");
  const last = segments.at(-1) ?? "";
  const base = (
    regionSegments.has(last) && segments.length > 1 ? segments.at(-2)! : last
  ).replace(deploymentRegionSuffix, "");
  const [name = "", ...variantParts] = base.split(":");
  const variant = variantParts.join(":");
  const slugSource =
    variant && !isSameModelVariant(variant) ? `${name}-${variant}` : name;

  return slugSource
    .replace(/[._:@\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function comparisonSlug(a: string, b: string): string {
  return a < b ? `${a}-vs-${b}` : `${b}-vs-${a}`;
}
