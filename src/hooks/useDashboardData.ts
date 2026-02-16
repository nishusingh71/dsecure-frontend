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
import { indexedDBService } from '@/services/indexedDBService'
import { 
  isDemoMode, 
  DEMO_DASHBOARD_STATS, 
  DEMO_USER_ACTIVITY, 
  DEMO_GROUPS, 
  DEMO_LICENSE_DETAILS, 
  DEMO_REPORTS, 
  DEMO_PROFILE 
} from '@/data/demoData'
import { authService } from "@/utils/authService";

/**
 * Query keys for dashboard data caching
 */
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: (email: string) => [...dashboardKeys.all, 'stats', email] as const,
  activity: (email: string) => [...dashboardKeys.all, 'activity', email] as const,
  groups: (email: string) => [...dashboardKeys.all, 'groups', email] as const,
  licenses: (email: string) => [...dashboardKeys.all, 'licenses', email] as const,
  reports: (email: string) => [...dashboardKeys.all, 'reports', email] as const,
  profile: (email: string) => [...dashboardKeys.all, 'profile', email] as const,
}

// Helper to get current user email
const getCurrentUserEmail = () => {
  const storedUser = localStorage.getItem('user_data');
  const authUser = localStorage.getItem('authUser');
  
  let email = '';
  
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      email = parsed.user_email || parsed.email || '';
    } catch (e) {
      console.error('Error parsing user_data', e);
    }
  }
  
  if (!email && authUser) {
    try {
      const parsed = JSON.parse(authUser);
      email = parsed.user_email || parsed.email || '';
    } catch (e) {
      console.error('Error parsing authUser', e);
    }
  }

  // Fallback to authService to catch token-based email
  if (!email) {
     email = authService.getUserEmail?.() || '';
  }
  
  return email;
};

/**
 * Fetch dashboard statistics
 * Cached for 2 minutes (stats change frequently)
 */
export function useDashboardStats(userEmail: string, enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.stats(userEmail),
    queryFn: async () => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log('🔹 Using DEMO dashboard stats');
        return DEMO_DASHBOARD_STATS;
      }

      // 1. Try IDB (user-scoped)
      const email = userEmail || getCurrentUserEmail();
      const cacheKey = email ? `stats_${email}` : 'stats';
      try {
        const cached = await indexedDBService.get('dashboard_stats', cacheKey);
        if (cached) return cached;
      } catch (e) {
        console.warn('IDB Read Failed: stats', e);
      }

      // 2. Fallback to API
      const response = await AdminDashboardAPI.getDashboardStats()
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch dashboard stats')
      }

      // 3. Update IDB
      indexedDBService.put('dashboard_stats', cacheKey, response.data).catch(e => console.error('IDB Write Failed: stats', e));

      return response.data
    },
    enabled,
    staleTime: 5 * 60 * 1000, 
    gcTime: 30 * 60 * 1000,   
    placeholderData: (previousData) => previousData, 
    refetchOnMount: false,      
    refetchOnWindowFocus: false, 
  })
}

/**
 * Fetch user activity data
 * Cached for 1 minute (activity updates frequently)
 * @param userEmail - Email of the user to fetch activity for
 */
export function useUserActivity(userEmail: string, enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.activity(userEmail),
    queryFn: async () => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log('🔹 Using DEMO user activity');
        return DEMO_USER_ACTIVITY;
      }

      // 1. Try IDB
      try {
        const cached = await indexedDBService.get('user_activity', userEmail);
        if (cached && Array.isArray(cached) && cached.length > 0) return cached;
      } catch (e) {
        console.warn('IDB Read Failed: activity', e);
      }
      
      console.log('📞 Calling getUserActivity API...');
      const response = await AdminDashboardAPI.getUserActivity(userEmail)

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch user activity')
      }
      
      // 3. Update IDB
      indexedDBService.put('user_activity', userEmail, response.data).catch(e => console.error('IDB Write Failed: activity', e));

      return response.data
    },
    enabled: enabled && !!userEmail,
    staleTime: 5 * 60 * 1000, 
    gcTime: 30 * 60 * 1000,   
    placeholderData: (previousData) => previousData, 
    refetchOnMount: false,      
    refetchOnWindowFocus: false, 
  })
}

/**
 * Fetch groups data
 * Cached for 5 minutes (groups rarely change)
 */
export function useGroups(userEmail: string, enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.groups(userEmail),
    queryFn: async () => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log('🔹 Using DEMO groups data');
        return DEMO_GROUPS;
      }

      // 1. Try IDB (user-scoped)
      const email = userEmail || getCurrentUserEmail();
      const groupsCacheKey = email ? `all_groups_${email}` : 'all_groups';
      try {
        const cached = await indexedDBService.get('groups', groupsCacheKey);
        if (cached) return cached;
      } catch (e) {
        console.warn('IDB Read Failed: groups', e);
      }

      const response = await AdminDashboardAPI.getGroups()
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch groups')
      }

      // 3. Update IDB
      indexedDBService.put('groups', groupsCacheKey, response.data).catch(e => console.error('IDB Write Failed: groups', e));

      return response.data
    },
    enabled,
    staleTime: 30 * 60 * 1000, 
    gcTime: 60 * 60 * 1000,    
    placeholderData: (previousData) => previousData, 
    refetchOnMount: false,      
    refetchOnWindowFocus: false, 
  })
}

/**
 * Fetch license data
 * Cached for 5 minutes
 */
export function useLicenseData(userEmail: string, enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.licenses(userEmail),
    queryFn: async () => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log('🔹 Using DEMO license data');
        return DEMO_LICENSE_DETAILS;
      }

       // 1. Try IDB (user-scoped)
       const email = userEmail || getCurrentUserEmail();
       const licCacheKey = email ? `all_licenses_${email}` : 'all_licenses';
       try {
        const cached = await indexedDBService.get('licenses', licCacheKey);
        if (cached) return cached;
      } catch (e) {
        console.warn('IDB Read Failed: licenses', e);
      }

      const response = await AdminDashboardAPI.getLicenseData()
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch license data')
      }

      // 3. Update IDB
      indexedDBService.put('licenses', licCacheKey, response.data).catch(e => console.error('IDB Write Failed: licenses', e));

      return response.data
    },
    enabled,
    staleTime: 30 * 60 * 1000, 
    gcTime: 60 * 60 * 1000,    
    placeholderData: (previousData) => previousData, 
    refetchOnMount: false,      
    refetchOnWindowFocus: false, 
    retry: 1,
  })
}

/**
 * Fetch recent reports
 * Cached for 2 minutes (reports change moderately)
 */
export function useRecentReports(userEmail: string, enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.reports(userEmail),
    queryFn: async () => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log('🔹 Using DEMO recent reports');
        return DEMO_REPORTS;
      }

       // 1. Try IDB (user-scoped)
       const email = getCurrentUserEmail();
       const rptCacheKey = email ? `reports_${email}` : 'reports';
       try {
        const cached = await indexedDBService.get('recent_reports', rptCacheKey);
        if (cached) return cached;
      } catch (e) {
        console.warn('IDB Read Failed: reports', e);
      }

      const response = await AdminDashboardAPI.getRecentReports()
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch recent reports')
      }

      // 3. Update IDB
      indexedDBService.put('recent_reports', rptCacheKey, response.data).catch(e => console.error('IDB Write Failed: reports', e));
      
      return response.data
    },
    enabled,
    staleTime: 5 * 60 * 1000, 
    gcTime: 30 * 60 * 1000,   
    placeholderData: (previousData) => previousData, 
    refetchOnMount: false,      
    refetchOnWindowFocus: false, 
  })
}

/**
 * Fetch admin profile data
 * Cached for 10 minutes (profile rarely changes)
 */
export function useAdminProfile(userEmail: string, enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.profile(userEmail),
    queryFn: async () => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log('🔹 Using DEMO admin profile');
        return DEMO_PROFILE;
      }

      const email = userEmail || getCurrentUserEmail();
       // 1. Try IDB
       if (email) {
        try {
          const cached = await indexedDBService.get('profile', email);
          if (cached) return cached;
        } catch (e) {
          console.warn('IDB Read Failed: profile', e);
        }
       }

      const response = await AdminDashboardAPI.getAdminProfile()
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch admin profile')
      }

      // 3. Update IDB
      if (email) {
        indexedDBService.put('profile', email, response.data).catch(e => console.error('IDB Write Failed: profile', e));
      }

      return response.data
    },
    enabled,
    staleTime: 10 * 60 * 1000, 
    gcTime: 30 * 60 * 1000,     
    placeholderData: (previousData) => previousData, 
    refetchOnMount: false,      
    refetchOnWindowFocus: false, 
  })
}

/**
 * Fetch all dashboard data in parallel using useQueries
 * This replaces the manual Promise.all() approach
 * 
 * @param userEmail - Email of the user to fetch data for
 * @param enabled - Whether to enable all queries
 * @returns Object containing all dashboard data with loading/error states
 */
export function useDashboardData(userEmail: string, enabled: boolean = true) {
  const statsQuery = useDashboardStats(userEmail, enabled)
  const activityQuery = useUserActivity(userEmail, enabled)
  const groupsQuery = useGroups(userEmail, enabled)
  const licenseQuery = useLicenseData(userEmail, enabled)
  const reportsQuery = useRecentReports(userEmail, enabled)
  const profileQuery = useAdminProfile(userEmail, enabled)

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
 * @param userEmail - Email of the user to fetch data for
 */
export function useRefetchDashboard(userEmail: string) {
  const { refetch } = useDashboardData(userEmail, false)
  return refetch
}
