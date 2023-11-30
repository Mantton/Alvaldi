import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { erasTable } from "./era";
import { mediaTable } from "./media";
import { accountsTable } from "./accounts";

export const rarityEnum = pgEnum("rarity", [
  "common",
  "superior",
  "rare",
  "elite",
  "legendary",
  "celestial",
]);

export const collectablesTable = pgTable("collectables", {
  id: serial("id").primaryKey(),
  eraId: integer("era_id")
    .notNull()
    .references(() => erasTable.id),
  mediaId: integer("media_id")
    .notNull()
    .unique()
    .references(() => mediaTable.id),
  dateAdded: timestamp("date_added").notNull().defaultNow(),
  creatorId: integer("creator_id")
    .notNull()
    .references(() => accountsTable.id),
  rarity: rarityEnum("rarity").notNull(),
});
