// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:44316'

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

// API Client class
class ApiClient {
  private baseURL: string
  private token: string | null = null
  private timeout: number

  constructor(baseURL?: string) {
    this.baseURL = baseURL || import.meta.env.VITE_API_BASE_URL || 'https://localhost:44316'
    this.timeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000')
    this.token = sessionStorage.getItem('dsecure:jwt') // Changed to sessionStorage
  }

  setToken(token: string) {
    this.token = token
    sessionStorage.setItem('dsecure:jwt', token) // Changed to sessionStorage
  }

  clearToken() {
    this.token = null
    sessionStorage.removeItem('dsecure:jwt') // Changed to sessionStorage
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()
      
      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP ${response.status}`,
        }
      }

      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      }
    }
  }

  // Authentication endpoints
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/api/Auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/api/Users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async logout(): Promise<ApiResponse<void>> {
    const result = await this.request<void>('/auth/logout', {
      method: 'POST',
    })
    this.clearToken()
    return result
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/me')
  }

  // Users endpoints
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>('/users')
  }

  async updateUser(id: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/users/${id}`, {
      method: 'DELETE',
    })
  }

  // Machines endpoints
  async getMachines(): Promise<ApiResponse<Machine[]>> {
    return this.request<Machine[]>('/machines')
  }

  async updateMachine(id: string, machineData: Partial<Machine>): Promise<ApiResponse<Machine>> {
    return this.request<Machine>(`/machines/${id}`, {
      method: 'PUT',
      body: JSON.stringify(machineData),
    })
  }

  // Reports endpoints
  async getReports(): Promise<ApiResponse<Report[]>> {
    return this.request<Report[]>('/reports')
  }

  async generateReport(reportData: {
    department?: string
    deviceRange?: string
  }): Promise<ApiResponse<Report>> {
    return this.request<Report>('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    })
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Check if API is available
export async function checkApiAvailability(): Promise<boolean> {
  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://bitraserapiproject-2.onrender.com'
    const response = await fetch(`${baseURL}/health`, {
      method: 'GET',
      timeout: 10000,
    } as RequestInit)
    return response.ok
  } catch {
    return false
  }
}