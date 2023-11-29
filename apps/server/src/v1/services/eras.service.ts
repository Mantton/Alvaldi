import db from "@/clients/postgres";
import { erasTable } from "@/db/schema/era";
import { consumeMediaToken } from "@/utils/media";
import { CreateEraRequest } from "@alvaldi/common";
import { groupExists } from "./groups.service";
import { BadRequestError } from "@/errors";
import { groupErasTable } from "@/db/schema/groupEras";
import { allArtistsExistsIn } from "./artists.service";
import { artistErasTable } from "@/db/schema/artistEras";
import { artistsTable } from "@/db/schema/artist";
import { groupArtistsTable } from "@/db/schema/groupArtists";
import { eq } from "drizzle-orm";
import { iconsTable, bannersTable } from "@/utils/aliases";
import { groupsTable } from "@/db/schema/group";
import { mediaTable } from "@/db/schema/media";
import { alias } from "drizzle-orm/pg-core";
import { PopulatedEraInfo } from "@alvaldi/common";

export const createEraRecord = async (
  creatorId: number,
  data: CreateEraRequest
) => {
  // consume media
  const [iconId, bannerId] = await consumeMediaToken(data.icon, data.banner);

  // DNE guard
  if (data.group) {
    const exists = await groupExists(data.group);
    if (!exists) throw new BadRequestError();
  } else if (data.artists) {
    const exists = await allArtistsExistsIn(data.artists);
    if (!exists) throw new BadRequestError();
  }

  // db transaction
  const eraId = await db.transaction(async (tx) => {
    // insert era's record
    const [{ eraId }] = await tx
      .insert(erasTable)
      .values({
        title: data.name,
        date: data.date ?? new Date(),
        iconImageId: iconId,
        bannerImageId: bannerId,
        creatorId,
      })
      .returning({ eraId: erasTable.id });

    // create join record for group
    if (data.group) {
      // Create Group Join
      await tx.insert(groupErasTable).values({
        groupId: data.group,
        eraId,
      });

      // Fetch Artists in Group
      const artists = await db
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
        await tx
          .insert(artistErasTable)
          .values(artists.map(({ id: artistId }) => ({ artistId, eraId })));
      }
    } else if (data.artists) {
      await tx
        .insert(artistErasTable)
        .values(data.artists.map((artistId) => ({ artistId, eraId })));
    }

    return eraId;
  });

  return eraId;
};

export const getEraWithID = async (
  id: number
): Promise<PopulatedEraInfo | null> => {
  const m3 = alias(mediaTable, "m3");
  const [record] = await db
    .select({
      id: erasTable.id,
      title: erasTable.title,
      iconImageUrl: iconsTable.url,
      bannerImageUrl: bannersTable.url,
      group: {
        id: groupsTable.id,
        name: groupsTable.englishName,
        iconImageUrl: m3.url,
      },
    })
    .from(erasTable)
    .where(eq(erasTable.id, id))
    .leftJoin(iconsTable, eq(erasTable.iconImageId, iconsTable.id))
    .leftJoin(bannersTable, eq(erasTable.bannerImageId, bannersTable.id))
    .leftJoin(groupErasTable, eq(erasTable.id, groupErasTable.eraId))
    .leftJoin(groupsTable, eq(groupsTable.id, groupErasTable.groupId))
    .leftJoin(m3, eq(groupsTable.iconImageId, m3.id));

  if (!record) return null;

  // get artist
  const artists = await db
    .select({
      id: artistsTable.id,
      stageName: artistsTable.stageName,
      iconImageUrl: mediaTable.url,
    })
    .from(artistErasTable)
    .where(eq(artistErasTable.eraId, id))
    .rightJoin(artistsTable, eq(artistErasTable.artistId, artistsTable.id))
    .leftJoin(mediaTable, eq(mediaTable.id, artistsTable.iconImageId));

  return {
    id: record.id,
    title: record.title,
    iconImageUrl: record.iconImageUrl,
    bannerImageUrl: record.bannerImageUrl,
    group:
      record.group.id && record.group.name
        ? {
            id: record.id,
            name: record.group.name,
            iconImageUrl: record.group.iconImageUrl,
          }
        : null,

    artists,
  };
};
