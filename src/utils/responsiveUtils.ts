/**
 * Responsive Utilities
 * Helpers for responsive design and mobile optimization
 */

import { useState, useEffect } from 'react';

// Breakpoint values matching tailwind.config.cjs
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Hook to detect current breakpoint
 * @returns Current breakpoint name
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    if (typeof window === 'undefined') return 'lg';
    
    const width = window.innerWidth;
    if (width >= BREAKPOINTS.xxl) return 'xxl';
    if (width >= BREAKPOINTS.xl) return 'xl';
    if (width >= BREAKPOINTS.lg) return 'lg';
    if (width >= BREAKPOINTS.md) return 'md';
    if (width >= BREAKPOINTS.sm) return 'sm';
    if (width >= BREAKPOINTS.xs) return 'xs';
    return 'xs';
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        if (width >= BREAKPOINTS.xxl) setBreakpoint('xxl');
        else if (width >= BREAKPOINTS.xl) setBreakpoint('xl');
        else if (width >= BREAKPOINTS.lg) setBreakpoint('lg');
        else if (width >= BREAKPOINTS.md) setBreakpoint('md');
        else if (width >= BREAKPOINTS.sm) setBreakpoint('sm');
        else if (width >= BREAKPOINTS.xs) setBreakpoint('xs');
        else setBreakpoint('xs');
      }, 150); // Debounce resize events
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpoint;
}

/**
 * Hook to check if screen is mobile
 * @param breakpoint Breakpoint below which is considered mobile (default: 'md')
 */
export function useIsMobile(breakpoint: Breakpoint = 'md'): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < BREAKPOINTS[breakpoint];
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < BREAKPOINTS[breakpoint]);
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}

/**
 * Hook to check if screen is tablet
 */
export function useIsTablet(): boolean {
  const [isTablet, setIsTablet] = useState(() => {
    if (typeof window === 'undefined') return false;
    const width = window.innerWidth;
    return width >= BREAKPOINTS.sm && width < BREAKPOINTS.lg;
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setIsTablet(width >= BREAKPOINTS.sm && width < BREAKPOINTS.lg);
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isTablet;
}

/**
 * Hook to detect device orientation
 */
export function useOrientation(): 'portrait' | 'landscape' {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(() => {
    if (typeof window === 'undefined') return 'portrait';
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleOrientationChange = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
      }, 150);
    };

    window.addEventListener('resize', handleOrientationChange, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return orientation;
}

/**
 * Hook to detect touch device
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  });

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouch;
}

/**
 * Hook to get window size
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

/**
 * Responsive class name generator
 */
export function responsiveClass(
  base: string,
  variants: Partial<Record<Breakpoint, string>>
): string {
  const classes = [base];
  
  Object.entries(variants).forEach(([breakpoint, className]) => {
    if (className) {
      classes.push(`${breakpoint}:${className}`);
    }
  });
  
  return classes.join(' ');
}

/**
 * Get responsive value based on current breakpoint
 */
export function useResponsiveValue<T>(values: Partial<Record<Breakpoint, T>> & { default: T }): T {
  const breakpoint = useBreakpoint();
  
  // Try to get value for current breakpoint, fallback to smaller breakpoints, then default
  if (values[breakpoint]) return values[breakpoint]!;
  
  const breakpointOrder: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
  const currentIndex = breakpointOrder.indexOf(breakpoint);
  
  for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
    const bp = breakpointOrder[i];
    if (values[bp]) return values[bp]!;
  }
  
  return values.default;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Convert px to rem
 */
export function pxToRem(px: number, baseFontSize: number = 16): number {
  return px / baseFontSize;
}

/**
 * Convert rem to px
 */
export function remToPx(rem: number, baseFontSize: number = 16): number {
  return rem * baseFontSize;
}

/**
 * Get responsive font size using clamp
 */
export function getResponsiveFontSize(
  minPx: number,
  maxPx: number,
  minWidth: number = BREAKPOINTS.xs,
  maxWidth: number = BREAKPOINTS.xxl
): string {
  const minRem = pxToRem(minPx);
  const maxRem = pxToRem(maxPx);
  const slope = (maxRem - minRem) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minRem;
  
  return `clamp(${minRem}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxRem}rem)`;
}

/**
 * Check if current viewport matches breakpoint
 */
export function matchesBreakpoint(breakpoint: Breakpoint, direction: 'up' | 'down' = 'up'): boolean {
  if (typeof window === 'undefined') return false;
  
  const width = window.innerWidth;
  const breakpointValue = BREAKPOINTS[breakpoint];
  
  return direction === 'up' 
    ? width >= breakpointValue 
    : width < breakpointValue;
}

/**
 * Disable body scroll (for modals)
 */
export function disableBodyScroll(): void {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
}

/**
 * Enable body scroll
 */
export function enableBodyScroll(): void {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement, offset: number = 0): boolean {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
}

/**
 * Scroll to element smoothly
 */
export function scrollToElement(
  element: HTMLElement | string,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
): void {
  const el = typeof element === 'string' 
    ? document.querySelector<HTMLElement>(element)
    : element;
    
  if (el) {
    el.scrollIntoView(options);
  }
}

/**
 * Get safe viewport height (accounting for mobile browser UI)
 */
export function getSafeViewportHeight(): number {
  if (typeof window === 'undefined') return 768;
  return window.visualViewport?.height || window.innerHeight;
}

/**
 * Detect reduced motion preference
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Detect dark mode preference
 */
export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Detect high contrast mode
 */
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
}
