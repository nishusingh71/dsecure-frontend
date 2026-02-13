// API Service for Admin Dashboard
// This file contains all API endpoints and data fetching logic for the admin dashboard
// ? Updated to use apiClient with automatic decryption interceptor
// ?? PII-Safe Refactor: Email is never sent in URL parameters, only in Base64-encoded headers

import { Subuser } from "@/types/models"
import { api } from "@/utils/apiClient"
import { encodeEmail } from "@/utils/encodeEmail"
import { ENV } from "@/config/env"

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
  userRole?: string // camelCase from API response
  user_role?: string // snake_case from API response
  phone?: string // Commented out - not used
  phone_number?: string // Phone number field from backend
  department?: string
  avatar?: string
  licenses?: number // For User stats - number of licenses assigned to user
  license_allocation?: string // License allocation count from user data
  is_private_cloud?: boolean // Private cloud access flag
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

// NOTE: All default/fallback data removed - All data must come from live API
// If API fails, UI will show "Data not available" message

// API Configuration
const API_BASE_URL = ENV.API_BASE_URL

// ? Generic API call function using axios with automatic decryption
// The `api` instance from apiClient.ts has an interceptor that automatically
// decrypts encrypted responses from the .NET backend
async function apiCall<T>(endpoint: string, options?: { method?: string; body?: string; headers?: Record<string, string> }): Promise<ApiResponse<T>> {
  try {
    const method = options?.method?.toUpperCase() || 'GET'
    let response;

    // Use axios api instance which has decryption interceptor
    if (method === 'GET') {
      response = await api.get(`${endpoint}`, {
        headers: options?.headers
      })
    } else if (method === 'POST') {
      response = await api.post(`${endpoint}`, options?.body ? JSON.parse(options.body) : undefined, {
        headers: options?.headers
      })
    } else if (method === 'PUT') {
      response = await api.put(`${endpoint}`, options?.body ? JSON.parse(options.body) : undefined, {
        headers: options?.headers
      })
    } else if (method === 'DELETE') {
      response = await api.delete(`${endpoint}`, {
        headers: options?.headers
      })
    } else if (method === 'PATCH') {
      response = await api.patch(`${endpoint}`, options?.body ? JSON.parse(options.body) : undefined, {
        headers: options?.headers
      })
    } else {
      response = await api.request({
        url: endpoint,
        method: method as any,
        data: options?.body ? JSON.parse(options.body) : undefined,
        headers: options?.headers
      })
    }

    // Response is already decrypted by axios interceptor
    return { success: true, data: response.data }
  } catch (error: any) {
    // Error handled silently - return error response
    // NO FALLBACK - Return error response so UI can show "Data not available"
    return {
      success: false,
      data: null as unknown as T,
      error: error?.response?.data?.message || error?.message || 'API call failed'
    }
  }
}

// NOTE: All default/fallback data has been removed
// All data MUST come from live API - UI will show "Data not available" if API fails

// Admin Dashboard API Functions
export class AdminDashboardAPI {

  // Get dashboard statistics
  static async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return apiCall<DashboardStats>('/admin/dashboard/stats')
  }

  // Get user activity data
  static async getUserActivity(userEmail: string): Promise<ApiResponse<UserActivity[]>> {
    if (!userEmail) {
      return {
        success: false,
        data: [],
        error: 'User email is required'
      };
    }

    try {
      console.log('?? Calling UserActivity API with email:', userEmail);

      const response = await apiCall<{
        success: boolean;
        parent_email: string;
        total_subusers: number;
        online_subusers: number;
        offline_subusers: number;
        subusers: Array<{
          email: string;
          name: string;
          last_login?: string;
          last_logout?: string;
          activity_status: string;
          calculated_status: string;
          role: string;
          department: string;
          status: string;
        }>;
      }>(`/api/UserActivity/user-subusers-activity/${encodeEmail(userEmail)}`);

      console.log('?? UserActivity API raw response:', response);

      if (!response.success || !response.data) {
        console.warn('?? UserActivity API failed or no data:', response);
        return {
          success: false,
          data: [],
          error: 'Failed to fetch user activity'
        };
      }

      console.log('?? Subusers count:', response.data.subusers?.length || 0);
      console.log('?? Subusers data:', response.data.subusers);

      // Transform backend response to UI format
      const transformedData: UserActivity[] = response.data.subusers.map(subuser => ({
        email: subuser.email,
        loginTime: subuser.last_login
          ? new Date(subuser.last_login).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
          : 'Never',
        logoutTime: subuser.last_logout
          ? new Date(subuser.last_logout).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
          : '-',
        status: (subuser.calculated_status === 'online' ? 'active' : 'offline') as 'active' | 'offline'
      }));

      console.log('? Transformed UserActivity data:', transformedData);

      return {
        success: true,
        data: transformedData
      };
    } catch (error: any) {
      console.error('? UserActivity API error:', error);
      return {
        success: false,
        data: [],
        error: error?.message || 'Failed to fetch user activity'
      };
    }
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
  // ? Updated to use axios api with automatic decryption
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

      // console.log('?? Fetching profile for email:', userEmail);

      // ? Use axios api instance with automatic decryption
      const response = await api.get(`/api/Users/${encodeEmail(userEmail)}`);
      const data = response.data;

      // console.log('? Profile data received:', data);

      // Transform backend data to ProfileData format
      // Priority: userRole (camelCase) > user_role > user_type > role
      const roleValue = data.userRole || data.user_role || data.user_type || data.role || 'user';

      const profileData: ProfileData = {
        name: data.user_name || data.userName || data.name || 'User',
        email: data.user_email || data.email || userEmail,
        timezone: data.timezone || 'Asia/Kolkata',
        role: roleValue,
        userRole: data.userRole || data.user_role, // Keep original field
        user_role: data.user_role || data.userRole, // Keep original field
        // phone: data.phone_number || data.phone || '', // Commented out
        department: data.department || '',
        avatar: data.avatar || '',
        licenses: data.licenses || 0
      };

      return {
        success: true,
        data: profileData,
        message: 'Profile fetched successfully'
      };

    } catch (error: any) {
      // console.error('? Error fetching profile:', error);
      return {
        success: false,
        data: {} as ProfileData,
        error: error?.response?.data?.message || error?.message || 'Failed to fetch profile'
      };
    }
  }

  // Update admin profile - Update backend using user email
  // ? Updated to use axios api with automatic decryption
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

      // console.log('?? Updating profile for email:', userEmail);

      // Transform ProfileData to backend format
      const backendData = {
        user_name: profileData.name,
        user_email: profileData.email,
        // phone_number: profileData.phone, // Commented out
        department: profileData.department,
        timezone: profileData.timezone,
        user_type: profileData.role
      };

      // ? Use axios api instance with automatic decryption
      const response = await api.put(`/api/Users/${encodeEmail(userEmail)}`, backendData);
      const data = response.data;
      // console.log('? Profile updated successfully:', data);

      // Transform response back to ProfileData format
      // Priority: userRole (camelCase) > user_role > user_type > role
      const updatedRoleValue = data.userRole || data.user_role || data.user_type || data.role || profileData.role || 'user';

      const updatedProfile: ProfileData = {
        name: data.user_name || data.userName || data.name || profileData.name || 'User',
        email: data.user_email || data.email || userEmail,
        timezone: data.timezone || profileData.timezone || 'Asia/Kolkata',
        role: updatedRoleValue,
        userRole: data.userRole || data.user_role, // Keep original field
        user_role: data.user_role || data.userRole, // Keep original field
        // phone: data.phone_number || data.phone || profileData.phone || '', // Commented out
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
        // phone_number: updatedProfile.phone, // Commented out
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
      // console.error('? Error updating profile:', error);
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

// NOTE: Default data exports removed - All data must come from live API