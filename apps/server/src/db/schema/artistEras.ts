import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { erasTable } from "./era";
import { artistsTable } from "./artist";

export const artistErasTable = pgTable(
  "artist_eras",
  {
    artistId: integer("artist_id")
      .notNull()
      .references(() => artistsTable.id),
    eraId: integer("era_id")
      .notNull()
      .references(() => erasTable.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.artistId, table.eraId] }),
  })
);
