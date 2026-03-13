import React from "react";

interface GroupsTabProps {
  isGroupsEnabled: boolean;
  groupsLoading: boolean;
  groupsWithUsers: any[];
  toggleGroup: (groupId: string | number) => void;
  expandedGroups: (string | number)[];
}

const GroupsTab: React.FC<GroupsTabProps> = ({
  isGroupsEnabled,
  groupsLoading,
  groupsWithUsers,
  toggleGroup,
  expandedGroups,
}) => {
  return isGroupsEnabled ? (
    <div className="space-y-6">
      {/* Groups Section */}
      <div className="card">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">Groups & Members</h2>
            <p className="text-sm text-slate-600 mt-1">
              View all groups and their members
            </p>
          </div>
        </div>
        <div className="p-6">
          {/* Loading State */}
          {groupsLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-4 text-sm text-slate-600">
                  Loading groups data...
                </p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!groupsLoading && groupsWithUsers.length === 0 && (
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No Groups Found
              </h3>
              <p className="text-sm text-slate-600">
                No groups are available in your organization.
              </p>
            </div>
          )}

          {/* Groups List with Expandable Users */}
          {!groupsLoading && groupsWithUsers.length > 0 && (
            <div className="space-y-4">
              {groupsWithUsers.map((group: any) => (
                <div key={group.id} className="card !p-0 overflow-hidden">
                  {/* Group Header */}
                  <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <button
                        onClick={() => toggleGroup(group.id)}
                        className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-white font-semibold hover:shadow-lg transition-shadow"
                      >
                        {group.name.charAt(0)}
                      </button>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {group.name}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {group.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                          {group.users.length} users
                        </span>
                        <span className="text-sm text-slate-500">
                          Created: {new Date(group.created).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => toggleGroup(group.id)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <svg
                          className={`w-5 h-5 text-slate-600 transition-transform ${expandedGroups.includes(group.id) ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Expandable Users Table */}
                  {expandedGroups.includes(group.id) && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-100 border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              User Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              License
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Profile
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                          {group.users.map((user: any) => (
                            <tr
                              key={user.id}
                              className="hover:bg-slate-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                    {user.name.charAt(0)}
                                  </div>
                                  <span className="font-medium text-slate-900">
                                    {user.name}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.role === "User"
                                      ? "bg-blue-100 text-blue-800"
                                      : user.role === "Group Admin"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-purple-100 text-purple-800"
                                  }`}
                                >
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.license > 0
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-slate-100 text-slate-800"
                                  }`}
                                >
                                  {user.license}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                {user.profile}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
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
        Group management is currently disabled for your account.
      </p>
    </div>
  );
};

export default GroupsTab;
