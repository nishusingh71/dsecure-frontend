import React from 'react';
import { Link } from 'react-router-dom';
import { type AuditReport } from "@/utils/enhancedApiClient";

interface ReportsTabProps {
  auditReports: AuditReport[];
  reportsPage: number;
  setReportsPage: (page: number | ((prev: number) => number)) => void;
  reportsPageSize: number;
  setReportsPageSize: (size: number) => void;
  pageSizeOptions: number[];
}

const ReportsTab: React.FC<ReportsTabProps> = ({
  auditReports,
  reportsPage,
  setReportsPage,
  reportsPageSize,
  setReportsPageSize,
  pageSizeOptions,
}) => {
  return (
    <div className="card">
      <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-slate-900">
            Erasure Reports
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            View and manage data erasure reports
          </p>
        </div>
        <Link to="/admin/reports" className="btn-primary text-sm">
          View All Reports
        </Link>
      </div>

      <div className="p-6">
        {auditReports.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
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
            <p className="text-slate-600 mb-6">
              No reports data available from the server.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto max-h-[500px] min-h-[300px] overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-white shadow-sm z-10">
                  <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                    <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                      Report ID
                    </th>
                    <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                      Type
                    </th>
                    <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                      Status
                    </th>
                    <th className="pb-3 pr-4 font-medium whitespace-nowrap hidden sm:table-cell">
                      Date
                    </th>
                    <th className="pb-3 font-medium whitespace-nowrap hidden md:table-cell">
                      Method
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {auditReports
                    .slice(
                      (reportsPage - 1) * reportsPageSize,
                      reportsPage * reportsPageSize,
                    )
                    .map((report) => (
                      <tr
                        key={report.report_id || report.id}
                        className="hover:bg-slate-50"
                      >
                        <td className="py-4 font-medium text-slate-900">
                          #
                          {report.report_id ||
                            report.reportId ||
                            report.id}
                        </td>
                        <td className="py-4 text-slate-600">
                          {(() => {
                            let reportType = "Erasure";
                            const reportWithDetails = report as any;

                            if (reportWithDetails.report_details_json) {
                              try {
                                const reportDetails = JSON.parse(
                                  reportWithDetails.report_details_json,
                                );
                                reportType =
                                  reportDetails?.report_type ||
                                  reportDetails?.Erasure_Type ||
                                  (report as any).erasure_type ||
                                  "Files and Folders";
                              } catch (e) {
                                reportType =
                                  (report as any).reportType ||
                                  (report as any).erasure_type ||
                                  "Erasure";
                              }
                            } else {
                              reportType =
                                (report as any).reportType ||
                                (report as any).erasure_type ||
                                "Erasure";
                            }

                            return (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {reportType}
                              </span>
                            );
                          })()}
                        </td>
                        <td className="py-4">
                          {(() => {
                            let statusValue = "completed";
                            const reportWithDetails = report as any;

                            if (reportWithDetails.report_details_json) {
                              try {
                                const reportDetails = JSON.parse(
                                  reportWithDetails.report_details_json,
                                );
                                statusValue =
                                  reportDetails?.status?.toLowerCase() ||
                                  "completed";
                              } catch (e) {
                                statusValue =
                                  report.status?.toLowerCase() ||
                                  "completed";
                              }
                            } else if (report.status) {
                              statusValue = report.status.toLowerCase();
                            }

                            return (
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                  statusValue === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : statusValue === "running" ||
                                      statusValue === "pending"
                                      ? "bg-blue-100 text-blue-800"
                                      : statusValue === "warning"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                              >
                                {statusValue}
                              </span>
                            );
                          })()}
                        </td>
                        <td className="py-4 text-slate-600 hidden sm:table-cell text-sm">
                          {report.report_datetime
                            ? new Date(
                                report.report_datetime,
                              ).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                              })
                            : report.reportDate
                              ? new Date(
                                  report.reportDate,
                                ).toLocaleDateString("en-IN", {
                                  month: "short",
                                  day: "numeric",
                                })
                              : "-"}
                        </td>
                         <td className="py-4 text-slate-600 hidden md:table-cell text-sm">
                           {(report as any).erasure_method || (report as any).method || "N/A"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

             {/* Pagination Logic */}
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-200 bg-white">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <label className="text-xs sm:text-sm text-slate-600">Rows:</label>
                  <select
                    value={reportsPageSize}
                    onChange={(e) => {
                      setReportsPageSize(parseInt(e.target.value, 10));
                      setReportsPage(1);
                    }}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 border border-slate-300 rounded-lg text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {pageSizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={() => setReportsPage((prev) => Math.max(prev - 1, 1))}
                        disabled={reportsPage === 1}
                        className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                        Previous
                    </button>
                    <span className="text-xs sm:text-sm text-slate-600">
                        Page {reportsPage}
                    </span>
                    <button
                        onClick={() => setReportsPage((prev) => prev + 1)}
                        disabled={auditReports.length <= reportsPage * reportsPageSize}
                        className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                        Next
                    </button>
                </div>
             </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportsTab;
