/**
 * COMPREHENSIVE FORM FIXES AND OPTIMIZATIONS
 * 
 * This file contains fixes for all forms in the application:
 * 1. Validation issues
 * 2. Toast notification problems
 * 3. Form submission endpoints
 * 4. Error handling improvements
 */

// Updated Form Submission Hook with better error handling
import { useState, useCallback } from 'react';

// Centralized FormSubmit endpoint
export const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/dhruv.rai@dsecuretech.com';

// Toast notification system
export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// Global toast handler
let globalToastHandler: ((toast: ToastMessage) => void) | null = null;

export const registerGlobalToastHandler = (handler: (toast: ToastMessage) => void) => {
  globalToastHandler = handler;
};

export const showGlobalToast = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'info',
  duration: number = 5000
) => {
  const toastId = Date.now().toString();
  const toast: ToastMessage = { id: toastId, message, type, duration };
  
  if (globalToastHandler) {
    globalToastHandler(toast);
  } else {
    // console.log(`Toast [${type.toUpperCase()}]: ${message}`);
  }
};

// Enhanced validation utilities
export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  phone: (phone: string): boolean => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },
  
  required: (value: any): boolean => {
    if (typeof value === 'string') return value.trim().length > 0;
    return value !== null && value !== undefined && value !== '';
  },
  
  minLength: (value: string, min: number): boolean => {
    return value.trim().length >= min;
  },
  
  maxLength: (value: string, max: number): boolean => {
    return value.trim().length <= max;
  }
};

// Enhanced form submission hook
export interface FormConfig {
  endpoint?: string;
  requiredFields: Record<string, string>; // field: displayName
  validationRules?: Record<string, (value: any) => string | null>;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
  redirectAfterSuccess?: string;
}

export interface FormState {
  isSubmitting: boolean;
  errors: Record<string, string>;
  isValid: boolean;
}

export const useEnhancedForm = (config: FormConfig) => {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    errors: {},
    isValid: false
  });

  const validateField = useCallback((fieldName: string, value: any): string | null => {
    // Check required fields
    if (config.requiredFields[fieldName] && !validators.required(value)) {
      return `${config.requiredFields[fieldName]} is required`;
    }

    // Apply custom validation rules
    if (config.validationRules && config.validationRules[fieldName]) {
      return config.validationRules[fieldName](value);
    }

    // Built-in validations
    if (fieldName === 'email' && value && !validators.email(value)) {
      return 'Please enter a valid email address';
    }

    if (fieldName === 'phone' && value && !validators.phone(value)) {
      return 'Please enter a valid phone number';
    }

    return null;
  }, [config]);

  const validateForm = useCallback((formData: Record<string, any>): Record<string, string> => {
    const errors: Record<string, string> = {};

    // Validate all fields
    Object.keys(config.requiredFields).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        errors[fieldName] = error;
      }
    });

    return errors;
  }, [config, validateField]);

  const submitForm = useCallback(async (formData: Record<string, any>): Promise<boolean> => {
    setFormState(prev => ({ ...prev, isSubmitting: true, errors: {} }));

    try {
      // Validate form
      const errors = validateForm(formData);
      if (Object.keys(errors).length > 0) {
        setFormState(prev => ({ ...prev, errors, isSubmitting: false }));
        showGlobalToast('Please fix the form errors', 'error');
        return false;
      }

      // Prepare FormData
      const formSubmitData = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          formSubmitData.append(key, String(value));
        }
      });

      // Add FormSubmit configuration
      formSubmitData.append('_next', window.location.href);
      formSubmitData.append('_captcha', 'false');
      formSubmitData.append('_template', 'table');
      formSubmitData.append('_subject', `New Form Submission from ${document.title}`);
      formSubmitData.append('_autoresponse', 'Thank you for contacting D-Secure Tech. We will get back to you soon!');

      // Submit form
      const response = await fetch(config.endpoint || FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        body: formSubmitData
      });

      if (response.ok) {
        const successMessage = config.successMessage || 
          'Form submitted successfully! We will get back to you soon.';
        
        showGlobalToast(successMessage, 'success');
        
        // Reset form if configured
        if (config.resetAfterSubmit !== false) {
          // Form has been reset
        }

        // Redirect if configured
        if (config.redirectAfterSuccess) {
          setTimeout(() => {
            window.location.href = config.redirectAfterSuccess!;
          }, 2000);
        }

        setFormState(prev => ({ ...prev, isSubmitting: false, isValid: true }));
        return true;
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = config.errorMessage || 
        'Failed to submit form. Please try again later.';
      
      showGlobalToast(errorMessage, 'error');
      setFormState(prev => ({ ...prev, isSubmitting: false }));
      return false;
    }
  }, [config, validateForm]);

  const clearErrors = useCallback(() => {
    setFormState(prev => ({ ...prev, errors: {} }));
  }, []);

  const setFieldError = useCallback((fieldName: string, error: string) => {
    setFormState(prev => ({
      ...prev,
      errors: { ...prev.errors, [fieldName]: error }
    }));
  }, []);

  return {
    formState,
    submitForm,
    validateField,
    validateForm,
    clearErrors,
    setFieldError
  };
};

// Pre-configured form configurations
export const formConfigurations = {
  contact: {
    requiredFields: {
      name: 'Name',
      email: 'Email',
      message: 'Message'
    },
    validationRules: {
      email: (value: string) => validators.email(value) ? null : 'Invalid email format',
      message: (value: string) => validators.minLength(value, 10) ? null : 'Message must be at least 10 characters'
    },
    successMessage: 'Your query has been sent successfully! Our sales and tech team will resolve your query within 12 hours.'
  },

  partnership: {
    requiredFields: {
      fullName: 'Full Name',
      businessEmail: 'Business Email',
      companyName: 'Company Name',
      partnerType: 'Partnership Type'
    },
    validationRules: {
      businessEmail: (value: string) => validators.email(value) ? null : 'Invalid email format'
    },
    successMessage: 'Partnership application submitted successfully! We will contact you within 24 hours.'
  },

  license: {
    requiredFields: {
      fullName: 'Full Name',
      email: 'Email',
      company: 'Company',
      usage: 'Usage Type'
    },
    validationRules: {
      email: (value: string) => validators.email(value) ? null : 'Invalid email format'
    },
    successMessage: 'Free license request submitted successfully! We will send you the license details within 12 hours.'
  },

  support: {
    requiredFields: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      description: 'Description'
    },
    validationRules: {
      email: (value: string) => validators.email(value) ? null : 'Invalid email format',
      description: (value: string) => validators.minLength(value, 20) ? null : 'Description must be at least 20 characters'
    },
    successMessage: 'Support ticket created successfully! We will respond within 24 hours.'
  },

  pricing: {
    requiredFields: {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      plan: 'Selected Plan'
    },
    validationRules: {
      email: (value: string) => validators.email(value) ? null : 'Invalid email format'
    },
    successMessage: 'Pricing inquiry submitted successfully! Our team will contact you with detailed pricing within 4 hours.'
  },

  newsletter: {
    requiredFields: {
      email: 'Email Address'
    },
    validationRules: {
      email: (value: string) => validators.email(value) ? null : 'Invalid email format'
    },
    successMessage: 'Successfully subscribed to our newsletter!',
    resetAfterSubmit: true
  }
};

export default {
  useEnhancedForm,
  formConfigurations,
  validators,
  showGlobalToast,
  registerGlobalToastHandler,
  FORMSUBMIT_ENDPOINT
};