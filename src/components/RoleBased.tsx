import React from 'react';
import { useAuth } from '@/auth/AuthContext';
import { hasPermission, type RolePermissions } from '@/utils/rolePermissions';

interface RoleBasedProps {
  children: React.ReactNode;
  permission?: keyof RolePermissions;
  roles?: string[];
  fallback?: React.ReactNode;
  requireAll?: boolean; // If true, user must have all specified roles
}

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
  
  if (!user) {
    return <>{fallback}</>;
  }

  // Check permission-based access
  if (permission) {
    const hasAccess = hasPermission(user.role, permission);
    if (!hasAccess) {
      return <>{fallback}</>;
    }
  }

  // Check role-based access
  if (roles && roles.length > 0) {
    const userRole = user.role.toLowerCase();
    const hasRole = requireAll
      ? roles.every(role => role.toLowerCase() === userRole)
      : roles.some(role => role.toLowerCase() === userRole);
    
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
