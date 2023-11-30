import db from "@/clients/postgres";
import { cardsTable } from "@/db/schema/card";

export const mintCard = async (collectableId: number, ownerId: number) => {
  const [{ id }] = await db
    .insert(cardsTable)
    .values({ collectableId, ownerId })
    .returning({ id: cardsTable.id });

  return id;
};
