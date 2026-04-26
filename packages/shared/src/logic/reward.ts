import { DAILY_INITIAL_REWARD, DAILY_HALVING_DAYS, DAILY_MIN_REWARD, DAILY_COOLDOWN_MS } from "../constants/index";

export function shrinkingReward(daysSinceDeploy: number): bigint {
  const halvings = Math.floor(daysSinceDeploy / DAILY_HALVING_DAYS);
  let currentReward = DAILY_INITIAL_REWARD;
  
  for (let i = 0; i < halvings; i++) {
    currentReward = currentReward / 2n;
  }
  
  if (currentReward < DAILY_MIN_REWARD) {
    return DAILY_MIN_REWARD;
  }
  return currentReward;
}

export function cooldownRemaining(lastClaimMs: number, nowMs: number = Date.now()): number {
  const elapsed = nowMs - lastClaimMs;
  if (elapsed >= DAILY_COOLDOWN_MS) {
    return 0;
  }
  return DAILY_COOLDOWN_MS - elapsed;
}
