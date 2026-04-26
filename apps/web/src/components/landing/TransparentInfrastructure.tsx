// FILE: components/landing/TransparentInfrastructure.tsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Pickaxe, Zap, Activity, Cpu, Database } from 'lucide-react'

const features = [
  {
    title: 'On-Chain Integrity',
    desc: 'Every issuance is a public transaction. Admins cannot silently mint COIN. Every block is logged forever on-chain.',
    icon: <Shield className="h-6 w-6" />,
    code: '0x_INTEGRITY_VERIFIED',
    color: 'from-primary/20'
  },
  {
    title: 'Engineered Mining',
    desc: 'Download MinerCLI and contribute real hashpower. Rewards are proportional, verifiable, and permanent.',
    icon: <Pickaxe className="h-6 w-6" />,
    code: 'POW_HASH_STRENGTH: 98.4%',
    color: 'from-accent/20'
  },
  {
    title: 'Technical Stack',
    desc: 'Mint sUSD, sEUR, sGOLD, sBTC backed by COIN collateral. Real DeFi primitives, secured by blockchain.',
    icon: <Zap className="h-6 w-6" />,
    code: 'DEFI_V2_ACTIVE',
    color: 'from-primary/20'
  }
]

function Circuitry() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100">
      <motion.path
        d="M 0 50 L 20 50 L 30 30 L 50 70 L 70 50 L 100 50"
        fill="transparent"
        stroke="white"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M 10 10 L 90 90 M 90 10 L 100 0"
        fill="transparent"
        stroke="white"
        strokeWidth="0.2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1 }}
      />
    </svg>
  )
}

export default function TransparentInfrastructure() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="py-40 relative overflow-hidden px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Extreme Technical Header */}
        <div className="mb-32 flex flex-col items-center text-center">
          <motion.div 
            style={{ opacity }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.6em] text-primary">System_Transparency</span>
            <div className="h-[1px] w-12 bg-primary" />
          </motion.div>
          
          <div className="relative">
            <motion.h2 
              style={{ y }}
              className="font-title text-[clamp(2.5rem,8vw,6rem)] font-bold uppercase tracking-brutal text-white leading-[0.9]"
            >
              Transparent <br />
              <span className="text-white/10 italic">Infrastructure.</span>
            </motion.h2>
            
            {/* Scanning Light Beam */}
            <motion.div 
              animate={{ 
                x: ['-100%', '200%'],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-primary/20 to-transparent skew-x-[20deg] pointer-events-none"
            />
          </div>
        </div>

        {/* Feature Grid with 3D Tilt (Pure Framer) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ 
                y: -15,
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.2 }
              }}
              className="group relative perspective-1000"
            >
              <div className="relative p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl overflow-hidden h-full flex flex-col gap-8 transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                
                <Circuitry />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-primary group-hover:shadow-[0_0_25px_rgba(0,201,177,0.4)] transition-all">
                    {f.icon}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Core_Module</span>
                    <span className="text-[10px] font-mono text-white/60 font-bold uppercase">0{i+1}</span>
                  </div>
                </div>

                <div className="relative z-10 space-y-4">
                  <h3 className="font-title text-2xl font-bold uppercase tracking-widest text-white group-hover:text-primary transition-colors">
                    {f.title}
                  </h3>
                  <p className="font-body text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                    {f.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest">{f.code}</span>
                  <div className="flex gap-1">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    <div className="h-1 w-4 rounded-full bg-primary/20" />
                  </div>
                </div>

                {/* Internal Glow */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] group-hover:bg-primary/10 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Network Overlay (SVG Pattern) */}
        <div className="mt-20 flex flex-col items-center">
          <div className="w-full max-w-4xl p-1 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-primary/20 via-white/5 to-accent/20">
            <div className="bg-black/90 rounded-[2.4rem] p-12 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
              <div className="relative z-10">
                <p className="font-title text-3xl font-bold text-white uppercase tracking-widest leading-tight">
                  Sovereign <br />
                  <span className="text-primary">Ownership.</span>
                </p>
              </div>
              
              <div className="relative z-10 flex gap-8">
                <div className="flex flex-col">
                  <span className="text-primary font-mono text-xs font-bold uppercase mb-2">// Nodes_Active</span>
                  <span className="text-4xl font-title font-bold text-white">4,812</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-mono text-xs font-bold uppercase mb-2">// Network_State</span>
                  <span className="text-4xl font-title font-bold text-white">SYNCED</span>
                </div>
              </div>

              {/* Background HUD Rings */}
              <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full border-2 border-dashed border-white rounded-full flex items-center justify-center"
                >
                  <div className="w-3/4 h-3/4 border border-white rounded-full" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
