import { describe, it, expect } from "vitest";
import { ChainError, CooldownError, InsufficientBalanceError, VaultUnderCollateralizedError, UnauthorizedMintError } from "./index";

describe("errors", () => {
  it("ChainError", () => {
    const err = new ChainError("Test", "0x123");
    expect(err instanceof Error).toBe(true);
    expect(err.txHash).toBe("0x123");
    expect(err.message).toBe("Test");
  });

  it("CooldownError", () => {
    const err = new CooldownError(5000);
    expect(err instanceof Error).toBe(true);
    expect(err.remainingMs).toBe(5000);
    expect(err.message).toBe("Cooldown: 5000ms remaining");
  });

  it("InsufficientBalanceError", () => {
    const err = new InsufficientBalanceError(100n, 50n);
    expect(err instanceof Error).toBe(true);
    expect(err.required).toBe(100n);
    expect(err.available).toBe(50n);
  });

  it("VaultUnderCollateralizedError", () => {
    const err = new VaultUnderCollateralizedError(1.2);
    expect(err instanceof Error).toBe(true);
    expect(err.ratio).toBe(1.2);
  });

  it("UnauthorizedMintError", () => {
    const err = new UnauthorizedMintError("0xDEF");
    expect(err instanceof Error).toBe(true);
    expect(err.from).toBe("0xDEF");
  });
});
