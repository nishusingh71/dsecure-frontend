import React from 'react';
import { DEMO_USER_ACTIVITY } from "@/data/demoData";

interface UserActivity {
  email: string;
  loginTime: string;
  logoutTime: string | null;
  status: string;
}

interface UserActivityTabProps {
  isDemo: boolean;
  activityData: UserActivity[];
  activityPageSize: number;
  setActivityPageSize: (size: number) => void;
  userActivityPage: number;
  setUserActivityPage: (page: number | ((prev: number) => number)) => void;
  pageSizeOptions: number[];
  isSubusersEnabled: boolean;
}

const UserActivityTab: React.FC<UserActivityTabProps> = ({
  isDemo,
  activityData,
  activityPageSize,
  setActivityPageSize,
  userActivityPage,
  setUserActivityPage,
  pageSizeOptions,
  isSubusersEnabled,
}) => {
  if (!isSubusersEnabled) {
    return (
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          Feature Disabled
        </h3>
        <p className="text-sm text-slate-600">
          UserActivity is currently disabled for your account.
        </p>
      </div>
    );
  }

  const effectiveActivityData = isDemo ? DEMO_USER_ACTIVITY : activityData;

  if (!effectiveActivityData || effectiveActivityData.length === 0) {
    return (
      <div className="card">
        <div className="px-6 py-5 border-b border-slate-200">
          <div>
            <h2 className="font-semibold text-slate-900">
              Cloud Users Activity
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Monitor user login and logout activity
            </p>
          </div>
        </div>
        <div className="p-6">
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No Data Available
            </h3>
            <p className="text-slate-600 mb-6">
              No user activity data available from the server.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const paginatedActivity = effectiveActivityData.slice(
    (userActivityPage - 1) * activityPageSize,
    userActivityPage * activityPageSize,
  );

  return (
    <div className="card">
      <div className="px-6 py-5 border-b border-slate-200">
        <div>
          <h2 className="font-semibold text-slate-900">
            Cloud Users Activity
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Monitor user login and logout activity
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto max-h-[500px] min-h-[300px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white shadow-sm z-10">
              <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                  User Email
                </th>
                <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                  Login Time
                </th>
                <th className="pb-3 pr-4 font-medium whitespace-nowrap hidden sm:table-cell">
                  Logout Time
                </th>
                <th className="pb-3 font-medium whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedActivity.map((activity, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="py-4 font-medium text-slate-900">
                    {activity.email}
                  </td>
                  <td className="py-4 text-slate-600">
                    {activity.loginTime}
                  </td>
                  <td className="py-4 text-slate-600 hidden sm:table-cell">
                    {activity.logoutTime || "-"}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1 ${
                        activity.status === "active"
                          ? "text-green-800"
                          : "text-slate-500"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          activity.status === "active"
                            ? "bg-green-400"
                            : "bg-slate-400"
                        }`}
                      ></span>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-200 bg-white">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <label className="text-xs sm:text-sm text-slate-600">
              Rows:
            </label>
            <select
              value={activityPageSize}
              onChange={(e) => {
                setActivityPageSize(parseInt(e.target.value, 10));
                setUserActivityPage(1);
              }}
              className="px-2 sm:px-3 py-1 sm:py-1.5 border border-slate-300 rounded-lg text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">
              Showing{" "}
              {Math.min(
                (userActivityPage - 1) * activityPageSize + 1,
                effectiveActivityData.length,
              )}{" "}
              to{" "}
              {Math.min(
                userActivityPage * activityPageSize,
                effectiveActivityData.length,
              )}{" "}
              of {effectiveActivityData.length}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm text-slate-600">
              Page {userActivityPage} of{" "}
              {Math.ceil(effectiveActivityData.length / activityPageSize)}
            </span>
            <div className="flex gap-1 sm:gap-2">
              <button
                onClick={() => setUserActivityPage((prev) => Math.max(prev - 1, 1))}
                disabled={userActivityPage === 1}
                className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sm:hidden">Prev</span>
                <span className="hidden sm:inline">Previous</span>
              </button>
              <button
                onClick={() =>
                  setUserActivityPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(effectiveActivityData.length / activityPageSize),
                    ),
                  )
                }
                disabled={
                  userActivityPage >=
                  Math.ceil(effectiveActivityData.length / activityPageSize)
                }
                className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivityTab;
