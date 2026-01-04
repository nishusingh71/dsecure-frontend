import { useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient, type Session } from '@/utils/enhancedApiClient'

/**
 * Query keys for sessions caching
 */
export const sessionKeys = {
    all: ['sessions'] as const,
    lists: () => [...sessionKeys.all, 'list'] as const,
    list: (email?: string) => [...sessionKeys.lists(), email] as const,
    allSessions: () => [...sessionKeys.all, 'all-sessions'] as const,
}

/**
 * Fetch sessions by user email
 * Automatically cached and shared across components
 * 
 * @param userEmail - Email of user to fetch sessions for
 * @param enabled - Whether to enable the query (default: true)
 * @returns Query result with sessions data
 */
export function useSessions(userEmail?: string, enabled: boolean = true) {
    return useQuery({
        queryKey: sessionKeys.list(userEmail),
        queryFn: async () => {
            if (!userEmail) {
                throw new Error('User email is required')
            }

            const response = await apiClient.getSessionsByEmail(userEmail)

            if (!response.success || !response.data) {
                throw new Error(response.message || 'Failed to fetch sessions')
            }

            // Sort by login_time descending (most recent first)
            const sortedSessions = [...response.data].sort((a, b) =>
                new Date(b.login_time).getTime() - new Date(a.login_time).getTime()
            )

            return sortedSessions
        },
        enabled: enabled && !!userEmail,
        staleTime: 2 * 60 * 1000,  // 2 minutes - sessions can change more frequently
        gcTime: 10 * 60 * 1000,    // 10 minutes in cache
        retry: 1,
    })
}

/**
 * Fetch all sessions (admin only)
 * 
 * @param enabled - Whether to enable the query
 * @returns Query result with all sessions
 */
export function useAllSessions(enabled: boolean = true) {
    return useQuery({
        queryKey: sessionKeys.allSessions(),
        queryFn: async () => {
            const response = await apiClient.getSessions()

            if (!response.success || !response.data) {
                throw new Error(response.message || 'Failed to fetch all sessions')
            }

            // Sort by login_time descending (most recent first)
            const sortedSessions = [...response.data].sort((a, b) =>
                new Date(b.login_time).getTime() - new Date(a.login_time).getTime()
            )

            return sortedSessions
        },
        enabled,
        staleTime: 2 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1,
    })
}

/**
 * Get sessions count
 * Uses the cached sessions data if available
 * 
 * @param userEmail - Email of user
 * @returns Number of sessions
 */
export function useSessionsCount(userEmail?: string) {
    const { data: sessions = [] } = useSessions(userEmail)
    return sessions.length
}

/**
 * Manually refetch sessions data
 */
export function useRefetchSessions() {
    const queryClient = useQueryClient()

    return (userEmail?: string) => {
        if (userEmail) {
            queryClient.invalidateQueries({ queryKey: sessionKeys.list(userEmail) })
        } else {
            queryClient.invalidateQueries({ queryKey: sessionKeys.lists() })
        }
    }
}
