// FILE: src/components/ui/HashDisplay.tsx
'use client'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { formatHash } from '@/lib/utils'

interface HashDisplayProps {
  hash: string
  chars?: number
  className?: string
}

export default function HashDisplay({ hash, chars = 8, className }: HashDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <span
        className="font-mono text-sm text-white/90"
        title={hash}
      >
        {formatHash(hash, chars)}
      </span>
      <button
        onClick={handleCopy}
        className="rounded p-1 text-zinc-500 transition-colors hover:text-white"
        aria-label="Copy hash"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-white" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </span>
  )
}
