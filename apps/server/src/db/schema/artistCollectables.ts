import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { collectablesTable } from "./collectable";
import { artistsTable } from "./artist";

export const artistsCollectablesTable = pgTable(
  "artist_collectables",
  {
    artistId: integer("artist_id")
      .notNull()
      .references(() => artistsTable.id),
    collectableId: integer("collectable_id")
      .notNull()
      .references(() => collectablesTable.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.artistId, table.collectableId] }),
  })
);
