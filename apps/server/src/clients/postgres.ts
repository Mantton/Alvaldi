// https://orm.drizzle.team/docs/quick-postgresql/postgresjs

import { DATABASE_URL } from "@/config/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Queries
const db = drizzle(postgres(DATABASE_URL));
export default db;
