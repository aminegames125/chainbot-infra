// FILE: app/(app)/swaps/page.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowDown, 
  Settings2, 
  RefreshCw, 
  TrendingUp, 
  ArrowLeftRight,
  ChevronDown,
  Info
} from 'lucide-react'

export default function SwapsPage() {
  const [fromAmount, setFromAmount] = useState('0')
  const [toAmount, setToAmount] = useState('0')
  const [isSwapping, setIsSwapping] = useState(false)

  const tokens = [
    { symbol: 'CB', name: 'ChainBot Native', balance: '1,264.82' },
    { symbol: 'USDC', name: 'USD Coin', balance: '52,401.00' },
    { symbol: 'ETH', name: 'Wrapped Ether', balance: '4.21' },
  ]

  const handleSwap = () => {
    setIsSwapping(true)
    setTimeout(() => setIsSwapping(false), 2000)
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Liquidity Protocol</h1>
          <p className="text-sm text-zinc-500 mt-1">Sovereign DEX for peer-to-peer asset exchange.</p>
        </div>
        <div className="flex items-center gap-4 bg-zinc-900/50 border border-border p-1 rounded-2xl">
           <button className="px-4 py-2 text-[10px] font-bold bg-white text-black rounded-xl uppercase tracking-widest">Swap</button>
           <button className="px-4 py-2 text-[10px] font-bold text-zinc-500 hover:text-white rounded-xl uppercase tracking-widest transition-colors">Pools</button>
           <button className="px-4 py-2 text-[10px] font-bold text-zinc-500 hover:text-white rounded-xl uppercase tracking-widest transition-colors">Yield</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Market Analysis (Left) */}
        <div className="lg:col-span-7 space-y-8">
           <div className="formal-card">
              <div className="formal-header">
                 <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-white" />
                    <h3 className="text-xs font-bold uppercase tracking-widest">Market Feed: CB / USDC</h3>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-white">$14.21 <span className="text-zinc-500 ml-1">(+2.4%)</span></span>
                 </div>
              </div>
              <div className="p-8">
                 {/* Fake Chart */}
                 <div className="h-64 w-full relative group">
                    <svg className="w-full h-full overflow-visible">
                       <motion.path
                         d="M 0 180 L 100 160 L 200 170 L 300 120 L 400 140 L 500 80 L 600 90 L 700 40"
                         fill="transparent"
                         stroke="white"
                         strokeWidth="2"
                         initial={{ pathLength: 0 }}
                         animate={{ pathLength: 1 }}
                         transition={{ duration: 2 }}
                       />
                       <rect width="100%" height="100%" fill="transparent" className="cursor-crosshair" />
                    </svg>
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-10">
                       {Array.from({ length: 24 }).map((_, i) => <div key={i} className="border-t border-l border-white" />)}
                    </div>
                 </div>
                 <div className="mt-8 flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    <span>08:00 AM</span>
                    <span>12:00 PM</span>
                    <span>04:00 PM</span>
                    <span>08:00 PM</span>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="formal-card p-6">
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">24h Trading Volume</p>
                 <p className="text-2xl font-bold text-white tabular-nums">$12.4M</p>
              </div>
              <div className="formal-card p-6">
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Total Value Locked</p>
                 <p className="text-2xl font-bold text-white tabular-nums">$142.8M</p>
              </div>
           </div>
        </div>

        {/* Swap Interface (Right) */}
        <div className="lg:col-span-5">
           <div className="formal-card p-2">
              <div className="p-6 space-y-6">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white">Execution</h3>
                    <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                       <Settings2 size={18} />
                    </button>
                 </div>

                 {/* Pay Section */}
                 <div className="bg-zinc-950 border border-border rounded-2xl p-6 space-y-4 focus-within:border-white transition-all">
                    <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                       <span>You Pay</span>
                       <span>Balance: {tokens[0].balance}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                       <input 
                         type="number" 
                         value={fromAmount}
                         onChange={(e) => setFromAmount(e.target.value)}
                         className="bg-transparent text-3xl font-bold text-white focus:outline-none w-full tabular-nums"
                       />
                       <button className="flex items-center gap-2 bg-zinc-900 border border-border px-3 py-1.5 rounded-xl hover:bg-zinc-800 transition-colors">
                          <div className="h-5 w-5 bg-white rounded-full" />
                          <span className="text-sm font-bold text-white">{tokens[0].symbol}</span>
                          <ChevronDown size={14} className="text-zinc-500" />
                       </button>
                    </div>
                 </div>

                 {/* Arrow Spacer */}
                 <div className="flex justify-center -my-8 relative z-10">
                    <button className="h-10 w-10 bg-black border-2 border-zinc-800 rounded-xl flex items-center justify-center text-white hover:border-white transition-all shadow-xl">
                       <ArrowDown size={18} />
                    </button>
                 </div>

                 {/* Receive Section */}
                 <div className="bg-zinc-950 border border-border rounded-2xl p-6 space-y-4 focus-within:border-white transition-all pt-10">
                    <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                       <span>You Receive</span>
                       <span>Balance: {tokens[1].balance}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                       <input 
                         type="number" 
                         value={toAmount}
                         readOnly
                         className="bg-transparent text-3xl font-bold text-white focus:outline-none w-full tabular-nums opacity-50"
                       />
                       <button className="flex items-center gap-2 bg-zinc-900 border border-border px-3 py-1.5 rounded-xl hover:bg-zinc-800 transition-colors">
                          <div className="h-5 w-5 bg-zinc-400 rounded-full" />
                          <span className="text-sm font-bold text-white">{tokens[1].symbol}</span>
                          <ChevronDown size={14} className="text-zinc-500" />
                       </button>
                    </div>
                 </div>

                 {/* Price Info */}
                 <div className="px-2 space-y-2">
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase">
                       <div className="flex items-center gap-1">
                          <Info size={12} />
                          Price Impact
                       </div>
                       <span className="text-white font-bold">&lt; 0.01%</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase">
                       <span>Network Fee</span>
                       <span className="text-white font-bold">~ $0.12</span>
                    </div>
                 </div>

                 {/* Action Button */}
                 <button 
                   onClick={handleSwap}
                   disabled={isSwapping}
                   className="w-full bg-white text-black py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 active:scale-95"
                 >
                    {isSwapping ? (
                       <>
                          <RefreshCw size={16} className="animate-spin" />
                          Authorizing...
                       </>
                    ) : 'Execute Swap'}
                 </button>
              </div>
           </div>

           <div className="mt-8 p-4 bg-zinc-900/30 border border-border/30 rounded-2xl flex items-start gap-4">
              <Info size={20} className="text-zinc-500 shrink-0 mt-1" />
              <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-wider">
                 All swaps are executed on-chain via the ChainBot Sovereign VM. Slippage protection is enabled by default at 0.5%.
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}
