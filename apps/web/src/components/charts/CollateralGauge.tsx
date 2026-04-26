// FILE: components/charts/CollateralGauge.tsx
'use client'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

interface CollateralGaugeProps {
  ratio: number // 0-200+
}

export default function CollateralGauge({ ratio }: CollateralGaugeProps) {
  const fill = ratio >= 150 ? '#4FFFD4' : ratio >= 120 ? '#FFB547' : '#FF4D6D'
  const clamped = Math.min(ratio, 200)

  const data = [{ name: 'CR', value: clamped, fill }]

  return (
    <div className="relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height={240}>
        <RadialBarChart
          cx="50%"
          cy="80%"
          innerRadius="60%"
          outerRadius="90%"
          startAngle={180}
          endAngle={0}
          data={data}
          barSize={18}
        >
          {/* Background track */}
          <RadialBar
            background={{ fill: 'rgba(255,255,255,0.04)' }}
            dataKey="value"
            cornerRadius={8}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      {/* Center label */}
      <div className="pointer-events-none absolute bottom-6 flex flex-col items-center">
        <span
          className="font-mono text-3xl font-bold"
          style={{ color: fill, fontFamily: 'var(--font-jetbrains-mono)' }}
        >
          {ratio.toFixed(0)}%
        </span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-text-muted">
          Global CR
        </span>
      </div>
    </div>
  )
}
