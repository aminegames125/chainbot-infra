// FILE: components/ui/GlobalEffects.tsx
'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function GlobalEffects() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const cursorX = useSpring(mouseX, { damping: 20, stiffness: 150 })
  const cursorY = useSpring(mouseY, { damping: 20, stiffness: 150 })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <>
      {/* Custom Technical Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary/40 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_#00C9B1]" />
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-primary/60" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-primary/60" />
      </motion.div>

      {/* Global Alive Background */}
      <div className="fixed inset-0 z-[-2] bg-[#020605] overflow-hidden pointer-events-none">
        {/* Mouse Tracking Ambient Glow */}
        <motion.div
          className="absolute z-[-1] h-[800px] w-[800px] rounded-full bg-primary/[0.03] blur-[150px]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />

        {/* Animated Nebula/Auroras */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-primary/10 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            rotate: [0, -8, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-accent/5 blur-[120px] rounded-full" 
        />

        {/* Persistent Master Grid with Heartbeat Pulse */}
        <motion.div 
          animate={{ opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `
              linear-gradient(to right, #1A3A35 1px, transparent 1px),
              linear-gradient(to bottom, #1A3A35 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} 
        />

        {/* Sub-grid for texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ 
          backgroundImage: `
            linear-gradient(to right, #1A3A35 1px, transparent 1px),
            linear-gradient(to bottom, #1A3A35 1px, transparent 1px)
          `,
          backgroundSize: '15px 15px'
        }} />

        {/* Moving Scanline Overlay */}
        <motion.div 
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent h-[50%]"
        />
      </div>
    </>
  )
}
