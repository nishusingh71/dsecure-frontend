import React from "react";
import ErasureMethodPieChart from "@/components/charts/ErasureMethodPieChart";
import { type MethodMetric } from "@/services/adminDashboardAPI";

interface PerformanceTabProps {
  erasureMetricsLoading: boolean;
  displayErasureMetrics: {
    totalErasures: number;
    monthlyMetrics: { month: string; erasureCount: number }[];
    avgDuration: string;
    successRate: number;
    methodMetrics: MethodMetric[];
  } | null;
  erasureMetricsError: any;
}

const PerformanceTab: React.FC<PerformanceTabProps> = ({
  erasureMetricsLoading,
  displayErasureMetrics,
  erasureMetricsError,
}) => {
  if (erasureMetricsLoading && !displayErasureMetrics) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-slate-600">
            Loading performance data...
          </p>
        </div>
      </div>
    );
  }

  if (erasureMetricsError || !displayErasureMetrics) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
        <svg
          className="w-16 h-16 text-slate-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          No Performance Metrics Available
        </h3>
        <p className="text-slate-600">
          There are no performance metrics to display for this account.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Performance</h2>
          <p className="text-sm text-slate-600 mt-1">
            Monitor system performance and erasure metrics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* Erasure Method Distribution (Pie Chart) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[400px]">
          <div className="mb-6">
            <p className="text-base md:text-lg text-slate-500 mb-2 font-medium">
              Erasure Method Breakdown
            </p>
            <p className="text-3xl md:text-4xl font-bold text-slate-900">
              {displayErasureMetrics?.methodMetrics &&
              displayErasureMetrics.methodMetrics.length > 0
                ? displayErasureMetrics.methodMetrics
                    .reduce(
                      (acc: number, curr: MethodMetric) => acc + curr.count,
                      0,
                    )
                    .toLocaleString()
                : 0}
            </p>
          </div>
          <div className="flex-1 w-full relative min-h-[300px]">
            <ErasureMethodPieChart
              methodMetrics={displayErasureMetrics?.methodMetrics}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTab;
