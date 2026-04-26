// FILE: components/ui/TechnicalSpacer.tsx
'use client'
import { motion } from 'framer-motion'

export default function TechnicalSpacer() {
  return (
    <div className="py-20 md:py-40 flex flex-col items-center justify-center pointer-events-none opacity-20">
      <div className="h-32 md:h-64 w-[1px] bg-gradient-to-b from-primary/50 via-primary/5 to-transparent" />
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono font-bold uppercase tracking-[1em]">Scanning_Next_Layer</span>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-1 w-1 rounded-full bg-primary" />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
