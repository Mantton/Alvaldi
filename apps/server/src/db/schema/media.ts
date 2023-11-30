import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { accountsTable } from "./accounts";

export const mediaTable = pgTable("media", {
  id: serial("id").primaryKey(),
  url: varchar("url").notNull().unique(),
  uploaderId: integer("uploader_id")
    .references(() => accountsTable.id)
    .notNull(),
  dateUploaded: timestamp("date_uploaded").defaultNow(),
});
