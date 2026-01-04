import { useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient, type AuditReport } from '@/utils/enhancedApiClient'

/**
 * Query keys for audit reports caching
 */
export const auditReportKeys = {
  all: ['auditReports'] as const,
  lists: () => [...auditReportKeys.all, 'list'] as const,
  list: (email?: string) => [...auditReportKeys.lists(), email] as const,
  allReports: () => [...auditReportKeys.all, 'all-reports'] as const,
}

/**
 * Fetch audit reports by user email
 * Automatically cached and shared across components
 * 
 * @param userEmail - Email of user to fetch audit reports for
 * @param enabled - Whether to enable the query (default: true)
 * @returns Query result with audit reports data
 */
export function useAuditReports(userEmail?: string, enabled: boolean = true) {
  return useQuery({
    queryKey: auditReportKeys.list(userEmail),
    queryFn: async () => {
      if (!userEmail) {
        throw new Error('User email is required')
      }

      const response = await apiClient.getAuditReportsByEmail(userEmail)

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch audit reports')
      }

      return response.data
    },
    enabled: enabled && !!userEmail,
    staleTime: 5 * 60 * 1000,  // 5 minutes - audit reports don't change frequently
    gcTime: 15 * 60 * 1000,    // 15 minutes in cache
    retry: 1,
  })
}

/**
 * Fetch all audit reports (admin only)
 * 
 * @param enabled - Whether to enable the query
 * @returns Query result with all audit reports
 */
export function useAllAuditReports(enabled: boolean = true) {
  return useQuery({
    queryKey: auditReportKeys.allReports(),
    queryFn: async () => {
      const response = await apiClient.getAuditReports()

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch all audit reports')
      }

      return response.data
    },
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
  })
}

/**
 * Get audit reports count
 * Uses the cached audit reports data if available
 * 
 * @param userEmail - Email of user
 * @returns Number of audit reports
 */
export function useAuditReportsCount(userEmail?: string) {
  const { data: reports = [] } = useAuditReports(userEmail)
  return reports.length
}

/**
 * Manually refetch audit reports data
 */
export function useRefetchAuditReports() {
  const queryClient = useQueryClient()

  return (userEmail?: string) => {
    if (userEmail) {
      queryClient.invalidateQueries({ queryKey: auditReportKeys.list(userEmail) })
    } else {
      queryClient.invalidateQueries({ queryKey: auditReportKeys.lists() })
    }
  }
}

/**
 * Get audit reports with enhanced device count
 * Fetches machines data for each report to calculate device count
 * 
 * @param userEmail - Email of user
 * @param enabled - Whether to enable the query
 * @returns Enhanced audit reports with device counts
 */
export function useEnhancedAuditReports(userEmail?: string, enabled: boolean = true) {
  return useQuery({
    queryKey: [...auditReportKeys.list(userEmail), 'enhanced'],
    queryFn: async () => {
      if (!userEmail) {
        throw new Error('User email is required')
      }

      const response = await apiClient.getAuditReportsByEmail(userEmail)

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch audit reports')
      }

      const reports = response.data

      // Fetch device count for each report in parallel
      const reportsWithDeviceCount = await Promise.all(
        reports.map(async (report: AuditReport) => {
          try {
            const machinesRes = await apiClient.getMachinesByEmail(report.user_email)
            const deviceCount = machinesRes.success && machinesRes.data
              ? machinesRes.data.length
              : 0

            return {
              ...report,
              deviceCount
            }
          } catch (error) {
            console.warn(`⚠️ Failed to fetch machines for ${report.user_email}:`, error)
            return {
              ...report,
              deviceCount: 0
            }
          }
        })
      )

      return reportsWithDeviceCount
    },
    enabled: enabled && !!userEmail,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
  })
}
