/**
 * useAsyncFormSubmit Hook
 * 
 * Handles async form submission with loading states, error handling,
 * and automatic retry logic.
 * 
 * @example
 * ```tsx
 * const { submit, isSubmitting, error, reset } = useAsyncFormSubmit(async (data) => {
 *   const response = await fetch('/api/contact', {
 *     method: 'POST',
 *     body: JSON.stringify(data)
 *   });
 *   if (!response.ok) throw new Error('Submission failed');
 *   return response.json();
 * });
 * 
 * <form onSubmit={submit}>
 *   {error && <div className="error">{error}</div>}
 *   <button disabled={isSubmitting}>
 *     {isSubmitting ? 'Submitting...' : 'Submit'}
 *   </button>
 * </form>
 * ```
 */

import { useState, useCallback, useRef } from 'react';

interface UseAsyncFormSubmitOptions<T> {
  /** Called on successful submission */
  onSuccess?: (result: T) => void;
  /** Called on submission error */
  onError?: (error: Error) => void;
  /** Auto-retry on failure (default: false) */
  enableRetry?: boolean;
  /** Max retry attempts (default: 3) */
  maxRetries?: number;
  /** Delay between retries in ms (default: 1000) */
  retryDelay?: number;
  /** Reset form on success (default: false) */
  resetOnSuccess?: boolean;
  /** Validation function to run before submission */
  validate?: () => boolean | Promise<boolean>;
}

export function useAsyncFormSubmit<T = any, D = any>(
  submitFn: (data: D) => Promise<T>,
  options: UseAsyncFormSubmitOptions<T> = {}
) {
  const {
    onSuccess,
    onError,
    enableRetry = false,
    maxRetries = 3,
    retryDelay = 1000,
    resetOnSuccess = false,
    validate,
  } = options;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<T | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Submit with retry logic
   */
  const submitWithRetry = useCallback(
    async (data: D, attemptCount: number = 0): Promise<T> => {
      try {
        const result = await submitFn(data);
        return result;
      } catch (err) {
        if (enableRetry && attemptCount < maxRetries) {
          // Wait before retrying
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          return submitWithRetry(data, attemptCount + 1);
        }
        throw err;
      }
    },
    [submitFn, enableRetry, maxRetries, retryDelay]
  );

  /**
   * Main submit handler
   */
  const submit = useCallback(
    async (e?: React.FormEvent, data?: D) => {
      // Prevent default form submission
      if (e) {
        e.preventDefault();
      }

      // Don't submit if already submitting
      if (isSubmitting) {
        return;
      }

      // Run validation if provided
      if (validate) {
        try {
          const isValid = await Promise.resolve(validate());
          if (!isValid) {
            setError('Please fix validation errors before submitting');
            return;
          }
        } catch (err) {
          setError('Validation failed');
          return;
        }
      }

      // Create abort controller for this submission
      abortControllerRef.current = new AbortController();

      setIsSubmitting(true);
      setError(null);
      setRetryCount(0);

      try {
        const submissionData = data || ({} as D);
        const result = await submitWithRetry(submissionData);

        setResult(result);
        setError(null);

        if (onSuccess) {
          onSuccess(result);
        }

        if (resetOnSuccess) {
          setResult(null);
        }
      } catch (err: any) {
        const errorMessage =
          err.message || 'An error occurred during submission. Please try again.';
        setError(errorMessage);

        if (onError) {
          onError(err);
        }
      } finally {
        setIsSubmitting(false);
        abortControllerRef.current = null;
      }
    },
    [isSubmitting, validate, submitWithRetry, onSuccess, onError, resetOnSuccess]
  );

  /**
   * Cancel ongoing submission
   */
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsSubmitting(false);
  }, []);

  /**
   * Reset submission state
   */
  const reset = useCallback(() => {
    setIsSubmitting(false);
    setError(null);
    setResult(null);
    setRetryCount(0);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  return {
    /** Submit handler - call on form submit or button click */
    submit,
    /** Whether form is currently submitting */
    isSubmitting,
    /** Error message if submission failed */
    error,
    /** Result from successful submission */
    result,
    /** Current retry attempt number */
    retryCount,
    /** Cancel ongoing submission */
    cancel,
    /** Reset all submission state */
    reset,
    /** Set error manually */
    setError,
  };
}

/**
 * useFormState Hook
 * 
 * Manages form state with optimized change handlers.
 * 
 * @example
 * ```tsx
 * const { formData, handleChange, handleBlur, setFormData, reset } = useFormState({
 *   name: '',
 *   email: '',
 *   message: ''
 * });
 * 
 * <input
 *   name="email"
 *   value={formData.email}
 *   onChange={handleChange}
 *   onBlur={handleBlur}
 * />
 * ```
 */
export function useFormState<T extends Record<string, any>>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState);
  const [touchedFields, setTouchedFields] = useState<Set<keyof T>>(new Set());

  /**
   * Optimized change handler (memoized)
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]:
          type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    },
    []
  );

  /**
   * Blur handler to mark fields as touched
   */
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      setTouchedFields((prev) => new Set(prev).add(name as keyof T));
    },
    []
  );

  /**
   * Update specific field
   */
  const setField = useCallback((fieldName: keyof T, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }, []);

  /**
   * Reset form to initial state
   */
  const reset = useCallback(() => {
    setFormData(initialState);
    setTouchedFields(new Set());
  }, [initialState]);

  /**
   * Check if field has been touched
   */
  const isFieldTouched = useCallback(
    (fieldName: keyof T) => touchedFields.has(fieldName),
    [touchedFields]
  );

  return {
    formData,
    setFormData,
    handleChange,
    handleBlur,
    setField,
    reset,
    touchedFields,
    isFieldTouched,
  };
}
