// FILE: components/landing/FeatureGrid.tsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Pickaxe, Globe, Repeat, ShieldCheck } from 'lucide-react'

function TechnicalVisual({ index }: { index: number }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Dynamic Grid */}
      <div className="absolute inset-0 opacity-20" style={{ 
        backgroundImage: `linear-gradient(to right, #1A3A35 1px, transparent 1px), linear-gradient(to bottom, #1A3A35 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />
      
      {/* Animated Technical Elements */}
      <div className="absolute inset-0 flex items-center justify-center p-20">
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute h-[80%] aspect-square border border-primary/20 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute h-[60%] aspect-square border border-white/5 rounded-[20%] rotate-45"
          />
          
          {/* Data Lines */}
          <div className="absolute inset-0 flex flex-col justify-around py-10 opacity-10">
            {[...Array(8)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ x: i % 2 === 0 ? [-20, 20] : [20, -20] }}
                transition={{ duration: 3 + i, repeat: Infinity, repeatType: "mirror" }}
                className="h-[1px] w-full bg-primary"
              />
            ))}
          </div>

          {/* Central Glow */}
          <div className="h-32 w-32 bg-primary/20 blur-3xl rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}

function FeatureSection({ card, index }: { card: any, index: number }) {
  const ref = useRef(null)
  const isEven = index % 2 === 0
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], [isEven ? -100 : 100, isEven ? 100 : -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className={`flex flex-col lg:flex-row items-center justify-between gap-24 py-52 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
      {/* Asymmetrical Text Content */}
      <motion.div 
        style={{ opacity }}
        className="flex-1 max-w-2xl space-y-12"
      >
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4 text-primary opacity-50">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.6em]">System_Primitive_0x{index + 1}</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-primary to-transparent" />
          </div>
          <h3 className="font-title text-[clamp(3rem,12vw,9rem)] font-bold uppercase tracking-brutal text-hero leading-[0.75]">
            {card.title.split(' ')[0]} <br />
            <span className="opacity-10">{card.title.split(' ').slice(1).join(' ')}</span>
          </h3>
        </div>
        
        <p className="font-body text-white/40 text-2xl leading-tight tracking-tight max-w-lg italic">
          "{card.desc}"
        </p>

        <div className="flex items-center gap-8 pt-8">
          <div className="h-16 w-16 rounded-3xl bg-black border border-white/10 flex items-center justify-center text-primary group-hover:shadow-[0_0_30px_#00C9B1] transition-all duration-700">
            {card.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-[0.3em]">{card.footer}</span>
            <span className="text-[10px] font-mono text-primary/30 uppercase tracking-[0.5em]">Authenticity_Verified_Pass</span>
          </div>
        </div>
      </motion.div>

      {/* Visual Area with HUD Viewfinder */}
      <motion.div 
        style={{ x, opacity }}
        className="flex-1 w-full aspect-square rounded-[4rem] border border-white/10 bg-black relative overflow-hidden group shadow-[0_80px_160px_-40px_rgba(0,0,0,1)]"
      >
        <TechnicalVisual index={index} />
        
        {/* HUD Viewfinder Overlay */}
        <div className="absolute inset-10 border border-primary/20 rounded-[3rem] pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-[1px] bg-primary/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-4 w-[1px] bg-primary/40" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-primary/40" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-primary/40" />
          
          {/* Scanning Data */}
          <div className="absolute top-6 left-6 text-[8px] font-mono text-primary/40 space-y-1">
            <p>RESOLUTION: 4K_RAW</p>
            <p>BITRATE: 12.4_GBPS</p>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <motion.div 
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-primary blur-3xl"
            />
            <div className="relative h-32 w-32 rounded-[2rem] border border-primary/40 bg-black flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
              {card.icon}
            </div>
          </div>
        </div>

        {/* Technical Coordinate Overlay */}
        <div className="absolute top-10 right-10 flex flex-col items-end opacity-20">
          <span className="text-[8px] font-mono text-white">X_COORD: {index * 1337}</span>
          <span className="text-[8px] font-mono text-white">Y_COORD: 0xFC33</span>
        </div>
      </motion.div>
    </div>
  )
}

export default function FeatureGrid() {
  const cards = [
    {
      title: 'Mineable Economy',
      desc: 'Fair launch through real hashpower contributions. Every unit of currency is backed by verifiable on-chain proof-of-work. No premine, no allocations.',
      footer: 'SHA-256 PROOF-OF-WORK',
      icon: <Pickaxe className="h-8 w-8" />
    },
    {
      title: 'Live Forensics',
      desc: 'Real-time transparency into every transaction, block, and contract state. Our custom indexing engine provides millisecond-latency block exploration.',
      footer: 'JSON-RPC INDEXING',
      icon: <Globe className="h-8 w-8" />
    },
    {
      title: 'DEX Liquidity',
      desc: 'Seamlessly swap native COIN for synthetic assets and stablecoins on-chain. Built on an optimized Uniswap V2 AMM architecture for Discord.',
      footer: 'UNISWAP V2 AMM',
      icon: <Repeat className="h-8 w-8" />
    },
    {
      title: 'Collateralized Vaults',
      desc: 'Lock COIN to mint pegged assets. Our vault manager ensures every synthetic is fully collateralized and algorithmically stabilized against market volatility.',
      footer: 'OVER-COLLATERALIZED',
      icon: <ShieldCheck className="h-8 w-8" />
    }
  ]

  return (
    <section className="py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Procedural Blueprint Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ 
          backgroundImage: `linear-gradient(to right, #1A3A35 2px, transparent 2px), linear-gradient(to bottom, #1A3A35 2px, transparent 2px)`,
          backgroundSize: '200px 200px'
        }} />
        <motion.div 
          animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] border-[40px] border-primary/[0.02] rounded-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-40 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-10 opacity-40">
            <div className="h-[1px] w-12 bg-white" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-white">System Architecture</span>
            <div className="h-[1px] w-12 bg-white" />
          </div>
          <h2 className="font-title text-[clamp(2.5rem,10vw,8rem)] font-bold uppercase tracking-[0.15em] text-hero leading-[0.85] mb-12">
            Protocol <br /> <span className="opacity-20">Modules</span>
          </h2>
          <p className="max-w-2xl text-lg font-body text-white/40 leading-relaxed tracking-tight">
            Engineered for high-throughput social economics. Every module is a sovereign primitive on the ChainBot network.
          </p>
        </div>

        <div className="flex flex-col">
          {cards.map((card, i) => (
            <FeatureSection key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ 
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
    </section>
  )
}
