import db from "@/clients/postgres";
import { resetPostgresDatabase } from "@/__tests__/utils/postgres";
import { createArtistRecord } from "@/v1/services/artists.service";
import { createEraRecord } from "@/v1/services/eras.service";
import { createGroupRecord } from "@/v1/services/groups.service";
import { createRecordLabel } from "@/v1/services/recordLabels.service";
import { createDefaultUser } from "../utils/users";
import { createCollectableRecord } from "@/v1/services/collectables.service";
import { CollectableRarity, PackGroup } from "@alvaldi/common";
import { storeMediaURL } from "@/v1/services/media.service";
import {
  buyPackForAccount,
  consumePackForAccount,
} from "@/v1/services/packs.service";
import { getCards } from "@/v1/services/cards.service";

const seed = async () => {
  await createDefaultUser();
  await createRecordLabel(1, "SM Entertainment"); // create label
  await createArtistRecord({ stageName: "Karina", label: 1 }, 1);
  await createArtistRecord({ stageName: "Winter", label: 1 }, 1);
  await createArtistRecord({ stageName: "Giselle", label: 1 }, 1);
  await createArtistRecord({ stageName: "NingNing", label: 1 }, 1);

  await createGroupRecord(1, {
    label: 1,
    name: "Aespa",
    artists: [1, 2, 3, 4],
  });

  await createEraRecord(1, {
    name: "Drama",
    group: 1,
  });

  // C1
  const { id: mediaId } = await storeMediaURL("https://test.com/image.jpg", 1);

  await createCollectableRecord(1, {
    era: 1,
    media: mediaId,
    rarity: CollectableRarity.COMMON,
    group: 1,
  });

  // C2
  const { id: mediaId2 } = await storeMediaURL(
    "https://test.com/image2.jpg",
    1
  );

  await createCollectableRecord(1, {
    era: 1,
    media: mediaId2,
    rarity: CollectableRarity.COMMON,
    group: 1,
  });
};
describe("Packs Service Test", () => {
  beforeAll(async () => {
    await resetPostgresDatabase();
    await seed();
  }, 20000);

  describe("Buy Pack", () => {
    it("should purchase a pack for the user from all possible groups", async () => {
      await buyPackForAccount(
        {
          rarity: CollectableRarity.COMMON,
          identifier: 0,
          group: PackGroup.ALL,
        },
        1
      );
    });
  });

  describe("Consume Pack", () => {
    it("should consume a newly created pack", async () => {
      const packId = await buyPackForAccount(
        {
          rarity: CollectableRarity.COMMON,
          identifier: 0,
          group: PackGroup.ALL,
        },
        1
      );
      const ids = await consumePackForAccount(packId, 1);

      const cards = await getCards(ids);
    });
  });
});
