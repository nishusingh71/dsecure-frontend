import Reveal from "@/components/Reveal";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  DollarIcon, 
  GearIcon, 
  CheckIcon,
  ClipboardIcon,
  BuildingIcon,
  ChatIcon,
  MobileIcon,
  HoverIcon 
} from '@/components/FlatIcons';
import { Helmet } from 'react-helmet-async';


export default function ContactPage() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/contact" />
        <title>
          Contact DSecure | Data Erasure Solutions Support
        </title>
        <meta
          name="description"
          content="Contact DSecure for professional data erasure solutions. Get support for NIST 800-88, GDPR compliance, and secure data destruction services."
        />
        <meta
          name="keywords"
          content="contact DSecure, data erasure support, NIST compliance contact, secure data deletion help, GDPR data destruction"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <ContactPageContent />
    </>
  );
}

function ContactPageContent() {
  const [usageType, setUsageType] = useState<'business' | 'personal'>('business');
  const [formData, setFormData] = useState({
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

  type FormDataType = {
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
  };

  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Toast functionality
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 6000); // Auto hide after 6 seconds
  };

  // FormSubmit configuration - Free and unlimited form submissions
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
      formSubmitData.append('_next', window.location.href); // Redirect back to same page
      formSubmitData.append('_captcha', 'false'); // Disable captcha
      formSubmitData.append('_template', 'table'); // Use table format for email

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
    // //console.log("Form submitted:", formData);
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

  const offices = [
    {
      city: "San Francisco",
      country: "USA",
      address: "123 Market Street, Suite 500\nSan Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "sf@dsecure.com",
      timezone: "PST (UTC-8)",
      image: "🌉",
    },
    {
      city: "London",
      country: "UK",
      address: "45 King William Street\nLondon EC4R 9AN",
      phone: "+44 20 7123 4567",
      email: "london@dsecure.com",
      timezone: "GMT (UTC+0)",
      image: "🇬🇧",
    },
    {
      city: "Singapore",
      country: "Singapore",
      address: "1 Marina Bay Financial Centre\nSingapore 018989",
      phone: "+65 6123 4567",
      email: "singapore@dsecure.com",
      timezone: "SGT (UTC+8)",
      image: "🇸🇬",
    },
  ];

  const supportOptions = [
    {
      title: "Sales Inquiries",
      description: "Get pricing information and discuss your requirements",
      icon: (
        <HoverIcon>
          {(filled) => <DollarIcon className="w-6 h-6" filled={filled} />}
        </HoverIcon>
      ),
      contact: "sales@dsecuretech.com",
      hours: "9 AM - 6 PM PST",
    },
    {
      title: "Technical Support",
      description: "24/7 support for existing customers",
      icon: (
        <HoverIcon>
          {(filled) => <GearIcon className="w-6 h-6" filled={filled} />}
        </HoverIcon>
      ),
      contact: "support@dsecuretech.com",
      hours: "24/7",
    },
    // {
    //   title: 'Partnership',
    //   description: 'Explore partnership and integration opportunities',
    //   icon: (
    //     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 119.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    //     </svg>
    //   ),
    //   contact: 'partners@dsecuretech.com',
    //   hours: '9 AM - 6 PM PST'
    // },
    // {
    //   title: 'Media & Press',
    //   description: 'Press inquiries and media resources',
    //   icon: (
    //     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    //     </svg>
    //   ),
    //   contact: 'press@dsecure.com',
    //   hours: '9 AM - 5 PM PST'
    // }
  ];

  return (
    <>
    <Helmet>
      <link rel="canonical" href="https://dsecuretech.com/contact" />
          <title>DSecureTech Compliance | Data Erasure Standards & Regulations</title>
          <meta
            name="description"
            content="DSecureTech helps businesses meet global data sanitization standards like NIST, ISO 27001, GDPR, HIPAA, PCI DSS, and SOX with verifiable compliance solutions."
          />
          <meta
            name="keywords"
            content="data erasure compliance, NIST 800-88, ISO 27001, GDPR, HIPAA, SOX, PCI DSS, enterprise data destruction, B2B data security"
          />
          <meta name="robots" content="index, follow" />
        </Helmet>
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 max-w-md ${
          toast.type === 'error' 
            ? 'bg-red-50 border-red-200 text-red-800' 
            : 'bg-green-50 border-green-200 text-green-800'
        }`}>
          <div className="flex items-start gap-3">
            {toast.type === 'error' ? (
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            <div className="flex-1">
              <span className="font-medium text-sm">{toast.message}</span>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <div className="container-responsive py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 xxl:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                Get in Touch
              </h1>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Ready to secure your data with industry-leading erasure
                solutions? Our experts are here to help you find the perfect fit
                for your organization.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-10 md:py-18">
        <div className="container-app">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8 md:p-12">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                    Submit Enquiry
                  </h2>
                  
                  {/* Usage Type Toggle */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center gap-8">
                      <span className="text-lg font-medium text-slate-700">Usage:</span>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="usage"
                          value="business"
                          checked={usageType === 'business'}
                          onChange={(e) => setUsageType(e.target.value as 'business' | 'personal')}
                          className="w-5 h-5 text-red-600"
                        />
                        <span className="text-lg font-medium">Business</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="usage"
                          value="personal"
                          checked={usageType === 'personal'}
                          onChange={(e) => setUsageType(e.target.value as 'business' | 'personal')}
                          className="w-5 h-5 text-red-600"
                        />
                        <span className="text-lg font-medium">Personal</span>
                      </label>
                    </div>
                  </div>

                  {/* Conditional Message for Personal */}
                  {usageType === 'personal' && (
                    <div className="mb-6 text-center text-blue-600">
                      Free License is only available for business usage. In case you have any query, fill the form below.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {usageType === 'business' ? (
                      // Business Form
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                              Full Name<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
                              placeholder="Full Name"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                              Business Email<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
                              placeholder="Business Email"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                              Phone No
                            </label>
                            <div className="flex">
                              <select
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleChange}
                                className="px-3 py-3 border border-slate-300 rounded-l-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors bg-white"
                              >
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
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="flex-1 px-4 py-3 border border-l-0 border-slate-300 rounded-r-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
                                placeholder="Phone No"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="businessType" className="block text-sm font-medium text-slate-700 mb-2">
                              Business Type
                            </label>
                            <select
                              id="businessType"
                              name="businessType"
                              value={formData.businessType}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors bg-white"
                            >
                              <option value="">Business Type</option>
                              <option value="enterprise">Enterprise</option>
                              <option value="government">Government</option>
                              <option value="healthcare">Healthcare</option>
                              <option value="education">Education</option>
                              <option value="financial">Financial Services</option>
                              <option value="legal">Legal</option>
                              <option value="technology">Technology</option>
                              <option value="manufacturing">Manufacturing</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                              Company Name<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              required
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-2">
                              Country
                            </label>
                            <select
                              id="country"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors bg-white"
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
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label htmlFor="solutionType" className="block text-sm font-medium text-slate-700 mb-2">
                              Select Solution Type <span className="text-red-500">*</span>
                            </label>
                            <select
                              id="solutionType"
                              name="solutionType"
                              required
                              value={formData.solutionType}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors bg-white"
                            >
                              <option value="">Select Solution Type *</option>
                              <option value="device-erasure">Device Erasure</option>
                              <option value="network-erasure">Network Erasure</option>
                              <option value="cloud-erasure">Cloud Erasure</option>
                              <option value="enterprise-suite">Enterprise Suite</option>
                              <option value="custom-solution">Custom Solution</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="complianceRequirements" className="block text-sm font-medium text-slate-700 mb-2">
                              Compliance Requirements
                            </label>
                            <select
                              id="complianceRequirements"
                              name="complianceRequirements"
                              value={formData.complianceRequirements}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors bg-white"
                            >
                              <option value="">Compliance Requirements</option>
                              <option value="nist-800-88">NIST 800-88</option>
                              <option value="dod-5220">DoD 5220.22-M</option>
                              <option value="gdpr">GDPR</option>
                              <option value="hipaa">HIPAA</option>
                              <option value="sox">SOX</option>
                              <option value="iso-27001">ISO 27001</option>
                              <option value="multiple">Multiple Standards</option>
                            </select>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Personal Form
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                              Full Name<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
                              placeholder="Full Name"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                              Email<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
                              placeholder="Email"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                              Phone Number
                            </label>
                            <div className="flex">
                              <select
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleChange}
                                className="px-3 py-3 border border-slate-300 rounded-l-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors bg-white"
                              >
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
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="flex-1 px-4 py-3 border border-l-0 border-slate-300 rounded-r-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
                                placeholder="Phone Number"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-2">
                              Country
                            </label>
                            <select
                              id="country"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors bg-white"
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
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label htmlFor="solutionType" className="block text-sm font-medium text-slate-700 mb-2">
                              Select Solution Type
                            </label>
                            <select
                              id="solutionType"
                              name="solutionType"
                              value={formData.solutionType}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors bg-white"
                            >
                              <option value="">Select Solution Type</option>
                              <option value="device-erasure">Device Erasure</option>
                              <option value="network-erasure">Network Erasure</option>
                              <option value="cloud-erasure">Cloud Erasure</option>
                              <option value="enterprise-suite">Enterprise Suite</option>
                              <option value="personal-use">Personal Use</option>
                              <option value="data-recovery">Data Recovery</option>
                              <option value="consultation">Consultation</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="complianceRequirements" className="block text-sm font-medium text-slate-700 mb-2">
                              Compliance Requirements
                            </label>
                            <select
                              id="complianceRequirements"
                              name="complianceRequirements"
                              value={formData.complianceRequirements}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors bg-white"
                            >
                              <option value="">Compliance Requirements</option>
                              <option value="nist-800-88">NIST 800-88</option>
                              <option value="dod-5220">DoD 5220.22-M</option>
                              <option value="gdpr">GDPR</option>
                              <option value="hipaa">HIPAA</option>
                              <option value="sox">SOX</option>
                              <option value="iso-27001">ISO 27001</option>
                              <option value="personal-privacy">Personal Privacy</option>
                              <option value="no-specific">No Specific Requirements</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Please let us know your requirements in detail.
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors resize-none"
                        placeholder="Please let us know your requirements in detail."
                      />
                    </div>

                    {/* reCAPTCHA Placeholder */}
                    {/* <div className="flex items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-lg">
                      <div className="text-center text-slate-500">
                        <div className="w-20 h-12 bg-slate-100 rounded mx-auto mb-2 flex items-center justify-center">
                          <CheckIcon className="w-6 h-6 text-slate-400" />
                        </div>
                        <span className="text-sm">I'm not a robot</span>
                        <div className="text-xs text-slate-400 mt-1">reCAPTCHA</div>
                      </div>
                    </div> */}

                    {/* Certification Logos */}
                    {/* <div className="text-center">
                      <div className="text-sm text-slate-600 mb-4">Tested & Certified.</div>
                      <div className="flex items-center justify-center gap-6 opacity-60">
                        <div className="text-xs bg-slate-100 px-3 py-2 rounded">NIST</div>
                        <div className="text-xs bg-slate-100 px-3 py-2 rounded">ADISA</div>
                        <div className="text-xs bg-slate-100 px-3 py-2 rounded">Common Criteria</div>
                      </div>
                    </div> */}

                    {usageType === 'personal' && (
                      <div className="text-sm text-slate-600">
                        I understand that the above information is protected by{' '}
                        <a href="/privacy-policy" className="text-green-600 hover:underline">
                          Dsecure Privacy Policy
                        </a>
                        .
                      </div>
                    )}

                    {/* Hidden field for recipient email */}
                    <input type="hidden" name="to_email" value="dhruv.rai@dsecuretech.com" />

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-lg font-medium transition-colors duration-200"
                    >
                      Submit Enquiry
                    </button>

                    {/* {usageType === 'business' && (
                      <div className="text-center text-sm text-slate-600">
                        <span className="text-red-500">*</span>Required
                      </div>
                    )} */}
                  </form>
                </div>
              </Reveal>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Reveal delayMs={10}>
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">
                    Quick Response
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-slate-700">
                        Response within 12 hours
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                      <span className="text-slate-700">
                        Live chat available
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-slate-700">
                        Expert technical support
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* <Reveal delayMs={20}>
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Emergency Support</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">24/7 Hotline</div>
                        <div className="text-slate-600 text-sm">+1 (555) 911-HELP</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 ml-11">
                      For critical security incidents and urgent support needs
                    </p>
                  </div>
                </div>
              </Reveal> */}
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How Can We Help?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose the right contact method for your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {supportOptions.map((option, i) => (
              <Reveal key={i} delayMs={i * 100}>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-slate-600">
                    {option.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {option.description}
                  </p>
                  <div className="space-y-1 text-xs text-slate-500 mb-4">
                    <div>{option.contact}</div>
                    <div>{option.hours}</div>
                  </div>
                  <button className="w-full btn-secondary text-sm">
                    <Link to="/contact" className="w-full">
                      Contact Now
                    </Link>
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Global Offices
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              With offices around the world, we're here to support you in your
              timezone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, i) => (
              <Reveal key={i} delayMs={i * 100}>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{office.image}</div>
                    <div>
                      <h3 className="font-bold text-slate-900">
                        {office.city}
                      </h3>
                      <p className="text-slate-600 text-sm">{office.country}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="whitespace-pre-line">
                        {office.address}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>{office.phone}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{office.email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{office.timezone}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <button className="w-full btn-secondary text-sm">
                      Schedule Visit
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
