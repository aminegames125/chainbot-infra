// FILE: app/(app)/not-found.tsx
'use client'
import Link from 'next/link'
import { Search, AlertTriangle, ArrowLeft } from 'lucide-react'

export default function AppNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
      <div className="relative">
         <div className="h-32 w-32 bg-zinc-900/50 border border-border rounded-3xl flex items-center justify-center text-white relative z-10">
            <Search size={48} className="opacity-20 absolute" />
            <span className="text-4xl font-bold font-mono">404</span>
         </div>
         <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-full -z-10" />
      </div>

      <div className="space-y-3 max-w-md">
         <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Resource Not Found</h1>
         <p className="text-sm text-zinc-500 leading-relaxed uppercase tracking-wider text-[10px] font-bold">
            The requested object ID or route does not exist in the current consensus state. Verify the URI and try again.
         </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
         <Link 
           href="/dashboard"
           className="flex items-center gap-2 px-8 py-3 bg-white text-black text-xs font-bold rounded-2xl hover:bg-zinc-200 transition-all uppercase tracking-[0.2em]"
         >
            <ArrowLeft size={16} /> Return to Dashboard
         </Link>
         <button 
           onClick={() => window.location.reload()}
           className="px-8 py-3 border border-border text-zinc-500 hover:text-white hover:bg-zinc-900 text-xs font-bold rounded-2xl transition-all uppercase tracking-[0.2em]"
         >
            Retry Sync
         </button>
      </div>

      <div className="pt-12 border-t border-border/30 w-full max-w-xs">
         <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-700">
            <AlertTriangle size={12} />
            <span>ERR_CODE: OBJECT_NOT_FOUND_404</span>
         </div>
      </div>
    </div>
  )
}
