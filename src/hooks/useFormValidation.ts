/**
 * useFormValidation Hook
 * 
 * High-performance form validation hook with debounced validation.
 * Validates fields without blocking UI or causing performance issues.
 * 
 * @example
 * ```tsx
 * const { errors, validate, validateField, isValidating } = useFormValidation({
 *   email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email',
 *   name: (value) => value.length >= 2 ? '' : 'Name must be at least 2 characters'
 * });
 * ```
 */

import { useState, useCallback, useRef } from 'react';
import { useDebounceEffect } from './useDebounce';

export type ValidationRule<T = any> = (value: T) => string | Promise<string>;
export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>;
};
export type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

interface UseFormValidationOptions {
  /** Debounce delay for validation (default: 300ms) */
  debounceMs?: number;
  /** Validate on mount */
  validateOnMount?: boolean;
  /** Validate on field blur */
  validateOnBlur?: boolean;
  /** Validate on field change */
  validateOnChange?: boolean;
}

export function useFormValidation<T extends Record<string, any>>(
  rules: ValidationRules<T>,
  options: UseFormValidationOptions = {}
) {
  const {
    debounceMs = 300,
    validateOnMount = false,
    validateOnBlur = true,
    validateOnChange = true,
  } = options;

  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [isValidating, setIsValidating] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<keyof T>>(new Set());
  const validationTimeouts = useRef<Map<keyof T, NodeJS.Timeout>>(new Map());

  /**
   * Validate a single field
   */
  const validateField = useCallback(
    async (fieldName: keyof T, value: any): Promise<string> => {
      const rule = rules[fieldName];
      if (!rule) return '';

      try {
        const error = await Promise.resolve(rule(value));
        return error || '';
      } catch (err) {
        console.error(`Validation error for ${String(fieldName)}:`, err);
        return 'Validation error';
      }
    },
    [rules]
  );

  /**
   * Validate a single field with debounce (for onChange)
   */
  const validateFieldDebounced = useCallback(
    (fieldName: keyof T, value: any) => {
      // Clear existing timeout for this field
      const existingTimeout = validationTimeouts.current.get(fieldName);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      // Set new timeout
      const timeoutId = setTimeout(async () => {
        setIsValidating(true);
        const error = await validateField(fieldName, value);
        setErrors((prev) => ({
          ...prev,
          [fieldName]: error,
        }));
        setIsValidating(false);
      }, debounceMs);

      validationTimeouts.current.set(fieldName, timeoutId);
    },
    [validateField, debounceMs]
  );

  /**
   * Validate a single field immediately (for onBlur)
   */
  const validateFieldImmediate = useCallback(
    async (fieldName: keyof T, value: any) => {
      // Cancel any pending debounced validation
      const existingTimeout = validationTimeouts.current.get(fieldName);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
        validationTimeouts.current.delete(fieldName);
      }

      setIsValidating(true);
      const error = await validateField(fieldName, value);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
      setIsValidating(false);
      return error;
    },
    [validateField]
  );

  /**
   * Validate all fields
   */
  const validate = useCallback(
    async (formData: T): Promise<boolean> => {
      setIsValidating(true);

      const validationPromises = Object.keys(rules).map(async (fieldName) => {
        const error = await validateField(fieldName as keyof T, formData[fieldName]);
        return { fieldName: fieldName as keyof T, error };
      });

      const results = await Promise.all(validationPromises);

      const newErrors = results.reduce((acc, { fieldName, error }) => {
        if (error) {
          acc[fieldName] = error;
        }
        return acc;
      }, {} as ValidationErrors<T>);

      setErrors(newErrors);
      setIsValidating(false);

      return Object.keys(newErrors).length === 0;
    },
    [rules, validateField]
  );

  /**
   * Handle field change
   */
  const handleChange = useCallback(
    (fieldName: keyof T, value: any) => {
      if (validateOnChange) {
        validateFieldDebounced(fieldName, value);
      }
    },
    [validateOnChange, validateFieldDebounced]
  );

  /**
   * Handle field blur
   */
  const handleBlur = useCallback(
    async (fieldName: keyof T, value: any) => {
      setTouchedFields((prev) => new Set(prev).add(fieldName));

      if (validateOnBlur) {
        await validateFieldImmediate(fieldName, value);
      }
    },
    [validateOnBlur, validateFieldImmediate]
  );

  /**
   * Clear errors for a field
   */
  const clearError = useCallback((fieldName: keyof T) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  /**
   * Clear all errors
   */
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  /**
   * Reset validation state
   */
  const reset = useCallback(() => {
    setErrors({});
    setTouchedFields(new Set());
    setIsValidating(false);
    validationTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    validationTimeouts.current.clear();
  }, []);

  /**
   * Get error for a field (only if touched)
   */
  const getFieldError = useCallback(
    (fieldName: keyof T): string | undefined => {
      return touchedFields.has(fieldName) ? errors[fieldName] : undefined;
    },
    [errors, touchedFields]
  );

  /**
   * Check if form is valid
   */
  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValidating,
    isValid,
    touchedFields,
    validate,
    validateField: validateFieldImmediate,
    handleChange,
    handleBlur,
    clearError,
    clearErrors,
    reset,
    getFieldError,
  };
}

/**
 * Common validation rules
 */
export const validationRules = {
  required: (fieldName: string) => (value: any) =>
    value && value.toString().trim() ? '' : `${fieldName} is required`,

  email: (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address',

  minLength: (min: number, fieldName: string) => (value: string) =>
    value.length >= min ? '' : `${fieldName} must be at least ${min} characters`,

  maxLength: (max: number, fieldName: string) => (value: string) =>
    value.length <= max ? '' : `${fieldName} must be at most ${max} characters`,

  phone: (value: string) =>
    /^[\d\s\-\+\(\)]+$/.test(value) ? '' : 'Please enter a valid phone number',

  url: (value: string) =>
    /^https?:\/\/.+/.test(value) ? '' : 'Please enter a valid URL',

  pattern: (pattern: RegExp, message: string) => (value: string) =>
    pattern.test(value) ? '' : message,

  custom: <T,>(validator: (value: T) => boolean, message: string) => (value: T) =>
    validator(value) ? '' : message,

  async: <T,>(
    validator: (value: T) => Promise<boolean>,
    message: string
  ) => async (value: T) =>
    (await validator(value)) ? '' : message,
};
