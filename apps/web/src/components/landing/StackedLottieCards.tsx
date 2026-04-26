// FILE: components/landing/StackedLottieCards.tsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import LottieAnimation from '@/components/ui/LottieAnimation'

const steps = [
  {
    title: 'Link Community',
    desc: 'Connect your Discord server in seconds. Our gateway securely syncs your community with the sovereign blockchain.',
    note: 'STEP_01: CONNECTION',
    lottie: 'https://assets10.lottiefiles.com/packages/lf20_9n6fsc0i.json', // Connection
    color: 'from-primary/20'
  },
  {
    title: 'Contribute & Earn',
    desc: 'Members earn real assets by contributing hashpower. No complex setup—just simple, rewarding participation.',
    note: 'STEP_02: CONTRIBUTION',
    lottie: 'https://assets5.lottiefiles.com/packages/lf20_vnikbeve.json', // Active Mining / Pulse
    color: 'from-accent/20'
  },
  {
    title: 'Trade Instantly',
    desc: 'Swap assets and grow your economy with lightning-fast speeds. We use direct on-chain finality to skip the slow middlemen.',
    note: 'STEP_03: GROWTH',
    lottie: 'https://assets10.lottiefiles.com/packages/lf20_qpwb7tnd.json', // Exchange/Trade
    color: 'from-primary/20'
  }
]

export default function StackedLottieCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <section ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        
        {/* Persistent Technical Background for the Stack */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <LottieAnimation 
            url="https://assets2.lottiefiles.com/packages/lf20_5njp3v9m.json" // Technical grid pulse
            className="w-full h-full object-cover"
          />
        </div>

        {/* Section Header */}
        <div className="absolute top-12 left-0 right-0 flex flex-col items-center text-center z-50 pointer-events-none">
          <p className="text-[9px] font-mono font-bold uppercase tracking-[0.8em] text-primary/60 mb-2">
            SYSTEM_LIFECYCLE_SEQUENCE
          </p>
        </div>

        <div className="relative w-full max-w-6xl aspect-[16/10] md:aspect-[21/9] px-6">
          {steps.map((step, i) => {
            const start = i / steps.length
            const end = (i + 1) / steps.length
            
            // "Peel Off" Logic
            // The card stays visible until its turn ends, then it slides out
            // We use a custom transform to make it feel like it's being removed
            const translateY = useTransform(scrollYProgress, [end - 0.1, end], ["0%", "-120%"])
            const rotate = useTransform(scrollYProgress, [end - 0.1, end], [0, -10])
            const opacity = useTransform(scrollYProgress, [start, start + 0.05], [0, 1])
            const scale = useTransform(scrollYProgress, [start, start + 0.1], [0.9, 1])

            // If it's not the last card, it should disappear
            // If it is the last card, it should stay until the container ends
            const isLast = i === steps.length - 1

            return (
              <motion.div
                key={step.title}
                style={{ 
                  y: isLast ? 0 : translateY,
                  rotateZ: isLast ? 0 : rotate,
                  opacity,
                  scale,
                  zIndex: steps.length - i // Top card is first
                }}
                className="absolute inset-x-6 inset-y-0 rounded-[3.5rem] border border-white/10 bg-[#0A1A17]/95 backdrop-blur-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_60px_120px_rgba(0,0,0,0.9)]"
              >
                {/* Visual Side */}
                <div className={`relative w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-br ${step.color} to-transparent flex items-center justify-center p-16`}>
                  <LottieAnimation 
                    url={step.lottie} 
                    className="w-full h-full max-w-sm drop-shadow-[0_0_80px_rgba(0,201,177,0.4)]"
                  />
                  
                  <div className="absolute top-10 left-10 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl border border-primary/40 flex items-center justify-center font-mono text-sm font-bold text-primary shadow-[0_0_15px_rgba(0,201,177,0.3)]">
                      0{i + 1}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full p-10 md:p-20 flex flex-col justify-center gap-10 border-t md:border-t-0 md:border-l border-white/5">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-[1px] w-8 bg-primary" />
                      <p className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] font-bold">
                        {step.note}
                      </p>
                    </div>
                    <h3 className="font-title text-4xl md:text-6xl font-bold uppercase tracking-widest text-white leading-none">
                      {step.title.split(' ')[0]} <br />
                      <span className="text-white/20">{step.title.split(' ').slice(1).join(' ')}</span>
                    </h3>
                  </div>
                  
                  <p className="font-body text-white/60 text-xl leading-relaxed max-w-md tracking-tight">
                    {step.desc}
                  </p>

                  <div className="flex flex-col gap-2">
                    <div className="h-[1px] w-full bg-white/5" />
                    <div className="flex justify-between items-center px-2">
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">Sequence_Integrity</span>
                      <span className="text-[10px] font-mono text-primary uppercase font-bold animate-pulse">Verified</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
