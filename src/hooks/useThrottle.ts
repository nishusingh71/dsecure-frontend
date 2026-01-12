/**
 * useThrottle Hook
 * 
 * Throttles a value by limiting updates to once per specified interval.
 * Useful for scroll events, resize events, mousemove.
 * 
 * @param value - The value to throttle
 * @param interval - Minimum time between updates in milliseconds (default: 200ms)
 * @returns Throttled value
 * 
 * @example
 * ```tsx
 * const [scrollY, setScrollY] = useState(0);
 * const throttledScrollY = useThrottle(scrollY, 200);
 * 
 * useEffect(() => {
 *   const handleScroll = () => setScrollY(window.scrollY);
 *   window.addEventListener('scroll', handleScroll);
 *   return () => window.removeEventListener('scroll', handleScroll);
 * }, []);
 * ```
 */

import { useState, useEffect, useRef } from 'react';

export function useThrottle<T>(value: T, interval: number = 200): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecuted.current;

    if (timeSinceLastExecution >= interval) {
      // Enough time has passed, update immediately
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      // Schedule update for later
      const timeoutId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval - timeSinceLastExecution);

      return () => clearTimeout(timeoutId);
    }
  }, [value, interval]);

  return throttledValue;
}

/**
 * useThrottledCallback Hook
 * 
 * Returns a throttled version of the callback function.
 * The callback will execute at most once per interval.
 * 
 * @param callback - Function to throttle
 * @param interval - Minimum time between executions in milliseconds (default: 200ms)
 * @param options - Configuration options
 * @returns Throttled callback function
 * 
 * @example
 * ```tsx
 * const handleScroll = useThrottledCallback(() => {
 *   console.log('Scroll position:', window.scrollY);
 * }, 200, { leading: true, trailing: true });
 * 
 * useEffect(() => {
 *   window.addEventListener('scroll', handleScroll);
 *   return () => window.removeEventListener('scroll', handleScroll);
 * }, [handleScroll]);
 * ```
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  interval: number = 200,
  options: { leading?: boolean; trailing?: boolean } = { leading: true, trailing: true }
): (...args: Parameters<T>) => void {
  const lastExecuted = useRef<number>(0);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const lastArgs = useRef<Parameters<T> | null>(null);

  return (...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecuted.current;

    lastArgs.current = args;

    // Leading edge execution
    if (options.leading && timeSinceLastExecution >= interval) {
      lastExecuted.current = now;
      callback(...args);
      return;
    }

    // Trailing edge execution
    if (options.trailing) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        lastExecuted.current = Date.now();
        if (lastArgs.current) {
          callback(...lastArgs.current);
        }
      }, interval - timeSinceLastExecution);
    }
  };
}

/**
 * useRAFThrottle Hook (requestAnimationFrame throttle)
 * 
 * Throttles a callback using requestAnimationFrame for smooth animations.
 * Best for scroll, resize, and mouse events that affect visual updates.
 * 
 * @param callback - Function to throttle
 * @returns RAF-throttled callback function
 * 
 * @example
 * ```tsx
 * const handleScroll = useRAFThrottle(() => {
 *   const scrollY = window.scrollY;
 *   setIsScrolled(scrollY > 100);
 * });
 * 
 * useEffect(() => {
 *   window.addEventListener('scroll', handleScroll, { passive: true });
 *   return () => window.removeEventListener('scroll', handleScroll);
 * }, [handleScroll]);
 * ```
 */
export function useRAFThrottle<T extends (...args: any[]) => any>(
  callback: T
): (...args: Parameters<T>) => void {
  const rafId = useRef<number | null>(null);
  const lastArgs = useRef<Parameters<T> | null>(null);

  return (...args: Parameters<T>) => {
    lastArgs.current = args;

    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(() => {
        if (lastArgs.current) {
          callback(...lastArgs.current);
        }
        rafId.current = null;
      });
    }
  };
}

/**
 * useScrollThrottle Hook
 * 
 * Specialized hook for throttling scroll position updates.
 * Returns current scroll position throttled with RAF.
 * 
 * @returns Object with scrollX and scrollY values
 * 
 * @example
 * ```tsx
 * const { scrollY } = useScrollThrottle();
 * const isScrolled = scrollY > 100;
 * 
 * return (
 *   <header className={isScrolled ? 'scrolled' : ''}>
 *     {/* header content *\/}
 *   </header>
 * );
 * ```
 */
export function useScrollThrottle() {
  const [scrollPosition, setScrollPosition] = useState({
    scrollX: 0,
    scrollY: 0,
  });

  const handleScroll = useRAFThrottle(() => {
    setScrollPosition({
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    });
  });

  useEffect(() => {
    // Set initial position
    setScrollPosition({
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    });

    // Add listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return scrollPosition;
}
