import React from 'react';

// Performance optimization utilities
export const preloadCriticalResources = () => {
  // Load fonts directly instead of preloading
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);
};

// Optimize images with WebP support
export const getOptimizedImageUrl = (url: string, width?: number, quality = 80) => {
  if (url.includes('cloudinary.com')) {
    const baseUrl = url.split('/upload/')[0] + '/upload/';
    const imagePath = url.split('/upload/')[1];
    
    let transformations = [`q_${quality}`, 'f_auto'];
    if (width) {
      transformations.push(`w_${width}`);
    }
    
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
    { rel: 'dns-prefetch', href: '//res.cloudinary.com' },
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

