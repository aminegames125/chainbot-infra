// FILE: app/(app)/explorer/address/[addr]/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, User, Database, Coins, Layers } from 'lucide-react'
import AddressTag from '@/components/ui/AddressTag'
import { provider } from '@/lib/rpc'
import { getCoinToken } from '@/lib/contracts'
import { formatCOIN } from '@/lib/utils'
import { CONTRACT_ADDRESSES } from '@chainbot/config'

const CONTRACT_NAMES = Object.fromEntries(
  Object.entries(CONTRACT_ADDRESSES).map(([name, addr]) => [addr.toLowerCase(), name])
)

const tabs = ['Overview', 'Transactions', 'Tokens'] as const
type Tab = typeof tabs[number]

export default function AddressPage() {
  const params = useParams()
  const router = useRouter()
  const addr = params.addr as string

  const [activeTab, setActiveTab] = useState<Tab>('Overview')
  const [balance, setBalance] = useState<bigint | null>(null)
  const [coinBalance, setCoinBalance] = useState<bigint | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const contractName = CONTRACT_NAMES[addr?.toLowerCase()]

  useEffect(() => {
    if (!addr) return
    setLoading(true)
    Promise.all([
      provider.getBalance(addr),
      (getCoinToken(provider) as any).balanceOf(addr).catch(() => 0n),
    ])
      .then(([bal, coin]) => {
        setBalance(bal as bigint)
        setCoinBalance(coin as bigint)
      })
      .catch(() => setError('Failed to fetch address data'))
      .finally(() => setLoading(false))
  }, [addr])

  if (!addr) return null

  return (
    <div className="space-y-10">
      <div>
        <button onClick={() => router.push('/explorer')} className="mb-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Ledger
        </button>
        <div className="flex items-center gap-4 mb-2">
           <h1 className="text-3xl font-bold text-white tracking-tight">Identity Details</h1>
           {contractName && <span className="px-3 py-1 bg-white text-black text-[10px] font-bold rounded-lg uppercase tracking-widest">{contractName}</span>}
        </div>
        <AddressTag address={addr} full className="text-zinc-500" />
      </div>

      <div className="flex gap-2 p-1 bg-zinc-900/50 border border-border rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === tab
                ? 'bg-white text-black'
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="formal-card p-8">
              <div className="flex items-center gap-2 mb-6 text-zinc-500">
                 <User size={16} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Native Balance</span>
              </div>
              <div className="space-y-1">
                 <p className="text-3xl font-bold text-white tabular-nums">
                    {loading ? '...' : formatCOIN(balance ?? 0n, 4)} <span className="text-sm font-normal text-zinc-500 ml-1">CB</span>
                 </p>
                 <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Sovereign Layer 1 Asset</p>
              </div>
           </div>

           <div className="formal-card p-8">
              <div className="flex items-center gap-2 mb-6 text-zinc-500">
                 <Coins size={16} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Token Inventory</span>
              </div>
              <div className="space-y-1">
                 <p className="text-3xl font-bold text-white tabular-nums">
                    {loading ? '...' : formatCOIN(coinBalance ?? 0n, 4)} <span className="text-sm font-normal text-zinc-500 ml-1">TKN</span>
                 </p>
                 <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Mapped ERC-20 Balances</p>
              </div>
           </div>
        </div>
      )}

      {activeTab !== 'Overview' && (
        <div className="formal-card p-12 flex flex-col items-center justify-center text-center">
           <Database size={48} className="text-zinc-800 mb-4" />
           <p className="text-sm font-bold text-white uppercase tracking-widest">Indexer Required</p>
           <p className="text-xs text-zinc-500 mt-2 max-w-xs">Historical data for this identity requires an active consensus indexer. Connect an external node to proceed.</p>
        </div>
      )}
    </div>
  )
}
