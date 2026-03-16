import React, { useCallback, useMemo } from "react";
import { useForm, validationRules } from "@/hooks";
import { useEnhancedForm, formConfigurations, showGlobalToast, FORMSUBMIT_ENDPOINT } from "@/utils/enhancedFormSystem";
import { X } from "lucide-react";

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
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-hidden animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] max-w-4xl w-full max-h-[95vh] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-emerald-100/50">
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
  onSubmit?: (formData: LicenseFormData) => void;
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

  // Memoized business type options
  const businessTypeOptions = useMemo(() => [
    "Technology/Software", "Healthcare", "Finance/Banking", "Education",
    "Government", "Manufacturing", "Retail", "Consulting", "Non-profit",
    "Legal", "Real Estate", "Other"
  ], []);

  return (
    <ModalWrapper isModal={isModal}>
      <div className={`${className} flex flex-col h-full overflow-hidden`}>
        {/* Fixed Header */}
        {showHeader && (
          <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-8 rounded-t-[2rem] relative flex-shrink-0">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 25% 50%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
            <div className="flex flex-col items-center relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-center">{title}</h2>
              <p className="text-emerald-50/80 mt-2 text-sm font-medium">Get complimentary access to our enterprise solutions</p>
            </div>
            {isModal && onClose && (
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-20 cursor-pointer text-white/70 hover:text-white w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <X className="w-6 h-6 pointer-events-none" />
              </button>
            )}
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
              <div className="flex items-center justify-center gap-8">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <FormRadio
                    name="usage"
                    value="business"
                    checked={licenseForm.formData.usage === "business"}
                    onChange={licenseForm.handleInputChange}
                    className="w-5 h-5 text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                  />
                  <span className="text-lg font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">
                    Business
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <FormRadio
                    name="usage"
                    value="personal"
                    checked={licenseForm.formData.usage === "personal"}
                    onChange={licenseForm.handleInputChange}
                    className="w-5 h-5 text-slate-400 focus:ring-slate-400 accent-emerald-500"
                  />
                  <span className="text-lg font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">
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
                className="w-full p-4 bg-white border-2 border-emerald-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-bold shadow-sm hover:border-emerald-200"
                placeholder="Full Name*"
              />
              {licenseForm.errors.fullName && (
                <p className="text-red-500 text-xs font-bold uppercase tracking-widest mt-1.5 ml-1">
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
                  className="w-full p-4 bg-white border-2 border-emerald-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-bold shadow-sm hover:border-emerald-200"
                  placeholder="Business Email*"
                />
                {licenseForm.errors.email && (
                  <p className="text-red-500 text-xs font-bold uppercase tracking-widest mt-1.5 ml-1">
                    {licenseForm.errors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <select className="border-2 border-emerald-100 border-r-0 rounded-l-xl px-3 py-4 bg-emerald-50/50 text-slate-600 font-bold outline-none focus:border-emerald-500 transition-all duration-300">
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
                    className="flex-1 p-4 bg-white border-2 border-emerald-100 rounded-r-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-bold shadow-sm hover:border-emerald-200"
                    placeholder="Phone No"
                  />
                </div>
                {licenseForm.errors.phone && (
                  <p className="text-red-500 text-xs font-bold uppercase tracking-widest mt-1.5 ml-1">
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
                className="w-full p-4 bg-white border-2 border-emerald-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-bold shadow-sm hover:border-emerald-200 appearance-none cursor-pointer"
              >
                <option value="" disabled selected hidden>Business Type*</option>
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
                  className="w-full p-4 bg-white border-2 border-emerald-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-bold shadow-sm hover:border-emerald-200"
                  placeholder="Company Name*"
                />
                {licenseForm.errors.company && (
                  <p className="text-red-500 text-xs font-bold uppercase tracking-widest mt-1.5 ml-1">
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
                  className="w-full p-4 bg-white border-2 border-emerald-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-bold shadow-sm hover:border-emerald-200 appearance-none cursor-pointer"
                >
                  <option value="" disabled selected hidden>Select Country*</option>
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
                  <p className="text-red-500 text-xs font-bold uppercase tracking-widest mt-1.5 ml-1">
                    {licenseForm.errors.country}
                  </p>
                )}
              </div>
              <select
                name="compliance"
                value={licenseForm.formData.compliance}
                onChange={licenseForm.handleInputChange}
                className="w-full p-4 bg-white border-2 border-emerald-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-bold shadow-sm hover:border-emerald-200 appearance-none cursor-pointer"
              >
                <option value="" disabled selected hidden>Compliance Requirements*</option>
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
                  className="w-full p-4 bg-white border-2 border-emerald-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-bold shadow-sm hover:border-emerald-200 appearance-none cursor-pointer"
                >
                  <option value="" disabled selected hidden>I Want to Erase*</option>
                  <option value="Hard Drives">Hard Drives</option>
                  <option value="SSDs">SSDs</option>
                  <option value="Mobile Devices">Mobile Devices</option>
                  <option value="Servers">Servers</option>
                  <option value="All Devices">All Devices</option>
                </select>
                {licenseForm.errors.eraseOption && (
                  <p className="text-red-500 text-xs font-bold uppercase tracking-widest mt-1.5 ml-1">
                    {licenseForm.errors.eraseOption}
                  </p>
                )}
              </div>
              <div>
                <select
                  name="deviceCount"
                  value={licenseForm.formData.deviceCount}
                  onChange={licenseForm.handleInputChange}
                  required
                  className="w-full p-4 bg-white border-2 border-emerald-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-bold shadow-sm hover:border-emerald-200 appearance-none cursor-pointer"
                >
                  <option value="" disabled selected hidden>Number of Devices to Erase*</option>
                  <option value="1-10">1-10 Devices</option>
                  <option value="11-50">11-50 Devices</option>
                  <option value="51-100">51-100 Devices</option>
                  <option value="101-500">101-500 Devices</option>
                  <option value="500+">500+ Devices</option>
                </select>
              </div>
            </div>

            {/* Business Description */}
            <div>
              <textarea
                name="requirements"
                value={licenseForm.formData.requirements}
                onChange={licenseForm.handleInputChange}
                rows={3}
                className="w-full p-4 bg-white border-2 border-emerald-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-bold shadow-sm hover:border-emerald-200 resize-none"
                placeholder="Tell us more about your business.*"
              />
              {licenseForm.errors.requirements && (
                <p className="text-red-500 text-xs font-bold uppercase tracking-widest mt-1.5 ml-1">
                  {licenseForm.errors.requirements}
                </p>
              )}
            </div>



            {/* Privacy Policy */}
            {showPrivacyPolicy && (
              <div className="text-xs font-bold text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100 uppercase tracking-widest">
                I understand that the above information is protected by{" "}
                <a
                  href="/privacy-policy"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline decoration-emerald-300 underline-offset-4"
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
                className="w-full bg-slate-900 text-white font-black py-4 px-6 rounded-xl transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-emerald-500/30 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-2"
              >
                {formState.isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    {submitButtonText}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
              <p className="text-xs font-bold text-slate-400 mt-4 text-center uppercase tracking-widest">
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
