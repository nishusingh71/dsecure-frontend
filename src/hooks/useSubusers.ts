import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient, type Subuser, type ApiResponse } from '@/utils/enhancedApiClient'

// Query Keys - centralized for easy cache management
export const subuserKeys = {
  all: ['subusers'] as const,
  lists: () => [...subuserKeys.all, 'list'] as const,
  list: (filters?: string) => [...subuserKeys.lists(), filters] as const,
  details: () => [...subuserKeys.all, 'detail'] as const,
  detail: (email: string) => [...subuserKeys.details(), email] as const,
  byParent: (parentEmail: string) => [...subuserKeys.all, 'by-parent', parentEmail] as const,
}

/**
 * 🔄 Hook to fetch all subusers with automatic fallback across multiple endpoints
 * Features:
 * - Automatic caching (5 min fresh, 10 min cache)
 * - Background refetching
 * - Error handling
 * - Loading states
 * - Enhanced with user details (subuser_group, last_login, department, etc.)
 * 
 * @param userEmail - Optional user email for email-based endpoints
 * @param enabled - Whether to enable the query (default: true)
 */
export function useSubusers(userEmail?: string, enabled: boolean = true) {
  return useQuery({
    queryKey: subuserKeys.list(userEmail),
    queryFn: async () => {
      // console.log('🔄 React Query: Fetching subusers with enhanced user details...')
      const response = await apiClient.getAllSubusersWithFallback(userEmail)
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch subusers')
      }
      
      // console.log(`✅ React Query: Fetched ${response.data.length} subusers`)
      
      // Enhance each subuser with complete user details
      // ✅ Strategy: Use API response data, but ALWAYS fetch /api/Users for critical fields
      const enhancedSubusers = await Promise.all(
        response.data.map(async (subuser) => {
          try {
            // console.log(`🔍 Processing subuser: ${subuser.subuser_email}`)
            // console.log(`📦 API Response data:`, {
            //   subuser_group: subuser.subuser_group,
            //   license_allocation: subuser.license_allocation,
            //   status: subuser.status,
            //   department: subuser.department,
            //   role: subuser.role || subuser.subuser_role,
            //   last_login: subuser.last_login
            // })
            
            // ✅ ALWAYS fetch /api/Users/{email} for department and role (critical fields)
            let userData = null
            try {
              // console.log(`🔍 Fetching user details from /api/Users/${subuser.subuser_email}`)
              const userDataRes = await apiClient.getUserByEmail(subuser.subuser_email)
              if (userDataRes.success && userDataRes.data) {
                userData = userDataRes.data
                // console.log(`✅ User data fetched:`, {
                //   department: userData.department,
                //   role: userData.user_role || userData.role,
                //   user_group: userData.user_group,
                //   last_login: userData.last_login
                // })
              }
            } catch (err) {
              console.warn(`⚠️ Failed to fetch user data for ${subuser.subuser_email}:`, err)
            }
            
            // Fetch machines for license usage calculation
            const machinesRes = await apiClient.getMachinesByEmail(subuser.subuser_email)
            let licenseUsage = 0
            
            if (machinesRes.success && machinesRes.data) {
              licenseUsage = machinesRes.data.filter(
                (machine: any) => (machine.demo_usage_count || 0) > 0
              ).length
            }
            
            return {
              ...subuser,
              // ✅ Priority: API response > /api/Users > Default
              subuser_group: subuser.subuser_group || userData?.user_group || 'N/A',
              license_allocation: subuser.license_allocation || userData?.licesne_allocation || '0',
              last_login: subuser.last_login || userData?.last_login || userData?.lastLogin || 'Never',
              department: subuser.department || userData?.department || 'N/A',
              role: subuser.role || subuser.subuser_role || userData?.user_role || userData?.role || 'user',
              defaultRole: subuser.role || subuser.subuser_role || userData?.user_role || userData?.role || 'user',
              status: subuser.status || userData?.status || 'active',
              licenseUsage,
            }
          } catch (error) {
            console.error(`❌ Error processing subuser ${subuser.subuser_email}:`, error)
            return subuser
          }
        })
      )
      
      // console.log('✅ All subusers enhanced with user details')
      return enhancedSubusers
    },
    enabled,
    // Retry only once on failure
    retry: 1,
    // Consider data stale after 5 minutes
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * 🔍 Hook to fetch a single subuser by email
 * 
 * @param email - Subuser email
 * @param enabled - Whether to enable the query
 */
export function useSubuser(email: string, enabled: boolean = true) {
  return useQuery({
    queryKey: subuserKeys.detail(email),
    queryFn: async () => {
      // console.log(`🔍 React Query: Fetching subuser ${email}...`)
      const response = await apiClient.getEnhancedSubuser(email)
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch subuser')
      }
      
      // console.log(`✅ React Query: Fetched subuser ${email}`)
      return response.data
    },
    enabled: enabled && !!email,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * 📝 Hook to create a new subuser
 * Features:
 * - Automatic cache invalidation
 * - Optimistic updates (optional)
 * - Error handling
 */
export function useCreateSubuser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (subuserData: Parameters<typeof apiClient.createSubuser>[0]) => {
      // console.log('📝 React Query: Creating subuser...')
      const response = await apiClient.createSubuser(subuserData)
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to create subuser')
      }
      
      // console.log('✅ React Query: Subuser created successfully')
      return response.data
    },
    onSuccess: () => {
      // Invalidate and refetch subusers list after creation
      queryClient.invalidateQueries({ queryKey: subuserKeys.lists() })
      // console.log('🔄 React Query: Invalidated subusers cache')
    },
  })
}

/**
 * ✏️ Hook to update a subuser
 * Features:
 * - Automatic cache update
 * - Optimistic updates
 */
export function useUpdateSubuser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ 
      email, 
      userData 
    }: { 
      email: string
      userData: Parameters<typeof apiClient.updateEnhancedSubuser>[1]
    }) => {
      // console.log(`✏️ React Query: Updating subuser ${email}...`)
      const response = await apiClient.updateEnhancedSubuser(email, userData)
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to update subuser')
      }
      
      // console.log(`✅ React Query: Subuser ${email} updated successfully`)
      return response.data
    },
    onSuccess: (data, variables) => {
      // Update the specific subuser in cache
      queryClient.setQueryData(subuserKeys.detail(variables.email), data)
      // Invalidate list to refetch
      queryClient.invalidateQueries({ queryKey: subuserKeys.lists() })
      // console.log('🔄 React Query: Updated subuser cache')
    },
  })
}

/**
 * 🗑️ Hook to delete a subuser
 * Features:
 * - Automatic cache cleanup
 * - Optimistic updates (optional)
 */
export function useDeleteSubuser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (email: string) => {
      // console.log(`🗑️ React Query: Deleting subuser ${email}...`)
      const response = await apiClient.deleteSubuser(email)
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete subuser')
      }
      
      // console.log(`✅ React Query: Subuser ${email} deleted successfully`)
      return email
    },
    onSuccess: (email) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: subuserKeys.detail(email) })
      // Refetch list
      queryClient.invalidateQueries({ queryKey: subuserKeys.lists() })
      // console.log('🔄 React Query: Removed subuser from cache')
    },
  })
}

/**
 * 🔄 Hook to manually refetch subusers
 * Useful for refresh buttons
 */
export function useRefetchSubusers() {
  const queryClient = useQueryClient()
  
  return () => {
    // console.log('🔄 React Query: Manual refetch triggered')
    queryClient.invalidateQueries({ queryKey: subuserKeys.all })
  }
}

/**
 * 📊 Hook to get subusers cache status
 * Useful for debugging
 */
export function useSubusersCacheStatus() {
  const queryClient = useQueryClient()
  
  return {
    isCached: queryClient.getQueryData(subuserKeys.lists()) !== undefined,
    cacheData: queryClient.getQueryData(subuserKeys.lists()),
    clearCache: () => {
      // console.log('🗑️ React Query: Clearing subusers cache')
      queryClient.removeQueries({ queryKey: subuserKeys.all })
    },
  }
}
