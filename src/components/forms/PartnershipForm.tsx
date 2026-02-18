import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useForm, validationRules } from "@/hooks";
import { useFormSubmission, formConfigs } from "@/hooks/useFormSubmission";
import { FormField } from "@/components/ui";
import { showGlobalToast } from "@/utils/enhancedFormSystem";
import GlobalTimezone from "@/components/GlobalTimezone";

// Form input components - removed memo to prevent focus loss during typing
const FormInput: React.FC<{
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  placeholder: string;
  required?: boolean;
}> = ({ type, name, value, onChange, className, placeholder, required }) => (
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

// Modal wrapper component - moved outside to prevent recreation on every render
const ModalWrapper: React.FC<{
  isModal: boolean;
  children: React.ReactNode;
}> = ({ isModal, children }) => {
  if (!isModal) return <>{children}</>;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-hidden">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};

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
  onSubmit?: (formData: PartnershipFormData) => void; // Made optional since we can handle submission internally
  onClose?: () => void;
  isModal?: boolean;
  className?: string;
  title?: string;
  showHeader?: boolean;
  showPrivacyPolicy?: boolean;
  submitButtonText?: string;
  preSelectedPartnerType?: string;
  customConfig?: any; // Allow custom form submission configuration
}

// Default initial values for the partnership form
export const defaultPartnershipFormData: PartnershipFormData = {
  fullName: "",
  businessEmail: "",
  phoneNo: "",
  companyName: "",
  website: "",
  country: "",
  partnerType: "ITAD Partner",
  businessDescription: "",
};

// Default validation rules for partnership form
export const partnershipValidationRules = {
  fullName: [validationRules.required("Full Name")],
  businessEmail: [
    validationRules.required("Business Email"),
    validationRules.email(),
  ],
  phoneNo: [validationRules.required("Phone Number"), validationRules.phone()],
  companyName: [validationRules.required("Company Name")],
  country: [validationRules.required("Country")],
  partnerType: [validationRules.required("Partner Type")],
  businessDescription: [
    validationRules.required("Business Description"),
    validationRules.minLength(50),
  ],
};

// Reusable PartnershipForm component - removed memo to prevent focus issues
export const PartnershipForm: React.FC<PartnershipFormProps> = ({
  onSubmit,
  onClose,
  isModal = true,
  className = "",
  title = "Become Our Partner Today!",
  showHeader = true,
  showPrivacyPolicy = true,
  submitButtonText = "Submit",
  preSelectedPartnerType,
  customConfig,
}) => {
  // Initialize form with useForm hook
  const partnerForm = useForm<PartnershipFormData>({
    ...defaultPartnershipFormData,
    partnerType:
      preSelectedPartnerType || defaultPartnershipFormData.partnerType,
  });

  // Setup form submission with our reusable system
  const { isSubmitting, submitForm } = useFormSubmission(
    customConfig || {
      ...formConfigs.partnership,
      onSuccess: (data: any) => {
        // Call external onSubmit if provided (for backward compatibility)
        if (onSubmit) {
          onSubmit(data as PartnershipFormData);
        }
        // Close modal on success
        if (onClose) {
          setTimeout(() => onClose(), 2000);
        }
      },
      onError: (error: any) => {
        console.error("Partnership form submission error:", error);
        showGlobalToast(
          "Failed to submit partnership application. Please try again.",
          "error",
        );
      },
    },
    partnerForm.resetForm,
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate form
      const isValid = partnerForm.validateForm(partnershipValidationRules);
      if (!isValid) {
        showGlobalToast(
          "Please fix the form errors before submitting.",
          "error",
        );
        return;
      }

      try {
        // Submit using our reusable system
        await submitForm(partnerForm.formData);

        // Reset form after successful submission
        partnerForm.resetForm();
      } catch (error) {
        console.error("Partnership form submission failed:", error);
        showGlobalToast(
          "Submission failed. Please check your connection and try again.",
          "error",
        );
      }
    },
    [partnerForm, submitForm],
  );

  // Memoized partner type options
  const partnerTypeOptions = useMemo(
    () => [
      "ITAD Partner",
      "Reseller Partner",
      "Technology Partner",
      "Consulting Partner",
      "Integration Partner",
      "Distributor Partner",
      "Other",
    ],
    [],
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

  return (
    <ModalWrapper isModal={isModal}>
      <div className={`${className} flex flex-col h-full overflow-hidden`}>
        {/* Fixed Header */}
        {showHeader && (
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white p-6 rounded-t-2xl relative flex-shrink-0">
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

        {/* Scrollable Form Content */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>
            {`.partnership-form-scroll::-webkit-scrollbar { display: none; }`}
          </style>
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 partnership-form-scroll overflow-hidden"
          >
            {/* <div className="mb-2">
              <GlobalTimezone />
            </div> */}
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
                <FormInput
                  type="email"
                  name="businessEmail"
                  placeholder="Business Email*"
                  value={partnerForm.formData.businessEmail}
                  onChange={partnerForm.handleInputChange}
                  required
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                />
                {partnerForm.errors.businessEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {partnerForm.errors.businessEmail}
                  </p>
                )}
              </div>
              <div>
                <FormInput
                  type="tel"
                  name="phoneNo"
                  placeholder="Phone No*"
                  value={partnerForm.formData.phoneNo}
                  onChange={partnerForm.handleInputChange}
                  required
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                />
                {partnerForm.errors.phoneNo && (
                  <p className="text-red-500 text-sm mt-1">
                    {partnerForm.errors.phoneNo}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormInput
                  type="text"
                  name="companyName"
                  placeholder="Company Name*"
                  value={partnerForm.formData.companyName}
                  onChange={partnerForm.handleInputChange}
                  required
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                />
                {partnerForm.errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {partnerForm.errors.companyName}
                  </p>
                )}
              </div>
              <div>
                <FormInput
                  type="url"
                  name="website"
                  placeholder="Website*"
                  value={partnerForm.formData.website}
                  onChange={partnerForm.handleInputChange}
                  required
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                />
                {partnerForm.errors.website && (
                  <p className="text-red-500 text-sm mt-1">
                    {partnerForm.errors.website}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormSelect
                  name="country"
                  value={partnerForm.formData.country}
                  onChange={partnerForm.handleInputChange}
                  required
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors bg-white"
                >
                  {countryOptions.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </FormSelect>
                {partnerForm.errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {partnerForm.errors.country}
                  </p>
                )}
              </div>

              <div>
                <FormSelect
                  name="partnerType"
                  value={partnerForm.formData.partnerType}
                  onChange={partnerForm.handleInputChange}
                  required
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors bg-white"
                >
                  <option value="">Partner Type*</option>
                  {partnerTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </FormSelect>
                {partnerForm.errors.partnerType && (
                  <p className="text-red-500 text-sm mt-1">
                    {partnerForm.errors.partnerType}
                  </p>
                )}
              </div>
            </div>

            <div>
              <FormTextarea
                name="businessDescription"
                placeholder="Tell us more about your business."
                value={partnerForm.formData.businessDescription}
                onChange={partnerForm.handleInputChange}
                rows={1}
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors resize-none"
              />
              {partnerForm.errors.businessDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {partnerForm.errors.businessDescription}
                </p>
              )}
            </div>

            {/* Privacy Policy */}
            {showPrivacyPolicy && (
              <div className="text-sm text-slate-600">
                I understand that the above information is protected by{" "}
                <Link
                  to="/privacy-policy"
                  className="text-brand hover:underline"
                >
                  D-Secure's Privacy Policy.
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || partnerForm.isSubmitting}
              className="w-full bg-brand hover:bg-brand-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting || partnerForm.isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                submitButtonText
              )}
            </button>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
};

// Custom hook for using partnership form (can be used outside components)
export const usePartnershipForm = (
  initialData?: Partial<PartnershipFormData>
) => {
  const partnerForm = useForm<PartnershipFormData>({
    ...defaultPartnershipFormData,
    ...initialData,
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
    validationRules: partnershipValidationRules,
  };
};

export default PartnershipForm;
