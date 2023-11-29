import { TEST_USER_1, createDefaultUser } from "@/__tests__/utils/users";
import app from "@/app";
import { resetPostgresDatabase } from "@/__tests__/utils/postgres";
import supertest from "supertest";
import { createRecordLabel } from "@/v1/services/recordLabels.service";
import { CreateEraRequest } from "@alvaldi/common";
import { createArtistRecord } from "@/v1/services/artists.service";
import { createGroupRecord } from "@/v1/services/groups.service";
import { getEraWithID } from "@/v1/services/eras.service";

const seed = async () => {
  await createDefaultUser(); // create user
  await createRecordLabel(1, "SM Entertainment"); // create label
  await createArtistRecord({ stageName: "Karina", label: 1 }, 1);
  await createArtistRecord({ stageName: "Winter", label: 1 }, 1);
  await createArtistRecord({ stageName: "Giselle", label: 1 }, 1);
  await createArtistRecord({ stageName: "NingNing", label: 1 }, 1);

  const id = await createGroupRecord(1, {
    label: 1,
    name: "Aespa",
    artists: [1, 2],
  });
  console.log("group id ", id);
};
describe("Eras Routes", () => {
  beforeEach(async () => {
    await resetPostgresDatabase();
  });

  describe("PUT /v1/eras", () => {
    it("should respond with a `401` status as it is an unauthenticated request ", async () => {
      await supertest(app).put("/v1/eras").expect(401);
    });

    it("should respond with a `201` status code & the id of a newly created Era named `Drama` for the group `Aespa`", async () => {
      await seed();

      const data: CreateEraRequest = {
        name: "Drama",
        group: 1,
      };

      const {
        body: { id: eraId },
      } = await supertest(app)
        .put("/v1/eras")
        .set("Authorization", `Bearer ${TEST_USER_1.token}`)
        .send(data)
        .expect(201);

      const era = await getEraWithID(eraId);
      expect(era).not.toBeNull();
      expect(era?.title).toBe("Drama");
      expect(era?.id).toBe(eraId);
      expect(era?.artists).not.toHaveLength(0);
      expect(era?.artists.map((v) => v.id)).toContain(1);
      expect(era?.artists.map((v) => v.id)).toContain(2);
      expect(era?.artists.map((v) => v.stageName)).toContain("Karina");
      expect(era?.artists.map((v) => v.stageName)).toContain("Winter");
    }, 10000);
  });
});
