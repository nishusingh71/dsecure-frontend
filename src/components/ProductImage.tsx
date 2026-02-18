import React, { memo, useMemo } from 'react';
import { getProductIcon, getProductImageConfig } from '@/utils/productIcons';

interface ProductImageProps {
  category: string;
  productName: string;
  version: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showDetails?: boolean;
}

export const ProductImage = memo<ProductImageProps>(({
  category,
  productName,
  version,
  size = 'medium',
  className = '',
  showDetails = true,
}) => {
  const config = useMemo(() => getProductImageConfig(category), [category]);
  
  const sizeConfig = useMemo(() => ({
    small: { container: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-xs' },
    medium: { container: 'w-24 h-24', icon: 'w-12 h-12', text: 'text-sm' },
    large: { container: 'w-48 h-64', icon: 'w-16 h-16', text: 'text-lg' },
  }), []);
  
  const currentSize = sizeConfig[size];
  const iconSize = useMemo(() => size === 'large' ? 128 : size === 'medium' ? 64 : 32, [size]);
  
  return (
    <div className={`${currentSize.container} bg-gradient-to-br ${config.backgroundColor} rounded-lg p-4 flex flex-col items-center justify-center text-white shadow-lg ${className}`}>
      {/* Product Icon */}
      <div className="mb-3">
        <img
          src={getProductIcon(category, iconSize)}
          alt={productName}
          className={`${currentSize.icon} object-contain filter drop-shadow-lg`}
          onError={(e) => {
            // Fallback to Cloudinary image if icon fails to load
            const target = e.target as HTMLImageElement;
            target.src =
              "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1759928831/bwsswefvwhdvuy8yrplk.png";
          }}
        />
      </div>
      
      {showDetails && (
        <div className="text-center space-y-1">
          {/* Product Brand */}
          <div className={`${config.accentColor} font-bold ${currentSize.text}`}>
            D-Secure
          </div>
          
          {/* Product Category */}
          {size === 'large' && (
            <div className={`text-white ${currentSize.text === 'text-lg' ? 'text-sm' : 'text-xs'} opacity-90`}>
              {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </div>
          )}
          
          {/* Version */}
          {size === 'large' && (
            <div className={`text-white text-xs opacity-75`}>
              {version}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

ProductImage.displayName = 'ProductImage';

export default ProductImage;