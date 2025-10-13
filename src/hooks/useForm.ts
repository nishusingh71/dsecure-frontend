import { useState, useCallback } from 'react';

// Generic form hook for handling form state and validation
export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback((field: keyof T, value: T[keyof T]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    setErrors(prev => {
      if (prev[field]) {
        return {
          ...prev,
          [field]: undefined
        };
      }
      return prev;
    });
  }, []); // Removed errors dependency to make callback more stable

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Filter phone number input to allow only numbers and formatting characters
    let filteredValue = value;
    if (name === 'phone' || name === 'phoneNo' || name.toLowerCase().includes('phone')) {
      // Allow digits, +, spaces, hyphens, parentheses, and dots
      filteredValue = value.replace(/[^\d\+\s\-\(\)\.]/g, '');
    }
    
    updateField(name as keyof T, filteredValue as T[keyof T]);
  }, [updateField]);

  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  const validateField = useCallback((field: keyof T, value: T[keyof T], rules?: ValidationRule<T[keyof T]>[]) => {
    if (!rules) return '';
    
    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return '';
  }, []);

  const validateForm = useCallback((validationRules?: Partial<Record<keyof T, ValidationRule<T[keyof T]>[]>>) => {
    if (!validationRules) return true;
    
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const rules = validationRules[field as keyof T];
      if (rules) {
        const error = validateField(field as keyof T, formData[field as keyof T], rules);
        if (error) {
          newErrors[field as keyof T] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    updateField,
    handleInputChange,
    resetForm,
    validateForm,
    setErrors
  };
}

// Validation rule type
export type ValidationRule<T> = (value: T) => string | undefined;

// Common validation rules
export const validationRules = {
  required: <T>(fieldName: string): ValidationRule<T> => (value: T) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} is required`;
    }
  },
  
  email: (): ValidationRule<string> => (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
  },
  
  phone: (): ValidationRule<string> => (value: string) => {
    if (!value) return; // Allow empty for optional fields
    
    // Remove all non-digit characters except + for country code
    const cleanPhone = value.replace(/[\s\-\(\)\.]/g, '');
    
    // Check if it contains only digits and optionally starts with +
    const phoneRegex = /^[\+]?[0-9]{7,15}$/;
    
    if (!phoneRegex.test(cleanPhone)) {
      return 'Phone number should contain only numbers (7-15 digits)';
    }
    
    // Additional check for country code format
    if (cleanPhone.startsWith('+')) {
      const withoutPlus = cleanPhone.substring(1);
      if (withoutPlus.length < 7 || withoutPlus.length > 15) {
        return 'Phone number should be 7-15 digits after country code';
      }
    }
  },
  
  // New validation rule for numeric-only input
  numericOnly: (): ValidationRule<string> => (value: string) => {
    if (value && !/^[\+\d\s\-\(\)\.]*$/.test(value)) {
      return 'Only numbers, spaces, and phone formatting characters are allowed';
    }
  },
  
  url: (): ValidationRule<string> => (value: string) => {
    try {
      if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
        new URL(`https://${value}`);
      } else if (value) {
        new URL(value);
      }
    } catch {
      return 'Please enter a valid URL';
    }
  },
  
  minLength: (min: number): ValidationRule<string> => (value: string) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters long`;
    }
  },
  
  maxLength: (max: number): ValidationRule<string> => (value: string) => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters long`;
    }
  }
};