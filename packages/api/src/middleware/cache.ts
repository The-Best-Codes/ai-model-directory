import type { MiddlewareHandler } from "hono";

type CacheOptions = {
  maxAge?: number;
};

export function cache(options: CacheOptions = {}): MiddlewareHandler {
  const maxAge = options.maxAge ?? 300;

  return async (c, next) => {
    await next();

    if (c.req.method === "GET" && c.res.status >= 200 && c.res.status < 300) {
      c.header("Cache-Control", `public, max-age=${maxAge}`, { append: true });
      c.header("CDN-Cache-Control", `public, max-age=${maxAge}`, {
        append: true,
      });
    }
  };
}
