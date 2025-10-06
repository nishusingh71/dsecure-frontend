import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { authService } from '../utils/authService'

interface ProtectedRouteProps {
  children: React.ReactNode
  roles?: string[]
  permissions?: string[]
  redirectTo?: string
  fallbackComponent?: React.ComponentType
}

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: any
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles = [],
  permissions = [],
  redirectTo = '/login',
  fallbackComponent: FallbackComponent,
}) => {
  const location = useLocation()
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  })

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const isAuthenticated = authService.isAuthenticated()
        const user = authService.getUserFromToken()

        setAuthState({
          isAuthenticated,
          isLoading: false,
          user,
        })
      } catch (error) {
        console.error('Authentication check failed:', error)
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        })
      }
    }

    // Initial check
    checkAuthentication()

    // Listen for authentication changes
    const handleAuthChange = () => {
      checkAuthentication()
    }

    const handleTokenRefresh = () => {
      checkAuthentication()
    }

    const handleAuthFailure = () => {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      })
    }

    // Add event listeners
    window.addEventListener('authStateChanged', handleAuthChange)
    window.addEventListener('tokenRefreshed', handleTokenRefresh)
    window.addEventListener('authenticationFailed', handleAuthFailure)

    // Cleanup
    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange)
      window.removeEventListener('tokenRefreshed', handleTokenRefresh)
      window.removeEventListener('authenticationFailed', handleAuthFailure)
    }
  }, [])

  // Show loading spinner while checking authentication
  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!authState.isAuthenticated) {
    // Store the attempted location for redirect after login
    sessionStorage.setItem('redirectAfterLogin', location.pathname + location.search)
    return <Navigate to={redirectTo} replace state={{ from: location }} />
  }

  // Check role-based access
  if (roles.length > 0 && !authService.hasAnyRole(roles)) {
    if (FallbackComponent) {
      return <FallbackComponent />
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="mt-2 text-gray-600">
            You don't have permission to access this page.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Required roles: {roles.join(', ')}
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  // Check permission-based access
  if (permissions.length > 0 && !permissions.every(permission => authService.hasPermission(permission))) {
    const missingPermissions = permissions.filter(permission => !authService.hasPermission(permission))
    
    if (FallbackComponent) {
      return <FallbackComponent />
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Insufficient Permissions</h1>
          <p className="mt-2 text-gray-600">
            You don't have the required permissions to access this page.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Missing permissions: {missingPermissions.join(', ')}
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  // User is authenticated and authorized
  return <>{children}</>
}

// Higher-order component for easier usage
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<ProtectedRouteProps, 'children'> = {}
) => {
  return (props: P) => (
    <ProtectedRoute {...options}>
      <Component {...props} />
    </ProtectedRoute>
  )
}

// Utility hook for getting current user in protected components
export const useCurrentUser = () => {
  const [user, setUser] = useState(authService.getUserFromToken())

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(authService.getUserFromToken())
    }

    window.addEventListener('authStateChanged', handleAuthChange)
    window.addEventListener('tokenRefreshed', handleAuthChange)
    window.addEventListener('authenticationFailed', () => setUser(null))

    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange)
      window.removeEventListener('tokenRefreshed', handleAuthChange)
      window.removeEventListener('authenticationFailed', () => setUser(null))
    }
  }, [])

  return user
}

// Role-based component visibility
interface RoleGuardProps {
  roles: string[]
  fallback?: React.ReactNode
  children: React.ReactNode
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ roles, fallback = null, children }) => {
  const hasAccess = authService.hasAnyRole(roles)
  return hasAccess ? <>{children}</> : <>{fallback}</>
}

// Permission-based component visibility
interface PermissionGuardProps {
  permissions: string[]
  fallback?: React.ReactNode
  children: React.ReactNode
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({ 
  permissions, 
  fallback = null, 
  children 
}) => {
  const hasAccess = permissions.every(permission => authService.hasPermission(permission))
  return hasAccess ? <>{children}</> : <>{fallback}</>
}

export default ProtectedRoute
