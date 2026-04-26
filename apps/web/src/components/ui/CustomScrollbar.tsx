// FILE: components/ui/CustomScrollbar.tsx
'use client'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CustomScrollbar() {
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 z-[100] h-[60vh] w-1.5 hidden md:flex flex-col items-center group">
      {/* Track */}
      <div className="absolute inset-0 rounded-full bg-white/5 border border-white/5 backdrop-blur-md" />
      
      {/* Progress Fill */}
      <motion.div 
        style={{ scaleY, originY: 0 }}
        className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/40 via-primary to-primary/40 shadow-[0_0_15px_rgba(0,201,177,0.5)]"
      />

      {/* Technical Notches */}
      <div className="absolute inset-y-0 w-full flex flex-col justify-between py-4 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full h-[1px] bg-white/20" />
        ))}
      </div>

      {/* Floating Percentage Indicator */}
      <motion.div 
        className="absolute -left-12 w-10 text-[8px] font-mono font-bold text-primary text-right opacity-40 group-hover:opacity-100 transition-opacity"
      >
        <PercentageText progress={scrollYProgress} />
      </motion.div>
    </div>
  )
}

function PercentageText({ progress }: { progress: any }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    return progress.on('change', (v: number) => setVal(Math.round(v * 100)))
  }, [progress])
  return <span>{val}%</span>
}
