import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { recordLabelsTable } from "./recordLabels";
import { accountsTable } from "./accounts";
import { mediaTable } from "./media";

export const groupsTable = pgTable("groups", {
  id: serial("id").primaryKey(),
  labelId: integer("label_id")
    .references(() => recordLabelsTable.id)
    .notNull(),
  englishName: varchar("eng_name").notNull(),
  creatorId: integer("creator_id")
    .notNull()
    .references(() => accountsTable.id),
  iconImageId: integer("icon_image_id").references(() => mediaTable.id),
  bannerImageId: integer("banner_image_id").references(() => mediaTable.id),
  dateAdded: timestamp("date_added").defaultNow(),
});
