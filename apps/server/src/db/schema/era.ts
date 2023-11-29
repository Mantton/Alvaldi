import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { accountsTable } from "./accounts";
import { mediaTable } from "./media";

export const erasTable = pgTable("eras", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  creatorId: integer("creator_id")
    .references(() => accountsTable.id)
    .notNull(),
  dateAdded: timestamp("date_added").defaultNow().notNull(),
  date: timestamp("date").defaultNow().notNull(),
  iconImageId: integer("icon_image_id").references(() => mediaTable.id),
  bannerImageId: integer("banner_image_id").references(() => mediaTable.id),
});
