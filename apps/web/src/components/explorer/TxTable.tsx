// FILE: src/components/explorer/TxTable.tsx
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import HashDisplay from '@/components/ui/HashDisplay'
import AddressTag from '@/components/ui/AddressTag'
import { formatCOIN, timeAgo } from '@/lib/utils'

export interface TxRow {
  hash: string
  from: string
  to: string | null
  value: bigint
  timestamp: number
  blockNumber: number
}

interface TxTableProps {
  txs?: TxRow[]
  isLoading?: boolean
  error?: Error | null
}

export default function TxTable({ txs, isLoading, error }: TxTableProps) {
  const router = useRouter()
  const [, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="formal-card overflow-hidden">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="bg-zinc-900/50 border-b border-border text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <th className="px-8 py-5 text-left">Tx Hash</th>
            <th className="px-8 py-5 text-left">From / To</th>
            <th className="px-8 py-5 text-right">Value</th>
            <th className="px-8 py-5 text-right">Age</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={4} className="p-8">
                <div className="space-y-4">
                   {[1,2,3].map(i => <div key={i} className="h-6 bg-zinc-900 rounded animate-pulse" />)}
                </div>
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={4} className="p-10 text-center text-sm text-zinc-500">
                Failed to load transactions.
              </td>
            </tr>
          )}
          {!isLoading &&
            !error &&
            (txs ?? []).map((tx) => (
              <tr
                key={tx.hash}
                onClick={() => router.push(`/explorer/tx/${tx.hash}`)}
                className="data-table-row cursor-pointer group"
              >
                <td className="px-8 py-5">
                  <HashDisplay hash={tx.hash} />
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-1.5">
                    <AddressTag address={tx.from} />
                    <span className="text-zinc-600">→</span>
                    {tx.to ? <AddressTag address={tx.to} /> : <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Contract Deploy</span>}
                  </div>
                </td>
                <td className="px-8 py-5 text-right font-bold text-white tabular-nums">
                  {formatCOIN(tx.value)} <span className="text-[10px] text-zinc-500 font-normal ml-1">CB</span>
                </td>
                <td className="px-8 py-5 text-right text-zinc-500 font-mono text-[10px] uppercase">{timeAgo(tx.timestamp)}</td>
              </tr>
            ))}
          {!isLoading && !error && (!txs || txs.length === 0) && (
            <tr>
              <td colSpan={4} className="p-10 text-center text-sm text-zinc-500">
                No data available in this context.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
