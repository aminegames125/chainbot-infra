// FILE: components/landing/DownloadSection.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle2, Monitor, Apple, Terminal } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
    }
  }
}

const downloads = [
  {
    os: 'Windows',
    icon: <Monitor className="h-8 w-8" />,
    ext: '.exe',
    version: 'v1.2.0 · Jan 15 2026',
    size: '42 MB',
    file: '/downloads/minercli-windows.exe',
  },
  {
    os: 'macOS',
    icon: <Apple className="h-8 w-8" />,
    ext: '.dmg',
    version: 'v1.2.0 · Jan 15 2026',
    size: '38 MB',
    file: '/downloads/minercli-macos.dmg',
  },
  {
    os: 'Linux',
    icon: <Terminal className="h-8 w-8" />,
    ext: '.AppImage',
    version: 'v1.2.0 · Jan 15 2026',
    size: '45 MB',
    file: '/downloads/minercli-linux.AppImage',
  },
]

export default function DownloadSection() {
  const [networkAdded, setNetworkAdded] = useState(false)

  const handleAddNetwork = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('MetaMask not detected.')
      return
    }
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x3439',
            chainName: 'ChainBot',
            nativeCurrency: { name: 'COIN', symbol: 'COIN', decimals: 18 },
            rpcUrls: ['https://chainbot.animeos.dev/rpc'],
            blockExplorerUrls: ['https://chainbot.animeos.dev/explorer'],
          },
        ],
      })
      setNetworkAdded(true)
    } catch {
      // User rejected
    }
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-purple"
          >
            MinerCLI
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-text-primary"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Start mining in minutes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-text-secondary"
          >
            Download MinerCLI for your platform and point it at the ChainBot RPC.
          </motion.p>
        </div>

        {/* Download cards */}
        <div className="mb-10 grid gap-5 sm:grid-cols-3">
          {downloads.map((d, i) => (
            <GlassCard key={d.os} hoverGlow delay={i * 0.1} className="flex flex-col gap-4 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-accent-purple/10 p-3 text-accent-purple">{d.icon}</div>
                <div>
                  <p className="font-heading font-bold text-text-primary">{d.os}</p>
                  <p className="text-xs text-text-muted">{d.version}</p>
                </div>
              </div>
              <motion.a
                href={d.file}
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 rounded-xl bg-accent-purple/15 px-4 py-2.5 text-sm font-semibold text-accent-purple transition-colors hover:bg-accent-purple/25 focus-visible:ring-2 focus-visible:ring-accent-purple/50 focus-visible:outline-none"
              >
                <Download className="h-4 w-4" />
                Download {d.ext} · {d.size}
              </motion.a>
            </GlassCard>
          ))}
        </div>

        {/* MetaMask add network */}
        <div className="text-center">
          <motion.button
            onClick={handleAddNetwork}
            whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-3 rounded-2xl border border-accent-amber/30 bg-accent-amber/10 px-8 py-4 text-base font-semibold text-text-primary shadow-[0_0_30px_rgba(255,181,71,0.1)] transition-all hover:border-accent-amber/60 focus-visible:ring-2 focus-visible:ring-accent-amber/50 focus-visible:outline-none"
          >
            {networkAdded ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-accent-cyan" />
                <span className="text-accent-cyan">ChainBot Network Added!</span>
              </>
            ) : (
              <>
                {/* MetaMask fox SVG */}
                <svg width="24" height="24" viewBox="0 0 35 33" fill="none">
                  <path d="M32.9 1L19.2 11l2.5-6.1L32.9 1z" fill="#E17726" stroke="#E17726" strokeWidth=".25" />
                  <path d="M2.1 1l13.6 10.1-2.4-6.2L2.1 1z" fill="#E27625" stroke="#E27625" strokeWidth=".25" />
                  <path d="M28.1 23.5l-3.6 5.6 7.7 2.1 2.2-7.6-6.3-.1z" fill="#E27625" stroke="#E27625" strokeWidth=".25" />
                  <path d="M.5 23.6l2.2 7.6 7.7-2.1-3.6-5.6-6.3.1z" fill="#E27625" stroke="#E27625" strokeWidth=".25" />
                </svg>
                Add ChainBot Network to MetaMask
              </>
            )}
          </motion.button>
        </div>
      </div>
    </section>
  )
}
