// FILE: components/layout/DashboardSidebar.tsx
'use client'
import { motion } from 'framer-motion'
import { BarChart2, TrendingUp, Layers, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

export type DashboardTab = 'overview' | 'markets' | 'stablecoins' | 'transparency'

const tabs: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Chain Overview', icon: <BarChart2 className="h-4 w-4" /> },
  { id: 'markets', label: 'Prices & Markets', icon: <TrendingUp className="h-4 w-4" /> },
  { id: 'stablecoins', label: 'Stablecoins', icon: <Layers className="h-4 w-4" /> },
  { id: 'transparency', label: 'Transparency', icon: <Shield className="h-4 w-4" /> },
]

interface DashboardSidebarProps {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
}

export default function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 md:block">
        <div className="sticky top-20 rounded-2xl border border-white/5 bg-bg-surface/60 p-3 backdrop-blur-2xl">
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
            Dashboard
          </p>
          <nav className="flex flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  activeTab === tab.id
                    ? 'border-l-2 border-accent-purple bg-accent-purple/10 pl-[10px] text-text-primary'
                    : 'border-l-2 border-transparent text-text-secondary hover:bg-white/[0.04] hover:text-text-primary'
                )}
              >
                <span className={activeTab === tab.id ? 'text-accent-purple' : ''}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile top tab bar */}
      <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-white/5 bg-bg-surface/60 p-1 backdrop-blur-2xl md:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all',
              activeTab === tab.id
                ? 'bg-accent-purple/15 text-accent-purple'
                : 'text-text-secondary hover:text-text-primary'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </>
  )
}
