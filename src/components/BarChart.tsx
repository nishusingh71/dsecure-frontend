type BarChartProps = {
  data: number[]
  labels?: string[]
  width?: number
  height?: number
  color?: string
}

export default function BarChart({ data, labels = [], width = 480, height = 160, color = '#60a5fa' }: BarChartProps) {
  if (!data.length) return null
  const max = Math.max(...data, 1)
  const barW = width / (data.length * 1.5)
  const gap = barW / 2
  return (
    <svg viewBox={`0 0 ${width} ${height + 24}`} width="100%" height={height + 24} role="img" aria-label="Bar chart">
      {data.map((v, i) => {
        const h = (v / max) * height
        const x = i * (barW + gap) + gap
        const y = height - h
        return <rect key={i} x={x} y={y} width={barW} height={h} fill={color} rx={4} />
      })}
      {labels.length === data.length && labels.map((l, i) => (
        <text key={i} x={i * (barW + gap) + gap + barW / 2} y={height + 16} fontSize={10} textAnchor="middle" fill="#64748b">{l}</text>
      ))}
    </svg>
  )
}


