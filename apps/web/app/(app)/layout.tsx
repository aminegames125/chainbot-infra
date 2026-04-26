// FILE: app/(app)/layout.tsx
'use client'
import './globals.css'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Database, 
  Activity, 
  ArrowLeftRight, 
  Shield, 
  Terminal, 
  Settings,
  LogOut,
  Bell,
  Search,
  Command
} from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { icon: <LayoutDashboard size={18} />, href: '/dashboard', label: 'Dashboard' },
    { icon: <Database size={18} />, href: '/explorer', label: 'Explorer' },
    { icon: <Activity size={18} />, href: '/activity', label: 'Activity' },
    { icon: <ArrowLeftRight size={18} />, href: '/swaps', label: 'Swaps' },
    { icon: <Shield size={18} />, href: '/vaults', label: 'Vaults' },
    { icon: <Terminal size={18} />, href: '/nodes', label: 'Nodes' },
    { icon: <Settings size={18} />, href: '/settings', label: 'Settings' },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden antialiased selection:bg-white selection:text-black">
      {/* Monochrome Sidebar */}
      <aside className="w-72 flex flex-col bg-black border-r border-border shrink-0 z-50">
        <div className="h-20 flex items-center px-8 border-b border-border/50">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="h-9 w-9 bg-white rounded-xl flex items-center justify-center text-black transition-transform group-hover:scale-105 shadow-lg shadow-white/10">
              <Command size={22} fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">ChainBot</span>
          </Link>
        </div>

        <div className="flex-1 px-4 py-8 space-y-10 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            <p className="px-4 mb-3 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.25em]">Registry</p>
            {navItems.slice(0, 3).map((item) => {
              const isActive = pathname === item.href
              return (
                <Link 
                  key={item.label} 
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
                    ${isActive ? 'bg-white text-black font-bold shadow-xl shadow-white/5' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}
                  `}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="space-y-2">
            <p className="px-4 mb-3 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.25em]">Services</p>
            {navItems.slice(3).map((item) => {
              const isActive = pathname === item.href
              return (
                <Link 
                  key={item.label} 
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
                    ${isActive ? 'bg-white text-black font-bold' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}
                  `}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="p-6 border-t border-border/50 bg-zinc-950/30">
           <div className="bg-zinc-900/50 border border-border/50 rounded-2xl p-4 mb-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                 <div className="h-2 w-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                 <span className="text-[10px] font-bold text-white uppercase tracking-wider">Node Active</span>
              </div>
              <p className="text-[10px] font-mono text-zinc-500">CONSENSUS_STABLE // 1.2s</p>
           </div>
           <button className="w-full flex items-center justify-center gap-2 py-3 border border-border rounded-2xl text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all text-xs font-bold uppercase tracking-widest">
              <LogOut size={14} />
              Terminate Session
           </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-black">
        {/* Technical Header */}
        <header className="h-20 flex items-center justify-between px-10 border-b border-border/50 shrink-0 z-40 bg-black/50 backdrop-blur-xl">
          <div className="flex items-center gap-6">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-white transition-colors" />
                <input 
                  type="text" 
                  placeholder="COMMAND_SEARCH_ID..." 
                  className="bg-zinc-900/50 border border-border rounded-2xl py-2.5 pl-12 pr-6 text-[10px] font-mono w-80 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all placeholder:text-zinc-700"
                />
             </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-zinc-500 hover:text-white transition-colors">
               <Bell size={20} />
               <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-white rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-border/50">
               <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-white leading-none">AMINE_OS</p>
                  <p className="text-[9px] text-zinc-500 font-mono mt-1">S_ADMIN</p>
               </div>
               <div className="h-10 w-10 rounded-2xl bg-white text-black flex items-center justify-center font-bold text-xs shadow-lg shadow-white/5 cursor-pointer hover:scale-105 transition-transform">
                  AM
               </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-10 max-w-[1600px] mx-auto">
             {children}
          </div>
        </main>
      </div>
    </div>
  )
}
