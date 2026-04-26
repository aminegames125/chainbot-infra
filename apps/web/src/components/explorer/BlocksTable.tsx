// FILE: src/components/explorer/BlocksTable.tsx
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useBlocks } from '@/lib/hooks/useBlocks'
import { SkeletonTable } from '@/components/ui/Skeleton'
import { formatAddress, timeAgo } from '@/lib/utils'
import type { Block } from 'ethers'

export default function BlocksTable() {
  const router = useRouter()
  const { data: blocks, isLoading, error } = useBlocks()
  const [, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const displayBlocks = (blocks ?? []).filter((b): b is Block => b !== null)

  return (
    <div className="formal-card overflow-hidden">
      <table className="w-full min-w-[540px] text-sm">
        <thead>
          <tr className="bg-zinc-900/50 border-b border-border text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <th className="px-8 py-5 text-left">Block #</th>
            <th className="px-8 py-5 text-left">Miner</th>
            <th className="px-8 py-5 text-left">Gas Used</th>
            <th className="px-8 py-5 text-left text-right">Txns</th>
            <th className="px-8 py-5 text-right">Age</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={5} className="p-8">
                <div className="space-y-4">
                   {[1,2,3,4,5].map(i => <div key={i} className="h-6 bg-zinc-900 rounded animate-pulse" />)}
                </div>
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={5} className="p-10 text-center text-sm text-zinc-500">
                Connection to RPC node failed.
              </td>
            </tr>
          )}
          {!isLoading &&
            !error &&
            displayBlocks.map((block) => (
              <tr
                key={block.number}
                onClick={() => router.push(`/explorer/block/${block.number}`)}
                className="data-table-row cursor-pointer group"
              >
                <td className="px-8 py-5">
                   <span className="font-bold text-white group-hover:underline">#{block.number.toLocaleString()}</span>
                </td>
                <td className="px-8 py-5">
                   <span className="font-mono text-zinc-400">{block.miner ? formatAddress(block.miner) : '—'}</span>
                </td>
                <td className="px-8 py-5 font-mono text-zinc-500">{block.gasUsed.toString()}</td>
                <td className="px-8 py-5 text-right font-bold text-white">{block.transactions.length}</td>
                <td className="px-8 py-5 text-right text-zinc-500 uppercase text-[10px] font-mono">{timeAgo(block.timestamp)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
