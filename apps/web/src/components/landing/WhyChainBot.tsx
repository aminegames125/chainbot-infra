// FILE: components/landing/WhyChainBot.tsx
'use client'
import { motion, Variants } from 'framer-motion'
import { Lock, Pickaxe, BarChart3 } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'

const features = [
  {
    icon: <Lock className="h-8 w-8" />,
    accent: 'text-primary',
    bg: 'bg-primary/5',
    title: 'On-Chain Integrity',
    body: 'Every issuance is a public transaction. Admins cannot silently mint COIN. Every block is logged forever on-chain — auditable by anyone, at any time.',
  },
  {
    icon: <Pickaxe className="h-8 w-8" />,
    accent: 'text-accent',
    bg: 'bg-accent/5',
    title: 'Engineered Mining',
    body: 'Download MinerCLI and contribute real hashpower. Rewards are proportional, verifiable, and permanent. Real proof-of-work mining — no fake "economy" buttons.',
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    accent: 'text-warning',
    bg: 'bg-warning/5',
    title: 'Technical DeFi Stack',
    body: 'Trade on a built-in Uniswap V2 DEX. Mint sUSD, sEUR, sGOLD, sBTC backed by COIN collateral. Real DeFi primitives, secured by blockchain.',
  },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
}

export default function WhyChainBot() {
  return (
    <section className="py-space-16 px-space-4 sm:px-space-6 lg:px-space-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-space-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-space-3 text-xs font-bold uppercase tracking-[0.2em] text-primary"
          >
            Infrastructure
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-brand font-bold text-text uppercase"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.06em' }}
          >
            Transparent by Design.
          </motion.h2>
        </div>

        {/* 3-column feature grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 gap-space-6 md:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={item}>
              <GlassCard hoverGlow animate={false} className="flex h-full flex-col gap-space-4 p-space-8">
                <div className={`w-fit rounded-radius-3 p-3 border border-white/5 ${f.bg}`}>
                  <span className={f.accent}>{f.icon}</span>
                </div>
                <div>
                  <h3 className="font-brand mb-space-3 text-lg font-bold text-text uppercase tracking-wider">
                    {f.title}
                  </h3>
                  <p className="leading-relaxed text-text-muted text-sm font-body">{f.body}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Full-width banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-space-6"
        >
          <GlassCard
            animate={false}
            className="flex items-center justify-center px-space-8 py-space-12 text-center"
          >
            <p
              className="font-brand font-bold text-text uppercase"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.75rem)', letterSpacing: '0.1em' }}
            >
              Secured by <span className="text-primary">EVM Blockchain</span>. 
              Built for <span className="text-accent">Precision</span>.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}

