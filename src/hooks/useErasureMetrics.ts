import { useQuery } from '@tanstack/react-query';
import { AdminDashboardAPI, ErasureMetricsRequest } from '@/services/adminDashboardAPI';
import { indexedDBService } from '@/services/indexedDBService';
import { idbKeys } from '@/services/idbKeys';

import { isDemoMode, DEMO_PERFORMANCE_DATA } from '@/data/demoData';

export const erasureMetricsKeys = {
  all: ['erasure-metrics'] as const,
  list: (filters: ErasureMetricsRequest) => [...erasureMetricsKeys.all, filters] as const,
};

export function useErasureMetrics(filters: ErasureMetricsRequest, enabled: boolean = true) {
  return useQuery({
    queryKey: erasureMetricsKeys.list(filters),
    queryFn: async () => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log('🔹 Using DEMO erasure metrics data');
        return DEMO_PERFORMANCE_DATA;
      }
      
      const targetEmail = filters.userEmails?.[0] || '';
      // ✅ NAYA CODE — हर filter combination ke liye unique key
      // Isse year change ya user change karne par bhi cache kaam karega
      const filterStr = JSON.stringify({
        y: filters.year,
        f: filters.fromDate,
        t: filters.toDate,
        u: filters.userEmails ? [...filters.userEmails].sort((a, b) => a.localeCompare(b)) : []
      });
      const metricsCacheKey = `${idbKeys.erasureMetrics(targetEmail)}_${filterStr}`;

      // 1. Try IDB first (Check for this specific filter set)
      try {
        const cached = await indexedDBService.get('erasure_metrics', metricsCacheKey);
        if (cached) {
            console.log('⚡ Found cached erasure metrics for filters:', filterStr);
            return cached;
        }
      } catch (e) {
        console.warn('IDB Read Failed: erasure_metrics', e);
      }

      // 2. Fetch from API
      const response = await AdminDashboardAPI.getErasureMetrics(filters);
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch erasure metrics');
      }

      // 3. Update IDB with specific filter key
      indexedDBService.put('erasure_metrics', metricsCacheKey, response.data)
        .catch(e => console.error('IDB Write Failed: erasure_metrics', e));

      return response.data;
    },
    enabled,
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    placeholderData: (previousData) => previousData, 
    refetchOnMount: false,      
    refetchOnWindowFocus: false, 
    refetchOnReconnect: false,
  });
}
