import { useQueries, useQuery } from '@tanstack/react-query'
import { 
  AdminDashboardAPI, 
  type DashboardStats, 
  type UserActivity, 
  type GroupData, 
  type LicenseData, 
  type RecentReport,
  type ProfileData
} from '@/services/adminDashboardAPI'

/**
 * Query keys for dashboard data caching
 */
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  activity: () => [...dashboardKeys.all, 'activity'] as const,
  groups: () => [...dashboardKeys.all, 'groups'] as const,
  licenses: () => [...dashboardKeys.all, 'licenses'] as const,
  reports: () => [...dashboardKeys.all, 'reports'] as const,
  profile: () => [...dashboardKeys.all, 'profile'] as const,
}

/**
 * Fetch dashboard statistics
 * Cached for 2 minutes (stats change frequently)
 */
export function useDashboardStats(enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: async () => {
      const response = await AdminDashboardAPI.getDashboardStats()
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch dashboard stats')
      }
      return response.data
    },
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
  })
}

/**
 * Fetch user activity data
 * Cached for 1 minute (activity updates frequently)
 */
export function useUserActivity(enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.activity(),
    queryFn: async () => {
      const response = await AdminDashboardAPI.getUserActivity()
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch user activity')
      }
      return response.data
    },
    enabled,
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Fetch groups data
 * Cached for 5 minutes (groups rarely change)
 */
export function useGroups(enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.groups(),
    queryFn: async () => {
      const response = await AdminDashboardAPI.getGroups()
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch groups')
      }
      return response.data
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Fetch license data
 * Cached for 5 minutes
 */
export function useLicenseData(enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.licenses(),
    queryFn: async () => {
      const response = await AdminDashboardAPI.getLicenseData()
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch license data')
      }
      return response.data
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Fetch recent reports
 * Cached for 2 minutes (reports change moderately)
 */
export function useRecentReports(enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.reports(),
    queryFn: async () => {
      const response = await AdminDashboardAPI.getRecentReports()
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch recent reports')
      }
      return response.data
    },
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Fetch admin profile data
 * Cached for 10 minutes (profile rarely changes)
 */
export function useAdminProfile(enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.profile(),
    queryFn: async () => {
      const response = await AdminDashboardAPI.getAdminProfile()
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch admin profile')
      }
      return response.data
    },
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000,     // 20 minutes
  })
}

/**
 * Fetch all dashboard data in parallel using useQueries
 * This replaces the manual Promise.all() approach
 * 
 * @param enabled - Whether to enable all queries
 * @returns Object containing all dashboard data with loading/error states
 */
export function useDashboardData(enabled: boolean = true) {
  const statsQuery = useDashboardStats(enabled)
  const activityQuery = useUserActivity(enabled)
  const groupsQuery = useGroups(enabled)
  const licenseQuery = useLicenseData(enabled)
  const reportsQuery = useRecentReports(enabled)
  const profileQuery = useAdminProfile(enabled)

  return {
    // Data
    stats: statsQuery.data || null,
    activity: activityQuery.data || [],
    groups: groupsQuery.data || [],
    licenses: licenseQuery.data || [],
    reports: reportsQuery.data || [],
    profile: profileQuery.data || null,

    // Loading states
    isLoading: statsQuery.isLoading || activityQuery.isLoading || 
               groupsQuery.isLoading || licenseQuery.isLoading || 
               reportsQuery.isLoading || profileQuery.isLoading,
    
    isRefetching: statsQuery.isRefetching || activityQuery.isRefetching || 
                  groupsQuery.isRefetching || licenseQuery.isRefetching || 
                  reportsQuery.isRefetching || profileQuery.isRefetching,

    // Error states
    hasError: statsQuery.isError || activityQuery.isError || 
              groupsQuery.isError || licenseQuery.isError || 
              reportsQuery.isError || profileQuery.isError,

    errors: {
      stats: statsQuery.error,
      activity: activityQuery.error,
      groups: groupsQuery.error,
      licenses: licenseQuery.error,
      reports: reportsQuery.error,
      profile: profileQuery.error,
    },

    // Refetch functions
    refetch: () => {
      statsQuery.refetch()
      activityQuery.refetch()
      groupsQuery.refetch()
      licenseQuery.refetch()
      reportsQuery.refetch()
      profileQuery.refetch()
    },

    // Individual query objects for granular control
    queries: {
      stats: statsQuery,
      activity: activityQuery,
      groups: groupsQuery,
      licenses: licenseQuery,
      reports: reportsQuery,
      profile: profileQuery,
    }
  }
}

/**
 * Manually refetch all dashboard data
 */
export function useRefetchDashboard() {
  const { refetch } = useDashboardData(false)
  return refetch
}
