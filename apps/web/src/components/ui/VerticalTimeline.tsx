// FILE: components/ui/VerticalTimeline.tsx
'use client'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function ScrollProgress({ scrollYProgress }: { scrollYProgress: any }) {
  const [hex, setHex] = useState('00')
  
  useEffect(() => {
    return scrollYProgress.onChange((v: number) => {
      setHex(Math.floor(v * 255).toString(16).toUpperCase().padStart(2, '0'))
    })
  }, [scrollYProgress])

  return (
    <span className="text-[10px] font-mono font-bold text-white leading-none">
      0x{hex}
    </span>
  )
}

export default function VerticalTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  return (
    <div className="fixed left-6 md:left-12 lg:left-24 top-0 bottom-0 w-[2px] z-40 pointer-events-none hidden md:block">
      {/* Background Line */}
      <div className="absolute inset-0 bg-white/5" />
      
      {/* Animated Glowing Line */}
      <motion.div 
        style={{ 
          scaleY, 
          opacity,
          transformOrigin: "top",
          background: "linear-gradient(to bottom, transparent, #00C9B1, #00E5CC, transparent)"
        }}
        className="absolute inset-0 shadow-[0_0_20px_rgba(0,201,177,0.8)]"
      />

      {/* Markers at key intervals */}
      {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
        <div 
          key={i}
          className="absolute left-1/2 -translate-x-1/2 h-[1px] w-4 bg-white/10"
          style={{ top: `${pos * 100}%` }}
        >
          <div className="absolute right-full mr-2 text-[8px] font-mono text-white/20 uppercase tracking-widest whitespace-nowrap">
            SEC_0{i + 1}
          </div>
        </div>
      ))}

      {/* Progress Indicator Head */}
      <motion.div
        style={{ 
          top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
          opacity 
        }}
        className="absolute left-1/2 -translate-x-1/2 z-50"
      >
        <div className="h-4 w-4 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-sm flex items-center justify-center -translate-y-1/2 relative">
          <div className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_15px_#00E5CC] animate-pulse" />
          
          {/* Coordinate Label */}
          <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2">
            <div className="flex flex-col">
              <span className="text-[7px] font-mono font-bold text-accent uppercase tracking-tighter">COORD_Y</span>
              <ScrollProgress scrollYProgress={scrollYProgress} />
            </div>
          </div>
        </div>
        
        {/* Light Sweep Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-64 bg-gradient-to-b from-primary/10 to-transparent blur-3xl -translate-y-1/2" />
      </motion.div>
    </div>
  )
}
