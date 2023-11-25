import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  providerId: varchar("provider_id", { length: 36 }).notNull().unique(),
});
