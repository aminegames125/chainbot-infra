// FILE: src/components/explorer/TokenTransferTable.tsx
'use client'
import HashDisplay from '@/components/ui/HashDisplay'
import AddressTag from '@/components/ui/AddressTag'
import { timeAgo } from '@/lib/utils'

export interface TokenTransfer {
  txHash: string
  from: string
  to: string
  amount: bigint
  decimals: number
  symbol: string
  timestamp: number
}

interface TokenTransferTableProps {
  transfers?: TokenTransfer[]
  isLoading?: boolean
  error?: Error | null
}

export default function TokenTransferTable({
  transfers,
  isLoading,
  error,
}: TokenTransferTableProps) {
  return (
    <div className="formal-card overflow-hidden">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="bg-zinc-900/50 border-b border-border text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <th className="px-8 py-5 text-left">Tx Hash</th>
            <th className="px-8 py-5 text-left">From / To</th>
            <th className="px-8 py-5 text-right">Amount</th>
            <th className="px-8 py-5 text-right">Age</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={4} className="p-8">
                <div className="space-y-4">
                   {[1,2].map(i => <div key={i} className="h-6 bg-zinc-900 rounded animate-pulse" />)}
                </div>
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={4} className="p-10 text-center text-sm text-zinc-500">
                Failed to load transfer logs.
              </td>
            </tr>
          )}
          {!isLoading &&
            !error &&
            (transfers ?? []).map((t) => (
              <tr
                key={t.txHash}
                className="data-table-row group"
              >
                <td className="px-8 py-5">
                  <HashDisplay hash={t.txHash} />
                </td>
                <td className="px-8 py-5">
                   <div className="flex items-center gap-1.5">
                      <AddressTag address={t.from} />
                      <span className="text-zinc-600">→</span>
                      <AddressTag address={t.to} />
                   </div>
                </td>
                <td className="px-8 py-5 text-right font-bold text-white tabular-nums">
                  {(Number(t.amount) / 10 ** t.decimals).toLocaleString()} <span className="text-[10px] text-zinc-500 font-normal ml-1">{t.symbol}</span>
                </td>
                <td className="px-8 py-5 text-right text-zinc-500 font-mono text-[10px] uppercase">{timeAgo(t.timestamp)}</td>
              </tr>
            ))}
          {!isLoading && !error && (!transfers || transfers.length === 0) && (
            <tr>
              <td colSpan={4} className="p-10 text-center text-sm text-zinc-500">
                No transfer activity detected.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
