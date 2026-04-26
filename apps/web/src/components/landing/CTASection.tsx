// FILE: components/landing/CTASection.tsx
'use client'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Globe } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-48 px-6 md:px-12 lg:px-24 bg-black relative overflow-hidden">
      {/* HUD Accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      {/* Dramatic but restrained glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-primary/10 blur-[200px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-10"
          >
            <div className="space-y-6">
              <p className="text-primary font-mono text-[10px] uppercase tracking-[0.6em] font-bold mb-4">// Deployment Gateway</p>
              <h2 className="font-title text-5xl md:text-7xl font-bold uppercase tracking-widest text-white leading-[0.9]">
                Build a real <br />economy.
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-[2px] w-12 bg-primary" />
              <p className="text-white/40 font-body text-lg leading-relaxed max-w-md">
                Transparent by design. Sovereign by architecture. Join 2,500+ communities running on ChainBot infrastructure.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            {/* Corner Markers */}
            <div className="absolute -top-2 -left-2 h-4 w-4 border-t-2 border-l-2 border-primary/40 z-20" />
            <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-primary/40 z-20" />

            <div className="p-12 rounded-[40px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.3em]">Status: Ready_for_deployment</span>
                </div>

                <motion.a
                  href="https://discord.com/oauth2/authorize"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0, 201, 177, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-6 rounded-2xl bg-primary text-black font-title text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-[0_0_20px_rgba(0,201,177,0.2)]"
                >
                  Deploy to Discord
                  <ArrowRight className="h-5 w-5" />
                </motion.a>

                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    href="/docs"
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.2)" }}
                    className="px-4 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-title text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                  >
                    Documentation
                  </motion.a>
                  <motion.a
                    href="/explorer"
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.2)" }}
                    className="px-4 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-title text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                  >
                    Explorer
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
