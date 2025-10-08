import React from 'react';
import { getProductIcon, getProductImageConfig } from '@/utils/productIcons';

interface ProductImageProps {
  category: string;
  productName: string;
  version: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showDetails?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  category,
  productName,
  version,
  size = 'medium',
  className = '',
  showDetails = true,
}) => {
  const config = getProductImageConfig(category);
  
  const sizeConfig = {
    small: { container: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-xs' },
    medium: { container: 'w-24 h-24', icon: 'w-12 h-12', text: 'text-sm' },
    large: { container: 'w-48 h-64', icon: 'w-16 h-16', text: 'text-lg' },
  };
  
  const currentSize = sizeConfig[size];
  const iconSize = size === 'large' ? 128 : size === 'medium' ? 64 : 32;
  
  return (
    <div className={`${currentSize.container} bg-gradient-to-br ${config.backgroundColor} rounded-lg p-4 flex flex-col items-center justify-center text-white shadow-lg ${className}`}>
      {/* Product Icon */}
      <div className="mb-3">
        <img
          src={getProductIcon(category, iconSize)}
          alt={productName}
          className={`${currentSize.icon} object-contain filter drop-shadow-lg`}
          onError={(e) => {
            // Fallback to D-Secure logo if icon fails to load
            const target = e.target as HTMLImageElement;
            target.src = '/src/assets/dsecure-logo-white.svg';
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
};

export default ProductImage;