import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { accountsTable } from "./accounts";

export const recordLabelsTable = pgTable("record_labels", {
  id: serial("id").primaryKey(),
  dateAdded: timestamp("date_added").defaultNow().notNull(),
  name: varchar("name", { length: 120 }).notNull().unique(),
  addedBy: integer("added_by")
    .references(() => accountsTable.id)
    .notNull(),
});
