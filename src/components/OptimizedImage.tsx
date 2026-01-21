import { useState, useEffect, useRef } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  placeholder?: string
  fallback?: string
  srcSet?: string
  sizes?: string
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=',
  fallback,
  srcSet,
  sizes
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const imgRef = useRef<HTMLImageElement>(null)

  // Handle image errors with fallback
  useEffect(() => {
    if (hasError && fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback)
      setHasError(false)
    }
  }, [hasError, fallback, currentSrc])

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  // Handle image load errors
  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      if (fallback && currentSrc !== fallback) {
        setCurrentSrc(fallback)
      }
    }
  }

  // Generate WebP source if supported
  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.endsWith('.svg')) return originalSrc
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  }

  // If error and no fallback, show placeholder
  if (hasError && !fallback) {
    return (
      <div
        className={`bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '100%',
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
      >
        <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  return (
    <picture>
      {!currentSrc.endsWith('.svg') && (
        <source
          srcSet={isInView ? getOptimizedSrc(currentSrc) : undefined}
          type="image/webp"
        />
      )}
      <img
        ref={imgRef}
        src={isInView ? currentSrc : placeholder}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        srcSet={isInView && srcSet ? srcSet : undefined}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
      />
    </picture>
  )
}
