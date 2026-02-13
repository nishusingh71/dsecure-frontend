import { useQuery } from '@tanstack/react-query';
import { AdminDashboardAPI, ErasureMetricsRequest, ErasureMetricsResponse } from '@/services/adminDashboardAPI';

export const erasureMetricsKeys = {
  all: ['erasure-metrics'] as const,
  list: (filters: ErasureMetricsRequest) => [...erasureMetricsKeys.all, filters] as const,
};

export function useErasureMetrics(filters: ErasureMetricsRequest, enabled: boolean = true) {
  return useQuery({
    queryKey: erasureMetricsKeys.list(filters),
    queryFn: async () => {
      const response = await AdminDashboardAPI.getErasureMetrics(filters);
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch erasure metrics');
      }
      return response.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: (previousData) => previousData,
  });
}
