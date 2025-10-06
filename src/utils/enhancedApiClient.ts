// Enhanced API Client with JWT Integration
import { authService } from './authService.js'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:44316'
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000')

// Debug mode for development
const DEBUG_MODE = import.meta.env.DEV

if (DEBUG_MODE) {
  // //console.log('API Configuration:', {
  //   baseUrl: API_BASE_URL,
  //   timeout: API_TIMEOUT,
  //   environment: import.meta.env.MODE
  // })
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user' | 'manager'
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  department: string
  lastLogin?: string
  createdAt: string
  updatedAt: string
  payment_details_json?: string
  license_details_json?: string
  phone_number?: string
  is_private_cloud?: boolean
  private_api?: boolean
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
  id: string
  hostname: string
  eraseOption: string
  license: string
  status: string
  lastSeen?: string
  department?: string
}

export interface Report {
  id: string
  date: string
  devices: number
  status: string
  department: string
  generatedBy?: string
  filePath?: string
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
        credentials: 'omit',
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

      const data = await response.json()
      
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
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Unable to connect to server. Please check if the backend is running and your internet connection.'
        } else if (error.message.includes('CORS')) {
          errorMessage = 'CORS error. Please check server configuration.'
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
  
  // Authentication endpoints
  async login(credentials: LoginRequest, rememberMe: boolean = false): Promise<ApiResponse<AuthResponse>> {
    const result = await this.request<AuthResponse>('/api/Auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

    if (result.success && result.data) {
      try {
        // Store tokens using the auth service
        authService.saveTokens(
          result.data.token,
          result.data.refreshToken,
          rememberMe
        )        // Store user data safely
        if (result.data.user) {
          authService.saveUserData(result.data.user)
        }
      } catch (error) {
        console.error('Error storing authentication data:', error)
        return {
          success: false,
          error: 'Failed to store authentication data'
        }
      }
    }

    return result
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

  async updateUser(id: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(`/api/Users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/Users/${id}`, {
      method: 'DELETE',
    })
  }

  async getMachines(): Promise<ApiResponse<Machine[]>> {
    return this.request<Machine[]>('/api/Machines')
  }

  async getMachineById(id: string): Promise<ApiResponse<Machine>> {
    return this.request<Machine>(`/api/Machines/${id}`)
  }

  async getReports(): Promise<ApiResponse<Report[]>> {
    return this.request<Report[]>('/api/Reports')
  }

  async getReportById(id: string): Promise<ApiResponse<Report>> {
    return this.request<Report>(`/api/Reports/${id}`)
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