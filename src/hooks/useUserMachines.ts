import { useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient, type Machine } from '@/utils/enhancedApiClient'

import { indexedDBService } from '@/services/indexedDBService'
import { isDemoMode, DEMO_MACHINES } from '@/data/demoData'

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

      // Return demo data if in demo mode
      if (isDemoMode()) {
        console.log('🔹 Using DEMO machines data');
        return DEMO_MACHINES;
      }

      // 1. Try IDB first
      // ********** PURANA CODE (wrong store 'user_activity') **********
      // const cached = await indexedDBService.get('user_activity', userEmail);
      // *******************************************
      // ********** NAYA CODE — Read from correct 'machines' store **********
      try {
        const cached = await indexedDBService.get('machines', userEmail);
        if (cached && Array.isArray(cached) && cached.length > 0) {
            console.log(`✅ Loaded machines for ${userEmail} from IndexedDB`);
            return cached;
        }
      } catch (e) {
         console.warn('IDB Read Failed: machines', e);
      }
      // *******************************************

      const response = await apiClient.getMachinesByEmail(userEmail)

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch machines')
      }

      // 3. Update IDB
      // ********** PURANA CODE (wrong store 'user_activity') **********
      // indexedDBService.put('user_activity', userEmail, response.data).catch(e => console.error('IDB Write Failed: userMachines', e));
      // *******************************************
      // ********** NAYA CODE — Write to correct 'machines' store **********
      indexedDBService.put('machines', userEmail, response.data).catch(e => console.error('IDB Write Failed: machines', e));
      // *******************************************

      return response.data
    },
    enabled: enabled && !!userEmail,
    staleTime: 30 * 60 * 1000,  // 30 minutes - keep licenses data fresh for longer
    gcTime: 60 * 60 * 1000,     // 1 hour in cache - persist even when component unmounts
    placeholderData: (previousData) => previousData, // Show previous data while refetching
    refetchOnMount: false,      // Don't refetch when component mounts if data is fresh
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
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
    staleTime: 30 * 60 * 1000, // 30 minutes - keep licenses data fresh for longer
    gcTime: 60 * 60 * 1000,    // 1 hour in cache
    placeholderData: (previousData) => previousData, // Show previous data while refetching
    refetchOnMount: false,      // Don't refetch when component mounts if data is fresh
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
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
