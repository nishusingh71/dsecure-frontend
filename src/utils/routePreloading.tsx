/**
 * Route Preloading Utilities
 * 
 * Preload route components on link hover or intent
 * to improve perceived performance
 */

import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

type PreloadFunction = () => Promise<any>;

const preloadedRoutes = new Set<string>();

/**
 * Route component imports for preloading
 * Maps route paths to their lazy import functions
 */
export const routePreloaders: Record<string, PreloadFunction> = {
  '/': () => import('../pages/HomePage'),
  '/about': () => import('../pages/About'),
  '/contact': () => import('../pages/ContactPage'),
  '/services': () => import('../pages/ServicesPage'),
  '/products': () => import('../pages/ProductPage'),
  '/solutions': () => import('../pages/SolutionsPage'),
  '/resources': () => import('../pages/ResourcesPage'),
  '/pricing': () => import('../pages/PricingPage'),
  '/compliance': () => import('../pages/CompliancePage'),
  '/support': () => import('../pages/SupportPage'),
  '/download': () => import('../pages/DownloadPage'),
  
  // Solutions
  '/solutions/healthcare': () => import('../pages/solutions/HealthcareSolutionsPage'),
  '/solutions/enterprise': () => import('../pages/solutions/EnterpriseSolutionsPage'),
  '/solutions/financial': () => import('../pages/solutions/FinancialSolutionsPage'),
  
  // Services
  '/services/cloud-erasure': () => import('../pages/services/CloudErasurePage'),
  
  // Resources
  '/resources/documentation': () => import('../pages/resources/DocumentationResourcesPage'),
  '/resources/case-studies': () => import('../pages/resources/CaseStudiesResourcesPage'),
  '/resources/compliance': () => import('../pages/resources/ComplianceResourcesPage'),
  '/resources/whitepapers': () => import('../pages/resources/WhitepapersResourcesPage'),
  
  // Auth (lazy loaded)
  '/login': () => import('../pages/auth/LoginPage'),
  '/register': () => import('../pages/auth/RegisterPage'),
};

/**
 * Preload a route component
 * @param path - Route path to preload
 */
export const preloadRoute = (path: string): void => {
  // Check if already preloaded
  if (preloadedRoutes.has(path)) {
    return;
  }

  const preloader = routePreloaders[path];
  if (preloader) {
    preloader()
      .then(() => {
        preloadedRoutes.add(path);
        console.log(`✅ Preloaded route: ${path}`);
      })
      .catch((error) => {
        console.warn(`❌ Failed to preload route ${path}:`, error);
      });
  }
};

/**
 * Preload multiple routes
 * @param paths - Array of route paths to preload
 */
export const preloadRoutes = (paths: string[]): void => {
  paths.forEach(preloadRoute);
};

/**
 * Preload critical routes (homepage, about, contact)
 * Call this on app initialization
 */
export const preloadCriticalRoutes = (): void => {
  const criticalRoutes = ['/', '/about', '/contact'];
  
  // Use requestIdleCallback if available, otherwise setTimeout
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      preloadRoutes(criticalRoutes);
    });
  } else {
    setTimeout(() => {
      preloadRoutes(criticalRoutes);
    }, 1000);
  }
};

/**
 * Hook for preloading on link hover
 * Usage: <Link to="/about" onMouseEnter={() => preloadOnHover('/about')} />
 */
export const preloadOnHover = (path: string): void => {
  preloadRoute(path);
};

/**
 * React component wrapper for preloading links
 * Usage: <PreloadLink to="/about">About</PreloadLink>
 */
interface PreloadLinkProps extends LinkProps {
  to: string;
  preloadDelay?: number; // Delay before preloading (ms)
}

export const PreloadLink: React.FC<PreloadLinkProps> = ({ 
  to, 
  children, 
  preloadDelay = 0,
  ...props 
}) => {
  const handleMouseEnter = () => {
    if (preloadDelay > 0) {
      setTimeout(() => preloadRoute(to), preloadDelay);
    } else {
      preloadRoute(to);
    }
  };

  return (
    <Link 
      to={to} 
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleMouseEnter} // For mobile
      {...props}
    >
      {children}
    </Link>
  );
};

/**
 * Prefetch on viewport visibility (for navigation menus)
 */
export const usePrefetchOnVisible = (
  elementRef: React.RefObject<HTMLElement>,
  path: string
): void => {
  React.useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            preloadRoute(path);
            observer.disconnect(); // Preload once
          }
        });
      },
      { rootMargin: '50px' }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef, path]);
};

export default {
  preloadRoute,
  preloadRoutes,
  preloadCriticalRoutes,
  preloadOnHover,
  PreloadLink,
};
