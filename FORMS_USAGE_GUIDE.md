# Reusable Form Components Documentation

## Overview

This documentation provides examples of how to use the reusable `LicenseForm` and `PartnershipForm` components anywhere in your application. These components were extracted from the `PartnersPage` to make them modular and reusable across the entire application.

## 🎯 Available Components

### 1. LicenseForm Component
**Purpose**: Collect license request information from users
**Location**: `src/components/forms/LicenseForm.tsx`

### 2. PartnershipForm Component  
**Purpose**: Collect partnership application information from users
**Location**: `src/components/forms/PartnershipForm.tsx`

---

## 📚 Usage Examples

### Basic Import

```typescript
import { 
  LicenseForm, 
  PartnershipForm,
  useLicenseForm,
  usePartnershipForm,
  type LicenseFormData,
  type PartnershipFormData
} from '@/components/forms';
```

### Example 1: Simple Modal Usage (as used in PartnersPage)

```typescript
import React, { useState } from 'react';
import { LicenseForm, PartnershipForm, type LicenseFormData, type PartnershipFormData } from '@/components/forms';

const MyPage: React.FC = () => {
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  const handleLicenseSubmit = (formData: LicenseFormData) => {
    console.log('License request:', formData);
    // Process the license request
    setShowLicenseModal(false);
  };

  const handlePartnerSubmit = (formData: PartnershipFormData) => {
    console.log('Partnership application:', formData);
    // Process the partnership application
    setShowPartnerModal(false);
  };

  return (
    <div>
      <button onClick={() => setShowLicenseModal(true)}>
        Request License
      </button>
      <button onClick={() => setShowPartnerModal(true)}>
        Become Partner
      </button>

      {showLicenseModal && (
        <LicenseForm
          onSubmit={handleLicenseSubmit}
          onClose={() => setShowLicenseModal(false)}
        />
      )}

      {showPartnerModal && (
        <PartnershipForm
          onSubmit={handlePartnerSubmit}
          onClose={() => setShowPartnerModal(false)}
        />
      )}
    </div>
  );
};
```

### Example 2: Embedded Form (Non-Modal)

```typescript
import React from 'react';
import { LicenseForm, type LicenseFormData } from '@/components/forms';

const ContactPage: React.FC = () => {
  const handleLicenseSubmit = (formData: LicenseFormData) => {
    // Send to API
    fetch('/api/license-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1>Request Your Free License</h1>
      
      <LicenseForm
        onSubmit={handleLicenseSubmit}
        isModal={false}
        showHeader={false}
        className="bg-white rounded-lg shadow-lg"
      />
    </div>
  );
};
```

### Example 3: Custom Configuration

```typescript
import React from 'react';
import { PartnershipForm, type PartnershipFormData } from '@/components/forms';

const CustomPartnerForm: React.FC = () => {
  const handleSubmit = (data: PartnershipFormData) => {
    // Custom submission logic
    console.log('Custom partner submission:', data);
  };

  return (
    <PartnershipForm
      onSubmit={handleSubmit}
      isModal={false}
      title="Join Our Partner Network"
      submitButtonText="Apply Now"
      showRecaptcha={false}
      showPrivacyPolicy={false}
      preSelectedPartnerType="Reseller"
      className="my-custom-form-styles"
    />
  );
};
```

### Example 4: Using Custom Hooks

```typescript
import React from 'react';
import { useLicenseForm, usePartnershipForm } from '@/components/forms';

const CustomFormExample: React.FC = () => {
  // Use the custom hooks for form state management
  const licenseForm = useLicenseForm({ 
    usage: 'business',
    company: 'Pre-filled Company Name' 
  });
  
  const partnerForm = usePartnershipForm({
    partnerType: 'ITAD'
  });

  const handleLicenseSubmit = () => {
    if (licenseForm.validate()) {
      console.log('Valid license form:', licenseForm.formData);
      // Submit the form
      licenseForm.submit((data) => {
        // Handle submission
        console.log('Submitting:', data);
      });
    }
  };

  return (
    <div>
      {/* Custom form implementation using the hooks */}
      <form onSubmit={(e) => { e.preventDefault(); handleLicenseSubmit(); }}>
        <input
          name="fullName"
          value={licenseForm.formData.fullName}
          onChange={licenseForm.handleInputChange}
          placeholder="Full Name"
        />
        {licenseForm.errors.fullName && (
          <span className="error">{licenseForm.errors.fullName}</span>
        )}
        
        <button type="submit">Submit License Request</button>
      </form>
    </div>
  );
};
```

### Example 5: Integration with EmailJS

```typescript
import React from 'react';
import emailjs from '@emailjs/browser';
import { LicenseForm, type LicenseFormData } from '@/components/forms';

const EmailIntegrationExample: React.FC = () => {
  const handleLicenseSubmit = async (formData: LicenseFormData) => {
    try {
      const templateParams = {
        to_email: 'license@dsecure.com',
        from_name: formData.fullName,
        from_email: formData.email,
        company: formData.company,
        message: `
          License Request Details:
          - Usage: ${formData.usage}
          - Company: ${formData.company}
          - Country: ${formData.country}
          - Devices: ${formData.deviceCount}
          - Requirements: ${formData.requirements}
        `
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID', 
        templateParams,
        'YOUR_PUBLIC_KEY'
      );

      alert('License request sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send license request. Please try again.');
    }
  };

  return (
    <LicenseForm onSubmit={handleLicenseSubmit} />
  );
};
```

---

## 🔧 Component Props

### LicenseForm Props

```typescript
interface LicenseFormProps {
  onSubmit: (formData: LicenseFormData) => void;
  onClose?: () => void;
  isModal?: boolean;               // Default: true
  className?: string;
  title?: string;                  // Default: "Request Free License"
  showHeader?: boolean;            // Default: true
  showRecaptcha?: boolean;         // Default: true
  showPrivacyPolicy?: boolean;     // Default: true
  submitButtonText?: string;       // Default: "Request Free License"
}
```

### PartnershipForm Props

```typescript
interface PartnershipFormProps {
  onSubmit: (formData: PartnershipFormData) => void;
  onClose?: () => void;
  isModal?: boolean;               // Default: true
  className?: string;
  title?: string;                  // Default: "Become Our Partner Today!"
  showHeader?: boolean;            // Default: true
  showRecaptcha?: boolean;         // Default: true
  showPrivacyPolicy?: boolean;     // Default: true
  submitButtonText?: string;       // Default: "Submit"
  preSelectedPartnerType?: string; // Pre-select partner type
}
```

---

## 📊 Form Data Types

### LicenseFormData

```typescript
interface LicenseFormData {
  usage: 'business' | 'personal';
  fullName: string;
  email: string;
  phone: string;
  businessType: string;
  company: string;
  country: string;
  compliance: string;
  eraseOption: string;
  deviceCount: string;
  requirements: string;
}
```

### PartnershipFormData

```typescript
interface PartnershipFormData {
  fullName: string;
  businessEmail: string;
  phoneNo: string;
  companyName: string;
  website: string;
  country: string;
  partnerType: string;
  businessDescription: string;
}
```

---

## 🎨 Styling & Customization

### CSS Classes Used
- The components use Tailwind CSS classes
- Brand colors: `brand`, `brand-600` (can be customized in your theme)
- Responsive design with `md:` and `lg:` breakpoints
- Error states with red colors for validation

### Custom Styling Example

```typescript
<LicenseForm
  className="my-custom-form"
  onSubmit={handleSubmit}
/>
```

```css
.my-custom-form {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.my-custom-form input,
.my-custom-form select,
.my-custom-form textarea {
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.my-custom-form input:focus,
.my-custom-form select:focus,
.my-custom-form textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

---

## 🔐 Validation

Both forms come with built-in validation rules:

- **Required fields**: Full name, email, company, etc.
- **Email validation**: Proper email format checking
- **Phone validation**: Basic phone number validation
- **Minimum length**: Business description (50 chars), Requirements (20 chars)
- **URL validation**: Website field validation

### Custom Validation Example

```typescript
import { useLicenseForm, validationRules } from '@/components/forms';

const customValidationRules = {
  fullName: [validationRules.required('Full Name'), validationRules.minLength(3)],
  email: [validationRules.required('Email'), validationRules.email()],
  company: [validationRules.required('Company'), validationRules.minLength(2)]
};

const MyComponent = () => {
  const licenseForm = useLicenseForm();
  
  const handleSubmit = () => {
    const isValid = licenseForm.validateForm(customValidationRules);
    if (isValid) {
      // Process form
    }
  };
};
```

---

## 🚀 Best Practices

1. **Always handle onSubmit**: Process the form data appropriately
2. **Provide onClose for modals**: Allow users to close the modal
3. **Custom validation**: Add your own validation rules as needed
4. **Error handling**: Handle submission errors gracefully
5. **Loading states**: Consider adding loading indicators during submission
6. **Accessibility**: The forms are built with accessibility in mind, maintain this when customizing

---

## 📱 Mobile Responsiveness

Both forms are fully responsive and work well on:
- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1023px)  
- ✅ Mobile (320px - 767px)

The forms automatically adjust their layout using CSS Grid and Flexbox.

---

## 🔄 Integration Patterns

### With State Management (Redux/Zustand)

```typescript
import { useDispatch } from 'react-redux';
import { submitLicenseRequest } from '@/store/slices/licenseSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  
  const handleLicenseSubmit = (formData: LicenseFormData) => {
    dispatch(submitLicenseRequest(formData));
  };

  return <LicenseForm onSubmit={handleLicenseSubmit} />;
};
```

### With React Query

```typescript
import { useMutation } from '@tanstack/react-query';
import { LicenseForm, type LicenseFormData } from '@/components/forms';

const MyComponent = () => {
  const mutation = useMutation({
    mutationFn: (data: LicenseFormData) => 
      fetch('/api/license', { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => alert('Success!'),
    onError: (error) => alert('Error: ' + error.message)
  });

  return (
    <LicenseForm onSubmit={(data) => mutation.mutate(data)} />
  );
};
```

This documentation covers all the ways you can use these reusable form components throughout your application! 🎉