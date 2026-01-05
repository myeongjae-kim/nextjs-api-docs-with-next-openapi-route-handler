import { testEnv } from "@/test/testEnv";
import { describe, expect, it } from "vitest";

describe("GET /api/articles", () => {
  it("should return 200", async () => {
    const response = await fetch(`${testEnv.TEST_HOST}/api/articles`);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      content: [
        {
          id: 1,
          title: "Article 1",
          content: "Content of article 1",
        },
        {
          id: 2,
          title: "Article 2",
          content: "Content of article 2",
        },
        {
          id: 3,
          title: "Article 3",
          content: "Content of article 3",
        },
      ],
    });
  });
});

describe("POST /api/articles", () => {
  it("should return 200", async () => {
    const response = await fetch(`${testEnv.TEST_HOST}/api/articles`, {
      method: "POST",
      headers: {
        Authorization: "Bearer default-token-value-for-docs",
      },
    });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      id: 1,
    });
  });

  it("should return 401 when invalid token", async () => {
    const response = await fetch(`${testEnv.TEST_HOST}/api/articles`, {
      method: "POST",
      headers: {
        Authorization: "Bearer invalid-token-value",
      },
    });
    expect(response.status).toBe(401);
  });
});
