import React from "react";

interface UsersTabProps {
  isSubusersEnabled: boolean;
  handleAddUser: () => void;
  usersDataLoading: boolean;
  displaySubusersData: any[];
  isCurrentUserSubuser: boolean;
  paginatedSubusers: any[];
  formatLastLogin: (date: any) => string;
  usersPageSize: number;
  setUsersPageSize: (size: number) => void;
  usersPage: number;
  setUsersPage: (page: number | ((prev: number) => number)) => void;
  pageSizeOptions: number[];
}

const UsersTab: React.FC<UsersTabProps> = ({
  isSubusersEnabled,
  handleAddUser,
  usersDataLoading,
  displaySubusersData,
  isCurrentUserSubuser,
  paginatedSubusers,
  formatLastLogin,
  usersPageSize,
  setUsersPageSize,
  usersPage,
  setUsersPage,
  pageSizeOptions,
}) => {
  return isSubusersEnabled ? (
    <div className="space-y-6">
      {/* Users Management */}
      <div className="card">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">Users</h2>
            <p className="text-sm text-slate-600 mt-1">Manage all users</p>
          </div>
          {/* Add User button */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleAddUser}
              className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add User
            </button>
          </div>
        </div>
        <div className="p-6">
          {/* Loading State */}
          {usersDataLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-4 text-sm text-slate-600">
                  Loading users data...
                </p>
              </div>
            </div>
          )}

          {/* Empty State - No users found */}
          {!usersDataLoading && displaySubusersData.length === 0 && (
            <div className="text-center py-12">
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No Users Found
              </h3>
              <p className="text-sm text-slate-600">
                {isCurrentUserSubuser
                  ? "You don't have any subusers associated with your account."
                  : "Click 'Manage Users' to load user data or create a new subuser."}
              </p>
            </div>
          )}

          {/* Users Table - Show for all users if data exists */}
          {!usersDataLoading && displaySubusersData.length > 0 && (
            <div>
              <div className="overflow-x-auto max-h-[500px] min-h-[300px] overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white shadow-sm z-10">
                    <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                      <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                        Email
                      </th>
                      <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                        Role
                      </th>
                      <th className="pb-3 pr-4 font-medium whitespace-nowrap hidden md:table-cell">
                        Department
                      </th>
                      <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                        Status
                      </th>
                      <th className="pb-3 pr-4 font-medium whitespace-nowrap hidden lg:table-cell">
                        Group
                      </th>
                      <th className="pb-3 pr-4 font-medium whitespace-nowrap hidden sm:table-cell">
                        Last Login
                      </th>
                      <th className="pb-3 font-medium whitespace-nowrap hidden xl:table-cell">
                        License Allocation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedSubusers.map((subuser, index) => {
                      return (
                        <tr
                          key={subuser.id || index}
                          className="hover:bg-slate-50"
                        >
                          {/* Email */}
                          <td className="py-4 font-medium text-slate-900">
                            {subuser.subuser_email}
                          </td>

                          {/* Role */}
                          <td className="py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                (subuser as any).role === "admin" ||
                                (subuser as any).defaultRole === "admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : (subuser as any).role === "manager" ||
                                      (subuser as any).defaultRole === "manager"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-slate-100 text-slate-800"
                              }`}
                            >
                              {(subuser as any).role ||
                                (subuser as any).defaultRole ||
                                "user"}
                            </span>
                          </td>

                          {/* Department */}
                          <td className="py-4 text-slate-600 hidden md:table-cell">
                            {(subuser as any).department || "-"}
                          </td>

                          {/* Status */}
                          <td className="py-4">
                            {subuser.status ? (
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  subuser.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : subuser.status === "inactive"
                                      ? "bg-gray-100 text-gray-800"
                                      : subuser.status === "suspended"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {subuser.status}
                              </span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>

                          {/* User Group */}
                          <td className="py-4 text-slate-600 hidden lg:table-cell">
                            {(subuser as any).subuser_group || "-"}
                          </td>

                          {/* Last Login */}
                          <td className="py-4 text-slate-600 text-sm hidden sm:table-cell">
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {formatLastLogin((subuser as any).last_login)}
                              </span>
                              {(subuser as any).last_login &&
                                (subuser as any).last_login !== "Never" &&
                                (subuser as any).last_login !== "-" && (
                                  <span
                                    className="text-xs text-slate-400 mt-0.5"
                                    title={new Date(
                                      (subuser as any).last_login,
                                    ).toLocaleString()}
                                  >
                                    {new Date(
                                      (subuser as any).last_login,
                                    ).toLocaleString("en-IN", {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                )}
                            </div>
                          </td>

                          {/* License Allocation */}
                          <td className="py-4 hidden xl:table-cell">
                            {(subuser as any).license_allocation ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                                {(subuser as any).license_allocation}
                              </span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Users Pagination - always show when data exists */}
              {displaySubusersData.length > 0 && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-200 bg-white">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <label className="text-xs sm:text-sm text-slate-600">
                      Rows:
                    </label>
                    <select
                      value={usersPageSize}
                      onChange={(e) => {
                        setUsersPageSize(parseInt(e.target.value, 10));
                        setUsersPage(1);
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
                        (usersPage - 1) * usersPageSize + 1,
                        displaySubusersData.length,
                      )}{" "}
                      to{" "}
                      {Math.min(
                        usersPage * usersPageSize,
                        displaySubusersData.length,
                      )}{" "}
                      of {displaySubusersData.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xs sm:text-sm text-slate-600">
                      Page {usersPage} of{" "}
                      {Math.ceil(displaySubusersData.length / usersPageSize)}
                    </span>
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        onClick={() =>
                          setUsersPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={usersPage === 1}
                        className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sm:hidden">Prev</span>
                        <span className="hidden sm:inline">Previous</span>
                      </button>
                      <button
                        onClick={() =>
                          setUsersPage((prev) =>
                            Math.min(
                              prev + 1,
                              Math.ceil(
                                displaySubusersData.length / usersPageSize,
                              ),
                            ),
                          )
                        }
                        disabled={
                          usersPage >=
                          Math.ceil(displaySubusersData.length / usersPageSize)
                        }
                        className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
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
        User management is currently disabled for your account.
      </p>
    </div>
  );
};

export default UsersTab;
