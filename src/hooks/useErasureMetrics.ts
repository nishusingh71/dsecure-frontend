import { useQuery } from '@tanstack/react-query';
import { AdminDashboardAPI, ErasureMetricsRequest, ErasureMetricsResponse } from '@/services/adminDashboardAPI';
import { indexedDBService } from '@/services/indexedDBService';

import { isDemoMode, DEMO_PERFORMANCE_DATA } from '@/data/demoData';

export const erasureMetricsKeys = {
  all: ['erasure-metrics'] as const,
  list: (filters: ErasureMetricsRequest) => [...erasureMetricsKeys.all, filters] as const,
};

// Helper to check if filters are "default" (no specific date range)
const isDefaultFilters = (filters: ErasureMetricsRequest) => {
    return !filters.fromDate && !filters.toDate && !filters.year;
}

export function useErasureMetrics(filters: ErasureMetricsRequest, enabled: boolean = true) {
  return useQuery({
    queryKey: erasureMetricsKeys.list(filters),
    queryFn: async () => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log('🔹 Using DEMO erasure metrics data');
        return DEMO_PERFORMANCE_DATA;
      }
      
      // 1. Try IDB if filters are default (user-scoped)
      const cacheEmail = filters.userEmails?.[0] || '';
      const metricsCacheKey = cacheEmail ? `metrics_${cacheEmail}` : 'metrics';
      if (isDefaultFilters(filters)) {
          try {
              const cached = await indexedDBService.get('erasure_metrics', metricsCacheKey);
              if (cached) return cached;
          } catch (e) {
              console.warn('IDB Read Failed: erasure_metrics', e);
          }
      }

      const response = await AdminDashboardAPI.getErasureMetrics(filters);
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch erasure metrics');
      }

      // 3. Update IDB if default filters (user-scoped)
      if (isDefaultFilters(filters)) {
          indexedDBService.put('erasure_metrics', metricsCacheKey, response.data).catch(e => console.error('IDB Write Failed: erasure_metrics', e));
      }

      return response.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000, 
    gcTime: 30 * 60 * 1000,   
    placeholderData: (previousData) => previousData, 
    refetchOnMount: false,      
    refetchOnWindowFocus: false, 
  });
}
