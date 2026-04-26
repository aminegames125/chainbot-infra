import { VAULT_MIN_RATIO } from "../constants/index";

export class ChainError extends Error {
  constructor(msg: string, public txHash?: string) {
    super(msg);
  }
}

export class CooldownError extends Error {
  constructor(public remainingMs: number) {
    super(`Cooldown: ${remainingMs}ms remaining`);
  }
}

export class InsufficientBalanceError extends Error {
  constructor(public required: bigint, public available: bigint) {
    super("Insufficient balance");
  }
}

export class VaultUnderCollateralizedError extends Error {
  constructor(public ratio: number) {
    super(`Ratio ${ratio} below minimum ${VAULT_MIN_RATIO}`);
  }
}

export class UnauthorizedMintError extends Error {
  constructor(public from: string) {
    super(`Unauthorized mint from ${from}`);
  }
}
