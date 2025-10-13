// SEO Monitoring and Analytics Integration for DSecure
// Comprehensive tracking and monitoring system

import { ga } from './analytics';
import { clarity } from './microsoftClarity';

interface SEOMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
}

interface UserBehaviorMetrics {
  scrollDepth: number;
  timeOnPage: number;
  bounceRate: boolean;
  interactionCount: number;
  formCompletions: number;
}

class SEOMonitor {
  private metrics: SEOMetrics = {
    pageLoadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0,
    timeToInteractive: 0
  };

  private behaviorMetrics: UserBehaviorMetrics = {
    scrollDepth: 0,
    timeOnPage: 0,
    bounceRate: false,
    interactionCount: 0,
    formCompletions: 0
  };

  private startTime: number = Date.now();
  private interactions: number = 0;
  private maxScroll: number = 0;

  constructor() {
    this.initializeTracking();
  }

  // Initialize all tracking mechanisms
  private initializeTracking(): void {
    if (typeof window === 'undefined') return;

    // Performance tracking
    this.trackPagePerformance();
    this.trackCoreWebVitals();
    
    // User behavior tracking
    this.trackScrollDepth();
    this.trackUserInteractions();
    this.trackFormInteractions();
    this.trackTimeOnPage();
    
    // Error tracking
    this.trackJavaScriptErrors();
  }

  // Track Core Web Vitals for SEO
  private trackCoreWebVitals(): void {
    // First Contentful Paint
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.firstContentfulPaint = entry.startTime;
          this.reportMetric('fcp', entry.startTime);
        }
      }
    }).observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.largestContentfulPaint = lastEntry.startTime;
      this.reportMetric('lcp', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Cumulative Layout Shift
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShiftEntry = entry as any; // Type assertion for layout shift
        if (!layoutShiftEntry.hadRecentInput) {
          this.metrics.cumulativeLayoutShift += layoutShiftEntry.value;
        }
      }
      this.reportMetric('cls', this.metrics.cumulativeLayoutShift);
    }).observe({ entryTypes: ['layout-shift'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.metrics.firstInputDelay = (entry as any).processingStart - entry.startTime;
        this.reportMetric('fid', this.metrics.firstInputDelay);
      }
    }).observe({ entryTypes: ['first-input'] });
  }

  // Track page performance metrics
  private trackPagePerformance(): void {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.startTime;
        this.metrics.timeToInteractive = navigation.domInteractive - navigation.startTime;

        // Report to analytics
        ga.trackEvent({
          action: 'page_performance',
          category: 'performance',
          label: window.location.pathname,
          value: Math.round(this.metrics.pageLoadTime)
        });

        clarity.trackEvent({
          name: 'page_performance',
          properties: {
            loadTime: this.metrics.pageLoadTime,
            timeToInteractive: this.metrics.timeToInteractive,
            page: window.location.pathname
          }
        });
      }, 100);
    });
  }

  // Track scroll depth for engagement
  private trackScrollDepth(): void {
    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > this.maxScroll) {
        this.maxScroll = scrollPercent;
        this.behaviorMetrics.scrollDepth = scrollPercent;

        // Track milestone depths
        if (scrollPercent >= 25 && scrollPercent < 50) {
          this.reportEngagement('scroll_25');
        } else if (scrollPercent >= 50 && scrollPercent < 75) {
          this.reportEngagement('scroll_50');
        } else if (scrollPercent >= 75 && scrollPercent < 90) {
          this.reportEngagement('scroll_75');
        } else if (scrollPercent >= 90) {
          this.reportEngagement('scroll_90');
        }
      }
    };

    window.addEventListener('scroll', this.throttle(trackScroll, 100) as EventListener);
  }

  // Track user interactions
  private trackUserInteractions(): void {
    const trackInteraction = (event: Event) => {
      this.interactions++;
      this.behaviorMetrics.interactionCount = this.interactions;

      const target = event.target as HTMLElement;
      const elementType = target.tagName.toLowerCase();
      const elementText = target.textContent?.substring(0, 50) || '';

      ga.trackUserInteraction(elementType, event.type);
      clarity.trackEvent({
        name: 'user_interaction',
        properties: {
          elementType,
          elementText,
          eventType: event.type,
          page: window.location.pathname
        }
      });
    };

    ['click', 'keydown', 'touchstart'].forEach(eventType => {
      document.addEventListener(eventType, trackInteraction, { passive: true });
    });
  }

  // Track form interactions
  private trackFormInteractions(): void {
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      const formId = form.id || form.className || 'unknown_form';
      
      this.behaviorMetrics.formCompletions++;
      
      ga.trackBusinessEvent('contact_form', { formId });
      clarity.trackBusinessEvent('form_interaction', {
        formType: formId,
        action: 'submit'
      });
    });

    document.addEventListener('focusin', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        const form = target.closest('form');
        const formId = form?.id || form?.className || 'unknown_form';
        
        clarity.trackBusinessEvent('form_interaction', {
          formType: formId,
          field: target.getAttribute('name') || target.getAttribute('id') || 'unknown_field',
          action: 'focus'
        });
      }
    });
  }

  // Track time on page
  private trackTimeOnPage(): void {
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - this.startTime;
      this.behaviorMetrics.timeOnPage = timeOnPage;

      // Determine if this is a bounce (less than 10 seconds and no interactions)
      this.behaviorMetrics.bounceRate = timeOnPage < 10000 && this.interactions === 0;

      navigator.sendBeacon('/analytics', JSON.stringify({
        timeOnPage,
        bounceRate: this.behaviorMetrics.bounceRate,
        scrollDepth: this.behaviorMetrics.scrollDepth,
        interactions: this.interactions
      }));
    });
  }

  // Track JavaScript errors for SEO health
  private trackJavaScriptErrors(): void {
    window.addEventListener('error', (event) => {
      ga.trackEvent({
        action: 'javascript_error',
        category: 'error',
        label: `${event.filename}:${event.lineno}:${event.colno}`,
        value: 1
      });

      clarity.trackEvent({
        name: 'javascript_error',
        properties: {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          page: window.location.pathname
        }
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      ga.trackEvent({
        action: 'promise_rejection',
        category: 'error',
        label: event.reason?.toString() || 'Unknown promise rejection',
        value: 1
      });
    });
  }

  // Report performance metrics to analytics
  private reportMetric(metricName: string, value: number): void {
    ga.trackEvent({
      action: 'core_web_vital',
      category: 'performance',
      label: metricName,
      value: Math.round(value)
    });

    clarity.trackEvent({
      name: 'core_web_vital',
      properties: {
        metric: metricName,
        value: value,
        page: window.location.pathname
      }
    });
  }

  // Report engagement milestones
  private reportEngagement(milestone: string): void {
    ga.trackEvent({
      action: 'engagement_milestone',
      category: 'engagement',
      label: milestone,
      value: 1
    });

    clarity.trackMilestone(milestone as any);
  }

  // Utility function to throttle events
  private throttle(func: Function, delay: number): Function {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;
    
    return function (this: any, ...args: any[]) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  // Public methods to get current metrics
  public getMetrics(): SEOMetrics & UserBehaviorMetrics {
    return {
      ...this.metrics,
      ...this.behaviorMetrics
    };
  }

  // Manual tracking methods for specific business events
  public trackBusinessGoal(goalType: 'demo_request' | 'pricing_view' | 'download' | 'contact_form', details?: any): void {
    const eventMap: { [key: string]: string } = {
      'pricing_view': 'pricing_view',
      'download': 'download',
      'demo_request': 'demo_request',
      'contact_form': 'contact_form'
    };
    
    const mappedEvent = eventMap[goalType] as any;
    ga.trackBusinessEvent(mappedEvent, details);
    clarity.trackBusinessEvent(mappedEvent, details);
  }

  public trackPageView(path: string, title?: string): void {
    ga.trackPageView(path, title);
    clarity.trackBusinessEvent('page_view', { page: path, title });
  }

  public trackSearch(query: string): void {
    ga.trackSiteSearch(query);
    clarity.trackEvent({
      name: 'site_search',
      properties: {
        query,
        page: window.location.pathname
      }
    });
  }
}

// Initialize global SEO monitor
export const seoMonitor = new SEOMonitor();

// React hook for SEO monitoring
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useSEOMonitoring() {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    seoMonitor.trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  return {
    trackBusinessGoal: seoMonitor.trackBusinessGoal.bind(seoMonitor),
    trackSearch: seoMonitor.trackSearch.bind(seoMonitor),
    getMetrics: seoMonitor.getMetrics.bind(seoMonitor)
  };
}

export default seoMonitor;