// FILE: components/ui/DetailedLogo.tsx
'use client'
import { motion } from 'framer-motion'

export default function DetailedLogo() {
  return (
    <div className="relative h-10 w-10 flex items-center justify-center">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
        {/* Outer Rotating Frame */}
        <motion.circle
          cx="50" cy="50" r="45"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="10 20"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="text-primary/20"
        />
        
        {/* Secondary Pulsing Ring */}
        <motion.circle
          cx="50" cy="50" r="35"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="0.5"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-primary/40"
        />

        {/* Core Hexagon Infrastructure */}
        <motion.path
          d="M 50 20 L 76 35 L 76 65 L 50 80 L 24 65 L 24 35 Z"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="text-primary"
        />

        {/* Inner Technical Nodes */}
        <circle cx="50" cy="50" r="5" className="fill-primary" />
        <motion.circle
          cx="50" cy="50" r="8"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="0.5"
          animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-primary"
        />

        {/* Connection Lines */}
        <line x1="50" y1="20" x2="50" y2="35" stroke="currentColor" strokeWidth="0.5" className="text-primary/40" />
        <line x1="76" y1="35" x2="63" y2="42" stroke="currentColor" strokeWidth="0.5" className="text-primary/40" />
        <line x1="76" y1="65" x2="63" y2="58" stroke="currentColor" strokeWidth="0.5" className="text-primary/40" />
        <line x1="50" y1="80" x2="50" y2="65" stroke="currentColor" strokeWidth="0.5" className="text-primary/40" />
        <line x1="24" y1="65" x2="37" y2="58" stroke="currentColor" strokeWidth="0.5" className="text-primary/40" />
        <line x1="24" y1="35" x2="37" y2="42" stroke="currentColor" strokeWidth="0.5" className="text-primary/40" />

        {/* Scanning Beam (Sweeps from Top to Bottom) */}
        <motion.rect
          x="10" y="0" width="80" height="2"
          fill="currentColor"
          className="text-primary/20"
          animate={{ y: [0, 100, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  )
}
