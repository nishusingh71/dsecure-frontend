import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'
import { quality } from '@cloudinary/url-gen/actions/delivery'
import { format } from '@cloudinary/url-gen/actions/delivery'
import { fill, scale, fit, crop } from '@cloudinary/url-gen/actions/resize'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { face } from '@cloudinary/url-gen/qualifiers/focusOn'

import { ENV } from '../config/env'

// Initialize Cloudinary instance
const cloudName = ENV.CLOUDINARY_CLOUD_NAME

if (!cloudName) {
  console.warn('VITE_CLOUDINARY_CLOUD_NAME not found in environment variables')
}

export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName || 'demo' // fallback to demo account for development
  }
})

// Common transformation presets
export const transformations = {
  // Logo transformations
  logo: {
    small: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(scale().width(120).height(40)),

    medium: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(scale().width(160).height(60)),

    large: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(scale().width(200).height(80))
  },

  // Hero image transformations
  hero: {
    desktop: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(fill().width(1920).height(1080)),

    tablet: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(fill().width(1024).height(768)),

    mobile: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(fill().width(768).height(576))
  },

  // Profile/avatar transformations
  avatar: {
    small: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(fill().width(40).height(40).gravity(focusOn(face()))),

    medium: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(fill().width(80).height(80).gravity(focusOn(face()))),

    large: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(fill().width(120).height(120).gravity(focusOn(face())))
  },

  // Product/feature images
  feature: {
    card: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(fill().width(400).height(250)),

    banner: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(fill().width(800).height(400)),

    thumbnail: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(fill().width(200).height(150))
  },

  // Generic responsive transformations
  responsive: {
    small: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(scale().width(400)),

    medium: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(scale().width(800)),

    large: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(scale().width(1200)),

    xlarge: (publicId: string) =>
      cld.image(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'))
        .resize(scale().width(1600))
  }
}

// Asset mapping - replace local assets with Cloudinary public IDs
export const assets = {
  logos: {
    main: 'D-Secure/logos/D-Secure-logo-black', // Black logo for light backgrounds
    white: 'D-Secure/logos/D-Secure-logo-white', // White logo for dark backgrounds (footer)
    icon: 'D-Secure/logos/D-Secure-icon', // Just the icon part
    favicon: 'D-Secure/logos/D-Secure-favicon' // Favicon version
  },

  images: {
    // Add your other images here as you upload them to Cloudinary
    heroBackground: 'D-Secure/images/hero-bg',
    aboutImage: 'D-Secure/images/about',
    featureImage1: 'D-Secure/images/feature-1',
    featureImage2: 'D-Secure/images/feature-2',
    // Add more as needed
  },

  icons: {
    // SVG icons can also be stored in Cloudinary
    security: 'D-Secure/icons/security',
    compliance: 'D-Secure/icons/compliance',
    performance: 'D-Secure/icons/performance'
  }
}

// Utility function to get optimized image URL
export const getOptimizedImageUrl = (
  publicId: string,
  transformation?: 'small' | 'medium' | 'large' | 'xlarge'
) => {
  if (!transformation) {
    return cld.image(publicId)
      .delivery(quality('auto'))
      .delivery(format('auto'))
      .toURL()
  }

  return transformations.responsive[transformation](publicId).toURL()
}

// Utility function for responsive images with srcSet
export const getResponsiveSrcSet = (publicId: string) => {
  const small = transformations.responsive.small(publicId).toURL()
  const medium = transformations.responsive.medium(publicId).toURL()
  const large = transformations.responsive.large(publicId).toURL()
  const xlarge = transformations.responsive.xlarge(publicId).toURL()

  return `${small} 400w, ${medium} 800w, ${large} 1200w, ${xlarge} 1600w`
}

// Custom hook for Cloudinary image with fallback
export const useCloudinaryImage = (publicId: string, fallback?: string) => {
  try {
    return cld.image(publicId).delivery(quality('auto')).delivery(format('auto'))
  } catch (error) {
    console.warn(`Failed to load Cloudinary image: ${publicId}`, error)
    return fallback || ''
  }
}

export { AdvancedImage }
export default cld