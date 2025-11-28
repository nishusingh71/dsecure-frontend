// import { User } from './authService';
// import { Subuser } from './enhancedApiClient';
// Enhanced API Client with JWT Integration
import axios, { AxiosResponse } from 'axios'
import { authService } from './authService.js'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.dsecuretech.com'
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000')

// Debug mode for development
const DEBUG_MODE = import.meta.env.DEV

if (DEBUG_MODE) {
  console.log('API Configuration:', {
    baseUrl: API_BASE_URL,
    timeout: API_TIMEOUT,
    environment: import.meta.env.MODE
  })
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface User {
  user_id: string
  user_email: string
  user_name: string
  role: 'admin' | 'user' | 'manager'
  status?: 'active' | 'inactive' | 'pending' | 'suspended' // Made optional
  department?: string // Made optional
  lastLogin?: string
  createdAt?: string // Made optional (set by backend)
  updatedAt?: string // Made optional (set by backend)
  payment_details_json?: string
  license_details_json?: string
  phone_number?: string
  timezone?: string // Timezone field
  is_private_cloud?: boolean
  private_api?: boolean
  currentPassword?: string // For password change
  newPassword?: string // For password change
  user_role?:string
  last_login?:string
  user_group?:string 
  licesne_allocation?:string
  // ✅ Subuser-specific fields (for when User API returns Subuser data)
  subuser_name?: string
  subuser_phone?: string
  subuser_email?: string
  name?: string // Generic name field (alias for user_name or subuser_name)
  phone?: string // Generic phone field (alias for phone_number or subuser_phone)
  email?: string // Generic email field (alias for user_email or subuser_email)
  activity_status?:string
}

export interface Subuser {
  id: string
  user_email: string
  subuser_email: string
  subuser_name?: string
  superuser_email: string
  created_at?: string
  status?: string
  licenseUsage?: number // Calculated from machines with demo_usage_count > 0
  subuser_role?: string
  subuser_phone?: string
  subuser_password?: string
  // Fields from /api/Users/{email}
  defaultRole?: string
  role?: string
  department?: string
  last_login?: string
  last_logout?: string
  subuser_group?: string
  license_allocation?: string
  name?:string
  phone?:string
  currentPassword?: string // For password change
  newPassword?: string // For password change
  activity_status?:string
}

export interface EnhancedSubuser extends Subuser {
  defaultRole?: string // Role fetched from /api/EnhancedSubuser/{email}
  role?: string // Alias for defaultRole
  department?: string // Department field from EnhancedSubuser API
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  user_name: string
  user_email: string
  user_password: string
  phone_number: string
  is_private_cloud: boolean
  private_api: boolean
  payment_details_json: string
  license_details_json: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
}

export interface Machine {
  // Database fields
  machine_id?: string
  fingerprint_hash?: string
  mac_address?: string
  physical_drive_id?: string
  cpu_id?: string
  bios_serial?: string
  os_version?: string
  user_email?: string
  subuser_email?: string
  license_activated?: boolean
  license_activation_date?: string
  license_days_valid?: number
  license_details_json?: string
  demo_usage_count?: number
  created_at?: string
  updated_at?: string
  vm_status?: string
  
  // UI fields (for backward compatibility)
  id?: string
  hostname?: string
  eraseOption?: string
  license?: string
  status?: string
  lastSeen?: string
  department?: string
  email?: string
}

export interface Report {
  id: string
  date: string
  devices: number
  status: string
  department: string
  generatedBy?: string
  filePath?: string
  report_id?:string
  computer_name?:string
  datetime?:string
}

export interface AuditReport {
  id: string
  reportId: string
  user_email: string
  reportDate: string
  reportType: string
  status: string
  deviceCount?: number
  generatedBy?: string
  filePath?: string
  // New fields from API
  report_id?: string
  report_name?: string
  erasure_method?: string
  report_datetime?: string
}

// System Logs interface
export interface SystemLog {
  log_id: number
  user_email: string
  log_level: string
  log_message: string
  log_details_json?: string
  created_at: string
}

// Commands interface
export interface Command {
  command_id: number
  command_text: string
  issued_at: string
  command_json?: string
  command_status: string
  machine_hash:Machine['fingerprint_hash']
}

// Sessions interface
export interface Session {
  session_id: number
  user_email: string
  login_time: string
  logout_time?: string
  ip_address: string
  device_info?: string
  session_status: string
}

// Request retry configuration
interface RetryConfig {
  maxRetries: number
  retryDelay: number
  exponentialBackoff: boolean
}

// Enhanced API Client with JWT Integration
class EnhancedApiClient {
  private baseURL: string
  private timeout: number
  private retryConfig: RetryConfig
  private readonly MAX_CONCURRENT_REFRESH_ATTEMPTS = 1
  private refreshPromise: Promise<boolean> | null = null

  constructor(baseURL?: string) {
    this.baseURL = baseURL || API_BASE_URL
    this.timeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000')
    this.retryConfig = {
      maxRetries: 3,
      retryDelay: 1000,
      exponentialBackoff: true
    }

    // Listen for authentication events
    this.setupEventListeners()
  }

  private setupEventListeners(): void {
    // Listen for token refresh events
    window.addEventListener('tokenRefreshed', this.handleTokenRefresh.bind(this) as EventListener)
    window.addEventListener('authenticationFailed', this.handleAuthFailure.bind(this) as EventListener)
  }

  private handleTokenRefresh(event: Event): void {
    // //console.log('Token refreshed successfully')
    // You can add any additional logic here when token is refreshed
  }

  private handleAuthFailure(): void {
    // //console.log('Authentication failed - redirecting to login')
    // Clear any cached data and redirect to login
    authService.clearTokens()
    
    // Only redirect if not already on auth pages
    if (!window.location.pathname.includes('/login') && 
        !window.location.pathname.includes('/register')) {
      window.location.href = '/login'
    }
  }

  // JWT Helper Methods
  private isValidJWT(token: string): boolean {
    try {
      const parts = token.split('.')
      return parts.length === 3
    } catch {
      return false
    }
  }

  private decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error('JWT decode error:', error)
      return null
    }
  }

  // Enhanced request method with automatic token handling
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.requestWithRetry<T>(endpoint, options, 0)
  }

  private async requestWithRetry<T>(
    endpoint: string,
    options: RequestInit,
    retryCount: number
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`
    try {
      // Get fresh auth headers
      const authHeaders = authService.getAuthHeader()

      // Create AbortController for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

      const config: RequestInit = {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...authHeaders,
          ...(options.headers || {}),
        },
        mode: 'cors',
        credentials: 'include', // Changed from 'omit' to 'include' for better CORS handling
      }

      if (DEBUG_MODE) {
        // //console.log('🌐 API Request:', { url, method: config.method || 'GET', headers: config.headers })
      }

      const response = await fetch(url, config)
      clearTimeout(timeoutId)

      if (DEBUG_MODE) {
        // //console.log('📡 API Response:', {
        //   status: response.status,
        //   statusText: response.statusText,
        //   headers: Object.fromEntries(response.headers.entries())
        // })
      }

      // Handle token expiration (401 Unauthorized)
      if (response.status === 401 && authService.getAccessToken()) {
        // //console.log('Token expired, attempting refresh...')
        // Try to refresh token (only once concurrently)
        const refreshSuccess = await this.attemptTokenRefresh()
        if (refreshSuccess && retryCount < this.retryConfig.maxRetries) {
          // //console.log('Token refreshed, retrying request...')
          return this.requestWithRetry<T>(endpoint, options, retryCount + 1)
        } else {
          // Token refresh failed, clear auth and return error
          authService.clearTokens()
          return {
            success: false,
            error: 'Authentication expired. Please login again.',
          }
        }
      }

      // Handle empty responses (like 204 No Content)
      let data: any = null
      const contentLength = response.headers.get('content-length')
      const contentType = response.headers.get('content-type')
      
      // Only try to parse JSON if there's content and it's JSON
      if (response.status !== 204 && contentLength !== '0' && contentType?.includes('application/json')) {
        try {
          data = await response.json()
        } catch (jsonError) {
          // If JSON parsing fails but response is ok, treat as success with null data
          if (response.ok) {
            return {
              success: true,
              data: { message: 'Operation completed successfully' } as T
            }
          }
          // If not ok, return error
          return {
            success: false,
            error: 'Failed to parse response',
          }
        }
      } else if (response.ok) {
        // No content but successful - return success
        return {
          success: true,
          data: { message: 'Operation completed successfully' } as T
        }
      }
      
      if (!response.ok) {
        // Handle different error types
        if (response.status >= 500) {
          // Server error - may be worth retrying
          if (retryCount < this.retryConfig.maxRetries) {
            const delay = this.retryConfig.exponentialBackoff 
              ? this.retryConfig.retryDelay * Math.pow(2, retryCount)
              : this.retryConfig.retryDelay
            
            await this.delay(delay)
            return this.requestWithRetry<T>(endpoint, options, retryCount + 1)
          }
        }

        // Handle specific HTTP status codes with better error messages
        let errorMessage = data.message || `HTTP ${response.status}: ${response.statusText}`
        
        if (response.status === 409) {
          errorMessage = data.message || 'User already exists with this email address. Please try logging in instead.'
        } else if (response.status === 400) {
          errorMessage = data.message || 'Invalid registration data. Please check your input and try again.'
        } else if (response.status === 422) {
          errorMessage = data.message || 'Validation failed. Please check your input data.'
        }
        
        return {
          success: false,
          error: errorMessage,
        }
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      }
    } catch (error) {
      if (DEBUG_MODE) {
        console.error('🔥 API Error:', error)
      }
      
      // Handle specific error types
      let errorMessage = 'Network error'
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Request timeout. Please check your connection and try again.'
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage = 'Unable to connect to server. Please check your internet connection. If the problem persists, the backend server at ' + API_BASE_URL + ' may be down or unreachable.'
        } else if (error.message.includes('CORS')) {
          errorMessage = 'CORS error. The backend server needs to allow requests from ' + window.location.origin
        } else if (error.message.includes('certificate') || error.message.includes('SSL')) {
          errorMessage = 'SSL certificate error. Please check server configuration.'
        } else {
          errorMessage = error.message
        }
      }
      
      // Network error - may be worth retrying for certain types
      if (retryCount < this.retryConfig.maxRetries && 
          (error instanceof TypeError || 
           (error instanceof Error && error.message.includes('fetch')))) {
        
        const delay = this.retryConfig.exponentialBackoff 
          ? this.retryConfig.retryDelay * Math.pow(2, retryCount)
          : this.retryConfig.retryDelay
        
        if (DEBUG_MODE) {
          // //console.log(`🔄 Retrying request (${retryCount + 1}/${this.retryConfig.maxRetries}) in ${delay}ms`)
        }
        
        await this.delay(delay)
        return this.requestWithRetry<T>(endpoint, options, retryCount + 1)
      }

      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  // Token refresh with concurrency control
  private async attemptTokenRefresh(): Promise<boolean> {
    // If already refreshing, wait for that to complete
    if (this.refreshPromise) {
      return await this.refreshPromise
    }

    // Start new refresh attempt
    this.refreshPromise = authService.manualRefreshToken()
    
    try {
      const result = await this.refreshPromise
      return result
    } finally {
      this.refreshPromise = null
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Public API methods
  
  // API Health Check
  async testConnection(): Promise<ApiResponse<any>> {
    try {
      const testUrl = `${API_BASE_URL}/api/health`
      
      if (DEBUG_MODE) {
        console.log('🔍 Testing API connection to:', testUrl)
      }

      const response: AxiosResponse = await axios.get(testUrl, {
        timeout: 5000, // Short timeout for health check
        headers: {
          'Accept': 'application/json'
        }
      })

      if (DEBUG_MODE) {
        console.log('✅ API Health Check Success:', response.status)
      }

      return {
        success: true,
        data: response.data,
        message: 'API connection successful'
      }
    } catch (error: any) {
      if (DEBUG_MODE) {
        console.error('❌ API Health Check Failed:', {
          message: error.message,
          code: error.code,
          url: `${API_BASE_URL}/api/health`
        })
      }

      return {
        success: false,
        error: `API connection failed: ${error.message}`,
        message: 'API server is not reachable'
      }
    }
  }
  
  
  // Authentication endpoints
  async login(credentials: LoginRequest, rememberMe: boolean = false): Promise<ApiResponse<AuthResponse>> {
    try {
      const loginUrl = `${API_BASE_URL}/api/RoleBasedAuth/login`
      
      if (DEBUG_MODE) {
        console.log('🚀 Starting login request to:', loginUrl)
        console.log('📧 Credentials email:', credentials.email)
        console.log('🔧 API Configuration:', { API_BASE_URL, API_TIMEOUT })
      }

      // Make direct axios POST request to the login API
      const response: AxiosResponse = await axios.post(
        loginUrl,
        {
          email: credentials.email,
          password: credentials.password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: API_TIMEOUT
        }
      )

      if (DEBUG_MODE) {
        console.log('Login API Response:', response.data)
      }

      // Check if login was successful and we have a JWT token
      if (response.status === 200 && response.data?.token) {
        const { token, user, refreshToken } = response.data

        // Verify JWT token structure
        if (this.isValidJWT(token)) {
          // Decode JWT to get user role
          const decodedToken = this.decodeJWT(token)
          
          if (DEBUG_MODE) {
            console.log('Decoded JWT:', decodedToken)
          }

          // Create user object with role information
          // Preserve all fields from API response, including userRole/user_role
          // ✅ Handle both User and Subuser field names (subuser_name, subuser_phone)
          const userData = {
            ...user, // Keep all original fields from API response
            ...response.data, // Include all top-level response fields
            role: user?.userRole || user?.user_role || decodedToken.role || user?.role || response.data?.userRole || response.data?.user_role || 'user',
            userRole: user?.userRole || response.data?.userRole || user?.user_role || response.data?.user_role, // Preserve camelCase
            user_role: user?.user_role || response.data?.user_role || user?.userRole || response.data?.userRole, // Preserve snake_case
            id: decodedToken.sub || user?.userId || user?.user_id || user?.id || response.data?.userId,
            email: decodedToken.email || user?.email || response.data?.email || credentials.email,
            name: decodedToken.name || user?.userName || user?.user_name || user?.subuser_name || user?.name || response.data?.userName || response.data?.subuser_name || 'User',
            user_name: user?.user_name || user?.userName || user?.subuser_name || response.data?.user_name || response.data?.subuser_name,
            subuser_name: user?.subuser_name || user?.user_name || user?.userName || response.data?.subuser_name||user?.name,
            department: user?.department || response.data?.department,
            user_group: user?.user_group || user?.userGroup || response.data?.userGroup || response.data?.user_group,
            timezone: user?.timezone || response.data?.timezone,
            phone: user?.phone || user?.phone_number || user?.subuser_phone || response.data?.phone || response.data?.subuser_phone,
            phone_number: user?.phone_number || user?.phone || user?.subuser_phone || response.data?.phone_number || response.data?.phone,
            subuser_phone: user?.subuser_phone || user?.phone || user?.phone_number || response.data?.subuser_phone,
            token: token // Add token to userData for easy access
          }

          try {
            // Store tokens using the auth service
            authService.setTokens(token, refreshToken || '', rememberMe)
            
            // Store user data safely
            authService.saveUserData(userData)

            return {
              success: true,
              data: {
                token,
                refreshToken: refreshToken || '',
                user: userData
              }
            }
          } catch (error) {
            console.error('Error storing authentication data:', error)
            return {
              success: false,
              error: 'Failed to store authentication data'
            }
          }
        } else {
          return {
            success: false,
            error: 'Invalid JWT token received from server'
          }
        }
      } else {
        return {
          success: false,
          error: response.data?.message || 'Invalid credentials'
        }
      }
    } catch (error: any) {
      console.error('🚨 Login API Error Details:', {
        message: error.message,
        code: error.code,
        config: error.config ? {
          url: error.config.url,
          method: error.config.method,
          timeout: error.config.timeout
        } : null,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : null,
        request: error.request ? 'Request made but no response' : null
      })
      
      if (error.response) {
        // Server responded with error status
        const statusCode = error.response.status
        const message = error.response.data?.message || error.response.data?.error
        
        if (DEBUG_MODE) {
          console.error(`❌ Server Error ${statusCode}:`, message)
        }
        
        if (statusCode === 401) {
          return {
            success: false,
            error: message || 'Invalid email or password'
          }
        } else if (statusCode === 404) {
          return {
            success: false,
            error: 'User not found. Please register first.'
          }
        } else if (statusCode >= 500) {
          return {
            success: false,
            error: 'Server error. Please try again later.'
          }
        } else {
          return {
            success: false,
            error: message || `Login failed (${statusCode})`
          }
        }
      } else if (error.request) {
        // Network error - no response received
        if (DEBUG_MODE) {
          console.error('🌐 Network Error - No response received from:', `${API_BASE_URL}/api/Auth/login`)
          console.error('Error details:', error.code, error.message)
        }
        
        return {
          success: false,
          error: `Unable to connect to server (${API_BASE_URL}). Please check your internet connection and server status.`
        }
      } else {
        // Other error (request setup, etc.)
        if (DEBUG_MODE) {
          console.error('⚠️ Request Setup Error:', error.message)
        }
        
        return {
          success: false,
          error: error.message || 'Login failed. Please try again.'
        }
      }
    }
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const result = await this.request<AuthResponse>('/api/Users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })

    if (result.success && result.data) {
      // Store tokens using the auth service
      authService.setTokens(
        result.data.token, 
        result.data.refreshToken,
        false // Default to session-only for registration
      )
      
      // Store user data
      authService.saveUserData(result.data.user)
    }

    return result
  }

  async logout(): Promise<ApiResponse<void>> {
    try {
      // Try to notify server about logout
      await this.request<void>('/api/RoleBasedAuth/logout', {
        method: 'POST',
      })
    } catch (error) {
      console.warn('Server logout failed:', error)
    } finally {
      // Always clear local tokens regardless of server response
      authService.clearTokens()
    }

    return { success: true }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>('/api/Users/me')
  }

  async getDashboardStats(): Promise<ApiResponse<any>> {
    return this.request<any>('/api/dashboard/stats', {
      method: 'GET'
    })
  }

  // Check if user setup is complete
  isPaymentSetupComplete(): boolean {
    const result = authService.hasPaymentSetup()
    return result !== null ? result : false
  }

  async refreshToken(): Promise<ApiResponse<{ accessToken: string; refreshToken?: string }>> {
    const refreshToken = authService.getRefreshToken()
    
    if (!refreshToken) {
      return {
        success: false,
        error: 'No refresh token available'
      }
    }

    return this.request<{ accessToken: string; refreshToken?: string }>('/api/RoleBasedAuth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
  }

  // Protected resource endpoints
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>('/api/Users')
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/api/Users/${id}`)
  }

  async getUserByEmail(email: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/api/Users/${encodeURIComponent(email)}`)
  }

  async updateUser(id: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(`/api/Users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  }

  // Profile update endpoint - uses DynamicUser/profile
  async updateUserProfile(userData: { userName: string; phoneNumber: string; timezone?: string }): Promise<ApiResponse<User>> {
    console.log('🌐 Calling PUT /api/DynamicUser/profile with:', userData)
    const response = await this.request<User>(`/api/DynamicUser/profile`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
    console.log('🌐 Response from /api/DynamicUser/profile:', response)
    return response
  }

  // Update timezone endpoint - PATCH /api/RoleBasedAuth/update-timezone
  async updateTimezone(email: string, timezone: string): Promise<ApiResponse<{ message: string; timezone: string }>> {
    console.log('🌐 Calling PATCH /api/RoleBasedAuth/update-timezone with:', { email, timezone })
    const response = await this.request<{ message: string; timezone: string }>(`/api/RoleBasedAuth/update-timezone`, {
      method: 'PATCH',
      body: JSON.stringify({ email, timezone }),
    })
    console.log('🌐 Response from /api/RoleBasedAuth/update-timezone:', response)
    return response
  }

  // Change password endpoint - PATCH /api/EnhancedUsers/{email}/change-password
  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/api/RoleBasedAuth/change-password`, {
      method: 'PATCH',
      body: JSON.stringify({ currentPassword, newPassword }),
    })
  }
// Change password endpoint- PATCH /api/EnhancedSubuser/{email}/change-password
  // async changePasswordSub(email: string, currentPassword: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
  //   return this.request<{ message: string }>(`/api/EnhancedSubuser/${encodeURIComponent(email)}/change-password`, {
  //     method: 'PATCH',
  //     body: JSON.stringify({ currentPassword, newPassword }),
  //   })
  // }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/Users/${id}`, {
      method: 'DELETE',
    })
  }

  // Subuser endpoints
  // async getSubusers(): Promise<ApiResponse<Subuser[]>> {
  //   return this.request<Subuser[]>('/api/Subuser')
  // }
  async getSubusersBySuperuser(superuserEmail: string): Promise<ApiResponse<Subuser[]>> {
    return this.request<Subuser[]>(`/api/Subuser/by-superuser/${encodeURIComponent(superuserEmail)}`)
  }

  async getEnhancedSubuser(email: string): Promise<ApiResponse<EnhancedSubuser>> {
    return this.request<EnhancedSubuser>(`/api/EnhancedSubuser/${encodeURIComponent(email)}`)
  }

  async getEnhancedSubusersByParent(parentEmail: string): Promise<ApiResponse<EnhancedSubuser[]>> {
    return this.request<EnhancedSubuser[]>(`/api/EnhancedSubusers/by-parent/${encodeURIComponent(parentEmail)}`)
  }

  // async getDynamicUserSubusers(): Promise<ApiResponse<Subuser[]>> {
  //   return this.request<Subuser[]>('/api/DynamicUser/subusers')
  // }

  // async getSubuserManagement(): Promise<ApiResponse<Subuser[]>> {
  //   return this.request<Subuser[]>('/api/SubuserManagement')
  // }

  // 🔄 Master method to fetch subusers with fallback across all available endpoints
  async getAllSubusersWithFallback(userEmail?: string): Promise<ApiResponse<Subuser[]>> {
    console.log('🔄 Starting getAllSubusersWithFallback...')
    console.log('📧 User email provided:', userEmail || 'None')

    // ✅ Define endpoint strategies with PRIORITY ORDER
    // Priority 1: User-specific endpoints (by-superuser, by-parent) - returns only current user's subusers
    // Priority 2: Generic endpoints - returns all subusers from database (fallback only)
    const endpointStrategies = [
      // ✅ PRIORITY 1: Subuser by superuser (if email provided) - MOST SPECIFIC
      ...(userEmail ? [{
        name: 'Subuser/by-superuser',
        execute: () => this.getSubusersBySuperuser(userEmail),
      }] : []),
      // ✅ PRIORITY 2: EnhancedSubusers by parent (if email provided)
      ...(userEmail ? [{
        name: 'EnhancedSubusers/by-parent',
        execute: () => this.getEnhancedSubusersByParent(userEmail),
      }] : []),
      // ⚠️ FALLBACK: Generic endpoints (only if user-specific endpoints fail)
      // Strategy 3: DynamicUser endpoint
      // {
      //   name: 'DynamicUser/subusers',
      //   execute: () => this.getDynamicUserSubusers(),
      // },
      // Strategy 4: SubuserManagement endpoint
      // {
      //   name: 'SubuserManagement',
      //   execute: () => this.getSubuserManagement(),
      // },
      // Strategy 5: Base Subuser endpoint (last resort)
      // {
      //   name: 'Subuser',
      //   execute: () => this.getSubusers(),
      // },
    ]

    // Try each endpoint until we get data
    for (const strategy of endpointStrategies) {
      try {
        console.log(`🔍 Trying endpoint: ${strategy.name}...`)
        const response = await strategy.execute()
        
        console.log(`📥 Response from ${strategy.name}:`, {
          success: response.success,
          dataLength: response.data?.length || 0,
          hasData: Array.isArray(response.data) && response.data.length > 0
        })

        // Check if we got valid data
        if (response.success && Array.isArray(response.data) && response.data.length > 0) {
          console.log(`✅ SUCCESS! Got ${response.data.length} subusers from ${strategy.name}`)
          return response
        } else {
          console.log(`⚠️ ${strategy.name} returned empty or invalid data, trying next endpoint...`)
        }
      } catch (error) {
        console.warn(`❌ Error from ${strategy.name}:`, error)
        // Continue to next endpoint
      }
    }

    // If all endpoints failed or returned empty data
    console.warn('⚠️ All subuser endpoints failed or returned no data')
    return {
      success: false,
      data: [],
      message: 'No subusers found from any available endpoint'
    }
  }

async createSubuser(subuserData: {
  name: string
  subuser_email: string
  role: string
  department?: string
  subuser_password: string
  phone: string
  subuser_group?: string
  superuser_email: string
  license_allocation?: string
}): Promise<ApiResponse<Subuser>> {
  return this.request<Subuser>('/api/EnhancedSubuser', {
    method: 'POST',
    body: JSON.stringify(subuserData)
  });
}

  async deleteSubuser(email: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/EnhancedSubuser/${encodeURIComponent(email)}`, {
      method: 'DELETE'
    });
  }

  async updateEnhancedSubuser(email: string, subuserData: {
    subuser_name?: string
    name?: string
    subuser_role?: string
    role?: string
    department?: string
    subuser_phone?: string
    phone?: string
    status?: string
  }): Promise<ApiResponse<EnhancedSubuser>> {
    // Map field names to backend expected format
    const mappedData: any = {}
    
    if (subuserData.subuser_name || subuserData.name) {
      mappedData.subuser_name = subuserData.subuser_name || subuserData.name
    }
    if (subuserData.subuser_role || subuserData.role) {
      mappedData.subuser_role = subuserData.subuser_role || subuserData.role
    }
    if (subuserData.department) {
      mappedData.department = subuserData.department
    }
    if (subuserData.subuser_phone || subuserData.phone) {
      mappedData.subuser_phone = subuserData.subuser_phone || subuserData.phone
    }
    if (subuserData.status) {
      mappedData.status = subuserData.status
    }
    
    console.log('📤 UpdateEnhancedSubuser - Mapped data:', mappedData)
    
    return this.request<EnhancedSubuser>(`/api/EnhancedSubuser/${encodeURIComponent(email)}`, {
      method: 'PUT',
      body: JSON.stringify(mappedData)
    });
  }

  async updateEnhancedSubuserByParent(parentEmail: string, subuserEmail: string, userData: {
    subuser_name?: string
    name?: string
    subuser_role?: string
    role?: string
    department?: string
    subuser_phone?: string
    phone?: string
    status?: string
  }): Promise<ApiResponse<EnhancedSubuser>> {
    // Map field names to backend expected format
    const mappedData: any = {}
    
    if (userData.subuser_name || userData.name) {
      mappedData.subuser_name = userData.subuser_name || userData.name
    }
    if (userData.subuser_role || userData.role) {
      mappedData.subuser_role = userData.subuser_role || userData.role
    }
    if (userData.department) {
      mappedData.department = userData.department
    }
    if (userData.subuser_phone || userData.phone) {
      mappedData.subuser_phone = userData.subuser_phone || userData.phone
    }
    if (userData.status) {
      mappedData.status = userData.status
    }
    
    console.log('📤 UpdateEnhancedSubuserByParent - Parent:', parentEmail, 'Subuser:', subuserEmail, 'Data:', mappedData)
    
    return this.request<EnhancedSubuser>(
      `/api/EnhancedSubusers/by-parent/${encodeURIComponent(parentEmail)}/subuser/${encodeURIComponent(subuserEmail)}`, 
      {
        method: 'PATCH',
        body: JSON.stringify(mappedData)
      }
    );
  }


  async getMachines(): Promise<ApiResponse<Machine[]>> {
    return this.request<Machine[]>('/api/Machines')
  }

  async getMachineById(id: string): Promise<ApiResponse<Machine>> {
    return this.request<Machine>(`/api/Machines/${id}`)
  }

  async getMachinesByEmail(email: string): Promise<ApiResponse<Machine[]>> {
    return this.request<Machine[]>(`/api/Machines/by-email/${encodeURIComponent(email)}`)
  }

  async getReports(): Promise<ApiResponse<Report[]>> {
    return this.request<Report[]>('/api/Reports')
  }

  async getReportById(id: string): Promise<ApiResponse<Report>> {
    return this.request<Report>(`/api/Reports/${id}`)
  }

  async getAuditReportsByEmail(email: string): Promise<ApiResponse<AuditReport[]>> {
    return this.request<AuditReport[]>(`/api/AuditReports/by-email/${encodeURIComponent(email)}`)
  }
  
  async getAuditReports(): Promise<ApiResponse<AuditReport[]>> {
    return this.request<AuditReport[]>(`/api/AuditReports`)
  }

  // Get audit report by single report_id
  async getAuditReportById(reportId: string): Promise<ApiResponse<AuditReport>> {
    return this.request<AuditReport>(`/api/EnhancedAuditReports/${encodeURIComponent(reportId)}/export-pdf`)
  }

  // Get audit reports by multiple report_ids
  async getAuditReportsByIds(reportIds: string[]): Promise<ApiResponse<AuditReport[]>> {
    if (!reportIds || reportIds.length === 0) {
      return {
        success: false,
        error: 'No report IDs provided'
      }
    }

    // If single report_id, use single endpoint for better performance
    if (reportIds.length === 1) {
      const singleResult = await this.getAuditReportById(reportIds[0])
      if (singleResult.success && singleResult.data) {
        return {
          success: true,
          data: [singleResult.data]
        }
      }
      return {
        success: false,
        error: singleResult.error || 'Failed to fetch report'
      }
    }

    // For multiple report_ids, fetch them in parallel
    try {
      const promises = reportIds.map(id => this.getAuditReportById(id))
      const results = await Promise.all(promises)
      
      const successfulReports = results
        .filter(result => result.success && result.data)
        .map(result => result.data!)
      
      if (successfulReports.length === 0) {
        return {
          success: false,
          error: 'No reports found for the provided IDs'
        }
      }

      return {
        success: true,
        data: successfulReports
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch reports'
      }
    }
  }

  // Flexible method: Get audit reports by email OR report_id(s)
  async getAuditReportsFlexible(params: {
    email?: string
    reportId?: string
    reportIds?: string[]
  }): Promise<ApiResponse<AuditReport[]>> {
    const { email, reportId, reportIds } = params

    // Priority: reportId(s) > email > all reports
    if (reportId) {
      const result = await this.getAuditReportById(reportId)
      if (result.success && result.data) {
        return {
          success: true,
          data: [result.data]
        }
      }
      return {
        success: false,
        error: result.error || 'Failed to fetch report'
      }
    }

    if (reportIds && reportIds.length > 0) {
      return this.getAuditReportsByIds(reportIds)
    }

    if (email) {
      return this.getAuditReportsByEmail(email)
    }

    // Fallback: get all reports
    return this.getAuditReports()
  }

  // System Logs API methods
  async getSystemLogsByEmail(email: string): Promise<ApiResponse<SystemLog[]>> {
    return this.request<SystemLog[]>(`/api/Logs/by-email/${encodeURIComponent(email)}`)
  }
  async getSystemLogs(): Promise<ApiResponse<SystemLog[]>> {
    return this.request<SystemLog[]>(`/api/Logs`)
  }

  // Commands API methods
  async getCommandsByEmail(email: string): Promise<ApiResponse<Command[]>> {
    return this.request<Command[]>(`/api/Commands/by-email/${encodeURIComponent(email)}`)
  }
  async getCommands(): Promise<ApiResponse<Command[]>> {
    return this.request<Command[]>(`/api/Commands`)
  }

  // Sessions API methods
  async getSessionsByEmail(email: string): Promise<ApiResponse<Session[]>> {
    return this.request<Session[]>(`/api/Sessions/by-email/${encodeURIComponent(email)}`)
  }
  async getSessions(): Promise<ApiResponse<Session[]>> {
    return this.request<Session[]>(`/api/Sessions`)
  }

  // Time API methods
  async getServerTime(): Promise<ApiResponse<{ serverTime: string; utcTime: string; timezone: string }>> {
    return this.request<{ serverTime: string; utcTime: string; timezone: string }>(`/api/Time/server-time`)
  }

  // Utility methods
  setRetryConfig(config: Partial<RetryConfig>): void {
    this.retryConfig = { ...this.retryConfig, ...config }
  }

  getBaseURL(): string {
    return this.baseURL
  }

  isAuthenticated(): boolean {
    return authService.isAuthenticated()
  }

  getCurrentUserFromToken() {
    return authService.getUserFromToken()
  }

  hasPermission(permission: string): boolean {
    return authService.hasPermission(permission)
  }

  hasRole(role: string): boolean {
    return authService.hasRole(role)
  }
}

// API availability check
export async function checkApiAvailability(): Promise<boolean> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    // //console.log('🔍 Testing API connectivity to:', API_BASE_URL)
    
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      signal: controller.signal,
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json'
      }
    })
    
    clearTimeout(timeoutId)
    
    // //console.log('✅ API Health Check:', {
    //   status: response.status,
    //   statusText: response.statusText,
    //   ok: response.ok
    // })
    
    return response.ok
  } catch (error) {
    console.error('❌ API Health Check Failed:', error)
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('⏰ API request timed out')
      } else if (error.message.includes('Failed to fetch')) {
        console.error('🔌 Cannot connect to API server')
      }
    }
    
    return false
  }
}

// Create and export singleton instance
export const apiClient = new EnhancedApiClient()

// Export the class
export { EnhancedApiClient }