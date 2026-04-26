import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      name: "shared",
      root: "./packages/shared",
      include: ["src/**/*.test.ts"],
      environment: "node",
      globals: true,
      alias: {
        "@chainbot/config": new URL("./packages/config/index.ts", import.meta.url).pathname,
      },
    },
  },
  {
    test: {
      name: "bot",
      root: "./apps/bot",
      include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
      environment: "node",
      globals: true,
      alias: {
        "@chainbot/shared": new URL("./packages/shared/src/index.ts", import.meta.url).pathname,
        "@chainbot/config": new URL("./packages/config/index.ts", import.meta.url).pathname,
      },
    },
  },
  {
    test: {
      name: "web",
      root: "./apps/web",
      include: ["src/**/*.test.ts", "src/**/*.test.tsx", "tests/**/*.test.ts"],
      environment: "happy-dom",
      globals: true,
      setupFiles: ["./tests/setup.ts"],
      alias: {
        "@chainbot/shared": new URL("./packages/shared/src/index.ts", import.meta.url).pathname,
        "@chainbot/config": new URL("./packages/config/index.ts", import.meta.url).pathname,
        "@/": new URL("./apps/web/src/", import.meta.url).pathname,
      },
    },
  },
]);
