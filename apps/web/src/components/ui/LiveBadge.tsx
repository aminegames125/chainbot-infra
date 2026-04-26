// FILE: src/components/ui/LiveBadge.tsx
'use client'
import { motion } from 'framer-motion'

export default function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-zinc-900 px-2.5 py-1">
      <motion.span
        className="block h-1.5 w-1.5 rounded-full bg-white"
        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span
        className="font-mono text-[10px] font-bold tracking-[0.15em] text-white"
      >
        LIVE
      </span>
    </span>
  )
}
