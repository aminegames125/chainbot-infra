// FILE: components/ui/MintAlert.tsx
'use client'
import { AlertTriangle, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MintAlertProps {
  count: number
}

export default function MintAlert({ count }: MintAlertProps) {
  const [dismissed, setDismissed] = useState(false)

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center gap-3 rounded-xl border border-accent-red/30 bg-accent-red/10 px-4 py-3"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 text-accent-red" />
          <div className="flex-1">
            <p className="font-heading text-sm font-semibold text-accent-red">
              ⚠ UNAUTHORIZED MINT DETECTED
            </p>
            <p className="mt-0.5 text-xs text-text-secondary">
              {count} unauthorized mint event{count !== 1 ? 's' : ''} detected from non-MintController
              addresses. Verify immediately.
            </p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="ml-auto rounded-lg p-1 text-text-muted transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent-purple/50 focus-visible:outline-none"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
