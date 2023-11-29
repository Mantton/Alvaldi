import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { erasTable } from "./era";
import { groupsTable } from "./group";

export const groupErasTable = pgTable(
  "group_eras",
  {
    groupId: integer("group_id")
      .notNull()
      .references(() => groupsTable.id),
    eraId: integer("era_id")
      .notNull()
      .references(() => erasTable.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.groupId, table.eraId] }),
  })
);
