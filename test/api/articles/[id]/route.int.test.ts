import { testEnv } from "@/test/testEnv";
import { describe, expect, it } from "vitest";

describe("GET /api/articles/[id]", () => {
  it("should return 200", async () => {
    const response = await fetch(`${testEnv.TEST_HOST}/api/articles/1`);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      id: 1,
      title: "Article 1",
      content: "Content of article 1",
    });
  });

  it("should return 500 when id is 999", async () => {
    const response = await fetch(`${testEnv.TEST_HOST}/api/articles/999`);
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toMatchObject({
      "code": "NONE",
      "error": "INTERNAL_SERVER_ERROR",
      "message": "Article #999 not found",
      "status": 500,
      "timestamp": expect.any(String),
    });
  });
});