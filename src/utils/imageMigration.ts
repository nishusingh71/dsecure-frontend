/**
 * Image Migration Utilities
 * 
 * Helper functions to migrate existing images to optimized format
 */

/**
 * Extract Cloudinary public ID from full URL
 * 
 * @example
 * // Input: https://res.cloudinary.com/dhwi5wevf/image/upload/v1760288669/zlfj7dsd91i7dqrd9x9x.png
 * // Output: zlfj7dsd91i7dqrd9x9x
 */
export const extractPublicId = (url: string): string => {
  if (!url) return '';
  
  return url
    .replace(/^https?:\/\//, '') // Remove protocol
    .replace(/.*cloudinary\.com\//, '') // Remove cloudinary domain
    .replace(/.*\/upload\//, '') // Remove everything before /upload/
    .replace(/v\d+\//, '') // Remove version number
    .replace(/\.[^.]+$/, ''); // Remove file extension
};

/**
 * Check if URL is a Cloudinary URL
 */
export const isCloudinaryUrl = (url: string): boolean => {
  return url.includes('cloudinary.com') || url.includes('res.cloudinary');
};

/**
 * Convert standard img tags to OptimizedCloudinaryImage props
 */
export const convertImgToOptimized = (imgSrc: string, imgAlt: string = ''): {
  publicId: string;
  alt: string;
  componentCode: string;
} | null => {
  if (!isCloudinaryUrl(imgSrc)) {
    console.warn('Not a Cloudinary URL:', imgSrc);
    return null;
  }

  const publicId = extractPublicId(imgSrc);
  
  const componentCode = `<OptimizedCloudinaryImage
  publicId="${publicId}"
  alt="${imgAlt}"
  width={1200}
  quality={80}
  format="webp"
  loading="lazy"
/>`;

  return {
    publicId,
    alt: imgAlt,
    componentCode,
  };
};

/**
 * Batch convert multiple image URLs
 */
export const batchConvertImages = (images: Array<{ src: string; alt: string }>): Array<{
  original: string;
  publicId: string;
  alt: string;
  componentCode: string;
}> => {
  return images
    .filter(img => isCloudinaryUrl(img.src))
    .map(img => {
      const converted = convertImgToOptimized(img.src, img.alt);
      if (!converted) return null;
      
      return {
        original: img.src,
        ...converted,
      };
    })
    .filter(Boolean) as any;
};

/**
 * Find all img tags in a component file (for migration)
 * Returns regex matches
 */
export const findImageTags = (fileContent: string): Array<{
  fullTag: string;
  src: string;
  alt: string;
}> => {
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/g;
  const matches: Array<{ fullTag: string; src: string; alt: string }> = [];
  
  let match;
  while ((match = imgRegex.exec(fileContent)) !== null) {
    matches.push({
      fullTag: match[0],
      src: match[1],
      alt: match[2] || '',
    });
  }
  
  return matches;
};

/**
 * Generate migration report
 */
export const generateMigrationReport = (images: ReturnType<typeof batchConvertImages>): string => {
  const totalImages = images.length;
  const avgSavings = 75; // Average 75% savings
  
  return `
📊 Image Migration Report
========================

Total Images: ${totalImages}
Estimated Size Reduction: ${avgSavings}%
Estimated Load Time Improvement: ~70%

Images to Migrate:
${images.map((img, i) => `
${i + 1}. ${img.publicId}
   Original: ${img.original}
   Component:
   ${img.componentCode}
`).join('\n')}

Next Steps:
1. Replace <img> tags with OptimizedCloudinaryImage
2. Add import: import OptimizedCloudinaryImage from '@/components/OptimizedCloudinaryImage'
3. Test on localhost
4. Monitor performance in DevTools
`;
};

/**
 * Example usage in console:
 * 
 * ```js
 * import { extractPublicId, batchConvertImages } from '@/utils/imageMigration';
 * 
 * // Single image
 * const publicId = extractPublicId('https://res.cloudinary.com/.../image.png');
 * 
 * // Batch migration
 * const images = [
 *   { src: 'https://res.cloudinary.com/.../img1.png', alt: 'Image 1' },
 *   { src: 'https://res.cloudinary.com/.../img2.jpg', alt: 'Image 2' },
 * ];
 * 
 * const converted = batchConvertImages(images);
 * console.log(generateMigrationReport(converted));
 * ```
 */
