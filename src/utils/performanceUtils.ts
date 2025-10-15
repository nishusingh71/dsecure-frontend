import { memo, useState, useEffect, useCallback, useMemo } from 'react';
import type { ComponentType } from 'react';

/**
 * Higher-order component for memoizing components to prevent unnecessary re-renders
 */
export const withMemo = <T extends object>(
  Component: ComponentType<T>,
  areEqual?: (prevProps: T, nextProps: T) => boolean
) => {
  const MemoizedComponent = memo(Component, areEqual);
  MemoizedComponent.displayName = `Memo(${Component.displayName || Component.name})`;
  return MemoizedComponent;
};

/**
 * Optimized image loading with intersection observer
 */
export const useIntersectionObserver = (callback: () => void, threshold = 0.1) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(ref);
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, callback, threshold]);

  return setRef;
};

/**
 * Debounce function for performance optimization
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Virtual scrolling for large lists
 */
export const useVirtualScroll = (
  items: any[],
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    onScroll: (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    }
  };
};

/**
 * Memoized search functionality for large datasets
 */
export const useOptimizedSearch = <T>(
  items: T[],
  searchTerm: string,
  searchKeys: (keyof T)[],
  delay: number = 300
) => {
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  return useMemo(() => {
    if (!debouncedSearchTerm.trim()) return items;

    const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
    return items.filter(item =>
      searchKeys.some(key => {
        const value = item[key];
        return value?.toString().toLowerCase().includes(lowerSearchTerm);
      })
    );
  }, [items, debouncedSearchTerm, searchKeys]);
};

/**
 * Optimized callback hook with stable reference
 */
export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  return useCallback(callback, deps);
};

/**
 * Performance monitoring hook
 */
export const usePerformanceMonitor = (componentName: string) => {
  const startTime = useMemo(() => performance.now(), []);

  useEffect(() => {
    // Performance monitoring disabled to reduce console noise
  });

  return { startTime };
};