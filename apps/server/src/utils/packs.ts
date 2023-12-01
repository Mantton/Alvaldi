import { BadRequestError } from "@/errors";
import { CollectableRarity, PACK_POINTS, PackGroup } from "@alvaldi/common";

export const getPointsForPackKey = (
  rarity: CollectableRarity,
  group: PackGroup
) => {
  const value = PACK_POINTS[rarity][group];

  if (!value) throw new BadRequestError();

  return value * 1000;
};
