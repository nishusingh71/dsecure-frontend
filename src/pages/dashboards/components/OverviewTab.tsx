import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface OverviewTabProps {
  auditReports: any[];
  recentReportsPage: number;
  setRecentReportsPage: (page: number | ((prev: number) => number)) => void;
  recentReportsPageSize: number;
  setRecentReportsPageSize: (size: number) => void;
  pageSizeOptions: number[];
  recentSessions: any[];
  systemLogsPage: number;
  setSystemLogsPage: (page: number | ((prev: number) => number)) => void;
  systemLogsPageSize: number;
  setSystemLogsPageSize: (size: number) => void;
  formatSessionDate: (date: any) => string;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  auditReports,
  recentReportsPage,
  setRecentReportsPage,
  recentReportsPageSize,
  setRecentReportsPageSize,
  pageSizeOptions,
  recentSessions,
  systemLogsPage,
  setSystemLogsPage,
  systemLogsPageSize,
  setSystemLogsPageSize,
  formatSessionDate,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
      {/* Recent Reports */}
      <div className="card !p-0 min-w-0">
        <div className="px-4 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Reports</h2>
          <Link
            to="/admin/reports"
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            View All
          </Link>
        </div>
        <div className="card-content divide-y divide-slate-200 max-h-[300px] min-h-[300px] overflow-y-auto">
          {auditReports.length > 0 ? (
            <>
              {auditReports
                .slice(
                  (recentReportsPage - 1) * recentReportsPageSize,
                  recentReportsPage * recentReportsPageSize,
                )
                .map((report) => (
                  <div
                    key={report.id || report.report_id}
                    className="px-4 sm:px-6 py-4 flex items-start justify-between hover:bg-slate-50 transition-colors min-w-0 gap-3"
                  >
                    <div className="flex items-start gap-2 sm:gap-4 min-w-0 flex-1">
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${
                          report.status === "completed" ||
                          report.status === "Completed"
                            ? "bg-green-400"
                            : report.status === "running" ||
                                report.status === "Running"
                              ? "bg-blue-400"
                              : report.status === "pending" ||
                                  report.status === "Pending"
                                ? "bg-yellow-400"
                                : "bg-red-400"
                        }`}
                      ></div>
                      <div className="min-w-0 flex-1">
                        <div
                          className="font-medium text-slate-900 truncate"
                          title={report.report_name || report.reportType}
                        >
                          {report.report_name ||
                            report.reportType ||
                            `Report #${
                              report.report_id ||
                              report.reportId ||
                              report.id
                            }`}
                        </div>
                        <div className="text-sm text-slate-500 truncate">
                          {report.erasure_method && (
                            <span className="mr-2">
                              {report.erasure_method}
                            </span>
                          )}
                          {report.reportType && (
                            <span>{report.reportType}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 flex-shrink-0 mt-1">
                      {report.report_datetime
                        ? new Date(report.report_datetime).toLocaleDateString(
                            "en-IN",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )
                        : report.reportDate
                          ? new Date(report.reportDate).toLocaleDateString(
                              "en-IN",
                              {
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "N/A"}
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <div className="px-4 sm:px-6 py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <svg
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No Data Available
              </h3>
              <p className="text-sm text-slate-600">
                No reports data available from the server.
              </p>
            </div>
          )}
        </div>
        {/* Recent Reports Pagination Footer */}
        {auditReports.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-600 whitespace-nowrap">
                  Rows:
                </label>
                <select
                  value={recentReportsPageSize}
                  onChange={(e) => {
                    setRecentReportsPageSize(parseInt(e.target.value, 10));
                    setRecentReportsPage(1);
                  }}
                  className="px-2 py-1 border border-slate-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {Math.min(
                  (recentReportsPage - 1) * recentReportsPageSize + 1,
                  auditReports.length,
                )}
                -
                {Math.min(
                  recentReportsPage * recentReportsPageSize,
                  auditReports.length,
                )}{" "}
                of {auditReports.length}
              </span>
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <span className="text-xs text-slate-600 whitespace-nowrap">
                Page {recentReportsPage} of{" "}
                {Math.ceil(auditReports.length / recentReportsPageSize)}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() =>
                    setRecentReportsPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={recentReportsPage === 1}
                  className="px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setRecentReportsPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(auditReports.length / recentReportsPageSize),
                      ),
                    )
                  }
                  disabled={
                    recentReportsPage >=
                    Math.ceil(auditReports.length / recentReportsPageSize)
                  }
                  className="px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Sessions */}
      <div className="card !p-0 min-w-0">
        <div className="px-4 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Sessions</h2>
          <Link
            to="/admin/sessions"
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            View All
          </Link>
        </div>
        <div className="card-content divide-y divide-slate-200 max-h-[300px] min-h-[300px] overflow-y-auto">
          {recentSessions.length > 0 ? (
            <>
              {recentSessions
                .slice(
                  (systemLogsPage - 1) * systemLogsPageSize,
                  systemLogsPage * systemLogsPageSize,
                )
                .map((session, index) => (
                  <div
                    key={session.session_id || index}
                    className="px-4 sm:px-6 py-4 hover:bg-slate-50 transition-colors min-w-0"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Session Status Badge */}
                      <div className="flex-shrink-0 mt-0.5">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            session.session_status === "active" ||
                            session.session_status === "Active"
                              ? "bg-green-100 text-green-700"
                              : session.session_status === "inactive" ||
                                  session.session_status === "Inactive"
                                ? "bg-red-100 text-red-700"
                                : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {session.session_status || "Unknown"}
                        </span>
                      </div>

                      {/* Session Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <p
                            className="font-medium text-slate-900 text-sm truncate"
                            title={session.user_email}
                          >
                            {session.user_email || "Unknown User"}
                          </p>
                          <span className="text-[10px] sm:text-xs text-slate-500 flex-shrink-0 mt-0.5">
                            {session.login_time
                              ? formatSessionDate(session.login_time)
                              : "N/A"}
                          </span>
                        </div>

                        {/* Additional Info */}
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          {session.ip_address && (
                            <span className="">
                              <svg
                                className="w-3 h-3 inline mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                />
                              </svg>
                              {session.ip_address}
                            </span>
                          )}
                          {session.logout_time && (
                            <span className="truncate text-slate-400">
                              Logout: {formatSessionDate(session.logout_time)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <div className="px-4 sm:px-6 py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <svg
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No Sessions Found
              </h3>
              <p className="text-sm text-slate-600">
                No recent sessions available at this time.
              </p>
            </div>
          )}
        </div>
        {/* Sessions Pagination footer */}
        {recentSessions.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-600 whitespace-nowrap">
                  Rows:
                </label>
                <select
                  value={systemLogsPageSize}
                  onChange={(e) => {
                    setSystemLogsPageSize(parseInt(e.target.value, 10));
                    setSystemLogsPage(1);
                  }}
                  className="px-2 py-1 border border-slate-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {Math.min(
                  (systemLogsPage - 1) * systemLogsPageSize + 1,
                  recentSessions.length,
                )}
                -
                {Math.min(
                  systemLogsPage * systemLogsPageSize,
                  recentSessions.length,
                )}{" "}
                of {recentSessions.length}
              </span>
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <span className="text-xs text-slate-600 whitespace-nowrap">
                Page {systemLogsPage} of{" "}
                {Math.ceil(recentSessions.length / systemLogsPageSize)}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSystemLogsPage((prev) => Math.max(prev - 1, 1))}
                  disabled={systemLogsPage === 1}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setSystemLogsPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(recentSessions.length / systemLogsPageSize),
                      ),
                    )
                  }
                  disabled={
                    systemLogsPage >=
                    Math.ceil(recentSessions.length / systemLogsPageSize)
                  }
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;
