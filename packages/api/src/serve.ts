import app from "./index.ts";

const port = parseInt(process.env.PORT ?? "3001");

console.log(`AI Model Directory API starting on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
