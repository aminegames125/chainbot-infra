// FILE: app/(app)/nodes/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { Terminal, Cpu, Database, Activity, Server, Zap, ChevronRight } from 'lucide-react'

export default function NodesPage() {
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const messages = [
      'BOOTING_CORE_VM_V4.2...',
      'INITIALIZING_CONSENSUS_ENGINE...',
      'SYNCING_BLOCK_HEIGHT_#18,274,012...',
      'PEER_CONNECTED: 0x4f...a2d',
      'PEER_CONNECTED: 0x1b...c9e',
      'VALIDATING_STATE_TRANSITION...',
      'SIGNATURE_VERIFIED // BLS12-381',
      'COMMITTING_BATCH_#1042...',
    ]
    let i = 0
    const id = setInterval(() => {
      setLogs(prev => [...prev, messages[i % messages.length]].slice(-12))
      i++
    }, 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="max-w-[1200px] mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Node Infrastructure</h1>
          <p className="text-sm text-zinc-500 mt-1">Direct management of your consensus validator and compute nodes.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-4 py-2 bg-zinc-900 border border-border rounded-xl text-[10px] font-bold text-white flex items-center gap-2">
              <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
              SYSTEM_READY
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            {/* Main Terminal */}
            <div className="formal-card bg-black border-zinc-800">
               <div className="formal-header border-zinc-800">
                  <div className="flex items-center gap-2">
                     <Terminal size={16} className="text-white" />
                     <h3 className="text-xs font-bold uppercase tracking-widest text-white">System Console</h3>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600">v4.2.0-STABLE</span>
               </div>
               <div className="p-8 font-mono text-[11px] h-[400px] overflow-hidden bg-zinc-950/50">
                  <div className="space-y-3">
                     {logs.map((log, i) => (
                       <div key={i} className="flex gap-4 group">
                          <span className="text-zinc-700 w-16">[{new Date().toLocaleTimeString()}]</span>
                          <span className="text-zinc-500">$</span>
                          <span className="text-white group-last:text-white/100 text-white/70 transition-opacity">
                             {log}
                          </span>
                       </div>
                     ))}
                     <div className="flex gap-4">
                        <span className="text-zinc-700 w-16">[{new Date().toLocaleTimeString()}]</span>
                        <span className="text-zinc-500">$</span>
                        <span className="h-4 w-2 bg-white animate-pulse" />
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="formal-card p-6 flex flex-col justify-between h-40">
                  <div className="flex items-center justify-between">
                     <Cpu size={20} className="text-white" />
                     <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Compute Load</span>
                  </div>
                  <div className="space-y-4">
                     <p className="text-2xl font-bold text-white font-mono">34.2%</p>
                     <div className="h-1 w-full bg-zinc-900 rounded-full">
                        <div className="h-full bg-white w-[34.2%]" />
                     </div>
                  </div>
               </div>
               <div className="formal-card p-6 flex flex-col justify-between h-40">
                  <div className="flex items-center justify-between">
                     <Database size={20} className="text-white" />
                     <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">State Storage</span>
                  </div>
                  <div className="space-y-4">
                     <p className="text-2xl font-bold text-white font-mono">1.4 TB / 4 TB</p>
                     <div className="h-1 w-full bg-zinc-900 rounded-full">
                        <div className="h-full bg-white w-[35%]" />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="formal-card p-6">
               <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Active Clusters</h3>
               <div className="space-y-4">
                  {[
                    { name: 'Validator_Primary', type: 'Consensus', status: 'Active' },
                    { name: 'Compute_Matrix', type: 'EVM_VM', status: 'Active' },
                    { name: 'Storage_Ledger', type: 'IPFS_PIN', status: 'Hibernating' },
                  ].map(node => (
                    <div key={node.name} className="p-4 bg-zinc-950 border border-border rounded-xl flex items-center justify-between">
                       <div>
                          <p className="text-xs font-bold text-white">{node.name}</p>
                          <p className="text-[9px] text-zinc-600 uppercase tracking-tighter mt-0.5">{node.type}</p>
                       </div>
                       <div className={`px-2 py-0.5 rounded border text-[8px] font-bold uppercase ${node.status === 'Active' ? 'border-white text-white' : 'border-zinc-800 text-zinc-700'}`}>
                          {node.status}
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-6 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all">
                  Connect New Node
               </button>
            </div>

            <div className="formal-card p-6 bg-zinc-950/30">
               <div className="flex items-center gap-3 mb-4">
                  <Server size={16} className="text-white" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white">Network Stats</h3>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between">
                     <span className="text-[10px] text-zinc-500 uppercase font-bold">Uptime</span>
                     <span className="text-[10px] text-white font-mono">99.999%</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-[10px] text-zinc-500 uppercase font-bold">Latency</span>
                     <span className="text-[10px] text-white font-mono">1.2ms</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-[10px] text-zinc-500 uppercase font-bold">Peers</span>
                     <span className="text-[10px] text-white font-mono">124 Connected</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
