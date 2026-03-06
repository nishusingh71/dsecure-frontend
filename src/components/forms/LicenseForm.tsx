import React, { useCallback, useMemo } from "react";
import { useForm, validationRules } from "@/hooks";
import { useTranslation } from "react-i18next";
import {
  useEnhancedForm,
  formConfigurations,
  showGlobalToast,
  FORMSUBMIT_ENDPOINT,
} from "@/utils/enhancedFormSystem";
import { getLocalePath } from "@/utils/localePath";

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
}> = ({
  type,
  name,
  value,
  onChange,
  className,
  placeholder,
  required,
  hasError,
}) => (
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
  children: React.ReactNode;
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
  phone: [validationRules.phone()], // Added phone validation
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
  title: titleProp,
  showHeader = true,
  showPrivacyPolicy = true,
  submitButtonText: submitButtonTextProp,
  customConfig,
}) => {
  const { t } = useTranslation("licenseForm");
  const title = titleProp || t("title");
  const submitButtonText = submitButtonTextProp || t("submitButton");
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
        console.error("License form submission error:", error);
        showGlobalToast(t("toast.submitFailed"), "error");
      },
    },
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate form first
      const isValid = licenseForm.validateForm(licenseValidationRules);
      if (!isValid) {
        showGlobalToast(t("toast.fixErrors"), "error");
        return;
      }

      // Submit using enhanced form system with toast notifications
      const success = await submitForm(licenseForm.formData);
      if (!success) {
        showGlobalToast(t("toast.checkInputs"), "error");
      }
    },
    [licenseForm, submitForm],
  );

  // Memoized country options
  const countryOptions = useMemo(
    () => [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Germany",
      "France",
      "India",
      "China",
      "Japan",
      "South Korea",
      "Singapore",
      "Netherlands",
      "Switzerland",
      "Sweden",
      "Norway",
      "Denmark",
      "Italy",
      "Spain",
      "Brazil",
      "Mexico",
      "Russia",
      "Turkey",
      "South Africa",
      "United Arab Emirates",
      "Saudi Arabia",
      "Hong Kong",
      "Other",
    ],
    [],
  );

  // Memoized business type options
  const businessTypeOptions = useMemo(
    () => [
      { value: "Technology/Software", label: t("businessTypes.techSoftware") },
      { value: "Healthcare", label: t("businessTypes.healthcare") },
      { value: "Finance/Banking", label: t("businessTypes.finance") },
      { value: "Education", label: t("businessTypes.education") },
      { value: "Government", label: t("businessTypes.government") },
      { value: "Manufacturing", label: t("businessTypes.manufacturing") },
      { value: "Retail", label: t("businessTypes.retail") },
      { value: "Consulting", label: t("businessTypes.consulting") },
      { value: "Non-profit", label: t("businessTypes.nonprofit") },
      { value: "Legal", label: t("businessTypes.legal") },
      { value: "Real Estate", label: t("businessTypes.realEstate") },
      { value: "Other", label: t("businessTypes.other") },
    ],
    [t],
  );

  // Memoized compliance options
  const complianceOptions = useMemo(
    () => [
      { value: "GDPR", label: t("complianceOptions.gdpr") },
      { value: "HIPAA", label: t("complianceOptions.hipaa") },
      { value: "SOX", label: t("complianceOptions.sox") },
      { value: "PCI DSS", label: t("complianceOptions.pciDss") },
      { value: "ISO 27001", label: t("complianceOptions.iso27001") },
      { value: "Other", label: t("complianceOptions.other") },
      { value: "Not Required", label: t("complianceOptions.notRequired") },
    ],
    [t],
  );

  // Memoized erase options
  const eraseOptions = useMemo(
    () => [
      "DoD 5220.22-M (3-pass)",
      "DoD 5220.22-M (7-pass)",
      "NIST 800-88",
      "Gutmann (35-pass)",
      "Random Data (1-pass)",
      "Zero Fill (1-pass)",
      "Custom Pattern",
    ],
    [],
  );

  // Memoized device count options
  const deviceCountOptions = useMemo(
    () => ["1-10", "11-50", "51-100", "101-500", "501-1000", "1000+"],
    [],
  );

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
                    {t("business")}
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
                    {t("personal")}
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
                placeholder={t("fullName")}
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
                  placeholder={t("businessEmail")}
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
                    placeholder={t("phoneNo")}
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
                <option value="">{t("businessTypePlaceholder")}</option>
                {businessTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
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
                  placeholder={t("companyName")}
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
                  <option value="United States">{t("countries.us")}</option>
                  <option value="Canada">{t("countries.ca")}</option>
                  <option value="United Kingdom">{t("countries.uk")}</option>
                  <option value="Germany">{t("countries.de")}</option>
                  <option value="France">{t("countries.fr")}</option>
                  <option value="Italy">{t("countries.it")}</option>
                  <option value="Spain">{t("countries.es")}</option>
                  <option value="Netherlands">{t("countries.nl")}</option>
                  <option value="Switzerland">{t("countries.ch")}</option>
                  <option value="Sweden">{t("countries.se")}</option>
                  <option value="Norway">{t("countries.no")}</option>
                  <option value="Denmark">{t("countries.dk")}</option>
                  <option value="India">{t("countries.in")}</option>
                  <option value="China">{t("countries.cn")}</option>
                  <option value="Japan">{t("countries.jp")}</option>
                  <option value="South Korea">{t("countries.kr")}</option>
                  <option value="Singapore">{t("countries.sg")}</option>
                  <option value="Hong Kong">{t("countries.hk")}</option>
                  <option value="Australia">{t("countries.au")}</option>
                  <option value="UAE">{t("countries.ae")}</option>
                  <option value="Saudi Arabia">{t("countries.sa")}</option>
                  <option value="Brazil">{t("countries.br")}</option>
                  <option value="Mexico">{t("countries.mx")}</option>
                  <option value="Russia">{t("countries.ru")}</option>
                  <option value="Turkey">{t("countries.tr")}</option>
                  <option value="South Africa">{t("countries.za")}</option>
                  <option value="Other">{t("countries.other")}</option>
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
                <option value="">{t("compliancePlaceholder")}</option>
                {complianceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
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
                  <option value="">{t("erasePlaceholder")}</option>
                  <option value="Hard Drives">
                    {t("eraseOptions.hardDrives")}
                  </option>
                  <option value="SSDs">{t("eraseOptions.ssds")}</option>
                  <option value="Mobile Devices">
                    {t("eraseOptions.mobileDevices")}
                  </option>
                  <option value="Servers">{t("eraseOptions.servers")}</option>
                  <option value="All Devices">
                    {t("eraseOptions.allDevices")}
                  </option>
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
                <option value="">{t("deviceCountPlaceholder")}</option>
                <option value="1-10">{t("deviceCounts.d1_10")}</option>
                <option value="11-50">{t("deviceCounts.d11_50")}</option>
                <option value="51-100">{t("deviceCounts.d51_100")}</option>
                <option value="101-500">{t("deviceCounts.d101_500")}</option>
                <option value="500+">{t("deviceCounts.d500plus")}</option>
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
                placeholder={t("requirementsPlaceholder")}
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
                {t("privacyText")}{" "}
                <a
                  href={getLocalePath("/privacy-policy")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:underline"
                >
                  {t("privacyLink")}
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
                {formState.isSubmitting ? t("submitting") : submitButtonText}
              </button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {t("required")}
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
