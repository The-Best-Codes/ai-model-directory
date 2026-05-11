import { Hono } from "hono";
import { loadFlatModels, getModelById } from "../store.ts";
import { filterModels } from "../filter.ts";
import type { ModelModality } from "../types.ts";

const models = new Hono();

const VALID_MODALITIES: Set<string> = new Set([
  "text",
  "image",
  "audio",
  "video",
  "file",
]);

models.get("/", (c) => {
  const allModels = loadFlatModels();

  const provider = c.req.query("provider");
  const search = c.req.query("search");
  const inputModality = c.req.query("input_modality");
  const outputModality = c.req.query("output_modality");
  const feature = c.req.query("feature");
  const minContext = c.req.query("min_context");
  const maxInputPrice = c.req.query("max_input_price");
  const openWeights = c.req.query("open_weights");
  const sort = c.req.query("sort");
  const order = c.req.query("order");

  if (inputModality && !VALID_MODALITIES.has(inputModality)) {
    return c.json(
      {
        error: {
          code: "INVALID_PARAMETER",
          message: `input_modality must be one of: ${[...VALID_MODALITIES].join(
            ", "
          )}`,
        },
      },
      400
    );
  }

  if (outputModality && !VALID_MODALITIES.has(outputModality)) {
    return c.json(
      {
        error: {
          code: "INVALID_PARAMETER",
          message: `output_modality must be one of: ${[
            ...VALID_MODALITIES,
          ].join(", ")}`,
        },
      },
      400
    );
  }

  if (order && order !== "asc" && order !== "desc") {
    return c.json(
      {
        error: {
          code: "INVALID_PARAMETER",
          message: "order must be 'asc' or 'desc'",
        },
      },
      400
    );
  }

  const { data, total } = filterModels(allModels, {
    provider,
    search,
    inputModality: inputModality as ModelModality | undefined,
    outputModality: outputModality as ModelModality | undefined,
    feature,
    minContext: minContext ? parseInt(minContext) : undefined,
    maxInputPrice: maxInputPrice ? parseFloat(maxInputPrice) : undefined,
    openWeights:
      openWeights === "true"
        ? true
        : openWeights === "false"
        ? false
        : undefined,
    sort: sort ?? undefined,
    order: (order as "asc" | "desc") ?? undefined,
    limit: parseInt(c.req.query("limit") ?? "50") || 50,
    offset: parseInt(c.req.query("offset") ?? "0") || 0,
  });

  const limit = Math.min(parseInt(c.req.query("limit") ?? "50") || 50, 200);
  const offset = parseInt(c.req.query("offset") ?? "0") || 0;

  return c.json({
    data,
    meta: {
      total,
      count: data.length,
      offset,
      has_more: offset + limit < total,
    },
  });
});

models.get("/:id{.+}", (c) => {
  const id = c.req.param("id");
  const model = getModelById(id);

  if (!model) {
    return c.json(
      {
        error: {
          code: "MODEL_NOT_FOUND",
          message: `Model '${id}' not found. Use GET /v1/models to search available models.`,
        },
      },
      404
    );
  }

  return c.json({ data: model });
});

export { models };
