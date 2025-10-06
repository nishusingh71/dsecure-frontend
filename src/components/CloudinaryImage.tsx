import React from 'react'
import { AdvancedImage } from '@cloudinary/react'
import { cld, transformations, getOptimizedImageUrl, getResponsiveSrcSet } from '@/utils/cloudinary'
import { quality } from '@cloudinary/url-gen/actions/delivery'
import { format } from '@cloudinary/url-gen/actions/delivery'

interface CloudinaryImageProps {
  publicId: string
  alt: string
  className?: string
  transformation?: 'logo' | 'hero' | 'avatar' | 'feature' | 'responsive'
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'desktop' | 'tablet' | 'mobile' | 'card' | 'banner' | 'thumbnail'
  fallback?: string
  loading?: 'lazy' | 'eager'
  responsive?: boolean
  onClick?: () => void
}

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  alt,
  className = '',
  transformation = 'responsive',
  size = 'medium',
  fallback,
  loading = 'lazy',
  responsive = false,
  onClick
}) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  
  // Enhanced debugging for missing cloud name
  if (!cloudName) {
    console.warn('🚨 Cloudinary Debug: VITE_CLOUDINARY_CLOUD_NAME is not set');
    console.warn('🔍 Environment variables available:', Object.keys(import.meta.env));
    console.warn('📋 Expected variable: VITE_CLOUDINARY_CLOUD_NAME=dhwi5wevf');
    
    if (fallback) {
      //console.log(`✅ Using fallback image for: ${publicId}`);
      return (
        <img 
          src={fallback} 
          alt={alt} 
          className={className} 
          loading={loading}
          onClick={onClick}
        />
      )
    }
    return (
      <div className={`bg-slate-200 flex items-center justify-center ${className}`}>
        <span className="text-slate-500 text-xs">Missing VITE_CLOUDINARY_CLOUD_NAME</span>
      </div>
    )
  }

  try {
    // Get the appropriate transformation
    let cloudinaryImage
    
    if (transformation === 'logo' && transformations.logo[size as keyof typeof transformations.logo]) {
      cloudinaryImage = transformations.logo[size as keyof typeof transformations.logo](publicId)
    } else if (transformation === 'hero' && transformations.hero[size as keyof typeof transformations.hero]) {
      cloudinaryImage = transformations.hero[size as keyof typeof transformations.hero](publicId)
    } else if (transformation === 'avatar' && transformations.avatar[size as keyof typeof transformations.avatar]) {
      cloudinaryImage = transformations.avatar[size as keyof typeof transformations.avatar](publicId)
    } else if (transformation === 'feature' && transformations.feature[size as keyof typeof transformations.feature]) {
      cloudinaryImage = transformations.feature[size as keyof typeof transformations.feature](publicId)
    } else if (transformation === 'responsive' && transformations.responsive[size as keyof typeof transformations.responsive]) {
      cloudinaryImage = transformations.responsive[size as keyof typeof transformations.responsive](publicId)
    } else {
      // Default transformation
      cloudinaryImage = cld.image(publicId).delivery(quality('auto')).delivery(format('auto'))
    }

    if (responsive) {
      // Use regular img with srcSet for responsive images
      const srcSet = getResponsiveSrcSet(publicId)
      const src = getOptimizedImageUrl(publicId, 'medium')
      
      return (
        <img
          src={src}
          srcSet={srcSet}
          sizes="(max-width: 768px) 400px, (max-width: 1024px) 800px, (max-width: 1600px) 1200px, 1600px"
          alt={alt}
          className={className}
          loading={loading}
          onClick={onClick}
        />
      )
    }

    // Use AdvancedImage for single transformations
    return (
      <AdvancedImage
        cldImg={cloudinaryImage}
        alt={alt}
        className={className}
        loading={loading}
        onClick={onClick}
      />
    )
  } catch (error) {
    console.warn(`Failed to render Cloudinary image: ${publicId}`, error)
    
    if (fallback) {
      return (
        <img 
          src={fallback} 
          alt={alt} 
          className={className} 
          loading={loading}
          onClick={onClick}
        />
      )
    }
    
    return (
      <div className={`bg-slate-200 flex items-center justify-center ${className}`}>
        <span className="text-slate-500 text-xs">Failed to load image</span>
      </div>
    )
  }
}

// Convenience components for common use cases
export const CloudinaryLogo: React.FC<{
  publicId: string
  size?: 'small' | 'medium' | 'large'
  className?: string
  alt?: string
  fallback?: string
}> = ({ publicId, size = 'medium', className = '', alt = 'Logo', fallback }) => (
  <CloudinaryImage
    publicId={publicId}
    alt={alt}
    className={className}
    transformation="logo"
    size={size}
    fallback={fallback}
  />
)

export const CloudinaryAvatar: React.FC<{
  publicId: string
  size?: 'small' | 'medium' | 'large'
  className?: string
  alt?: string
}> = ({ publicId, size = 'medium', className = '', alt = 'Avatar' }) => (
  <CloudinaryImage
    publicId={publicId}
    alt={alt}
    className={className}
    transformation="avatar"
    size={size}
  />
)

export const CloudinaryHero: React.FC<{
  publicId: string
  size?: 'desktop' | 'tablet' | 'mobile'
  className?: string
  alt?: string
}> = ({ publicId, size = 'desktop', className = '', alt = 'Hero image' }) => (
  <CloudinaryImage
    publicId={publicId}
    alt={alt}
    className={className}
    transformation="hero"
    size={size}
    responsive={true}
  />
)

export default CloudinaryImage
