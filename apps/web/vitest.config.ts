import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx", "tests/**/*.test.ts"],
    setupFiles: ["./tests/setup.ts"],
    coverage: { provider: "v8", reporter: ["text", "lcov"] },
  },
  resolve: {
    alias: {
      "@chainbot/shared": resolve(__dirname, "../../packages/shared/src/index.ts"),
      "@chainbot/config":  resolve(__dirname, "../../packages/config/index.ts"),
      "@/":                resolve(__dirname, "./src/"),
    },
  },
});
