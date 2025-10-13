type SparklineProps = {
  data: number[]
  width?: number
  height?: number
  stroke?: string
  fill?: string
}

export default function Sparkline({ data, width = 240, height = 64, stroke = '#2563eb', fill = 'rgba(37,99,235,0.12)' }: SparklineProps) {
  if (!data.length) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const norm = (v: number) => (max === min ? 0.5 : (v - min) / (max - min))
  const step = width / (data.length - 1)

  const points = data.map((v, i) => ({ x: i * step, y: height - norm(v) * height }))
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ')
  const area = `${path} L ${width} ${height} L 0 ${height} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} role="img" aria-label="Sparkline chart">
      <path d={area} fill={fill} />
      <path d={path} fill="none" stroke={stroke} strokeWidth={2} />
    </svg>
  )
}


