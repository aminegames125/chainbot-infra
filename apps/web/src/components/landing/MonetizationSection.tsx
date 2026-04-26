// FILE: components/landing/MonetizationSection.tsx
'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight, Database, Wallet, PieChart } from 'lucide-react'

export default function MonetizationSection() {
  const flows = [
    { title: 'Payment Flow', desc: 'Secure community transactions with on-chain verification.', icon: <Wallet className="h-5 w-5" /> },
    { title: 'Fee Flow', desc: 'Transparent protocol fees distributed to the DAO.', icon: <PieChart className="h-5 w-5" /> },
    { title: 'Server Monetization', desc: 'Sovereign community revenue via specialized vaults.', icon: <Database className="h-5 w-5" /> },
  ]

  return (
    <section className="py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Financial Flow Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ 
          backgroundImage: `linear-gradient(to right, #1A3A35 1px, transparent 1px), linear-gradient(to bottom, #1A3A35 1px, transparent 1px)`,
          backgroundSize: '150px 150px'
        }} />
        {/* Floating Abstract Currency Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ 
              y: [-100, 100],
              opacity: [0, 0.3, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
            className="absolute h-24 w-24 border border-primary/20 rounded-full blur-sm"
            style={{ left: `${15 * i}%`, top: `${10 * i}%` }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12 order-2 lg:order-1">
            <div>
              <div className="flex items-center gap-4 mb-10 opacity-40">
                <div className="h-[1px] w-12 bg-white" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-white">Economic Sovereignty</span>
              </div>
              <h2 className="font-title text-[clamp(2.5rem,8vw,6.5rem)] font-bold uppercase tracking-[0.1em] text-hero leading-[0.85] mb-12">
                Community <br /> <span className="opacity-20">Wealth.</span>
              </h2>
              <p className="text-white/40 font-body text-xl leading-relaxed tracking-tight max-w-md mt-6">
                ChainBot lets communities monetize transparently with on-chain payments, auditable flows, and public settlement.
              </p>
            </div>

            <div className="space-y-4">
              {flows.map((flow, i) => (
                <motion.div 
                  key={flow.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-6 p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
                >
                  <div className="h-10 w-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors">
                    {flow.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">{flow.title}</h3>
                    <p className="text-xs text-white/30 leading-relaxed max-w-xs">{flow.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Diagram / Financial Control Room Feel */}
          <div className="order-1 lg:order-2 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[40px] border border-white/10 bg-black/60 backdrop-blur-3xl relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,1)] group"
            >
              {/* Internal Accent Lines */}
              <div className="absolute top-0 right-0 w-[1px] h-32 bg-gradient-to-b from-primary/40 to-transparent" />
              <div className="absolute top-0 right-0 h-[1px] w-32 bg-gradient-to-l from-primary/40 to-transparent" />
              
              <div className="relative space-y-12">
                <div className="flex justify-between items-center border-b border-white/5 pb-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-white/20">Protocol Status</span>
                    <span className="text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      Active Settlement
                    </span>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-white/20" />
                </div>

                <div className="flex flex-col gap-10 items-center py-6">
                  <div className="w-full flex justify-between items-center">
                    <div className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center w-36 group-hover:border-primary/20 transition-colors">
                      <span className="text-[8px] font-mono text-white/20 block mb-2 uppercase tracking-widest">Community</span>
                      <span className="text-xs font-bold text-white uppercase tracking-widest">Vault A-1</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary animate-pulse" />
                      <span className="text-[8px] font-mono text-primary/40 uppercase tracking-widest">Indexing</span>
                    </div>
                    <div className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center w-36 group-hover:border-primary/20 transition-colors">
                      <span className="text-[8px] font-mono text-white/20 block mb-2 uppercase tracking-widest">Protocol</span>
                      <span className="text-xs font-bold text-white uppercase tracking-widest">DAO_POOL</span>
                    </div>
                  </div>

                  <div className="w-full flex justify-between items-center">
                    <div className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center w-36 group-hover:border-primary/20 transition-colors">
                      <span className="text-[8px] font-mono text-white/20 block mb-2 uppercase tracking-widest">User Asset</span>
                      <span className="text-xs font-bold text-white uppercase tracking-widest">TX_BUFFER</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-white/10" />
                    </div>
                    <div className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center w-36 group-hover:border-primary/20 transition-colors">
                      <span className="text-[8px] font-mono text-white/20 block mb-2 uppercase tracking-widest">Ledger</span>
                      <span className="text-xs font-bold text-white uppercase tracking-widest">FINALITY</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-white/20">Aggregate Balance</span>
                    <span className="text-3xl font-title font-bold text-white tracking-widest">890,420 <span className="text-primary text-sm tracking-tighter ml-1">COIN</span></span>
                  </div>
                  <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/10">
                    <ArrowRight className="h-4 w-4 rotate-[-45deg]" />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Background HUD Accent */}
            <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary/5 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
