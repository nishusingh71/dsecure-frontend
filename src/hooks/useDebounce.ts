/**
 * useDebounce Hook
 * 
 * Debounces a value by delaying updates until after a specified delay.
 * Useful for search inputs, form validation, API calls.
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Debounced value
 * 
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 * 
 * useEffect(() => {
 *   // API call only fires after user stops typing for 300ms
 *   if (debouncedSearchTerm) {
 *     searchAPI(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 * ```
 */

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up the timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function - cancel timeout if value changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useDebouncedCallback Hook
 * 
 * Returns a debounced version of the callback function.
 * The callback will only execute after the specified delay has passed
 * since the last invocation.
 * 
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Debounced callback function
 * 
 * @example
 * ```tsx
 * const handleSearch = useDebouncedCallback((searchTerm: string) => {
 *   searchAPI(searchTerm);
 * }, 300);
 * 
 * <input onChange={(e) => handleSearch(e.target.value)} />
 * ```
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  return (...args: Parameters<T>) => {
    // Clear existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set new timeout
    const newTimeoutId = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimeoutId(newTimeoutId);
  };
}

/**
 * useDebounceEffect Hook
 * 
 * Runs an effect function after a debounced delay.
 * Useful for triggering side effects based on rapidly changing values.
 * 
 * @param effect - Effect function to run
 * @param deps - Dependency array (like useEffect)
 * @param delay - Delay in milliseconds (default: 300ms)
 * 
 * @example
 * ```tsx
 * useDebounceEffect(() => {
 *   validateEmail(email);
 * }, [email], 500);
 * ```
 */
export function useDebounceEffect(
  effect: () => void | (() => void),
  deps: React.DependencyList,
  delay: number = 300
): void {
  useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
}
