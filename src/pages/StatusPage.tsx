import { useEffect, useState } from "react";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "maintenance" | "outage";
  uptime: string;
  responseTime: string;
  lastChecked: string;
}

export default function StatusPage() {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [overallStatus, setOverallStatus] = useState<
    "operational" | "issues" | "maintenance"
  >("operational");

  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulate service status data
    const mockServices: ServiceStatus[] = [
      {
        name: "Data Erasure Service",
        status: "operational",
        uptime: "99.98%",
        responseTime: "145ms",
        lastChecked: "2 minutes ago",
      },
      {
        name: "Web Application",
        status: "operational",
        uptime: "99.99%",
        responseTime: "89ms",
        lastChecked: "1 minute ago",
      },
      {
        name: "Mobile Device Services",
        status: "operational",
        uptime: "99.95%",
        responseTime: "234ms",
        lastChecked: "3 minutes ago",
      },
      {
        name: "Cloud Integration",
        status: "operational",
        uptime: "99.97%",
        responseTime: "156ms",
        lastChecked: "2 minutes ago",
      },
      {
        name: "Reporting System",
        status: "operational",
        uptime: "99.94%",
        responseTime: "298ms",
        lastChecked: "4 minutes ago",
      },
      {
        name: "Authentication Service",
        status: "operational",
        uptime: "99.99%",
        responseTime: "67ms",
        lastChecked: "1 minute ago",
      },
    ];

    setServices(mockServices);

    // Determine overall status
    const hasOutage = mockServices.some((s) => s.status === "outage");
    const hasDegraded = mockServices.some((s) => s.status === "degraded");
    const hasMaintenance = mockServices.some((s) => s.status === "maintenance");

    if (hasOutage || hasDegraded) {
      setOverallStatus("issues");
    } else if (hasMaintenance) {
      setOverallStatus("maintenance");
    } else {
      setOverallStatus("operational");
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-100 light:bg-green-900/30 light:text-green-400";
      case "degraded":
        return "text-yellow-600 bg-yellow-100 light:bg-yellow-900/30 light:text-yellow-400";
      case "maintenance":
        return "text-blue-600 bg-blue-100 light:bg-blue-900/30 light:text-blue-400";
      case "outage":
        return "text-red-600 bg-red-100 light:bg-red-900/30 light:text-red-400";
      default:
        return "text-gray-600 bg-gray-100 light:bg-gray-900/30 light:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "degraded":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "maintenance":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "outage":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getOverallStatusMessage = () => {
    switch (overallStatus) {
      case "operational":
        return "All systems operational";
      case "issues":
        return "Some systems experiencing issues";
      case "maintenance":
        return "Scheduled maintenance in progress";
      default:
        return "Status unknown";
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('status')} />

      <div className="min-h-screen bg-white light:bg-slate-900 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 xxl:py-28">
        <div className="max-w-4xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 xxl:px-16">
          {/* Header Section */}
          <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24 xxl:mb-28">
            <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl xxl:text-7xl font-bold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 xxl:mb-14">
              System Status
            </h1>
            <p className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl xxl:text-2xl text-slate-600 light:text-slate-300 mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-10 xl:mb-11 xxl:mb-12">
              Real-time status of our services and infrastructure
            </p>

            {/* Overall Status Banner */}
            <div
              className={`inline-flex items-center gap-2 xs:gap-3 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-5 xxl:gap-6 px-4 xs:px-5 sm:px-6 md:px-7 lg:px-8 xl:px-9 xxl:px-10 py-2 xs:py-3 sm:py-3 md:py-4 lg:py-4 xl:py-5 xxl:py-6 rounded-full ${getStatusColor(
                overallStatus === "operational"
                  ? "operational"
                  : overallStatus === "issues"
                  ? "degraded"
                  : "maintenance"
              )}`}
            >
              {getStatusIcon(
                overallStatus === "operational"
                  ? "operational"
                  : overallStatus === "issues"
                  ? "degraded"
                  : "maintenance"
              )}
              <span className="font-medium text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl">
                {getOverallStatusMessage()}
              </span>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20">
            <p className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-500 light:text-slate-400">
              Last updated: {new Date().toLocaleString()} (Auto-refresh every 60
              seconds)
            </p>
          </div>

          {/* Services Status */}
          <section className="mb-12 xs:mb-14 sm:mb-16 md:mb-18 lg:mb-20 xl:mb-22 xxl:mb-24">
            <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-10 xl:mb-11 xxl:mb-12">
              Service Status
            </h2>
            <div className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-6 lg:space-y-7 xl:space-y-8 xxl:space-y-9">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white light:bg-slate-800 border border-slate-200 light:border-slate-700 rounded-lg p-4 xs:p-5 sm:p-6 md:p-6 lg:p-7 xl:p-8 xxl:p-9 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 xs:gap-5 sm:gap-6 md:gap-6 lg:gap-7 xl:gap-8 xxl:gap-9">
                    <div className="flex items-center gap-3 xs:gap-4 sm:gap-4 md:gap-5 lg:gap-5 xl:gap-6 xxl:gap-7">
                      <div
                        className={`flex items-center gap-2 xs:gap-2 sm:gap-3 md:gap-3 lg:gap-4 xl:gap-4 xxl:gap-5 px-3 xs:px-4 sm:px-4 md:px-5 lg:px-5 xl:px-6 xxl:px-7 py-1 xs:py-2 sm:py-2 md:py-2 lg:py-3 xl:py-3 xxl:py-4 rounded-full ${getStatusColor(
                          service.status
                        )}`}
                      >
                        {getStatusIcon(service.status)}
                        <span className="text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-base xxl:text-lg font-medium capitalize">
                          {service.status}
                        </span>
                      </div>
                      <h3 className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl font-semibold text-slate-900 light:text-white">
                        {service.name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-6 lg:gap-7 xl:gap-8 xxl:gap-9 text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl">
                      <div className="text-center sm:text-right">
                        <div className="text-slate-500 light:text-slate-400 text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-base xxl:text-lg">
                          Uptime
                        </div>
                        <div className="font-semibold text-slate-900 light:text-white">
                          {service.uptime}
                        </div>
                      </div>
                      <div className="text-center sm:text-right">
                        <div className="text-slate-500 light:text-slate-400 text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-base xxl:text-lg">
                          Response
                        </div>
                        <div className="font-semibold text-slate-900 light:text-white">
                          {service.responseTime}
                        </div>
                      </div>
                      <div className="text-center sm:text-right">
                        <div className="text-slate-500 light:text-slate-400 text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-base xxl:text-lg">
                          Checked
                        </div>
                        <div className="font-semibold text-slate-900 light:text-white">
                          {service.lastChecked}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Performance Metrics */}
          <section className="mb-12 xs:mb-14 sm:mb-16 md:mb-18 lg:mb-20 xl:mb-22 xxl:mb-24">
            <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-10 xl:mb-11 xxl:mb-12">
              Performance Metrics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-7 sm:gap-8 md:gap-9 lg:gap-10 xl:gap-11 xxl:gap-12">
              <div className="bg-white light:bg-slate-800 border border-slate-200 light:border-slate-700 rounded-lg p-6 xs:p-7 sm:p-8 md:p-8 lg:p-9 xl:p-10 xxl:p-11 text-center">
                <div className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-3xl font-bold text-green-600 light:text-green-400 mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                  99.98%
                </div>
                <div className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl font-medium text-slate-900 light:text-white mb-1 xs:mb-1 sm:mb-2 md:mb-2 lg:mb-3 xl:mb-3 xxl:mb-4">
                  Uptime
                </div>
                <div className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-500 light:text-slate-400">
                  30 days
                </div>
              </div>

              <div className="bg-white light:bg-slate-800 border border-slate-200 light:border-slate-700 rounded-lg p-6 xs:p-7 sm:p-8 md:p-8 lg:p-9 xl:p-10 xxl:p-11 text-center">
                <div className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-bold text-blue-600 light:text-blue-400 mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                  142ms
                </div>
                <div className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl font-medium text-slate-900 light:text-white mb-1 xs:mb-1 sm:mb-2 md:mb-2 lg:mb-3 xl:mb-3 xxl:mb-4">
                  Response Time
                </div>
                <div className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-500 light:text-slate-400">
                  Average
                </div>
              </div>

              <div className="bg-white light:bg-slate-800 border border-slate-200 light:border-slate-700 rounded-lg p-6 xs:p-7 sm:p-8 md:p-8 lg:p-9 xl:p-10 xxl:p-11 text-center">
                <div className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-bold text-purple-600 light:text-purple-400 mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                  2.4M
                </div>
                <div className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl font-medium text-slate-900 light:text-white mb-1 xs:mb-1 sm:mb-2 md:mb-2 lg:mb-3 xl:mb-3 xxl:mb-4">
                  Requests
                </div>
                <div className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-500 light:text-slate-400">
                  Last 24h
                </div>
              </div>

              <div className="bg-white light:bg-slate-800 border border-slate-200 light:border-slate-700 rounded-lg p-6 xs:p-7 sm:p-8 md:p-8 lg:p-9 xl:p-10 xxl:p-11 text-center">
                <div className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-bold text-orange-600 light:text-orange-400 mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                  0
                </div>
                <div className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl font-medium text-slate-900 light:text-white mb-1 xs:mb-1 sm:mb-2 md:mb-2 lg:mb-3 xl:mb-3 xxl:mb-4">
                  Incidents
                </div>
                <div className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-500 light:text-slate-400">
                  30 days
                </div>
              </div>
            </div>
          </section>

          {/* Maintenance Schedule */}
          <section className="mb-12 xs:mb-14 sm:mb-16 md:mb-18 lg:mb-20 xl:mb-22 xxl:mb-24">
            <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-10 xl:mb-11 xxl:mb-12">
              Scheduled Maintenance
            </h2>
            <div className="bg-slate-50 light:bg-slate-800 border border-slate-200 light:border-slate-700 rounded-lg p-6 xs:p-7 sm:p-8 md:p-9 lg:p-10 xl:p-11 xxl:p-12 text-center">
              <div className="flex items-center justify-center w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-green-100 light:bg-green-900/30 rounded-full mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                <svg
                  className="w-6 xs:w-7 sm:w-8 md:w-8 lg:w-9 xl:w-10 xxl:w-11 h-6 xs:h-7 sm:h-8 md:h-8 lg:h-9 xl:h-10 xxl:h-11 text-green-600 light:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl font-semibold text-slate-900 light:text-white mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                No Scheduled Maintenance
              </h3>
              <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 light:text-slate-300">
                All systems are running normally. Any scheduled maintenance will
                be announced here 48 hours in advance.
              </p>
            </div>
          </section>

          {/* Incident History */}
          <section className="mb-12 xs:mb-14 sm:mb-16 md:mb-18 lg:mb-20 xl:mb-22 xxl:mb-24">
            <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-10 xl:mb-11 xxl:mb-12">
              Recent Incident History
            </h2>
            <div className="bg-white light:bg-slate-800 border border-slate-200 light:border-slate-700 rounded-lg p-6 xs:p-7 sm:p-8 md:p-9 lg:p-10 xl:p-11 xxl:p-12 text-center">
              <div className="flex items-center justify-center w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-green-100 light:bg-green-900/30 rounded-full mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                <svg
                  className="w-6 xs:w-7 sm:w-8 md:w-8 lg:w-9 xl:w-10 xxl:w-11 h-6 xs:h-7 sm:h-8 md:h-8 lg:h-9 xl:h-10 xxl:h-11 text-green-600 light:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl font-semibold text-slate-900 light:text-white mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                No Recent Incidents
              </h3>
              <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 light:text-slate-300">
                No incidents have been reported in the last 30 days. Our systems
                have been running smoothly.
              </p>
            </div>
          </section>

          {/* Subscribe to Updates */}
          <section className="text-center">
            <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
              Stay Informed
            </h2>
            <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 light:text-slate-300 mb-8 xs:mb-9 sm:mb-10 md:mb-11 lg:mb-12 xl:mb-13 xxl:mb-14 max-w-2xl mx-auto">
              Subscribe to status updates and receive notifications about
              service disruptions, maintenance windows, and incident reports.
            </p>
            <div className="bg-slate-50 light:bg-slate-800 p-6 xs:p-7 sm:p-8 md:p-9 lg:p-10 xl:p-11 xxl:p-12 rounded-xl max-w-xl mx-auto">
              <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                <strong className="text-slate-900 light:text-white">
                  Status Updates:
                </strong>{" "}
                status@dsecuretech.com
                <br />
                <strong className="text-slate-900 light:text-white">
                  RSS Feed:
                </strong>{" "}
                /status/rss
                <br />
                <strong className="text-slate-900 light:text-white">
                  Status Endpoint:
                </strong>{" "}
                /status
              </p>
              <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-4 md:gap-5 lg:gap-5 xl:gap-6 xxl:gap-7">
                <input
                  type="email"
                  placeholder="Enter your email for updates"
                  className="flex-1 px-4 xs:px-5 sm:px-5 md:px-6 lg:px-6 xl:px-7 xxl:px-8 py-2 xs:py-3 sm:py-3 md:py-4 lg:py-4 xl:py-5 xxl:py-6 border border-slate-300 light:border-slate-600 rounded-lg bg-white light:bg-slate-700 text-slate-900 light:text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
                <button className="px-6 xs:px-7 sm:px-7 md:px-8 lg:px-8 xl:px-9 xxl:px-10 py-2 xs:py-3 sm:py-3 md:py-4 lg:py-4 xl:py-5 xxl:py-6 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
