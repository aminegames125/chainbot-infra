// FILE: components/ui/Skeleton.tsx
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function SkeletonText({ className }: SkeletonProps) {
  return <div className={cn('shimmer h-4 rounded-md', className)} />
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/5 bg-bg-surface/60 p-5 backdrop-blur-2xl',
        className
      )}
    >
      <SkeletonText className="mb-3 w-24" />
      <SkeletonText className="h-8 w-36" />
    </div>
  )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-xl bg-white/[0.02] px-4 py-3">
          <SkeletonText className="h-4 w-16" />
          <SkeletonText className="h-4 w-32 flex-1" />
          <SkeletonText className="h-4 w-20" />
          <SkeletonText className="h-4 w-16" />
        </div>
      ))}
    </div>
  )
}
