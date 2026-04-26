import { describe, it, expect } from "vitest";
import { resolveGamble, gambleBurnAddress } from "./gamble";
import { GAMBLE_BURN_ADDRESS } from "../constants/index";

describe("gamble logic", () => {
  it("resolveGamble never throws and returns win or lose", () => {
    const result = resolveGamble(0);
    expect(["win", "lose"].includes(result)).toBe(true);
  });

  it("resolveGamble is deterministic", () => {
    const seed = 12345;
    expect(resolveGamble(seed)).toBe(resolveGamble(seed));
  });

  it("win rate between 40% and 60% over 1000 iterations", () => {
    let wins = 0;
    for (let i = 0; i < 1000; i++) {
      if (resolveGamble(i) === "win") {
        wins++;
      }
    }
    const winRate = wins / 1000;
    expect(winRate).toBeGreaterThan(0.4);
    expect(winRate).toBeLessThan(0.6);
  });

  it("gambleBurnAddress", () => {
    expect(gambleBurnAddress()).toBe(GAMBLE_BURN_ADDRESS);
  });
});
