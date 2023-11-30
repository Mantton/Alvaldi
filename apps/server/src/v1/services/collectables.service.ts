import { BadRequestError } from "@/errors";
import { consumeMediaToken } from "@/utils/media";
import {
  CreateCollectableRequest,
  PopulatedCollectableInfo,
} from "@alvaldi/common";
import { allArtistsExistsIn } from "./artists.service";
import { groupExists } from "./groups.service";
import db from "@/clients/postgres";
import { collectablesTable } from "@/db/schema/collectable";
import { groupCollectablesTable } from "@/db/schema/groupCollectables";
import { artistsCollectablesTable } from "@/db/schema/artistCollectables";
import { artistsTable } from "@/db/schema/artist";
import { groupArtistsTable } from "@/db/schema/groupArtists";
import { eq } from "drizzle-orm";
import { erasTable } from "@/db/schema/era";
import { mediaTable } from "@/db/schema/media";
import { groupsTable } from "@/db/schema/group";
import { alias } from "drizzle-orm/pg-core";

/**
 * Creates a New Collectable for a given era
 * @param creatorId The ID of the user creating the collectable
 * @param data
 * @returns ID of the newly created era
 */
export const createCollectableRecord = async (
  creatorId: number,
  data: CreateCollectableRequest
) => {
  // DNE guard
  if (data.group) {
    const exists = await groupExists(data.group);
    if (!exists) throw new BadRequestError();
  } else if (data.artists) {
    const exists = await allArtistsExistsIn(data.artists);
    if (!exists) throw new BadRequestError();
  }

  // consume media
  const [mediaId] = await consumeMediaToken(data.media);
  if (!mediaId) throw new BadRequestError();

  const id = await db.transaction(async (tx) => {
    // create initial record

    const [record] = await tx
      .insert(collectablesTable)
      .values({
        eraId: data.era,
        mediaId,
        creatorId,
        rarity: data.rarity,
      })
      .returning({ id: collectablesTable.id });

    // create supporting group records

    if (data.group) {
      // create for group
      await tx
        .insert(groupCollectablesTable)
        .values({ groupId: data.group, collectableId: record.id });

      // create for artists in group
      const artists = await tx
        .select({
          id: artistsTable.id,
        })
        .from(groupArtistsTable)
        .where(eq(groupArtistsTable.groupId, data.group))
        .rightJoin(
          artistsTable,
          eq(artistsTable.id, groupArtistsTable.artistId)
        );

      // Create Join Record for artists in group.
      if (artists.length) {
        await tx.insert(artistsCollectablesTable).values(
          artists.map(({ id: artistId }) => ({
            artistId,
            collectableId: record.id,
          }))
        );
      }
    } else if (data.artists) {
      // create supporting artist records

      await tx.insert(artistsCollectablesTable).values(
        data.artists.map((artistId) => ({
          artistId,
          collectableId: record.id,
        }))
      );
    }

    return record.id;
  });

  return id;
};

export const getCollectable = async (
  id: number
): Promise<PopulatedCollectableInfo | null> => {
  const m2 = alias(mediaTable, "m2");
  const [record] = await db
    .select({
      id: collectablesTable.id,
      mediaUrl: mediaTable.url,
      rarity: collectablesTable.rarity,
      era: {
        id: erasTable.id,
        title: erasTable.title,
      },
      group: {
        id: groupsTable.id,
        name: groupsTable.englishName,
        iconUrl: m2.url,
      },
    })
    .from(collectablesTable)
    .where(eq(collectablesTable.id, id))
    .leftJoin(erasTable, eq(erasTable.id, collectablesTable.eraId))
    .leftJoin(mediaTable, eq(collectablesTable.mediaId, mediaTable.id))
    .leftJoin(
      groupCollectablesTable,
      eq(groupCollectablesTable.collectableId, collectablesTable.id)
    )
    .leftJoin(groupsTable, eq(groupsTable.id, groupCollectablesTable.groupId))
    .leftJoin(m2, eq(m2.id, groupsTable.iconImageId));

  if (!record) return null;

  // get artists

  const artists = await db
    .select({
      id: artistsTable.id,
      stageName: artistsTable.stageName,
      iconImageUrl: mediaTable.url,
    })
    .from(artistsCollectablesTable)
    .where(eq(artistsCollectablesTable.collectableId, id))
    .innerJoin(
      artistsTable,
      eq(artistsTable.id, artistsCollectablesTable.artistId)
    )
    .leftJoin(mediaTable, eq(artistsTable.iconImageId, mediaTable.id));

  return {
    id: record.id,
    rarity: record.rarity,
    mediaUrl: record.mediaUrl,
    era: record.era,
    artists,
    group:
      record.group.id && record.group.name
        ? {
            id: record.group.id,
            name: record.group.name,
            iconImageUrl: record.group.iconUrl,
          }
        : null,
  };
};
