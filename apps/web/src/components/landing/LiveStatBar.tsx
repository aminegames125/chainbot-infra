// FILE: components/landing/LiveStatBar.tsx
'use client'
import { useChainStats } from '@/lib/hooks/useChainStats'
import { useCoinPrice } from '@/lib/hooks/useCoinPrice'
import LiveBadge from '@/components/ui/LiveBadge'
import { SkeletonText } from '@/components/ui/Skeleton'
import { formatUSD, formatNumber } from '@/lib/utils'

export default function LiveStatBar() {
  const { data: stats, isLoading: statsLoading } = useChainStats()
  const { data: price, isLoading: priceLoading } = useCoinPrice()

  const stats_items = [
    {
      label: 'Block Height',
      value: statsLoading ? null : `#${stats?.blockHeight?.toLocaleString() ?? '—'}`,
      accent: 'text-accent-purple',
    },
    {
      label: 'COIN Price',
      value: priceLoading ? null : formatUSD(price?.price ?? 0),
      accent: 'text-accent-cyan',
    },
    {
      label: 'Network Hashrate',
      value: statsLoading
        ? null
        : `${formatNumber(Number(stats?.hashrate ?? 0))} H/s`,
      accent: 'text-accent-amber',
    },
    {
      label: '24h Volume',
      value: priceLoading ? null : formatUSD(price?.volume24h ?? 0),
      accent: 'text-accent-glow',
    },
  ]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-bg-surface/60 px-6 py-5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="absolute right-4 top-4">
        <LiveBadge />
      </div>
      <div className="grid grid-cols-2 gap-y-5 gap-x-8 sm:grid-cols-4">
        {stats_items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
              {item.label}
            </span>
            {item.value === null ? (
              <SkeletonText className="h-7 w-28" />
            ) : (
              <span
                className={`font-mono text-xl font-bold ${item.accent}`}
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                {item.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
