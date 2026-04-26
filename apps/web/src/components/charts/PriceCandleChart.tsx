// FILE: components/charts/PriceCandleChart.tsx
'use client'
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export interface CandleData {
  time: string
  open: number
  high: number
  low: number
  close: number
}

// Custom candle shape
const CandleShape = (props: {
  x?: number
  y?: number
  width?: number
  height?: number
  open?: number
  close?: number
  high?: number
  low?: number
}) => {
  const { x = 0, y = 0, width = 0, height = 0 } = props
  const open = props.open ?? 0
  const close = props.close ?? 0
  const isGreen = close >= open
  const color = isGreen ? '#4FFFD4' : '#FF4D6D'

  if (!width || !height) return null

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={Math.abs(height)}
      fill={color}
      fillOpacity={0.85}
      rx={2}
    />
  )
}

const tooltipStyle = {
  background: 'rgba(14,14,26,0.95)',
  border: '1px solid rgba(127,119,221,0.25)',
  borderRadius: '12px',
  backdropFilter: 'blur(20px)',
}

export default function PriceCandleChart({ data }: { data: CandleData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="candleGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7F77DD" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#7F77DD" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis
          dataKey="time"
          stroke="transparent"
          tick={{ fill: '#8B8BA8', fontSize: 11, fontFamily: 'var(--font-jetbrains-mono)' }}
        />
        <YAxis
          stroke="transparent"
          tick={{ fill: '#8B8BA8', fontSize: 11 }}
          width={60}
          tickFormatter={(v) => `$${v.toFixed(4)}`}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={{ color: '#F0EFFF' }}
          itemStyle={{ color: '#A89AF0' }}
        />
        <Bar dataKey="close" shape={<CandleShape />} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
