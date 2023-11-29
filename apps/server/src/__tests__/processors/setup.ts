require("tsconfig-paths/register");

import { runMigrations } from "@/db/migrate";
import { resetPostgresDatabase } from "../utils/postgres";
import cache from "@/clients/cache";

// ! WATCH: https://github.com/jestjs/jest/issues/6179
const setup = async () => {
  await resetPostgresDatabase();
  await runMigrations();
  await cache.connect();
  console.log("\nSetup Complete");
};

export default setup;
