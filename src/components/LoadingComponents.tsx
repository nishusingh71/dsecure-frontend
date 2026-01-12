import React from 'react';

/**
 * Enhanced Loading Components for Code Splitting
 * 
 * Different loading states for different page types:
 * - FullPageLoader: Generic full-page loading
 * - PageLoader: Content area loading (with header/footer)
 * - RouteLoader: Minimal loading for route transitions
 */

/**
 * FullPageLoader - Used for initial app load
 */
export const FullPageLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="text-center">
        {/* Logo or Brand */}
        <div className="w-16 h-16 bg-emerald-600 rounded-xl mx-auto mb-4 animate-pulse" />
        
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
        
        {/* Text */}
        <p className="text-slate-600 font-medium">Loading D-Secure...</p>
      </div>
    </div>
  );
};

/**
 * PageLoader - Used for page route transitions
 */
export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="flex gap-4">
              <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
              <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
              <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Title */}
          <div className="h-10 w-3/4 bg-slate-200 rounded animate-pulse" />
          
          {/* Subtitle */}
          <div className="h-6 w-1/2 bg-slate-200 rounded animate-pulse" />
          
          {/* Content Blocks */}
          <div className="space-y-4 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm space-y-3">
                <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-slate-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * RouteLoader - Minimal loading for quick transitions
 */
export const RouteLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-500 text-sm">Loading...</p>
      </div>
    </div>
  );
};

/**
 * ContentLoader - Loading for content sections
 */
export const ContentLoader: React.FC = () => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 w-2/3 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-5/6 bg-slate-200 rounded" />
        <div className="h-4 w-4/6 bg-slate-200 rounded" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * DashboardLoader - Loading for dashboard pages
 */
export const DashboardLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-slate-200 rounded" />
          <div className="h-10 w-32 bg-slate-200 rounded" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-4 w-24 bg-slate-200 rounded mb-3" />
              <div className="h-8 w-32 bg-slate-200 rounded" />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="h-6 w-40 bg-slate-200 rounded mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-slate-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * CardGridLoader - Loading for card/grid layouts
 */
export const CardGridLoader: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-48 bg-slate-200" />
          <div className="p-4 space-y-3">
            <div className="h-4 w-3/4 bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Default export for common usage
 */
export default PageLoader;
