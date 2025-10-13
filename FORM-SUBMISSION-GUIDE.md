# Reusable Form Submission System

## Overview

This system provides a comprehensive, reusable solution for form handling and submission across the entire D-Secure application. It eliminates repetition and provides consistent form behavior throughout the site.

## Key Components

### 1. `useForm` Hook
Located: `src/hooks/useForm.ts`

Generic form state management with validation:
- Handles form data state
- Provides input change handlers
- Built-in validation system
- Error state management

### 2. `useFormSubmission` Hook
Located: `src/hooks/useFormSubmission.ts`

Handles form submission to FormSubmit.co:
- Configurable validation
- Data transformation
- Success/error handling
- Loading states
- Toast notifications

### 3. `Toast System`
Located: `src/utils/toast.ts` & `src/components/ToastProvider.tsx`

Centralized notification system:
- Success, error, warning, and info toasts
- Auto-dismiss functionality
- Consistent styling

## Quick Start

### Basic Form Setup

```tsx
import React from 'react';
import { useForm, validationRules } from '@/hooks/useForm';
import { useFormSubmission, formConfigs } from '@/hooks/useFormSubmission';

interface MyFormData {
  name: string;
  email: string;
  message: string;
}

const MyForm: React.FC = () => {
  // 1. Initialize form state
  const {
    formData,
    errors,
    handleInputChange,
    resetForm,
    validateForm
  } = useForm<MyFormData>({
    name: "",
    email: "",
    message: "",
  });

  // 2. Configure form submission
  const { isSubmitting, submitForm } = useFormSubmission(
    formConfigs.contact, // Use pre-configured contact form settings
    resetForm
  );

  // 3. Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const isValid = validateForm({
      name: [validationRules.required('Name')],
      email: [validationRules.required('Email'), validationRules.email()],
      message: [validationRules.required('Message')]
    });

    if (isValid) {
      await submitForm(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        disabled={isSubmitting}
      />
      {errors.name && <span className="error">{errors.name}</span>}
      
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        disabled={isSubmitting}
      />
      {errors.email && <span className="error">{errors.email}</span>}
      
      <textarea
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="Message"
        disabled={isSubmitting}
      />
      {errors.message && <span className="error">{errors.message}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};
```

## Pre-configured Form Types

The system includes pre-configured settings for common form types:

### Available Configurations

```tsx
import { formConfigs } from '@/hooks/useFormSubmission';

// Contact forms
formConfigs.contact

// Partnership applications
formConfigs.partnership

// License requests
formConfigs.license

// Newsletter subscriptions
formConfigs.newsletter

// Support tickets
formConfigs.support
```

## Custom Configuration

### Creating Custom Form Submission Config

```tsx
const customConfig = {
  endpoint: 'https://formsubmit.co/custom@email.com', // Optional, defaults to dhruv.rai@dsecuretech.com
  requiredFields: ['name', 'email', 'customField'],
  successMessage: 'Custom success message!',
  errorMessage: 'Custom error message!',
  resetFormAfterSubmit: true,
  redirectAfterSuccess: '/thank-you',
  customValidation: (data) => {
    if (data.customField.length < 5) {
      return 'Custom field must be at least 5 characters';
    }
    return null;
  },
  transformData: (data) => ({
    ...data,
    timestamp: new Date().toISOString(),
    source: 'website'
  }),
  onSuccess: (data) => {
    console.log('Form submitted:', data);
    // Custom success logic
  },
  onError: (error) => {
    console.error('Submission failed:', error);
    // Custom error handling
  }
};

const { isSubmitting, submitForm } = useFormSubmission(customConfig, resetForm);
```

## Data Transformers

Use built-in data transformers to modify form data before submission:

```tsx
import { formDataTransformers } from '@/hooks/useFormSubmission';

const config = {
  requiredFields: ['name', 'email'],
  transformData: (data) => 
    formDataTransformers.addTimestamp(
      formDataTransformers.combinePhoneNumber(
        formDataTransformers.removeEmptyFields(data)
      )
    )
};
```

### Available Transformers

- `combinePhoneNumber`: Combines `countryCode` and `phone` fields
- `addTimestamp`: Adds submission timestamp
- `removeEmptyFields`: Removes empty/null/undefined fields

## Validation Rules

Built-in validation rules for common use cases:

```tsx
import { validationRules } from '@/hooks/useForm';

const validation = {
  name: [validationRules.required('Name')],
  email: [
    validationRules.required('Email'),
    validationRules.email()
  ],
  phone: [validationRules.phone()],
  website: [validationRules.url()],
  password: [
    validationRules.required('Password'),
    validationRules.minLength(8)
  ],
  description: [
    validationRules.maxLength(500)
  ]
};
```

## Toast Notifications

### Setup Toast Provider

Add the ToastProvider to your app root:

```tsx
import { ToastProvider } from '@/components/ToastProvider';

function App() {
  return (
    <ToastProvider>
      {/* Your app content */}
    </ToastProvider>
  );
}
```

### Using Toast Manually

```tsx
import { showToast, showSuccessToast, showErrorToast } from '@/utils/toast';

// Basic usage
showToast('Message', 'success');

// Convenience methods
showSuccessToast('Operation successful!');
showErrorToast('Something went wrong!');

// With custom duration
showToast('This will show for 10 seconds', 'info', 10000);
```

## Migration Guide

### Updating Existing Forms

1. **Import the hooks**:
   ```tsx
   import { useForm, validationRules } from '@/hooks/useForm';
   import { useFormSubmission, formConfigs } from '@/hooks/useFormSubmission';
   ```

2. **Replace existing form state**:
   ```tsx
   // Old way
   const [formData, setFormData] = useState({...});
   const [errors, setErrors] = useState({});
   
   // New way
   const { formData, errors, handleInputChange, resetForm, validateForm } = useForm({...});
   ```

3. **Replace form submission logic**:
   ```tsx
   // Old way
   const handleSubmit = async (e) => {
     e.preventDefault();
     // Custom FormSubmit.co logic...
   };
   
   // New way
   const { isSubmitting, submitForm } = useFormSubmission(formConfigs.contact, resetForm);
   
   const handleSubmit = async (e) => {
     e.preventDefault();
     const isValid = validateForm({...});
     if (isValid) await submitForm(formData);
   };
   ```

4. **Update form JSX**:
   ```tsx
   // Replace manual onChange handlers
   onChange={handleInputChange}
   
   // Add error display
   {errors.fieldName && <span className="error">{errors.fieldName}</span>}
   
   // Update submit button
   disabled={isSubmitting}
   {isSubmitting ? 'Sending...' : 'Send'}
   ```

## Benefits

✅ **Consistent**: All forms behave the same way across the site  
✅ **DRY**: No repeated form submission logic  
✅ **Type Safe**: Full TypeScript support  
✅ **Flexible**: Easy to customize for different use cases  
✅ **Maintainable**: Centralized configuration and updates  
✅ **User Friendly**: Built-in loading states and error handling  
✅ **Accessible**: Proper error states and validation feedback  

## Examples

See `src/examples/FormUsageExamples.tsx` for complete working examples of:
- Contact forms
- Partnership applications
- Newsletter subscriptions
- Custom form configurations

## Best Practices

1. **Always use validation** for required fields
2. **Use pre-configured form types** when possible
3. **Provide meaningful error messages** in validation
4. **Test form submissions** in development
5. **Handle loading states** in UI
6. **Use data transformers** to clean/format data before submission
7. **Add ToastProvider** to your app root for notifications