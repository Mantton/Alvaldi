import db from "@/clients/postgres";
import { recordLabelsTable } from "@/db/schema/recordLabels";
import { consumeImageNano } from "./media.service";
import { BadRequestError } from "@/errors";
import { eq } from "drizzle-orm";
import { consumeMediaToken } from "@/utils/media";

/**
 * Adds a new Record label Record to the database
 * @param creatorId Serial ID of the use creating this record
 * @param name The name of the record
 * @param imageID the nano id of the image
 * @returns
 */
export const createRecordLabel = async (
  creatorId: number,
  name: string,
  iconImage?: string,
  bannerImage?: string
) => {
  // consume media tokens
  const [iconId, bannerId] = await consumeMediaToken(iconImage, bannerImage);
  const [record] = await db
    .insert(recordLabelsTable)
    .values({
      name,
      creatorId: creatorId,
      iconImageId: iconId,
      bannerImageId: bannerId,
    })
    .returning({ id: recordLabelsTable.id, name: recordLabelsTable.name });

  if (!record) throw new Error("[createRecordLabel] Failed to Create Record");

  return record;
};

export const recordLabelExists = async (id: number) => {
  const labels = await db
    .select({ id: recordLabelsTable.id })
    .from(recordLabelsTable)
    .where(eq(recordLabelsTable.id, id));

  return !!labels.length;
};
