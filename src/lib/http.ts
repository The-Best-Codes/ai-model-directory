import { z } from "zod";

type HttpHeaders = Record<string, string>;
const fetchTimeoutMs = 60_000;

type FetchJsonOptions<T extends z.ZodTypeAny> = {
  schema: T;
  headers?: HttpHeaders;
  init?: Omit<RequestInit, "headers">;
  label: string;
};

export function withBearerToken(
  token: string | undefined,
): HttpHeaders | undefined {
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

export async function fetchJson<T extends z.ZodTypeAny>(
  url: string | URL,
  options: FetchJsonOptions<T>,
): Promise<z.infer<T>> {
  const response = await fetch(url, {
    ...options.init,
    headers: options.headers,
    signal: AbortSignal.timeout(fetchTimeoutMs),
  });

  if (!response.ok) {
    throw new Error(
      `${options.label}: ${response.status} ${response.statusText}`,
    );
  }

  return options.schema.parse(await response.json());
}

export async function fetchText(
  url: string | URL,
  options: {
    headers?: HttpHeaders;
    init?: Omit<RequestInit, "headers">;
    label: string;
  },
): Promise<string> {
  const response = await fetch(url, {
    ...options.init,
    headers: options.headers,
    signal: AbortSignal.timeout(fetchTimeoutMs),
  });

  if (!response.ok) {
    throw new Error(
      `${options.label}: ${response.status} ${response.statusText}`,
    );
  }

  return response.text();
}
