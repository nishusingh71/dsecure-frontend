import { useEffect, useState, useCallback, useRef } from 'react'

// Intersection Observer Hook for lazy loading
export const useIntersectionObserver = (
  options: IntersectionObserverInit = { rootMargin: '50px' }
) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(element)
    return () => observer.disconnect()
  }, [options])

  return [ref, isIntersecting] as const
}

// Throttled scroll hook
export const useThrottledScroll = (delay: number = 16) => {
  const [scrollY, setScrollY] = useState(0)
  const lastCallTime = useRef(0)

  const handleScroll = useCallback(() => {
    const now = Date.now()
    if (now - lastCallTime.current >= delay) {
      setScrollY(window.scrollY)
      lastCallTime.current = now
    }
  }, [delay])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return scrollY
}

// Media query hook
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
    
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

// Responsive breakpoints
export const useResponsiveBreakpoints = () => {
  const isSm = useMediaQuery('(min-width: 640px)')
  const isMd = useMediaQuery('(min-width: 768px)')
  const isLg = useMediaQuery('(min-width: 1024px)')
  const isXl = useMediaQuery('(min-width: 1280px)')
  const is2Xl = useMediaQuery('(min-width: 1536px)')

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    isMobile: !isSm,
    isTablet: isSm && !isLg,
    isDesktop: isLg
  }
}

// Performance monitoring
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<{
    lcp?: number
    fid?: number
    cls?: number
  }>({})

  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    // Monitor LCP
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        if (entries.length > 0) {
          const lastEntry = entries[entries.length - 1]
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      console.warn('LCP monitoring not supported')
    }

    // Monitor FID
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            setMetrics(prev => ({ 
              ...prev, 
              fid: entry.processingStart - entry.startTime 
            }))
          }
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
    } catch (e) {
      console.warn('FID monitoring not supported')
    }

    // Monitor CLS
    try {
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0
        const entries = entryList.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        setMetrics(prev => ({ ...prev, cls: clsValue }))
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    } catch (e) {
      console.warn('CLS monitoring not supported')
    }
  }, [])

  return metrics
}

// Debounced value hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Local storage hook with SSR safety
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}