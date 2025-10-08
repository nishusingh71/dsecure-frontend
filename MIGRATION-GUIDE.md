# Quick Migration Script for Converting Forms

## Before (Old Way)
```tsx
// OLD FORM SUBMISSION CODE
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/dhruv.rai@dsecuretech.com';

const sendEmail = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validate required fields
  if (!formData.name || !formData.email || !formData.message) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  try {
    const formSubmitData = new FormData();
    formSubmitData.append('name', formData.name);
    formSubmitData.append('email', formData.email);
    formSubmitData.append('company', formData.company);
    formSubmitData.append('phone', `${formData.countryCode} ${formData.phone}`);
    formSubmitData.append('country', formData.country);
    formSubmitData.append('businessType', formData.businessType);
    formSubmitData.append('solutionType', formData.solutionType);
    formSubmitData.append('complianceRequirements', formData.complianceRequirements);
    formSubmitData.append('message', formData.message);
    formSubmitData.append('usageType', usageType);
    
    // FormSubmit hidden fields for better functionality
    formSubmitData.append('_next', window.location.href);
    formSubmitData.append('_captcha', 'false');
    formSubmitData.append('_template', 'table');

    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      body: formSubmitData
    });

    if (response.ok) {
      showToast('Your query has been sent successfully! Our sales and tech team will resolve your query within 12 hours.', 'success');
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        countryCode: "+1",
        country: "United States",
        businessType: "",
        solutionType: "",
        complianceRequirements: "",
        message: "",
      });
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    showToast('Failed to send message. Please try again later.', 'error');
  }
};

const handleSubmit = (e: React.FormEvent) => {
  sendEmail(e);
};

const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  const { name, value } = e.target;
  
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
```

## After (New Way)
```tsx
// NEW REUSABLE FORM SYSTEM
import { useForm, validationRules } from '@/hooks/useForm';
import { useFormSubmission, formConfigs } from '@/hooks/useFormSubmission';

// 1. Define form data interface (same as before)
interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  countryCode: string;
  country: string;
  businessType: string;
  solutionType: string;
  complianceRequirements: string;
  message: string;
}

// 2. Use the reusable hooks
const {
  formData,
  errors,
  handleInputChange,  // Replaces your handleChange
  resetForm,
  validateForm
} = useForm<ContactFormData>({
  name: "",
  email: "",
  company: "",
  phone: "",
  countryCode: "+1",
  country: "United States",
  businessType: "",
  solutionType: "",
  complianceRequirements: "",
  message: "",
});

// 3. Setup form submission (replaces your sendEmail function)
const { isSubmitting, submitForm } = useFormSubmission(
  formConfigs.contact, // Pre-configured for contact forms
  resetForm
);

// 4. Handle form submission (much simpler)
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

// 5. In your JSX, replace onChange handlers
<input
  name="name"
  value={formData.name}
  onChange={handleInputChange} // Much simpler
  disabled={isSubmitting}       // Automatic loading state
/>
{errors.name && <span className="error">{errors.name}</span>} // Automatic error display

<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Sending...' : 'Send Message'}
</button>
```

## Key Benefits of Migration

✅ **90% Less Code**: From ~60 lines to ~6 lines for form submission  
✅ **Automatic Validation**: Built-in validation rules  
✅ **Consistent Behavior**: All forms work the same way  
✅ **Error Handling**: Automatic error states and messages  
✅ **Loading States**: Built-in submission states  
✅ **Toast Notifications**: Centralized success/error messages  
✅ **Type Safety**: Full TypeScript support  
✅ **Reusable**: Same system works for any form  

## Migration Steps

1. **Install the system** (already done):
   - `src/hooks/useForm.ts` 
   - `src/hooks/useFormSubmission.ts`
   - `src/utils/toast.ts`
   - `src/components/ToastProvider.tsx`

2. **Import the hooks**:
   ```tsx
   import { useForm, validationRules } from '@/hooks/useForm';
   import { useFormSubmission, formConfigs } from '@/hooks/useFormSubmission';
   ```

3. **Replace form state**:
   ```tsx
   // Old
   const [formData, setFormData] = useState({...});
   
   // New
   const { formData, handleInputChange, resetForm, validateForm } = useForm({...});
   ```

4. **Replace submission logic**:
   ```tsx
   // Old
   const sendEmail = async (e) => { /*  lines */ };
   
   // New
   const { isSubmitting, submitForm } = useFormSubmission(formConfigs.contact, resetForm);
   ```

5. **Update form JSX**:
   ```tsx
   // Replace onChange handlers
   onChange={handleInputChange}
   
   // Add loading states
   disabled={isSubmitting}
   
   // Add error display
   {errors.fieldName && <span>{errors.fieldName}</span>}
   ```

## Custom Configuration

If you need custom behavior, you can override any part:

```tsx
const { isSubmitting, submitForm } = useFormSubmission(
  {
    requiredFields: ['name', 'email', 'customField'],
    successMessage: 'Custom success message!',
    endpoint: 'https://formsubmit.co/custom@email.com',
    transformData: (data) => ({
      ...data,
      timestamp: new Date().toISOString(),
      source: 'website'
    }),
    onSuccess: (data) => {
      console.log('Custom success logic');
    }
  },
  resetForm
);
```

## Result

- **Before**: 60+ lines of repetitive code per form
- **After**: 6 lines of reusable code per form
- **Maintenance**: Update one place, affects all forms
- **Consistency**: All forms behave identically
- **Features**: Better UX with loading states, validation, and error handling