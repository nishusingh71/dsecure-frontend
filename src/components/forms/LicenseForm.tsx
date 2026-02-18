import React, { useCallback, useMemo } from "react";
import { useForm, validationRules } from "@/hooks";
import { useEnhancedForm, formConfigurations, showGlobalToast, FORMSUBMIT_ENDPOINT } from "@/utils/enhancedFormSystem";

// Form input components - removed memo to prevent focus loss during typing
const FormInput: React.FC<{
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  placeholder: string;
  required?: boolean;
  hasError?: boolean;
}> = ({ type, name, value, onChange, className, placeholder, required, hasError }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    className={className}
    placeholder={placeholder}
    required={required}
  />
);

const FormSelect: React.FC<{
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className: string;
  children: React.ReactNode;
  required?: boolean;
}> = ({ name, value, onChange, className, children, required }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className={className}
    required={required}
  >
    {children}
  </select>
);

const FormTextarea: React.FC<{
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
}> = ({ name, value, onChange, className, placeholder, rows, required }) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    className={className}
    placeholder={placeholder}
    rows={rows}
    required={required}
  />
);

const FormRadio: React.FC<{
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}> = ({ name, value, checked, onChange, className }) => (
  <input
    type="radio"
    name={name}
    value={value}
    checked={checked}
    onChange={onChange}
    className={className}
  />
);

// Modal wrapper component - moved outside to prevent recreation on every render
const ModalWrapper: React.FC<{ 
  isModal: boolean; 
  children: React.ReactNode 
}> = ({ isModal, children }) => {
  if (!isModal) return <>{children}</>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-hidden">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// License form data type
export interface LicenseFormData {
  usage: "business" | "personal";
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
  showPrivacyPolicy?: boolean;
  submitButtonText?: string;
  customConfig?: any; // Allow custom form submission configuration
}

// Default initial values for the license form
export const defaultLicenseFormData: LicenseFormData = {
  usage: "business",
  fullName: "",
  email: "",
  phone: "",
  businessType: "",
  company: "",
  country: "",
  compliance: "",
  eraseOption: "",
  deviceCount: "",
  requirements: "",
};

// Default validation rules for license form
export const licenseValidationRules = {
  fullName: [validationRules.required("Full Name")],
  email: [validationRules.required("Email"), validationRules.email()],
  phone: [validationRules.phone()],  // Added phone validation
  company: [validationRules.required("Company")],
  country: [validationRules.required("Country")],
  eraseOption: [validationRules.required("Erase Option")],
  requirements: [
    validationRules.required("Requirements"),
    validationRules.minLength(20),
  ],
};

// Reusable LicenseForm component - removed memo to prevent focus issues
export const LicenseForm: React.FC<LicenseFormProps> = ({
  onSubmit,
  onClose,
  isModal = true,
  className = "",
  title = "Request Free License",
  showHeader = true,
  showPrivacyPolicy = true,
  submitButtonText = "Request Free License",
  customConfig,
}) => {
  // Initialize form with useForm hook
  const licenseForm = useForm<LicenseFormData>(defaultLicenseFormData);

  // Enhanced form submission with toast notifications
  const { formState, submitForm } = useEnhancedForm(
    customConfig || {
      ...formConfigurations.license,
      endpoint: FORMSUBMIT_ENDPOINT,
      onSuccess: () => {
        // Call external onSubmit if provided (for backward compatibility)
        if (onSubmit) {
          onSubmit(licenseForm.formData);
        }
        // Close modal on success
        if (onClose) {
          setTimeout(() => onClose(), 2000);
        }
        // Reset form
        licenseForm.resetForm();
      },
      onError: (error: any) => {
        console.error('License form submission error:', error);
        showGlobalToast('Failed to submit license request. Please try again.', 'error');
      }
    }
  );

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form first
    const isValid = licenseForm.validateForm(licenseValidationRules);
    if (!isValid) {
      showGlobalToast('Please fix the form errors before submitting.', 'error');
      return;
    }

    // Submit using enhanced form system with toast notifications
    const success = await submitForm(licenseForm.formData);
    if (!success) {
      showGlobalToast('Please check your inputs and try again.', 'error');
    }
  }, [licenseForm, submitForm]);

  // Memoized country options
  const countryOptions = useMemo(() => [
    "United States", "United Kingdom", "Canada", "Australia", "Germany", "France",
    "India", "China", "Japan", "South Korea", "Singapore", "Netherlands",
    "Switzerland", "Sweden", "Norway", "Denmark", "Italy", "Spain", "Brazil",
    "Mexico", "Russia", "Turkey", "South Africa", "United Arab Emirates",
    "Saudi Arabia", "Hong Kong", "Other"
  ], []);

  // Memoized business type options
  const businessTypeOptions = useMemo(() => [
    "Technology/Software", "Healthcare", "Finance/Banking", "Education",
    "Government", "Manufacturing", "Retail", "Consulting", "Non-profit",
    "Legal", "Real Estate", "Other"
  ], []);

  // Memoized compliance options
  const complianceOptions = useMemo(() => [
    "GDPR", "HIPAA", "SOX", "PCI DSS", "ISO 27001", "Other", "Not Required"
  ], []);

  // Memoized erase options
  const eraseOptions = useMemo(() => [
    "DoD 5220.22-M (3-pass)", "DoD 5220.22-M (7-pass)", "NIST 800-88",
    "Gutmann (35-pass)", "Random Data (1-pass)", "Zero Fill (1-pass)",
    "Custom Pattern"
  ], []);

  // Memoized device count options
  const deviceCountOptions = useMemo(() => [
    "1-10", "11-50", "51-100", "101-500", "501-1000", "1000+"
  ], []);

  return (
    <ModalWrapper isModal={isModal}>
      <div className={`${className} flex flex-col h-full overflow-hidden`}>
        {/* Fixed Header */}
        {showHeader && (
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white p-6 rounded-t-xl flex-shrink-0">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-center flex-1">{title}</h2>
              {isModal && onClose && (
                <button
                  onClick={onClose}
                  className="text-white hover:text-slate-200 transition-colors text-3xl font-bold ml-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        {/* Scrollable Form Content */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>
            {`.license-form-scroll::-webkit-scrollbar { display: none; }`}
          </style>
          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-6 license-form-scroll overflow-hidden"
          >
            {/* Usage Type */}
            <div className="text-center mb-8">
              {/* <label className="block text-lg font-semibold text-gray-700 mb-4">Usage:</label> */}
              <div className="flex items-center justify-center gap-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <FormRadio
                    name="usage"
                    value="business"
                    checked={licenseForm.formData.usage === "business"}
                    onChange={licenseForm.handleInputChange}
                    className="w-5 h-5 text-red-500 focus:ring-red-500"
                  />
                  <span className="text-lg font-medium text-gray-700">
                    Business
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <FormRadio
                    name="usage"
                    value="personal"
                    checked={licenseForm.formData.usage === "personal"}
                    onChange={licenseForm.handleInputChange}
                    className="w-5 h-5 text-gray-400 focus:ring-gray-400"
                  />
                  <span className="text-lg font-medium text-gray-700">
                    Personal
                  </span>
                </label>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <FormInput
                type="text"
                name="fullName"
                value={licenseForm.formData.fullName}
                onChange={licenseForm.handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Full Name*"
              />
              {licenseForm.errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {licenseForm.errors.fullName}
                </p>
              )}
            </div>

            {/* Email and Phone Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <FormInput
                  type="email"
                  name="email"
                  value={licenseForm.formData.email}
                  onChange={licenseForm.handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Business Email*"
                />
                {licenseForm.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {licenseForm.errors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <select className="border border-gray-300 border-r-0 rounded-l-lg px-3 py-4 bg-gray-50 text-gray-600">
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+31">🇳🇱 +31</option>
                    <option value="+41">🇨🇭 +41</option>
                    <option value="+46">🇸🇪 +46</option>
                    <option value="+47">🇳🇴 +47</option>
                    <option value="+45">🇩🇰 +45</option>
                    <option value="+82">🇰🇷 +82</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+852">🇭🇰 +852</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+7">🇷🇺 +7</option>
                    <option value="+90">🇹🇷 +90</option>
                    <option value="+27">🇿🇦 +27</option>
                  </select>
                  <FormInput
                    type="tel"
                    name="phone"
                    value={licenseForm.formData.phone}
                    onChange={licenseForm.handleInputChange}
                    required
                    className="flex-1 border border-gray-300 rounded-r-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Phone No"
                  />
                </div>
                {licenseForm.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {licenseForm.errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Business Type and Company Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormSelect
                name="businessType"
                value={licenseForm.formData.businessType}
                onChange={licenseForm.handleInputChange}
                className="border border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white"
              >
                <option value="">Business Type</option>
                {businessTypeOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </FormSelect>
              <div>
                <FormInput
                  type="text"
                  name="company"
                  value={licenseForm.formData.company}
                  onChange={licenseForm.handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Company Name*"
                />
                {licenseForm.errors.company && (
                  <p className="text-red-500 text-sm mt-1">
                    {licenseForm.errors.company}
                  </p>
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
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Italy">Italy</option>
                  <option value="Spain">Spain</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Norway">Norway</option>
                  <option value="Denmark">Denmark</option>
                  <option value="India">India</option>
                  <option value="China">China</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Australia">Australia</option>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Russia">Russia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Other">Other</option>
                </select>
                {licenseForm.errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {licenseForm.errors.country}
                  </p>
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
                  <p className="text-red-500 text-sm mt-1">
                    {licenseForm.errors.eraseOption}
                  </p>
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
                rows={1}
                className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg resize-none"
                placeholder="Tell us more about your business.*"
              />
              {licenseForm.errors.requirements && (
                <p className="text-red-500 text-sm mt-1">
                  {licenseForm.errors.requirements}
                </p>
              )}
            </div>



            {/* Privacy Policy */}
            {showPrivacyPolicy && (
              <div className="text-sm text-gray-600">
                I understand that the above information is protected by{" "}
                <a
                  href="/privacy-policy"
                  className="text-red-500 hover:underline"
                >
                  D-Secure's Privacy Policy.
                </a>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg transition-all duration-300 font-bold text-lg"
              >
                {formState.isSubmitting ? 'Submitting...' : submitButtonText}
              </button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                *Required
              </p>
            </div>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
};

// Custom hook for using license form (can be used outside components)
export const useLicenseForm = (initialData?: Partial<LicenseFormData>) => {
  const licenseForm = useForm<LicenseFormData>({
    ...defaultLicenseFormData,
    ...initialData,
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
    validationRules: licenseValidationRules,
  };
};

export default LicenseForm;
