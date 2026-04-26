// FILE: components/landing/HowItWorks.tsx
'use client'
import { motion } from 'framer-motion'
import { Link as LinkIcon, Pickaxe, Repeat, Code2 } from 'lucide-react'

function StepVisual({ index }: { index: number }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black/40">
      {/* Micro Grid */}
      <div className="absolute inset-0 opacity-[0.1]" style={{ 
        backgroundImage: `linear-gradient(to right, #1A3A35 1px, transparent 1px), linear-gradient(to bottom, #1A3A35 1px, transparent 1px)`,
        backgroundSize: '15px 15px'
      }} />
      
      {/* Geometric Technical Shapes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
          className="w-1/2 aspect-square border border-primary/20 rounded-full flex items-center justify-center"
        >
          <div className="w-3/4 aspect-square border border-white/5 rounded-full" />
        </motion.div>
      </div>

      {/* Moving Particles (CSS only) */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ 
              y: [-20, 20],
              x: [-10, 10],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 3 + i, repeat: Infinity, repeatType: "mirror" }}
            className="absolute h-1 w-1 bg-primary rounded-full"
            style={{ top: `${20 * i}%`, left: `${15 * i}%` }}
          />
        ))}
      </div>
    </div>
  )
}

function StepCard({ step, index }: { step: any, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8 }}
      className="group relative flex flex-col gap-8"
    >
      {/* Visual Container */}
      <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.02] relative group-hover:border-primary/40 transition-all duration-700 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
        <StepVisual index={index} />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        
        {/* Step Index Label */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-black border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-primary group-hover:shadow-[0_0_20px_#00C9B1] transition-all">
            0{index + 1}
          </div>
          <div className="h-[1px] w-8 bg-white/10 group-hover:bg-primary/40 transition-colors" />
        </div>

        {/* Technical Title */}
        <div className="absolute bottom-8 left-8">
          <h4 className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.4em] group-hover:text-primary transition-colors">
            {step.title}
          </h4>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary">
            {step.icon}
          </div>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>
        
        <p className="font-body text-white/40 text-sm leading-relaxed">
          {step.desc}
        </p>

        <div className="inline-flex items-center gap-3 py-1.5 px-4 bg-white/[0.03] border border-white/5 rounded-full">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
          <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest">{step.note}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const steps = [
    {
      title: 'Link Community',
      desc: 'Connect your Discord server in seconds. Our gateway securely syncs your community with the sovereign blockchain.',
      note: 'STEP_01: CONNECTION',
      icon: <LinkIcon className="h-5 w-5" />
    },
    {
      title: 'Contribute & Earn',
      desc: 'Members earn real assets by contributing hashpower. No complex setup—just simple, rewarding participation.',
      note: 'STEP_02: CONTRIBUTION',
      icon: <Pickaxe className="h-5 w-5" />
    },
    {
      title: 'Trade Instantly',
      desc: 'Swap assets and grow your economy with lightning-fast speeds. We use direct on-chain finality to skip the slow middlemen.',
      note: 'STEP_03: GROWTH',
      icon: <Repeat className="h-5 w-5" />
    }
  ]

  return (
    <section className="py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-40 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-10 opacity-40">
            <div className="h-[1px] w-12 bg-white" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-white">Simple Lifecycle</span>
            <div className="h-[1px] w-12 bg-white" />
          </div>
          <h2 className="font-title text-[clamp(2.5rem,10vw,8.5rem)] font-bold uppercase tracking-[0.15em] text-hero leading-[0.85] mb-12">
            How It <br /> <span className="opacity-20">Works.</span>
          </h2>
          <p className="max-w-2xl text-lg font-body text-white/40 leading-relaxed tracking-tight">
            We’ve removed the complexity of blockchain to give your community real power, instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
      
      {/* Background Section Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ 
        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />
    </section>
  )
}
