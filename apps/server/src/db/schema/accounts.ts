import {
  DEFAULT_HANDLE_CHARACTER_LIMIT,
  DEFAULT_IMAGE,
  DEFAULT_USER_POINTS,
} from "@/config/constants";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  providerId: varchar("provider_id", { length: 36 }).notNull().unique(),
  points: integer("points").notNull().default(DEFAULT_USER_POINTS),
  handle: varchar("handle", { length: DEFAULT_HANDLE_CHARACTER_LIMIT })
    .notNull()
    .unique(),
  dateCreated: timestamp("date_created").defaultNow(),
  profileImage: varchar("profile_image", { length: 150 }),
});
