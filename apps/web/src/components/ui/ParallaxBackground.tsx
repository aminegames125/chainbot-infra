// FILE: components/ui/ParallaxBackground.tsx
'use client'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

export default function ParallaxBackground() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  })

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -500]), springConfig)
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 500]), springConfig)
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -800]), springConfig)
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 45]), springConfig)

  return (
    <div ref={ref} className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.03]">
      {/* Large Technical Numbers */}
      <motion.div style={{ y: y1 }} className="absolute top-[10%] -left-[10%] font-title text-[40vw] leading-none select-none">
        0x13371
      </motion.div>
      
      <motion.div style={{ y: y2 }} className="absolute top-[40%] -right-[15%] font-title text-[30vw] leading-none select-none">
        CHAIN
      </motion.div>

      <motion.div style={{ y: y3, rotate }} className="absolute top-[70%] left-[20%] font-title text-[20vw] leading-none select-none">
        CB_TX
      </motion.div>

      {/* Grid Coordinates */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
        backgroundSize: '100px 100px'
      }} />
    </div>
  )
}
