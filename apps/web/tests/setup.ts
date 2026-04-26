import { vi } from "vitest";

// Mock global window object for browser API checks
Object.defineProperty(window, "ethereum", {
  value: {
    request: vi.fn(),
    on: vi.fn(),
    removeListener: vi.fn(),
  },
});
