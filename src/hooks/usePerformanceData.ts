import { useQuery } from '@tanstack/react-query'
import { useAuditReports } from './useAuditReports'
import { useUserMachines } from './useUserMachines'
import { AdminDashboardAPI } from '@/services/adminDashboardAPI'
import { isDemoMode, DEMO_PERFORMANCE_DATA } from '@/data/demoData'

export interface PerformanceData {
  monthlyErasures: { month: string; count: number }[]
  avgDuration: { month: string; duration: number }[]
  throughput: { month: string; count: number }[]
  successRate: string
  successCount: number
  failureCount: number
}

export const performanceKeys = {
  all: ['performance'] as const,
  data: (userEmail?: string) => [...performanceKeys.all, 'data', userEmail] as const,
}

export function usePerformanceData(userEmail?: string, enabled = true) {
  // Get audit reports and machines data from React Query cache
  const { data: auditReports = [] } = useAuditReports(userEmail, enabled)
  const { data: machines = [] } = useUserMachines(userEmail, enabled)

  return useQuery({
    queryKey: performanceKeys.data(userEmail),
    queryFn: async (): Promise<PerformanceData> => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log('🔹 Using DEMO performance data');
        return DEMO_PERFORMANCE_DATA;
      }

      try {
        // console.log('?? Calculating performance metrics from cached data...')
        
        // Use existing data from React Query cache and calculate performance
        const monthsData: Record<string, {
          erasures: number
          totalDuration: number
          activeMachines: Set<string>
        }> = {}

        // Process audit reports
        auditReports.forEach(report => {
          // Use reportDate or report_datetime for timestamp
          const dateStr = report.reportDate || report.report_datetime
          if (dateStr) {
            const month = new Date(dateStr).toLocaleString('default', { 
              month: 'short', 
              year: 'numeric' 
            })
            
            if (!monthsData[month]) {
              monthsData[month] = {
                erasures: 0,
                totalDuration: 0,
                activeMachines: new Set()
              }
            }
            
            monthsData[month].erasures++
            
            // Calculate duration - use estimated duration based on report type
            // Since we don't have actual duration field, estimate based on device count
            const deviceCount = report.deviceCount || 1
            const estimatedDuration = deviceCount * 30 // 30 seconds per device (average)
            monthsData[month].totalDuration += estimatedDuration
          }
        })

        // Process machines for active machines count
        machines.forEach(machine => {
          if (machine.license_activated && machine.created_at) {
            const month = new Date(machine.created_at).toLocaleString('default', { 
              month: 'short', 
              year: 'numeric' 
            })
            
            if (!monthsData[month]) {
              monthsData[month] = {
                erasures: 0,
                totalDuration: 0,
                activeMachines: new Set()
              }
            }
            
            monthsData[month].activeMachines.add(machine.machine_id || machine.id || '')
          }
        })

        // Calculate final performance metrics
        const monthlyErasures = Object.entries(monthsData).map(([month, data]) => ({
          month,
          count: data.erasures
        })).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())

        const avgDuration = Object.entries(monthsData).map(([month, data]) => ({
          month,
          duration: data.erasures > 0 ? Math.floor(data.totalDuration / data.erasures) : 0
        })).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())

        // Throughput = erasures + active machines count (combined metric)
        const throughput = Object.entries(monthsData).map(([month, data]) => ({
          month,
          count: data.erasures + data.activeMachines.size
        })).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())

        // Calculate success rate stats
        const successCount = auditReports.filter(r => 
          r.status?.toLowerCase() === 'success' || 
          r.status?.toLowerCase() === 'certified'
        ).length
        
        const failureCount = auditReports.filter(r => 
          r.status?.toLowerCase() === 'failed' || 
          r.status?.toLowerCase() === 'failed verification'
        ).length
        
        const totalOps = auditReports.length
        const successRate = totalOps > 0 
          ? ((successCount / totalOps) * 100).toFixed(1) + '%' 
          : '0%'

        const result = {
          monthlyErasures,
          avgDuration,
          throughput,
          successRate,
          successCount,
          failureCount
        }

        // console.log('? Performance metrics calculated successfully:', {
        //   monthlyErasures: monthlyErasures.length,
        //   avgDuration: avgDuration.length,
        //   throughput: throughput.length,
        //   totalErasures: monthlyErasures.reduce((sum, m) => sum + m.count, 0),
        //   totalActiveMachines: Object.values(monthsData).reduce((sum, m) => sum + m.activeMachines.size, 0)
        // })

        return result

      } catch (error) {
        console.error('? Error calculating performance data:', error)
        
        // Return empty data structure on error
        return {
          monthlyErasures: [],
          avgDuration: [],
          throughput: [],
          successRate: '0%',
          successCount: 0,
          failureCount: 0
        }
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
    enabled: enabled && !!userEmail && auditReports.length > 0, // Only run when we have data
    // Refetch when audit reports or machines data changes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export function useRefetchPerformanceData() {
  const { refetch } = useQuery({
    queryKey: performanceKeys.all,
    enabled: false
  })
  
  return refetch
}