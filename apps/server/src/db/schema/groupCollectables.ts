import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { groupsTable } from "./group";
import { collectablesTable } from "./collectable";

export const groupCollectablesTable = pgTable(
  "group_collectables",
  {
    groupId: integer("group_id")
      .notNull()
      .references(() => groupsTable.id),
    collectableId: integer("collectable_id")
      .notNull()
      .references(() => collectablesTable.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.groupId, table.collectableId] }),
  })
);
