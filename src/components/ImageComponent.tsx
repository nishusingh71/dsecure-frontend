import React, { useState, useEffect, useRef, ImgHTMLAttributes } from 'react';

/**
 * ImageComponent Props Interface
 */
export interface ImageComponentProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  /** Image source URL (or base path for multi-format) */
  src: string;
  /** Alternative text for accessibility */
  alt: string;
  /** CSS class names */
  className?: string;
  /** Responsive image sizes attribute */
  sizes?: string;
  /** Width in pixels (for aspect ratio) */
  width?: number;
  /** Height in pixels (for aspect ratio) */
  height?: number;
  /** High priority image (disable lazy loading) */
  priority?: boolean;
  /** Object fit CSS property */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /** Enable AVIF format support */
  enableAVIF?: boolean;
  /** Enable WebP format support */
  enableWebP?: boolean;
  /** Fallback image if main image fails */
  fallbackSrc?: string;
  /** Callback when image loads successfully */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onError?: () => void;
  /** Show loading skeleton */
  showSkeleton?: boolean;
  /** Custom placeholder image */
  placeholder?: string;
  /** Blur effect intensity (1-10) */
  blurAmount?: number;
}

/**
 * ProductionImageComponent
 * 
 * A production-ready image component with:
 * - WebP and AVIF format support
 * - Intersection Observer lazy loading with fallback
 * - Loading skeleton/blur effect
 * - Error handling with fallback
 * - Responsive images
 * - TypeScript support
 * 
 * @example
 * ```tsx
 * <ImageComponent
 *   src="/images/hero.jpg"
 *   alt="Hero image"
 *   width={1920}
 *   height={1080}
 *   priority={true}
 *   enableWebP={true}
 *   enableAVIF={true}
 * />
 * ```
 */
export const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  className = '',
  sizes = '100vw',
  width,
  height,
  priority = false,
  objectFit = 'cover',
  enableAVIF = true,
  enableWebP = true,
  fallbackSrc,
  onLoad,
  onError,
  showSkeleton = true,
  placeholder,
  blurAmount = 5,
  ...restProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Priority images are always "in view"
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * Intersection Observer for lazy loading
   * Fallback for browsers that don't support native lazy loading
   */
  useEffect(() => {
    // Skip observer if priority image
    if (priority || !imgRef.current) return;

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              // Disconnect after image is in view
              if (observerRef.current && imgRef.current) {
                observerRef.current.unobserve(imgRef.current);
              }
            }
          });
        },
        {
          rootMargin: '50px', // Start loading 50px before image enters viewport
          threshold: 0.01,
        }
      );

      observerRef.current.observe(imgRef.current);
    } else {
      // Fallback: load image immediately if IntersectionObserver not supported
      setIsInView(true);
    }

    // Cleanup
    return () => {
      if (observerRef.current && imgRef.current) {
        observerRef.current.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  /**
   * Handle successful image load
   */
  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  /**
   * Handle image load error
   */
  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();
  };

  /**
   * Generate image source URLs for different formats
   */
  const getImageSources = () => {
    const basePath = src.replace(/\.[^/.]+$/, ''); // Remove extension
    const extension = src.match(/\.[^/.]+$/)?.[0] || '.jpg';

    return {
      avif: enableAVIF ? `${basePath}.avif` : null,
      webp: enableWebP ? `${basePath}.webp` : null,
      fallback: src,
    };
  };

  /**
   * Generate srcSet for responsive images
   * Assumes images are available at different sizes
   */
  const generateSrcSet = (imagePath: string) => {
    // Common responsive breakpoints
    const breakpoints = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
    const basePath = imagePath.replace(/\.[^/.]+$/, '');
    const extension = imagePath.match(/\.[^/.]+$/)?.[0] || '.jpg';

    // Generate srcSet only if width is provided
    if (width) {
      return breakpoints
        .filter(bp => bp <= width * 2) // Only include sizes up to 2x the display size
        .map(bp => `${basePath}-${bp}w${extension} ${bp}w`)
        .join(', ');
    }

    return undefined;
  };

  const sources = getImageSources();

  /**
   * Calculate aspect ratio for container
   */
  const aspectRatio = width && height ? (height / width) * 100 : undefined;

  /**
   * Render error fallback
   */
  if (hasError) {
    if (fallbackSrc) {
      return (
        <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
          <img
            src={fallbackSrc}
            alt={alt}
            className="w-full h-full"
            style={{ objectFit }}
            {...restProps}
          />
        </div>
      );
    }

    return (
      <div
        ref={imgRef}
        className={`relative overflow-hidden bg-slate-200 flex items-center justify-center ${className}`}
        style={{ aspectRatio: aspectRatio ? `${width}/${height}` : undefined }}
      >
        <div className="text-center p-4">
          <svg
            className="w-12 h-12 mx-auto text-slate-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm text-slate-500">Failed to load image</span>
        </div>
      </div>
    );
  }

  /**
   * Main render
   */
  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: aspectRatio ? `${width}/${height}` : undefined,
      }}
    >
      {/* Loading Skeleton */}
      {!isLoaded && showSkeleton && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse" />
      )}

      {/* Blur Placeholder */}
      {!isLoaded && placeholder && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full transition-opacity duration-300"
          style={{
            objectFit,
            filter: `blur(${blurAmount}px)`,
            transform: 'scale(1.1)',
          }}
        />
      )}

      {/* Main Image - Only render when in view */}
      {isInView && (
        <picture>
          {/* AVIF Source (smallest file size, best compression) */}
          {sources.avif && (
            <source
              type="image/avif"
              srcSet={generateSrcSet(sources.avif) || sources.avif}
              sizes={sizes}
            />
          )}

          {/* WebP Source (good compression, wide support) */}
          {sources.webp && (
            <source
              type="image/webp"
              srcSet={generateSrcSet(sources.webp) || sources.webp}
              sizes={sizes}
            />
          )}

          {/* Fallback Image (JPEG/PNG) */}
          <img
            src={sources.fallback}
            srcSet={generateSrcSet(sources.fallback)}
            sizes={sizes}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectFit }}
            {...restProps}
          />
        </picture>
      )}

      {/* Loading Indicator */}
      {!isLoaded && !hasError && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-slate-300 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
