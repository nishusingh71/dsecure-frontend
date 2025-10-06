import React from 'react';
import { useForm, validationRules } from '@/hooks';

// License form data type
export interface LicenseFormData {
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

// Props for the LicenseForm component
export interface LicenseFormProps {
  onSubmit: (formData: LicenseFormData) => void;
  onClose?: () => void;
  isModal?: boolean;
  className?: string;
  title?: string;
  showHeader?: boolean;
  showRecaptcha?: boolean;
  showPrivacyPolicy?: boolean;
  submitButtonText?: string;
}

// Default initial values for the license form
export const defaultLicenseFormData: LicenseFormData = {
  usage: 'business',
  fullName: '',
  email: '',
  phone: '',
  businessType: '',
  company: '',
  country: '',
  compliance: '',
  eraseOption: '',
  deviceCount: '',
  requirements: ''
};

// Default validation rules for license form
export const licenseValidationRules = {
  fullName: [validationRules.required('Full Name')],
  email: [validationRules.required('Email'), validationRules.email()],
  company: [validationRules.required('Company')],
  country: [validationRules.required('Country')],
  eraseOption: [validationRules.required('Erase Option')],
  requirements: [validationRules.required('Requirements'), validationRules.minLength(20)]
};

// Reusable LicenseForm component
export const LicenseForm: React.FC<LicenseFormProps> = ({
  onSubmit,
  onClose,
  isModal = true,
  className = '',
  title = 'Request Free License',
  showHeader = true,
  showRecaptcha = true,
  showPrivacyPolicy = true,
  submitButtonText = 'Request Free License'
}) => {
  // Initialize form with useForm hook
  const licenseForm = useForm<LicenseFormData>(defaultLicenseFormData);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const isValid = licenseForm.validateForm(licenseValidationRules);
    if (!isValid) {
      return;
    }

    // Call onSubmit callback with form data
    onSubmit(licenseForm.formData);
  };

  // Modal wrapper
  const ModalWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!isModal) return <>{children}</>;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-center flex-1">{title}</h2>
              {isModal && onClose && (
                <button 
                  onClick={onClose}
                  className="text-white hover:text-gray-300 transition-colors text-3xl font-bold ml-4"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Usage Type */}
          <div className="text-center mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">Usage:</label>
            <div className="flex items-center justify-center gap-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="usage"
                  value="business"
                  checked={licenseForm.formData.usage === 'business'}
                  onChange={licenseForm.handleInputChange}
                  className="w-5 h-5 text-red-500 focus:ring-red-500"
                />
                <span className="text-lg font-medium text-gray-700">Business</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="usage"
                  value="personal"
                  checked={licenseForm.formData.usage === 'personal'}
                  onChange={licenseForm.handleInputChange}
                  className="w-5 h-5 text-gray-400 focus:ring-gray-400"
                />
                <span className="text-lg font-medium text-gray-700">Personal</span>
              </label>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              value={licenseForm.formData.fullName}
              onChange={licenseForm.handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              placeholder="Full Name*"
            />
            {licenseForm.errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{licenseForm.errors.fullName}</p>
            )}
          </div>

          {/* Email and Phone Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <input
                type="email"
                name="email"
                value={licenseForm.formData.email}
                onChange={licenseForm.handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Business Email*"
              />
              {licenseForm.errors.email && (
                <p className="text-red-500 text-sm mt-1">{licenseForm.errors.email}</p>
              )}
            </div>
            <div className="flex">
              <select className="border border-gray-300 border-r-0 rounded-l-lg px-3 py-4 bg-gray-50 text-gray-600">
                <option>+1</option>
                <option>+91</option>
                <option>+44</option>
              </select>
              <input
                type="tel"
                name="phone"
                value={licenseForm.formData.phone}
                onChange={licenseForm.handleInputChange}
                required
                className="flex-1 border border-gray-300 rounded-r-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Phone No"
              />
            </div>
          </div>

          {/* Business Type and Company Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <select
              name="businessType"
              value={licenseForm.formData.businessType}
              onChange={licenseForm.handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white"
            >
              <option value="">Business Type</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Government">Government</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
              <option value="Other">Other</option>
            </select>
            <div>
              <input
                type="text"
                name="company"
                value={licenseForm.formData.company}
                onChange={licenseForm.handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Company Name*"
              />
              {licenseForm.errors.company && (
                <p className="text-red-500 text-sm mt-1">{licenseForm.errors.company}</p>
              )}
            </div>
          </div>

          {/* Country and Compliance Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <select
                name="country"
                value={licenseForm.formData.country}
                onChange={licenseForm.handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white"
              >
                <option value="">Select Country*</option>
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Singapore">Singapore</option>
                <option value="Other">Other</option>
              </select>
              {licenseForm.errors.country && (
                <p className="text-red-500 text-sm mt-1">{licenseForm.errors.country}</p>
              )}
            </div>
            <select
              name="compliance"
              value={licenseForm.formData.compliance}
              onChange={licenseForm.handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white"
            >
              <option value="">Compliance Requirements</option>
              <option value="GDPR">GDPR</option>
              <option value="HIPAA">HIPAA</option>
              <option value="SOX">SOX</option>
              <option value="PCI DSS">PCI DSS</option>
              <option value="ISO 27001">ISO 27001</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Erase Options Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <select
                name="eraseOption"
                value={licenseForm.formData.eraseOption}
                onChange={licenseForm.handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white"
              >
                <option value="">I Want to Erase*</option>
                <option value="Hard Drives">Hard Drives</option>
                <option value="SSDs">SSDs</option>
                <option value="Mobile Devices">Mobile Devices</option>
                <option value="Servers">Servers</option>
                <option value="All Devices">All Devices</option>
              </select>
              {licenseForm.errors.eraseOption && (
                <p className="text-red-500 text-sm mt-1">{licenseForm.errors.eraseOption}</p>
              )}
            </div>
            <select
              name="deviceCount"
              value={licenseForm.formData.deviceCount}
              onChange={licenseForm.handleInputChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white"
            >
              <option value="">Number of Devices to Erase*</option>
              <option value="1-10">1-10 Devices</option>
              <option value="11-50">11-50 Devices</option>
              <option value="51-100">51-100 Devices</option>
              <option value="101-500">101-500 Devices</option>
              <option value="500+">500+ Devices</option>
            </select>
          </div>

          {/* Business Description */}
          <div>
            <textarea
              name="requirements"
              value={licenseForm.formData.requirements}
              onChange={licenseForm.handleInputChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg resize-none"
              placeholder="Tell us more about your business.*"
            />
            {licenseForm.errors.requirements && (
              <p className="text-red-500 text-sm mt-1">{licenseForm.errors.requirements}</p>
            )}
          </div>

          {/* reCAPTCHA */}
          {showRecaptcha && (
            <div className="flex justify-center">
              <div 
                className="g-recaptcha" 
                data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                data-callback="onLicenseRecaptchaChange"
              ></div>
            </div>
          )}

          {/* Privacy Policy */}
          {showPrivacyPolicy && (
            <div className="text-sm text-gray-600">
              I understand that the above information is protected by{' '}
              <a href="/privacy-policy" className="text-red-500 hover:underline">
                D-Secure's Privacy Policy.
              </a>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg transition-all duration-300 font-bold text-lg"
            >
              {submitButtonText}
            </button>
            <p className="text-sm text-gray-500 mt-2 text-center">*Required</p>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

// Custom hook for using license form (can be used outside components)
export const useLicenseForm = (initialData?: Partial<LicenseFormData>) => {
  const licenseForm = useForm<LicenseFormData>({
    ...defaultLicenseFormData,
    ...initialData
  });

  const validate = () => {
    return licenseForm.validateForm(licenseValidationRules);
  };

  const submit = (onSubmit: (data: LicenseFormData) => void) => {
    if (validate()) {
      onSubmit(licenseForm.formData);
      return true;
    }
    return false;
  };

  return {
    ...licenseForm,
    validate,
    submit,
    validationRules: licenseValidationRules
  };
};

export default LicenseForm;
