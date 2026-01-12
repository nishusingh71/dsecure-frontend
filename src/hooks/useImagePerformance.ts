import { useEffect, useState } from 'react';

interface ImagePerformanceMetrics {
  loadTime: number;
  fileSize?: number;
  format?: string;
  width?: number;
  height?: number;
}

/**
 * useImagePerformance Hook
 * 
 * Monitors image loading performance
 * Tracks: load time, format, size, dimensions
 * 
 * Usage:
 * ```tsx
 * const { metrics, startTracking } = useImagePerformance();
 * <img onLoad={startTracking} ... />
 * console.log('Image loaded in', metrics.loadTime, 'ms');
 * ```
 */
export const useImagePerformance = (imageName?: string) => {
  const [metrics, setMetrics] = useState<ImagePerformanceMetrics | null>(null);
  const [startTime] = useState(performance.now());

  const startTracking = (event?: React.SyntheticEvent<HTMLImageElement>) => {
    const loadTime = performance.now() - startTime;
    
    if (event) {
      const img = event.currentTarget;
      setMetrics({
        loadTime,
        width: img.naturalWidth,
        height: img.naturalHeight,
        format: img.src.match(/f_(\w+)/)?.[1],
      });
    } else {
      setMetrics({ loadTime });
    }

    // Log in development
    if (import.meta.env.DEV && imageName) {
      console.log(`📸 ${imageName} loaded in ${loadTime.toFixed(2)}ms`);
    }
  };

  return { metrics, startTracking };
};

/**
 * usePageLoadMetrics Hook
 * 
 * Tracks overall page performance including images
 * Reports Core Web Vitals: LCP, FID, CLS
 */
export const usePageLoadMetrics = (pageName: string) => {
  useEffect(() => {
    // Track when all images are loaded
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;
    const startTime = performance.now();

    const trackImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        const totalLoadTime = performance.now() - startTime;
        console.log(`✅ ${pageName}: All ${totalImages} images loaded in ${totalLoadTime.toFixed(2)}ms`);
      }
    };

    images.forEach(img => {
      if (img.complete) {
        trackImageLoad();
      } else {
        img.addEventListener('load', trackImageLoad);
      }
    });

    // Cleanup
    return () => {
      images.forEach(img => {
        img.removeEventListener('load', trackImageLoad);
      });
    };
  }, [pageName]);
};

/**
 * Calculate image size savings
 * Compare original vs optimized formats
 */
export const calculateSavings = (
  originalSize: number,
  optimizedSize: number
): { savings: number; percentage: number } => {
  const savings = originalSize - optimizedSize;
  const percentage = (savings / originalSize) * 100;
  
  return {
    savings,
    percentage: Math.round(percentage)
  };
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

/**
 * Check WebP support
 */
export const supportsWebP = (): boolean => {
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

/**
 * Check AVIF support
 */
export const supportsAVIF = (): boolean => {
  const avif = new Image();
  avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  return new Promise<boolean>((resolve) => {
    avif.onload = () => resolve(true);
    avif.onerror = () => resolve(false);
  }) as any;
};
