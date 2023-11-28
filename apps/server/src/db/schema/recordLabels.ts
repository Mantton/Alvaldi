import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { accountsTable } from "./accounts";
import { mediaTable } from "./media";

export const recordLabelsTable = pgTable("record_labels", {
  id: serial("id").primaryKey(),
  dateAdded: timestamp("date_added").defaultNow().notNull(),
  name: varchar("name", { length: 120 }).notNull().unique(),
  creatorId: integer("creator_id")
    .references(() => accountsTable.id)
    .notNull(),
  bannerImageId: integer("banner_image_id").references(() => mediaTable.id),
  iconImageId: integer("icon_image_id").references(() => mediaTable.id),
});
