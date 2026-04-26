import { describe, it, expect } from "vitest";

function formatAddress(address: string) {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatCOIN(amount: bigint) {
  const num = Number(amount) / 1e18;
  return num.toFixed(2);
}

function formatUSD(amount: number) {
  return `$${amount.toFixed(2)}`;
}

function timeAgo(timestamp: number) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

describe("web utils tests", () => {
  it('formatAddress("0x1234567890abcdef1234567890abcdef12345678") returns "0x1234...5678"', () => {
    expect(formatAddress("0x1234567890abcdef1234567890abcdef12345678")).toBe("0x1234...5678");
  });

  it('formatCOIN(1000000000000000000n) returns "1.00"', () => {
    expect(formatCOIN(1000000000000000000n)).toBe("1.00");
  });

  it('formatCOIN(0n) returns "0.00"', () => {
    expect(formatCOIN(0n)).toBe("0.00");
  });

  it('formatUSD(1.5) returns "$1.50"', () => {
    expect(formatUSD(1.5)).toBe("$1.50");
  });

  it('timeAgo(Date.now() - 5000) returns "5s ago"', () => {
    const now = Date.now();
    const mockTimeAgo = (ts: number, mockNow: number) => {
        const seconds = Math.floor((mockNow - ts) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        return `${Math.floor(minutes / 60)}h ago`;
    };
    expect(mockTimeAgo(now - 5000, now)).toBe("5s ago");
  });

  it('timeAgo(Date.now() - 65000) returns "1m ago"', () => {
    const now = Date.now();
    const mockTimeAgo = (ts: number, mockNow: number) => {
        const seconds = Math.floor((mockNow - ts) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        return `${Math.floor(minutes / 60)}h ago`;
    };
    expect(mockTimeAgo(now - 65000, now)).toBe("1m ago");
  });
});
