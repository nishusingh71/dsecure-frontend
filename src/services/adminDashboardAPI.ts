// API Service for Admin Dashboard
// This file contains all API endpoints and data fetching logic for the admin dashboard

import { Subuser } from "@/utils/enhancedApiClient"

interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

interface DashboardStats {
  totalLicenses: string
  activeUsers: string
  availableLicenses: string
  successRate: string
  totalUsers?: number // For Manager stats
  changes: {
    totalLicenses: { value: string; trend: 'up' | 'down' }
    activeUsers: { value: string; trend: 'up' | 'down' }
    availableLicenses: { value: string; trend: 'up' | 'down' }
    successRate: { value: string; trend: 'up' | 'down' }
  }
}

interface UserActivity {
  email: string
  loginTime: string
  logoutTime: string
  status: 'active' | 'offline'
}

interface GroupData {
  name: string
  description: string
  licenses: number
  date: string
}

interface LicenseData {
  product: string
  total: number
  consumed: number
  available: number
}

interface RecentReport {
  id: string
  type: string
  devices: number
  status: 'completed' | 'running' | 'failed'
  date: string
  method: string
}

interface ProfileData {
  name: string
  email: string
  timezone: string
  role: string
  phone?: string
  department?: string
  avatar?: string
  licenses?: number // For User stats - number of licenses assigned to user
}

// Additional interfaces for other admin pages
interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'success' | 'debug'
  category: string
  message: string
  user?: string
  source: string
  details?: string
}

interface Machine {
  hostname: string
  eraseOption: string
  license: string
  status: string
}

interface PerformanceMetrics {
  monthlyErasures: {
    value: number
    data: number[]
  }
  avgDuration: {
    value: string
    data: number[]
  }
  successRate: {
    value: string
    data: number[]
  }
  throughput: {
    data: number[]
    labels: string[]
  }
}

export interface AdminReport {
  id: string
  date: string
  devices: number
  status: string
  department: string
}

interface User {
  id: string
  email: string
  role: string
  status?: string // Made optional for new user creation
  department?: string // Made optional for new user creation
  lastLogin?: string // Making it optional for new user creation
  name: string
  password?: string // For user creation
  phone?: string // For user creation
}

interface Report {
  id: string
  type: string
  status: 'completed' | 'running' | 'failed'
  date: string
  devices: number
  method: string
  duration?: string
  size?: string
}

// Default data - this will be used when API is not available
const DEFAULT_DASHBOARD_STATS: DashboardStats = {
  totalLicenses: '3,287',
  activeUsers: '156',
  availableLicenses: '1,200',
  successRate: '99.2%',
  changes: {
    totalLicenses: { value: '+12%', trend: 'up' },
    activeUsers: { value: '+5', trend: 'up' },
    availableLicenses: { value: '-8%', trend: 'down' },
    successRate: { value: '+0.3%', trend: 'up' }
  }
}

const DEFAULT_USER_ACTIVITY: UserActivity[] = [
  { email: 'john@example.com', loginTime: 'Thu Oct 02 2025 13:48:24', logoutTime: '', status: 'active' },
  { email: 'alice@admin.com', loginTime: 'Thu Oct 02 2025 09:30:15', logoutTime: 'Thu Oct 02 2025 17:45:22', status: 'offline' },
  { email: 'bob@example.com', loginTime: 'Thu Oct 02 2025 08:15:30', logoutTime: '', status: 'active' },
  { email: 'carol@example.com', loginTime: 'Wed Oct 01 2025 16:20:45', logoutTime: 'Wed Oct 01 2025 18:30:12', status: 'offline' }
]

const DEFAULT_GROUPS: GroupData[] = [
  { name: 'Default Group', description: 'Default users Selection', licenses: 2322, date: '2023-01-06 04:21:04' },
  { name: 'Pool Group', description: 'Pool users', licenses: 200, date: '2023-01-06 04:21:04' },
  { name: 'IT Department', description: 'IT Department Users', licenses: 150, date: '2024-02-09 12:08:52' },
  { name: 'Security Team', description: 'Security Operations', licenses: 75, date: '2025-04-23 01:44:34' }
]

const DEFAULT_LICENSE_DATA: LicenseData[] = [
  { product: 'DSecure Drive Eraser', total: 1460, consumed: 1345, available: 115 },
  { product: 'DSecure Network Eraser', total: 462, consumed: 292, available: 170 },
  { product: 'DSecure Mobile Diagnostics', total: 200, consumed: 66, available: 134 },
  { product: 'DSecure Hardware Diagnostics', total: 446, consumed: 281, available: 165 },
  { product: 'DSecure Cloud Eraser', total: 300, consumed: 226, available: 74 }
]

const DEFAULT_RECENT_REPORTS: RecentReport[] = [
  { id: '2832', type: 'Drive Eraser', devices: 1, status: 'completed', date: 'Wed, Oct 01, 2025', method: 'NIST 800-88 Purge' },
  { id: '2831', type: 'Mobile Diagnostics', devices: 5, status: 'running', date: 'Tue, Sep 30, 2025', method: 'Hardware Scan' },
  { id: '2830', type: 'Network Eraser', devices: 12, status: 'completed', date: 'Tue, Sep 30, 2025', method: 'DoD 5220.22-M' },
  { id: '2829', type: 'File Eraser', devices: 3, status: 'failed', date: 'Mon, Sep 29, 2025', method: 'Secure Delete' }
]

const DEFAULT_PROFILE_DATA: ProfileData = {
  name: 'Rohit',
  email: 'rohit.kumar@stellarinfo.com',
  timezone: 'Asia/Kolkata',
  role: 'Admin',
  phone: '+91 9876543210',
  department: 'IT Administration'
}

// Default data for additional admin pages
const DEFAULT_LOG_ENTRIES: LogEntry[] = [
  {
    id: 'log_001',
    timestamp: '2025-10-09 09:01:12',
    level: 'info',
    category: 'System',
    message: 'System startup completed successfully',
    user: 'System',
    source: 'Core Service',
    details: 'All services initialized, memory usage: 45%, CPU: 12%'
  },
  {
    id: 'log_002',
    timestamp: '2025-10-09 09:07:51',
    level: 'success',
    category: 'Data Erasure',
    message: 'Secure erase job 3421 completed successfully',
    user: 'john.doe@company.com',
    source: 'Erase Engine',
    details: 'Device: Samsung SSD 970 EVO, Method: NIST 800-88, Verification: Passed'
  },
  {
    id: 'log_003',
    timestamp: '2025-10-09 09:15:23',
    level: 'info',
    category: 'Authentication',
    message: 'User login successful',
    user: 'jane.smith@company.com',
    source: 'Auth Service',
    details: 'IP: 192.168.1.105, Location: New York, Device: Chrome/Windows'
  },
  {
    id: 'log_004',
    timestamp: '2025-10-09 09:22:15',
    level: 'warning',
    category: 'License',
    message: 'License usage approaching limit',
    user: 'System',
    source: 'License Manager',
    details: 'Current usage: 85%, Limit: 100 concurrent users, Expires: 2025-12-31'
  },
  {
    id: 'log_005',
    timestamp: '2025-10-09 09:30:42',
    level: 'error',
    category: 'Data Erasure',
    message: 'Erase job 3422 failed - disk read error',
    user: 'alice.brown@company.com',
    source: 'Erase Engine',
    details: 'Device: WD Blue HDD 1TB, Error: Sector 1,234,567 unreadable, Retry attempts: 3'
  }
]

const DEFAULT_MACHINES: Machine[] = [
  { hostname: 'edge-01', eraseOption: 'Secure Erase', license: 'Enterprise', status: 'online' },
  { hostname: 'edge-02', eraseOption: 'Quick Erase', license: 'Basic', status: 'offline' },
  { hostname: 'lab-01', eraseOption: 'Secure Erase', license: 'Enterprise', status: 'online' },
  { hostname: 'lab-02', eraseOption: 'Quick Erase', license: 'Basic', status: 'maintenance' },
  { hostname: 'qa-01', eraseOption: 'Secure Erase', license: 'Enterprise', status: 'online' },
  { hostname: 'qa-02', eraseOption: 'Quick Erase', license: 'Basic', status: 'offline' },
  { hostname: 'dev-01', eraseOption: 'Secure Erase', license: 'Enterprise', status: 'online' },
  { hostname: 'prod-01', eraseOption: 'Quick Erase', license: 'Premium', status: 'online' },
  { hostname: 'prod-02', eraseOption: 'Secure Erase', license: 'Premium', status: 'maintenance' },
  { hostname: 'test-01', eraseOption: 'Quick Erase', license: 'Basic', status: 'offline' },
  { hostname: 'edge-03', eraseOption: 'Secure Erase', license: 'Enterprise', status: 'online' }
]

const DEFAULT_PERFORMANCE_METRICS: PerformanceMetrics = {
  monthlyErasures: {
    value: 1240,
    data: [120, 140, 130, 180, 220, 210, 260, 240, 280, 300, 320, 340]
  },
  avgDuration: {
    value: '6m 21s',
    data: [7.2, 6.8, 6.5, 6.1, 5.9, 6.2, 6.0, 6.3, 6.1, 6.2, 6.4, 6.3]
  },
  successRate: {
    value: '100%',
    data: [97.8, 98.1, 98.0, 98.2, 98.4, 98.5, 98.3, 98.6, 98.4, 98.5, 98.6, 98.4]
  },
  throughput: {
    data: [120, 140, 160, 180, 200, 240, 260, 230, 250, 270, 300, 340],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  }
}

const DEFAULT_ADMIN_REPORTS: AdminReport[] = [
  { id: 'AR-2025-1001', date: '2025-09-01', devices: 25, status: 'completed', department: 'IT' },
  { id: 'AR-2025-1002', date: '2025-09-02', devices: 50, status: 'pending', department: 'HR' },
  { id: 'AR-2025-1003', date: '2025-09-03', devices: 75, status: 'completed', department: 'Finance' },
  { id: 'AR-2025-1004', date: '2025-09-04', devices: 100, status: 'failed', department: 'IT' },
  { id: 'AR-2025-1005', date: '2025-09-05', devices: 125, status: 'completed', department: 'Operations' }
]

const DEFAULT_USERS: User[] = [
  { id: '1', email: 'john.doe@company.com', name: 'John Doe', role: 'admin', status: 'active', department: 'IT', lastLogin: '2025-09-26' },
  { id: '2', email: 'jane.smith@company.com', name: 'Jane Smith', role: 'user', status: 'active', department: 'HR', lastLogin: '2025-09-25' },
  { id: '3', email: 'bob.johnson@company.com', name: 'Bob Johnson', role: 'operator', status: 'inactive', department: 'Operations', lastLogin: '2025-09-20' },
  { id: '4', email: 'alice.brown@company.com', name: 'Alice Brown', role: 'user', status: 'active', department: 'Finance', lastLogin: '2025-09-26' },
  { id: '5', email: 'charlie.wilson@company.com', name: 'Charlie Wilson', role: 'admin', status: 'pending', department: 'IT', lastLogin: 'Never' }
]

const DEFAULT_REPORTS: Report[] = [
  {
    id: 'ER-2832',
    type: 'Drive Eraser',
    status: 'completed',
    date: '2025-10-09',
    devices: 5,
    method: 'NIST 800-88 Purge',
    duration: '2h 15m',
    size: '2.4 TB'
  },
  {
    id: 'ER-2831',
    type: 'Mobile Diagnostics',
    status: 'running',
    date: '2025-10-09',
    devices: 3,
    method: 'Hardware Scan',
    duration: '45m',
    size: '1.2 TB'
  },
  {
    id: 'ER-2830',
    type: 'Network Eraser',
    status: 'completed',
    date: '2025-10-08',
    devices: 12,
    method: 'DoD 5220.22-M',
    duration: '4h 30m',
    size: '8.7 TB'
  },
  {
    id: 'ER-2829',
    type: 'File Eraser',
    status: 'failed',
    date: '2025-10-07',
    devices: 1,
    method: 'Secure Delete',
    duration: '15m',
    size: '0.5 TB'
  },
  {
    id: 'ER-2828',
    type: 'Server Eraser',
    status: 'completed',
    date: '2025-10-07',
    devices: 8,
    method: 'Gutmann Method',
    duration: '6h 45m',
    size: '15.3 TB'
  }
]

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.dsecuretech.com/api'
const USE_API = import.meta.env.VITE_USE_API === 'true' || false

// Generic API call function
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  if (!USE_API) {
    // Return default data when API is disabled
    return { success: true, data: getDefaultData(endpoint) as T }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        ...options?.headers
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.warn(`API call failed for ${endpoint}, using default data:`, error)
    // Fallback to default data on API failure
    return { success: true, data: getDefaultData(endpoint) as T }
  }
}

// Get default data based on endpoint
function getDefaultData(endpoint: string): any {
  switch (endpoint) {
    case '/admin/dashboard/stats':
      return DEFAULT_DASHBOARD_STATS
    case '/admin/dashboard/user-activity':
      return DEFAULT_USER_ACTIVITY
    case '/admin/dashboard/groups':
      return DEFAULT_GROUPS
    case '/admin/dashboard/license-data':
      return DEFAULT_LICENSE_DATA
    case '/admin/dashboard/recent-reports':
      return DEFAULT_RECENT_REPORTS
    case '/admin/profile':
      return DEFAULT_PROFILE_DATA
    case '/admin/logs':
      return DEFAULT_LOG_ENTRIES
    case '/admin/machines':
      return DEFAULT_MACHINES
    case '/admin/performance':
      return DEFAULT_PERFORMANCE_METRICS
    case '/admin/reports':
      return DEFAULT_ADMIN_REPORTS
    case '/admin/subusers':
      return DEFAULT_USERS
    case '/reports':
      return DEFAULT_REPORTS
    default:
      return null
  }
}

// Admin Dashboard API Functions
export class AdminDashboardAPI {
  
  // Get dashboard statistics
  static async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return apiCall<DashboardStats>('/admin/dashboard/stats')
  }

  // Get user activity data
  static async getUserActivity(): Promise<ApiResponse<UserActivity[]>> {
    return apiCall<UserActivity[]>('/admin/dashboard/user-activity')
  }

  // Get groups data
  static async getGroups(): Promise<ApiResponse<GroupData[]>> {
    return apiCall<GroupData[]>('/admin/dashboard/groups')
  }

  // Get license data
  static async getLicenseData(): Promise<ApiResponse<LicenseData[]>> {
    return apiCall<LicenseData[]>('/admin/dashboard/license-data')
  }

  // Get recent reports
  static async getRecentReports(): Promise<ApiResponse<RecentReport[]>> {
    return apiCall<RecentReport[]>('/admin/dashboard/recent-reports')
  }

  // Get admin profile - Fetch from backend using user email
  static async getAdminProfile(): Promise<ApiResponse<ProfileData>> {
    try {
      // Get user email from stored user data
      const storedUser = localStorage.getItem('user_data');
      const authUser = localStorage.getItem('authUser');
      
      let userEmail = '';
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        userEmail = userData.user_email || userData.email || '';
      } else if (authUser) {
        const userData = JSON.parse(authUser);
        userEmail = userData.user_email || userData.email || '';
      }
      
      if (!userEmail) {
        throw new Error('User email not found in stored data');
      }
      
      console.log('🔍 Fetching profile for email:', userEmail);
      
      // Fetch user data from backend API using email
      const response = await fetch(`https://api.dsecuretech.com/api/Users/${userEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('dsecure_access_token') || ''}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Profile data received:', data);
      
      // Transform backend data to ProfileData format
      const profileData: ProfileData = {
        name: data.user_name || data.name || 'User',
        email: data.user_email || data.email || userEmail,
        timezone: data.timezone || 'Asia/Kolkata',
        role: data.user_type || data.role || 'user',
        phone: data.phone_number || '',
        department: data.department || '',
        avatar: data.avatar || '',
        licenses: data.licenses || 0
      };
      
      return {
        success: true,
        data: profileData,
        message: 'Profile fetched successfully'
      };
      
    } catch (error) {
      console.error('❌ Error fetching profile:', error);
      return {
        success: false,
        data: {} as ProfileData,
        error: error instanceof Error ? error.message : 'Failed to fetch profile'
      };
    }
  }

  // Update admin profile - Update backend using user email
  static async updateAdminProfile(profileData: Partial<ProfileData>): Promise<ApiResponse<ProfileData>> {
    try {
      // Get user email from stored user data or profileData
      const storedUser = localStorage.getItem('user_data');
      const authUser = localStorage.getItem('authUser');
      
      let userEmail = profileData.email || '';
      
      if (!userEmail && storedUser) {
        const userData = JSON.parse(storedUser);
        userEmail = userData.user_email || userData.email || '';
      } else if (!userEmail && authUser) {
        const userData = JSON.parse(authUser);
        userEmail = userData.user_email || userData.email || '';
      }
      
      if (!userEmail) {
        throw new Error('User email not found');
      }
      
      console.log('🔄 Updating profile for email:', userEmail);
      
      // Transform ProfileData to backend format
      const backendData = {
        user_name: profileData.name,
        user_email: profileData.email,
        phone_number: profileData.phone,
        department: profileData.department,
        timezone: profileData.timezone,
        user_type: profileData.role
      };
      
      // Update user data in backend API
      const response = await fetch(`https://api.dsecuretech.com/api/Users/${userEmail}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('dsecure_access_token') || ''}`
        },
        body: JSON.stringify(backendData)
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Profile updated successfully:', data);
      
      // Transform response back to ProfileData format
      const updatedProfile: ProfileData = {
        name: data.user_name || data.name || profileData.name || 'User',
        email: data.user_email || data.email || userEmail,
        timezone: data.timezone || profileData.timezone || 'Asia/Kolkata',
        role: data.user_type || data.role || profileData.role || 'user',
        phone: data.phone_number || profileData.phone || '',
        department: data.department || profileData.department || '',
        avatar: data.avatar || '',
        licenses: data.licenses || 0
      };
      
      // Update local storage with new data
      const storedUserData = storedUser ? JSON.parse(storedUser) : {};
      const updatedUserData = {
        ...storedUserData,
        user_name: updatedProfile.name,
        user_email: updatedProfile.email,
        phone_number: updatedProfile.phone,
        department: updatedProfile.department
      };
      localStorage.setItem('user_data', JSON.stringify(updatedUserData));
      localStorage.setItem('authUser', JSON.stringify(updatedUserData));
      
      return {
        success: true,
        data: updatedProfile,
        message: 'Profile updated successfully'
      };
      
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      return {
        success: false,
        data: {} as ProfileData,
        error: error instanceof Error ? error.message : 'Failed to update profile'
      };
    }
  }

  // Bulk license assignment
  static async assignBulkLicenses(userCount: number, licenseCount: number): Promise<ApiResponse<any>> {
    return apiCall<any>('/admin/licenses/bulk-assign', {
      method: 'POST',
      body: JSON.stringify({ userCount, licenseCount })
    })
  }

  // Get license audit data
  static async getLicenseAudit(): Promise<ApiResponse<LicenseData[]>> {
    return apiCall<LicenseData[]>('/admin/licenses/audit')
  }

  // Additional API methods for other admin pages

  // Logs API
  static async getLogs(): Promise<ApiResponse<LogEntry[]>> {
    return apiCall<LogEntry[]>('/admin/logs')
  }

  static async clearLogs(): Promise<ApiResponse<any>> {
    return apiCall<any>('/admin/logs', { method: 'DELETE' })
  }

  // Machines API
  static async getMachines(): Promise<ApiResponse<Machine[]>> {
    return apiCall<Machine[]>('/admin/machines')
  }

  static async restartMachine(hostname: string): Promise<ApiResponse<any>> {
    return apiCall<any>(`/admin/machines/${hostname}/restart`, { method: 'POST' })
  }

  static async runErase(hostname: string): Promise<ApiResponse<any>> {
    return apiCall<any>(`/admin/machines/${hostname}/erase`, { method: 'POST' })
  }

  static async updateMachine(hostname: string, data: Partial<Machine>): Promise<ApiResponse<Machine>> {
    return apiCall<Machine>(`/admin/machines/${hostname}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  static async deleteMachine(hostname: string): Promise<ApiResponse<any>> {
    return apiCall<any>(`/admin/machines/${hostname}`, { method: 'DELETE' })
  }

  // Performance API
  static async getPerformanceMetrics(): Promise<ApiResponse<PerformanceMetrics>> {
    return apiCall<PerformanceMetrics>('/admin/performance')
  }

  // Reports API
  static async getAdminReports(): Promise<ApiResponse<AdminReport[]>> {
    return apiCall<AdminReport[]>('/admin/reports')
  }

  static async deleteAdminReport(reportId: string): Promise<ApiResponse<any>> {
    return apiCall<any>(`/admin/reports/${reportId}`, { method: 'DELETE' })
  }

  static async regenerateReport(reportId: string): Promise<ApiResponse<any>> {
    return apiCall<any>(`/admin/reports/${reportId}/regenerate`, { method: 'POST' })
  }

  // Subusers API
  static async getSubusers(): Promise<ApiResponse<User[]>> {
    return apiCall<User[]>('/admin/subusers')
  }

  static async createUser(userData: Omit<User, 'id'>): Promise<ApiResponse<Subuser>> {
    return apiCall<Subuser>('/api/subuser', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }

  static async updateUser(userId: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    return apiCall<User>(`/admin/subusers/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    })
  }

  static async deleteUser(userId: string): Promise<ApiResponse<any>> {
    return apiCall<any>(`/admin/subusers/${userId}`, { method: 'DELETE' })
  }

  static async resetUserPassword(userId: string): Promise<ApiResponse<any>> {
    return apiCall<any>(`/admin/subusers/${userId}/reset-password`, { method: 'POST' })
  }

  static async toggleUserStatus(userId: string): Promise<ApiResponse<User>> {
    return apiCall<User>(`/admin/subusers/${userId}/toggle-status`, { method: 'POST' })
  }

  // General Reports API (for ReportsPage)
  static async getReports(): Promise<ApiResponse<Report[]>> {
    return apiCall<Report[]>('/reports')
  }

  static async downloadReport(reportId: string): Promise<ApiResponse<any>> {
    return apiCall<any>(`/reports/${reportId}/download`)
  }

  static async exportReports(format: 'csv' | 'pdf' = 'csv'): Promise<ApiResponse<any>> {
    return apiCall<any>(`/reports/export?format=${format}`)
  }

  // Group Management API
  static async createGroup(groupData: { name: string; description: string; licenses: number }): Promise<ApiResponse<GroupData>> {
    return apiCall<GroupData>('/admin/groups', {
      method: 'POST',
      body: JSON.stringify(groupData)
    })
  }

  static async updateGroup(groupId: string, groupData: Partial<GroupData>): Promise<ApiResponse<GroupData>> {
    return apiCall<GroupData>(`/admin/groups/${groupId}`, {
      method: 'PUT',
      body: JSON.stringify(groupData)
    })
  }

  static async deleteGroup(groupId: string): Promise<ApiResponse<any>> {
    return apiCall<any>(`/admin/groups/${groupId}`, { method: 'DELETE' })
  }

  static async assignLicensesToGroup(groupId: string, licenseData: { licenseCount: number; expiryDate: string; licenseType: string }): Promise<ApiResponse<any>> {
    return apiCall<any>(`/admin/groups/${groupId}/assign-licenses`, {
      method: 'POST',
      body: JSON.stringify(licenseData)
    })
  }

  // System Settings API
  static async getSystemSettings(): Promise<ApiResponse<any>> {
    return apiCall<any>('/admin/system/settings')
  }

  static async updateSystemSettings(settings: any): Promise<ApiResponse<any>> {
    return apiCall<any>('/admin/system/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    })
  }
}

// Export types for use in components
export type {
  DashboardStats,
  UserActivity,
  GroupData,
  LicenseData,
  RecentReport,
  ProfileData,
  LogEntry,
  Machine,
  PerformanceMetrics,
  
  User,
  Report,
  ApiResponse
}

// Export default data for direct access if needed
export {
  DEFAULT_DASHBOARD_STATS,
  DEFAULT_USER_ACTIVITY,
  DEFAULT_GROUPS,
  DEFAULT_LICENSE_DATA,
  DEFAULT_RECENT_REPORTS,
  DEFAULT_PROFILE_DATA,
  DEFAULT_LOG_ENTRIES,
  DEFAULT_MACHINES,
  DEFAULT_PERFORMANCE_METRICS,
  DEFAULT_ADMIN_REPORTS,
  DEFAULT_USERS,
  DEFAULT_REPORTS
}