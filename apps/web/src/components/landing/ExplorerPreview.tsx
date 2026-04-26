// FILE: components/landing/ExplorerPreview.tsx
'use client'
import { motion } from 'framer-motion'
import { Box, ArrowRightLeft, User, Zap } from 'lucide-react'

export default function ExplorerPreview() {
  const blocks = [
    { height: '892,103', hash: '0x3a1...f42', miner: 'Pool #1', time: '12s ago' },
    { height: '892,102', hash: '0x9d2...a81', miner: 'Svr_Node', time: '24s ago' },
    { height: '892,101', hash: '0xb41...c33', miner: 'Pool #1', time: '36s ago' },
  ]

  return (
    <section className="py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Cinematic Technical Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `linear-gradient(to right, #00C9B1 1px, transparent 1px), linear-gradient(to bottom, #00C9B1 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
        <motion.div 
          animate={{ x: [-100, 100], y: [-50, 50], rotate: [0, 10, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-full h-full bg-primary/5 blur-[120px] rounded-full opacity-20"
        />
        {/* Procedural Data Streams */}
        <div className="absolute inset-0 opacity-[0.05]">
          {[...Array(12)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 8 + i, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{ top: `${8 * i}%` }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-40 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-10 opacity-40">
            <div className="h-[1px] w-12 bg-white" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-white">Live Forensic Indexer</span>
            <div className="h-[1px] w-12 bg-white" />
          </div>
          <h2 className="font-title text-[clamp(2.5rem,10vw,8.5rem)] font-bold uppercase tracking-[0.15em] text-hero leading-[0.85] mb-12">
            Transparent <br /> <span className="opacity-20">Forensics.</span>
          </h2>
          <p className="max-w-2xl text-lg font-body text-white/40 leading-relaxed tracking-tight">
            Real-time deep-packet inspection of the sovereign chain. Monitor every block, hash, and protocol event with millisecond finality.
          </p>
        </div>

        <div className="relative group">
          {/* Decorative Back Panel */}
          <div className="absolute -inset-4 rounded-[40px] bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          {/* Bottom Glow Reflection (User Request) */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/20 blur-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
            {/* Left Panel: Block List */}
            <div className="lg:col-span-4 border-r border-white/10 flex flex-col">
              <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/40">Network Ledger</span>
                  <span className="text-[10px] font-mono text-primary">Live Syncing...</span>
                </div>
                <Box className="h-4 w-4 text-primary opacity-50" />
              </div>
              <div className="flex-1 overflow-y-auto max-h-[500px] divide-y divide-white/5 scrollbar-hide">
                {blocks.map((block) => (
                  <div key={block.height} className="p-8 hover:bg-white/[0.04] transition-all cursor-pointer group/item relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    <div className="flex justify-between items-end mb-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">Block Height</span>
                        <span className="text-lg font-bold text-white tracking-widest">#{block.height}</span>
                      </div>
                      <span className="text-[10px] font-mono text-white/20 mb-1">{block.time}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-primary/40" />
                        <span className="text-[10px] font-mono text-white/40 truncate uppercase tracking-widest">{block.hash}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel: Transaction Details */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl border border-white/10 flex items-center justify-center text-primary/60">
                    <ArrowRightLeft className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/40">Analysis Pipeline</span>
                    <span className="text-[10px] font-mono text-white/20">TX_HASH: 0x71C...3d4_F2</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                    <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-widest animate-pulse">Confirmed</span>
                  </div>
                </div>
              </div>
              
              <div className="p-12 space-y-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-12 border-b border-white/5">
                  <div className="space-y-3">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/20">Block Height</span>
                    <span className="text-sm font-bold text-white tracking-widest block uppercase">892,103</span>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/20">Gas Limit</span>
                    <span className="text-sm font-bold text-white tracking-widest block uppercase">30,000,000</span>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/20">Protocol Fee</span>
                    <span className="text-sm font-bold text-white tracking-widest block uppercase">0.05 COIN</span>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/20">Net Value</span>
                    <span className="text-sm font-bold text-primary tracking-widest block uppercase shadow-primary/20 drop-shadow-sm">500.00 COIN</span>
                  </div>
                </div>

                <div className="relative p-10 rounded-3xl border border-white/5 bg-white/[0.01] overflow-hidden group/box">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  
                  <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-white/30"><User className="h-4 w-4" /></div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/40">Initiator (From)</span>
                      </div>
                      <div className="p-4 rounded-xl bg-black border border-white/5">
                        <span className="text-xs font-mono text-white/80 break-all">0x71C...3d4_WALLET_PRIMARY</span>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Zap className="h-5 w-5" />
                      </div>
                      <div className="absolute top-1/2 left-full w-8 h-[1px] bg-primary/20 -translate-y-1/2 hidden md:block" />
                      <div className="absolute top-1/2 right-full w-8 h-[1px] bg-primary/20 -translate-y-1/2 hidden md:block" />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3 justify-end">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/40">Receiver (To)</span>
                        <div className="h-8 w-8 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary"><Box className="h-4 w-4" /></div>
                      </div>
                      <div className="p-4 rounded-xl bg-black border border-primary/10 text-right">
                        <span className="text-xs font-mono text-primary/80 break-all">VAULT_CONTRACT_0x44A</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
