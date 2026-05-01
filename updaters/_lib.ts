import Decimal from "decimal.js";

/** Strip keys whose value is `undefined`. Returns the same shape `T`. */
export function compact<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as T;
}

/** Convert a Unix epoch (seconds) to a yyyy-mm-dd string. */
export function isoDateFromUnix(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toISOString().slice(0, 10);
}

/**
 * Convert any string parseable by `Date` to yyyy-mm-dd.
 * Returns `undefined` if the string is invalid, or — when
 * `rejectEpoch` is set — if it parses to or before the unix epoch
 * (used by APIs that signal "unknown" with a zeroed timestamp).
 */
export function isoDateFromString(
  s: string,
  options: { rejectEpoch?: boolean } = {},
): string | undefined {
  const d = new Date(s);

  if (Number.isNaN(d.getTime())) return undefined;
  if (options.rejectEpoch && d.getTime() <= 0) return undefined;

  return d.toISOString().slice(0, 10);
}

/**
 * Many provider APIs quote prices as "USD per token" strings.
 * Multiply by 1e6 with `decimal.js` to avoid binary float drift, then
 * return a plain number (the canonical TOML unit is per-million tokens).
 */
export function pricePerMillion(raw: string | undefined): number | undefined {
  if (raw === undefined) return undefined;

  try {
    return new Decimal(raw).mul(1_000_000).toNumber();
  } catch {
    return undefined;
  }
}

/** Keep only finite, non-negative numeric values. */
export function nonNegativeNumber(
  value: number | undefined,
): number | undefined {
  return value !== undefined && Number.isFinite(value) && value >= 0
    ? value
    : undefined;
}

/** Run an async function over `items` with bounded concurrency. */
export async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;
  const workerCount = Math.max(1, Math.min(limit, items.length));

  async function worker() {
    while (true) {
      const i = cursor++;

      if (i >= items.length) return;

      results[i] = await fn(items[i]!, i);
    }
  }

  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  return results;
}
