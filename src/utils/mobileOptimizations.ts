/**
 * Mobile-Specific Optimizations
 * Performance and UX improvements for mobile devices
 */

import { useEffect, useRef, useState } from 'react';

/**
 * Prevent iOS rubber band effect on scroll
 */
export function preventOverscroll(element: HTMLElement | null): void {
  if (!element) return;

  let startY = 0;

  const touchStart = (e: TouchEvent) => {
    startY = e.touches[0].pageY;
  };

  const touchMove = (e: TouchEvent) => {
    const y = e.touches[0].pageY;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const height = element.clientHeight;
    const isAtTop = y > startY && scrollTop === 0;
    const isAtBottom = y < startY && scrollTop + height >= scrollHeight;

    if (isAtTop || isAtBottom) {
      e.preventDefault();
    }
  };

  element.addEventListener('touchstart', touchStart, { passive: true });
  element.addEventListener('touchmove', touchMove, { passive: false });
}

/**
 * Hook to handle safe area insets (iPhone notch, etc.)
 */
export function useSafeAreaInsets() {
  const [insets, setInsets] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    const updateInsets = () => {
      const style = getComputedStyle(document.documentElement);
      setInsets({
        top: parseInt(style.getPropertyValue('--safe-area-inset-top') || '0'),
        right: parseInt(style.getPropertyValue('--safe-area-inset-right') || '0'),
        bottom: parseInt(style.getPropertyValue('--safe-area-inset-bottom') || '0'),
        left: parseInt(style.getPropertyValue('--safe-area-inset-left') || '0'),
      });
    };

    updateInsets();
    window.addEventListener('resize', updateInsets);
    return () => window.removeEventListener('resize', updateInsets);
  }, []);

  return insets;
}

/**
 * Hook to detect if app is in standalone mode (PWA)
 */
export function useIsStandalone(): boolean {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const isStandaloneMode = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://');
    
    setIsStandalone(isStandaloneMode);
  }, []);

  return isStandalone;
}

/**
 * Hook to handle pull-to-refresh on mobile
 */
export function usePullToRefresh(onRefresh: () => Promise<void>, threshold = 80) {
  const [isPulling, setIsPulling] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    let isRefreshing = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].pageY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY === 0 && !isRefreshing) {
        currentY.current = e.touches[0].pageY;
        const pullDistance = currentY.current - startY.current;
        
        if (pullDistance > 0) {
          setIsPulling(pullDistance >= threshold);
        }
      }
    };

    const handleTouchEnd = async () => {
      const pullDistance = currentY.current - startY.current;
      
      if (pullDistance >= threshold && !isRefreshing) {
        isRefreshing = true;
        setIsPulling(false);
        await onRefresh();
        isRefreshing = false;
      }
      
      setIsPulling(false);
      startY.current = 0;
      currentY.current = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, threshold]);

  return isPulling;
}

/**
 * Hook to handle haptic feedback on mobile
 */
export function useHapticFeedback() {
  const vibrate = (pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  return {
    light: () => vibrate(10),
    medium: () => vibrate(20),
    heavy: () => vibrate([10, 10, 10]),
    success: () => vibrate([10, 50, 10]),
    warning: () => vibrate([20, 50, 20]),
    error: () => vibrate([50, 50, 50]),
  };
}

/**
 * Optimize images for mobile
 */
export function getMobileImageUrl(
  url: string,
  width: number,
  quality: number = 75,
  format: 'webp' | 'avif' | 'auto' = 'auto'
): string {
  // If using Cloudinary, add transformations
  if (url.includes('cloudinary')) {
    const transformations = [
      `w_${width}`,
      `q_${quality}`,
      'f_auto',
      'c_limit',
      'dpr_auto',
    ].join(',');
    
    return url.replace('/upload/', `/upload/${transformations}/`);
  }
  
  // For other CDNs, you can add query parameters
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}w=${width}&q=${quality}&format=${format}`;
}

/**
 * Hook to detect network status
 */
export function useNetworkStatus() {
  const [status, setStatus] = useState<{
    online: boolean;
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  }>({
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
  });

  useEffect(() => {
    const updateStatus = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;

      setStatus({
        online: navigator.onLine,
        effectiveType: connection?.effectiveType,
        downlink: connection?.downlink,
        rtt: connection?.rtt,
        saveData: connection?.saveData,
      });
    };

    updateStatus();

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateStatus);
    }

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
      if (connection) {
        connection.removeEventListener('change', updateStatus);
      }
    };
  }, []);

  return status;
}

/**
 * Hook to detect low battery
 */
export function useBatteryStatus() {
  const [battery, setBattery] = useState<{
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
  } | null>(null);

  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          setBattery({
            level: battery.level,
            charging: battery.charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime,
          });
        };

        updateBattery();

        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);

        return () => {
          battery.removeEventListener('levelchange', updateBattery);
          battery.removeEventListener('chargingchange', updateBattery);
        };
      });
    }
  }, []);

  return battery;
}

/**
 * Optimize performance for low-end devices
 */
export function shouldReduceAnimations(): boolean {
  if (typeof window === 'undefined') return false;

  // Check user preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory;
  if (deviceMemory && deviceMemory < 4) {
    return true;
  }

  // Check CPU cores
  const cpuCores = navigator.hardwareConcurrency;
  if (cpuCores && cpuCores < 4) {
    return true;
  }

  return false;
}

/**
 * Lock screen orientation (for mobile games/immersive experiences)
 */
export async function lockOrientation(orientation: string): Promise<void> {
  if ('orientation' in screen && 'lock' in (screen.orientation as any)) {
    try {
      await (screen.orientation as any).lock(orientation);
    } catch (error) {
      console.warn('Screen orientation lock failed:', error);
    }
  }
}

/**
 * Unlock screen orientation
 */
export function unlockOrientation(): void {
  if ('orientation' in screen && 'unlock' in screen.orientation) {
    screen.orientation.unlock();
  }
}

/**
 * Request fullscreen mode
 */
export async function requestFullscreen(element: HTMLElement = document.documentElement): Promise<void> {
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      await (element as any).webkitRequestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      await (element as any).mozRequestFullScreen();
    } else if ((element as any).msRequestFullscreen) {
      await (element as any).msRequestFullscreen();
    }
  } catch (error) {
    console.warn('Fullscreen request failed:', error);
  }
}

/**
 * Exit fullscreen mode
 */
export async function exitFullscreen(): Promise<void> {
  try {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      await (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      await (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
      await (document as any).msExitFullscreen();
    }
  } catch (error) {
    console.warn('Exit fullscreen failed:', error);
  }
}

/**
 * Share content using Web Share API
 */
export async function shareContent(data: ShareData): Promise<void> {
  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.warn('Share failed:', error);
      }
    }
  } else {
    // Fallback to clipboard
    if (data.text && navigator.clipboard) {
      await navigator.clipboard.writeText(data.text);
    }
  }
}

/**
 * Detect if device can hover (has mouse)
 */
export function canHover(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/**
 * Add to home screen prompt (PWA)
 */
export function useAddToHomeScreen() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const promptInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setCanInstall(false);
      }
    }
  };

  return { canInstall, promptInstall };
}
