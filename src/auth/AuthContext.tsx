import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authService } from '../utils/authService'
import { apiClient } from '../utils/enhancedApiClient'
import type { User } from '../utils/enhancedApiClient'

export type Role = 'user' | 'admin' | 'manager'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: Role
  token: string
  department?: string
  payment_details_json?: string
  license_details_json?: string
  phone_number?: string
  is_private_cloud?: boolean
  private_api?: boolean
}

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  demoLogin: () => Promise<void>
  register: (registrationData: {
    user_name: string
    user_email: string
    user_password: string
    phone_number: string
    is_private_cloud: boolean
    private_api: boolean
    payment_details_json: string
    license_details_json: string
  }) => Promise<void>
  logout: () => Promise<void>
  isUsingApi: boolean
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  hasRole: (role: string) => boolean
  hasPermission: (permission: string) => boolean
  refreshToken: () => Promise<boolean>
  hasValidPaymentDetails: () => boolean
  hasValidLicenseDetails: () => boolean
  isUserSetupComplete: () => boolean
  getSmartRedirectPath: () => string
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function convertJWTUserToAuthUser(jwtUser: any, token: string): AuthUser {
  // Safely extract user data with fallbacks
  return {
    id: jwtUser?.sub || jwtUser?.id || 'unknown',
    email: jwtUser?.email || '',
    name: jwtUser?.name || jwtUser?.user_name || 'Unknown User',
    role: (jwtUser?.role as Role) || 'user',
    token,
    department: jwtUser?.department || '',
    payment_details_json: jwtUser?.payment_details_json || '{}',
    license_details_json: jwtUser?.license_details_json || '{}',
    phone_number: jwtUser?.phone_number || '',
    is_private_cloud: jwtUser?.is_private_cloud || false,
    private_api: jwtUser?.private_api || false,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isUsingApi] = useState(true) // Always use API with JWT
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize authentication state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // //console.log('Initializing auth...')
        
        // Check if in demo mode first
        const isDemoMode = localStorage.getItem('demo_mode') === 'true'
        // //console.log('Demo mode:', isDemoMode)
        
        // Check for regular authentication (including demo tokens stored via authService)
        if (authService.isAuthenticated()) {
          // //console.log('AuthService says authenticated')
          const jwtUser = authService.getUserFromToken()
          const token = authService.getAccessToken()
          
          if (jwtUser && token) {
            // //console.log('JWT user found:', jwtUser)
            const authUser = convertJWTUserToAuthUser(jwtUser, token)
            setUser(authUser)
          } else {
            // //console.log('JWT parsing failed, clearing tokens')
            // If JWT parsing failed, clear tokens
            authService.clearTokens()
          }
        } else {
          // //console.log('Not authenticated')
        }
      } catch (error) {
        // console.error('Failed to initialize authentication:', error)
        authService.clearTokens()
        // Clear demo data on error
        localStorage.removeItem('demo_mode')
        setError('Authentication initialization failed')
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for authentication events
    const handleTokenRefresh = (event: Event) => {
      try {
        const customEvent = event as CustomEvent
        if (customEvent.detail?.token) {
          const jwtUser = authService.getUserFromToken(customEvent.detail.token)
          if (jwtUser) {
            const authUser = convertJWTUserToAuthUser(jwtUser, customEvent.detail.token)
            setUser(authUser)
            
            // Dispatch auth state change event
            window.dispatchEvent(new CustomEvent('authStateChanged', { detail: authUser }))
          }
        }
      } catch (error) {
        console.error('Token refresh handling failed:', error)
      }
    }

    const handleAuthFailure = () => {
      setUser(null)
      setError('Authentication failed. Please login again.')
      
      // Dispatch auth state change event
      window.dispatchEvent(new CustomEvent('authStateChanged', { detail: null }))
    }

    window.addEventListener('tokenRefreshed', handleTokenRefresh)
    window.addEventListener('authenticationFailed', handleAuthFailure)

    return () => {
      window.removeEventListener('tokenRefreshed', handleTokenRefresh)
      window.removeEventListener('authenticationFailed', handleAuthFailure)
    }
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await apiClient.login({ email, password })
      
      if (result.success && result.data) {
        const { user: apiUser, token } = result.data
        
        // Validate that we have required data
        if (!token) {
          throw new Error('No authentication token received')
        }
        
        if (!apiUser) {
          throw new Error('No user data received')
        }
        
        const authUser = convertJWTUserToAuthUser(apiUser, token)
        setUser(authUser)
        
        // Dispatch auth state change event
        window.dispatchEvent(new CustomEvent('authStateChanged', { detail: authUser }))
        
        return
      } else {
        throw new Error(result.error || 'Login failed')
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      
      // Clear any partial authentication state
      authService.clearTokens()
      setUser(null)
      
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Demo login function that bypasses all backend authentication
  const demoLogin = async () => {
    setLoading(true)
    setError(null)

    try {
      // //console.log('Starting demo login...')
      
      // Create a dummy JWT token with proper structure for demo admin
      const dummyJWTPayload = {
        sub: 'demo-admin-001',
        id: 'demo-admin-001', 
        email: 'demo@admin.com',
        user_name: 'Demo Administrator',
        role: 'admin',
        permissions: ['admin_dashboard', 'user_management', 'reports', 'audit_logs'],
        exp: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60), // 1 year from now
        iat: Math.floor(Date.now() / 1000),
        iss: 'dsecure-demo'
      }
      
      // Create a fake JWT token (base64 encoded payload)
      const header = btoa(JSON.stringify({ typ: 'JWT', alg: 'HS256' }))
      const payload = btoa(JSON.stringify(dummyJWTPayload))
      const signature = btoa('demo-signature')
      const dummyToken = `${header}.${payload}.${signature}`
      
      // //console.log('Generated demo token:', dummyToken)
      
      // Use authService to store the demo token properly
      authService.setTokens(dummyToken, 'demo-refresh-token', false)
      
      // Create AuthUser object
      const dummyAdminUser: AuthUser = {
        id: 'demo-admin-001',
        email: 'demo@admin.com',
        name: 'Demo Administrator',
        role: 'admin',
        token: dummyToken,
        department: 'IT Administration',
        payment_details_json: JSON.stringify({
          planType: 'enterprise',
          status: 'active',
          billingCycle: 'annual',
          amount: 9999,
          currency: 'USD'
        }),
        license_details_json: JSON.stringify({
          licenseType: 'enterprise',
          maxUsers: 1000,
          maxDevices: 10000,
          expiryDate: '2030-12-31',
          features: ['admin_dashboard', 'user_management', 'reports', 'audit_logs']
        }),
        phone_number: '+1-555-0123',
        is_private_cloud: true,
        private_api: true
      }
      
      // Save user data to authService
      authService.saveUserData(dummyAdminUser)
      
      // Set the user in AuthContext
      setUser(dummyAdminUser)
      
      // Mark as demo mode
      localStorage.setItem('demo_mode', 'true')
      
      // //console.log('Demo login completed successfully')
      
      // Dispatch auth state change event
      window.dispatchEvent(new CustomEvent('authStateChanged', { detail: dummyAdminUser }))
      
    } catch (err) {
      console.error('Demo login error:', err)
      const errorMessage = 'Demo login failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const register = async (registrationData: {
    user_name: string
    user_email: string
    user_password: string
    phone_number: string
    is_private_cloud: boolean
    private_api: boolean
    payment_details_json: string
    license_details_json: string
  }) => {
    setLoading(true)
    setError(null)

    try {
      const result = await apiClient.register(registrationData)
      
      if (result.success && result.data) {
        const { user: apiUser, token } = result.data
        
        // Validate that we have required data
        if (!token) {
          throw new Error('No authentication token received')
        }
        
        if (!apiUser) {
          throw new Error('No user data received')
        }
        
        const authUser = convertJWTUserToAuthUser(apiUser, token)
        setUser(authUser)
        
        // Dispatch auth state change event
        window.dispatchEvent(new CustomEvent('authStateChanged', { detail: authUser }))
        
        return
      } else {
        throw new Error(result.error || 'Registration failed')
      }
      
    } catch (err) {
      let errorMessage = 'Registration failed'
      
      if (err instanceof Error) {
        if (err.message.includes('409') || err.message.toLowerCase().includes('already exists')) {
          errorMessage = 'An account with this email already exists. Please try logging in instead.'
        } else if (err.message.includes('400') || err.message.toLowerCase().includes('validation')) {
          errorMessage = 'Please check your registration information and try again.'
        } else {
          errorMessage = err.message
        }
      }
      
      setError(errorMessage)
      
      // Clear any partial authentication state
      authService.clearTokens()
      setUser(null)
      
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    
    try {
      // Check if in demo mode
      const isDemoMode = localStorage.getItem('demo_mode') === 'true'
      
      if (isDemoMode) {
        // Clear demo mode data
        localStorage.removeItem('demo_mode')
        // Clear authService tokens
        authService.clearTokens()
      } else {
        // Call API logout for real users
        await apiClient.logout()
      }
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setUser(null)
      setError(null)
      setLoading(false)
      
      // Dispatch auth state change event
      window.dispatchEvent(new CustomEvent('authStateChanged', { detail: null }))
    }
  }

  const refreshToken = async (): Promise<boolean> => {
    try {
      const success = await authService.manualRefreshToken()
      
      if (success) {
        const jwtUser = authService.getUserFromToken()
        const token = authService.getAccessToken()
        
        if (jwtUser && token) {
          const authUser = convertJWTUserToAuthUser(jwtUser, token)
          setUser(authUser)
          
          // Dispatch auth state change event
          window.dispatchEvent(new CustomEvent('authStateChanged', { detail: authUser }))
        }
      }
      
      return success
    } catch (error) {
      console.error('Token refresh failed:', error)
      return false
    }
  }

  const isAuthenticated = useMemo(() => {
    return authService.isAuthenticated()
  }, [user])

  const hasRole = (role: string): boolean => {
    return authService.hasRole(role)
  }

  const hasPermission = (permission: string): boolean => {
    return authService.hasPermission(permission)
  }

  const hasValidPaymentDetails = (): boolean => {
    return authService.hasValidPaymentDetails(user)
  }

  const hasValidLicenseDetails = (): boolean => {
    return authService.hasValidLicenseDetails(user)
  }

  const isUserSetupComplete = (): boolean => {
    return authService.isUserSetupComplete(user)
  }

  const getSmartRedirectPath = (): string => {
    return authService.getRedirectPath(user)
  }

  const value = useMemo(() => ({ 
    user, 
    login, 
    demoLogin,
    register, 
    logout, 
    isUsingApi, 
    loading, 
    error,
    isAuthenticated,
    hasRole,
    hasPermission,
    refreshToken,
    hasValidPaymentDetails,
    hasValidLicenseDetails,
    isUserSetupComplete,
    getSmartRedirectPath
  }), [user, isUsingApi, loading, error, isAuthenticated])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


