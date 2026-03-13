import React from 'react';

interface LicenseDetail {
  product: string;
  total: number;
  consumed: number;
  available: number;
}

interface MachinesTabProps {
  totalLicenses: number;
  consumedLicenses: number;
  userLicenseDetails: LicenseDetail[];
  utilizationPercent: string | number;
  availableLicenses: number;
  showInfo: (title: string, message: string) => void;
  setShowLicenseAuditModal: (show: boolean) => void;
}

const MachinesTab: React.FC<MachinesTabProps> = ({
  totalLicenses,
  consumedLicenses,
  userLicenseDetails,
  utilizationPercent,
  availableLicenses,
  showInfo,
  setShowLicenseAuditModal,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-blue-700">
                Total Licenses
              </div>
              <div className="text-2xl font-bold text-blue-900">
                {totalLicenses.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-emerald-700">
                Active/Used Licenses
              </div>
              <div className="text-2xl font-bold text-emerald-900">
                {consumedLicenses.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-orange-700">
                Available
              </div>
              <div className="text-2xl font-bold text-orange-900">
                {availableLicenses.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-purple-700">
                Utilization
              </div>
              <div className="text-2xl font-bold text-purple-900">
                {utilizationPercent}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200 mb-8">
        <h4 className="text-lg font-semibold text-slate-900 mb-4">
          License Utilization Overview
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              Overall Utilization
            </span>
            <span className="text-lg font-bold text-emerald-600">
              {utilizationPercent}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full"
              style={{
                width: `${Math.min(Number(utilizationPercent), 100)}%`,
              }}
            ></div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-medium text-slate-900">Utilized</div>
              <div className="text-emerald-600 font-semibold">
                {consumedLicenses.toLocaleString()} ({utilizationPercent}%)
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium text-slate-900">Available</div>
              <div className="text-orange-600 font-semibold">
                {availableLicenses.toLocaleString()} (
                {totalLicenses > 0
                  ? (100 - Number(utilizationPercent)).toFixed(1)
                  : 0}
                %)
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium text-slate-900">Products</div>
              <div className="text-blue-600 font-semibold">
                {userLicenseDetails.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h4 className="text-lg font-semibold text-slate-900">
            License Breakdown by Product
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-700">Product</th>
                <th className="text-left p-4 font-semibold text-slate-700">Total</th>
                <th className="text-left p-4 font-semibold text-slate-700">Used</th>
                <th className="text-left p-4 font-semibold text-slate-700">Available</th>
                <th className="text-left p-4 font-semibold text-slate-700">Utilization</th>
                <th className="text-left p-4 font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {userLicenseDetails.map((license, index) => {
                const usagePercent =
                  license.total > 0 ? (license.consumed / license.total) * 100 : 0;
                const statusColor =
                  usagePercent > 80 ? "red" : usagePercent > 60 ? "orange" : "blue";
                const statusText =
                  usagePercent > 80
                    ? "High Usage"
                    : usagePercent > 60
                      ? "Moderate"
                      : "Low Usage";
                const progressColor =
                  usagePercent > 80
                    ? "bg-red-500"
                    : usagePercent > 60
                      ? "bg-orange-500"
                      : "bg-blue-500";

                return (
                  <tr key={index} className="border-t border-slate-200">
                    <td className="p-4 font-medium text-slate-900">{license.product}</td>
                    <td className="p-4 text-slate-600">{license.total.toLocaleString()}</td>
                    <td className="p-4 text-slate-600">{license.consumed.toLocaleString()}</td>
                    <td className="p-4 text-slate-600">{license.available.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div
                            className={`${progressColor} h-2 rounded-full`}
                            style={{ width: `${Math.min(usagePercent, 100)}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium text-${statusColor}-600`}>
                          {usagePercent.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`bg-${statusColor}-100 text-${statusColor}-700 px-2 py-1 rounded-full text-xs font-medium`}>
                        {statusText}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button
          onClick={() => {
            showInfo(
              "Report Exported",
              "Detailed license audit report has been sent to your email"
            );
            setShowLicenseAuditModal(false);
          }}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-colors"
        >
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Detailed Report
        </button>
        <button
          onClick={() =>
            showInfo(
              "Optimization Report",
              "License optimization suggestions have been generated and will be sent to your email"
            )
          }
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Get Optimization Report
        </button>
        <button
          onClick={() => setShowLicenseAuditModal(false)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
        >
          Close
        </button>
      </div>
    </>
  );
};

export default MachinesTab;
