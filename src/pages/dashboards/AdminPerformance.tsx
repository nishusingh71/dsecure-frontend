import Sparkline from "@/components/Sparkline";
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import BarChart from "@/components/BarChart";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import { useAuth } from "@/auth/AuthContext";
import { apiClient } from "@/utils/enhancedApiClient";
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
}

// ✅ Date Helper Functions
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
  }, [selectedUserEmail, selectedYear, fromDate, toDate, currentUserEmail, subusers]);

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
        monthlyErasures: erasureMetrics.monthlyMetrics.map((m) => ({
          month: m.month,
          count: m.erasureCount,
        })),
        avgDuration: [{ month: "Avg", duration: 0 }], // Placeholder
        throughput: [], // Not provided by new API yet
        successRate: `${erasureMetrics.successRate}%`,
        successCount: 0, // Not explicitly in new response
        failureCount: 0,
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Monthly Erasures */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="mb-4">
              <p className="text-sm text-slate-500 mb-1">Total Erasures</p>
              <p className="text-3xl font-bold text-slate-900">
                {totalErasures.toLocaleString()}
              </p>
            </div>
            {/* Simple sparkline visualization */}
            <div className="h-16 flex items-end gap-1">
              {performanceData.monthlyErasures.map((m, i) => {
                const max = Math.max(
                  ...performanceData.monthlyErasures.map((x) => x.count),
                  1,
                );
                const height = Math.max((m.count / max) * 100, 5); // min 5% height
                return (
                  <div
                    key={i}
                    className="flex-1 bg-blue-100 rounded-t hover:bg-blue-200 transition-colors relative group"
                  >
                    <div
                      style={{ height: `${height}%` }}
                      className="bg-blue-500 rounded-t w-full bottom-0 absolute"
                    ></div>
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded z-10 pointer-events-none">
                      {m.month}: {m.count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Average Duration */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="mb-4">
              <p className="text-sm text-slate-500 mb-1">Avg. Duration</p>
              <p className="text-3xl font-bold text-slate-900">
                {avgDurationDisplay}
              </p>
            </div>
            <div className="h-16 flex items-center justify-center text-slate-300">
              <svg
                className="w-12 h-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Success Rate */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
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
          </div>
        </div>

        {/* Throughput Chart (Monthly breakdown) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
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
                        {/* Tooltip */}
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
        </div>
      </div>
    </>
  );
}
