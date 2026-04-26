import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { loadBotEnv, loadWebEnv } from "./index";

describe("Env Validation", () => {
  beforeEach(() => {
    vi.stubEnv("RPC_URL", "http://localhost:8545");
    vi.stubEnv("DISCORD_TOKEN", "fake_token");
    vi.stubEnv("DISCORD_CLIENT_ID", "fake_client_id");
    vi.stubEnv("TREASURY_ADDRESS", "0x1111111111111111111111111111111111111111");
    vi.stubEnv("TREASURY_KEY", "0x2222222222222222222222222222222222222222222222222222222222222222");
    vi.stubEnv("DATABASE_URL", "postgres://user:pass@localhost:5432/db");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("loadBotEnv() succeeds when all required fields present", () => {
    const env = loadBotEnv();
    expect(env.DISCORD_TOKEN).toBe("fake_token");
    expect(env.CHAIN_ID).toBe(13371);
  });

  it("loadBotEnv() calls process.exit(1) when DISCORD_TOKEN missing", () => {
    vi.stubEnv("DISCORD_TOKEN", "");
    const exitSpy = vi.spyOn(process, "exit").mockImplementation((() => {}) as any);
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    loadBotEnv();

    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it("loadBotEnv() calls process.exit(1) if TREASURY_ADDRESS is not a valid 0x address", () => {
    vi.stubEnv("TREASURY_ADDRESS", "invalid_address");
    const exitSpy = vi.spyOn(process, "exit").mockImplementation((() => {}) as any);
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    loadBotEnv();

    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it("loadWebEnv() returns defaults when optional fields absent", () => {
    vi.unstubAllEnvs();
    const env = loadWebEnv();
    expect(env.CHAIN_ID).toBe(13371);
    expect(env.RPC_URL).toBeUndefined();
  });
});
