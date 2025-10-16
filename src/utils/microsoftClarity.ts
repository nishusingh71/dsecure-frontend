// Microsoft Clarity Analytics utility for DSecure
// Provides user behavior tracking, heatmaps, and session recordings

interface ClarityConfig {
  projectId: string;
  debug?: boolean;
}

interface ClarityEvent {
  name: string;
  properties?: Record<string, any>;
}

class MicrosoftClarity {
  private projectId: string;
  private debug: boolean;
  private isInitialized: boolean = false;

  constructor(config: ClarityConfig) {
    this.projectId = config.projectId;
    this.debug = config.debug || false;
  }

  // Initialize Microsoft Clarity
  init(): void {
    if (typeof window === 'undefined') return;

    // Clarity initialization script
    (function(c: any, l: any, a: any, r: any, i: any, t: any, y: any) {
      c[a] = c[a] || function() {
        (c[a].q = c[a].q || []).push(arguments);
      };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", this.projectId, null, null);

    this.isInitialized = true;

    if (this.debug) {
      //console.log('Microsoft Clarity initialized with Project ID:', this.projectId);
    }
  }

  // Track custom events
  trackEvent(event: ClarityEvent): void {
    if (!this.isInitialized || typeof window === 'undefined') return;

    const clarity = (window as any).clarity;
    if (clarity) {
      if (event.properties) {
        clarity('event', event.name, event.properties);
      } else {
        clarity('event', event.name);
      }

      if (this.debug) {
        //console.log('Clarity Event:', event);
      }
    }
  }

  // Set user identifier
  setUserId(userId: string): void {
    if (!this.isInitialized || typeof window === 'undefined') return;

    const clarity = (window as any).clarity;
    if (clarity) {
      clarity('identify', userId);

      if (this.debug) {
        //console.log('Clarity User ID set:', userId);
      }
    }
  }

  // Set custom tags for better session organization
  setCustomTag(key: string, value: string): void {
    if (!this.isInitialized || typeof window === 'undefined') return;

    const clarity = (window as any).clarity;
    if (clarity) {
      clarity('set', key, value);

      if (this.debug) {
        //console.log('Clarity Custom Tag:', key, value);
      }
    }
  }

  // Track business-specific events for DSecure
  trackBusinessEvent(eventType: 'page_view' | 'form_interaction' | 'product_interest' | 'pricing_view' | 'demo_request' | 'download', details?: any): void {
    const eventMap = {
      page_view: {
        name: 'page_view',
        properties: {
          page: details?.page || window.location.pathname,
          title: details?.title || document.title
        }
      },
      form_interaction: {
        name: 'form_interaction',
        properties: {
          form_type: details?.formType || 'unknown',
          field: details?.field || 'unknown',
          action: details?.action || 'focus'
        }
      },
      product_interest: {
        name: 'product_interest',
        properties: {
          product: details?.product || 'unknown',
          section: details?.section || 'unknown'
        }
      },
      pricing_view: {
        name: 'pricing_view',
        properties: {
          plan: details?.plan || 'unknown',
          duration: details?.duration || 'monthly'
        }
      },
      demo_request: {
        name: 'demo_request',
        properties: {
          source: details?.source || 'unknown',
          company_size: details?.companySize || 'unknown'
        }
      },
      download: {
        name: 'resource_download',
        properties: {
          resource_type: details?.resourceType || 'unknown',
          resource_name: details?.resourceName || 'unknown'
        }
      }
    };

    const event = eventMap[eventType];
    if (event) {
      this.trackEvent(event);
    }
  }

  // Track user journey milestones
  trackMilestone(milestone: 'site_entry' | 'product_exploration' | 'pricing_interest' | 'contact_engagement' | 'conversion_start'): void {
    this.setCustomTag('user_milestone', milestone);
    this.trackEvent({
      name: 'milestone_reached',
      properties: {
        milestone: milestone,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Get session URL (useful for support)
  getSessionUrl(): Promise<string | null> {
    return new Promise((resolve) => {
      if (!this.isInitialized || typeof window === 'undefined') {
        resolve(null);
        return;
      }

      const clarity = (window as any).clarity;
      if (clarity) {
        clarity('getSessionUrl', (url: string) => {
          resolve(url);
        });
      } else {
        resolve(null);
      }
    });
  }

  // Track user behavior patterns
  trackUserBehavior(behaviorType: 'scroll_depth' | 'time_on_page' | 'click_pattern' | 'form_abandonment', data?: any): void {
    this.trackEvent({
      name: `user_behavior_${behaviorType}`,
      properties: {
        ...data,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      }
    });
  }
}

// Initialize Clarity instance
export const clarity = new MicrosoftClarity({
  projectId: 'tkbibktdah', // Your actual Clarity Project ID
  debug: import.meta.env.DEV
});

// React hook for Clarity tracking
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useMicrosoftClarity() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Clarity on first load
    clarity.init();
  }, []);

  useEffect(() => {
    // Track page views on route changes
    clarity.trackBusinessEvent('page_view', {
      page: location.pathname + location.search,
      title: document.title
    });
  }, [location]);

  return {
    trackEvent: clarity.trackEvent.bind(clarity),
    trackBusinessEvent: clarity.trackBusinessEvent.bind(clarity),
    trackMilestone: clarity.trackMilestone.bind(clarity),
    trackUserBehavior: clarity.trackUserBehavior.bind(clarity),
    setUserId: clarity.setUserId.bind(clarity),
    setCustomTag: clarity.setCustomTag.bind(clarity),
    getSessionUrl: clarity.getSessionUrl.bind(clarity)
  };
}

export default clarity;