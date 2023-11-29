import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { groupsTable } from "./group";
import { artistsTable } from "./artist";

export const groupArtistsTable = pgTable(
  "group_artists",
  {
    groupId: integer("group_id").references(() => groupsTable.id),
    artistId: integer("artist_id").references(() => artistsTable.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.groupId, table.artistId] }),
  })
);
