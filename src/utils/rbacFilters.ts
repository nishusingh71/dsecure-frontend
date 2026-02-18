/**
 * RBAC ARCHITECTURE: Hierarchical Role-Based Access Control System
 * Shared utilities for filtering data based on user roles.
 */

/**
 * Role Hierarchy Definition
 * Descending order of access privileges
 */
export const Roles = {
  SUPER_ADMIN: "SuperAdmin",
  GROUP_ADMIN: "GroupAdmin",
  ADMIN: "Admin",
  USER: "User",
  SUB_USER: "SubUser",
} as const;

export type RoleType = (typeof Roles)[keyof typeof Roles];

/**
 * User Interface for Filter Building
 */
export interface CurrentUser {
  id: string;
  email: string;
  role: RoleType;
  groupId?: string;
  parentUserId?: string;
  departmentId?: string;
}

/**
 * Universal WHERE Clause Generator (Frontend → Backend Parity)
 * Centralized filter builder matching backend SQL WHERE clauses
 *
 * @param user - Current authenticated user
 * @returns Base filter object for API queries
 */
export const buildWhereClause = (user: Partial<CurrentUser>) => {
  const base = { isDeleted: false };

  switch (user.role) {
    case Roles.SUPER_ADMIN:
      // SuperAdmin: No restrictions (see ALL data)
      return base;

    case Roles.GROUP_ADMIN:
    case Roles.ADMIN:
      // GroupAdmin/Admin: WHERE group_id = currentUser.groupId
      return {
        ...base,
        groupId: user.groupId,
      };

    case Roles.USER:
      // User: WHERE owner_id = currentUser.id
      return {
        ...base,
        ownerId: user.id,
      };

    case Roles.SUB_USER:
      // SubUser: WHERE owner_id = parentUserId AND sub_user_id = userId AND department_id = departmentId
      return {
        ...base,
        ownerId: user.parentUserId,
        subUserId: user.id,
        departmentId: user.departmentId,
      };

    default:
      // Fallback: Most restrictive (own data only)
      return {
        ...base,
        ownerId: user.id,
      };
  }
};

/**
 * Filter Builder: Audit Reports & Reports
 * Includes advanced filters: date range, report type, erase type, status, department, email
 */
export const buildReportFilter = (
  user: Partial<CurrentUser>,
  filters: {
    groupId?: string;
    machineId?: string;
    reportType?: string;
    eraseType?: string;
    eraseStatus?: string;
    fromDate?: string;
    toDate?: string;
    departmentId?: string;
    subUserId?: string;
    email?: string;
  },
) => {
  return {
    ...buildWhereClause(user),
    ...filters,
  };
};

/**
 * Filter Builder: Machines
 * Includes: group, subUser, isErased, eraseType, licenseStatus
 */
export const buildMachineFilter = (
  user: Partial<CurrentUser>,
  filters: {
    groupId?: string;
    subUserId?: string;
    isErased?: boolean;
    eraseType?: string;
    licenseStatus?: string;
  },
) => {
  return {
    ...buildWhereClause(user),
    ...filters,
  };
};

/**
 * Filter Builder: Session Logs
 * Includes: owner, role, subUser, date range
 */
export const buildSessionFilter = (
  user: Partial<CurrentUser>,
  filters: {
    subUserId?: string;
    fromDate?: string;
    toDate?: string;
  },
) => {
  return {
    ownerId: user.id,
    role: user.role,
    ...filters,
  };
};

/**
 * Filter Builder: License Distribution
 * Includes: status array, assigned user
 */
export const buildLicenseFilter = (
  user: Partial<CurrentUser>,
  filters: {
    status?: string[];
    assignedTo?: string;
  },
) => {
  return {
    ...buildWhereClause(user),
    status: filters.status || ["Active", "Expired", "Revoked"],
    assignedTo: filters.assignedTo,
  };
};

/**
 * Filter Builder: Performance Dashboard
 * Includes: group, department, date range, role
 */
export const buildPerformanceFilter = (
  user: Partial<CurrentUser>,
  filters: {
    groupId?: string;
    departmentId?: string;
    fromDate?: string;
    toDate?: string;
  },
) => {
  return {
    groupId: filters.groupId,
    departmentId: filters.departmentId,
    fromDate: filters.fromDate,
    toDate: filters.toDate,
    role: user.role,
  };
};
