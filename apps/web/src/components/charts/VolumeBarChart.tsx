// FILE: components/charts/VolumeBarChart.tsx
'use client'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export interface VolumeData {
  day: string
  volume: number
}

const tooltipStyle = {
  background: 'rgba(14,14,26,0.95)',
  border: '1px solid rgba(127,119,221,0.25)',
  borderRadius: '12px',
  backdropFilter: 'blur(20px)',
}

export default function VolumeBarChart({ data }: { data: VolumeData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7F77DD" stopOpacity={1} />
            <stop offset="100%" stopColor="#7F77DD" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis
          dataKey="day"
          stroke="transparent"
          tick={{ fill: '#8B8BA8', fontSize: 11, fontFamily: 'var(--font-jetbrains-mono)' }}
        />
        <YAxis
          stroke="transparent"
          tick={{ fill: '#8B8BA8', fontSize: 11 }}
          width={60}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={{ color: '#F0EFFF' }}
          itemStyle={{ color: '#A89AF0' }}
          formatter={(v: any) => [`$${Number(v).toLocaleString()}`, 'Volume']}
        />
        <Bar dataKey="volume" fill="url(#purpleGradient)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
