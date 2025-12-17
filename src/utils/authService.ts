// JWT Authentication Service - Enhanced
import { jwtDecode } from 'jwt-decode'

// Storage keys for different data types
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'dsecure_access_token',
  REFRESH_TOKEN: 'dsecure_refresh_token',
  USER_DATA: 'dsecure_user_data',
  REMEMBER_ME: 'dsecure_remember_me'
} as const

// Enhanced JWT payload interface
export interface JWTPayload {
  sub?: string        // Subject (usually user ID)
  id?: string         // Alternative user ID field
  user_name?: string  // Username
  email?: string      // User email
  role?: string       // User role
  permissions?: string[] // User permissions
  exp?: number        // Expiration time
  iat?: number        // Issued at time
  iss?: string        // Issuer
  [key: string]: any  // Allow other properties
}

// User data interface
export interface User {
  id: string
  email: string
  user_email?: string  // JWT token field (alias for email)
  username?: string
  name?: string
  role?: string
  permissions?: string[]
  paymentStatus?: 'pending' | 'completed' | 'failed'
  licenseStatus?: 'active' | 'expired' | 'pending'
  paymentDetails?: any
  licenseDetails?: any
}

class AuthService {
  private refreshTimeoutId: NodeJS.Timeout | null = null

  saveTokens(accessToken: string, refreshToken?: string, rememberMe: boolean = false): void {
    try {
      // Validate access token
      if (!accessToken || typeof accessToken !== 'string' || accessToken.trim() === '') {
        throw new Error('Invalid access token provided')
      }

      // Check if token has basic JWT structure
      const tokenParts = accessToken.split('.')
      if (tokenParts.length !== 3) {
        console.warn('Access token does not have standard JWT format, but saving anyway')
      }

      // Validate refresh token if provided
      if (refreshToken && (typeof refreshToken !== 'string' || refreshToken.trim() === '')) {
        console.warn('Invalid refresh token provided, ignoring...')
        refreshToken = undefined
      }

      if (rememberMe) {
        // Use localStorage for persistent login
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
        if (refreshToken) {
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
        }
        localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true')

        // Clear session storage
        sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
        sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
      } else {
        // Use sessionStorage for session-only login
        sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
        if (refreshToken) {
          sessionStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
        }
        localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME)

        // Clear localStorage tokens
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
      }

      // Set up automatic token refresh
      this.scheduleTokenRefresh(accessToken)
      // //console.log('Tokens saved successfully')

    } catch (error) {
      // console.error('Failed to save tokens:', error)
      throw new Error('Failed to save authentication tokens')
    }
  }

  getAccessToken(): string | null {
    const isRemembered = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true'

    if (isRemembered) {
      return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    } else {
      return sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    }
  }

  getRefreshToken(): string | null {
    const isRemembered = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true'

    if (isRemembered) {
      return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    } else {
      return sessionStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    }
  }

  clearTokens(): void {
    // Clear from both storage types
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    sessionStorage.removeItem(STORAGE_KEYS.USER_DATA)

    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER_DATA)
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME)

    // Also clear the actual user_data key that's being used
    localStorage.removeItem('user_data')
    localStorage.removeItem('authUser')

    // Clear the refresh timeout
    if (this.refreshTimeoutId) {
      clearTimeout(this.refreshTimeoutId)
      this.refreshTimeoutId = null
    }

    // console.log('✅ All authentication data cleared from storage')
  }

  isAuthenticated(): boolean {
    // ✅ Check for demo mode first - demo users are always authenticated
    const isDemoMode = localStorage.getItem('demo_mode') === 'true'
    if (isDemoMode) {
      // console.log('🎭 Demo mode detected - user is authenticated')
      return true
    }

    const token = this.getAccessToken()
    if (!token) return false

    try {
      const isValid = this.isTokenValid(token)
      if (!isValid) {
        // //console.log('Token is expired or invalid, clearing tokens')
        this.clearTokens()
        return false
      }
      return true
    } catch (error) {
      // console.error('Error checking authentication:', error)
      this.clearTokens()
      return false
    }
  }

  isTokenValid(token: string): boolean {
    try {
      const payload = jwtDecode<JWTPayload>(token)

      if (!payload.exp) {
        // console.warn('Token does not have expiration time')
        return true // Assume valid if no expiration
      }

      const currentTime = Math.floor(Date.now() / 1000)
      const isValid = payload.exp > currentTime

      if (!isValid) {
        // //console.log('Token has expired')
      }

      return isValid
    } catch (error) {
      // console.error('Error validating token:', error)
      return false
    }
  }

  getUserFromToken(token?: string): User | null {
    try {
      // First, try to get user_email from stored user_data in localStorage
      const storedUserData = this.getStoredUserData()
      // console.log('💾 Stored user_data from localStorage:', storedUserData)

      const accessToken = token || this.getAccessToken()
      if (!accessToken) return null

      const payload = jwtDecode<JWTPayload>(accessToken)

      // Extract user ID safely with fallbacks
      const userId = payload.sub || payload.id || payload.user_id || 'unknown'

      // Extract username safely with fallbacks  
      const username = payload.user_name || payload.username || payload.name || 'Unknown User'

      // PRIORITY: Use user_email from stored user_data, then JWT, then fallback
      const email = storedUserData?.user_email || payload.user_email || payload.email || 'unknown@example.com'

      // console.log('🔍 JWT Payload:', { user_email: payload.user_email, email: payload.email })
      // console.log('✅ Final extracted email:', email)

      return {
        id: String(userId),
        email: String(email),
        user_email: String(email), // Set both email and user_email to same value
        username: String(username),
        role: payload.role || 'user',
        permissions: Array.isArray(payload.permissions) ? payload.permissions : []
      }
    } catch (error) {
      console.error('Error extracting user from token:', error)
      return null
    }
  }

  hasRole(requiredRole: string): boolean {
    const user = this.getUserFromToken()
    return user?.role === requiredRole || false
  }

  hasPermission(requiredPermission: string): boolean {
    const user = this.getUserFromToken()
    return user?.permissions?.includes(requiredPermission) || false
  }

  hasAnyPermission(requiredPermissions: string[]): boolean {
    const user = this.getUserFromToken()
    if (!user?.permissions) return false

    return requiredPermissions.some(permission =>
      user.permissions?.includes(permission)
    )
  }

  hasAllPermissions(requiredPermissions: string[]): boolean {
    const user = this.getUserFromToken()
    if (!user?.permissions) return false

    return requiredPermissions.every(permission =>
      user.permissions?.includes(permission)
    )
  }

  scheduleTokenRefresh(token?: string): void {
    try {
      const accessToken = token || this.getAccessToken()
      if (!accessToken) return

      const payload = jwtDecode<JWTPayload>(accessToken)

      if (!payload.exp) {
        console.warn('Token does not have expiration time, cannot schedule refresh')
        return
      }

      const currentTime = Math.floor(Date.now() / 1000)
      const expirationTime = payload.exp

      // Refresh 5 minutes before expiration
      const refreshTime = expirationTime - currentTime - (5 * 60)

      if (refreshTime <= 0) {
        // //console.log('Token is about to expire, should refresh immediately')
        this.attemptTokenRefresh()
        return
      }

      // Clear existing timeout
      if (this.refreshTimeoutId) {
        clearTimeout(this.refreshTimeoutId)
      }

      // Schedule refresh
      this.refreshTimeoutId = setTimeout(() => {
        this.attemptTokenRefresh()
      }, refreshTime * 1000)

      // //console.log(`Token refresh scheduled in ${refreshTime} seconds`)
    } catch (error) {
      // console.error('Error scheduling token refresh:', error)
    }
  }

  private async attemptTokenRefresh(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken()
      if (!refreshToken) {
        // //console.log('No refresh token available')
        window.dispatchEvent(new CustomEvent('authenticationFailed'))
        return
      }

      // Call refresh endpoint
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      })

      if (response.ok) {
        const data = await response.json()
        const isRemembered = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true'

        this.saveTokens(data.accessToken, data.refreshToken, isRemembered)

        // Notify components about token refresh
        window.dispatchEvent(new CustomEvent('tokenRefreshed', {
          detail: { token: data.accessToken }
        }))

        // //console.log('Token refreshed successfully')
      } else {
        // console.error('Token refresh failed')
        this.clearTokens()
        window.dispatchEvent(new CustomEvent('authenticationFailed'))
      }
    } catch (error) {
      // console.error('Error during token refresh:', error)
      this.clearTokens()
      window.dispatchEvent(new CustomEvent('authenticationFailed'))
    }
  }

  // Manual token refresh method for API client
  async manualRefreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken()
      if (!refreshToken) {
        return false
      }

      // Call refresh endpoint
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      })

      if (response.ok) {
        const data = await response.json()
        const isRemembered = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true'

        this.saveTokens(data.accessToken, data.refreshToken, isRemembered)

        // Notify components about token refresh
        window.dispatchEvent(new CustomEvent('tokenRefreshed', {
          detail: { token: data.accessToken }
        }))

        return true
      } else {
        this.clearTokens()
        return false
      }
    } catch (error) {
      console.error('Error during manual token refresh:', error)
      this.clearTokens()
      return false
    }
  }

  getTokenExpiration(token?: string): Date | null {
    try {
      const accessToken = token || this.getAccessToken()
      if (!accessToken) return null

      const payload = jwtDecode<JWTPayload>(accessToken)

      if (!payload.exp) return null

      return new Date(payload.exp * 1000)
    } catch (error) {
      console.error('Error getting token expiration:', error)
      return null
    }
  }

  getTimeUntilExpiration(token?: string): number | null {
    const expiration = this.getTokenExpiration(token)
    if (!expiration) return null

    return expiration.getTime() - Date.now()
  }

  // Alias for getTimeUntilExpiration for backward compatibility
  getTimeUntilExpiry(token?: string): number | null {
    return this.getTimeUntilExpiration(token)
  }

  // Check if token is about to expire (within 5 minutes)
  isTokenAboutToExpire(token?: string): boolean {
    const timeUntilExpiry = this.getTimeUntilExpiration(token)
    if (!timeUntilExpiry) return false

    // Return true if token expires in less than 5 minutes (300000 ms)
    return timeUntilExpiry < 300000
  }

  // Get user permissions from token
  getPermissions(token?: string): string[] {
    const user = this.getUserFromToken(token)
    return user?.permissions || []
  }

  // Check if user has completed payment setup
  hasPaymentSetup(): boolean {
    try {
      const userData = this.getUserFromToken()
      const storedUserData = this.getStoredUserData()

      // Check from JWT first, then stored data
      const paymentDetails = userData?.paymentDetails || storedUserData?.payment_details_json

      if (!paymentDetails) return false

      // If it's a string, try to parse it
      if (typeof paymentDetails === 'string') {
        try {
          const parsed = JSON.parse(paymentDetails)
          return Object.keys(parsed).length > 0
        } catch {
          return false
        }
      }

      // If it's already an object
      return Object.keys(paymentDetails).length > 0
    } catch (error) {
      console.error('Error checking payment setup:', error)
      return false
    }
  }

  // Check if user has active license
  hasActiveLicense(): boolean {
    try {
      const userData = this.getUserFromToken()
      const storedUserData = this.getStoredUserData()

      // Check from JWT first, then stored data
      const licenseDetails = userData?.licenseDetails || storedUserData?.license_details_json

      if (!licenseDetails) return false

      // If it's a string, try to parse it
      if (typeof licenseDetails === 'string') {
        try {
          const parsed = JSON.parse(licenseDetails)
          return Object.keys(parsed).length > 0
        } catch {
          return false
        }
      }

      // If it's already an object
      return Object.keys(licenseDetails).length > 0
    } catch (error) {
      console.error('Error checking license status:', error)
      return false
    }
  }

  // Store additional user data
  saveUserData(userData: any): void {
    try {
      const isRemembered = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true'
      const dataString = JSON.stringify(userData)

      if (isRemembered) {
        localStorage.setItem(STORAGE_KEYS.USER_DATA, dataString)
      } else {
        sessionStorage.setItem(STORAGE_KEYS.USER_DATA, dataString)
      }
    } catch (error) {
      console.error('Error saving user data:', error)
    }
  }

  // Get stored user data
  getStoredUserData(): any | null {
    try {
      const isRemembered = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true'
      const dataString = isRemembered
        ? localStorage.getItem(STORAGE_KEYS.USER_DATA)
        : sessionStorage.getItem(STORAGE_KEYS.USER_DATA)

      return dataString ? JSON.parse(dataString) : null
    } catch (error) {
      console.error('Error getting stored user data:', error)
      return null
    }
  }

  // Additional methods for enhanced functionality
  getAuthHeader(): { Authorization: string } | {} {
    const token = this.getAccessToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  // ✅ Get current user's email from token or stored data
  getUserEmail(): string | null {
    try {
      // Try from stored user data first
      const storedUser = localStorage.getItem('user_data');
      const authUser = localStorage.getItem('authUser');

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const email = userData.user_email || userData.email;
        if (email) return email;
      }

      if (authUser) {
        const userData = JSON.parse(authUser);
        const email = userData.user_email || userData.email;
        if (email) return email;
      }

      // Fallback to token
      const user = this.getUserFromToken();
      return user?.email || user?.user_email || null;
    } catch {
      return null;
    }
  }

  setTokens(accessToken: string, refreshToken?: string, rememberMe: boolean = false): void {
    this.saveTokens(accessToken, refreshToken, rememberMe)
  }

  setUserData(userData: any): void {
    this.saveUserData(userData)
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.getUserFromToken()
    if (!user?.role) return false
    return roles.includes(user.role)
  }

  hasValidPaymentDetails(user: any): boolean {
    try {
      const paymentDetails = user?.payment_details_json
      if (!paymentDetails || paymentDetails === '{}') return false

      if (typeof paymentDetails === 'string') {
        const parsed = JSON.parse(paymentDetails)
        return Object.keys(parsed).length > 0
      }

      return Object.keys(paymentDetails).length > 0
    } catch {
      return false
    }
  }

  hasValidLicenseDetails(user: any): boolean {
    try {
      const licenseDetails = user?.license_details_json
      if (!licenseDetails || licenseDetails === '{}') return false

      if (typeof licenseDetails === 'string') {
        const parsed = JSON.parse(licenseDetails)
        return Object.keys(parsed).length > 0
      }

      return Object.keys(licenseDetails).length > 0
    } catch {
      return false
    }
  }

  isUserSetupComplete(user: any): boolean {
    return this.hasValidPaymentDetails(user) && this.hasValidLicenseDetails(user)
  }

  getRedirectPath(user: any): string {
    if (!user) return '/login'

    const hasPayment = this.hasValidPaymentDetails(user)
    const hasLicense = this.hasValidLicenseDetails(user)

    if (!hasPayment || !hasLicense) {
      return '/payment-setup'
    }

    // Everyone redirects to admin dashboard
    return '/admin'  // Admin dashboard for all users
  }
}

// Create and export a singleton instance
export const authService = new AuthService()
export default authService