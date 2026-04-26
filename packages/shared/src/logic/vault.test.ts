import { describe, it, expect } from "vitest";
import { collateralRatio, isLiquidatable, liquidationPrice, stabilityFeeAccrued } from "./vault";
import { VAULT_LIQUIDATION_RATIO } from "../constants/index";

describe("vault logic", () => {
  it("collateralRatio", () => {
    expect(collateralRatio(1000n * 10n**18n, 500n * 10n**18n, 10n**18n)).toBe(2.0);
    expect(collateralRatio(150n * 10n**18n, 100n * 10n**18n, 10n**18n)).toBe(1.5);
  });

  it("isLiquidatable", () => {
    expect(isLiquidatable(1.05)).toBe(true);
    expect(isLiquidatable(1.15)).toBe(false);
    expect(isLiquidatable(1.1)).toBe(true);
  });

  it("stabilityFeeAccrued", () => {
    const openedAt = Date.now();
    const oneYearLater = openedAt + 365 * 24 * 60 * 60 * 1000;
    
    // 2% of 100 = 2
    const fee = stabilityFeeAccrued(100n * 10n**18n, openedAt, oneYearLater);
    const expected = 2n * 10n**18n;
    
    // Check if within 1% of expected
    const diff = fee > expected ? fee - expected : expected - fee;
    expect(diff <= expected / 100n).toBe(true);
  });

  it("liquidationPrice", () => {
    const collateral = 100n * 10n**18n;
    const debt = 50n * 10n**18n;
    
    const price = liquidationPrice(collateral, debt);
    const ratio = collateralRatio(collateral, debt, price);
    
    expect(Math.abs(ratio - VAULT_LIQUIDATION_RATIO)).toBeLessThan(0.01);
  });
});
