// FILE: src/components/ui/StatCard.tsx
'use client'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  delta?: string
  deltaPositive?: boolean
  icon?: React.ReactNode
  loading?: boolean
  delay?: number
}

export default function StatCard({
  label,
  value,
  delta,
  deltaPositive,
  icon,
  loading = false,
}: StatCardProps) {

  if (loading) {
    return (
      <div className="formal-card p-6 animate-pulse">
        <div className="h-3 w-24 bg-zinc-900 rounded mb-4" />
        <div className="h-8 w-36 bg-zinc-900 rounded" />
      </div>
    )
  }

  return (
    <div className="formal-card p-6">
      <div className="flex items-start justify-between mb-4">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          {label}
        </span>
        {icon && <span className="text-white">{icon}</span>}
      </div>
      <div className="flex items-end gap-3">
        <span className="text-2xl font-bold text-white tabular-nums">
          {value}
        </span>
        {delta && (
          <span
            className={cn(
              'text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg border',
              deltaPositive
                ? 'bg-zinc-900 border-white/20 text-white'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
            )}
          >
            {deltaPositive ? '+' : '-'} {delta}
          </span>
        )}
      </div>
    </div>
  )
}
