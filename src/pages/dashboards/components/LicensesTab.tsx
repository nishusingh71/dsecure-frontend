import React from 'react';

interface LicensesTabProps {
  licenseListLoading: boolean;
  dashboardLicenseList: any[];
  licenseDetailsPage: number;
  setLicenseDetailsPage: (page: number | ((prev: number) => number)) => void;
  licensePageSize: number;
  setLicensePageSize: (size: number) => void;
  pageSizeOptions: number[];
}

const LicensesTab: React.FC<LicensesTabProps> = ({
  licenseListLoading,
  dashboardLicenseList,
  licenseDetailsPage,
  setLicenseDetailsPage,
  licensePageSize,
  setLicensePageSize,
  pageSizeOptions,
}) => {
  return (
    <div className="space-y-6">
      {/* License Overview - Same pattern as AdminLicenses page */}
      <div className="card !p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">License Details</h2>
            <p className="text-sm text-slate-600 mt-1">Manage and monitor your software licenses</p>
          </div>
          <span className="text-sm text-slate-500">{dashboardLicenseList.length} found</span>
        </div>
        <div className="overflow-x-auto max-h-[500px] min-h-[300px] overflow-y-auto">
          <table className="w-full relative">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">License Key</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Expires</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {licenseListLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading licenses...
                    </div>
                  </td>
                </tr>
              ) : dashboardLicenseList.length > 0 ? (
                dashboardLicenseList
                  .slice((licenseDetailsPage - 1) * licensePageSize, licenseDetailsPage * licensePageSize)
                  .map((license: any, index: number) => (
                    <tr key={license.license_id || index} className="hover:bg-slate-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-slate-900 max-w-xs overflow-x-auto">
                        {license.license_key || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">{license.user_email || "N/A"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {license.license_type || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            license.status?.toLowerCase() === "active"
                              ? "bg-emerald-100 text-emerald-800"
                              : license.status?.toLowerCase() === "expired"
                                ? "bg-red-100 text-red-800"
                                : license.status?.toLowerCase() === "revoked"
                                  ? "bg-rose-100 text-rose-800"
                                  : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {license.status?.toUpperCase() === "IN_USE" ? "Inactive" : license.status || "Unknown"}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                        {license.expires_at ? new Date(license.expires_at).toLocaleDateString() : "N/A"}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No license data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* License Details Pagination */}
        {dashboardLicenseList.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-3 border-t border-slate-200 bg-slate-50">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <label className="text-xs sm:text-sm text-slate-600">Rows:</label>
              <select
                value={licensePageSize}
                onChange={(e) => {
                  setLicensePageSize(parseInt(e.target.value, 10));
                  setLicenseDetailsPage(1);
                }}
                className="px-2 sm:px-3 py-1 sm:py-1.5 border border-slate-300 rounded-lg text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {pageSizeOptions.map((size: number) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">
                Showing {Math.min((licenseDetailsPage - 1) * licensePageSize + 1, dashboardLicenseList.length)} to{" "}
                {Math.min(licenseDetailsPage * licensePageSize, dashboardLicenseList.length)} of {dashboardLicenseList.length}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm text-slate-600">
                Page {licenseDetailsPage} of {Math.ceil(dashboardLicenseList.length / licensePageSize)}
              </span>
              <div className="flex gap-1 sm:gap-2">
                <button
                  onClick={() => setLicenseDetailsPage((prev) => Math.max(prev - 1, 1))}
                  disabled={licenseDetailsPage === 1}
                  className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sm:hidden">Prev</span>
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <button
                  onClick={() =>
                    setLicenseDetailsPage((prev) =>
                      Math.min(prev + 1, Math.ceil(dashboardLicenseList.length / licensePageSize)),
                    )
                  }
                  disabled={licenseDetailsPage >= Math.ceil(dashboardLicenseList.length / licensePageSize)}
                  className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default LicensesTab;
