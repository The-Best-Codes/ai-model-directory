import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { loadFlatModels, loadProviders } from "./store.ts";
import type { FlatModel } from "./store.ts";

const CHARACTER_LIMIT = 25000;

const VALID_FEATURES = new Set([
  "attachment",
  "reasoning",
  "tool_call",
  "structured_output",
  "temperature",
]);

function matchesSearch(model: FlatModel, query: string): boolean {
  const lower = query.toLowerCase();
  if (model.id.toLowerCase().includes(lower)) return true;
  if (model.name && model.name.toLowerCase().includes(lower)) return true;
  return false;
}

function matchesFeature(model: FlatModel, feature: string): boolean {
  if (!VALID_FEATURES.has(feature)) return false;
  return model.features?.[feature as keyof typeof model.features] === true;
}

function sortModels(
  models: FlatModel[],
  field: string,
  order: string
): FlatModel[] {
  const mult = order === "desc" ? -1 : 1;
  return models.sort((a, b) => {
    let va: number | string;
    let vb: number | string;
    switch (field) {
      case "id":
        va = a.id;
        vb = b.id;
        break;
      case "name":
        va = a.name ?? a.id;
        vb = b.name ?? b.id;
        break;
      case "context":
        va = a.limit?.context ?? 0;
        vb = b.limit?.context ?? 0;
        break;
      case "input_price":
        va = a.pricing?.input ?? Infinity;
        vb = b.pricing?.input ?? Infinity;
        break;
      case "output_price":
        va = a.pricing?.output ?? Infinity;
        vb = b.pricing?.output ?? Infinity;
        break;
      default:
        return 0;
    }
    if (typeof va === "string" && typeof vb === "string") {
      return mult * va.localeCompare(vb);
    }
    return mult * ((va as number) - (vb as number));
  });
}

function formatModelMarkdown(model: FlatModel): string {
  const lines: string[] = [];
  lines.push(`### ${model.name ?? model.id}`);
  lines.push(`- **ID**: ${model.id}`);
  lines.push(`- **Provider**: ${model.provider}`);
  if (model.limit?.context)
    lines.push(`- **Context**: ${model.limit.context.toLocaleString()} tokens`);
  if (model.pricing?.input !== undefined)
    lines.push(`- **Input price**: $${model.pricing.input}/M tokens`);
  if (model.pricing?.output !== undefined)
    lines.push(`- **Output price**: $${model.pricing?.output}/M tokens`);
  if (model.modalities?.input)
    lines.push(`- **Input**: ${model.modalities.input.join(", ")}`);
  if (model.modalities?.output)
    lines.push(`- **Output**: ${model.modalities.output.join(", ")}`);
  if (model.features) {
    const feats = Object.entries(model.features)
      .filter(([, v]) => v)
      .map(([k]) => k);
    if (feats.length) lines.push(`- **Features**: ${feats.join(", ")}`);
  }
  if (model.open_weights) lines.push(`- **Open weights**: yes`);
  return lines.join("\n");
}

function formatDetailedMarkdown(model: FlatModel): string {
  const lines: string[] = [];
  lines.push(`# ${model.name ?? model.id}`);
  lines.push("");
  lines.push(`**ID**: ${model.id}`);
  lines.push(`**Provider**: ${model.provider}`);
  if (model.open_weights !== undefined)
    lines.push(`**Open weights**: ${model.open_weights ? "yes" : "no"}`);
  lines.push("");

  if (model.pricing) {
    lines.push("## Pricing (per million tokens)");
    if (model.pricing.input !== undefined)
      lines.push(`- **Input**: $${model.pricing.input}`);
    if (model.pricing.output !== undefined)
      lines.push(`- **Output**: $${model.pricing.output}`);
    if (model.pricing.reasoning !== undefined)
      lines.push(`- **Reasoning**: $${model.pricing.reasoning}`);
    if (model.pricing.cache_read !== undefined)
      lines.push(`- **Cache read**: $${model.pricing.cache_read}`);
    if (model.pricing.cache_write !== undefined)
      lines.push(`- **Cache write**: $${model.pricing.cache_write}`);
    if (model.pricing.input_audio !== undefined)
      lines.push(`- **Input audio**: $${model.pricing.input_audio}`);
    if (model.pricing.output_audio !== undefined)
      lines.push(`- **Output audio**: $${model.pricing.output_audio}`);
    lines.push("");
  }

  if (model.limit) {
    lines.push("## Token limits");
    if (model.limit.context !== undefined)
      lines.push(`- **Context**: ${model.limit.context.toLocaleString()}`);
    if (model.limit.input !== undefined)
      lines.push(`- **Input**: ${model.limit.input.toLocaleString()}`);
    if (model.limit.output !== undefined)
      lines.push(`- **Output**: ${model.limit.output.toLocaleString()}`);
    lines.push("");
  }

  if (model.modalities) {
    lines.push("## Modalities");
    if (model.modalities.input)
      lines.push(`- **Input**: ${model.modalities.input.join(", ")}`);
    if (model.modalities.output)
      lines.push(`- **Output**: ${model.modalities.output.join(", ")}`);
    lines.push("");
  }

  if (model.features) {
    lines.push("## Features");
    for (const [key, value] of Object.entries(model.features)) {
      if (value !== undefined)
        lines.push(`- **${key}**: ${value ? "yes" : "no"}`);
    }
    lines.push("");
  }

  if (model.knowledge_cutoff) {
    const date = new Date(parseInt(model.knowledge_cutoff) * 1000);
    lines.push(`**Knowledge cutoff**: ${date.toISOString().split("T")[0]}`);
  }
  if (model.release_date) {
    const date = new Date(parseInt(model.release_date) * 1000);
    lines.push(`**Release date**: ${date.toISOString().split("T")[0]}`);
  }

  return lines.join("\n");
}

function formatComparisonMarkdown(models: FlatModel[]): string {
  const lines: string[] = ["# Model comparison", ""];

  const headers = ["Field", ...models.map((m) => m.name ?? m.id)];
  const rows: string[][] = [];

  rows.push(["Provider", ...models.map((m) => m.provider)]);
  rows.push([
    "Context",
    ...models.map((m) => m.limit?.context?.toLocaleString() ?? "unknown"),
  ]);
  rows.push([
    "Input price ($/M)",
    ...models.map((m) =>
      m.pricing?.input !== undefined ? `$${m.pricing.input}` : "unknown"
    ),
  ]);
  rows.push([
    "Output price ($/M)",
    ...models.map((m) =>
      m.pricing?.output !== undefined ? `$${m.pricing.output}` : "unknown"
    ),
  ]);
  rows.push([
    "Reasoning price ($/M)",
    ...models.map((m) =>
      m.pricing?.reasoning !== undefined ? `$${m.pricing.reasoning}` : "unknown"
    ),
  ]);
  rows.push([
    "Cache read ($/M)",
    ...models.map((m) =>
      m.pricing?.cache_read !== undefined
        ? `$${m.pricing.cache_read}`
        : "unknown"
    ),
  ]);
  rows.push([
    "Output limit",
    ...models.map((m) => m.limit?.output?.toLocaleString() ?? "unknown"),
  ]);
  rows.push([
    "Input modalities",
    ...models.map((m) => m.modalities?.input?.join(", ") ?? "unknown"),
  ]);
  rows.push([
    "Output modalities",
    ...models.map((m) => m.modalities?.output?.join(", ") ?? "unknown"),
  ]);
  rows.push([
    "Tool calling",
    ...models.map((m) =>
      m.features?.tool_call
        ? "yes"
        : m.features?.tool_call === false
        ? "no"
        : "unknown"
    ),
  ]);
  rows.push([
    "Structured output",
    ...models.map((m) =>
      m.features?.structured_output
        ? "yes"
        : m.features?.structured_output === false
        ? "no"
        : "unknown"
    ),
  ]);
  rows.push([
    "Attachment",
    ...models.map((m) =>
      m.features?.attachment
        ? "yes"
        : m.features?.attachment === false
        ? "no"
        : "unknown"
    ),
  ]);
  rows.push([
    "Reasoning",
    ...models.map((m) =>
      m.features?.reasoning
        ? "yes"
        : m.features?.reasoning === false
        ? "no"
        : "unknown"
    ),
  ]);
  rows.push([
    "Open weights",
    ...models.map((m) =>
      m.open_weights === true
        ? "yes"
        : m.open_weights === false
        ? "no"
        : "unknown"
    ),
  ]);

  const colWidths = headers.map((h, i) => {
    const maxDataLen = Math.max(...rows.map((r) => r[i]?.length ?? 0));
    return Math.max(h.length, maxDataLen);
  });

  const formatRow = (cells: string[]) =>
    "| " +
    cells.map((c, i) => (c ?? "").padEnd(colWidths[i] ?? 0)).join(" | ") +
    " |";

  const separator =
    "|" + colWidths.map((w) => "-".repeat(w + 2)).join("|") + "|";

  lines.push(formatRow(headers));
  lines.push(separator);
  for (const row of rows) {
    lines.push(formatRow(row));
  }

  return lines.join("\n");
}

function filterModels(
  allModels: FlatModel[],
  params: Record<string, unknown>
): FlatModel[] {
  let result = allModels;

  if (params.query) {
    result = result.filter((m) => matchesSearch(m, params.query as string));
  }
  if (params.provider) {
    const lower = (params.provider as string).toLowerCase();
    result = result.filter((m) => m.provider.toLowerCase() === lower);
  }
  if (params.input_modality) {
    result = result.filter(
      (m) =>
        m.modalities?.input?.includes(
          params.input_modality as FlatModel["modalities"] extends {
            input?: (infer U)[];
          }
            ? U
            : never
        ) ?? false
    );
  }
  if (params.output_modality) {
    result = result.filter(
      (m) =>
        m.modalities?.output?.includes(
          params.output_modality as FlatModel["modalities"] extends {
            output?: (infer U)[];
          }
            ? U
            : never
        ) ?? false
    );
  }
  if (params.feature) {
    const features = (params.feature as string).split(",").map((f) => f.trim());
    for (const feature of features) {
      if (VALID_FEATURES.has(feature)) {
        result = result.filter((m) => matchesFeature(m, feature));
      }
    }
  }
  if (params.min_context !== undefined && params.min_context !== null) {
    result = result.filter(
      (m) => (m.limit?.context ?? 0) >= (params.min_context as number)
    );
  }
  if (params.max_input_price !== undefined && params.max_input_price !== null) {
    result = result.filter((m) => {
      const price = m.pricing?.input;
      return price !== undefined && price <= (params.max_input_price as number);
    });
  }
  if (params.open_weights !== undefined && params.open_weights !== null) {
    result = result.filter((m) => m.open_weights === params.open_weights);
  }
  if (params.sort) {
    result = sortModels(
      result,
      params.sort as string,
      (params.order as string) ?? "asc"
    );
  }

  return result;
}

const server = new McpServer({
  name: "ai-model-directory-mcp-server",
  version: "0.1.0",
});

server.registerTool(
  "model_directory_search",
  {
    title: "Search AI Models",
    description: `Search AI models across all providers in the directory.

Supports filtering by provider, modality, features, context window, pricing, and open weights.
Returns matching models with their metadata including pricing, context limits, supported modalities, and features.

Args:
  - query: search string (matches model ID and name)
  - provider: filter by provider ID
  - input_modality/output_modality: filter by modality (text, image, audio, video, file)
  - feature: comma-separated features (attachment, reasoning, tool_call, structured_output, temperature)
  - min_context: minimum context window tokens
  - max_input_price: max input price per million tokens
  - open_weights: true to filter open-weights only
  - sort: id, name, context, input_price, output_price
  - order: asc or desc
  - limit: page size (1-100, default 20)
  - offset: pagination offset
  - response_format: 'markdown' (default) or 'json'

Returns paginated results with total count and has_more flag.`,
    inputSchema: {
      query: z
        .string()
        .min(1)
        .describe("Search string to match against model IDs and names"),
      provider: z.string().optional().describe("Filter by provider ID"),
      input_modality: z
        .enum(["text", "image", "audio", "video", "file"])
        .optional()
        .describe("Filter by input modality"),
      output_modality: z
        .enum(["text", "image", "audio", "video", "file"])
        .optional()
        .describe("Filter by output modality"),
      feature: z
        .string()
        .optional()
        .describe("Filter by feature, comma-separated for AND"),
      min_context: z
        .number()
        .int()
        .min(0)
        .optional()
        .describe("Minimum context window tokens"),
      max_input_price: z
        .number()
        .min(0)
        .optional()
        .describe("Maximum input price per million tokens"),
      open_weights: z
        .boolean()
        .optional()
        .describe("Filter to open-weights models"),
      sort: z
        .enum(["id", "name", "context", "input_price", "output_price"])
        .optional()
        .describe("Sort field"),
      order: z.enum(["asc", "desc"]).optional().describe("Sort direction"),
      limit: z
        .number()
        .int()
        .min(1)
        .max(100)
        .default(20)
        .describe("Max results"),
      offset: z.number().int().min(0).default(0).describe("Results to skip"),
      response_format: z
        .enum(["markdown", "json"])
        .default("markdown")
        .describe("Output format"),
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  async (params: Record<string, unknown>) => {
    const allModels = loadFlatModels();
    const filtered = filterModels(allModels, params);

    const limit = (params.limit as number) ?? 20;
    const offset = (params.offset as number) ?? 0;
    const total = filtered.length;
    const paged = filtered.slice(offset, offset + limit);
    const hasMore = offset + limit < total;
    const format = (params.response_format as string) ?? "markdown";

    let textContent: string;
    if (format === "markdown") {
      const lines = [
        `# Model search: '${params.query ?? "*"}'`,
        "",
        `Found ${total} models (showing ${paged.length})`,
        "",
      ];
      for (const model of paged) {
        lines.push(formatModelMarkdown(model));
        lines.push("");
      }
      if (hasMore)
        lines.push(
          `_More results. Use offset=${offset + limit} to see the next page._`
        );
      textContent = lines.join("\n");
    } else {
      textContent = JSON.stringify(
        {
          total,
          count: paged.length,
          offset,
          models: paged,
          has_more: hasMore,
        },
        null,
        2
      );
    }

    if (textContent.length > CHARACTER_LIMIT) {
      const half = Math.max(1, Math.floor(paged.length / 2));
      const truncated = paged.slice(0, half);
      const note = `\n\n_Truncated from ${paged.length} to ${truncated.length} results. Use smaller limit or more filters._`;
      if (format === "markdown") {
        const lines = [
          `# Model search: '${params.query ?? "*"}' (truncated)`,
          "",
        ];
        for (const model of truncated) {
          lines.push(formatModelMarkdown(model));
          lines.push("");
        }
        lines.push(note);
        textContent = lines.join("\n");
      } else {
        textContent =
          JSON.stringify(
            {
              total,
              count: truncated.length,
              offset,
              models: truncated,
              has_more: hasMore,
            },
            null,
            2
          ) + note;
      }
    }

    return { content: [{ type: "text" as const, text: textContent }] };
  }
);

server.registerTool(
  "model_directory_get",
  {
    title: "Get AI Model Details",
    description: `Get full metadata for a single AI model by its ID.

Returns complete model record: pricing, context limits, modalities, features, release date, provider.

Args:
  - id: exact model ID (e.g. 'openai-gpt-5', 'claude-opus-4-20250514')
  - response_format: 'markdown' (default) or 'json'

If not found, returns similar model IDs as suggestions.`,
    inputSchema: {
      id: z.string().min(1).describe("Model ID to look up"),
      response_format: z
        .enum(["markdown", "json"])
        .default("markdown")
        .describe("Output format"),
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  async (params: Record<string, unknown>) => {
    const allModels = loadFlatModels();
    const id = params.id as string;
    const format = (params.response_format as string) ?? "markdown";
    const model = allModels.find((m) => m.id === id);

    if (!model) {
      const suggestions = allModels
        .filter(
          (m) =>
            m.id.includes(id) ||
            (m.name && m.name.toLowerCase().includes(id.toLowerCase()))
        )
        .slice(0, 5)
        .map((m) => m.id);
      const hint =
        suggestions.length > 0
          ? ` Similar IDs: ${suggestions.join(", ")}.`
          : "";
      return {
        content: [
          {
            type: "text" as const,
            text: `Model '${id}' not found.${hint} Use model_directory_search to find models.`,
          },
        ],
        isError: true,
      };
    }

    const textContent =
      format === "markdown"
        ? formatDetailedMarkdown(model)
        : JSON.stringify(model, null, 2);
    return { content: [{ type: "text" as const, text: textContent }] };
  }
);

server.registerTool(
  "model_directory_list_providers",
  {
    title: "List AI Model Providers",
    description: `List all AI model providers in the directory with ID, name, website, and model count.

Args:
  - response_format: 'markdown' (default) or 'json'

Returns all providers. Use provider ID in model_directory_search to filter.`,
    inputSchema: {
      response_format: z
        .enum(["markdown", "json"])
        .default("markdown")
        .describe("Output format"),
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  async (params: Record<string, unknown>) => {
    const providers = loadProviders();
    const format = (params.response_format as string) ?? "markdown";

    const data = providers.map((p) => ({
      id: p.id,
      name: p.name,
      website: p.website,
      apiBaseUrl: p.apiBaseUrl,
      aiSdk: p.aiSdk,
      model_count: Object.keys(p.models).length,
    }));

    let textContent: string;
    if (format === "markdown") {
      const lines = [
        "# AI Model Directory Providers",
        "",
        `Total: ${data.length} providers`,
        "",
      ];
      for (const p of data) {
        lines.push(`## ${p.name} (${p.id})`);
        if (p.website) lines.push(`- **Website**: ${p.website}`);
        if (p.apiBaseUrl) lines.push(`- **API base**: ${p.apiBaseUrl}`);
        lines.push(`- **Models**: ${p.model_count}`);
        if (p.aiSdk?.npmPackage)
          lines.push(`- **AI SDK**: ${p.aiSdk.npmPackage}`);
        lines.push("");
      }
      textContent = lines.join("\n");
    } else {
      textContent = JSON.stringify(
        { total: data.length, providers: data },
        null,
        2
      );
    }

    return { content: [{ type: "text" as const, text: textContent }] };
  }
);

server.registerTool(
  "model_directory_compare",
  {
    title: "Compare AI Models",
    description: `Compare 2-10 AI models side by side across pricing, limits, features, and modalities.

Produces a table comparing context windows, pricing, token limits, modalities, and feature flags.

Args:
  - ids: array of 2-10 model IDs to compare
  - response_format: 'markdown' (default) or 'json'

Use model_directory_search to find model IDs first.`,
    inputSchema: {
      ids: z
        .array(z.string().min(1))
        .min(2)
        .max(10)
        .describe("Model IDs to compare (2-10)"),
      response_format: z
        .enum(["markdown", "json"])
        .default("markdown")
        .describe("Output format"),
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  async (params: Record<string, unknown>) => {
    const allModels = loadFlatModels();
    const ids = params.ids as string[];
    const format = (params.response_format as string) ?? "markdown";
    const models: FlatModel[] = [];
    const notFound: string[] = [];

    for (const id of ids) {
      const found = allModels.find((m) => m.id === id);
      if (found) models.push(found);
      else notFound.push(id);
    }

    if (models.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: `No models found: ${ids.join(
              ", "
            )}. Use model_directory_search first.`,
          },
        ],
        isError: true,
      };
    }

    const warning =
      notFound.length > 0 ? `Not found: ${notFound.join(", ")}\n\n` : "";

    let textContent: string;
    if (format === "markdown") {
      textContent = warning + formatComparisonMarkdown(models);
    } else {
      const output = models.map((m) => ({
        id: m.id,
        name: m.name,
        provider: m.provider,
        pricing: m.pricing,
        limit: m.limit,
        modalities: m.modalities,
        features: m.features,
        open_weights: m.open_weights,
      }));
      textContent = warning + JSON.stringify(output, null, 2);
    }

    return { content: [{ type: "text" as const, text: textContent }] };
  }
);

const transportMode = process.env.TRANSPORT ?? "stdio";

if (transportMode === "http") {
  const app = express();
  app.use(express.json());

  app.options("/mcp", (_req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
    res.status(204).send();
  });

  app.post("/mcp", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const httpTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });
    res.on("close", () => httpTransport.close());
    await server.connect(httpTransport);
    await httpTransport.handleRequest(req, res, req.body);
  });

  const port = parseInt(process.env.PORT ?? "3002");
  app.listen(port, () => {
    console.error(
      `AI Model Directory MCP server on http://localhost:${port}/mcp`
    );
  });
} else {
  const stdioTransport = new StdioServerTransport();
  await server.connect(stdioTransport);
  console.error("AI Model Directory MCP server running via stdio");
}
