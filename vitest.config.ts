import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    // Mirror the "@/*" -> "./src/*" alias from tsconfig.json.
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    // Everything tested so far is pure logic or a request/response handler.
    // No DOM needed yet. Add "jsdom" when component tests arrive.
    environment: "node",
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      // Only measure what we have actually decided to test. Including the
      // whole app would produce a low number that says nothing useful --
      // see TESTING.md for what is deliberately untested.
      include: ["src/lib/prompt-builder.ts", "src/app/api/**/*.ts"],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 85,
        statements: 90,
      },
    },
  },
});
