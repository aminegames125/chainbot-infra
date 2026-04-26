// FILE: components/landing/AuditSection.tsx
'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Search, FileText } from 'lucide-react'

export default function AuditSection() {
  const audits = [
    { name: 'Certik', status: 'Completed', score: '98/100', icon: <ShieldCheck className="h-5 w-5" /> },
    { name: 'OpenZeppelin', status: 'Verified', date: 'Q1 2026', icon: <Lock className="h-5 w-5" /> },
    { name: 'Hacken', status: 'Passed', coverage: 'Full', icon: <Search className="h-5 w-5" /> },
    { name: 'Kudelski', status: 'Certified', level: 'Level 3', icon: <FileText className="h-5 w-5" /> },
  ]

  return (
    <div className="py-24 relative">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-4 mb-6 opacity-40">
          <div className="h-[1px] w-8 bg-primary" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-primary">Trust_Infrastructure</span>
          <div className="h-[1px] w-8 bg-primary" />
        </div>
        <h2 className="font-title text-5xl font-bold uppercase tracking-widest text-hero mb-6">Security Audits.</h2>
        <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Protocol Integrity Verified by Global Leaders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {audits.map((audit, i) => (
          <motion.div
            key={audit.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all overflow-hidden"
          >
            {/* HUD Corner Decor */}
            <div className="absolute top-0 right-0 h-8 w-8 border-t border-r border-primary/20 group-hover:border-primary/50 transition-colors" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="h-12 w-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-primary/60 group-hover:text-primary transition-all">
                {audit.icon}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-1">{audit.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">{audit.status}</span>
                  <div className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{audit.score || audit.date || audit.coverage || audit.level}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <button className="text-[11px] md:text-[9px] font-mono font-bold text-white/20 group-hover:text-white transition-colors uppercase tracking-[0.3em] flex items-center gap-2">
                  Verify Protocol Integrity <span className="text-primary opacity-0 group-hover:opacity-100 transition-all">-</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Banner */}
      <div className="mt-20 p-8 rounded-3xl border border-primary/10 bg-primary/[0.02] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="h-16 w-16 rounded-full border-2 border-primary/40 border-dashed animate-[spin_10s_linear_infinite] flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-bold text-white uppercase tracking-widest">Insurance Fund Active</p>
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Protected by 50M COIN SAFU Protocol</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-[0.5em] mb-2">Total Value Secured</span>
          <span className="text-3xl font-title font-bold text-white tracking-brutal">$892,103,440.00</span>
        </div>
      </div>
    </div>
  )
}
