import { useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient, type Machine } from '@/utils/enhancedApiClient'

/**
 * Query keys for machines data caching
 */
export const machineKeys = {
  all: ['machines'] as const,
  lists: () => [...machineKeys.all, 'list'] as const,
  list: (email?: string) => [...machineKeys.lists(), email] as const,
  allMachines: () => [...machineKeys.all, 'all-machines'] as const,
}

/**
 * Fetch machines by user email
 * Automatically cached and shared across components
 * 
 * @param userEmail - Email of user to fetch machines for
 * @param enabled - Whether to enable the query (default: true)
 * @returns Query result with machines data
 */
export function useUserMachines(userEmail?: string, enabled: boolean = true) {
  return useQuery({
    queryKey: machineKeys.list(userEmail),
    queryFn: async () => {
      if (!userEmail) {
        throw new Error('User email is required')
      }

      const response = await apiClient.getMachinesByEmail(userEmail)
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch machines')
      }

      return response.data
    },
    enabled: enabled && !!userEmail,
    staleTime: 3 * 60 * 1000,  // 3 minutes - machines data moderately stable
    gcTime: 10 * 60 * 1000,    // 10 minutes in cache
    retry: 1,
  })
}

/**
 * Fetch all machines (admin only)
 * 
 * @param enabled - Whether to enable the query
 * @returns Query result with all machines
 */
export function useAllMachines(enabled: boolean = true) {
  return useQuery({
    queryKey: machineKeys.allMachines(),
    queryFn: async () => {
      const response = await apiClient.getMachines()
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch all machines')
      }

      return response.data
    },
    enabled,
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  })
}

/**
 * Get active licenses count from machines data
 * Uses the cached machines data if available
 * 
 * @param userEmail - Email of user
 * @returns Number of active licenses
 */
export function useActiveLicensesCount(userEmail?: string) {
  const { data: machines = [] } = useUserMachines(userEmail)
  
  return machines.filter((machine: Machine) => machine.license_activated === true).length
}

/**
 * Manually refetch machines data
 */
export function useRefetchMachines() {
  const queryClient = useQueryClient()
  
  return (userEmail?: string) => {
    if (userEmail) {
      queryClient.invalidateQueries({ queryKey: machineKeys.list(userEmail) })
    } else {
      queryClient.invalidateQueries({ queryKey: machineKeys.lists() })
    }
  }
}
