// FILE: components/landing/ZoomTextSection.tsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ZoomTextSectionProps {
  text: string
  subtitle: string
}

export default function ZoomTextSection({ text, subtitle }: ZoomTextSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // zoom zoom zoom then unzoom
  // Scale from 0.8 to 8 (filling screen) then back to 0.8
  const scale = useTransform(scrollYProgress, 
    [0, 0.4, 0.5, 0.6, 1], 
    [0.8, 1.2, 12, 1.2, 0.8]
  )
  
  const opacity = useTransform(scrollYProgress, 
    [0, 0.3, 0.5, 0.7, 1], 
    [0, 1, 1, 1, 0]
  )

  const letterSpacing = useTransform(scrollYProgress,
    [0, 0.5, 1],
    ["0.5em", "2em", "0.5em"]
  )

  return (
    <div ref={containerRef} className="h-[200vh] relative overflow-visible flex items-center justify-center">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div 
          style={{ scale, opacity }}
          className="flex flex-col items-center justify-center text-center px-6"
        >
          <motion.span className="text-primary font-mono text-[10px] uppercase tracking-[1em] mb-8">
            {subtitle}
          </motion.span>
          <motion.h2 
            style={{ letterSpacing }}
            className="font-title text-4xl md:text-8xl font-bold uppercase text-white leading-none whitespace-pre-line max-w-4xl"
          >
            {text}
          </motion.h2>
          
          {/* Dynamic Background Pulse during peak zoom */}
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0.45, 0.5, 0.55], [0, 1, 0]),
              scale: useTransform(scrollYProgress, [0.45, 0.5, 0.55], [0.5, 1.5, 0.5])
            }}
            className="absolute inset-0 z-[-1] bg-primary/20 blur-[200px] rounded-full"
          />
        </motion.div>
      </div>
    </div>
  )
}
