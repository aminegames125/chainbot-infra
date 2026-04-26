// FILE: components/layout/AuroraBackground.tsx
'use client'
import { motion } from 'framer-motion'

export default function AuroraBackground() {
  return (
    <>
      {/* Aurora blobs */}
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        {/* Blob 1 — purple top-left */}
        <motion.div
          className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #00C9B1 0%, transparent 70%)',
            opacity: 0.12,
            filter: 'blur(80px)',
          }}
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Blob 2 — cyan center-right */}
        <motion.div
          className="absolute -right-20 top-1/3 h-[400px] w-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #4FFFD4 0%, transparent 70%)',
            opacity: 0.07,
            filter: 'blur(80px)',
          }}
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Blob 3 — glow bottom-center */}
        <motion.div
          className="absolute bottom-0 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, #00C9B1 0%, transparent 70%)',
            opacity: 0.08,
            filter: 'blur(80px)',
          }}
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
        {/* Glowing Lines Overlay */}
        <div className="absolute inset-0 z-[1] opacity-20">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              style={{ top: `${(i + 1) * 20}%` }}
              animate={{ opacity: [0.1, 0.3, 0.1], y: [-10, 10, -10] }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>

      {/* Grain texture */}
      <svg
        className="pointer-events-none fixed inset-0 z-[-1] h-full w-full"
        style={{ opacity: 0.03 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </>
  )
}
