// FILE: components/ui/ScrollFrames.tsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function ScrollFrame({ children, index }: { children: React.ReactNode, index: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Extreme Zoom Effect (zoom zoom zoom then unzoom unzoom unzoom)
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.5, 0.7, 1], 
    [0.8, 1.15, 1.3, 1.15, 0.8]
  )
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10])

  return (
    <motion.div 
      ref={ref}
      style={{ 
        scale, 
        opacity,
        rotateX,
        perspective: '1000px'
      }}
      className="relative mb-32 md:mb-80 last:mb-0"
    >
      {/* HUD Frame Decor */}
      <div className="absolute -inset-4 md:-inset-10 border border-white/5 pointer-events-none z-0 overflow-hidden rounded-[4rem]">
        {/* Animated Scanning Line */}
        <motion.div 
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-primary/5 to-transparent z-10"
        />
        
        {/* Corner HUD Data */}
        <div className="absolute top-8 left-8 flex flex-col gap-1 opacity-20">
          <span className="text-[8px] font-mono text-white uppercase tracking-widest">SEC_SECT_0{index}</span>
          <span className="text-[8px] font-mono text-white uppercase tracking-widest">ST_ACT_0x{index * 11}</span>
        </div>
        <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1 opacity-20">
          <span className="text-[8px] font-mono text-white uppercase tracking-widest">COORD_Y: {index * 1337}</span>
          <span className="text-[8px] font-mono text-white uppercase tracking-widest">LENS_WIDE_ANGLE</span>
        </div>

        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 h-10 w-10 border-t-2 border-l-2 border-primary/20" />
        <div className="absolute top-0 right-0 h-10 w-10 border-t-2 border-r-2 border-primary/20" />
        <div className="absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-primary/20" />
        <div className="absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-primary/20" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
