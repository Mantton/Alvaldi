import db from "@/clients/postgres";
import { recordLabelsTable } from "@/db/schema/recordLabels";
import { consumeImageNano } from "./media.service";

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
  let iconId: null | number = null;
  let bannerId: null | number = null;

  // Get Image ID's from db
  if (iconImage) {
    iconId = await consumeImageNano(iconImage);
  }
  if (bannerImage) {
    bannerId = await consumeImageNano(bannerImage);
  }
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
