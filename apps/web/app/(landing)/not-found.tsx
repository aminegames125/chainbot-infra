// FILE: app/not-found.tsx
"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Terminal, AlertTriangle, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background HUD Decor */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `linear-gradient(to right, #00C9B1 1px, transparent 1px), linear-gradient(to bottom, #00C9B1 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Error Header */}
        <div className="flex items-center gap-4 mb-12 opacity-40">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-primary">System_Response_Err</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="font-title text-[clamp(3rem,10vw,8rem)] font-bold uppercase tracking-brutal text-white leading-none">
            Lost in <br />
            <span className="text-white/20 italic">The_Void.</span>
          </h1>

          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl space-y-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
              <div className="space-y-2">
                <p className="text-sm font-mono text-white font-bold uppercase tracking-widest">ERR_CODE: 404_PAGE_NOT_RESOLVED</p>
                <p className="text-xs font-mono text-white/40 leading-relaxed uppercase tracking-widest">
                  The requested memory segment does not exist or has been decommissioned by the core protocol.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-2">
              <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">Internal_Logs:</p>
              <div className="text-[10px] font-mono text-primary/60 space-y-1">
                <p>{'>'} SEARCHING_SEGMENT_V2... [FAIL]</p>
                <p>{'>'} SCANNING_ORPHAN_NODES... [NOT_FOUND]</p>
                <p>{'>'} STATUS: SYSTEM_REDIRECT_REQUIRED</p>
              </div>
            </div>
          </div>

          <Link href="/">
            <motion.button
              whileHover={{ x: -10 }}
              className="flex items-center gap-4 group"
            >
              <div className="h-12 w-12 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <span className="font-title text-sm font-bold uppercase tracking-[0.4em] text-white">Return_To_Core</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative Binary Pulse */}
      <BinaryPulse />
    </main>
  )
}

function BinaryPulse() {
  const [mounted, setMounted] = useState(false)
  const [binary, setBinary] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
    setBinary(Array.from({ length: 5 }).map(() => Math.random().toString(2).slice(2, 40)))
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute bottom-12 right-12 text-[8px] font-mono text-white/5 flex flex-col gap-1 pointer-events-none">
      {binary.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  )
}
