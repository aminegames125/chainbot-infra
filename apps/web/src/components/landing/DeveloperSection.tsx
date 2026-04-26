// FILE: components/landing/DeveloperSection.tsx
'use client'
import { motion } from 'framer-motion'
import { Terminal, Cpu, Share2, Code2 } from 'lucide-react'

export default function DeveloperSection() {
  return (
    <section className="py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Code Stream Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ 
          backgroundImage: `linear-gradient(to right, #1A3A35 1px, transparent 1px), linear-gradient(to bottom, #1A3A35 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
        {/* Procedural Code Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ 
              y: [-50, 50],
              opacity: [0.1, 0.2, 0.1],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ duration: 12 + i, repeat: Infinity, ease: "linear", delay: i * 2 }}
            className="absolute font-mono text-[8px] text-primary/20 select-none"
            style={{ left: `${12 * i}%`, top: `${15 * i}%` }}
          >
            {`0x${(i * 1337).toString(16)}`}
          </motion.div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          {/* Content Area */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-10 opacity-40">
                <div className="h-[1px] w-12 bg-white" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-white">Developer Suite</span>
              </div>
              <h2 className="font-title text-[clamp(2.5rem,8vw,6.5rem)] font-bold uppercase tracking-[0.1em] text-hero leading-[0.85] mb-12">
                Built for <br /> <span className="opacity-20">Engineers.</span>
              </h2>
              <p className="text-white/40 font-body text-xl leading-relaxed tracking-tight">
                ChainBot is an open EVM infrastructure. Every community function is a public smart contract.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { title: 'Public RPC Access', icon: <Share2 className="h-4 w-4" />, label: 'CHAIN ID: 13371' },
                { title: 'Solidity Compliant', icon: <Cpu className="h-4 w-4" />, label: 'EVM_READY' }
              ].map((item, i) => (
                <div key={item.title} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-primary/60 group-hover:text-primary transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-widest">{item.title}</span>
                  </div>
                  <span className="text-[9px] font-mono text-white/20 tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Window Area */}
          <div className="lg:col-span-7 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-[#0D1117] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative group"
            >
              <div className="p-4 border-b border-white/5 bg-[#161B22] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 px-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
                  </div>
                  <div className="h-6 w-[1px] bg-white/5 mx-2" />
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">ProtocolSync.ts</span>
                </div>
                <Terminal className="h-3 w-3 text-white/20" />
              </div>
              
              <div className="p-10 font-mono text-[12px] md:text-[14px] leading-relaxed relative">
                <div className="space-y-1">
                  <p><span className="text-purple-400">import</span> {'{'} <span className="text-blue-300">ethers</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-300">"ethers"</span>;</p>
                  <p className="opacity-20">&nbsp;</p>
                  <p><span className="text-purple-400">const</span> <span className="text-blue-300">provider</span> = <span className="text-purple-400">new</span> <span className="text-blue-300">ethers</span>.<span className="text-yellow-200">JsonRpcProvider</span>(</p>
                  <p>&nbsp;&nbsp;<span className="text-green-300">"https://rpc.chainbot.infrastructure"</span></p>
                  <p>);</p>
                  <p className="opacity-20">&nbsp;</p>
                  <p><span className="text-purple-400">async function</span> <span className="text-yellow-200">syncCommunityState</span>() {'{'}</p>
                  <p>&nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-blue-300">vault</span> = <span className="text-purple-400">new</span> <span className="text-blue-300">ethers</span>.<span className="text-yellow-200">Contract</span>(<span className="text-white">ADDR</span>, <span className="text-white">ABI</span>, <span className="text-white">provider</span>);</p>
                  <p>&nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-white">balance</span> = <span className="text-purple-400">await</span> <span className="text-white">vault</span>.<span className="text-yellow-200">totalSupply</span>();</p>
                  <p>&nbsp;&nbsp;<span className="text-white">console</span>.<span className="text-yellow-200">log</span>(<span className="text-green-300">{`"Network Supply: ${'${balance}'} COIN"`}</span>);</p>
                  <p>{'}'}</p>
                </div>

                {/* Floating Technical Decor */}
                <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <Code2 className="h-32 w-32 text-primary/5" />
                </div>
              </div>
            </motion.div>

            {/* Asymmetrical HUD Accent */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 border-r-2 border-b-2 border-primary/20 rounded-br-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
