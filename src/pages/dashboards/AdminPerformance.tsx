import Sparkline from "@/components/Sparkline";
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import BarChart from "@/components/BarChart";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import { useAuth } from "@/auth/AuthContext";
import { apiClient } from "@/utils/enhancedApiClient";
import { ErasureLogEntry, MethodMetric } from "@/services/adminDashboardAPI";
import { usePerformanceData } from "@/hooks/usePerformanceData";
import { useErasureMetrics } from "@/hooks/useErasureMetrics";
import { useSubusers } from "@/hooks/useSubusers";
import { useAuditReports } from "@/hooks/useAuditReports";
import { useUserMachines } from "@/hooks/useUserMachines";
import { authService } from "@/utils/authService";
import {
  isDemoMode,
  DEMO_PERFORMANCE_DATA,
  DEMO_SUBUSERS,
} from "@/data/demoData";
import { Helmet } from "react-helmet-async";

interface PerformanceData {
  monthlyErasures: { month: string; count: number }[];
  avgDuration: { month: string; duration: number }[];
  throughput: { month: string; count: number }[];
  successRate: string;
  successCount: number;
  failureCount: number;
  erasureLog?: ErasureLogEntry[];
  methodMetrics?: MethodMetric[];
}

// ✅ Date Helper Functions
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const getPreviousMonthDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date;
};

const formatDateToYYYYMMDD = (date: Date): string => {
  return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
};

const isValidDateFormat = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString === formatDateToYYYYMMDD(date);
};

// ✅ Custom DateInput Component using native date picker for better UX
const CustomDateInput = ({
  label,
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        type="date"
        className="w-full border rounded-lg px-3 py-2 text-sm xs:text-base sm:text-sm focus:ring-2 focus:ring-brand focus:border-transparent"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // Use max to prevent future dates if needed, or min for past
        max="9999-12-31"
      />
    </div>
  );
};

export default function AdminPerformance() {
  const { showError } = useNotification();
  const { user } = useAuth();
  const isDemo = isDemoMode();

  // ✅ Get current user email robustly (from AdminReports logic)
  const getUserEmail = (): string => {
    const storedUser = localStorage.getItem("user_data");
    const authUser = localStorage.getItem("authUser");

    let storedUserData = null;
    if (storedUser) {
      try {
        storedUserData = JSON.parse(storedUser);
      } catch (e) {
        console.error("Error parsing user_data:", e);
      }
    }

    if (!storedUserData && authUser) {
      try {
        storedUserData = JSON.parse(authUser);
      } catch (e) {
        console.error("Error parsing authUser:", e);
      }
    }

    const jwtUser = authService.getUserFromToken();
    return (
      storedUserData?.user_email || jwtUser?.user_email || jwtUser?.email || ""
    );
  };

  const currentUserEmail = getUserEmail();

  // --- Filter States ---
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>(""); // "" means My Reports (Current User)
  const [dateValidationError, setDateValidationError] = useState("");

  // --- Data Fetching ---

  // 1. Fetch Subusers for Dropdown
  const { data: subusers = isDemo ? DEMO_SUBUSERS : [] } = useSubusers(
    currentUserEmail,
    !!currentUserEmail && !isDemo,
  );

  // 2. Fetch Erasure Metrics
  const metricsFilters = useMemo(() => {
    let targetEmails: string[] = [];
    const effectiveUserEmail = currentUserEmail; // Use the robustly fetched email

    if (selectedUserEmail === "" || selectedUserEmail === "my") {
      // My Reports
      if (effectiveUserEmail) targetEmails = [effectiveUserEmail];
    } else if (selectedUserEmail === "all") {
      // All Reports (Me + Subusers)
      if (effectiveUserEmail) targetEmails = [effectiveUserEmail];
      subusers.forEach((sub: any) => {
        if (sub.subuser_email || sub.email)
          targetEmails.push(sub.subuser_email || sub.email);
      });
    } else {
      // Specific Subuser
      targetEmails = [selectedUserEmail];
    }

    // Fallback if empty and we have a user
    if (targetEmails.length === 0 && effectiveUserEmail) {
      targetEmails = [effectiveUserEmail];
    }

    return {
      userEmails: targetEmails,
      year: selectedYear,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
    };
  }, [
    selectedUserEmail,
    selectedYear,
    fromDate,
    toDate,
    currentUserEmail,
    subusers,
  ]);

  const {
    data: erasureMetrics,
    isLoading: metricsLoading,
    isError: metricsError,
  } = useErasureMetrics(metricsFilters, !isDemo);

  // --- Demo Mode Data ---
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    monthlyErasures: [],
    avgDuration: [],
    throughput: [],
    successRate: "0%",
    successCount: 0,
    failureCount: 0,
  });

  useEffect(() => {
    if (isDemo) {
      setPerformanceData(DEMO_PERFORMANCE_DATA as unknown as PerformanceData);
    } else if (erasureMetrics) {
      // Map API response to component state
      setPerformanceData({
        monthlyErasures: erasureMetrics.monthlyMetrics.map((m: any) => ({
          month: m.month,
          count: m.erasureCount,
        })),
        avgDuration: [{ month: "Avg", duration: 0 }], // Placeholder
        throughput: [], // Not provided by new API yet
        successRate: `${erasureMetrics.successRate}%`,
        successCount: 0, // Not explicitly in new response
        failureCount: 0,
        erasureLog: erasureMetrics.erasureLog || [],
        methodMetrics: erasureMetrics.methodMetrics || [],
      });
    }
  }, [isDemo, erasureMetrics]);

  const clearAllFilters = () => {
    setSelectedYear(new Date().getFullYear());
    setFromDate("");
    setToDate("");
    setSelectedUserEmail("");
    setDateValidationError("");
  };

  const loading = isDemo ? false : metricsLoading;

  if (loading) {
    /* 
    // ********** PURANA CODE (simple spinner) **********
    // return (
    //   <div className="min-h-screen flex items-center justify-center bg-gray-50">
    //     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
    //   </div>
    // );
    // *******************************************
    */

    // ********** NAYA CODE — Shimmer Skeleton UI **********
    return (
      <div className="space-y-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 animate-pulse">
        {/* Header Skeleton */}
        <div>
          <div className="h-7 bg-slate-200 rounded w-40 mb-2" />
          <div className="h-4 bg-slate-100 rounded w-64" />
        </div>

        {/* 3 Metric Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <div className="h-4 bg-slate-200 rounded w-24 mb-3" />
              <div className="h-8 bg-slate-200 rounded w-20 mb-4" />
              <div className="h-16 bg-slate-100 rounded" />
            </div>
          ))}
        </div>

        {/* Chart Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="h-5 bg-slate-200 rounded w-48 mb-6" />
          <div className="h-64 bg-slate-100 rounded-lg" />
        </div>
      </div>
    );
    // *******************************************
  }

  // Check for error or empty data state
  const isDataEmpty =
    !isDemo &&
    (metricsError ||
      !erasureMetrics ||
      (erasureMetrics.totalErasures === 0 &&
        !erasureMetrics.monthlyMetrics?.some((m: any) => m.erasureCount > 0)));

  if (isDataEmpty) {
    return (
      <>
        <SEOHead seo={getSEOForPage("admin-performance")} />
        <Helmet>
          <title>DSecureTech Performance | System Performance</title>
        </Helmet>
        <div className="space-y-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
          {/* Header & Filters (Still visible to allow changing filters) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Performance</h1>
              <p className="text-sm text-slate-600 mt-1">
                Monitor system performance and erasure metrics
              </p>
            </div>
          </div>

          {/* Filters Card - Matching AdminReports Style */}
          {!isDemo && (
            <div className="card p-4 space-y-4 bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
                  Filters & Search
                </h3>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 xs:gap-4 sm:gap-4">
                {/* User Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Report Owner
                  </label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 text-sm xs:text-base sm:text-sm focus:ring-2 focus:ring-brand focus:border-transparent"
                    value={selectedUserEmail}
                    onChange={(e) => setSelectedUserEmail(e.target.value)}
                  >
                    <option value="">My Reports</option>
                    <option value="all">All Reports (Me + Subusers)</option>
                    <optgroup label="Subuser Reports">
                      {subusers.map((subuser: any) => (
                        <option
                          key={subuser.subuser_email || subuser.email}
                          value={subuser.subuser_email || subuser.email}
                        >
                          {subuser.subuser_name ||
                            subuser.name ||
                            subuser.subuser_email ||
                            subuser.email}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Year Selector */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Year
                  </label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 text-sm xs:text-base sm:text-sm focus:ring-2 focus:ring-brand focus:border-transparent"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                  >
                    {Array.from(
                      { length: 5 },
                      (_, i) => new Date().getFullYear() - i,
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range Filter */}
                <CustomDateInput
                  label="From Date"
                  value={fromDate}
                  onChange={(value) => {
                    setFromDate(value);
                    // Validate date range
                    if (value && toDate && new Date(value) > new Date(toDate)) {
                      setDateValidationError(
                        "From date cannot be later than To date.",
                      );
                    } else {
                      setDateValidationError("");
                    }
                  }}
                />

                {/* To Date Filter */}
                <CustomDateInput
                  label="To Date"
                  value={toDate}
                  onChange={(value) => {
                    setToDate(value);
                    // Validate date range
                    if (
                      value &&
                      fromDate &&
                      new Date(fromDate) > new Date(value)
                    ) {
                      setDateValidationError(
                        "To date cannot be earlier than From date.",
                      );
                    } else {
                      setDateValidationError("");
                    }
                  }}
                />
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center mt-6">
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
        </div>
      </>
    );
  }

  // Calculate Display Values
  const totalErasures = isDemo
    ? DEMO_PERFORMANCE_DATA.monthlyErasures.reduce(
        (sum: number, item: any) => sum + item.count,
        0,
      )
    : erasureMetrics?.totalErasures || 0;

  const avgDurationDisplay = isDemo
    ? "15m 30s"
    : erasureMetrics?.avgDuration || "0m 0s";
  const successRate = isDemo ? "98%" : `${erasureMetrics?.successRate || 0}%`;

  return (
    <>
      <SEOHead seo={getSEOForPage("admin-performance")} />
      <Helmet>
        <title>DSecureTech Performance | System Performance</title>
      </Helmet>

      <div className="space-y-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Performance</h1>
            <p className="text-sm text-slate-600 mt-1">
              Monitor system performance and erasure metrics
            </p>
          </div>
        </div>

        {/* Filters Card - Matching AdminReports Style */}
        {!isDemo && (
          <div className="card p-4 space-y-4 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                Filters & Search
              </h3>
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 xs:gap-4 sm:gap-4">
              {/* User Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Report Owner
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2 text-sm xs:text-base sm:text-sm focus:ring-2 focus:ring-brand focus:border-transparent"
                  value={selectedUserEmail}
                  onChange={(e) => setSelectedUserEmail(e.target.value)}
                >
                  <option value="">My Reports</option>
                  <option value="all">All Reports (Me + Subusers)</option>
                  <optgroup label="Subuser Reports">
                    {subusers.map((subuser: any) => (
                      <option
                        key={subuser.subuser_email || subuser.email}
                        value={subuser.subuser_email || subuser.email}
                      >
                        {subuser.subuser_name ||
                          subuser.name ||
                          subuser.subuser_email ||
                          subuser.email}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Year Selector */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Year
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2 text-sm xs:text-base sm:text-sm focus:ring-2 focus:ring-brand focus:border-transparent"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                  {Array.from(
                    { length: 5 },
                    (_, i) => new Date().getFullYear() - i,
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <CustomDateInput
                label="From Date"
                value={fromDate}
                onChange={(value) => {
                  setFromDate(value);
                  // Validate date range
                  if (value && toDate && new Date(value) > new Date(toDate)) {
                    setDateValidationError(
                      "From date cannot be later than To date.",
                    );
                  } else {
                    setDateValidationError("");
                  }
                }}
              />

              {/* To Date Filter */}
              <CustomDateInput
                label="To Date"
                value={toDate}
                onChange={(value) => {
                  setToDate(value);
                  // Validate date range
                  if (
                    value &&
                    fromDate &&
                    new Date(fromDate) > new Date(value)
                  ) {
                    setDateValidationError(
                      "To date cannot be earlier than From date.",
                    );
                  } else {
                    setDateValidationError("");
                  }
                }}
              />

              {/* Date Validation Error */}
              {dateValidationError && (
                <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-6 text-red-500 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
                  ⚠️ {dateValidationError}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Top 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* Erasure Method Distribution (Pie Chart) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full min-h-[400px]">
            <div className="mb-6">
              <p className="text-base md:text-lg text-slate-500 mb-2 font-medium">
                Erasure Method Distribution
              </p>
              <p className="text-3xl md:text-4xl font-bold text-slate-900">
                {performanceData.methodMetrics &&
                performanceData.methodMetrics.length > 0
                  ? performanceData.methodMetrics
                      .reduce((acc, curr) => acc + curr.count, 0)
                      .toLocaleString()
                  : 0}
              </p>
            </div>
            <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                <PieChart>
                  <Pie
                    data={(performanceData.methodMetrics || []) as any}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="methodName"
                  >
                    {(performanceData.methodMetrics || []).map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          strokeWidth={2}
                          stroke="#fff"
                        />
                      ),
                    )}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      border: "1px solid #e2e8f0",
                      fontSize: "14px",
                    }}
                    itemStyle={{ color: "#1e293b" }}
                    formatter={(value: any, name: any, props: any) => {
                      const total =
                        performanceData.methodMetrics?.reduce(
                          (acc, curr) => acc + curr.count,
                          0,
                        ) || 1;
                      const percent = ((value / total) * 100).toFixed(1);
                      return [`${value} (${percent}%)`, name];
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{
                      fontSize: "14px",
                      paddingTop: "20px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <div className="mb-4">
              <p className="text-sm text-slate-500 mb-1">
                Erasure Method Distribution
              </p>
              {performanceData.methodMetrics &&
                performanceData.methodMetrics.length > 0 && (
                  <p className="text-2xl font-bold text-slate-900">
                    {performanceData.methodMetrics.reduce(
                      (acc, curr) => acc + curr.count,
                      0,
                    )}
                  </p>
                )}
            </div>
            <div className="flex-1 overflow-y-auto max-h-48 pr-2 space-y-3 custom-scrollbar">
              {performanceData.methodMetrics &&
              performanceData.methodMetrics.length > 0 ? (
                performanceData.methodMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col text-sm border-b border-slate-50 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className="font-medium text-slate-700 truncate max-w-[150px]"
                        title={metric.methodName}
                      >
                        {metric.methodName}
                      </span>
                      <span className="font-bold text-slate-900">
                        {metric.count}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                      <span>Avg: {metric.avgDuration}</span>
                      <span className="text-green-600 font-medium">
                        {metric.successRate}% Success
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div
                        className="bg-green-500 h-1.5 rounded-full"
                        style={{ width: `${metric.successRate}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : performanceData.erasureLog &&
                performanceData.erasureLog.length > 0 ? (
                // Fallback to erasureLog if methodMetrics not available (backend backward compatibility)
                performanceData.erasureLog.slice(0, 5).map((log, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0"
                  >
                    <div className="flex flex-col">
                      <span
                        className="font-medium text-slate-700 truncate max-w-[120px]"
                        title={log.user_email}
                      >
                        {log.user_email.split("@")[0]}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          log.method.includes("DoD")
                            ? "bg-blue-100 text-blue-700"
                            : log.method.includes("NIST")
                              ? "bg-purple-100 text-purple-700"
                              : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {log.method}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
                  No erasure data found
                </div>
              )}
            </div>
          </div> */}

          {/* Success Rate */}
          {/* <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="mb-4">
              <p className="text-sm text-slate-500 mb-1">Success Rate</p>
              <p className="text-3xl font-bold text-slate-900">{successRate}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-6">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: successRate }}
              ></div>
            </div>
          </div> */}
        </div>

        {/* Throughput Chart (Monthly breakdown) */}
        {/* <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Erasure Trends ({selectedYear})
          </h3>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {performanceData.monthlyErasures.length > 0 ? (
              performanceData.monthlyErasures.map((item, index) => {
                const maxCount = Math.max(
                  ...performanceData.monthlyErasures.map((i) => i.count),
                  1,
                );
                const barHeight = (item.count / maxCount) * 100;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1 group h-full justify-end"
                  >
                    <div className="relative w-full mx-1 flex items-end justify-center h-[85%]">
                      <div
                        style={{ height: `${barHeight}%` }}
                        className="w-full max-w-[40px] bg-blue-500 rounded-t-md transition-all duration-300 group-hover:bg-blue-600"
                      >
                        
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity pointer-events-none z-10">
                          {item.count} Erasures
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-2 font-medium h-[15%]">
                      {item.month}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                No data available for this period
              </div>
            )}
          </div>
        </div> */}
      </div>
    </>
  );
}
