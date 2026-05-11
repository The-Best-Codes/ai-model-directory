import app from "./index.ts";

export default {
  async fetch(request: Request): Promise<Response> {
    return app.fetch(request);
  },
};
