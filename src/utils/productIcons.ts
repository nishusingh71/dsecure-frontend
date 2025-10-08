// Product icon utility functions
export const getProductIcon = (category: string, size: number = 128): string => {
  // Use the Cloudinary image for all products
  return 'https://res.cloudinary.com/dhwi5wevf/image/upload/v1759928831/bwsswefvwhdvuy8yrplk.png';
};

// Get icon for different product categories with specific styling
export const getProductImageConfig = (category: string) => {
  const baseConfig = {
    iconSize: 64,
    backgroundColor: 'from-gray-800 to-gray-900',
    accentColor: 'text-emerald-500',
  };

  switch (category) {
    case 'drive-eraser':
      return {
        ...baseConfig,
        backgroundColor: 'from-blue-800 to-blue-900',
        accentColor: 'text-blue-400',
        iconSize: 64,
      };
    case 'admin-console':
      return {
        ...baseConfig,
        backgroundColor: 'from-purple-800 to-purple-900',
        accentColor: 'text-purple-400',
        iconSize: 64,
      };
    case 'mobile-eraser':
      return {
        ...baseConfig,
        backgroundColor: 'from-green-800 to-green-900',
        accentColor: 'text-green-400',
        iconSize: 64,
      };
    case 'file-eraser':
      return {
        ...baseConfig,
        backgroundColor: 'from-red-800 to-red-900',
        accentColor: 'text-red-400',
        iconSize: 64,
      };
    default:
      return baseConfig;
  }
};

// Available icon sizes from the iconset
export const AVAILABLE_ICON_SIZES = [16, 32, 64, 128, 256, 512];

// Get the best icon size for the given display size
export const getBestIconSize = (displaySize: number): number => {
  return AVAILABLE_ICON_SIZES.find(size => size >= displaySize) || 512;
};