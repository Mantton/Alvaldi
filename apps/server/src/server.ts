import app from "./app";
import cache from "./clients/cache";
import { PORT } from "./config/env";
import { runMigrations } from "./db/migrate";

async function runServer() {
  await runMigrations();
  await cache.connect();
  app.listen(PORT, () => {
    console.log(`[SERVER] listening on port ${PORT}`);
  });
}

export default runServer;
