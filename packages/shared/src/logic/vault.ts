import { VAULT_LIQUIDATION_RATIO, VAULT_STABILITY_FEE } from "../constants/index";

export function collateralRatio(collateral: bigint, debt: bigint, price: bigint): number {
  if (debt === 0n) return Infinity;
  // collateral is 18 decimals, price is 18 decimals, debt is 18 decimals
  // formula: (collateral * price) / (debt * 1e18)
  const collateralValue = (collateral * price) / 1000000000000000000n;
  
  // convert to number for easy ratio comparison (e.g. 1.75)
  // this loses precision but is fine for ratio check
  return Number(collateralValue) / Number(debt);
}

export function isLiquidatable(ratio: number): boolean {
  // Add small epsilon for floating point issues when ratio is exactly VAULT_LIQUIDATION_RATIO
  return ratio <= VAULT_LIQUIDATION_RATIO + 0.000001;
}

export function liquidationPrice(collateral: bigint, debt: bigint): bigint {
  if (collateral === 0n) return 0n;
  // price = (debt * VAULT_LIQUIDATION_RATIO * 1e18) / collateral
  // we do integer math. VAULT_LIQUIDATION_RATIO is 1.1, so we multiply by 110 and divide by 100
  return (debt * 110n * 1000000000000000000n) / (collateral * 100n);
}

export function stabilityFeeAccrued(principal: bigint, openedAtMs: number, nowMs: number = Date.now()): bigint {
  const elapsedMs = nowMs - openedAtMs;
  if (elapsedMs <= 0) return 0n;
  
  const msPerYear = 365 * 24 * 60 * 60 * 1000;
  
  // VAULT_STABILITY_FEE is 0.02 (2%)
  // fee = principal * 0.02 * (elapsedMs / msPerYear)
  const feeBigInt = (principal * 2n * BigInt(elapsedMs)) / (100n * BigInt(msPerYear));
  return feeBigInt;
}
