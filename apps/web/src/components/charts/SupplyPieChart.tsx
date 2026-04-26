// FILE: components/charts/SupplyPieChart.tsx
'use client'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface SupplyData {
  totalSupply: number
  circulating: number
  burned: number
}

const COLORS = {
  'Total Supply': '#7F77DD',
  Circulating: '#4FFFD4',
  Burned: '#FF4D6D',
}

const tooltipStyle = {
  background: 'rgba(14,14,26,0.95)',
  border: '1px solid rgba(127,119,221,0.25)',
  borderRadius: '12px',
  backdropFilter: 'blur(20px)',
}

export default function SupplyPieChart({ totalSupply, circulating, burned }: SupplyData) {
  const data = [
    { name: 'Total Supply', value: totalSupply - circulating - burned },
    { name: 'Circulating', value: circulating },
    { name: 'Burned', value: burned },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={3}
          cornerRadius={4}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={COLORS[entry.name as keyof typeof COLORS]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={{ color: '#F0EFFF' }}
          itemStyle={{ color: '#A89AF0' }}
          formatter={(value: any) => [Number(value).toLocaleString(), '']}
        />
        <Legend
          wrapperStyle={{ color: '#8B8BA8', fontSize: 12 }}
          formatter={(value) => (
            <span style={{ color: '#8B8BA8', fontFamily: 'var(--font-inter)' }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
