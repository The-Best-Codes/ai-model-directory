import { Hono } from "hono";
import { cors } from "hono/cors";
import { cache } from "./middleware/cache.ts";
import { providers } from "./routes/providers.ts";
import { models } from "./routes/models.ts";
import { meta } from "./routes/meta.ts";
import { health } from "./routes/health.ts";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "HEAD", "OPTIONS"],
    allowHeaders: ["Content-Type", "Accept"],
    maxAge: 86400,
  })
);

app.use("/v1/*", cache({ maxAge: 300 }));

app.route("/health", health);
app.route("/v1/providers", providers);
app.route("/v1/models", models);
app.route("/v1/meta", meta);

app.get("/", (c) => {
  return c.json({
    name: "AI Model Directory API",
    version: "0.1.0",
    docs: {
      providers: "/v1/providers",
      models: "/v1/models",
      meta: "/v1/meta",
      health: "/health",
    },
    query_params: {
      models: {
        provider: "filter by provider id",
        search: "fuzzy search on model id and name",
        input_modality: "text, image, audio, video, file",
        output_modality: "text, image, audio, video, file",
        feature:
          "attachment, reasoning, tool_call, structured_output, temperature (comma-separated)",
        min_context: "minimum context window tokens",
        max_input_price: "maximum input price per million tokens",
        open_weights: "true or false",
        sort: "id, name, context, input_price, output_price, output_limit",
        order: "asc or desc",
        limit: "page size (default 50, max 200)",
        offset: "pagination offset",
      },
    },
  });
});

app.notFound((c) => {
  return c.json(
    {
      error: {
        code: "NOT_FOUND",
        message: "Endpoint not found. Visit / for available endpoints.",
      },
    },
    404
  );
});

export default app;

export type AppType = typeof app;
