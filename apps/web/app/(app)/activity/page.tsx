// FILE: app/(app)/activity/page.tsx
'use client'
import { useState } from 'react'
import { Activity, ArrowUpRight, ArrowDownLeft, RefreshCw, Filter, Search } from 'lucide-react'

export default function ActivityPage() {
  const activities = [
    { type: 'SWAP', from: 'CB', to: 'USDC', amount: '142.5', value: '$2,024.12', age: '12s ago', status: 'Finalized' },
    { type: 'DEPOSIT', from: 'ETH', to: 'Vault_Alpha', amount: '1.2', value: '$2,842.00', age: '1m ago', status: 'Finalized' },
    { type: 'MINT', from: 'MINER_01', to: 'CB', amount: '2,000', value: '$28,420.00', age: '4m ago', status: 'Finalized' },
    { type: 'BURN', from: 'CB', to: 'NULL', amount: '10.0', value: '$142.10', age: '10m ago', status: 'Finalized' },
    { type: 'WITHDRAW', from: 'Vault_Beta', to: 'CB', amount: '5,000', value: '$71,050.00', age: '15m ago', status: 'Finalized' },
  ]

  return (
    <div className="max-w-[1200px] mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Activity Stream</h1>
          <p className="text-sm text-zinc-500 mt-1">Real-time chronicle of your on-chain operations.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-zinc-500 bg-zinc-900 border border-border rounded-xl hover:text-white transition-all uppercase tracking-widest">
              <RefreshCw size={14} /> Refresh
           </button>
           <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-zinc-500 bg-zinc-900 border border-border rounded-xl hover:text-white transition-all uppercase tracking-widest">
              <Filter size={14} /> Filter
           </button>
        </div>
      </div>

      <div className="formal-card overflow-hidden">
         <div className="formal-header border-b border-border">
            <div className="relative group flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
               <input 
                 type="text" 
                 placeholder="Search events, tokens, or status..." 
                 className="bg-black border border-border rounded-xl py-2 pl-10 pr-4 text-[10px] font-mono w-full focus:outline-none focus:border-white transition-all placeholder:text-zinc-700"
               />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-zinc-900/50 border-b border-border">
                     <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Operation</th>
                     <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Flow</th>
                     <th className="px-8 py-4 text-right text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Amount</th>
                     <th className="px-8 py-4 text-right text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Estimate</th>
                     <th className="px-8 py-4 text-right text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Age</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/50">
                  {activities.map((act, i) => (
                    <tr key={i} className="data-table-row group">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                             <div className="h-8 w-8 bg-zinc-900 border border-border rounded-lg flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-zinc-800 transition-all">
                                {act.type === 'SWAP' ? <RefreshCw size={14}/> : act.type === 'DEPOSIT' || act.type === 'MINT' ? <ArrowDownLeft size={14}/> : <ArrowUpRight size={14}/>}
                             </div>
                             <div>
                                <p className="text-xs font-bold text-white uppercase tracking-tight">{act.type}</p>
                                <p className="text-[9px] text-zinc-600 font-mono">{act.status}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                             <span className="text-white font-bold">{act.from}</span>
                             <span className="text-zinc-700">→</span>
                             <span className="text-white font-bold">{act.to}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <p className="text-xs font-bold text-white tabular-nums">{act.amount} <span className="text-[10px] text-zinc-500 font-normal">{act.from === 'CB' || act.from === 'MINER_01' ? 'CB' : act.from}</span></p>
                       </td>
                       <td className="px-8 py-6 text-right text-[11px] font-mono text-zinc-400">
                          {act.value}
                       </td>
                       <td className="px-8 py-6 text-right text-[10px] font-mono text-zinc-500 uppercase">
                          {act.age}
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
         
         <div className="p-8 bg-zinc-950/50 flex items-center justify-center border-t border-border">
            <button className="text-[10px] font-bold text-zinc-500 hover:text-white transition-all uppercase tracking-[0.2em]">View Full Archive</button>
         </div>
      </div>
    </div>
  )
}
