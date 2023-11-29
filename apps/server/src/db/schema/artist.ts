import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { mediaTable } from "./media";
import { accountsTable } from "./accounts";
import { recordLabelsTable } from "./recordLabels";

export const artistsTable = pgTable("artists", {
  id: serial("id").primaryKey(),
  stageName: varchar("stage_name").notNull(),
  iconImageId: integer("icon_image_id").references(() => mediaTable.id),
  bannerImageId: integer("banner_image_id").references(() => mediaTable.id),
  creatorId: integer("creator_id").references(() => accountsTable.id),
  dateAdded: timestamp("date_added").defaultNow(),
  labelId: integer("label_id")
    .references(() => recordLabelsTable.id)
    .notNull(),
});
