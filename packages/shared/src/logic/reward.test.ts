import { describe, it, expect } from "vitest";
import { shrinkingReward, cooldownRemaining } from "./reward";
import { DAILY_INITIAL_REWARD, DAILY_MIN_REWARD, DAILY_COOLDOWN_MS } from "../constants/index";

describe("reward logic", () => {
  it("shrinkingReward", () => {
    expect(shrinkingReward(0)).toBe(DAILY_INITIAL_REWARD);
    expect(shrinkingReward(30)).toBe(DAILY_INITIAL_REWARD / 2n);
    expect(shrinkingReward(60)).toBe(DAILY_INITIAL_REWARD / 4n);
    expect(shrinkingReward(99999) >= DAILY_MIN_REWARD).toBe(true);
    expect(shrinkingReward(99999)).toBe(DAILY_MIN_REWARD);
  });

  it("cooldownRemaining", () => {
    const now = Date.now();
    const twentyThreeHoursMs = 23 * 60 * 60 * 1000;
    const twentyFiveHoursMs = 25 * 60 * 60 * 1000;
    
    expect(cooldownRemaining(now - twentyThreeHoursMs, now)).toBeGreaterThan(0);
    expect(cooldownRemaining(now - twentyFiveHoursMs, now)).toBe(0);
  });
});
