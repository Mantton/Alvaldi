import db from "@/clients/postgres";
import { recordLabelsTable } from "@/db/schema/recordLabels";
import { BadRequestError } from "@/errors";
import { CreateArtistRequestSchema } from "@alvaldi/common";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { consumeImageNano } from "./media.service";
import { artistsTable } from "@/db/schema/artist";
import { groupArtistsTable } from "@/db/schema/groupArtists";
import { mediaTable } from "@/db/schema/media";
import { alias } from "drizzle-orm/pg-core";

type CreateArtistProps = z.infer<typeof CreateArtistRequestSchema>;

export const createArtistRecord = async (
  data: CreateArtistProps,
  creatorId: number
) => {
  // some validation checks
  // label exists
  const labels = await db
    .select({ id: recordLabelsTable.id })
    .from(recordLabelsTable)
    .where(eq(recordLabelsTable.id, data.label));

  if (!labels.length) throw new BadRequestError();

  // TODO: Check that groups exists

  // images
  let iconId: null | number = null;
  let bannerId: null | number = null;

  // Get Image ID's from db
  if (data.icon) {
    iconId = await consumeImageNano(data.icon);
  }
  if (data.banner) {
    bannerId = await consumeImageNano(data.banner);
  }

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

export const getArtistWithID = async (id: number) => {
  const iconsTable = alias(mediaTable, "icon_media");
  const bannersTable = alias(mediaTable, "banner_media");

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
