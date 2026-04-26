// FILE: components/landing/ComparisonSection.tsx
'use client'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import ThreeBackground from '@/components/ui/ThreeBackground'

export default function ComparisonSection() {
  const rows = [
    { 
      feature: 'Currency Type', 
      traditional: 'Opaque Virtual Points', 
      chainbot: 'On-chain Sovereign COIN' 
    },
    { 
      feature: 'Ledger Visibility', 
      traditional: 'Private DB (Centralized)', 
      chainbot: 'Public Block Explorer' 
    },
    { 
      feature: 'Custody', 
      traditional: 'Admin-controlled', 
      chainbot: 'User-owned Wallets' 
    },
    { 
      feature: 'Trading', 
      traditional: 'Limited Admin Commands', 
      chainbot: 'Permissionless DEX' 
    },
    { 
      feature: 'Minting', 
      traditional: 'Arbitrary Issuance', 
      chainbot: 'Proof-of-Work Mining' 
    },
    { 
      feature: 'Monetization', 
      traditional: 'Closed Ecosystem', 
      chainbot: 'Real Economic Value' 
    },
    { 
      feature: 'Developer Access', 
      traditional: 'Proprietary API', 
      chainbot: 'Public RPC Node' 
    },
    { 
      feature: 'Trust Model', 
      traditional: 'Trust the Admin', 
      chainbot: 'Trust the Math (Code)' 
    },
  ]

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-black overflow-hidden relative">
      <ThreeBackground />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Header Area */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <p className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] font-bold mb-4">// Protocol Audit</p>
              <h2 className="font-title text-4xl md:text-5xl font-bold uppercase tracking-widest text-white leading-tight">
                The <br />Sovereign <br />Shift.
              </h2>
            </div>
            <p className="text-white/40 font-body text-sm leading-relaxed">
              Traditional economy bots operate on opaque, centralized databases. ChainBot returns control to the community through auditable on-chain finality.
            </p>
            <div className="pt-8 border-t border-white/5">
              <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Verdict: Infrastructure &gt; Games</span>
            </div>
          </div>

          {/* Table Area */}
          <div className="lg:col-span-8 relative group">
            {/* Bottom Glow Reflection */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            {/* Drifting Background Labels (User Request) */}
            <div className="absolute -left-20 top-1/4 -rotate-90 origin-left opacity-[0.03] select-none pointer-events-none">
              <span className="text-8xl font-title font-bold tracking-[1em] text-white whitespace-nowrap">AUDIT_LOG</span>
            </div>
            <div className="absolute -right-20 bottom-1/4 rotate-90 origin-right opacity-[0.03] select-none pointer-events-none">
              <span className="text-8xl font-title font-bold tracking-[1em] text-white whitespace-nowrap">VERIFIED</span>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative">
              {/* Decorative HUD lines */}
              <div className="absolute top-0 right-0 w-[1px] h-full bg-white/5" />
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5" />

              <div className="grid grid-cols-2 border-b border-white/10 bg-white/[0.03]">
                <div className="py-8 px-10 border-r border-white/10">
                  <span className="font-title text-[10px] uppercase font-bold text-white/30 tracking-[0.3em]">Legacy Systems</span>
                </div>
                <div className="py-8 px-10">
                  <span className="font-title text-[10px] uppercase font-bold text-primary tracking-[0.3em] drop-shadow-[0_0_10px_rgba(0,201,177,0.3)]">ChainBot Core</span>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {rows.map((row, i) => (
                  <div key={row.feature} className="group hover:bg-white/[0.01] transition-colors relative">
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-4 w-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="grid grid-cols-2">
                      <div className="py-6 px-10 border-r border-white/5">
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block mb-1">{row.feature}</span>
                        <div className="flex items-center gap-3 text-xs text-white/40 group-hover:text-white/60 transition-colors italic">
                          <X className="h-3 w-3 text-red-500/20" />
                          {row.traditional}
                        </div>
                      </div>
                      <div className="py-6 px-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-sm font-bold text-white tracking-wide group-hover:text-primary transition-colors">
                          <Check className="h-3.5 w-3.5 text-primary" />
                          {row.chainbot}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
