import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { collectablesTable } from "./collectable";
import { accountsTable } from "./accounts";

export const cardsTable = pgTable("cards", {
  id: serial("id").primaryKey(),
  collectableId: integer("collectable_id")
    .notNull()
    .references(() => collectablesTable.id),
  mintDate: timestamp("mint_date").defaultNow().notNull(),
  ownerId: integer("owner_id").references(() => accountsTable.id),
});
