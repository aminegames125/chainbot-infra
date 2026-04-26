// FILE: components/landing/BlockExplorerDemo.tsx
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useBlocks } from '@/lib/hooks/useBlocks'
import LiveBadge from '@/components/ui/LiveBadge'
import { SkeletonTable } from '@/components/ui/Skeleton'
import { formatAddress, timeAgo } from '@/lib/utils'
import type { Block } from 'ethers'

export default function BlockExplorerDemo() {
  const router = useRouter()
  const { data: blocks, isLoading, error } = useBlocks()
  const [, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const displayBlocks = (blocks ?? []).filter((b): b is Block => b !== null).slice(0, 5)

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-heading text-2xl font-bold text-text-primary"
          >
            Live Blockchain
          </motion.h2>
          <LiveBadge />
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/5 bg-bg-surface/60 backdrop-blur-2xl">
          {/* Table header */}
          <div className="grid grid-cols-4 border-b border-white/[0.06] px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
            <span>Block #</span>
            <span>Miner</span>
            <span>Txns</span>
            <span>Age</span>
          </div>

          {isLoading && <div className="p-5"><SkeletonTable rows={5} /></div>}
          {error && (
            <div className="flex items-center justify-center p-10 text-sm text-text-secondary">
              Failed to connect to RPC — check your network.
            </div>
          )}
          {!isLoading && !error && displayBlocks.length === 0 && (
            <div className="flex items-center justify-center p-10 text-sm text-text-secondary">
              No blocks found.
            </div>
          )}

          {!isLoading &&
            !error &&
            displayBlocks.map((block, idx) => (
              <motion.div
                key={block.number}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => router.push(`/explorer/block/${block.number}`)}
                className="grid cursor-pointer grid-cols-4 items-center border-b border-white/[0.04] px-5 py-3.5 text-sm transition-colors last:border-0 hover:bg-white/[0.03]"
              >
                <span
                  className="font-mono font-semibold text-accent-purple"
                  style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                >
                  #{block.number.toLocaleString()}
                </span>
                <span
                  className="font-mono text-text-secondary"
                  style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                >
                  {block.miner ? formatAddress(block.miner) : '—'}
                </span>
                <span className="text-text-primary">{block.transactions.length}</span>
                <span className="text-text-muted">{timeAgo(block.timestamp)}</span>
              </motion.div>
            ))}
        </div>

        <div className="mt-4 text-center">
          <a
            href="/explorer"
            className="text-sm font-medium text-accent-purple transition-colors hover:text-accent-glow"
          >
            View full explorer →
          </a>
        </div>
      </div>
    </section>
  )
}
