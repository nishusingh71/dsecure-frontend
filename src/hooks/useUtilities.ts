import { useState, useCallback, useEffect } from 'react';

// Extend Window interface to include grecaptcha
declare global {
  interface Window {
    grecaptcha?: {
      execute: () => void;
    };
  }
}

// reCAPTCHA hook for handling Google reCAPTCHA verification
export function useRecaptcha() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset verification state
  const resetVerification = useCallback(() => {
    setIsVerified(false);
    setError(null);
  }, []);

  // Handle reCAPTCHA verification
  const handleVerification = useCallback((token: string | null) => {
    if (token) {
      setIsVerified(true);
      setError(null);
    } else {
      setIsVerified(false);
      setError('reCAPTCHA verification failed');
    }
    setIsLoading(false);
  }, []);

  // Execute reCAPTCHA
  const executeRecaptcha = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    if (typeof window !== 'undefined' && window.grecaptcha) {
      try {
        window.grecaptcha.execute();
      } catch (err) {
        setError('Failed to execute reCAPTCHA');
        setIsLoading(false);
      }
    } else {
      setError('reCAPTCHA not loaded');
      setIsLoading(false);
    }
  }, []);

  return {
    isVerified,
    isLoading,
    error,
    resetVerification,
    handleVerification,
    executeRecaptcha
  };
}

// Local storage hook for persisting data
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

// Debounce hook for optimizing search and input handling
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Async operation hook
export function useAsync<T>() {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await asyncFunction();
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    execute,
    reset
  };
}