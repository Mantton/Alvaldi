// https://orm.drizzle.team/docs/quick-postgresql/postgresjs

import { DATABASE_URL } from "@/config/env";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

export async function runMigrations() {
  await migrate(drizzle(postgres(DATABASE_URL, { max: 1 })), {
    migrationsFolder: "db/migrations/",
  });
  console.log("Migration Complete");
}
