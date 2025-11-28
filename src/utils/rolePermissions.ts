// Role-Based Access Control (RBAC) System for Admin Dashboard

export type UserRole = 'superadmin' | 'administrator' | 'admin' | 'manager' | 'user';

export interface RolePermissions {
  // Dashboard Access
  canViewDashboard: boolean;
  canViewAllStats: boolean;
  
  // User Management
  canCreateUser: boolean;
  canEditUser: boolean;
  canDeleteUser: boolean;
  canViewAllUsers: boolean;
  canViewSubordinateUsers: boolean;
  canManageSuperAdmin: boolean;
  canManageAdmin: boolean;
  
  // Group Management
  canCreateGroup: boolean;
  canEditGroup: boolean;
  canDeleteGroup: boolean;
  canViewGroups: boolean;
  
  // License Management
  canAssignLicenses: boolean;
  canBulkAssignLicenses: boolean;
  canViewLicenses: boolean;
  canRevokeLicenses: boolean;
  
  // Reports
  canViewReports: boolean;
  canDownloadReports: boolean;
  canDeleteReports: boolean;
  canGenerateReports: boolean;
  
  // System Settings
  canViewSettings: boolean;
  canEditSettings: boolean;
  canViewSecuritySettings: boolean;
  
  // Logs
  canViewLogs: boolean;
  canClearLogs: boolean;
  
  // Machines
  canViewMachines: boolean;
  canManageMachines: boolean;
  
  // Profile
  canEditOwnProfile: boolean;
  canEditOthersProfile: boolean;
}

// Role hierarchy for filtering users/data
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  superadmin: 5,
  administrator: 4,
  admin: 3,
  manager: 2,
  user: 1
};

// Complete permission definitions for each role
export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  // SuperAdmin - Full access to everything
  superadmin: {
    canViewDashboard: true,
    canViewAllStats: true,
    canCreateUser: true,
    canEditUser: true,
    canDeleteUser: true,
    canViewAllUsers: true,
    canViewSubordinateUsers: true,
    canManageSuperAdmin: true,
    canManageAdmin: true,
    canCreateGroup: true,
    canEditGroup: true,
    canDeleteGroup: true,
    canViewGroups: true,
    canAssignLicenses: true,
    canBulkAssignLicenses: true,
    canViewLicenses: true,
    canRevokeLicenses: true,
    canViewReports: true,
    canDownloadReports: true,
    canDeleteReports: true,
    canGenerateReports: true,
    canViewSettings: true,
    canEditSettings: true,
    canViewSecuritySettings: true,
    canViewLogs: true,
    canClearLogs: true,
    canViewMachines: true,
    canManageMachines: true,
    canEditOwnProfile: true,
    canEditOthersProfile: true
  },

  // Administrator - Full access to all functionality (same as admin)
  administrator: {
    canViewDashboard: true,
    canViewAllStats: true,
    canCreateUser: true,
    canEditUser: true,
    canDeleteUser: true,
    canViewAllUsers: true,
    canViewSubordinateUsers: true,
    canManageSuperAdmin: true,
    canManageAdmin: true,
    canCreateGroup: true,
    canEditGroup: true,
    canDeleteGroup: true,
    canViewGroups: true,
    canAssignLicenses: true,
    canBulkAssignLicenses: true,
    canViewLicenses: true,
    canRevokeLicenses: true,
    canViewReports: true,
    canDownloadReports: true,
    canDeleteReports: true,
    canGenerateReports: true,
    canViewSettings: true,
    canEditSettings: true,
    canViewSecuritySettings: true,
    canViewLogs: true,
    canClearLogs: true,
    canViewMachines: true,
    canManageMachines: true,
    canEditOwnProfile: true,
    canEditOthersProfile: true
  },

  // Admin - Full access to all functionality (Administrator level)
  admin: {
    canViewDashboard: true,
    canViewAllStats: true,
    canCreateUser: true,
    canEditUser: true,
    canDeleteUser: true,
    canViewAllUsers: true,
    canViewSubordinateUsers: true,
    canManageSuperAdmin: true, // ✅ Can manage SuperAdmin
    canManageAdmin: true, // ✅ Can manage other Admins
    canCreateGroup: true,
    canEditGroup: true,
    canDeleteGroup: true,
    canViewGroups: true,
    canAssignLicenses: true,
    canBulkAssignLicenses: true,
    canViewLicenses: true,
    canRevokeLicenses: true,
    canViewReports: true,
    canDownloadReports: true,
    canDeleteReports: true,
    canGenerateReports: true,
    canViewSettings: true,
    canEditSettings: true, // ✅ Can edit system settings
    canViewSecuritySettings: true, // ✅ Can view security settings
    canViewLogs: true,
    canClearLogs: true, // ✅ Can clear logs
    canViewMachines: true,
    canManageMachines: true,
    canEditOwnProfile: true,
    canEditOthersProfile: true
  },

  // Manager - Limited management capabilities
  manager: {
    canViewDashboard: true,
    canViewAllStats: false, // ❌ Limited stats view
    canCreateUser: true,
    canEditUser: true,
    canDeleteUser: false, // ❌ Cannot delete users
    canViewAllUsers: true, // ✅ Can view all users
    canViewSubordinateUsers: true, // ✅ Only subordinates
    canManageSuperAdmin: false,
    canManageAdmin: false,
    canCreateGroup: true,
    canEditGroup: true,
    canDeleteGroup: false,
    canViewGroups: true,
    canAssignLicenses: true,
    canBulkAssignLicenses: false,
    canViewLicenses: true,
    canRevokeLicenses: false,
    canViewReports: true,
    canDownloadReports: true, // ✅ Can download reports
    canDeleteReports: false,
    canGenerateReports: true,
    canViewSettings: false,
    canEditSettings: false,
    canViewSecuritySettings: false,
    canViewLogs: true,
    canClearLogs: false,
    canViewMachines: true,
    canManageMachines: false,
    canEditOwnProfile: true,
    canEditOthersProfile: false
  },

  // Regular User - Limited access (can view dashboard but with restricted features)
  user: {
    canViewDashboard: true, // ✅ Can view dashboard
    canViewAllStats: false,
    canCreateUser: false,
    canEditUser: false,
    canDeleteUser: false,
    canViewAllUsers: false,
    canViewSubordinateUsers: false,
    canManageSuperAdmin: false,
    canManageAdmin: false,
    canCreateGroup: false,
    canEditGroup: false,
    canDeleteGroup: false,
    canViewGroups: false,
    canAssignLicenses: false,
    canBulkAssignLicenses: false,
    canViewLicenses: true, // ✅ Can view own licenses
    canRevokeLicenses: false,
    canViewReports: true, // ✅ Can view reports
    canDownloadReports: true, // ✅ Can download reports
    canDeleteReports: false,
    canGenerateReports: false,
    canViewSettings: false,
    canEditSettings: false,
    canViewSecuritySettings: false,
    canViewLogs: false,
    canClearLogs: false,
    canViewMachines: false,
    canManageMachines: false,
    canEditOwnProfile: true, // ✅ Can edit own profile
    canEditOthersProfile: false
  }
};

/**
 * Get permissions for a specific role
 */
export function getRolePermissions(role: string): RolePermissions {
  const normalizedRole = role.toLowerCase() as UserRole;
  const permissions = ROLE_PERMISSIONS[normalizedRole] || ROLE_PERMISSIONS.user;
  
  // Debug logging
  console.log('📋 getRolePermissions:', {
    originalRole: role,
    normalizedRole,
    hasPermissions: !!ROLE_PERMISSIONS[normalizedRole],
    usingFallback: !ROLE_PERMISSIONS[normalizedRole],
    canViewAllUsers: permissions.canViewAllUsers,
    canViewGroups: permissions.canViewGroups,
    canViewSettings: permissions.canViewSettings
  });
  
  return permissions;
}

/**
 * Check if user has a specific permission
 */
export function hasPermission(role: string, permission: keyof RolePermissions): boolean {
  const permissions = getRolePermissions(role);
  return permissions[permission];
}

/**
 * Check if user can manage another user based on their roles
 */
export function canManageUser(userRole: string, targetRole: string): boolean {
  const userLevel = ROLE_HIERARCHY[userRole.toLowerCase() as UserRole] || 0;
  const targetLevel = ROLE_HIERARCHY[targetRole.toLowerCase() as UserRole] || 0;
  
  // SuperAdmin can manage everyone
  if (userRole.toLowerCase() === 'superadmin') {
    return true;
  }
  
  // Admin cannot manage SuperAdmin or other Admins
  if (userRole.toLowerCase() === 'admin') {
    return targetRole.toLowerCase() !== 'superadmin' && targetRole.toLowerCase() !== 'admin';
  }
  
  // Manager can only manage Users
  if (userRole.toLowerCase() === 'manager') {
    return targetRole.toLowerCase() === 'user';
  }
  
  // Can only manage users with lower hierarchy level
  return userLevel > targetLevel;
}

/**
 * Filter users based on role permissions
 * Admin can only see Manager and User level users
 */
export function filterUsersByRole(users: any[], currentUserRole: string): any[] {
  const currentLevel = ROLE_HIERARCHY[currentUserRole.toLowerCase() as UserRole] || 0;
  
  // SuperAdmin sees everyone
  if (currentUserRole.toLowerCase() === 'superadmin') {
    return users;
  }
  
  // Administrator sees everyone except SuperAdmin
  if (currentUserRole.toLowerCase() === 'administrator') {
    return users.filter(user => user.role.toLowerCase() !== 'superadmin');
  }
  
  // Admin sees everyone except SuperAdmin and Administrator
  if (currentUserRole.toLowerCase() === 'admin') {
    return users.filter(user => 
      user.role.toLowerCase() !== 'superadmin' && 
      user.role.toLowerCase() !== 'administrator'
    );
  }
  
  // Manager sees only Users
  if (currentUserRole.toLowerCase() === 'manager') {
    return users.filter(user => user.role.toLowerCase() === 'user');
  }
  
  // Others see only themselves
  return users.filter(user => 
    ROLE_HIERARCHY[user.role.toLowerCase() as UserRole] < currentLevel
  );
}

/**
 * Get role display name with badge color
 */
export function getRoleDisplayInfo(role: string): { 
  label: string; 
  color: string;
  bgColor: string;
  description: string;
} {
  const roleMap = {
    superadmin: {
      label: 'Super Admin',
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      description: 'Full system access'
    },
    administrator: {
      label: 'Administrator',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Full administrative access'
    },
    admin: {
      label: 'Admin',
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      description: 'Manages users and settings'
    },
    manager: {
      label: 'Manager',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      description: 'Limited management access'
    },
    user: {
      label: 'User',
      color: 'text-gray-700',
      bgColor: 'bg-gray-100',
      description: 'Basic access'
    }
  };
  
  return roleMap[role.toLowerCase() as UserRole] || roleMap.user;
}

/**
 * Get available roles that current user can assign
 */
export function getAssignableRoles(currentUserRole: string): Array<{
  value: UserRole;
  label: string;
  description: string;
}> {
  const allRoles = [
    { value: 'user' as UserRole, label: 'User', description: 'Basic access for regular users' },
    { value: 'manager' as UserRole, label: 'Manager', description: 'Can manage users and generate reports' },
    { value: 'admin' as UserRole, label: 'Admin', description: 'Full admin access' },
    { value: 'administrator' as UserRole, label: 'Administrator', description: 'Full administrative access' },
    { value: 'superadmin' as UserRole, label: 'Super Admin', description: 'Complete system control' }
  ];
  
  const currentLevel = ROLE_HIERARCHY[currentUserRole.toLowerCase() as UserRole] || 0;
  
  // SuperAdmin can assign any role
  if (currentUserRole.toLowerCase() === 'superadmin') {
    return allRoles;
  }
  
  // Admin can assign Manager and User roles only
  if (currentUserRole.toLowerCase() === 'admin') {
    return allRoles.filter(r => r.value !== 'superadmin' && r.value !== 'admin');
  }
  
  // Manager can only assign User role
  if (currentUserRole.toLowerCase() === 'manager') {
    return allRoles.filter(r => r.value === 'user');
  }
  
  // Filter roles below current user level
  return allRoles.filter(r => ROLE_HIERARCHY[r.value] < currentLevel);
}

/**
 * Check if feature should be visible based on role
 */
export function isFeatureVisible(role: string, feature: string): boolean {
  const permissions = getRolePermissions(role);
  
  const featurePermissionMap: Record<string, keyof RolePermissions> = {
    'add-user': 'canCreateUser',
    'edit-user': 'canEditUser',
    'delete-user': 'canDeleteUser',
    'add-group': 'canCreateGroup',
    'manage-groups': 'canViewGroups',
    'bulk-licenses': 'canBulkAssignLicenses',
    'system-settings': 'canEditSettings',
    'view-logs': 'canViewLogs',
    'clear-logs': 'canClearLogs',
    'admin-reports': 'canGenerateReports',
    'download-reports': 'canDownloadReports'
  };
  
  const permissionKey = featurePermissionMap[feature];
  if (!permissionKey) return true;
  
  return permissions[permissionKey];
}

export default {
  getRolePermissions,
  hasPermission,
  canManageUser,
  filterUsersByRole,
  getRoleDisplayInfo,
  getAssignableRoles,
  isFeatureVisible,
  ROLE_HIERARCHY,
  ROLE_PERMISSIONS
};
