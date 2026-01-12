/**
 * Tablet-Specific Utilities
 * Optimizations and helpers for tablet devices
 */

import { useState, useEffect } from 'react';

// Tablet breakpoints
export const TABLET_BREAKPOINTS = {
  portraitMin: 640,
  portraitMax: 767,
  landscapeMin: 768,
  landscapeMax: 1023,
} as const;

/**
 * Hook to detect if device is a tablet
 */
export function useIsTablet(): boolean {
  const [isTablet, setIsTablet] = useState(() => {
    if (typeof window === 'undefined') return false;
    const width = window.innerWidth;
    return width >= TABLET_BREAKPOINTS.portraitMin && width <= TABLET_BREAKPOINTS.landscapeMax;
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setIsTablet(
          width >= TABLET_BREAKPOINTS.portraitMin && 
          width <= TABLET_BREAKPOINTS.landscapeMax
        );
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
 * Hook to detect tablet orientation
 */
export function useTabletOrientation(): 'portrait' | 'landscape' | 'desktop' {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape' | 'desktop'>(() => {
    if (typeof window === 'undefined') return 'desktop';
    
    const width = window.innerWidth;
    if (width >= TABLET_BREAKPOINTS.portraitMin && width <= TABLET_BREAKPOINTS.portraitMax) {
      return 'portrait';
    }
    if (width >= TABLET_BREAKPOINTS.landscapeMin && width <= TABLET_BREAKPOINTS.landscapeMax) {
      return 'landscape';
    }
    return 'desktop';
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleOrientationChange = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        
        if (width >= TABLET_BREAKPOINTS.portraitMin && width <= TABLET_BREAKPOINTS.portraitMax) {
          setOrientation('portrait');
        } else if (width >= TABLET_BREAKPOINTS.landscapeMin && width <= TABLET_BREAKPOINTS.landscapeMax) {
          setOrientation('landscape');
        } else {
          setOrientation('desktop');
        }
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
 * Hook to detect if tablet is in portrait mode
 */
export function useIsTabletPortrait(): boolean {
  const [isPortrait, setIsPortrait] = useState(() => {
    if (typeof window === 'undefined') return false;
    const width = window.innerWidth;
    return width >= TABLET_BREAKPOINTS.portraitMin && width <= TABLET_BREAKPOINTS.portraitMax;
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setIsPortrait(
          width >= TABLET_BREAKPOINTS.portraitMin && 
          width <= TABLET_BREAKPOINTS.portraitMax
        );
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isPortrait;
}

/**
 * Hook to detect if tablet is in landscape mode
 */
export function useIsTabletLandscape(): boolean {
  const [isLandscape, setIsLandscape] = useState(() => {
    if (typeof window === 'undefined') return false;
    const width = window.innerWidth;
    return width >= TABLET_BREAKPOINTS.landscapeMin && width <= TABLET_BREAKPOINTS.landscapeMax;
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setIsLandscape(
          width >= TABLET_BREAKPOINTS.landscapeMin && 
          width <= TABLET_BREAKPOINTS.landscapeMax
        );
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isLandscape;
}

/**
 * Get optimal column count for tablet grid
 */
export function useTabletGridColumns(): number {
  const orientation = useTabletOrientation();
  
  if (orientation === 'portrait') return 2;
  if (orientation === 'landscape') return 3;
  return 4; // desktop
}

/**
 * Hook to detect iPad specifically
 */
export function useIsIPad(): boolean {
  const [isIPad, setIsIPad] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIPadDevice = 
      /ipad/.test(userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    setIsIPad(isIPadDevice);
  }, []);

  return isIPad;
}

/**
 * Hook to detect Android tablet
 */
export function useIsAndroidTablet(): boolean {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroidDevice = /android/.test(userAgent) && !/mobile/.test(userAgent);
    
    setIsAndroid(isAndroidDevice);
  }, []);

  return isAndroid;
}

/**
 * Get tablet-optimized image size
 */
export function getTabletImageSize(
  baseWidth: number,
  orientation: 'portrait' | 'landscape' | 'desktop' = 'portrait'
): number {
  switch (orientation) {
    case 'portrait':
      return Math.min(baseWidth, 640);
    case 'landscape':
      return Math.min(baseWidth, 1024);
    default:
      return baseWidth;
  }
}

/**
 * Get tablet grid columns based on screen width
 */
export function getTabletColumns(
  width: number,
  portraitCols: number = 2,
  landscapeCols: number = 3
): number {
  if (width >= TABLET_BREAKPOINTS.portraitMin && width <= TABLET_BREAKPOINTS.portraitMax) {
    return portraitCols;
  }
  if (width >= TABLET_BREAKPOINTS.landscapeMin && width <= TABLET_BREAKPOINTS.landscapeMax) {
    return landscapeCols;
  }
  return 4; // desktop default
}

/**
 * Hook for tablet-specific layout
 */
export function useTabletLayout() {
  const isTablet = useIsTablet();
  const orientation = useTabletOrientation();
  const columns = useTabletGridColumns();
  
  return {
    isTablet,
    orientation,
    columns,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
  };
}

/**
 * Detect if tablet supports hover (e.g., iPad with mouse)
 */
export function tabletSupportsHover(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/**
 * Get tablet-optimized spacing
 */
export function getTabletSpacing(
  mobileSpacing: number,
  tabletSpacing: number,
  desktopSpacing: number
): number {
  if (typeof window === 'undefined') return mobileSpacing;
  
  const width = window.innerWidth;
  
  if (width < TABLET_BREAKPOINTS.portraitMin) {
    return mobileSpacing;
  }
  if (width <= TABLET_BREAKPOINTS.landscapeMax) {
    return tabletSpacing;
  }
  return desktopSpacing;
}

/**
 * Hook for tablet drawer state management
 */
export function useTabletDrawer(initialState: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const isTablet = useIsTablet();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  // Auto-close drawer when switching to desktop
  useEffect(() => {
    if (!isTablet && isOpen) {
      setIsOpen(false);
    }
  }, [isTablet, isOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
    isTablet,
  };
}

/**
 * Hook for tablet split view
 */
export function useTabletSplitView() {
  const orientation = useTabletOrientation();
  const [showSidebar, setShowSidebar] = useState(true);

  // Auto-show sidebar in landscape, hide in portrait
  useEffect(() => {
    setShowSidebar(orientation === 'landscape');
  }, [orientation]);

  const toggleSidebar = () => setShowSidebar(prev => !prev);

  return {
    showSidebar,
    toggleSidebar,
    orientation,
    canShowSidebar: orientation === 'landscape',
  };
}

/**
 * Get tablet-optimized font size
 */
export function getTabletFontSize(
  mobileFontSize: string,
  tabletFontSize: string,
  desktopFontSize: string
): string {
  if (typeof window === 'undefined') return mobileFontSize;
  
  const width = window.innerWidth;
  
  if (width < TABLET_BREAKPOINTS.portraitMin) {
    return mobileFontSize;
  }
  if (width <= TABLET_BREAKPOINTS.landscapeMax) {
    return tabletFontSize;
  }
  return desktopFontSize;
}

/**
 * Hook for tablet scroll behavior
 */
export function useTabletScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const isTablet = useIsTablet();

  useEffect(() => {
    if (!isTablet) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setScrollY(currentScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTablet]);

  return {
    scrollY,
    scrollDirection,
    isScrollingDown: scrollDirection === 'down',
    isScrollingUp: scrollDirection === 'up',
  };
}

/**
 * Tablet-optimized breakpoint matching
 */
export function matchesTabletBreakpoint(
  type: 'portrait' | 'landscape' | 'any'
): boolean {
  if (typeof window === 'undefined') return false;
  
  const width = window.innerWidth;
  
  switch (type) {
    case 'portrait':
      return width >= TABLET_BREAKPOINTS.portraitMin && 
             width <= TABLET_BREAKPOINTS.portraitMax;
    case 'landscape':
      return width >= TABLET_BREAKPOINTS.landscapeMin && 
             width <= TABLET_BREAKPOINTS.landscapeMax;
    case 'any':
      return width >= TABLET_BREAKPOINTS.portraitMin && 
             width <= TABLET_BREAKPOINTS.landscapeMax;
    default:
      return false;
  }
}

/**
 * Get tablet-specific class names
 */
export function getTabletClasses(
  baseClasses: string,
  portraitClasses: string = '',
  landscapeClasses: string = ''
): string {
  if (typeof window === 'undefined') return baseClasses;
  
  const width = window.innerWidth;
  const classes = [baseClasses];
  
  if (width >= TABLET_BREAKPOINTS.portraitMin && width <= TABLET_BREAKPOINTS.portraitMax) {
    classes.push(portraitClasses);
  } else if (width >= TABLET_BREAKPOINTS.landscapeMin && width <= TABLET_BREAKPOINTS.landscapeMax) {
    classes.push(landscapeClasses);
  }
  
  return classes.filter(Boolean).join(' ');
}

/**
 * Hook for tablet responsive value
 */
export function useTabletValue<T>(
  mobileValue: T,
  tabletPortraitValue: T,
  tabletLandscapeValue: T,
  desktopValue: T
): T {
  const orientation = useTabletOrientation();
  
  if (typeof window === 'undefined') return mobileValue;
  
  const width = window.innerWidth;
  
  if (width < TABLET_BREAKPOINTS.portraitMin) {
    return mobileValue;
  }
  if (orientation === 'portrait') {
    return tabletPortraitValue;
  }
  if (orientation === 'landscape') {
    return tabletLandscapeValue;
  }
  return desktopValue;
}

/**
 * Detect if device is foldable tablet
 */
export function useIsFoldableTablet(): boolean {
  const [isFoldable, setIsFoldable] = useState(false);

  useEffect(() => {
    // Check for foldable screen API
    const checkFoldable = () => {
      const screenSegments = (window as any).visualViewport?.segments;
      setIsFoldable(!!screenSegments && screenSegments.length > 1);
    };

    checkFoldable();
    window.addEventListener('resize', checkFoldable);
    
    return () => window.removeEventListener('resize', checkFoldable);
  }, []);

  return isFoldable;
}
