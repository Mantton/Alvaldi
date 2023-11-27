import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";
import { accountsTable } from "./accounts";

export const adminsTable = pgTable("admins", {
  accountId: integer("account_id")
    .references(() => accountsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .unique()
    .notNull(),
  dateAdded: timestamp("date_added").defaultNow().notNull(),
});
