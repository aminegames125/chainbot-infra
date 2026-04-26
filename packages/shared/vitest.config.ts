import { defineConfig } from "vitest/config";
import { resolve } from "path";
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts"],
    coverage: { provider: "v8", reporter: ["text", "lcov"] },
  },
  resolve: {
    alias: {
      "@chainbot/config": resolve(__dirname, "../config/index.ts"),
    },
  },
});
