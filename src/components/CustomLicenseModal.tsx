import React, { useState, memo, useMemo, useCallback } from 'react';

interface CustomLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CustomLicenseData) => void;
  productName: string;
}

export interface CustomLicenseData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  numberOfLicenses: string;
  duration: string;
  requirements: string;
  budget: string;
}

// Memoized form input components outside main component to prevent re-creation
const FormInput = memo<{
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  placeholder: string;
  hasError?: boolean;
}>(({ type, name, value, onChange, className, placeholder, hasError }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    className={hasError ? className.replace('border-gray-300', 'border-red-500') : className}
    placeholder={placeholder}
  />
));

const FormTextarea = memo<{
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className: string;
  placeholder: string;
  rows: number;
}>(({ name, value, onChange, className, placeholder, rows }) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    rows={rows}
    className={className}
    placeholder={placeholder}
  />
));

const FormSelect = memo<{
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className: string;
  children: React.ReactNode;
}>(({ name, value, onChange, className, children }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className={className}
  >
    {children}
  </select>
));

const CustomLicenseModal: React.FC<CustomLicenseModalProps> = memo(({
  isOpen,
  onClose,
  onSubmit,
  productName
}) => {
  const [formData, setFormData] = useState<CustomLicenseData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    numberOfLicenses: '',
    duration: '1',
    requirements: '',
    budget: ''
  });

  const [errors, setErrors] = useState<Partial<CustomLicenseData>>({});

  // Memoized handle input change with change detection
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Only update if value actually changed
    setFormData(prev => {
      if (prev[name as keyof CustomLicenseData] === value) {
        return prev;
      }
      return { ...prev, [name]: value };
    });
    
    if (errors[name as keyof CustomLicenseData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  // Memoized duration options
  const durationOptions = useMemo(() => [
    { value: "1", label: "1 Year" },
    { value: "2", label: "2 Years" },
    { value: "3", label: "3 Years" },
    { value: "5", label: "5 Years" },
    { value: "lifetime", label: "Lifetime" }
  ], []);

  // Memoized budget options
  const budgetOptions = useMemo(() => [
    { value: "", label: "Select budget range" },
    { value: "under-10k", label: "Under $10,000" },
    { value: "10k-25k", label: "$10,000 - $25,000" },
    { value: "25k-50k", label: "$25,000 - $50,000" },
    { value: "50k-100k", label: "$50,000 - $100,000" },
    { value: "over-100k", label: "Over $100,000" }
  ], []);

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomLicenseData> = {};
    
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.contactName) newErrors.contactName = 'Contact name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.numberOfLicenses) newErrors.numberOfLicenses = 'Number of licenses is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        numberOfLicenses: '',
        duration: '1',
        requirements: '',
        budget: ''
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Custom License Request</h2>
              <p className="text-gray-600 mt-1">Get a personalized quote for {productName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <FormInput
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
                placeholder="Enter your company name"
                hasError={!!errors.companyName}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person *
              </label>
              <FormInput
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
                placeholder="Your full name"
                hasError={!!errors.contactName}
              />
              {errors.contactName && (
                <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
                placeholder="your.email@company.com"
                hasError={!!errors.email}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <FormInput
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Licenses *
              </label>
              <FormInput
                type="number"
                name="numberOfLicenses"
                value={formData.numberOfLicenses}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
                placeholder="e.g., 500"
                hasError={!!errors.numberOfLicenses}
              />
              {errors.numberOfLicenses && (
                <p className="text-red-500 text-sm mt-1">{errors.numberOfLicenses}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Duration
              </label>
              <FormSelect
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
              >
                {durationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelect>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requirements
            </label>
            <FormTextarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
              placeholder="Describe any specific requirements, integrations, or features you need..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range (Optional)
            </label>
            <FormSelect
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
            >
              {budgetOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FormSelect>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-brand to-brand-600 text-white rounded-lg hover:from-brand-600 hover:to-brand-700 transition-all transform hover:scale-105 font-medium shadow-lg"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default CustomLicenseModal;