// FILE: app/(app)/error.tsx
'use client'
import { useEffect } from 'react'
import { AlertCircle, RefreshCw, Terminal, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-10 animate-fade-in">
      <div className="h-24 w-24 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-white/5">
         <AlertCircle size={40} className="animate-pulse" />
      </div>

      <div className="space-y-4 max-w-lg">
         <h1 className="text-3xl font-bold text-white tracking-tighter uppercase">Kernel Panic</h1>
         <p className="text-sm text-zinc-500 font-mono uppercase tracking-widest leading-relaxed">
            A critical exception occurred in the execution environment. The VM has halted to prevent state corruption.
         </p>
      </div>

      <div className="bg-zinc-900/50 border border-border p-6 rounded-2xl w-full max-w-xl text-left font-mono text-[10px] space-y-2 overflow-hidden">
         <p className="text-zinc-600 uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
            <Terminal size={14} /> Stack_Trace_Dump
         </p>
         <div className="text-zinc-400 opacity-60">
            {error.message || 'RUNTIME_EXCEPTION_SIGNAL_SIGABRT'}
            <br />
            {error.digest && `DIGEST_HASH: ${error.digest}`}
            <br />
            &gt; Re-initializing consensus layer...
            <br />
            &gt; Awaiting peer acknowledgement...
         </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
         <button 
           onClick={() => reset()}
           className="flex items-center gap-3 px-10 py-4 bg-white text-black text-xs font-bold rounded-2xl hover:bg-zinc-200 transition-all uppercase tracking-[0.2em]"
         >
            <RefreshCw size={16} /> Re-Sync State
         </button>
         <Link 
           href="/dashboard"
           className="flex items-center gap-3 px-10 py-4 border border-border text-zinc-500 hover:text-white hover:bg-zinc-900 text-xs font-bold rounded-2xl transition-all uppercase tracking-[0.2em]"
         >
            <ArrowLeft size={16} /> Emergency Exit
         </Link>
      </div>
    </div>
  )
}
