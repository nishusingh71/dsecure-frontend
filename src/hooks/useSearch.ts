import { useState, useCallback, useMemo } from 'react';

interface SearchOptions<T> {
  fuzzySearch?: boolean;
  fieldWeights?: Partial<Record<keyof T, number>>;
  minScore?: number;
  caseSensitive?: boolean;
}

// Fuzzy search scoring
function fuzzyScore(query: string, text: string): number {
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  // Exact match
  if (textLower === queryLower) return 100;
  
  // Starts with query
  if (textLower.startsWith(queryLower)) return 90;
  
  // Contains query
  if (textLower.includes(queryLower)) return 70;
  
  // Fuzzy match - check if all query chars appear in order
  let queryIndex = 0;
  let score = 50;
  
  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      queryIndex++;
      score += 2;
    }
  }
  
  return queryIndex === queryLower.length ? score : 0;
}

// Generic search and filter hook
export function useSearch<T>(
  items: T[],
  searchFields: (keyof T)[],
  filterFunctions?: Record<string, (item: T, filterValue: any) => boolean>,
  options: SearchOptions<T> = {}
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortBy, setSortBy] = useState<keyof T | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const {
    fuzzySearch = true,
    fieldWeights = {} as Partial<Record<keyof T, number>>,
    minScore = 30,
    caseSensitive = false
  } = options;

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
    setSortBy('');
  }, []);

  const toggleSort = useCallback((field: keyof T) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  }, [sortBy]);

  const filteredItems = useMemo(() => {
    let result = items;

    // Apply search query with scoring
    if (searchQuery.trim()) {
      const query = caseSensitive ? searchQuery : searchQuery.toLowerCase();
      
      const scoredItems = result.map(item => {
        let maxScore = 0;
        
        searchFields.forEach(field => {
          const value = item[field];
          const weight = fieldWeights[field] || 1;
          let fieldScore = 0;
          
          if (typeof value === 'string') {
            const text = caseSensitive ? value : value.toLowerCase();
            
            if (fuzzySearch) {
              fieldScore = fuzzyScore(query, text) * weight;
            } else {
              fieldScore = text.includes(query) ? 100 * weight : 0;
            }
          } else if (typeof value === 'number') {
            fieldScore = value.toString().includes(query) ? 100 * weight : 0;
          }
          
          maxScore = Math.max(maxScore, fieldScore);
        });
        
        return { item, score: maxScore };
      });
      
      result = scoredItems
        .filter(({ score }) => score >= minScore)
        .sort((a, b) => b.score - a.score)
        .map(({ item }) => item);
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

    // Apply sorting
    if (sortBy) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortOrder === 'asc' 
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        return 0;
      });
    }

    return result;
  }, [items, searchQuery, filters, searchFields, filterFunctions, fuzzySearch, fieldWeights, minScore, caseSensitive, sortBy, sortOrder]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    filteredItems,
    hasActiveFilters: Object.keys(filters).length > 0 || searchQuery.trim() !== '',
    sortBy,
    sortOrder,
    toggleSort
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