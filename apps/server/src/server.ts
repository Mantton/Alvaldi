import app from "./app";
import { PORT } from "./config/env";
import { runMigrations } from "./db/migrate";

async function runServer() {
  await runMigrations();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default runServer;
