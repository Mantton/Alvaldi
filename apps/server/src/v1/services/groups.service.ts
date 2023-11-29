import db from "@/clients/postgres";
import { BadRequestError } from "@/errors";
import type { CreateGroupRequest } from "@alvaldi/common";
import { recordLabelExists } from "./recordLabels.service";
import { consumeMediaToken } from "@/utils/media";
import { groupsTable } from "@/db/schema/group";
import { groupArtistsTable } from "@/db/schema/groupArtists";
import { eq } from "drizzle-orm";
import { bannersTable, iconsTable, mediaTable } from "@/db/schema/media";
import { recordLabelsTable } from "@/db/schema/recordLabels";
import { alias } from "drizzle-orm/pg-core";
import { artistsTable } from "@/db/schema/artist";

export const createGroupRecord = async (
  creatorId: number,
  data: CreateGroupRequest
) => {
  // label exists
  const labelExists = await recordLabelExists(data.label);
  if (!labelExists) throw new BadRequestError();

  // TODO: Check that artists exists

  // consume media tokens
  const [iconId, bannerId] = await consumeMediaToken(data.icon, data.banner);

  const id = await db.transaction(async (tx) => {
    // create record on groups table
    const [{ groupId }] = await db
      .insert(groupsTable)
      .values({
        creatorId,
        labelId: data.label,
        englishName: data.name,
        iconImageId: iconId,
        bannerImageId: bannerId,
      })
      .returning({ groupId: groupsTable.id });

    // add artists to group
    if (data.artists) {
      await tx
        .insert(groupArtistsTable)
        .values(data.artists.map((artistId) => ({ groupId, artistId })));
    }

    return groupId;
  });

  return id;
};

export const getGroupInfo = async (id: number) => {
  const recordLabelIconTable = alias(mediaTable, "record_label_icon");
  const results = await db
    .select({
      id: groupsTable.id,
      name: groupsTable.englishName,
      label: {
        id: groupsTable.labelId,
        name: recordLabelsTable.name,
        iconImageUrl: recordLabelIconTable.url,
      },
      iconImageUrl: iconsTable.url,
      bannerImageUrl: bannersTable.url,
    })
    .from(groupsTable)
    .where(eq(groupsTable.id, id))
    .leftJoin(iconsTable, eq(groupsTable.iconImageId, iconsTable.id))
    .leftJoin(bannersTable, eq(groupsTable.bannerImageId, bannersTable.id))
    .leftJoin(recordLabelsTable, eq(groupsTable.labelId, recordLabelsTable.id))
    .leftJoin(
      recordLabelIconTable,
      eq(recordLabelsTable.id, recordLabelsTable.id)
    );

  if (!results.length) return null;

  const artists = await db
    .select({
      id: artistsTable.id,
      stageName: artistsTable.stageName,
      iconImageUrl: iconsTable.url,
      bannerImageUrl: bannersTable.url,
    })
    .from(groupArtistsTable)
    .rightJoin(artistsTable, eq(artistsTable.id, groupArtistsTable.artistId))
    .leftJoin(iconsTable, eq(artistsTable.iconImageId, iconsTable.id))
    .leftJoin(bannersTable, eq(artistsTable.bannerImageId, bannersTable.id))
    .where(eq(groupArtistsTable.groupId, id));

  return {
    ...results?.[0],
    artists,
  };
};