// FILE: components/ui/GlassCard.tsx
'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hoverGlow?: boolean
  animate?: boolean
  delay?: number
  onClick?: () => void
}

export default function GlassCard({
  children,
  className,
  hoverGlow = false,
  animate = true,
  delay = 0,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 12 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.35, delay, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClick}
      className={cn(
        'glass rounded-radius-4',
        hoverGlow && 'card-hover cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

