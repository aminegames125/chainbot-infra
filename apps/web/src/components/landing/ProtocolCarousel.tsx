// FILE: components/landing/ProtocolCarousel.tsx
'use client'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import LottieAnimation from '@/components/ui/LottieAnimation'
import { Shield, Zap, Globe, Cpu } from 'lucide-react'

const protocols = [
  {
    title: 'Liquidity Protocol',
    desc: 'Autonomous market making with zero-slippage virtual depth.',
    icon: <Zap className="h-6 w-6" />,
    lottie: 'https://assets8.lottiefiles.com/packages/lf20_ghp9o9.json', // Data flow
    color: 'shadow-primary/20'
  },
  {
    title: 'Issuance Protocol',
    desc: 'Fair-launch PoW tokenomics with verified on-chain issuance.',
    icon: <Cpu className="h-6 w-6" />,
    lottie: 'https://assets9.lottiefiles.com/packages/lf20_m6cuL6.json', // CPU / Node
    color: 'shadow-accent/20'
  },
  {
    title: 'Synthetic Protocol',
    desc: 'Collateralized minting for global fiat and commodity benchmarks.',
    icon: <Globe className="h-6 w-6" />,
    lottie: 'https://assets10.lottiefiles.com/packages/lf20_qpwb7tnd.json', // World / Global
    color: 'shadow-primary/20'
  },
  {
    title: 'Security Protocol',
    desc: 'Multi-layer auditing and real-time threat detection system.',
    icon: <Shield className="h-6 w-6" />,
    lottie: 'https://assets1.lottiefiles.com/packages/lf20_m6cuL6.json', // Shield/Security
    color: 'shadow-accent/20'
  }
]

export default function ProtocolCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="py-40 relative overflow-hidden bg-black">
      <div className="mx-auto max-w-7xl px-6 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] font-bold mb-4">// System_Protocols</p>
          <h2 className="font-title text-5xl md:text-7xl font-bold uppercase tracking-widest text-white leading-none">
            Deep <br /> <span className="text-white/20">Integrity.</span>
          </h2>
        </div>
        <div className="flex items-center gap-4 text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">
          <span>Horizontal_Sequence</span>
          <div className="h-[1px] w-12 bg-white/10" />
          <span>v2.0.4</span>
        </div>
      </div>

      {/* 3D Horizontal Scroll */}
      <div className="relative h-[80vh] flex items-center">
        <div className="flex gap-12 px-6 md:px-24 overflow-x-auto no-scrollbar scroll-smooth snap-x">
          {protocols.map((p, i) => (
            <motion.div
              key={p.title}
              whileHover={{ y: -20, scale: 1.02 }}
              className="min-w-[350px] md:min-w-[500px] aspect-[4/5] bg-[#0A1A17] border border-white/5 rounded-[3rem] p-12 flex flex-col justify-between group snap-center relative overflow-hidden"
            >
              {/* Background Glass Pulse */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                  <div className="h-14 w-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-primary group-hover:shadow-[0_0_20px_rgba(0,201,177,0.4)] transition-all">
                    {p.icon}
                  </div>
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">PRTC_ID: 00{i+1}</span>
                </div>
                
                <h3 className="font-title text-3xl md:text-5xl font-bold uppercase text-white leading-tight mb-6">
                  {p.title}
                </h3>
                <p className="font-body text-white/40 text-lg leading-relaxed max-w-xs">
                  {p.desc}
                </p>
              </div>

              <div className="relative z-10 w-full h-48 mt-8">
                <LottieAnimation 
                  url={p.lottie} 
                  className="w-full h-full opacity-40 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Technical Marker */}
              <div className="absolute bottom-12 right-12 h-6 w-6 border-b-2 border-r-2 border-primary/20 group-hover:border-primary transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
