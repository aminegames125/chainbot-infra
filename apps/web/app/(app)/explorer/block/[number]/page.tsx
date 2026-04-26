// FILE: app/explorer/block/[number]/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Cpu, Zap, Database } from 'lucide-react'
import { provider } from '@/lib/rpc'
import { formatCOIN, timeAgo } from '@/lib/utils'
import { formatEther } from 'ethers'
import type { Block, TransactionResponse } from 'ethers'

export default function BlockPage() {
  const params = useParams()
  const router = useRouter()
  const number = parseInt(params.number as string, 10)

  const [block, setBlock] = useState<Block | null>(null)
  const [txs, setTxs] = useState<TransactionResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 10

  useEffect(() => {
    if (isNaN(number)) { setError('Invalid block number'); setLoading(false); return }

    setLoading(true)
    provider
      .getBlock(number, true)
      .then(async (b) => {
        if (!b) { setError('Block not found'); return }
        setBlock(b)
        const txResponses: TransactionResponse[] = []
        for (const hash of b.transactions) {
          const tx = await provider.getTransaction(hash)
          if (tx) txResponses.push(tx)
        }
        setTxs(txResponses)
      })
      .catch(() => setError('Failed to fetch block'))
      .finally(() => setLoading(false))
  }, [number])

  if (loading) return <div className="animate-pulse space-y-8"><div className="h-10 w-48 bg-zinc-900 rounded-xl"/><div className="h-96 bg-zinc-900 rounded-2xl"/></div>
  if (error || !block) return <div className="py-20 text-center text-zinc-500">{error ?? 'Block not found'}</div>

  const gasUsedPct = Number(block.gasUsed) / Number(block.gasLimit) * 100

  return (
    <div className="space-y-10">
      <div>
        <button onClick={() => router.push('/explorer')} className="mb-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Ledger
        </button>
        <h1 className="text-3xl font-bold text-white tracking-tight">Block <span className="text-zinc-500">#{block.number.toLocaleString()}</span></h1>
        <p className="text-sm text-zinc-500 mt-1 font-mono">{block.hash}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="formal-card p-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                     {[
                       { label: 'Timestamp', value: <span className="text-sm text-zinc-400">{new Date(block.timestamp * 1000).toUTCString()} ({timeAgo(block.timestamp)})</span> },
                       { label: 'Transactions', value: <span className="text-sm font-bold text-white">{block.transactions.length} txs</span> },
                       { label: 'Miner / Proposer', value: <span className="text-xs font-mono text-zinc-500 break-all">{block.miner}</span> },
                     ].map(item => (
                       <div key={item.label} className="space-y-1.5">
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.label}</p>
                          <div>{item.value}</div>
                       </div>
                     ))}
                  </div>
                  <div className="space-y-6">
                     {[
                       { label: 'Difficulty', value: <span className="text-sm font-mono text-zinc-400">{block.difficulty.toString()}</span> },
                       { label: 'Gas Limit', value: <span className="text-sm font-mono text-zinc-400">{block.gasLimit.toString()}</span> },
                       { label: 'Gas Consumption', value: (
                          <div className="space-y-2">
                             <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                                <span>{block.gasUsed.toString()}</span>
                                <span>{gasUsedPct.toFixed(2)}%</span>
                             </div>
                             <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                                <div className="h-full bg-white" style={{ width: `${gasUsedPct}%` }} />
                             </div>
                          </div>
                       )},
                     ].map(item => (
                       <div key={item.label} className="space-y-1.5">
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.label}</p>
                          <div>{item.value}</div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="formal-card overflow-hidden">
               <div className="formal-header">
                  <div className="flex items-center gap-2">
                     <Database size={16} className="text-white" />
                     <h3 className="text-xs font-bold uppercase tracking-widest">Transactions in Block</h3>
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-zinc-900/50 border-b border-border">
                           <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Hash</th>
                           <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">From</th>
                           <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Value</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border/50">
                        {txs.slice(0, 10).map((tx, i) => (
                           <tr key={i} className="data-table-row cursor-pointer group">
                              <td className="px-8 py-4 text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">{tx.hash.slice(0, 20)}...</td>
                              <td className="px-8 py-4 text-xs font-mono text-zinc-500">{tx.from.slice(0, 10)}...</td>
                              <td className="px-8 py-4 text-right text-xs font-bold text-white tabular-nums">{formatCOIN(tx.value, 4)} CB</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="formal-card p-6">
               <div className="flex items-center gap-2 mb-6">
                  <Zap size={16} className="text-white" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white">Block Economy</h3>
               </div>
               <div className="space-y-6">
                  <div className="p-4 bg-zinc-950 border border-border rounded-xl">
                     <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Base Fee</p>
                     <p className="text-lg font-bold text-white tabular-nums">{formatEther(block.baseFeePerGas ?? 0n)} <span className="text-[10px] font-normal text-zinc-500 ml-1">COIN/gas</span></p>
                  </div>
                  <div className="p-4 bg-zinc-950 border border-border rounded-xl">
                     <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Burned Fees</p>
                     <p className="text-lg font-bold text-white tabular-nums">{formatCOIN((block.baseFeePerGas ?? 0n) * block.gasUsed, 6)} <span className="text-[10px] font-normal text-zinc-500 ml-1">CB</span></p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
