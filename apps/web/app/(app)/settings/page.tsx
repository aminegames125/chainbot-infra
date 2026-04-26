// FILE: app/(app)/settings/page.tsx
'use client'
import { User, Bell, Shield, Globe, Cpu, CreditCard, ChevronRight } from 'lucide-react'

export default function SettingsPage() {
  const sections = [
    { 
      title: 'Identity & Access', 
      items: [
        { label: 'Profile Identifier', value: 'AMINE_OS', icon: <User size={16}/> },
        { label: 'Security Level', value: 'S_ADMIN (Multi-sig Required)', icon: <Shield size={16}/> },
        { label: 'Billing & Tiers', value: 'Pro Infrastructure', icon: <CreditCard size={16}/> },
      ] 
    },
    { 
      title: 'Infrastructure Preferences', 
      items: [
        { label: 'Preferred RPC Node', value: 'ChainBot Primary (Sovereign)', icon: <Globe size={16}/> },
        { label: 'Computation Engine', value: 'v4.2.0-STABLE', icon: <Cpu size={16}/> },
        { label: 'Global Notifications', value: 'Critical Only', icon: <Bell size={16}/> },
      ] 
    }
  ]

  return (
    <div className="max-w-[1000px] mx-auto space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">Configure your protocol identity and infrastructure parameters.</p>
      </div>

      <div className="space-y-12">
         {sections.map(section => (
           <div key={section.title} className="space-y-6">
              <h2 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] pl-2">{section.title}</h2>
              <div className="formal-card overflow-hidden">
                 <div className="divide-y divide-border/50">
                    {section.items.map(item => (
                      <button key={item.label} className="w-full px-8 py-6 flex items-center justify-between hover:bg-zinc-900 transition-all text-left group">
                         <div className="flex items-center gap-6">
                            <div className="text-zinc-500 group-hover:text-white transition-colors">
                               {item.icon}
                            </div>
                            <div>
                               <p className="text-xs font-bold text-white uppercase tracking-tight">{item.label}</p>
                               <p className="text-sm text-zinc-500 mt-0.5">{item.value}</p>
                            </div>
                         </div>
                         <ChevronRight size={18} className="text-zinc-700 group-hover:text-white transition-colors" />
                      </button>
                    ))}
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div className="formal-card p-10 bg-zinc-950/50 border-dashed border-zinc-800 text-center space-y-6">
         <div className="space-y-2">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest">Danger Zone</h3>
            <p className="text-xs text-zinc-600 max-w-md mx-auto">Permanent operations that affect your sovereign identity and cryptographic keys.</p>
         </div>
         <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-6 py-2.5 border border-zinc-800 text-zinc-500 hover:text-white hover:border-white transition-all text-[10px] font-bold uppercase tracking-widest rounded-xl">Revoke Sessions</button>
            <button className="px-6 py-2.5 bg-zinc-900 text-white hover:bg-white hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest rounded-xl">Factory Reset</button>
         </div>
      </div>
    </div>
  )
}
