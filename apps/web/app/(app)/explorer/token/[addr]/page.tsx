// FILE: app/(app)/explorer/token/[addr]/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Coins, Info, Activity } from 'lucide-react'
import AddressTag from '@/components/ui/AddressTag'
import TokenTransferTable from '@/components/explorer/TokenTransferTable'
import { provider } from '@/lib/rpc'
import { getCoinToken } from '@/lib/contracts'

interface TokenInfo {
  name: string
  symbol: string
  totalSupply: bigint
  decimals: number
}

export default function TokenPage() {
  const params = useParams()
  const router = useRouter()
  const addr = params.addr as string

  const [info, setInfo] = useState<TokenInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!addr) return
    setLoading(true)
    const token = getCoinToken(provider) as any
    Promise.all([
      token.name().catch(() => 'Unknown'),
      token.symbol().catch(() => '?'),
      token.totalSupply().catch(() => 0n),
    ])
      .then(([name, symbol, totalSupply]) => {
        setInfo({ name: name as string, symbol: symbol as string, totalSupply: totalSupply as bigint, decimals: 18 })
      })
      .catch(() => setError('Failed to fetch token data'))
      .finally(() => setLoading(false))
  }, [addr])

  return (
    <div className="space-y-10">
      <div>
        <button onClick={() => router.push('/explorer')} className="mb-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Ledger
        </button>
        <div className="flex items-center gap-4 mb-2">
           <h1 className="text-3xl font-bold text-white tracking-tight">
              {loading ? '...' : (info?.name ?? 'Token Details')}
              {info && <span className="text-zinc-500 ml-3">({info.symbol})</span>}
           </h1>
        </div>
        <AddressTag address={addr} full className="text-zinc-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Supply', value: loading ? '...' : info ? (Number(info.totalSupply) / 1e18).toLocaleString() : '—', icon: <Coins size={16}/> },
          { label: 'Decimals', value: '18', icon: <Info size={16}/> },
          { label: 'Network Class', value: 'ERC-20', icon: <Activity size={16}/> },
        ].map(({ label, value, icon }) => (
          <div key={label} className="formal-card p-6">
             <div className="flex items-center justify-between mb-4 text-zinc-500">
                <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
                {icon}
             </div>
             <p className="text-xl font-bold text-white tabular-nums">{value}</p>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-500 font-bold uppercase tracking-widest text-center">
          {error}
        </div>
      )}

      <div className="space-y-6">
         <h2 className="text-sm font-bold text-white uppercase tracking-widest">Transfer Registry</h2>
         <TokenTransferTable transfers={[]} isLoading={false} />
      </div>
    </div>
  )
}
