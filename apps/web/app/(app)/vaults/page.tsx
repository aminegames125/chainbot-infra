// FILE: app/(app)/vaults/page.tsx
'use client'
import { motion } from 'framer-motion'
import { Shield, Lock, Percent, ArrowUpRight, Plus, Info } from 'lucide-react'

export default function VaultsPage() {
  const vaults = [
    { id: 1, name: 'Core COIN Yield', tvl: '$42.1M', apr: '12.4%', risk: 'Low', status: 'Optimal' },
    { id: 2, name: 'Liquidity Matrix', tvl: '$12.8M', apr: '24.1%', risk: 'Medium', status: 'Stable' },
    { id: 3, name: 'Stability Reserve', tvl: '$84.2M', apr: '4.2%', risk: 'Minimal', status: 'Protected' },
  ]

  return (
    <div className="max-w-[1200px] mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Security Vaults</h1>
          <p className="text-sm text-zinc-500 mt-1">Automated yield optimization and risk-mitigated storage.</p>
        </div>
        <button className="px-6 py-3 bg-white text-black text-xs font-bold rounded-2xl hover:bg-zinc-200 transition-all flex items-center gap-2 uppercase tracking-widest">
           <Plus size={16} /> New Strategy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: 'Total Value Deposited', value: '$139.1M', icon: <Lock size={18}/> },
           { label: 'Avg Protocol Yield', value: '14.2%', icon: <Percent size={18}/> },
           { label: 'Active Strategies', value: '12', icon: <Shield size={18}/> },
         ].map(stat => (
           <div key={stat.label} className="formal-card p-8">
              <div className="flex items-center justify-between mb-4 text-zinc-500">
                 <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                 {stat.icon}
              </div>
              <p className="text-3xl font-bold text-white tracking-tighter tabular-nums">{stat.value}</p>
           </div>
         ))}
      </div>

      <div className="space-y-6">
         <div className="flex items-center gap-2 text-zinc-500">
            <Info size={16} />
            <h3 className="text-[10px] font-bold uppercase tracking-widest">Active Yield Protocols</h3>
         </div>
         <div className="grid grid-cols-1 gap-4">
            {vaults.map(vault => (
              <div key={vault.id} className="formal-card p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-white transition-all cursor-pointer">
                 <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="h-14 w-14 bg-zinc-900 border border-border rounded-2xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                       <Shield size={24} />
                    </div>
                    <div>
                       <h4 className="text-lg font-bold text-white">{vault.name}</h4>
                       <p className="text-xs text-zinc-500 font-mono mt-0.5 uppercase tracking-wider">Protocol Status: {vault.status}</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-3 gap-12 w-full md:w-auto">
                    <div className="text-center md:text-left">
                       <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">TVL</p>
                       <p className="text-sm font-bold text-white font-mono">{vault.tvl}</p>
                    </div>
                    <div className="text-center md:text-left">
                       <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">APR</p>
                       <p className="text-sm font-bold text-white font-mono">{vault.apr}</p>
                    </div>
                    <div className="text-center md:text-left">
                       <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Risk</p>
                       <p className="text-sm font-bold text-white font-mono uppercase">{vault.risk}</p>
                    </div>
                 </div>

                 <button className="p-3 bg-zinc-900 border border-border rounded-xl text-zinc-500 group-hover:text-white group-hover:border-white transition-all">
                    <ArrowUpRight size={20} />
                 </button>
              </div>
            ))}
         </div>
      </div>

      <div className="formal-card p-8 bg-zinc-950/50">
         <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
               <h3 className="text-lg font-bold text-white">Self-Custodial Governance</h3>
               <p className="text-sm text-zinc-500 leading-relaxed">Vault strategies are governed by decentralized consensus. Every code change is audited and voted on by CB holders before activation.</p>
            </div>
            <button className="w-full md:w-auto px-8 py-3 border border-border rounded-2xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all uppercase tracking-widest">
               Governance Portal
            </button>
         </div>
      </div>
    </div>
  )
}
