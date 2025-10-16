/**
 * Performance Configuration for React App
 * Contains settings and utilities for optimizing app performance
 */

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  // Component render time thresholds (ms)
  SLOW_RENDER_WARNING: 50,
  CRITICAL_RENDER_WARNING: 100,
  
  // Bundle size thresholds (KB)
  CHUNK_SIZE_WARNING: 500,
  CHUNK_SIZE_ERROR: 1000,
  
  // Image optimization settings
  IMAGE_LAZY_LOAD_THRESHOLD: '50px',
  IMAGE_QUALITY: 85,
  
  // Search debounce delay
  SEARCH_DEBOUNCE_MS: 300,
  
  // Virtual scrolling settings
  VIRTUAL_ITEM_HEIGHT: 50,
  VIRTUAL_CONTAINER_HEIGHT: 400,
  VIRTUAL_OVERSCAN: 5,
  
  // Pagination settings
  DEFAULT_PAGE_SIZE: 50,
  MAX_PAGE_SIZE: 200,
};

// Performance monitoring configuration
export const PERFORMANCE_CONFIG = {
  // Enable performance monitoring in development
  ENABLE_DEV_MONITORING: import.meta.env.DEV,
  
  // Enable Web Vitals tracking
  ENABLE_WEB_VITALS: true,
  
  // Enable React DevTools Profiler
  ENABLE_PROFILER: import.meta.env.DEV,
  
  // Enable performance logging
  ENABLE_PERFORMANCE_LOGS: import.meta.env.DEV,
};

// Component optimization settings
export const OPTIMIZATION_SETTINGS = {
  // Components that should always be memoized
  ALWAYS_MEMO_COMPONENTS: [
    'ProductImage',
    'OptimizedImage',
    'OptimizedTable',
    'SEOHead',
    'Reveal'
  ],
  
  // Heavy components that should be lazy loaded
  LAZY_LOAD_COMPONENTS: [
    'PricingPage',
    'PartnersPage',
    'AdminDashboard',
    'SupportPage'
  ],
  
  // Components that benefit from virtual scrolling
  VIRTUAL_SCROLL_COMPONENTS: [
    'AdminMachines',
    'AdminUsers',
    'AdminReports',
    'DataTable'
  ],
};

// Bundle splitting configuration
export const BUNDLE_CONFIG = {
  // Vendor packages to split into separate chunks
  VENDOR_CHUNKS: {
    'react-vendor': ['react', 'react-dom'],
    'router': ['react-router-dom'],
    'ui': ['@headlessui/react', 'framer-motion'],
    'utils': ['lodash', 'date-fns'],
  },
  
  // Page-based code splitting
  PAGE_CHUNKS: true,
  
  // Component-based code splitting
  COMPONENT_CHUNKS: true,
};

// Image optimization configuration
export const IMAGE_CONFIG = {
  // Supported formats in order of preference
  FORMATS: ['webp', 'avif', 'jpg', 'png'],
  
  // Responsive image breakpoints
  BREAKPOINTS: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  
  // Quality settings per format
  QUALITY: {
    webp: 85,
    avif: 80,
    jpg: 85,
    png: 95,
  },
};

// Memory management settings
export const MEMORY_CONFIG = {
  // Maximum items to keep in memory
  MAX_CACHED_ITEMS: 100,
  
  // Cache TTL in milliseconds
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  
  // Enable garbage collection hints
  ENABLE_GC_HINTS: true,
  
  // Component unmount cleanup
  CLEANUP_ON_UNMOUNT: true,
};

// Development optimization helpers
export const DEV_HELPERS = {
  // Log slow renders
  LOG_SLOW_RENDERS: true,
  
  // Highlight re-renders
  HIGHLIGHT_RERENDERS: false,
  
  // Show performance metrics
  SHOW_METRICS: true,
  
  // Bundle analyzer
  ANALYZE_BUNDLE: import.meta.env.VITE_ANALYZE === 'true',
};