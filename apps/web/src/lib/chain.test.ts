import { describe, it, expect, vi } from "vitest";

function shrinkingDailyReward(days: number) {
  let val = 100 * Math.pow(0.5, days / 30);
  if (val < 1) val = 1;
  return val;
}

function formatBlockAge(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  return `${Math.floor(minutes / 60)}h`;
}

vi.mock("ethers", () => ({
  JsonRpcProvider: vi.fn(() => ({
    getBlockNumber: vi.fn().mockResolvedValue(12345),
  })),
}));

describe("chain tests", () => {
  it("shrinkingDailyReward(0) === 100 (COIN, as number)", () => {
    expect(shrinkingDailyReward(0)).toBe(100);
  });

  it("shrinkingDailyReward(30) === 50", () => {
    expect(shrinkingDailyReward(30)).toBe(50);
  });

  it("shrinkingDailyReward(1000) >= 1 (never below minimum)", () => {
    expect(shrinkingDailyReward(1000)).toBeGreaterThanOrEqual(1);
  });

  it('formatBlockAge(12) returns "12s"', () => {
    expect(formatBlockAge(12)).toBe("12s");
  });

  it('formatBlockAge(3600) returns "1h"', () => {
    expect(formatBlockAge(3600)).toBe("1h");
  });
});
