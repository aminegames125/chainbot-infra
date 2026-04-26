// FILE: app/error.tsx
'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, ShieldAlert, Cpu } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('SYSTEM_CRITICAL_FAILURE:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Critical Failure Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ 
        backgroundImage: `linear-gradient(to right, #ef4444 1px, transparent 1px), linear-gradient(to bottom, #ef4444 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }} />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Error Header */}
        <div className="flex items-center gap-4 mb-12">
          <ShieldAlert className="h-5 w-5 text-red-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-red-500">System_Critical_Halt</span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h1 className="font-title text-[clamp(2.5rem,8vw,6rem)] font-bold uppercase tracking-brutal text-white leading-none">
              Kernel_Panic.
            </h1>
            <p className="text-red-500/60 font-mono text-xs uppercase tracking-[0.5em]">Memory corruption detected in segment_0x99</p>
          </div>

          <div className="p-10 rounded-[2.5rem] border border-red-500/20 bg-red-500/[0.02] backdrop-blur-3xl space-y-8 relative overflow-hidden">
            {/* Background Data Dump Decor */}
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Cpu className="h-24 w-24 text-red-500" />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">Error_Report:</p>
                <div className="bg-black/40 p-6 rounded-2xl border border-white/5 font-mono text-[11px] text-red-400 leading-relaxed break-all">
                  {error.message || 'UNKNOWN_RUNTIME_EXCEPTION_OCCURRED'}
                  <br />
                  <span className="opacity-20 mt-4 block">DIGEST: {error.digest || '0x_NULL_SEGMENT'}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] leading-relaxed">
                  The protocol encountered an unrecoverable exception. 
                  Automatic failsafe protocols have been initiated to prevent data leakage.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <motion.button
                onClick={() => reset()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center gap-4 py-6 rounded-2xl bg-red-500 text-black font-title font-bold uppercase tracking-[0.3em] text-xs transition-all hover:shadow-[0_0_50px_rgba(239,68,68,0.4)]"
              >
                <RefreshCw className="h-4 w-4" />
                Reboot_Sequence
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Extreme Visual Glitch Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.02] bg-[url('https://media.giphy.com/media/oEI9uWU6EB_i8/giphy.gif')] mix-blend-overlay" />
    </main>
  )
}
