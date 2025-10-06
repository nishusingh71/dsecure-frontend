import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, validationRules } from '@/hooks';
import { FormField } from '@/components/ui';

// Partnership form data type
export interface PartnershipFormData {
  fullName: string;
  businessEmail: string;
  phoneNo: string;
  companyName: string;
  website: string;
  country: string;
  partnerType: string;
  businessDescription: string;
}

// Props for the PartnershipForm component
export interface PartnershipFormProps {
  onSubmit: (formData: PartnershipFormData) => void;
  onClose?: () => void;
  isModal?: boolean;
  className?: string;
  title?: string;
  showHeader?: boolean;
  showRecaptcha?: boolean;
  showPrivacyPolicy?: boolean;
  submitButtonText?: string;
  preSelectedPartnerType?: string;
}

// Default initial values for the partnership form
export const defaultPartnershipFormData: PartnershipFormData = {
  fullName: '',
  businessEmail: '',
  phoneNo: '',
  companyName: '',
  website: '',
  country: '',
  partnerType: 'ITAD Partner',
  businessDescription: ''
};

// Default validation rules for partnership form
export const partnershipValidationRules = {
  fullName: [validationRules.required('Full Name')],
  businessEmail: [validationRules.required('Business Email'), validationRules.email()],
  phoneNo: [validationRules.required('Phone Number'), validationRules.phone()],
  companyName: [validationRules.required('Company Name')],
  country: [validationRules.required('Country')],
  partnerType: [validationRules.required('Partner Type')],
  businessDescription: [validationRules.required('Business Description'), validationRules.minLength(50)]
};

// Reusable PartnershipForm component
export const PartnershipForm: React.FC<PartnershipFormProps> = ({
  onSubmit,
  onClose,
  isModal = true,
  className = '',
  title = 'Become Our Partner Today!',
  showHeader = true,
  showRecaptcha = true,
  showPrivacyPolicy = true,
  submitButtonText = 'Submit',
  preSelectedPartnerType
}) => {
  // Initialize form with useForm hook
  const partnerForm = useForm<PartnershipFormData>({
    ...defaultPartnershipFormData,
    partnerType: preSelectedPartnerType || defaultPartnershipFormData.partnerType
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const isValid = partnerForm.validateForm(partnershipValidationRules);
    if (!isValid) {
      return;
    }

    // Call onSubmit callback with form data
    onSubmit(partnerForm.formData);
  };

  // Modal wrapper
  const ModalWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!isModal) return <>{children}</>;
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide shadow-2xl" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <style>
            {`.scrollbar-hide::-webkit-scrollbar { display: none; }`}
          </style>
          {children}
        </div>
      </div>
    );
  };

  return (
    <ModalWrapper>
      <div className={className}>
        {/* Header */}
        {showHeader && (
          <div className="bg-gradient-to-r from-brand to-brand-600 text-white p-6 rounded-t-2xl relative">
            <h2 className="text-2xl font-bold text-center">{title}</h2>
            {isModal && onClose && (
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-slate-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                ×
              </button>
            )}
          </div>
        )}
        
        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <FormField
            label="Full Name"
            name="fullName"
            type="text"
            value={partnerForm.formData.fullName}
            onChange={partnerForm.handleInputChange}
            placeholder="Enter your full name"
            required
            error={partnerForm.errors.fullName}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="email"
                name="businessEmail"
                placeholder="Business Email*"
                value={partnerForm.formData.businessEmail}
                onChange={partnerForm.handleInputChange}
                required
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
              />
              {partnerForm.errors.businessEmail && (
                <p className="text-red-500 text-sm mt-1">{partnerForm.errors.businessEmail}</p>
              )}
            </div>
            <div>
              <input
                type="tel"
                name="phoneNo"
                placeholder="Phone No*"
                value={partnerForm.formData.phoneNo}
                onChange={partnerForm.handleInputChange}
                required
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
              />
              {partnerForm.errors.phoneNo && (
                <p className="text-red-500 text-sm mt-1">{partnerForm.errors.phoneNo}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name*"
                value={partnerForm.formData.companyName}
                onChange={partnerForm.handleInputChange}
                required
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
              />
              {partnerForm.errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{partnerForm.errors.companyName}</p>
              )}
            </div>
            <div>
              <input
                type="url"
                name="website"
                placeholder="Website*"
                value={partnerForm.formData.website}
                onChange={partnerForm.handleInputChange}
                required
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
              />
              {partnerForm.errors.website && (
                <p className="text-red-500 text-sm mt-1">{partnerForm.errors.website}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                name="country"
                value={partnerForm.formData.country}
                onChange={partnerForm.handleInputChange}
                required
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors bg-white"
              >
                <option value="">Select Country*</option>
                <option value="US">United States</option>
                <option value="IN">India</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
                <option value="CN">China</option>
                <option value="BR">Brazil</option>
              </select>
              {partnerForm.errors.country && (
                <p className="text-red-500 text-sm mt-1">{partnerForm.errors.country}</p>
              )}
            </div>
            
            <div>
              <select
                name="partnerType"
                value={partnerForm.formData.partnerType}
                onChange={partnerForm.handleInputChange}
                required
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors bg-white"
              >
                <option value="">Partner Type*</option>
                <option value="ITAD">ITAD Partner</option>
                <option value="MSP">MSP Partner</option>
                <option value="Distributor">Distributor Partner</option>
                <option value="Reseller">Reseller Partner</option>
                <option value="OEM">OEM Partner</option>
              </select>
              {partnerForm.errors.partnerType && (
                <p className="text-red-500 text-sm mt-1">{partnerForm.errors.partnerType}</p>
              )}
            </div>
          </div>
          
          <div>
            <textarea
              name="businessDescription"
              placeholder="Tell us more about your business."
              value={partnerForm.formData.businessDescription}
              onChange={partnerForm.handleInputChange}
              rows={4}
              className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors resize-none"
            />
            {partnerForm.errors.businessDescription && (
              <p className="text-red-500 text-sm mt-1">{partnerForm.errors.businessDescription}</p>
            )}
          </div>
          
          {/* reCAPTCHA */}
          {showRecaptcha && (
            <div className="flex items-center justify-center">
              <div 
                className="g-recaptcha" 
                data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                data-callback="onPartnerRecaptchaChange"
              ></div>
            </div>
          )}
          
          {/* Privacy Policy */}
          {showPrivacyPolicy && (
            <div className="text-sm text-slate-600">
              I understand that the above information is protected by{' '}
              <Link to="/privacy-policy" className="text-brand hover:underline">
                DSecure's Privacy Policy.
              </Link>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-brand hover:bg-brand-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {submitButtonText}
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
};

// Custom hook for using partnership form (can be used outside components)
export const usePartnershipForm = (initialData?: Partial<PartnershipFormData>) => {
  const partnerForm = useForm<PartnershipFormData>({
    ...defaultPartnershipFormData,
    ...initialData
  });

  const validate = () => {
    return partnerForm.validateForm(partnershipValidationRules);
  };

  const submit = (onSubmit: (data: PartnershipFormData) => void) => {
    if (validate()) {
      onSubmit(partnerForm.formData);
      return true;
    }
    return false;
  };

  return {
    ...partnerForm,
    validate,
    submit,
    validationRules: partnershipValidationRules
  };
};

export default PartnershipForm;
