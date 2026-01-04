// Enhanced Google Analytics utility for DSecure
// Provides better tracking and event management

// Extend Window interface for Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface GAConfig {
  trackingId: string;
  debug?: boolean;
}

class GoogleAnalytics {
  private trackingId: string;
  private debug: boolean;
  private isInitialized: boolean = false;

  constructor(config: GAConfig) {
    this.trackingId = config.trackingId;
    this.debug = config.debug || false;
  }

  // Initialize Google Analytics
  init(): void {
    if (typeof window === 'undefined') return;

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', this.trackingId, {
      page_title: document.title,
      page_location: window.location.href,
      custom_parameter: 'dsecure_website'
    });

    this.isInitialized = true;

    if (this.debug) {
      //console.log('Google Analytics initialized with ID:', this.trackingId);
    }
  }

  // Track page views
  trackPageView(path: string, title?: string): void {
    if (!this.isInitialized || typeof window === 'undefined') return;

    const gtag = window.gtag;
    if (gtag) {
      gtag('config', this.trackingId, {
        page_path: path,
        page_title: title || document.title,
        page_location: window.location.href
      });

      if (this.debug) {
        //console.log('GA Page View:', path, title);
      }
    }
  }

  // Track custom events
  trackEvent(event: GAEvent): void {
    if (!this.isInitialized || typeof window === 'undefined') return;

    const gtag = window.gtag;
    if (gtag) {
      gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      });

      if (this.debug) {
        //console.log('GA Event:', event);
      }
    }
  }

  // Track business-specific events
  trackBusinessEvent(eventType: 'contact_form' | 'pricing_view' | 'product_interest' | 'demo_request' | 'download', details?: any): void {
    const eventMap = {
      contact_form: {
        action: 'form_submit',
        category: 'engagement',
        label: 'contact_form_submission'
      },
      pricing_view: {
        action: 'view_item',
        category: 'engagement',
        label: 'pricing_page_view'
      },
      product_interest: {
        action: 'select_content',
        category: 'engagement',
        label: details?.product || 'product_view'
      },
      demo_request: {
        action: 'generate_lead',
        category: 'conversion',
        label: 'demo_request'
      },
      download: {
        action: 'download',
        category: 'engagement',
        label: details?.resource || 'resource_download'
      }
    };

    const event = eventMap[eventType];
    if (event) {
      this.trackEvent({
        ...event,
        value: details?.value || 1
      });
    }
  }

  // Track user interactions
  trackUserInteraction(element: string, action: string): void {
    this.trackEvent({
      action: action,
      category: 'user_interaction',
      label: element
    });
  }

  // Track conversions
  trackConversion(type: 'signup' | 'purchase' | 'trial' | 'consultation', value?: number): void {
    this.trackEvent({
      action: 'conversion',
      category: 'conversion',
      label: type,
      value: value || 1
    });
  }

  // Track search within site
  trackSiteSearch(query: string, page?: string): void {
    this.trackEvent({
      action: 'search',
      category: 'site_search',
      label: query
    });
  }
}

import { ENV } from '../config/env';

// Initialize GA instance
export const ga = new GoogleAnalytics({
  trackingId: ENV.GA4_ID, // Your actual GA4 ID
  debug: ENV.DEBUG
});

// React hook for GA tracking
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useGoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on first load
    ga.init();
  }, []);

  useEffect(() => {
    // Track page views on route changes
    ga.trackPageView(location.pathname + location.search);
  }, [location]);

  return {
    trackEvent: ga.trackEvent.bind(ga),
    trackBusinessEvent: ga.trackBusinessEvent.bind(ga),
    trackUserInteraction: ga.trackUserInteraction.bind(ga),
    trackConversion: ga.trackConversion.bind(ga),
    trackSiteSearch: ga.trackSiteSearch.bind(ga)
  };
}

export default ga;