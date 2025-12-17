import React from 'react';
import { useAuth } from '@/auth/AuthContext';
import { hasPermission, type RolePermissions } from '@/utils/rolePermissions';
import { getPrimaryRole } from '@/utils/roleHelper';

interface RoleBasedProps {
  children: React.ReactNode;
  permission?: keyof RolePermissions;
  roles?: string[];
  fallback?: React.ReactNode;
  requireAll?: boolean; // If true, user must have all specified roles
}

/**
 * Helper to get user data from localStorage
 */
const getUserDataFromStorage = () => {
  const storedUser = localStorage.getItem('user_data');
  const authUser = localStorage.getItem('authUser');
  
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (e) {
      console.error('Error parsing user_data:', e);
    }
  }
  
  if (authUser) {
    try {
      return JSON.parse(authUser);
    } catch (e) {
      console.error('Error parsing authUser:', e);
    }
  }
  
  return null;
};

/**
 * Role-Based Component Wrapper
 * Conditionally renders children based on user permissions or roles
 * 
 * Usage:
 * <RoleBased permission="canCreateUser">
 *   <Button>Add User</Button>
 * </RoleBased>
 * 
 * <RoleBased roles={['superadmin', 'admin']}>
 *   <AdminPanel />
 * </RoleBased>
 */
export const RoleBased: React.FC<RoleBasedProps> = ({ 
  children, 
  permission, 
  roles, 
  fallback = null,
  requireAll = false 
}) => {
  const { user } = useAuth();
  
  // Try to get user from AuthContext first, then fallback to localStorage
  let currentUser = user;
  if (!currentUser) {
    const storedUserData = getUserDataFromStorage();
    if (storedUserData) {
      currentUser = storedUserData;
      // console.log('🔄 RoleBased: Using localStorage user data as fallback:', {
        // role: storedUserData.role,
        // roles: storedUserData.roles,
        // email: storedUserData.email
      // });
    }
  }
  
  if (!currentUser) {
    console.warn('⚠️ RoleBased: No user found in AuthContext or localStorage');
    return <>{fallback}</>;
  }

  // Get the user's primary role using the helper
  const userRole = getPrimaryRole(currentUser);
  
  // console.log('🔍 RoleBased check:', {
  //   userRole,
  //   permission,
  //   requestedRoles: roles,
  //   userFromContext: !!user,
  //   userFromStorage: !user && !!currentUser
  // });

  // Check permission-based access
  if (permission) {
    const hasAccess = hasPermission(userRole, permission);
    // console.log(`🔐 Permission check: ${permission} = ${hasAccess} (role: ${userRole})`);
    if (!hasAccess) {
      return <>{fallback}</>;
    }
  }

  // Check role-based access
  if (roles && roles.length > 0) {
    const normalizedUserRole = userRole.toLowerCase();
    const hasRole = requireAll
      ? roles.every(role => role.toLowerCase() === normalizedUserRole)
      : roles.some(role => role.toLowerCase() === normalizedUserRole);
    
    // console.log(`👤 Role check: ${normalizedUserRole} in [${roles.join(', ')}] = ${hasRole}`);
    
    if (!hasRole) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
};

interface ConditionalRenderProps {
  when: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Conditional Render Helper
 * Simple wrapper for conditional rendering
 */
export const ConditionalRender: React.FC<ConditionalRenderProps> = ({ 
  when, 
  children, 
  fallback = null 
}) => {
  return when ? <>{children}</> : <>{fallback}</>;
};

export default RoleBased;
