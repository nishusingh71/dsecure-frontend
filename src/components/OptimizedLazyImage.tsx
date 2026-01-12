import React, { useState, useRef, useEffect } from 'react';

interface OptimizedLazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

/**
 * OptimizedLazyImage Component
 * 
 * High-performance lazy loading image with:
 * - Blur placeholder for better UX
 * - Intersection Observer for lazy loading
 * - Explicit dimensions to prevent CLS
 * - Responsive image loading
 * - Error handling
 * 
 * Performance Benefits:
 * - Reduces LCP by lazy loading offscreen images
 * - Eliminates CLS with explicit width/height
 * - Improves perceived performance with blur placeholder
 * 
 * @example
 * ```tsx
 * <OptimizedLazyImage
 *   src="/images/hero.jpg"
 *   alt="Hero image"
 *   width={800}
 *   height={600}
 *   blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
 * />
 * ```
 */
const OptimizedLazyImage: React.FC<OptimizedLazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  blurDataURL,
  priority = false,
  onLoad,
  onError,
  objectFit = 'cover',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Generate default blur placeholder if not provided
  const defaultBlurDataURL = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width || 400} ${height || 300}'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2UyZThmMCIvPjwvc3ZnPg=='/%3E%3C/svg%3E`;

  const placeholderSrc = blurDataURL || defaultBlurDataURL;

  useEffect(() => {
    if (priority) return; // Skip observer if priority (load immediately)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Container styles to prevent CLS
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    ...(width && height && {
      aspectRatio: `${width} / ${height}`,
    }),
  };

  // Image styles
  const imgStyle: React.CSSProperties = {
    objectFit,
    transition: 'opacity 0.3s ease-in-out, filter 0.3s ease-in-out',
  };

  return (
    <div
      ref={imgRef}
      className={`relative ${className}`}
      style={containerStyle}
      {...(width && { 'data-width': width })}
      {...(height && { 'data-height': height })}
    >
      {/* Blur Placeholder */}
      <img
        src={placeholderSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{
          ...imgStyle,
          filter: isLoaded ? 'blur(0px)' : 'blur(20px)',
          opacity: isLoaded ? 0 : 1,
          transform: isLoaded ? 'scale(1)' : 'scale(1.1)',
        }}
      />

      {/* Actual Image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className="absolute inset-0 w-full h-full"
          style={{
            ...imgStyle,
            opacity: isLoaded ? 1 : 0,
          }}
        />
      )}

      {/* Error Fallback */}
      {hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400"
          role="img"
          aria-label="Image failed to load"
        >
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Loading Spinner (optional, shown before image loads) */}
      {!isLoaded && !hasError && isInView && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-label="Loading image"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400" />
        </div>
      )}
    </div>
  );
};

export default OptimizedLazyImage;
