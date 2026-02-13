import { useState } from 'react';
import { showToast } from '@/utils/toast';

// Types for form submission
export interface FormSubmissionConfig {
  endpoint?: string;
  requiredFields: string[];
  successMessage?: string;
  errorMessage?: string;
  resetFormAfterSubmit?: boolean;
  customValidation?: (data: Record<string, any>) => string | null;
  transformData?: (data: Record<string, any>) => Record<string, any>;
  onSuccess?: (data: Record<string, any>) => void;
  onError?: (error: Error) => void;
  redirectAfterSuccess?: string;
}

export interface UseFormSubmissionResult {
  isSubmitting: boolean;
  submitForm: (formData: Record<string, any>) => Promise<void>;
  resetForm: () => void;
}

// FIXED: Single FormSubmit endpoint for all forms
const DEFAULT_FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/dhruv.rai@D-Securetech.com';

/**
 * Custom hook for form submission with FormSubmit.co
 * Works with any form data structure and can be used with the useForm hook
 * @param config Configuration object for form submission
 * @param resetFormCallback Optional callback to reset the form (from useForm hook)
 * @returns Object with submission handlers and state
 */
export const useFormSubmission = (
  config: FormSubmissionConfig,
  resetFormCallback?: () => void
): UseFormSubmissionResult => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (data: Record<string, any>): string | null => {
    // Check required fields with better validation
    for (const field of config.requiredFields) {
      const value = data[field];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        const fieldName = field.replace(/([A-Z])/g, ' $1').toLowerCase();
        return `Please fill in the ${fieldName} field.`;
      }
    }

    // Email validation for email fields
    if (data.email && typeof data.email === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        return 'Please enter a valid email address.';
      }
    }

    // Phone validation for phone fields  
    if (data.phone && typeof data.phone === 'string') {
      const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        return 'Please enter a valid phone number.';
      }
    }

    // Custom validation
    if (config.customValidation) {
      return config.customValidation(data);
    }

    return null;
  };

  const prepareFormData = (data: Record<string, any>): FormData => {
    const formSubmitData = new FormData();

    // Transform data if transformer is provided
    const transformedData = config.transformData ? config.transformData(data) : data;

    // Append all form fields
    Object.entries(transformedData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formSubmitData.append(key, String(value));
      }
    });

    // Add FormSubmit configuration for better delivery and formatting
    formSubmitData.append('_next', window.location.href); // Redirect back to same page
    formSubmitData.append('_captcha', 'false'); // Disable built-in captcha
    formSubmitData.append('_template', 'table'); // Use table format for email
    formSubmitData.append('_subject', `New Form Submission from ${document.title} - D-Secure Tech`);
    formSubmitData.append('_autoresponse', 'Thank you for contacting D-Secure Tech! We have received your submission and will get back to you soon.');
    formSubmitData.append('_cc', ''); // No CC emails
    formSubmitData.append('_bcc', ''); // No BCC emails
    
    // Add metadata for tracking
    formSubmitData.append('timestamp', new Date().toISOString());
    formSubmitData.append('userAgent', navigator.userAgent);
    formSubmitData.append('referrer', document.referrer || 'Direct');
    formSubmitData.append('currentURL', window.location.href);

    return formSubmitData;
  };

  const submitForm = async (formData: Record<string, any>): Promise<void> => {
    // Validate form
    const validationError = validateForm(formData);
    if (validationError) {
      showToast(validationError, 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const formSubmitData = prepareFormData(formData);
      const endpoint = config.endpoint || DEFAULT_FORMSUBMIT_ENDPOINT;

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formSubmitData
      });

      if (response.ok) {
        const successMessage = config.successMessage || 
          'Your message has been sent successfully! Our team will get back to you within 24 hours.';
        
        showToast(successMessage, 'success');

        // Reset form if configured to do so and callback is provided
        if (config.resetFormAfterSubmit !== false && resetFormCallback) {
          resetFormCallback();
        }

        // Redirect if configured
        if (config.redirectAfterSuccess) {
          setTimeout(() => {
            window.location.href = config.redirectAfterSuccess!;
          }, 2000);
        }

        // Call success callback
        if (config.onSuccess) {
          config.onSuccess(formData);
        }
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = config.errorMessage || 
        'Failed to send message. Please try again later.';
      
      showToast(errorMessage, 'error');

      // Call error callback
      if (config.onError) {
        config.onError(error as Error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    if (resetFormCallback) {
      resetFormCallback();
    }
  };

  return {
    isSubmitting,
    submitForm,
    resetForm
  };
};

// Utility function for common form data transformations
export const formDataTransformers = {
  // Combine country code and phone number
  combinePhoneNumber: (data: Record<string, any>) => ({
    ...data,
    phone: data.countryCode && data.phone ? `${data.countryCode} ${data.phone}` : data.phone
  }),

  // Add timestamp
  addTimestamp: (data: Record<string, any>) => ({
    ...data,
    timestamp: new Date().toISOString(),
    submissionDate: new Date().toLocaleString()
  }),

  // Clean empty fields
  removeEmptyFields: (data: Record<string, any>) => {
    const cleaned = { ...data };
    Object.keys(cleaned).forEach(key => {
      if (cleaned[key] === '' || cleaned[key] === null || cleaned[key] === undefined) {
        delete cleaned[key];
      }
    });
    return cleaned;
  }
};

// Pre-configured form submission configs for common use cases
export const formConfigs = {
  // Contact form configuration
  contact: {
    requiredFields: ['name', 'email', 'message'],
    successMessage: 'Your query has been sent successfully! Our sales and tech team will resolve your query within 12 hours.',
    transformData: (data: Record<string, any>) => 
      formDataTransformers.addTimestamp(
        formDataTransformers.combinePhoneNumber(
          formDataTransformers.removeEmptyFields(data)
        )
      )
  },

  // Partnership form configuration
  partnership: {
    requiredFields: ['fullName', 'businessEmail', 'companyName', 'partnerType'],
    successMessage: 'Partner application submitted successfully! We will contact you soon.',
    transformData: (data: Record<string, any>) => 
      formDataTransformers.addTimestamp(
        formDataTransformers.removeEmptyFields(data)
      )
  },

  // License request form configuration
  license: {
    requiredFields: ['fullName', 'email', 'company', 'usage'],
    successMessage: 'Free license request submitted successfully! We will send you the license details soon.',
    transformData: (data: Record<string, any>) => 
      formDataTransformers.addTimestamp(
        formDataTransformers.removeEmptyFields(data)
      )
  },

  // Newsletter subscription
  newsletter: {
    requiredFields: ['email'],
    successMessage: 'Successfully subscribed to our newsletter!',
    resetFormAfterSubmit: true
  },

  // Support ticket
  support: {
    requiredFields: ['name', 'email', 'subject', 'description'],
    successMessage: 'Support ticket created successfully! We will respond within 24 hours.',
    transformData: (data: Record<string, any>) => ({
      ...formDataTransformers.addTimestamp(data),
      priority: data.priority || 'normal',
      category: data.category || 'general'
    })
  }
};

export default useFormSubmission;