import { QueryClient } from '@tanstack/react-query'

// Create a client with optimized default options for reduced API calls
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: Data considered fresh for 10 minutes (increased from 5)
      staleTime: 10 * 60 * 1000,
      // Cache time: Keep unused data for 30 minutes (increased from 10)
      gcTime: 30 * 60 * 1000,
      // Retry failed requests 1 time
      retry: 1,
      // Don't refetch on window focus - prevents unnecessary API calls
      refetchOnWindowFocus: false,
      // Don't refetch on mount if data is fresh - prevents API calls on page switch
      refetchOnMount: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
      // Keep previous data while refetching
      placeholderData: (previousData: unknown) => previousData,
    },
    mutations: {
      // Retry failed mutations 0 times by default
      retry: 0,
    },
  },
})
