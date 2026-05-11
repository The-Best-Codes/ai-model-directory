import { Hono } from "hono";
import {
  loadProviders,
  getProviderById,
  getModelsByProvider,
} from "../store.ts";
import { filterModels } from "../filter.ts";
import type { FlatModel, PaginatedResponse } from "../types.ts";

const providers = new Hono();

providers.get("/", (c) => {
  const all = loadProviders();

  const data = all.map((p) => ({
    id: p.id,
    name: p.name,
    website: p.website,
    apiBaseUrl: p.apiBaseUrl,
    aiSdk: p.aiSdk,
    model_count: Object.keys(p.models).length,
  }));

  return c.json({
    data,
    meta: {
      total: data.length,
      count: data.length,
      offset: 0,
      has_more: false,
    },
  });
});

providers.get("/:id", (c) => {
  const id = c.req.param("id");
  const provider = getProviderById(id);

  if (!provider) {
    return c.json(
      {
        error: {
          code: "PROVIDER_NOT_FOUND",
          message: `Provider '${id}' not found`,
        },
      },
      404
    );
  }

  const includeModels = c.req.query("include_models") === "true";
  const modelCount = Object.keys(provider.models).length;

  const data: Record<string, unknown> = {
    id: provider.id,
    name: provider.name,
    website: provider.website,
    apiBaseUrl: provider.apiBaseUrl,
    aiSdk: provider.aiSdk,
    model_count: modelCount,
  };

  if (includeModels) {
    const providerModels = getModelsByProvider(provider.id);

    const modelsParam = c.req.query("models_page");
    const modelsLimit = Math.min(parseInt(modelsParam ?? "50") || 50, 200);

    const search = c.req.query("search");
    let filtered = providerModels;

    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.id.toLowerCase().includes(lower) ||
          (m.name && m.name.toLowerCase().includes(lower))
      );
    }

    const totalModels = filtered.length;
    const modelOffset = parseInt(c.req.query("models_offset") ?? "0") || 0;
    const pagedModels = filtered.slice(modelOffset, modelOffset + modelsLimit);

    data.models = {
      data: pagedModels,
      meta: {
        total: totalModels,
        count: pagedModels.length,
        offset: modelOffset,
        has_more: modelOffset + modelsLimit < totalModels,
      },
    };
  }

  return c.json({ data });
});

export { providers };
