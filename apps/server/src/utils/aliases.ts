import { mediaTable } from "@/db/schema/media";
import { alias } from "drizzle-orm/pg-core";

export const iconsTable = alias(mediaTable, "icon_media");
export const bannersTable = alias(mediaTable, "banner_media");
