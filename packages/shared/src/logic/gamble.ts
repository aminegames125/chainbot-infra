import { GAMBLE_BURN_ADDRESS } from "../constants/index";

export function resolveGamble(randomSeed: number): "win" | "lose" {
  // Simple deterministic pseudo-random logic
  // e.g. using the seed to generate a float between 0 and 1
  const x = Math.sin(randomSeed) * 10000;
  const result = x - Math.floor(x);
  return result < 0.5 ? "win" : "lose";
}

export function gambleBurnAddress(): string {
  return GAMBLE_BURN_ADDRESS;
}
