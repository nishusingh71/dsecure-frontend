/**
 * Image Placeholder Utilities
 * Provides fallback images and placeholder generation for failed image loads
 */

// Generate a data URI placeholder with custom color
export const generatePlaceholder = (
  width: number = 1,
  height: number = 1,
  color: string = '#f3f4f6'
): string => {
  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" fill="${color}"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Generate a gradient placeholder
export const generateGradientPlaceholder = (
  width: number = 1,
  height: number = 1,
  fromColor: string = '#e2e8f0',
  toColor: string = '#cbd5e1'
): string => {
  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${fromColor};stop-opacity:1" /><stop offset="100%" style="stop-color:${toColor};stop-opacity:1" /></linearGradient></defs><rect width="${width}" height="${height}" fill="url(#grad)"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Common placeholder images for different contexts
export const placeholders = {
  // Generic placeholders
  default: generatePlaceholder(1, 1, '#f3f4f6'),
  hero: generateGradientPlaceholder(1600, 900, '#e0f2fe', '#dbeafe'),
  card: generateGradientPlaceholder(800, 600, '#f0fdf4', '#dcfce7'),
  avatar: generateGradientPlaceholder(200, 200, '#fef3c7', '#fde68a'),
  thumbnail: generateGradientPlaceholder(400, 300, '#e0e7ff', '#c7d2fe'),
  
  // Technology/Security themed
  security: generateGradientPlaceholder(1200, 800, '#dbeafe', '#bfdbfe'),
  technology: generateGradientPlaceholder(1200, 800, '#d1fae5', '#a7f3d0'),
  data: generateGradientPlaceholder(1200, 800, '#e9d5ff', '#d8b4fe'),
  
  // Industry specific
  healthcare: generateGradientPlaceholder(1200, 800, '#dbeafe', '#bfdbfe'),
  finance: generateGradientPlaceholder(1200, 800, '#d1fae5', '#a7f3d0'),
  government: generateGradientPlaceholder(1200, 800, '#e9d5ff', '#d8b4fe'),
  enterprise: generateGradientPlaceholder(1200, 800, '#fed7aa', '#fdba74'),
};

// Fallback image URLs (can be replaced with actual hosted images)
export const fallbackImages = {
  hero: placeholders.hero,
  security: placeholders.security,
  technology: placeholders.technology,
  data: placeholders.data,
  healthcare: placeholders.healthcare,
  finance: placeholders.finance,
  government: placeholders.government,
  enterprise: placeholders.enterprise,
  default: placeholders.default,
};

// Get appropriate fallback based on context
export const getFallbackImage = (context: keyof typeof fallbackImages = 'default'): string => {
  return fallbackImages[context] || fallbackImages.default;
};

// Check if URL is from Unsplash (may have rate limiting issues)
export const isUnsplashUrl = (url: string): boolean => {
  return url.includes('unsplash.com');
};

// Get fallback for Unsplash images based on the URL context
export const getUnsplashFallback = (url: string): string => {
  // Try to determine context from URL
  if (url.includes('photo-1614064641938') || url.includes('photo-1551288049')) {
    return getFallbackImage('technology');
  }
  if (url.includes('photo-1550751827') || url.includes('photo-1558494949')) {
    return getFallbackImage('security');
  }
  if (url.includes('photo-1560518883') || url.includes('photo-1581091226')) {
    return getFallbackImage('government');
  }
  if (url.includes('photo-1563986768') || url.includes('photo-1556740749')) {
    return getFallbackImage('finance');
  }
  
  // Default fallback
  return getFallbackImage('default');
};

export default {
  generatePlaceholder,
  generateGradientPlaceholder,
  placeholders,
  fallbackImages,
  getFallbackImage,
  isUnsplashUrl,
  getUnsplashFallback,
};
