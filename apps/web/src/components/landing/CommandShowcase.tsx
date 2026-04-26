'use client'
import { motion } from 'framer-motion'
import { Terminal as TerminalIcon } from 'lucide-react'
import LottieAnimation from '@/components/ui/LottieAnimation'

export default function CommandShowcase() {
  const commands = [
// ... existing commands ...
    {
      name: '/wallet',
      desc: 'View your on-chain balances and assets.',
      output: 'Balance: 1,420.69 COIN | Address: 0x71C...3d4',
      status: 'SUCCESS'
    },
    {
      name: '/swap',
      desc: 'Exchange COIN for synthetic assets instantly.',
      output: 'Swapped 500 COIN for 12.5 sGOLD (Price: 40 COIN/sGLD)',
      status: 'CONFIRMED'
    },
    {
      name: '/vault',
      desc: 'Manage your collateralized minting positions.',
      output: 'Vault #401: 2,500 COIN locked | Minted: 450 sUSD',
      status: 'HEALTHY'
    },
    {
      name: '/miner',
      desc: 'Control your contribution to the PoW network.',
      output: 'Mining active: 45.2 MH/s | Efficiency: 98.4%',
      status: 'ACTIVE'
    }
  ]

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-black relative">
      <div className="mx-auto max-w-5xl">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col md:flex-row md:items-center gap-12 max-w-4xl">
            <div className="flex-1">
              <p className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] font-bold mb-4">// System Commands</p>
              <motion.h2 
                animate={{ 
                  scale: [1, 1.02, 1],
                  filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="font-title text-4xl md:text-6xl font-bold uppercase tracking-widest text-white leading-tight"
              >
                Sovereign <br />Control.
              </motion.h2>
            </div>
            
            <div className="w-48 h-48 opacity-40 group-hover:opacity-80 transition-opacity">
              <LottieAnimation 
                url="https://assets10.lottiefiles.com/packages/lf20_m6cuL6.json" 
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 font-mono text-[10px] rotate-90">
            SCROLL
          </div>
        </div>

        <div className="space-y-4">
          {commands.map((cmd, i) => (
            <motion.div
              key={cmd.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
              className="group relative"
            >
              {/* Glowing Left Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-primary/20 group-hover:bg-primary group-hover:shadow-[0_0_20px_#00C9B1] transition-all duration-700 h-0 group-hover:h-full" />
              
              <div className="p-8 pl-10 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-500 flex flex-col md:flex-row md:items-center gap-8 group-hover:translate-x-2">
                <div className="flex items-center gap-4 min-w-[180px]">
                  <div className="h-8 w-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-primary group-hover:shadow-[0_0_15px_rgba(0,201,177,0.3)] transition-all">
                    <TerminalIcon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-xl font-bold text-white tracking-widest group-hover:text-primary transition-colors">{cmd.name}</span>
                </div>
                
                <div className="flex-1">
                  <p className="font-body text-white/40 text-sm group-hover:text-white/60 transition-colors">{cmd.desc}</p>
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-black/40 rounded-xl p-4 font-mono text-[10px] border border-white/5 group-hover:border-primary/10 transition-all relative overflow-hidden">
                    {/* Terminal Scanline */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-scanline pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/20 uppercase tracking-widest">Response</span>
                      <span className="text-primary font-bold">{cmd.status}</span>
                    </div>
                    <span className="text-white/70 block break-all">{cmd.output}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
