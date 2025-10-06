import { useState, useEffect, useCallback } from 'react'
import { apiClient, checkApiAvailability, User, Machine, Report } from './api'

// AI-Generated Demo Data for Demonstration Purposes
// This data is created by the AI assistant and is not from your backend database
// When API is connected, this data will be replaced by real data from your backend

export const DEFAULT_USERS: User[] = [
  { 
    id: 'user-1', 
    email: 'alice@admin.com', 
    name: 'Alice Admin',
    role: 'admin', 
    status: 'active', 
    department: 'IT', 
    lastLogin: '2025-09-30',
    createdAt: '2025-01-01',
    updatedAt: '2025-09-30'
  },
  { 
    id: 'user-2', 
    email: 'bob@example.com', 
    name: 'Bob User',
    role: 'user', 
    status: 'active', 
    department: 'HR', 
    lastLogin: '2025-09-29',
    createdAt: '2025-01-02',
    updatedAt: '2025-09-29'
  },
  { 
    id: 'user-3', 
    email: 'charlie@company.com', 
    name: 'Charlie Manager',
    role: 'manager', 
    status: 'inactive', 
    department: 'Finance', 
    lastLogin: '2025-09-25',
    createdAt: '2025-01-03',
    updatedAt: '2025-09-25'
  },
  { 
    id: 'user-4', 
    email: 'diana@corp.com', 
    name: 'Diana User',
    role: 'user', 
    status: 'active', 
    department: 'IT', 
    lastLogin: '2025-09-30',
    createdAt: '2025-01-04',
    updatedAt: '2025-09-30'
  },
  { 
    id: 'user-5', 
    email: 'eve@business.com', 
    name: 'Eve Admin',
    role: 'admin', 
    status: 'pending', 
    department: 'Operations', 
    lastLogin: 'Never',
    createdAt: '2025-01-05',
    updatedAt: '2025-01-05'
  },
]

// AI-Generated Demo Machines Data
// These are sample machines created for demonstration
export const DEFAULT_MACHINES: Machine[] = [
  { id: 'mach-1', hostname: 'edge-01', eraseOption: 'Secure Erase', license: 'Enterprise', status: 'online' },
  { id: 'mach-2', hostname: 'edge-02', eraseOption: 'Quick Erase', license: 'Basic', status: 'offline' },
  { id: 'mach-3', hostname: 'lab-01', eraseOption: 'Secure Erase', license: 'Enterprise', status: 'online' },
  { id: 'mach-4', hostname: 'lab-02', eraseOption: 'Quick Erase', license: 'Basic', status: 'maintenance' },
  { id: 'mach-5', hostname: 'qa-01', eraseOption: 'Secure Erase', license: 'Enterprise', status: 'online' },
  { id: 'mach-6', hostname: 'qa-02', eraseOption: 'Quick Erase', license: 'Basic', status: 'offline' },
  { id: 'mach-7', hostname: 'dev-01', eraseOption: 'Secure Erase', license: 'Enterprise', status: 'online' },
  { id: 'mach-8', hostname: 'prod-01', eraseOption: 'Quick Erase', license: 'Premium', status: 'online' },
  { id: 'mach-9', hostname: 'prod-02', eraseOption: 'Secure Erase', license: 'Premium', status: 'maintenance' },
  { id: 'mach-10', hostname: 'test-01', eraseOption: 'Quick Erase', license: 'Basic', status: 'offline' },
]

// AI-Generated Demo Reports Data
// These are sample audit reports created for demonstration
export const DEFAULT_REPORTS: Report[] = [
  { id: 'AR-2025-1001', date: '2025-09-01', devices: 25, status: 'completed', department: 'IT' },
  { id: 'AR-2025-1002', date: '2025-09-02', devices: 50, status: 'pending', department: 'HR' },
  { id: 'AR-2025-1003', date: '2025-09-03', devices: 75, status: 'completed', department: 'Finance' },
  { id: 'AR-2025-1004', date: '2025-09-04', devices: 100, status: 'failed', department: 'IT' },
  { id: 'AR-2025-1005', date: '2025-09-05', devices: 125, status: 'completed', department: 'Operations' },
  { id: 'AR-2025-1006', date: '2025-09-06', devices: 150, status: 'pending', department: 'IT' },
  { id: 'AR-2025-1007', date: '2025-09-07', devices: 175, status: 'completed', department: 'HR' },
  { id: 'AR-2025-1008', date: '2025-09-08', devices: 200, status: 'completed', department: 'Finance' },
  { id: 'AR-2025-1009', date: '2025-09-09', devices: 225, status: 'failed', department: 'IT' },
  { id: 'AR-2025-1010', date: '2025-09-10', devices: 250, status: 'completed', department: 'Operations' },
]

// Hook for data fetching with fallback
export function useApiData<T>(
  apiCall: () => Promise<{ success: boolean; data?: T; error?: string }>,
  defaultData: T,
  enabled: boolean = true
) {
  const [data, setData] = useState<T>(defaultData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUsingApi, setIsUsingApi] = useState(false)

  const fetchData = useCallback(async () => {
    if (!enabled) return

    setLoading(true)
    setError(null)

    try {
      // Check if API is available
      const apiAvailable = await checkApiAvailability()
      
      if (apiAvailable) {
        const result = await apiCall()
        if (result.success && result.data) {
          setData(result.data)
          setIsUsingApi(true)
        } else {
          setData(defaultData)
          setIsUsingApi(false)
          setError(result.error || 'Failed to fetch from API, using default data')
        }
      } else {
        setData(defaultData)
        setIsUsingApi(false)
        setError('API not available, using default data')
      }
    } catch (err) {
      setData(defaultData)
      setIsUsingApi(false)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }, [apiCall, defaultData, enabled])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    isUsingApi,
    refetch: fetchData,
  }
}

// Specific hooks for different data types
export function useUsers() {
  return useApiData(
    () => apiClient.getUsers(),
    DEFAULT_USERS
  )
}

export function useMachines() {
  return useApiData(
    () => apiClient.getMachines(),
    DEFAULT_MACHINES
  )
}

export function useReports() {
  return useApiData(
    () => apiClient.getReports(),
    DEFAULT_REPORTS
  )
}

// Data mutation helpers
export const dataService = {
  async updateUser(id: string, userData: Partial<User>) {
    const apiAvailable = await checkApiAvailability()
    if (apiAvailable) {
      return apiClient.updateUser(id, userData)
    }
    return { success: false, error: 'API not available' }
  },

  async deleteUser(id: string) {
    const apiAvailable = await checkApiAvailability()
    if (apiAvailable) {
      return apiClient.deleteUser(id)
    }
    return { success: false, error: 'API not available' }
  },

  async updateMachine(id: string, machineData: Partial<Machine>) {
    const apiAvailable = await checkApiAvailability()
    if (apiAvailable) {
      return apiClient.updateMachine(id, machineData)
    }
    return { success: false, error: 'API not available' }
  },

  async generateReport(reportData: { department?: string; deviceRange?: string }) {
    const apiAvailable = await checkApiAvailability()
    if (apiAvailable) {
      return apiClient.generateReport(reportData)
    }
    return { success: false, error: 'API not available' }
  },
}