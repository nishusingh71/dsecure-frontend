/**
 * Image Optimization Utilities
 * 
 * Utilities for:
 * - Converting images to WebP
 * - Generating blur placeholders
 * - Creating responsive srcSet
 * - Preloading critical images
 */

export interface ImageConfig {
  src: string;
  width: number;
  height: number;
  alt: string;
  priority?: boolean;
}

/**
 * Generate blur placeholder data URL
 * Creates a tiny blurred SVG for instant loading
 * 
 * @param width - Image width
 * @param height - Image height
 * @param color - Placeholder color (default: gray)
 * @returns Data URL string for blur placeholder
 */
export function generateBlurDataURL(
  width: number = 400,
  height: number = 300,
  color: string = '#e5e7eb'
): string {
  // SVG with blur filter - very lightweight (~200 bytes)
  return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='${color}' filter='url(%23b)'/%3E%3C/svg%3E`;
}

/**
 * Generate responsive srcSet for different screen sizes
 * 
 * @param imagePath - Base image path
 * @param sizes - Array of widths to generate
 * @returns srcSet string for responsive images
 */
export function generateSrcSet(
  imagePath: string,
  sizes: number[] = [640, 750, 828, 1080, 1200, 1920]
): string {
  return sizes
    .map((width) => {
      // Convert to WebP and add width descriptor
      const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return `${webpPath}?w=${width} ${width}w`;
    })
    .join(', ');
}

/**
 * Get WebP version of image path
 * 
 * @param imagePath - Original image path
 * @returns WebP version of the path
 */
export function getWebPPath(imagePath: string): string {
  return imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
}

/**
 * Preload critical images for LCP optimization
 * Only use for above-the-fold images
 * 
 * @param src - Image source URL
 * @param type - Image MIME type
 */
export function preloadImage(src: string, type: string = 'image/webp'): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.type = type;
  document.head.appendChild(link);
}

/**
 * Calculate image dimensions maintaining aspect ratio
 * 
 * @param originalWidth - Original image width
 * @param originalHeight - Original image height
 * @param maxWidth - Maximum width constraint
 * @param maxHeight - Maximum height constraint
 * @returns Calculated dimensions
 */
export function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth?: number,
  maxHeight?: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;

  let width = originalWidth;
  let height = originalHeight;

  if (maxWidth && width > maxWidth) {
    width = maxWidth;
    height = width / aspectRatio;
  }

  if (maxHeight && height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
}

/**
 * Get optimal image quality based on format
 * 
 * @param format - Image format (webp, jpg, png)
 * @returns Recommended quality value
 */
export function getOptimalQuality(format: 'webp' | 'jpg' | 'png'): number {
  const qualityMap = {
    webp: 85, // WebP maintains quality at lower values
    jpg: 80, // JPEG quality sweet spot
    png: 100, // PNG is lossless
  };

  return qualityMap[format] || 80;
}

/**
 * Check if browser supports WebP
 * 
 * @returns Promise that resolves to boolean
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webpData = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
    const img = new Image();
    
    img.onload = () => resolve(img.width === 1);
    img.onerror = () => resolve(false);
    img.src = webpData;
  });
}

/**
 * Format file size for display
 * 
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "125 KB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Common image configurations for Contact page
 */
export const ContactPageImages = {
  hero: {
    src: '/images/contact-hero.webp',
    fallback: '/images/contact-hero.jpg',
    width: 1920,
    height: 600,
    alt: 'Contact Us - D-Secure Technologies',
    priority: true, // Above the fold - preload
  },
  offices: {
    newYork: {
      src: '/images/office-ny.webp',
      fallback: '/images/office-ny.jpg',
      width: 400,
      height: 300,
      alt: 'New York Office',
      priority: false,
    },
    london: {
      src: '/images/office-london.webp',
      fallback: '/images/office-london.jpg',
      width: 400,
      height: 300,
      alt: 'London Office',
      priority: false,
    },
    dubai: {
      src: '/images/office-dubai.webp',
      fallback: '/images/office-dubai.jpg',
      width: 400,
      height: 300,
      alt: 'Dubai Office',
      priority: false,
    },
  },
};

/**
 * Responsive image sizes configuration
 */
export const imageSizes = {
  // Mobile: 100vw, Tablet: 50vw, Desktop: 33vw
  card: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  
  // Mobile: 100vw, Desktop: 100vw
  hero: '100vw',
  
  // Mobile: 100vw, Tablet: 50vw, Desktop: 25vw
  thumbnail: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw',
};
