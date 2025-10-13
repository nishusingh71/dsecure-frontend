import { ReactNode } from 'react'

// Base skeleton component with animation
interface SkeletonProps {
  className?: string
  children?: ReactNode
}

export function Skeleton({ className = '', children }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-slate-200 rounded ${className}`}>
      {children}
    </div>
  )
}

// Text skeleton for different text sizes
export function SkeletonText({ 
  lines = 1, 
  className = '',
  lineHeight = 'h-4'
}: { 
  lines?: number
  className?: string
  lineHeight?: string
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={`${lineHeight} ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} 
        />
      ))}
    </div>
  )
}

// Card skeleton for dashboard cards
export function SkeletonCard({ 
  className = 'p-6',
  hasHeader = true,
  hasFooter = false,
  contentLines = 3
}: {
  className?: string
  hasHeader?: boolean
  hasFooter?: boolean
  contentLines?: number
}) {
  return (
    <div className={`bg-white rounded-lg border border-slate-200 ${className}`}>
      {hasHeader && (
        <div className="border-b border-slate-200 pb-4 mb-4">
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      )}
      
      <div className="space-y-3">
        {Array.from({ length: contentLines }).map((_, i) => (
          <SkeletonText key={i} lines={1} />
        ))}
      </div>
      
      {hasFooter && (
        <div className="border-t border-slate-200 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      )}
    </div>
  )
}

// Table skeleton for admin dashboards
export function SkeletonTable({ 
  rows = 5, 
  columns = 4,
  hasHeader = true,
  className = ''
}: {
  rows?: number
  columns?: number
  hasHeader?: boolean
  className?: string
}) {
  return (
    <div className={`bg-white rounded-lg border border-slate-200 overflow-hidden ${className}`}>
      {hasHeader && (
        <div className="border-b border-slate-200 p-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </div>
      )}
      
      <div className="divide-y divide-slate-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-4 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Form skeleton for auth and input forms
export function SkeletonForm({ 
  fields = 3,
  hasTitle = true,
  hasSubmitButton = true,
  className = 'p-6'
}: {
  fields?: number
  hasTitle?: boolean
  hasSubmitButton?: boolean
  className?: string
}) {
  return (
    <div className={`bg-white rounded-lg border border-slate-200 ${className}`}>
      {hasTitle && (
        <div className="mb-6">
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      )}
      
      <div className="space-y-4">
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
      
      {hasSubmitButton && (
        <div className="mt-6">
          <Skeleton className="h-10 w-full" />
        </div>
      )}
    </div>
  )
}

// Navigation skeleton
export function SkeletonNav({ 
  items = 5,
  className = ''
}: {
  items?: number
  className?: string
}) {
  return (
    <nav className={`space-y-2 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3 p-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </nav>
  )
}

// Stats/metrics skeleton for dashboards
export function SkeletonStats({ 
  items = 4,
  className = ''
}: {
  items?: number
  className?: string
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  )
}

// Chart skeleton for analytics
export function SkeletonChart({ 
  height = 'h-64',
  className = ''
}: {
  height?: string
  className?: string
}) {
  return (
    <div className={`bg-white rounded-lg border border-slate-200 p-6 ${className}`}>
      <div className="mb-4">
        <Skeleton className="h-6 w-1/3 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      
      <div className={`${height} flex items-end justify-between space-x-2`}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton 
            key={i} 
            className={`w-full ${
              Math.random() > 0.5 ? 'h-full' : 
              Math.random() > 0.5 ? 'h-3/4' : 'h-1/2'
            }`} 
          />
        ))}
      </div>
    </div>
  )
}

// Button skeleton
export function SkeletonButton({ 
  size = 'medium',
  className = ''
}: {
  size?: 'small' | 'medium' | 'large'
  className?: string
}) {
  const sizeClasses = {
    small: 'h-8 w-16',
    medium: 'h-10 w-24',
    large: 'h-12 w-32'
  }
  
  return <Skeleton className={`${sizeClasses[size]} ${className}`} />
}

// Image skeleton
export function SkeletonImage({ 
  aspect = 'aspect-video',
  className = ''
}: {
  aspect?: string
  className?: string
}) {
  return (
    <Skeleton className={`w-full ${aspect} ${className}`}>
      <div className="flex items-center justify-center h-full">
        <svg 
          className="w-8 h-8 text-slate-300" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
    </Skeleton>
  )
}

// Page skeleton for full page loading
export function SkeletonPage({ 
  hasHeader = true,
  hasSidebar = false,
  hasFooter = false,
  className = ''
}: {
  hasHeader?: boolean
  hasSidebar?: boolean
  hasFooter?: boolean
  className?: string
}) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 ${className}`}>
      {hasHeader && (
        <div className="border-b border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      )}
      
      <div className="flex">
        {hasSidebar && (
          <div className="w-64 bg-white border-r border-slate-200 p-4">
            <SkeletonNav items={6} />
          </div>
        )}
        
        <div className="flex-1 p-6">
          <div className="space-y-6">
            <Skeleton className="h-10 w-64" />
            <SkeletonStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SkeletonChart />
              <SkeletonTable rows={6} />
            </div>
          </div>
        </div>
      </div>
      
      {hasFooter && (
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      )}
    </div>
  )
}
