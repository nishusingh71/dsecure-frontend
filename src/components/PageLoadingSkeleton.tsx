import { useLocation } from 'react-router-dom'
import { useIsMobile } from '@/hooks/useIsMobile'
import { 
  SkeletonPage, 
  SkeletonStats, 
  SkeletonCard, 
  SkeletonForm, 
  SkeletonTable,
  SkeletonChart,
  Skeleton,
  SkeletonText
} from './Skeleton'

// Loading component that shows different skeletons based on route
export default function PageLoadingSkeleton() {
  const location = useLocation()
  const path = location.pathname
  const isMobile = useIsMobile()

  // Admin pages with sidebar
  if (path.startsWith('/admin')) {
    return (
      <SkeletonPage 
        hasHeader={true} 
        hasSidebar={!isMobile} // Hide sidebar skeleton on mobile
        hasFooter={false}
        className="animate-pulse"
      />
    )
  }

  // Dashboard pages
  if (path === '/dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container-app py-4 sm:py-8 space-y-6 sm:space-y-8">
          {/* Dashboard header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Skeleton className="h-6 sm:h-8 w-40 sm:w-48 mb-2" />
              <Skeleton className="h-3 sm:h-4 w-48 sm:w-64" />
            </div>
            <Skeleton className="h-8 sm:h-10 w-24 sm:w-32" />
          </div>
          
          {/* Stats grid - mobile optimized */}
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'} gap-4 sm:gap-6`}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white p-3 sm:p-6 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <Skeleton className="h-6 sm:h-8 w-6 sm:w-8 rounded-full" />
                  <Skeleton className="h-3 sm:h-4 w-8 sm:w-12" />
                </div>
                <Skeleton className="h-6 sm:h-8 w-12 sm:w-16 mb-1 sm:mb-2" />
                <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
              </div>
            ))}
          </div>
          
          {/* Content cards */}
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-4 sm:gap-6`}>
            {Array.from({ length: isMobile ? 3 : 6 }).map((_, i) => (
              <SkeletonCard 
                key={i} 
                hasHeader={true} 
                contentLines={isMobile ? 1 : 2}
                className="!p-3 sm:!p-6"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Auth pages (login/register)
  if (path === '/login' || path === '/register') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <SkeletonForm 
            fields={path === '/register' ? 4 : 2} 
            hasTitle={true}
            className="px-4 sm:px-8 py-8 sm:py-12 rounded-2xl bg-white/60 backdrop-blur-xl shadow-2xl"
          />
        </div>
      </div>
    )
  }

  // Pricing page
  if (path === '/pricing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container-app py-8 sm:py-16 space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <Skeleton className="h-8 sm:h-12 w-64 sm:w-96 mx-auto" />
            <Skeleton className="h-4 sm:h-6 w-3/4 sm:w-2/3 mx-auto" />
          </div>
          
          {/* Pricing cards */}
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-3 gap-8'}`}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 sm:p-8 border border-slate-200 shadow-lg">
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center space-y-2">
                    <Skeleton className="h-5 sm:h-6 w-20 sm:w-24 mx-auto" />
                    <Skeleton className="h-8 sm:h-12 w-24 sm:w-32 mx-auto" />
                    <Skeleton className="h-3 sm:h-4 w-32 sm:w-40 mx-auto" />
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    {Array.from({ length: isMobile ? 3 : 5 }).map((_, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <Skeleton className="h-3 sm:h-4 w-3 sm:w-4 rounded-full" />
                        <Skeleton className="h-3 sm:h-4 flex-1" />
                      </div>
                    ))}
                  </div>
                  
                  <Skeleton className="h-10 sm:h-12 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Services page
  if (path === '/services') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container-app py-16 space-y-12">
          {/* Hero section */}
          <div className="text-center space-y-6">
            <Skeleton className="h-16 w-2/3 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <div className="flex justify-center gap-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
          
          {/* Product grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard 
                key={i} 
                hasHeader={true} 
                contentLines={3} 
                hasFooter={true}
                className="!p-6"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Solutions page
  if (path === '/solutions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container-app py-16 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <Skeleton className="h-12 w-96 mx-auto" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
          
          {/* Solution categories */}
          <div className="grid md:grid-cols-2 gap-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <Skeleton className="h-8 w-48" />
                </div>
                <div className="space-y-4 pl-16">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <SkeletonCard key={j} hasHeader={false} contentLines={2} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Default page skeleton for other pages (home, about, contact, etc.)
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container-app py-8 sm:py-16 space-y-8 sm:space-y-12">
        {/* Hero section */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-2 gap-8'} items-center`}>
          <div className="space-y-4 sm:space-y-6">
            <Skeleton className="h-10 sm:h-16 w-full" />
            <div className="space-y-2">
              {Array.from({ length: isMobile ? 2 : 3 }).map((_, i) => (
                <Skeleton key={i} className="h-4 sm:h-5 w-full" />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Skeleton className="h-10 sm:h-12 w-full sm:w-32" />
              <Skeleton className="h-10 sm:h-12 w-full sm:w-32" />
            </div>
            <Skeleton className="h-3 sm:h-4 w-48 sm:w-64" />
          </div>
          <div className={isMobile ? 'order-first' : 'order-first md:order-none'}>
            <Skeleton className="aspect-[16/10] md:aspect-[4/3] w-full rounded-xl" />
          </div>
        </div>
        
        {/* Content sections */}
        <div className="space-y-12 sm:space-y-16">
          {Array.from({ length: isMobile ? 2 : 3 }).map((_, i) => (
            <div key={i} className="space-y-6 sm:space-y-8">
              <div className="text-center space-y-3 sm:space-y-4">
                <Skeleton className="h-8 sm:h-10 w-48 sm:w-64 mx-auto" />
                <Skeleton className="h-4 sm:h-6 w-64 sm:w-96 mx-auto" />
              </div>
              
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-3 gap-8'}`}>
                {Array.from({ length: 3 }).map((_, j) => (
                  <SkeletonCard 
                    key={j} 
                    hasHeader={true} 
                    contentLines={isMobile ? 2 : 3}
                    className="!p-4 sm:!p-6"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}