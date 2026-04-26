// FILE: app/explorer/tx/[hash]/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, XCircle, Flame, Clock } from 'lucide-react'
import { provider } from '@/lib/rpc'
import { formatCOIN, timeAgo } from '@/lib/utils'
import { CONTRACT_ADDRESSES } from '@chainbot/config'
import type { TransactionResponse, TransactionReceipt, Block } from 'ethers'

const CONTRACT_NAMES = Object.fromEntries(
  Object.entries(CONTRACT_ADDRESSES).map(([name, addr]) => [addr.toLowerCase(), name])
)

export default function TxPage() {
  const params = useParams()
  const router = useRouter()
  const hash = params.hash as string

  const [tx, setTx] = useState<TransactionResponse | null>(null)
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null)
  const [block, setBlock] = useState<Block | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!hash) return
    setLoading(true)
    Promise.all([provider.getTransaction(hash), provider.getTransactionReceipt(hash)])
      .then(async ([txData, rcpt]) => {
        if (!txData) { setError('Transaction not found'); return }
        setTx(txData)
        setReceipt(rcpt)
        if (txData.blockNumber) {
          const b = await provider.getBlock(txData.blockNumber)
          setBlock(b)
        }
      })
      .catch(() => setError('Failed to fetch transaction'))
      .finally(() => setLoading(false))
  }, [hash])

  if (loading) return (
    <div className="space-y-6">
       <div className="h-10 w-48 bg-zinc-900 rounded-xl animate-pulse" />
       <div className="h-96 w-full bg-zinc-900 rounded-2xl animate-pulse" />
    </div>
  )

  if (error || !tx) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-zinc-500">{error ?? 'Transaction not found'}</p>
    </div>
  )

  const success = receipt?.status === 1
  const toName = tx.to ? CONTRACT_NAMES[tx.to.toLowerCase()] : undefined
  const gasUsedPct = receipt ? Number(receipt.gasUsed) / Number(tx.gasLimit) * 100 : 0

  return (
    <div className="space-y-10">
      <div>
        <button onClick={() => router.push('/explorer')} className="mb-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Explorer
        </button>
        <h1 className="text-3xl font-bold text-white tracking-tight">Transaction Details</h1>
        <p className="text-sm text-zinc-500 mt-1 font-mono">{tx.hash}</p>
      </div>

      <div className="formal-card p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-6">
              {[
                { label: 'Status', value: (
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-widest w-fit ${success ? 'bg-zinc-900 border-white/20 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
                    {success ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    {success ? 'Confirmed' : 'Failed'}
                  </div>
                )},
                { label: 'Block', value: <span className="text-sm font-bold text-white">#{tx.blockNumber}</span> },
                { label: 'Timestamp', value: <span className="text-sm text-zinc-400">{block ? `${new Date(block.timestamp * 1000).toUTCString()} (${timeAgo(block.timestamp)})` : '—'}</span> },
                { label: 'Value', value: <span className="text-xl font-bold text-white tabular-nums">{formatCOIN(tx.value, 6)} <span className="text-xs text-zinc-500 font-normal ml-1">CB</span></span> },
              ].map((item) => (
                <div key={item.label} className="space-y-1.5">
                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.label}</p>
                   <div>{item.value}</div>
                </div>
              ))}
           </div>

           <div className="space-y-6">
              {[
                { label: 'From', value: <span className="text-sm font-mono text-zinc-400 break-all">{tx.from}</span> },
                { label: 'To', value: <span className="text-sm font-mono text-zinc-400 break-all">{tx.to ?? 'Contract Deployment'}</span> },
                { label: 'Gas Limit', value: <span className="text-sm font-mono text-zinc-400">{tx.gasLimit.toString()}</span> },
                { label: 'Gas Used', value: (
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                        <span>{receipt?.gasUsed.toString() ?? '—'}</span>
                        <span>{gasUsedPct.toFixed(2)}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-white" style={{ width: `${gasUsedPct}%` }} />
                     </div>
                  </div>
                )},
              ].map((item) => (
                <div key={item.label} className="space-y-1.5">
                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.label}</p>
                   <div>{item.value}</div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {receipt && receipt.logs.length > 0 && (
        <div className="formal-card">
           <div className="formal-header">
              <div className="flex items-center gap-2">
                 <Terminal size={16} className="text-white" />
                 <h3 className="text-xs font-bold uppercase tracking-widest">Event Logs ({receipt.logs.length})</h3>
              </div>
           </div>
           <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
              {receipt.logs.map((log, i) => (
                <div key={i} className="p-4 bg-zinc-950 border border-border rounded-xl space-y-2 font-mono text-[10px]">
                   <div className="flex justify-between border-b border-border/20 pb-2 mb-2">
                      <span className="text-zinc-600">INDEX_{i}</span>
                      <span className="text-zinc-400">{log.address}</span>
                   </div>
                   <div className="text-zinc-500">Topics:</div>
                   <div className="space-y-1 pl-4 border-l border-border/20">
                      {log.topics.map((t, ti) => (
                        <div key={ti} className="text-zinc-400 break-all">[{ti}] {t}</div>
                      ))}
                   </div>
                   <div className="text-zinc-500 mt-2">Data:</div>
                   <div className="pl-4 border-l border-border/20 text-zinc-400 break-all">{log.data}</div>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  )
}
