import { describe, it, expect } from "vitest";
import { formatAddress, formatCOIN, formatUSD, formatBlockAge, isMintEventAuthorized } from "./token";

describe("token logic", () => {
  it("formatAddress", () => {
    expect(formatAddress("0x1234567890abcdef1234567890abcdef12345678")).toBe("0x1234...5678");
    expect(formatAddress("0x12")).toBe("0x12"); // too short
  });

  it("formatCOIN", () => {
    expect(formatCOIN(1_000_000_000_000_000_000n)).toBe("1.00");
    expect(formatCOIN(0n)).toBe("0.00");
    expect(formatCOIN(500_000_000_000_000_000n)).toBe("0.50");
  });

  it("formatUSD", () => {
    expect(formatUSD(1234.5)).toBe("$1,234.50");
  });

  it("formatBlockAge", () => {
    expect(formatBlockAge(5)).toBe("5s ago");
    expect(formatBlockAge(90)).toBe("1m ago");
    expect(formatBlockAge(3700)).toBe("1h ago");
    expect(formatBlockAge(86500)).toBe("1d ago");
  });

  it("isMintEventAuthorized", () => {
    expect(isMintEventAuthorized("0xABC", "0xABC")).toBe(true);
    expect(isMintEventAuthorized("0xDEF", "0xABC")).toBe(false);
  });
});
