// FILE: src/components/ui/AddressTag.tsx
'use client'
import { useState } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { formatAddress } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface AddressTagProps {
  address: string
  full?: boolean
  label?: string
  isContract?: boolean
  className?: string
  explorerLink?: boolean
}

export default function AddressTag({
  address,
  full = false,
  label,
  isContract = false,
  className,
  explorerLink = false,
}: AddressTagProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      {label && (
        <span className="rounded-md bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
          {label}
        </span>
      )}
      {isContract && (
        <span className="rounded-md bg-white px-1.5 py-0.5 text-[9px] font-bold text-black uppercase tracking-widest">
          Contract
        </span>
      )}
      <span
        className="font-mono text-sm text-white/80"
      >
        {full ? address : formatAddress(address)}
      </span>
      <button
        onClick={handleCopy}
        className="rounded p-1 text-zinc-500 transition-colors hover:text-white"
        aria-label="Copy address"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-white" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
      {explorerLink && (
        <a
          href={`/explorer/address/${address}`}
          className="rounded p-1 text-zinc-500 transition-colors hover:text-white"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </span>
  )
}
