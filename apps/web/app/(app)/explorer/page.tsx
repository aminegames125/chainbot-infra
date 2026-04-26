// FILE: app/(app)/explorer/page.tsx
'use client'
import { motion } from 'framer-motion'
import { 
  Search, 
  ExternalLink, 
  Database, 
  Activity, 
  Cpu, 
  Layers, 
  ArrowRight,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  History
} from 'lucide-react'

export default function ExplorerPage() {
  return (
    <div className="space-y-10">
      {/* Monochrome Explorer Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Block Explorer</h1>
          <p className="text-sm text-zinc-500 mt-1">Real-time ledger of consensus and transaction data.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search by address / hash / height..." 
                className="bg-zinc-900 border border-border rounded-xl py-2.5 pl-12 pr-4 text-sm w-96 focus:outline-none focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-600"
              />
           </div>
           <button className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-zinc-200 transition-all">Identify</button>
        </div>
      </div>

      {/* Network Stats Bar (Monochrome) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Market Cap', value: '$2.14B', icon: <Activity size={18} /> },
          { label: 'Latest Block', value: '18,451,902', icon: <Layers size={18} /> },
          { label: 'Avg Latency', value: '1.24s', icon: <Cpu size={18} /> },
          { label: 'TPS Peak', value: '2,481', icon: <Database size={18} /> },
        ].map((stat) => (
          <div key={stat.label} className="formal-card p-6 flex items-center gap-5">
             <div className="h-12 w-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white border border-border">
                {stat.icon}
             </div>
             <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{stat.label}</p>
                <p className="text-xl font-bold text-white tabular-nums tracking-tight">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Main Ledger Console */}
      <div className="formal-card overflow-hidden">
        <div className="formal-header border-b border-border">
          <div className="flex items-center gap-3">
            <Database size={18} className="text-white" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Consensus Ledger</h3>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-zinc-400 bg-zinc-900 border border-border rounded-xl hover:text-white transition-all uppercase tracking-widest">
                <Filter size={14} /> Filter
             </button>
             <button className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-zinc-400 bg-zinc-900 border border-border rounded-xl hover:text-white transition-all uppercase tracking-widest">
                <Download size={14} /> CSV
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/50 border-b border-border">
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Block Height</th>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Transaction_Hash</th>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-right text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Value</th>
                <th className="px-8 py-5 text-right text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <tr key={i} className="data-table-row cursor-pointer group">
                  <td className="px-8 py-6">
                     <span className="text-xs font-bold text-white group-hover:underline">#18,451,90{i}</span>
                  </td>
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 font-bold group-hover:text-white transition-colors">
                        0x{Math.random().toString(16).slice(2, 12)}...
                        <ExternalLink size={12} className="text-zinc-600" />
                     </div>
                  </td>
                  <td className="px-8 py-6">
                     <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-border text-[9px] font-bold text-zinc-400 uppercase">Indexing_Live</span>
                  </td>
                  <td className="px-8 py-6 text-right text-xs font-bold text-white tabular-nums">
                     {(Math.random() * 50).toFixed(4)} <span className="text-[10px] text-zinc-500 ml-1">CB</span>
                  </td>
                  <td className="px-8 py-6 text-right text-[11px] font-mono text-zinc-500 uppercase">
                     {i * 12}s ago
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-border bg-zinc-950 flex items-center justify-between">
           <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest">Showing 10 of 142.9M records</span>
           <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-border rounded-xl text-xs font-bold text-zinc-400 hover:text-white disabled:opacity-50 transition-all">
                <ChevronLeft size={16} /> Prev
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-border rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-all">
                Next <ChevronRight size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}
