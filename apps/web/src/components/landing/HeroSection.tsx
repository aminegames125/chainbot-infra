'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section ref={containerRef} className="relative flex min-h-screen w-full flex-col items-start justify-center overflow-hidden bg-black px-6 pt-32 pb-20 md:px-12 lg:px-24">
      {/* HUD Grid Overlay */}
      <motion.div
        style={{ 
          y: y1,
          backgroundImage: `linear-gradient(to right, #1A3A35 1px, transparent 1px), linear-gradient(to bottom, #1A3A35 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      />

      {/* Mouse Tracking Glow */}
      <motion.div
        className="pointer-events-none absolute z-1 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]"
        animate={{
          x: mousePos.x - 300,
          y: mousePos.y - 300,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 150 }}
      />

      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: y1, scale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full w-full"
        >
          <img
            src="/hero-bg.png"
            alt="Hero Background"
            fetchPriority="high"
            loading="eager"
            className="h-full w-full object-cover object-center brightness-[0.45] contrast-[1.2] saturate-[0.8]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent pointer-events-none" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 flex w-full max-w-7xl flex-col items-start">
        {/* Protocol Promise Badge (Message Match) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md flex items-center gap-3"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
          <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.3em]">PROMISE: FAST, SECURE DEX SWAPS & REAL MINING</span>
        </motion.div>

        {/* Massive Benefit-First Headline */}
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 h-full w-[1px] bg-primary/40 hidden md:block" />
          <h1
            className="font-title text-[clamp(2.5rem,12vw,8.5rem)] font-bold uppercase tracking-brutal text-hero leading-[0.75]"
          >
            SOVEREIGN<br />ECONOMIES.
          </h1>
          <div className="mt-4 flex items-center gap-4 opacity-40">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.8em] text-white">POWERED_BY_CHAINBOT</span>
            <div className="h-[1px] w-32 bg-white" />
          </div>
        </motion.div>

        {/* Subtitle with immediate clarity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 space-y-4 max-w-2xl"
        >
          <p className="text-[clamp(1.2rem,2.5vw,1.8rem)] font-body font-light text-white/90 tracking-tight leading-tight">
            Deploy <span className="text-primary/90 font-medium italic underline decoration-primary/20 underline-offset-8">Fast, Secure DEX Swaps</span> and Real Mineable Assets directly in your Discord server.
          </p>
          <p className="text-base font-body text-white/30 leading-relaxed max-w-lg">
            ChainBot returns control to the community through a sovereign public ledger. No middlemen. No centralized databases. Just hard-coded finality.
          </p>
        </motion.div>

        {/* Primary Goal CTA (Single-Goal Focus) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex items-center gap-8"
        >
          <button className="relative group overflow-hidden px-12 py-5 rounded-2xl bg-primary text-black font-title font-bold uppercase tracking-[0.2em] text-sm hover:shadow-[0_0_50px_#00C9B1] transition-all duration-500">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">Start Building Now</span>
          </button>
          
          <div className="hidden md:flex flex-col gap-1">
            <span className="text-[9px] font-mono font-bold text-white/20 uppercase tracking-widest">Active nodes</span>
            <span className="text-xs font-mono font-bold text-primary">1,240 / 1,500</span>
          </div>
        </motion.div>

        {/* Floating Glass Labels (Supportive only) */}
        <div className="mt-20 flex flex-wrap gap-4 max-w-3xl opacity-40 hover:opacity-100 transition-opacity duration-700">
          {[
            "Live Ledger", "On-chain Verified", "EVM Compatible",
            "Mineable Economy", "Public Explorer", "Transparent Supply"
          ].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -3, 0]
              }}
              transition={{
                opacity: { duration: 0.5, delay: 1 + i * 0.1 },
                scale: { duration: 0.5, delay: 1 + i * 0.1 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }
              }}
              className="px-4 py-2 rounded-lg border border-white/5 bg-white/[0.02] backdrop-blur-xl flex items-center gap-3 cursor-default"
            >
              <div className="h-1 w-1 rounded-full bg-primary/40" />
              <span className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-white/40">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Left Footer Info */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-12 left-6 md:left-12 lg:left-24 flex items-center gap-3 z-10"
      >
        <div className="flex h-8 w-8 items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2758-3.68-.2758-5.4876 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.2259 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-[0.22em] text-white/40 uppercase leading-tight">Built for Discord.</span>
          <span className="text-[10px] font-bold tracking-[0.22em] text-white/40 uppercase leading-tight">Secured by Blockchain.</span>
        </div>
      </motion.div>
    </section>
  )
}

