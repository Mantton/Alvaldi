import db from "@/clients/postgres";
import { recordLabelsTable } from "@/db/schema/recordLabels";

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
  imageID?: string
) => {
  const [record] = await db
    .insert(recordLabelsTable)
    .values({
      name,
      creatorId: creatorId,
    })
    .returning({ id: recordLabelsTable.id, name: recordLabelsTable.name });

  if (!record) throw new Error("[createRecordLabel] Failed to Create Record");

  return record;
};
