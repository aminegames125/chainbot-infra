// FILE: app/(app)/dashboard/page.tsx
'use client'
import { motion } from 'framer-motion'
import {
  Activity,
  Database,
  Layers,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  History,
  Terminal,
  MoreHorizontal
} from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { label: 'Network Throughput', value: '1,264 TPS', change: '+8.3%', positive: true },
    { label: 'Active Validators', value: '1,024', change: '+12', positive: true },
    { label: 'Block Latency', value: '1.24s', change: '-0.1s', positive: true },
    { label: 'TVL Secured', value: '$842.6M', change: '+1.2%', positive: true },
  ]

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">Overview of your chain infrastructure and performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-border rounded-xl text-xs font-bold transition-all text-white">Share</button>
          <button className="px-5 py-2 bg-white text-black rounded-xl text-xs font-bold hover:bg-zinc-200 transition-all">New View</button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="formal-card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</span>
              <div className={`flex items-center gap-1 text-[11px] font-bold ${stat.positive ? 'text-white' : 'text-zinc-500'}`}>
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold text-white tracking-tight tabular-nums">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Network Health Chart Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="formal-card">
            <div className="formal-header">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-white" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Network Load</h3>
              </div>
              <button className="text-zinc-500 hover:text-white transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <div className="p-8">
              <div className="h-64 w-full flex items-end justify-between gap-1.5">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full bg-zinc-900 hover:bg-white transition-all rounded-full"
                    style={{ height: `${Math.random() * 80 + 10}%` }}
                  />
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                <div className="flex gap-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">24h Peak</span>
                    <span className="text-sm font-bold text-white">2,481 TPS</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Efficiency</span>
                    <span className="text-sm font-bold text-white">99.98%</span>
                  </div>
                </div>
                <button className="text-[11px] font-bold text-white hover:underline flex items-center gap-1">
                  Details <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="formal-card">
            <div className="formal-header">
              <div className="flex items-center gap-2">
                <Database size={16} className="text-white" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Recent Activity</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/50 border-b border-border">
                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Transaction</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Amount</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Age</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="data-table-row cursor-pointer">
                      <td className="px-8 py-5 text-xs font-mono font-bold text-white">0x{Math.random().toString(16).slice(2, 10)}...</td>
                      <td className="px-8 py-5">
                        <span className="px-2 py-1 rounded-lg bg-zinc-900 border border-border text-[9px] font-bold text-zinc-400 uppercase">Confirmed</span>
                      </td>
                      <td className="px-8 py-5 text-right text-xs font-bold text-white">{(Math.random() * 5).toFixed(4)} CB</td>
                      <td className="px-8 py-5 text-right text-[10px] font-mono text-zinc-500">{i * 12}s ago</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Feed Area */}
        <div className="space-y-8">
          <div className="formal-card">
            <div className="formal-header">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-white" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-white">Blocks</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 bg-zinc-950 border border-border rounded-2xl hover:border-white transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">#18,273,90{i}</span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{i * 8}s ago</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-500">
                    <span>142 Txs</span>
                    <span className="font-mono">0x4a...d1c</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="formal-card">
            <div className="formal-header">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-white" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Validator Console</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Live_Stream</span>
              </div>
            </div>
            <div className="p-6 bg-zinc-950/50 font-mono text-[10px] space-y-2 overflow-hidden h-[300px]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="flex gap-4 opacity-50 hover:opacity-100 transition-opacity">
                  <span className="text-zinc-600">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-white">NODE_ALPHA</span>
                  <span className="text-zinc-400">Validated_Block #18,273,8{i} // 0x4f...a2d</span>
                  <span className="text-zinc-700 ml-auto">SIG_OK</span>
                </div>
              ))}
              <div className="pt-4 border-t border-border/20 text-zinc-500 italic">
                Waiting for incoming consensus messages...
              </div>
            </div>
          </div>

          <div className="formal-card">
            <div className="formal-header">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-white" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Security & Governance</h3>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-zinc-500">Proposal #42: Inflation Adjustment</span>
                  <span className="text-white">64% / 33%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden flex">
                  <div className="h-full bg-white w-[64%]" />
                  <div className="h-full bg-zinc-700 w-[33%] ml-1" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-zinc-500">Proposal #41: Gas Limit Update</span>
                  <span className="text-white">92% / 2%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden flex">
                  <div className="h-full bg-white w-[92%]" />
                  <div className="h-full bg-zinc-700 w-[2%] ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
