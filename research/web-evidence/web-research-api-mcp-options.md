# External web research for API and MCP decisions

This file summarizes external references used to evaluate whether building an API and MCP server is a good next step for this project.

## Key findings

1. GitHub Pages is static hosting and can serve generated JSON files directly, but does not itself provide query compute logic.

   - https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

2. GitHub Pages has practical limits relevant for dataset distribution (site size, build and bandwidth soft limits).

   - https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

3. Cloudflare Pages Functions can add lightweight server logic while keeping static assets on the edge.

   - https://developers.cloudflare.com/pages/functions/

4. MCP tools are standardized around `tools/list` and `tools/call`, with input schema and tool result handling.

   - https://modelcontextprotocol.io/specification/2025-06-18/server/tools

5. MCP security guidance highlights consent, least privilege, validation, and anti-abuse controls.

   - https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices

6. OpenAI MCP guidance for remote MCP integrations emphasizes a read-only `search` and `fetch` tool pattern.

   - https://developers.openai.com/api/docs/mcp

7. Anthropic MCP connector currently supports MCP tool calls and requires publicly reachable HTTP MCP servers.

   - https://docs.anthropic.com/en/docs/agents-and-tools/mcp-connector

8. OpenRouter publishes a models endpoint pattern that is useful as a reference for model metadata APIs.

   - https://openrouter.ai/api/v1/models

9. LiteLLM provider coverage and model metadata references are useful benchmarks for ecosystem completeness.
   - https://docs.litellm.ai/docs/providers

## Practical recommendation

### API

Start with a read-only API surface over generated data.

Minimal endpoints:

- `GET /v1/providers`
- `GET /v1/models`
- `GET /v1/models/{id}`
- `GET /v1/meta`

### MCP

Ship an MCP server after, or alongside, API stabilization, using read-only tools first.

Minimal tools:

- `search(query, filters...)`
- `fetch(id)`
- optional `list_filters()`

This aligns with both OpenAI and Anthropic MCP usage patterns and keeps risk and maintenance manageable.
