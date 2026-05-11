import { Hono } from "hono";
import { loadDirectory } from "../store.ts";

const health = new Hono();

health.get("/", (c) => {
  let modelCount = 0;
  let providerCount = 0;

  try {
    const dir = loadDirectory();
    providerCount = Object.keys(dir).length;
    for (const provider of Object.values(dir)) {
      modelCount += Object.keys(provider.models).length;
    }
  } catch {
    return c.json(
      { status: "unhealthy", error: "Failed to load dataset" },
      503
    );
  }

  return c.json({
    status: "ok",
    providers: providerCount,
    models: modelCount,
  });
});

export { health };
