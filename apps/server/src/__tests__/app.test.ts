import app from "@/app";
import supertest from "supertest";

describe("Basic App Tests", () => {
  describe("GET /ping", () => {
    it("should respond will a `200` status code & a simple 'pong' message.", async () => {
      const { status, text } = await supertest(app).get("/ping");
      expect(status).toBe(200);
      expect(text).toBe("pong");
    });
  });
});
