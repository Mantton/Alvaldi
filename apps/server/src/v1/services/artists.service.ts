import db from "@/clients/postgres";
import { BadRequestError } from "@/errors";
import { BasicArtistInfo, CreateArtistRequestSchema } from "@alvaldi/common";
import { eq, sql, inArray, asc } from "drizzle-orm";
import { z } from "zod";
import { artistsTable } from "@/db/schema/artist";
import { groupArtistsTable } from "@/db/schema/groupArtists";
import { recordLabelExists } from "./recordLabels.service";
import { consumeMediaToken } from "@/utils/media";
import { iconsTable, bannersTable } from "@/utils/aliases";

type CreateArtistProps = z.infer<typeof CreateArtistRequestSchema>;

export const createArtistRecord = async (
  data: CreateArtistProps,
  creatorId: number
) => {
  // some validation checks

  // label exists
  const labelExists = await recordLabelExists(data.label);
  if (!labelExists) throw new BadRequestError();

  // TODO: Check that groups exists

  // consume media tokens
  const [iconId, bannerId] = await consumeMediaToken(data.icon, data.banner);

  const id = await db.transaction(async (tx) => {
    // create record on artist table
    const [{ artistId }] = await tx
      .insert(artistsTable)
      .values({
        stageName: data.stageName,
        iconImageId: iconId,
        bannerImageId: bannerId,
        creatorId,
        labelId: data.label,
      })
      .returning({ artistId: artistsTable.id });

    // create records on groups
    if (data.groups) {
      await tx
        .insert(groupArtistsTable)
        .values(data.groups.map((groupId) => ({ artistId, groupId })));
    }

    return artistId;
  });

  return id;
};

export const getArtistWithID = async (
  id: number
): Promise<BasicArtistInfo | null> => {
  const results = await db
    .select({
      id: artistsTable.id,
      stageName: artistsTable.stageName,
      iconImageUrl: iconsTable.url,
      bannerImageUrl: bannersTable.url,
    })
    .from(artistsTable)
    .where(eq(artistsTable.id, id))
    .leftJoin(iconsTable, eq(artistsTable.iconImageId, iconsTable.id))
    .leftJoin(bannersTable, eq(artistsTable.bannerImageId, bannersTable.id));

  if (!results.length) return null;

  return results?.[0];
};

export const allArtistsExistsIn = async (ids: number[]) => {
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(artistsTable)
    .where(inArray(artistsTable.id, ids));

  return ids.length == count;
};

export const getAllArtists = async (
  page: number,
  label?: number
): Promise<BasicArtistInfo[]> => {
  const limit = 25;
  const offset = (Math.min(page - 1), 0) * 25;

  let query = db
    .select({
      id: artistsTable.id,
      stageName: artistsTable.stageName,
      iconImageUrl: iconsTable.url,
      bannerImageUrl: bannersTable.url,
    })
    .from(artistsTable)
    .leftJoin(iconsTable, eq(iconsTable.id, artistsTable.iconImageId))
    .leftJoin(bannersTable, eq(bannersTable.id, artistsTable.bannerImageId))
    .$dynamic();
  if (label) {
    query = query.where(eq(artistsTable.labelId, label));
  }

  query = query
    .limit(limit)
    .offset(offset)
    .orderBy(asc(artistsTable.stageName));

  return await query;
};
