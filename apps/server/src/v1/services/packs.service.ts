import { getPointsForPackKey } from "@/utils/packs";
import { guardSufficientBalanceAvailableForPurchase } from "./accounts.service";
import { BuyPackRequest, PackGroup } from "@alvaldi/common";
import db from "@/clients/postgres";
import {
  artistPacksTable,
  eraPacksTable,
  groupPacksTable,
  packsTable,
  recordLabelPacksTable,
} from "@/db/schema/packs";
import { and, eq } from "drizzle-orm";
import { BadRequestError } from "@/errors";
import { getCollectablesForConsumablePack, mintCards } from "./cards.service";

/**
 * buys a pack for a given user
 * @param data The request
 * @param accountId the account of the user requesting a pack
 * @returns an ID of a pack
 */
export const buyPackForAccount = async (
  data: BuyPackRequest,
  accountId: number
) => {
  const points = getPointsForPackKey(data.rarity, data.group);
  await guardSufficientBalanceAvailableForPurchase(accountId, points);

  // TODO: validate artist, era, group, label
  // TODO: Hold Points

  const groupType = (() => {
    switch (data.group) {
      case PackGroup.BOY_GROUP:
        return "boy";
      case PackGroup.GIRL_GROUP:
        return "girl";
      default:
        return null;
    }
  })();
  const id = await db.transaction(async (tx) => {
    const [{ packId }] = await tx
      .insert(packsTable)
      .values({
        rarity: data.rarity,
        ownerId: accountId,
        groupType,
      })
      .returning({ packId: packsTable.id });

    switch (data.group) {
      case PackGroup.BOY_GROUP:
      case PackGroup.GIRL_GROUP:
      case PackGroup.ALL: {
        break;
      }
      case PackGroup.ARTIST: {
        await tx
          .insert(artistPacksTable)
          .values({ id: packId, artistId: data.identifier });
        break;
      }
      case PackGroup.ERA: {
        await tx
          .insert(eraPacksTable)
          .values({ id: packId, eraId: data.identifier });
        break;
      }
      case PackGroup.GROUP: {
        await tx
          .insert(groupPacksTable)
          .values({ id: packId, groupId: data.identifier });
        break;
      }
      case PackGroup.LABEL: {
        await tx
          .insert(recordLabelPacksTable)
          .values({ id: packId, labelId: data.identifier });
      }
    }

    return packId;
  });

  // TODO: Release hold and update record
  return id;
};

export const consumePackForAccount = async (
  packId: number,
  accountId: number
) => {
  const [record] = await db
    .select({
      id: packsTable.id,
      type: packsTable.groupType,
      rarity: packsTable.rarity,
      isConsumed: packsTable.isConsumed,
      groupId: groupPacksTable.groupId,
      eraId: eraPacksTable.eraId,
      artistId: artistPacksTable.artistId,
      labelId: recordLabelPacksTable.labelId,
    })
    .from(packsTable)
    .where(and(eq(packsTable.id, packId), eq(packsTable.ownerId, accountId)))
    .leftJoin(artistPacksTable, eq(artistPacksTable.id, packsTable.id))
    .leftJoin(eraPacksTable, eq(eraPacksTable.id, packsTable.id))
    .leftJoin(groupPacksTable, eq(groupPacksTable.id, packsTable.id))
    .leftJoin(
      recordLabelPacksTable,
      eq(recordLabelPacksTable.id, packsTable.id)
    );

  if (!record || record.isConsumed) throw new BadRequestError();

  // Consume Pack
  const collectableIds = await getCollectablesForConsumablePack(record);

  const cards = await mintCards(collectableIds, accountId);
  return cards;
};

export type ConsumablePack = {
  id: number;
  type: "boy" | "girl" | null;
  rarity: "common" | "superior" | "rare" | "elite" | "legendary" | "celestial";
  isConsumed: boolean;
  groupId: number | null;
  eraId: number | null;
  artistId: number | null;
  labelId: number | null;
};
