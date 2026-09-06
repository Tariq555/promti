import { describe, test, expect } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/generate-prompt/route";

/**
 * Integration test for the only server-side code in the application.
 * It exercises the real route handler end to end -- request parsing,
 * validation, and response shape -- without a running server.
 */

function postRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/generate-prompt", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/generate-prompt", () => {
  test("returns a generated prompt for a valid request", async () => {
    // Arrange
    const req = postRequest({ idea: "build a login form", targetAI: "claude" });

    // Act
    const res = await POST(req);
    const json = await res.json();

    // Assert
    expect(res.status).toBe(200);
    expect(typeof json.prompt).toBe("string");
    expect(json.prompt).toContain("build a login form");
  });

  test("tailors the response to the requested model", async () => {
    const res = await POST(
      postRequest({ idea: "write an essay", targetAI: "chatgpt" }),
    );
    const json = await res.json();

    expect(json.prompt).toContain("## Role");
  });

  test("rejects a missing idea with 400", async () => {
    const res = await POST(postRequest({ targetAI: "claude" }));

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Missing fields");
  });

  test("rejects a whitespace-only idea with 400", async () => {
    // `!idea?.trim()` is the guard. A space-only string must not slip past.
    const res = await POST(postRequest({ idea: "   ", targetAI: "claude" }));

    expect(res.status).toBe(400);
  });

  test("rejects a missing targetAI with 400", async () => {
    const res = await POST(postRequest({ idea: "build a login form" }));

    expect(res.status).toBe(400);
  });

  test("returns 500 with a friendly message when the body is not JSON", async () => {
    // req.json() throws, which the catch block converts into a 500.
    const res = await POST(postRequest("this is not json"));

    expect(res.status).toBe(500);
    expect((await res.json()).error).toBe(
      "Failed to generate prompt. Please try again.",
    );
  });

  test("never leaks internal error details to the client", async () => {
    const res = await POST(postRequest("{ broken"));
    const json = await res.json();

    expect(Object.keys(json)).toEqual(["error"]);
    expect(json.error).not.toMatch(/JSON|SyntaxError|at\s/);
  });

  test("accepts an unknown model and falls back rather than failing", async () => {
    const res = await POST(
      postRequest({ idea: "do something", targetAI: "not-a-real-model" }),
    );

    expect(res.status).toBe(200);
    expect((await res.json()).prompt).toContain(
      "You are a helpful expert assistant",
    );
  });
});
