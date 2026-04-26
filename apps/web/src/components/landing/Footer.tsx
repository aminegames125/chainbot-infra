// FILE: components/landing/Footer.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Hexagon, Copy, Check, Terminal, Cpu, Shield, Globe } from 'lucide-react'

const RPC_URL = 'https://chainbot.animeos.dev/rpc'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toISOString().split('T')[1].split('.')[0] + ' UTC')
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(RPC_URL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="relative bg-black border-t border-white/5 pt-48 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background HUD Grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `linear-gradient(to right, #1A3A35 1px, transparent 1px), linear-gradient(to bottom, #1A3A35 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }} />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Massive Footer Title */}
        <div className="mb-48">
          <h2 className="font-title text-[clamp(2.5rem,15vw,12rem)] font-bold uppercase tracking-[0.2em] text-hero leading-[0.75] opacity-80">
            CHAIN<br />BOT
          </h2>
          <div className="mt-12 flex items-center gap-6 text-primary">
            <div className="h-[2px] w-24 bg-primary" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.8em]">End_Of_Transmission</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-24">
          {/* Brand Info */}
          <div className="max-w-sm space-y-12">
            <div className="space-y-6">
              <p className="text-[10px] font-mono font-bold text-white/20 uppercase tracking-[0.5em]">// Protocol_Manifest</p>
              <p className="text-sm font-body text-white/40 leading-relaxed">
                A sovereign infrastructure for the next generation of digital communities.
                Sovereignty is not an option, it is a default.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {[
                { label: 'Network', value: 'Stable' },
                { label: 'Version', value: '1.0.0-rc' },
                { label: 'Uptime', value: '99.98%' },
                { label: 'Latency', value: '12ms' },
              ].map(stat => (
                <div key={stat.label} className="space-y-1">
                  <span className="text-[8px] font-mono font-bold text-white/20 uppercase tracking-widest">{stat.label}</span>
                  <p className="text-xs font-mono font-bold text-white/60 uppercase">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final Conversion Point (Single-Goal Focus) */}
          <div className="flex-1 flex flex-col items-end justify-center">
            <div className="space-y-12 text-right">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.6em]">Final Step</span>
                <h3 className="font-title text-5xl font-bold uppercase tracking-widest text-white leading-tight">Ready to<br />Sovereignize?</h3>
              </div>
              <button className="relative group overflow-hidden px-16 py-6 rounded-2xl bg-primary text-black font-title font-bold uppercase tracking-[0.2em] text-sm hover:shadow-[0_0_60px_#00C9B1] transition-all duration-500">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">Launch Protocol</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="mt-48 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
          <div className="flex items-center gap-8">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white">© 2026 ChainBot Protocol</span>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white">No VC. No Censorship.</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white">Protocol_Verified_0x00</span>
          </div>
        </div>
      </div>
    </footer>

  )
}
