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
 * Priority: roles[0] → role → user_type → 'user'
 * Always returns lowercase for consistency
 */
export function getPrimaryRole(userData: any): string {
  // Check for roles array first
  if (userData?.roles && Array.isArray(userData.roles) && userData.roles.length > 0) {
    const role = userData.roles[0];
    console.log('✅ Using roles array:', role, '→', role.toLowerCase());
    return role.toLowerCase(); // ✅ Return lowercase
  }
  
  // Fallback to role string
  if (userData?.role && typeof userData.role === 'string') {
    const role = userData.role;
    console.log('ℹ️ Using single role:', role, '→', role.toLowerCase());
    return role.toLowerCase(); // ✅ Return lowercase
  }
  
  // Fallback to user_type
  if (userData?.user_type && typeof userData.user_type === 'string') {
    const role = userData.user_type;
    console.log('⚠️ Using user_type:', role, '→', role.toLowerCase());
    return role.toLowerCase(); // ✅ Return lowercase
  }
  
  // Default to 'user'
  console.log('❌ No role found, using default: user');
  return 'user';
}

/**
 * Get all roles from user data
 * Returns array of roles
 */
export function getAllRoles(userData: any): string[] {
  // Check for roles array first
  if (userData?.roles && Array.isArray(userData.roles) && userData.roles.length > 0) {
    return userData.roles;
  }
  
  // Fallback to single role
  const singleRole = userData?.role || userData?.user_type || 'user';
  return [singleRole];
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
