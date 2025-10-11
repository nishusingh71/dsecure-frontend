/**
 * Optimized Table Component with Virtual Scrolling
 * Handles large datasets efficiently with pagination and virtualization
 */

import React, { memo, useMemo, useState, useCallback } from 'react';
import { useVirtualScroll, useOptimizedSearch } from '@/utils/performanceUtils';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
  searchable?: boolean;
}

interface OptimizedTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  itemHeight?: number;
  containerHeight?: number;
  searchable?: boolean;
  sortable?: boolean;
  pageSize?: number;
  className?: string;
}

export const OptimizedTable = memo(<T extends Record<string, any>>({
  data,
  columns,
  itemHeight = 50,
  containerHeight = 400,
  searchable = true,
  sortable = true,
  pageSize = 50,
  className = ''
}: OptimizedTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Optimized search
  const searchableKeys = useMemo(() => 
    columns.filter(col => col.searchable !== false).map(col => col.key),
    [columns]
  );

  const filteredData = useOptimizedSearch(data, searchTerm, searchableKeys);

  // Optimized sorting
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = currentPage * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Virtual scrolling
  const { visibleItems, totalHeight, offsetY, onScroll } = useVirtualScroll(
    paginatedData,
    itemHeight,
    containerHeight
  );

  const handleSort = useCallback((key: keyof T) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  }, []);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  return (
    <div className={`optimized-table ${className}`}>
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      <div className="overflow-hidden border border-gray-200 rounded-lg">
        {/* Table Header */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="flex">
            {columns.map(column => (
              <div
                key={String(column.key)}
                className={`flex-1 px-4 py-3 text-left text-sm font-medium text-gray-900 ${
                  sortable && column.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
                onClick={sortable && column.sortable !== false ? () => handleSort(column.key) : undefined}
              >
                <div className="flex items-center">
                  {column.label}
                  {sortable && sortConfig?.key === column.key && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Virtual Scrolled Content */}
        <div
          className="overflow-auto bg-white"
          style={{ height: containerHeight }}
          onScroll={onScroll}
        >
          <div style={{ height: totalHeight, position: 'relative' }}>
            {visibleItems.map((item, index) => (
              <div
                key={index}
                className="flex border-b border-gray-100 hover:bg-gray-50"
                style={{
                  position: 'absolute',
                  top: offsetY + index * itemHeight,
                  height: itemHeight,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {columns.map(column => (
                  <div key={String(column.key)} className="flex-1 px-4 py-2 text-sm text-gray-900">
                    {column.render ? column.render(item[column.key], item) : String(item[column.key])}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            Showing {currentPage * pageSize + 1} to{' '}
            {Math.min((currentPage + 1) * pageSize, sortedData.length)} of{' '}
            {sortedData.length} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

OptimizedTable.displayName = 'OptimizedTable';

export default OptimizedTable;