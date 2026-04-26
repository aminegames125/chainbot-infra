// FILE: lib/utils.ts
import { formatEther } from 'ethers'
export { formatAddress, formatCOIN, formatUSD } from '@chainbot/shared'


export function timeAgo(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000)
  const diff = now - timestamp
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export function formatHash(hash: string, chars = 8): string {
  if (!hash || hash.length < chars * 2 + 2) return hash
  return hash.slice(0, chars + 2) + '…' + hash.slice(-chars)
}

export function formatBigNumber(n: bigint, decimals: number): number {
  return Number(n) / 10 ** decimals
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + 'B'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(2) + 'K'
  return n.toFixed(2)
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
