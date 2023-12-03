import { resetPostgresDatabase } from "@/__tests__/utils/postgres";
import { createArtistRecord } from "@/v1/services/artists.service";
import { createGroupRecord, getAllGroups } from "@/v1/services/groups.service";
import { createRecordLabel } from "@/v1/services/recordLabels.service";
import { createDefaultUser } from "../utils/users";

const seed = async () => {
  await createDefaultUser();
  await createRecordLabel(1, "SM Entertainment"); // create label
  await createRecordLabel(1, "YG Entertainment"); // create label
  await createArtistRecord({ stageName: "Karina", label: 1 }, 1);
  await createArtistRecord({ stageName: "Winter", label: 1 }, 1);
  await createArtistRecord({ stageName: "Giselle", label: 1 }, 1);
  await createArtistRecord({ stageName: "NingNing", label: 1 }, 1);

  await createGroupRecord(1, {
    label: 1,
    name: "Aespa",
    artists: [1, 2, 3, 4],
  });

  await createGroupRecord(1, {
    label: 2,
    name: "BLACKPINK",
  });
};
describe("Groups Service Test", () => {
  beforeAll(async () => {
    await resetPostgresDatabase();
    await seed();
  }, 20000);

  describe("`getAllGroups`", () => {
    it("should return two groups, bp & aespa", async () => {
      const groups = await getAllGroups(1);
      expect(groups.length).toBe(2);
    });
    it("should return a single group, aespa", async () => {
      const groups = await getAllGroups(1, 1);

      expect(groups.length).toBe(1);
      expect(groups?.[0].name).toBe("Aespa");
    });
  });
});
