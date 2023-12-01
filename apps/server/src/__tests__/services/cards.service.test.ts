import { resetPostgresDatabase } from "@/__tests__/utils/postgres";
import { createArtistRecord } from "@/v1/services/artists.service";
import { createEraRecord } from "@/v1/services/eras.service";
import { createGroupRecord } from "@/v1/services/groups.service";
import { createRecordLabel } from "@/v1/services/recordLabels.service";
import { createDefaultUser } from "../utils/users";
import { createCollectableRecord } from "@/v1/services/collectables.service";
import { CollectableRarity } from "@alvaldi/common";
import { storeMediaURL } from "@/v1/services/media.service";
import { mintCards } from "@/v1/services/cards.service";
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

  const { id: mediaId } = await storeMediaURL("https://test.com/image.jpg", 1);

  await createCollectableRecord(1, {
    era: 1,
    media: mediaId,
    rarity: CollectableRarity.COMMON,
    group: 1,
  });
};
describe("Cards Service Test", () => {
  beforeAll(() => {
    return resetPostgresDatabase();
  });

  describe("Mint Card", () => {
    it("should mint a card", async () => {
      //
      await seed();
      await mintCards([1], 1);
    }, 10000);
  });
});
