// FILE: components/landing/TrustSection.tsx
'use client'
import { motion } from 'framer-motion'
import { Shield, Eye, Lock, FileSearch, Server, Activity } from 'lucide-react'

export default function TrustSection() {
  const points = [
    { title: 'Self-Hosted', desc: 'Full control over your node infrastructure.', icon: <Server className="h-4 w-4" /> },
    { title: 'Public Ledger', desc: 'Every transaction visible on the explorer.', icon: <Eye className="h-4 w-4" /> },
    { title: 'No Hidden Balances', desc: 'What you see on-chain is the reality.', icon: <Lock className="h-4 w-4" /> },
    { title: 'Auditable Transactions', desc: 'Protocol-level audit trails for everything.', icon: <FileSearch className="h-4 w-4" /> },
    { title: 'Transparent Mechanics', desc: 'Algorithmically defined economy.', icon: <Shield className="h-4 w-4" /> },
    { title: 'Protocol-First', desc: 'Economics built on sovereign architecture.', icon: <Activity className="h-4 w-4" /> },
  ]

  return (
    <section className="py-40 px-6 md:px-12 lg:px-24 bg-black relative">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
          <div className="flex items-center gap-4 mb-10 opacity-40">
            <div className="h-[1px] w-12 bg-white" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-white">Trust Architecture</span>
          </div>
          <h2 className="font-title text-[clamp(2.5rem,8vw,7.5rem)] font-bold uppercase tracking-[0.1em] text-hero leading-[0.85] mb-12">
            Immutable <br /> <span className="opacity-20">Design.</span>
          </h2>
          <p className="text-white/40 font-body text-xl leading-relaxed tracking-tight max-w-sm">
            Trust is not a promise. It is an architectural requirement. Every byte of state is cryptographically verifiable.
          </p>
        </div>

        <div className="relative">
          {/* Audit Log Style Points */}
          <div className="space-y-6">
            {points.map((point, i) => (
              <motion.div 
                key={point.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-8 group"
              >
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:border-primary/40 group-hover:text-primary transition-all">
                    {point.icon}
                  </div>
                  {i < points.length - 1 && <div className="h-6 w-[1px] bg-white/5 mt-2" />}
                </div>
                <div className="pb-8 border-b border-white/5 flex-1 group-hover:border-white/10 transition-colors">
                  <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-1">{point.title}</h3>
                  <p className="text-[10px] text-white/20 font-mono uppercase tracking-widest">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-40 p-16 rounded-[40px] border border-white/5 bg-white/[0.01] text-center max-w-4xl mx-auto relative group overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        {/* Technical CSS Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-[0.05]" style={{ 
            backgroundImage: `linear-gradient(to right, #00C9B1 1px, transparent 1px), linear-gradient(to bottom, #00C9B1 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <p className="font-body text-white/50 text-xl italic leading-relaxed relative z-10">
          "In an industry of opaque database-backed bots, ChainBot returns the economy back to the community 
          through hard-coded, <span className="text-primary not-italic font-mono text-sm tracking-widest font-bold">AUDITABLE_BLOCKCHAIN_FINALITY</span>."
        </p>
      </div>
      </div>
    </section>
  )
}
