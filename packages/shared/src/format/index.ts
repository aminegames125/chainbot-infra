import { TokenInfo, VaultStatus, MintEvent } from "../types/index";
import { formatCOIN, formatUSD, formatAddress } from "../logic/token";

export function formatTokenRow(token: TokenInfo): string {
  return `${token.symbol} | ${formatUSD(token.price)} | MC: ${formatUSD(token.marketCap)} | Holders: ${token.holders}`;
}

export function formatVaultStatus(vault: VaultStatus): string {
  const collateralStr = formatCOIN(vault.collateral);
  const debtStr = formatCOIN(vault.debt);
  const ratioPct = Math.round(vault.ratio * 100);
  const liqPrice = formatUSD(Number(formatCOIN(vault.liquidationPrice)));
  return `Collateral: ${collateralStr} COIN | Debt: ${debtStr} ${vault.stablecoin} | Ratio: ${ratioPct}% | Liq. at ${liqPrice}`;
}

export function formatMintEvent(event: MintEvent): string {
  const amountStr = formatCOIN(event.amount, 0); // Assuming we just want whole number or default
  const recipientStr = formatAddress(event.recipient);
  if (event.authorized) {
    return `✓ DailyClaim — ${recipientStr} received ${amountStr} COIN`;
  } else {
    return `⚠ UNAUTHORIZED MINT — ${recipientStr} minted ${amountStr} COIN`;
  }
}

export function pluralize(n: number, singular: string, plural?: string): string {
  if (n === 1) return `1 ${singular}`;
  return `${n} ${plural ?? singular + "s"}`;
}
