import { defineConfig } from "vitest/config";
import { resolve } from "path";
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
    coverage: { provider: "v8", reporter: ["text", "lcov"] },
  },
  resolve: {
    alias: {
      "@chainbot/shared": resolve(__dirname, "../../packages/shared/src/index.ts"),
      "@chainbot/config":  resolve(__dirname, "../../packages/config/index.ts"),
    },
  },
});
