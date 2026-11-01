import type { DirectoryData } from "#/directory-data";

type ModelRecord = DirectoryData[string]["models"][string];

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
});

const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function formatPrice(value?: number): string {
  if (value === undefined) {
    return "-";
  }

  return priceFormatter.format(value);
}

export function formatTokenCount(value?: number): string {
  if (value === undefined) {
    return "-";
  }

  return compactNumberFormatter.format(value);
}

export function formatProviderCount(count: number): string {
  return `${count} ${count === 1 ? "provider" : "providers"}`;
}

export function formatBoolean(value?: boolean): string {
  if (value === undefined) {
    return "-";
  }

  return value ? "Yes" : "No";
}

export function formatUnixDate(value?: string): string {
  if (!value) {
    return "-";
  }

  const timestamp = Number(value);

  if (!Number.isFinite(timestamp)) {
    return value;
  }

  return dateFormatter.format(new Date(timestamp * 1000));
}

export function modelFeatureLabels(model: ModelRecord): string[] {
  return [
    model.features?.reasoning ? "Reasoning" : undefined,
    model.features?.tool_call ? "Tools" : undefined,
    model.features?.structured_output ? "Structured output" : undefined,
    model.features?.attachment ? "Files" : undefined,
    model.features?.temperature ? "Temperature" : undefined,
    model.open_weights ? "Open weights" : undefined,
  ].filter((value): value is string => Boolean(value));
}

export function formatBadgeLabel(value: string): string {
  return value
    .replaceAll(/[_-]+/g, " ")
    .replaceAll(/\b\w/g, (match) => match.toUpperCase());
}
