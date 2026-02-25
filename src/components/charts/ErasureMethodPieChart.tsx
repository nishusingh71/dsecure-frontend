// ✅ NAYA CODE: Isolated PieChart component to prevent infinite re-render loops
// This component is wrapped in React.memo so it ONLY re-renders when its data actually changes.
// This isolates the Recharts layout calculations from the parent component's useEffect cascades.
import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

// ✅ Stable style objects defined OUTSIDE the component to prevent re-creation on every render
const tooltipContentStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "8px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  border: "1px solid #e2e8f0",
  fontSize: "14px",
};

const tooltipItemStyle = { color: "#1e293b" };

const legendWrapperStyle = {
  fontSize: "14px",
  paddingTop: "20px",
};

interface MethodMetric {
  methodName: string;
  count: number;
  successRate: number;
  avgDuration: string;
}

interface ErasureMethodPieChartProps {
  methodMetrics: MethodMetric[] | undefined | null;
}

const ErasureMethodPieChart: React.FC<ErasureMethodPieChartProps> = React.memo(
  ({ methodMetrics }) => {
    // Compute total once, memoized
    const total = useMemo(() => {
      if (!methodMetrics || methodMetrics.length === 0) return 0;
      return methodMetrics.reduce((acc, curr) => acc + curr.count, 0);
    }, [methodMetrics]);

    // Stable formatter function using memoized total
    const tooltipFormatter = useMemo(() => {
      return (value: any, name: any) => {
        const t = total || 1;
        const percent = ((value / t) * 100).toFixed(1);
        return [`${value} (${percent}%)`, name];
      };
    }, [total]);

    if (!methodMetrics || methodMetrics.length === 0) {
      return (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 italic text-sm">
          No erasure data found
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={methodMetrics as any}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={5}
            dataKey="count"
            nameKey="methodName"
            isAnimationActive={false}
          >
            {methodMetrics.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                strokeWidth={2}
                stroke="#fff"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={tooltipContentStyle}
            itemStyle={tooltipItemStyle}
            formatter={tooltipFormatter}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={10}
            wrapperStyle={legendWrapperStyle}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  },
);

ErasureMethodPieChart.displayName = "ErasureMethodPieChart";

export default ErasureMethodPieChart;
