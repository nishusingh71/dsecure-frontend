import { useState, useCallback, useMemo } from 'react';

// Generic search and filter hook
export function useSearch<T>(
  items: T[],
  searchFields: (keyof T)[],
  filterFunctions?: Record<string, (item: T, filterValue: any) => boolean>
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});

  const updateFilter = useCallback((filterName: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  }, []);

  const clearFilter = useCallback((filterName: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[filterName];
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
    setSearchQuery('');
  }, []);

  const filteredItems = useMemo(() => {
    let result = items;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        searchFields.some(field => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
          }
          if (typeof value === 'number') {
            return value.toString().includes(query);
          }
          return false;
        })
      );
    }

    // Apply filters
    if (filterFunctions) {
      Object.entries(filters).forEach(([filterName, filterValue]) => {
        const filterFn = filterFunctions[filterName];
        if (filterFn && filterValue !== undefined && filterValue !== '') {
          result = result.filter(item => filterFn(item, filterValue));
        }
      });
    }

    return result;
  }, [items, searchQuery, filters, searchFields, filterFunctions]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    filteredItems,
    hasActiveFilters: Object.keys(filters).length > 0 || searchQuery.trim() !== ''
  };
}

// Pagination hook
export function usePagination<T>(items: T[], itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = useCallback((page: number) => {
    const clampedPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(clampedPage);
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    resetPagination,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    startIndex: startIndex + 1,
    endIndex: Math.min(endIndex, items.length),
    totalItems: items.length
  };
}