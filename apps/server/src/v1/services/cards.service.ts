import db from "@/clients/postgres";
import { cardsTable } from "@/db/schema/card";
import { ConsumablePack } from "./packs.service";
import { RARITY_CARD_COUNT, getRandomRarity } from "@/utils/rarity";
import { and, eq, inArray, sql } from "drizzle-orm";
import { collectablesTable } from "@/db/schema/collectable";
import { artistsCollectablesTable } from "@/db/schema/artistCollectables";
import { groupCollectablesTable } from "@/db/schema/groupCollectables";
import { groupsTable } from "@/db/schema/group";
import { recordLabelsTable } from "@/db/schema/recordLabels";
import { APIError } from "@/errors";
import { getRandomizedArray } from "@/utils/array";
import { erasTable } from "@/db/schema/era";
import { alias } from "drizzle-orm/pg-core";
import { mediaTable } from "@/db/schema/media";
import { accountsTable } from "@/db/schema/accounts";
import { artistsTable } from "@/db/schema/artist";
import { CardInfo } from "@alvaldi/common";

export const mintCards = async (collectableIds: number[], ownerId: number) => {
  const records = await db
    .insert(cardsTable)
    .values(collectableIds.map((collectableId) => ({ collectableId, ownerId })))
    .returning({ id: cardsTable.id });

  return records.map((v) => v.id);
};

export const getCollectablesForConsumablePack = async (
  pack: ConsumablePack
) => {
  const rarity = getRandomRarity(pack.rarity); // get the rarity of card to mint
  let records: { id: number }[] = [];

  const cardCount = RARITY_CARD_COUNT[rarity];

  if (pack.artistId) {
    // Cards from specific artist
    records = await db
      .select({ id: artistsCollectablesTable.collectableId })
      .from(artistsCollectablesTable)
      .leftJoin(
        collectablesTable,
        eq(collectablesTable.id, artistsCollectablesTable.collectableId)
      )
      .where(
        and(
          eq(collectablesTable.rarity, rarity),
          eq(artistsCollectablesTable.artistId, pack.artistId)
        )
      )
      .orderBy(sql`RANDOM()`)
      .limit(cardCount);
  } else if (pack.eraId) {
    // cards from specific era
    records = await db
      .select({ id: collectablesTable.id })
      .from(collectablesTable)
      .where(
        and(
          eq(collectablesTable.rarity, rarity),
          eq(collectablesTable.eraId, pack.eraId)
        )
      )
      .orderBy(sql`RAND()`)
      .limit(cardCount);
  } else if (pack.groupId) {
    // cards from specific group
    records = await db
      .select({ id: groupCollectablesTable.collectableId })
      .from(groupCollectablesTable)
      .leftJoin(
        collectablesTable,
        eq(collectablesTable.id, groupCollectablesTable.collectableId)
      )
      .where(
        and(
          eq(collectablesTable.rarity, rarity),
          eq(groupCollectablesTable.groupId, pack.groupId)
        )
      )
      .orderBy(sql`RANDOM()`)
      .limit(cardCount);
  } else if (pack.labelId) {
    // cards from specific record labels
    records = await db
      .select({ id: collectablesTable.id })
      .from(collectablesTable)
      .leftJoin(
        recordLabelsTable,
        eq(recordLabelsTable.id, groupsTable.labelId)
      )
      .leftJoin(groupsTable, eq(groupsTable.id, groupCollectablesTable.groupId))
      .leftJoin(
        groupCollectablesTable,
        eq(collectablesTable.id, groupCollectablesTable.collectableId)
      )
      .where(
        and(
          eq(collectablesTable.rarity, rarity),
          eq(recordLabelsTable.id, pack.labelId)
        )
      )
      .orderBy(sql`RANDOM()`)
      .limit(cardCount);
  } else if (pack.type) {
    // boy or girl groups
    records = await db
      .select({ id: groupCollectablesTable.collectableId })
      .from(groupCollectablesTable)
      .leftJoin(
        collectablesTable,
        eq(collectablesTable.id, groupCollectablesTable.collectableId)
      )
      .where(
        and(
          eq(collectablesTable.rarity, rarity),
          eq(groupsTable.groupType, pack.type)
        )
      )
      .orderBy(sql`RANDOM()`)
      .limit(cardCount);
  } else {
    records = await db
      .select({ id: collectablesTable.id })
      .from(collectablesTable)
      .orderBy(sql`RANDOM()`)
      .limit(cardCount);
  }

  if (records.length === 0) {
    // not enough cards created to fulfil request throw
    throw new APIError("not enough cards present to fulfil request.");
  }

  return getRandomizedArray(
    records.map((v) => v.id),
    cardCount
  );
};

export const getCards = async (ids: number[]): Promise<CardInfo[]> => {
  const m1 = alias(mediaTable, "m1");
  const m2 = alias(mediaTable, "m2");
  const m3 = alias(mediaTable, "m3");
  const m4 = alias(mediaTable, "m4");
  const records = await db
    .select({
      id: cardsTable.id,
      mintDate: cardsTable.mintDate,

      collectableId: collectablesTable.id,
      collectableRarity: collectablesTable.rarity,
      collectableMediaUrl: m1.url,

      eraId: erasTable.id,
      eraName: erasTable.title,
      eraIconImageUrl: m2.url,

      ownerId: accountsTable.id,
      ownerHandle: accountsTable.handle,
      ownerIconImageUrl: accountsTable.profileImage,

      groupId: groupsTable.id,
      groupName: groupsTable.englishName,
      groupIconImageUrl: m4.url,
    })
    .from(cardsTable)
    .where(inArray(cardsTable.id, ids))
    .innerJoin(
      collectablesTable,
      eq(collectablesTable.id, cardsTable.collectableId)
    )
    .innerJoin(erasTable, eq(collectablesTable.id, erasTable.id))
    .innerJoin(accountsTable, eq(accountsTable.id, cardsTable.ownerId))
    .leftJoin(
      groupCollectablesTable,
      eq(cardsTable.collectableId, groupCollectablesTable.collectableId)
    )
    .leftJoin(groupsTable, eq(groupsTable.id, groupCollectablesTable.groupId))
    .leftJoin(m1, eq(collectablesTable.mediaId, m1.id))
    .leftJoin(m2, eq(erasTable.iconImageId, m2.id))
    .leftJoin(m4, eq(groupsTable.iconImageId, m4.id));

  const collectableIds = records.map((v) => v.collectableId);
  const artists = await db
    .select({
      collectableId: artistsCollectablesTable.collectableId,
      artistId: artistsTable.id,
      stageName: artistsTable.stageName,
      iconImageUrl: mediaTable.url,
    })
    .from(artistsCollectablesTable)
    .innerJoin(
      artistsTable,
      eq(artistsCollectablesTable.artistId, artistsTable.id)
    )
    .leftJoin(mediaTable, eq(mediaTable.id, artistsTable.iconImageId))
    .where(inArray(artistsCollectablesTable.collectableId, collectableIds));

  return records.map(
    (record): CardInfo => ({
      id: record.id,
      mintDate: record.mintDate,
      owner: {
        id: record.ownerId,
        handle: record.ownerHandle,
        iconImageUrl: record.ownerIconImageUrl,
      },
      collectable: {
        id: record.collectableId,
        mediaUrl: record.collectableMediaUrl,
        rarity: record.collectableRarity,
        era: {
          id: record.eraId,
          title: record.eraName,
          iconImageUrl: record.eraIconImageUrl,
        },
        group: record.groupId
          ? {
              id: record.groupId ?? -1,
              name: record.groupName ?? "",
              iconImageUrl: record.groupIconImageUrl,
            }
          : null,
        artists: artists
          .filter((artist) => artist.collectableId == record.collectableId)
          .map((artist) => ({
            id: artist.artistId,
            stageName: artist.stageName,
            iconImageUrl: artist.iconImageUrl,
          })),
      },
    })
  );
};
