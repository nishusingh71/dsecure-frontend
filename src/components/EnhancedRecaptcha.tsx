/**
 * Enhanced reCAPTCHA Component with proper error handling
 * Fixes all reCAPTCHA integration issues across the application
 */

import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

interface ReCaptchaAPI {
  render: (container: string | Element, parameters: any) => number;
  reset: (widgetId?: number) => void;
  getResponse: (widgetId?: number) => string;
  execute: (widgetId?: number) => void;
  ready: (callback: () => void) => void;
}

// Use module augmentation to avoid conflicts
declare global {
  interface Window {
    grecaptcha?: ReCaptchaAPI;
    recaptchaLoaded?: () => void;
  }
}

interface RecaptchaProps {
  siteKey?: string;
  onChange: (token: string | null) => void;
  onExpired?: () => void;
  onError?: (error: any) => void;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal' | 'invisible';
  tabIndex?: number;
  className?: string;
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeaRecrAAAAAAQ3VJxPTY6bfUzF3CP4PwfDFAvh';

export const EnhancedRecaptcha: React.FC<RecaptchaProps> = ({
  siteKey = RECAPTCHA_SITE_KEY,
  onChange,
  onExpired,
  onError,
  theme = 'light',
  size = 'normal',
  tabIndex = 0,
  className = ''
}) => {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const [widgetId, setWidgetId] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load reCAPTCHA script
  useEffect(() => {
    const loadRecaptcha = () => {
      // Check if already loaded
      if (window.grecaptcha) {
        setIsLoaded(true);
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?onload=recaptchaLoaded&render=explicit';
      script.async = true;
      script.defer = true;

      // Global callback for when reCAPTCHA is loaded
      window.recaptchaLoaded = () => {
        setIsLoaded(true);
      };

      script.onerror = () => {
        setError('Failed to load reCAPTCHA');
        if (onError) onError('Failed to load reCAPTCHA');
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
        delete window.recaptchaLoaded;
      };
    };

    loadRecaptcha();
  }, [onError]);

  // Initialize reCAPTCHA widget when loaded
  useEffect(() => {
    if (!isLoaded || !recaptchaRef.current || widgetId !== null || !window.grecaptcha) return;

    try {
      window.grecaptcha.ready(() => {
        if (recaptchaRef.current && widgetId === null && window.grecaptcha) {
          const id = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              onChange(token);
            },
            'expired-callback': () => {
              onChange(null);
              if (onExpired) onExpired();
            },
            'error-callback': (error: any) => {
              setError('reCAPTCHA error occurred');
              onChange(null);
              if (onError) onError(error);
            },
            theme,
            size,
            tabindex: tabIndex
          });
          setWidgetId(id);
        }
      });
    } catch (err) {
      setError('Failed to initialize reCAPTCHA');
      if (onError) onError(err);
    }
  }, [isLoaded, siteKey, onChange, onExpired, onError, theme, size, tabIndex, widgetId]);

  // Reset function
  const reset = () => {
    if (widgetId !== null && window.grecaptcha) {
      try {
        window.grecaptcha.reset(widgetId);
        onChange(null);
      } catch (err) {
        console.error('Failed to reset reCAPTCHA:', err);
      }
    }
  };

  // Get response function
  const getResponse = (): string => {
    if (widgetId !== null && window.grecaptcha) {
      try {
        return window.grecaptcha.getResponse(widgetId);
      } catch (err) {
        console.error('Failed to get reCAPTCHA response:', err);
      }
    }
    return '';
  };

  if (error) {
    return (
      <div className={`recaptcha-error p-3 border border-red-300 bg-red-50 rounded text-red-700 text-sm ${className}`}>
        <p>⚠️ {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-xs underline hover:no-underline"
        >
          Reload page to retry
        </button>
      </div>
    );
  }

  return (
    <div className={`recaptcha-container ${className}`}>
      <div ref={recaptchaRef}></div>
      {!isLoaded && (
        <div className="flex items-center justify-center p-4 bg-gray-100 rounded">
          <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Loading verification...</span>
        </div>
      )}
    </div>
  );
};

// Hook for managing reCAPTCHA state
export const useRecaptcha = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onRecaptchaChange = (token: string | null) => {
    setToken(token);
    setIsVerified(!!token);
    if (token) setError(null);
  };

  const onRecaptchaExpired = () => {
    setToken(null);
    setIsVerified(false);
    setError('reCAPTCHA verification expired. Please verify again.');
  };

  const onRecaptchaError = (error: any) => {
    setToken(null);
    setIsVerified(false);
    setError('reCAPTCHA verification failed. Please try again.');
    console.error('reCAPTCHA error:', error);
  };

  const reset = () => {
    setToken(null);
    setIsVerified(false);
    setError(null);
  };

  return {
    isVerified,
    token,
    error,
    onRecaptchaChange,
    onRecaptchaExpired,
    onRecaptchaError,
    reset
  };
};

export default EnhancedRecaptcha;