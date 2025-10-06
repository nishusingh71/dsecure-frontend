import { memo } from 'react'

interface ThemeAwareLogoFooterProps {
  className?: string
  width?: number
  height?: number
  priority?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
}

const ThemeAwareLogoFooter = memo(({ 
  className, 
  width, 
  height,
  priority = false,
  size = 'md',
  responsive = true
}: ThemeAwareLogoFooterProps) => {
  const logoSrc = '/logo-white.svg' // Use white logo for footer (visible on dark background)
  const altText = 'DSecure - Advanced Data Security Solutions'

  // Responsive size mappings for footer
  const sizeClasses = {
    xs: 'h-6 w-auto',
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-12 w-auto',
    xl: 'h-16 w-auto'
  }

  // Responsive width/height mappings
  const sizeDimensions = {
    xs: { width: 80, height: 24 },
    sm: { width: 120, height: 32 },
    md: { width: 150, height: 40 },
    lg: { width: 180, height: 48 },
    xl: { width: 240, height: 64 }
  }

  // Use provided className or generate responsive one
  const logoClassName = className || (
    responsive 
      ? `${sizeClasses[size]} transition-all duration-200`
      : sizeClasses[size]
  )

  // Use provided dimensions or size-based ones
  const logoWidth = width || sizeDimensions[size].width
  const logoHeight = height || sizeDimensions[size].height

  return (
    <img
      src={logoSrc}
      alt={altText}
      className={logoClassName}
      width={logoWidth}
      height={logoHeight}
      style={{ filter: 'brightness(0) invert(1)' }} // Ensure visibility on dark background
    />
  )
})

ThemeAwareLogoFooter.displayName = 'ThemeAwareLogoFooter'

export default ThemeAwareLogoFooter