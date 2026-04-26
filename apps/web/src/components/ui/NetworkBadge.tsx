// FILE: components/ui/NetworkBadge.tsx
export default function NetworkBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_var(--color-success)]" />
      <span
        className="font-mono text-xs font-semibold text-text-muted"
      >
        ChainBot &bull; 13371
      </span>
    </span>
  )
}

