import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { accountsTable } from "./accounts";
import { rarityEnum } from "./collectable";
import { recordLabelsTable } from "./recordLabels";
import { groupTypeEnum, groupsTable } from "./group";
import { erasTable } from "./era";
import { artistsTable } from "./artist";

export const packsTable = pgTable("packs", {
  id: serial("id").primaryKey(),
  ownerId: integer("owner_id")
    .notNull()
    .references(() => accountsTable.id),
  rarity: rarityEnum("rarity").notNull(),
  mintDate: timestamp("minted_at").notNull().defaultNow(),
  isConsumed: boolean("is_consumed").default(false).notNull(),
  groupType: groupTypeEnum("group_gender"),
});

export const artistPacksTable = pgTable("artist_packs", {
  id: integer("pack_id")
    .references(() => packsTable.id)
    .notNull()
    .unique(),
  artistId: integer("artist_id")
    .notNull()
    .references(() => artistsTable.id),
});

export const eraPacksTable = pgTable("era_packs", {
  id: integer("id")
    .references(() => packsTable.id)
    .notNull()
    .unique(),
  eraId: integer("era_id")
    .references(() => erasTable.id)
    .notNull()
    .unique(),
});

export const groupPacksTable = pgTable("group_packs", {
  id: integer("id")
    .references(() => packsTable.id)
    .notNull()
    .unique(),
  groupId: integer("group_table")
    .references(() => groupsTable.id)
    .notNull()
    .unique(),
});

export const recordLabelPacksTable = pgTable("record_label_packs", {
  id: integer("id")
    .references(() => packsTable.id)
    .notNull()
    .unique(),
  labelId: integer("label_id")
    .references(() => recordLabelsTable.id)
    .notNull()
    .unique(),
});
