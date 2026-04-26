'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function StatsBar() {
  const [mounted, setMounted] = useState(false)
  const [wallets, setWallets] = useState(14208)
  const [blocks, setBlocks] = useState(892103)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setWallets(prev => prev + Math.floor(Math.random() * 2))
      setBlocks(prev => prev + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { label: 'Active Wallets', value: mounted ? wallets.toLocaleString() : '14,208' },
    { label: 'Blocks Mined', value: mounted ? blocks.toLocaleString() : '892,103' },
    { label: 'COIN Supply', value: '1,000,000,000' },
    { label: 'Swap Volume', value: '$2.4M' },
  ]

  return (
    <div className="relative z-20 w-full px-6 md:px-12 lg:px-24 -mt-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/80 backdrop-blur-3xl p-8 flex flex-wrap justify-between items-center gap-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative group"
      >
        {/* Asymmetrical Border Accent */}
        <div className="absolute top-0 left-0 w-12 h-[2px] bg-primary" />
        <div className="absolute top-0 left-0 w-[2px] h-12 bg-primary" />

        {/* Bottom Glowing Line */}
        <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent group-hover:via-primary transition-all duration-700" />

        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col gap-2 group/stat">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary/40 group-hover/stat:bg-primary group-hover/stat:shadow-[0_0_8px_#00C9B1] transition-all" />
              <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/30 group-hover/stat:text-white/60 transition-colors">
                {stat.label}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl md:text-3xl font-title font-bold text-white tracking-[0.1em] group-hover/stat:text-primary transition-colors">
                {stat.value}
              </span>
              <div className="h-4 w-[1px] bg-white/10 group-hover/stat:bg-primary/40 transition-colors" />
              <span className="text-[10px] font-mono text-primary/80 tracking-widest font-bold animate-pulse">LIVE</span>
            </div>
          </div>
        ))}
        
        {/* Network Status Accent */}
        <div className="hidden xl:flex items-center gap-6 pl-10 border-l border-white/10">
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary drop-shadow-[0_0_8px_rgba(0,201,177,0.4)]">Network: Stable</span>
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-white/20">Node_ID: 0x13371</span>
          </div>
          <div className="relative h-3 w-3">
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
            <div className="relative h-3 w-3 rounded-full bg-primary shadow-[0_0_15px_rgba(0,201,177,0.8)]" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
