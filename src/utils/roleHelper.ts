import { UserRole } from './rolePermissions';
/**
 * Role Helper Utilities
 * 
 * Handles role extraction from various sources:
 * 1. roles[] array (primary)
 * 2. role string (fallback)
 * 3. user_type string (secondary fallback)
 */

/**
 * Get primary role from user data
 * Priority: userRole (camelCase) ? user_role (snake_case) ? role ? roles[0] ? user_type ? 'user'
 * Always returns lowercase for consistency
 */
export function getPrimaryRole(userData: any): string {
  // 1?? FIRST PRIORITY: userRole field (camelCase from API response)
  if (userData?.userRole && typeof userData.userRole === 'string') {
    const role = userData.userRole;
    // console.log('? Using userRole (camelCase):', role, '?', role.toLowerCase());
    return role.toLowerCase();
  }
  
  // 2?? SECOND PRIORITY: user_role field (snake_case)
  if (userData?.user_role && typeof userData.user_role === 'string') {
    const role = userData.user_role;
    // console.log('? Using user_role (snake_case):', role, '?', role.toLowerCase());
    return role.toLowerCase();
  }
  
  // 3?? THIRD PRIORITY: role string
  if (userData?.role && typeof userData.role === 'string') {
    const role = userData.role;
    // console.log('? Using role field:', role, '?', role.toLowerCase());
    return role.toLowerCase();
  }
  
  // 4?? FOURTH PRIORITY: roles array (only if not empty)
  if (userData?.roles && Array.isArray(userData.roles) && userData.roles.length > 0) {
    const role = userData.roles[0];
    // console.log('? Using roles[0]:', role, '?', role.toLowerCase());
    return role.toLowerCase();
  }
  
  // 5?? FIFTH PRIORITY: user_type
  if (userData?.user_type && typeof userData.user_type === 'string') {
    const role = userData.user_type;
    // console.log('?? Using user_type:', role, '?', role.toLowerCase());
    return role.toLowerCase();
  }
  
  // 6?? Default to 'user'
  // console.log('? No role found, using default: user');
  return 'user';
}

/**
 * Get all roles from user data
 * Returns array of roles, prioritizing userRole/user_role over roles array
 */
export function getAllRoles(userData: any): string[] {
  // Check for single role fields first (userRole, user_role, role)
  if (userData?.userRole && typeof userData.userRole === 'string') {
    return [userData.userRole.toLowerCase()];
  }
  
  if (userData?.user_role && typeof userData.user_role === 'string') {
    return [userData.user_role.toLowerCase()];
  }
  
  if (userData?.role && typeof userData.role === 'string') {
    return [userData.role.toLowerCase()];
  }
  
  // Check for roles array (only if not empty)
  if (userData?.roles && Array.isArray(userData.roles) && userData.roles.length > 0) {
    return userData.roles.map((r: string) => r.toLowerCase());
  }
  
  // Fallback to user_type or default
  if (userData?.user_type && typeof userData.user_type === 'string') {
    return [userData.user_type.toLowerCase()];
  }
  
  return ['user'];
}

/**
 * Check if user has a specific role
 */
export function hasRole(userData: any, roleToCheck: string): boolean {
  const allRoles = getAllRoles(userData);
  return allRoles.includes(roleToCheck);
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(userData: any, rolesToCheck: string[]): boolean {
  const allRoles = getAllRoles(userData);
  return rolesToCheck.some(role => allRoles.includes(role));
}

/**
 * Check if user has all of the specified roles
 */
export function hasAllRoles(userData: any, rolesToCheck: string[]): boolean {
  const allRoles = getAllRoles(userData);
  return rolesToCheck.every(role => allRoles.includes(role));
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: string): string {
  const roleMap: Record<string, string> = {
    'admin': 'Administrator',
    'user': 'User',
    'manager': 'Manager',
    'operator': 'Operator',
    'superadmin': 'Super Administrator',
    'viewer': 'Viewer'
  };
  
  return roleMap[role.toLowerCase()] || role;
}

/**
 * Format roles array for display
 */
export function formatRolesDisplay(userData: any): string {
  const allRoles = getAllRoles(userData);
  return allRoles.map(role => getRoleDisplayName(role)).join(', ');
}
