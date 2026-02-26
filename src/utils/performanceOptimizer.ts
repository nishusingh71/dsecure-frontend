import React from 'react';

// Performance optimization utilities
export const preloadCriticalResources = () => {
  // Fonts are now preloaded/linked in index.html for better performance
};

// Optimize images with WebP support
// Note: All static Cloudinary URLs already include f_auto,q_auto.
// This function adds additional transforms (width, custom quality) on top.
export const getOptimizedImageUrl = (url: string, width?: number, quality?: number) => {
  if (url.includes('cloudinary.com')) {
    // Already has f_auto,q_auto baked in — only add width/custom quality if needed
    if (url.includes('f_auto')) {
      if (!width && !quality) return url; // Already optimized, nothing to add
      
      const baseUrl = url.split('/upload/')[0] + '/upload/';
      const afterUpload = url.split('/upload/')[1];
      
      let extraTransforms: string[] = [];
      if (width) extraTransforms.push(`w_${width}`);
      if (quality) extraTransforms.push(`q_${quality}`);
      
      return `${baseUrl}${extraTransforms.join(',')}/${afterUpload}`;
    }
    
    // Fallback for any URLs missed by the optimization script
    const baseUrl = url.split('/upload/')[0] + '/upload/';
    const imagePath = url.split('/upload/')[1];
    
    let transformations = ['f_auto', 'q_auto'];
    if (width) transformations.push(`w_${width}`);
    if (quality) transformations.push(`q_${quality}`);
    
    return `${baseUrl}${transformations.join(',')}/${imagePath}`;
  }
  return url;
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy load components
export const createLazyComponent = (importFunc: () => Promise<any>) => {
  return React.lazy(() => 
    importFunc().then(module => ({
      default: module.default || module
    }))
  );
};

// Critical CSS inlining helper
export const inlineCriticalCSS = (css: string) => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};

// Resource hints
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://res.cloudinary.com', crossOrigin: 'anonymous' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossOrigin) {
      link.crossOrigin = hint.crossOrigin;
    }
    document.head.appendChild(link);
  });
};

