import db from "@/clients/postgres";
import { isProduction } from "@/config/env";
import { runMigrations } from "@/db/migrate";
import { sql } from "drizzle-orm";

export async function resetPostgresDatabase() {
  if (isProduction()) {
    return;
  }
  // The TRUNCATE SQL command can be used to delete all data from tables in the current schema
  const truncateCommand = sql<string>`
DO
$$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE;';
    END LOOP;
END $$;
`;

  // reset auto-incrementing IDs (sequences)
  const resetSequencesCommand = sql<string>`
DO
$$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'public') LOOP
        EXECUTE 'ALTER SEQUENCE ' || quote_ident(r.sequence_name) || ' RESTART WITH 1;';
    END LOOP;
END $$;
`;
  await db.execute(truncateCommand);
  await db.execute(resetSequencesCommand);
}
