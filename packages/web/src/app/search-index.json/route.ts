import { buildSearchIndex } from "#/search-index";

export async function GET() {
  return Response.json(await buildSearchIndex());
}
