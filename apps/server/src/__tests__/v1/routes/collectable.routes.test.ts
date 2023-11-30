import { TEST_USER_1, createDefaultUser } from "@/__tests__/utils/users";
import app from "@/app";
import { resetPostgresDatabase } from "@/__tests__/utils/postgres";
import supertest from "supertest";
import { createRecordLabel } from "@/v1/services/recordLabels.service";
import {
  CollectableRarity,
  CreateCollectableRequest,
  CreateEraRequest,
} from "@alvaldi/common";
import { createArtistRecord } from "@/v1/services/artists.service";
import { createGroupRecord } from "@/v1/services/groups.service";
import { createEraRecord, getEraWithID } from "@/v1/services/eras.service";
import { getCollectable } from "@/v1/services/collectables.service";

const seed = async () => {
  await createDefaultUser(); // create user
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
};
describe("collectable Routes", () => {
  beforeEach(async () => {
    await resetPostgresDatabase();
  });

  describe("PUT /v1/collectables", () => {
    it("should respond with a `401` status as it is an unauthenticated request ", async () => {
      await supertest(app).put("/v1/collectables").expect(401);
    });

    it("should respond with a `201` status code & the id of a newly created Era named `Drama` for the group `Aespa`", async () => {
      await seed();

      // Upload Media
      const {
        body: { id: mediaId },
      } = await supertest(app)
        .post("/v1/media/upload")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .attach("media", "./src/__tests__/assets/asset.jpeg")
        .expect(201);

      const data: CreateCollectableRequest = {
        era: 1,
        group: 1,
        rarity: CollectableRarity.COMMON,
        media: mediaId,
      };

      // create collectables
      const {
        body: { id },
      } = await supertest(app)
        .put("/v1/collectables")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .send(data)
        .expect(201);

      const collectable = await getCollectable(id);
      console.log(collectable);
    }, 20000);
  });
});
