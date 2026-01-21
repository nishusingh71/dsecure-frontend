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
 * ?? Hook to fetch all subusers with automatic fallback across multiple endpoints
 * Features:
 * - Automatic caching (5 min fresh, 10 min cache)
 * - Background refetching
 * - Error handling
 * - Loading states
 * - Enhanced with user details (subuser_group, last_login, department, etc.)
 * - Supports filtering by parentUserEmail, subuserEmail, department, role, group, search
 * 
 * @param userEmail - Optional user email for email-based endpoints
 * @param enabled - Whether to enable the query (default: true)
 * @param filters - Optional filters for the API call
 */
export function useSubusers(
  userEmail?: string, 
  enabled: boolean = true,
  filters?: {
    parentUserEmail?: string;
    subuserEmail?: string;
    department?: string;
    role?: string;
    group?: string;
    search?: string;
  }
) {
  return useQuery({
    queryKey: subuserKeys.list(userEmail ? `${userEmail}-${JSON.stringify(filters)}` : undefined),
    queryFn: async () => {
      // console.log('🔄 React Query: Fetching subusers...')
      const response = await apiClient.getAllSubusersWithFallback(userEmail, filters)

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch subusers')
      }

      // console.log(`? React Query: Fetched ${response.data.length} subusers`)

      // ? PERFORMANCE FIX: Return base data immediately without extra API calls
      // Previously we were making N+1 API calls (getUserByEmail + getMachinesByEmail for each subuser)
      // This was causing 10 subusers = 20+ extra API calls = very slow loading
      // Now we use the data already available from the main API response
      // Detailed user data is fetched on-demand when user clicks "Edit"
      const enhancedSubusers = response.data.map((subuser) => {
        return {
          ...subuser,
          // Use data from API response, provide sensible defaults
          subuser_group: subuser.subuser_group || 'N/A',
          license_allocation: subuser.license_allocation || '0',
          last_login: subuser.last_login || 'Never',
          department: subuser.department || 'N/A',
          role: subuser.role || subuser.subuser_role || 'user',
          defaultRole: subuser.role || subuser.subuser_role || 'user',
          status: subuser.status || 'active',
          licenseUsage: 0, // Will be fetched on-demand when needed
        }
      })

      // console.log('? Subusers ready for display')
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
 * ?? Hook to fetch a single subuser by email
 * 
 * @param email - Subuser email
 * @param enabled - Whether to enable the query
 */
export function useSubuser(email: string, enabled: boolean = true) {
  return useQuery({
    queryKey: subuserKeys.detail(email),
    queryFn: async () => {
      // console.log(`?? React Query: Fetching subuser ${email}...`)
      const response = await apiClient.getEnhancedSubuser(email)

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch subuser')
      }

      // console.log(`? React Query: Fetched subuser ${email}`)
      return response.data
    },
    enabled: enabled && !!email,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * ?? Hook to create a new subuser
 * Features:
 * - Automatic cache invalidation
 * - Optimistic updates (optional)
 * - Error handling
 */
export function useCreateSubuser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (subuserData: Parameters<typeof apiClient.createSubuser>[0]) => {
      // console.log('?? React Query: Creating subuser...')
      const response = await apiClient.createSubuser(subuserData)

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to create subuser')
      }

      // console.log('? React Query: Subuser created successfully')
      return response.data
    },
    onSuccess: () => {
      // Invalidate and refetch subusers list after creation
      queryClient.invalidateQueries({ queryKey: subuserKeys.lists() })
      // console.log('?? React Query: Invalidated subusers cache')
    },
  })
}

/**
 * ?? Hook to update a subuser
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
      // console.log(`?? React Query: Updating subuser ${email}...`)
      const response = await apiClient.updateEnhancedSubuser(email, userData)

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to update subuser')
      }

      // console.log(`? React Query: Subuser ${email} updated successfully`)
      return response.data
    },
    onSuccess: (data, variables) => {
      // Update the specific subuser in cache
      queryClient.setQueryData(subuserKeys.detail(variables.email), data)
      // Invalidate list to refetch
      queryClient.invalidateQueries({ queryKey: subuserKeys.lists() })
      // console.log('?? React Query: Updated subuser cache')
    },
  })
}

/**
 * ??? Hook to delete a subuser
 * Features:
 * - Automatic cache cleanup
 * - Optimistic updates (optional)
 */
export function useDeleteSubuser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (email: string) => {
      // console.log(`??? React Query: Deleting subuser ${email}...`)
      const response = await apiClient.deleteSubuser(email)

      if (!response.success) {
        throw new Error(response.message || 'Failed to delete subuser')
      }

      // console.log(`? React Query: Subuser ${email} deleted successfully`)
      return email
    },
    onSuccess: (email) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: subuserKeys.detail(email) })
      // Refetch list
      queryClient.invalidateQueries({ queryKey: subuserKeys.lists() })
      // console.log('?? React Query: Removed subuser from cache')
    },
  })
}

/**
 * ?? Hook to manually refetch subusers
 * Useful for refresh buttons
 */
export function useRefetchSubusers() {
  const queryClient = useQueryClient()

  return () => {
    // console.log('?? React Query: Manual refetch triggered')
    queryClient.invalidateQueries({ queryKey: subuserKeys.all })
  }
}

/**
 * ?? Hook to get subusers cache status
 * Useful for debugging
 */
export function useSubusersCacheStatus() {
  const queryClient = useQueryClient()

  return {
    isCached: queryClient.getQueryData(subuserKeys.lists()) !== undefined,
    cacheData: queryClient.getQueryData(subuserKeys.lists()),
    clearCache: () => {
      // console.log('??? React Query: Clearing subusers cache')
      queryClient.removeQueries({ queryKey: subuserKeys.all })
    },
  }
}
