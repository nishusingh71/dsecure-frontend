import Reveal from "@/components/Reveal";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  DollarIcon,
  GearIcon,
  CheckIcon,
  ClipboardIcon,
  BuildingIcon,
  ChatIcon,
  MobileIcon,
  HoverIcon,
} from "@/components/FlatIcons";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import { ENV } from "@/config/env";
export default function ContactPage() {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("contact")} />

      <ContactPageContent />
    </>
  );
}

// Office Data Structure Interface for type safety and easy expansion
interface OfficeContact {
  name: string;
  title: string;
  phone?: string;
  email?: string;
  directEmail?: string;
}

interface Office {
  id: number;
  company: {
    name: string;
    logo: string; // Emoji or image URL
    logoUrl?: string; // Optional: Dedicated field for company logo image URLs
    website: string;
    established: string;
  };
  location: {
    city: string;
    country: string;
    countryCode: string;
    flag: string;
    address: string;
    coordinates: { lat: number; lng: number };
    timezone: string;
    workingHours: string;
  };
  contacts: {
    primary: OfficeContact;
    sales?: { phone: string; email: string };
    support?: { phone: string; email: string };
  };
  services: string[];
  languages: string[];
  isHeadquarter: boolean;
  isActive: boolean;
}

function ContactPageContent() {
  const { t } = useTranslation();
  const [usageType, setUsageType] = useState<"business" | "personal">(
    "business",
  );
  const [isLoading, setIsLoading] = useState(false);
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

  // Helper function to easily add new offices
  // Usage: Simply call addNewOffice() with office data
  const addNewOffice = (office: Office): Office => {
    // Validation and setup logic can be added here
    return {
      ...office,
      id: office.id || Date.now(), // Auto-generate ID if not provided
      isActive: office.isActive !== false, // Default to active
    };
  };

  // Helper to get offices by region
  const getOfficesByRegion = (region: string): Office[] => {
    const regionMap: Record<string, string[]> = {
      americas: ["USA"],
      europe: ["UK"],
      asia: ["UAE", "Singapore"],
      "middle-east": ["UAE"],
    };
    return offices.filter((office) =>
      regionMap[region]?.includes(office.location.countryCode),
    );
  };

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

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Toast functionality
  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 6000); // Auto hide after 6 seconds
  };

  // FormSubmit configuration - Primary recipient
  const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/support@dsecuretech.com";

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    // Validation
    const errors: string[] = [];
    if (!formData.name?.trim()) errors.push("Name is required");
    if (!formData.email?.trim()) {
      errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }
    if (!formData.message?.trim()) errors.push("Message is required");

    if (errors.length > 0) {
      showToast(errors.join(", "), "error");
      return;
    }

    try {
      const now = new Date();
      const timestampLocal = now.toLocaleString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });

      // Prepare form data for FormSubmit
      const formSubmitData = new FormData();
      // === MANDATORY HIDDEN FIELDS ===
      // Webhook to notify backend - backend will send auto-response email
      formSubmitData.append(
        "_webhook",
        "https://api.dsecuretech.com/api/formsubmit/webhook",
      );
      // Disable captcha
      formSubmitData.append("_captcha", "false");
      // Table template for email
      formSubmitData.append("_template", "table");

      // === FORM FIELDS ===
      formSubmitData.append("name", formData.name.trim());
      formSubmitData.append("email", formData.email.trim());
      formSubmitData.append("message", formData.message.trim());

      // Required for autoresponse - tells FormSubmit where to send reply
      formSubmitData.append("_replyto", formData.email.trim());

      // Additional fields
      formSubmitData.append("company", formData.company?.trim() || "");
      formSubmitData.append(
        "phone",
        formData.phone
          ? `${formData.countryCode} ${formData.phone}`.trim()
          : "",
      );
      formSubmitData.append("country", formData.country);
      formSubmitData.append("businessType", formData.businessType);
      formSubmitData.append("solutionType", formData.solutionType);
      formSubmitData.append(
        "complianceRequirements",
        formData.complianceRequirements,
      );
      formSubmitData.append("usageType", usageType);
      formSubmitData.append("timestamp", timestampLocal);
      formSubmitData.append("source", "Contact Page");

      // Subject and CC
      formSubmitData.append(
        "_subject",
        "New Contact Form Submission - D-Secure Tech",
      );
      formSubmitData.append(
        "_cc",
        "niteshkushwaha592592@gmail.com,sainiprashant46@gmail.com,d.kumar9012@gmail.com,nishus877@gmail.com,spsingh8477@gmail.com",
      );

      // === 1. SUBMIT TO BACKEND API (DATABASE) ===
      const timestampISO = now.toISOString(); // Format for backend

      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company?.trim() || "",
        phone: formData.phone
          ? `${formData.countryCode} ${formData.phone}`.trim()
          : "",
        country: formData.country,
        businessType: formData.businessType,
        solutionType: formData.solutionType,
        complianceRequirements: formData.complianceRequirements,
        message: formData.message.trim(),
        usageType: usageType,
        source: "Contact Page",
        timestamp: timestampISO,
      };
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
      setIsLoading(false);
      // === SUCCESS ===
      showToast(
        "Thank you! Your enquiry has been submitted successfully.",
        "success",
      );
      try {
        const API_BASE = ENV.API_BASE_URL;
        const apiResponse = await fetch(
          `${API_BASE}/api/ContactFormSubmissions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionData),
          },
        );
        const response = await fetch(FORMSUBMIT_ENDPOINT, {
          method: "POST",
          body: formSubmitData,
          headers: {
            Accept: "application/json",
          },
        });
        // Microsoft Excel + Teams tracking (non-blocking)
        fetch(ENV.POWER_AUTOMATE_HTTP_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "REACT_CONTACT_2026",
          },
          body: JSON.stringify(submissionData),
        }).catch(() => {});

        if (!apiResponse.ok) {
          const errorData = await apiResponse.json();
          // Log but don't stop execution - let FormSubmit try as fallback/email handler
          console.error("Backend submission failed:", errorData);
          throw new Error(
            errorData.message ||
              "Failed to send message. Please try again later.",
          );

          // Optionally show error if it's a validation error meant for the user
          if (errorData.errors) {
            console.warn("Validation errors:", errorData.errors);
          }
        }

        // Reset form
      } catch (error: any) {
        console.error("Form error:", error);
        showToast(
          error.message || "Failed to send message. Please try again later.",
          "error",
        );
      }

      /*
      // === 2. SUBMIT TO FORMSUBMIT (EMAIL & WEBHOOK) ===
      // === FORM SUBMIT CONFIGURATION ===
      // Webhook to your .NET 8 backend
      formSubmitData.append("_webhook", "https://api.dsecuretech.com/api/formsubmit/webhook");

      // Important: Tell FormSubmit to expect JSON from your webhook
      formSubmitData.append("_webhookContentType", "application/json");

      // Tell FormSubmit to forward ALL data to your webhook
      formSubmitData.append("_webhookExtraData", "true");

      // Disable captcha
      formSubmitData.append("_captcha", "false");

      // Use table template for admin email
      formSubmitData.append("_template", "table");

      // Subject for admin email
      formSubmitData.append("_subject", "New Contact Form Submission - D-Secure Tech");

      // Important: Set reply-to for auto-response FROM YOUR BACKEND
      formSubmitData.append("_replyto", formData.email.trim());

      // CC for admin notifications
      formSubmitData.append("_cc", "dhruv.rai@dsecuretech.com,nishus877@gmail.com,spsingh8477@gmail.com");

      // === FORM FIELDS ===
      formSubmitData.append("name", formData.name.trim());
      formSubmitData.append("email", formData.email.trim());
      formSubmitData.append("message", formData.message.trim());

      // Additional fields
      formSubmitData.append("company", formData.company?.trim() || "Not Provided");
      formSubmitData.append("phone", formData.phone ? `${formData.countryCode} ${formData.phone}`.trim() : "Not Provided");
      formSubmitData.append("country", formData.country || "Not Provided");
      formSubmitData.append("businessType", formData.businessType || "Not Provided");
      formSubmitData.append("solutionType", formData.solutionType || "Not Provided");
      formSubmitData.append("complianceRequirements", formData.complianceRequirements || "Not Provided");
      formSubmitData.append("usageType", usageType || "Not Provided");
      formSubmitData.append("timestamp", timestampLocal);
      formSubmitData.append("source", "Contact Page");

      // === BACKEND AUTO-REPLY CONFIGURATION ===
      // Flag to tell backend to send auto-reply
      formSubmitData.append("sendAutoReply", "true");
      // Explicit email field for backend to use (fallback if 'email' is missing/ambiguous)
      formSubmitData.append("customer_email", formData.email.trim());

      // Submit to FormSubmit
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        body: formSubmitData,
        headers: {
          Accept: "application/json",
        },
      });

      const responseData = await response.json();
      console.log("FormSubmit Response:", responseData);

      if (response.ok && responseData.success) {
        // ... (Already handled by backend block)
      }
      */
    } catch (error) {
      // console.error("FormSubmit error:", error);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    // //console.log("Form submitted:", formData);
    sendEmail(e);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Enhanced Global Offices Configuration
  // Easy to modify and expand for future additions
  // LOGO SETUP INSTRUCTIONS:
  // To add a company logo image, set the 'logoUrl' field with the image URL
  // Example: logoUrl: "https://example.com/company-logo.png"
  // If logoUrl is provided, it will be displayed instead of the emoji in 'logo' field
  // The 'logo' field serves as fallback emoji when no logoUrl is provided
  const offices = [
    {
      id: 1,
      // Company Information
      company: {
        name: "InfoTree Computers LLC",
        logo: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1760288669/zlfj7dsd91i7dqrd9x9x.png", // Can be replaced with actual logo path in future
        website: "https://infotreeit.com",
        established: "2015",
      },
      // Location Details
      location: {
        city: "Dubai",
        country: "UAE",
        countryCode: "AE",
        flag: "🇦🇪",
        address: "Dubai, UAE",
        coordinates: { lat: 25.2048, lng: 55.2708 },
        timezone: "GST (UTC+4)",
        workingHours: "9 AM - 6 PM GST",
      },
      // Contact Information
      contacts: {
        primary: {
          name: "Varun Kumar Singh",
          title: "Managing Director",
          // phone: "(971)564427403",
          // email: "info@infotreeit.com",
          // directEmail: "varun@infotreeit.com",
        },
        // sales: {
        //   phone: "(971)564427403",
        //   email: "sales@infotreeit.com",
        // },
        // support: {
        //   phone: "(971)564427403",
        //   email: "support@infotreeit.com",
        // },
      },
      // Additional Details
      services: [
        "Data Erasure Solutions",
        "IT Consulting",
        "Hardware Services",
      ],
      languages: ["English", "Hindi", "Arabic"],
      isHeadquarter: false,
      isActive: true,
    },
    {
      id: 2,
      company: {
        name: "D-Secure Technologies",
        logo: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1759503993/ec8v6wcjdpwgpplobi3w.svg",
        website: "https://dsecuretech.com",
        established: "2025",
      },
      location: {
        city: "Noida",
        country: "India",
        countryCode: "IN",
        flag: "in",
        address: "Sec-62,Noida, UP 201301",
        coordinates: { lat: 28.5355, lng: 77.391 },
        timezone: "IST (UTC+5:30)",
        workingHours: "9 AM - 6 PM IST",
      },
      contacts: {
        primary: {
          name: "Dhruv Rai",
          title: "CEO",
          // phone: "8527346992",
          // email: "dhruv.rai@dsecuretech.com",
          // directEmail: "dhruv.rai@dsecuretech.com",
        },
        // sales: {
        //   phone: "8527346992",
        //   email: "sales@dsecuretech.com",
        // },
        // support: {
        //   phone: "8527346992",
        //   email: "support@dsecuretech.com",
        // },
      },
      services: ["Data Erasure Solutions"],
      languages: ["English", "Hindi"],
      isHeadquarter: true,
      isActive: true,
    },
    // {
    //   id: 3,
    //   company: {
    //     name: "D-Secure Europe Ltd",
    //     logo: "�🇧",
    //     website: "https://dsecure.eu",
    //     established: "2021"
    //   },
    //   location: {
    //     city: "London",
    //     country: "UK",
    //     countryCode: "GB",
    //     flag: "🇬🇧",
    //     address: "45 King William Street\nLondon EC4R 9AN",
    //     coordinates: { lat: 51.5074, lng: -0.1278 },
    //     timezone: "GMT (UTC+0)",
    //     workingHours: "9 AM - 6 PM GMT"
    //   },
    //   contacts: {
    //     primary: {
    //       name: "Sarah Johnson",
    //       title: "European Director",
    //       phone: "+44 20 7123 4567",
    //       email: "london@dsecure.com",
    //       directEmail: "sarah.johnson@dsecure.com"
    //     },
    //     sales: {
    //       phone: "+44 20 7123 4567",
    //       email: "sales.eu@dsecure.com"
    //     },
    //     support: {
    //       phone: "+44 20 7123 4568",
    //       email: "support.eu@dsecure.com"
    //     }
    //   },
    //   services: ["GDPR Compliance", "European Markets", "Data Erasure"],
    //   languages: ["English", "French", "German"],
    //   isHeadquarter: false,
    //   isActive: true
    // },
    // {
    //   id: 4,
    //   company: {
    //     name: "D-Secure Asia Pacific",
    //     logo: "��🇬",
    //     website: "https://dsecure.sg",
    //     established: "2022"
    //   },
    //   location: {
    //     city: "Singapore",
    //     country: "Singapore",
    //     countryCode: "SG",
    //     flag: "🇸🇬",
    //     address: "1 Marina Bay Financial Centre\nSingapore 018989",
    //     coordinates: { lat: 1.3521, lng: 103.8198 },
    //     timezone: "SGT (UTC+8)",
    //     workingHours: "9 AM - 6 PM SGT"
    //   },
    //   contacts: {
    //     primary: {
    //       name: "Michael Chen",
    //       title: "APAC Director",
    //       phone: "+65 6123 4567",
    //       email: "singapore@dsecure.com",
    //       directEmail: "michael.chen@dsecure.com"
    //     },
    //     sales: {
    //       phone: "+65 6123 4567",
    //       email: "sales.apac@dsecure.com"
    //     },
    //     support: {
    //       phone: "+65 6123 4568",
    //       email: "support.apac@dsecure.com"
    //     }
    //   },
    //   services: ["Regional Distribution", "Technical Support", "Training"],
    //   languages: ["English", "Mandarin", "Malay"],
    //   isHeadquarter: false,
    //   isActive: true
    // }
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
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 max-w-md ${
            toast.type === "error"
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-green-50 border-green-200 text-green-800"
          }`}
        >
          <div className="flex items-start gap-3">
            {toast.type === "error" ? (
              <svg
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 mt-0.5 flex-shrink-0"
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
            )}
            <div className="flex-1">
              <span className="font-medium text-sm">{toast.message}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
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
                      <span className="text-lg font-medium text-slate-700">
                        Usage:
                      </span>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="usage"
                          value="business"
                          checked={usageType === "business"}
                          onChange={(e) =>
                            setUsageType(
                              e.target.value as "business" | "personal",
                            )
                          }
                          className="w-5 h-5 text-red-600"
                        />
                        <span className="text-lg font-medium">Business</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="usage"
                          value="personal"
                          checked={usageType === "personal"}
                          onChange={(e) =>
                            setUsageType(
                              e.target.value as "business" | "personal",
                            )
                          }
                          className="w-5 h-5 text-red-600"
                        />
                        <span className="text-lg font-medium">Personal</span>
                      </label>
                    </div>
                  </div>

                  {/* Conditional Message for Personal */}
                  {usageType === "personal" && (
                    <div className="mb-6 text-center text-blue-600">
                      Free License is only available for business usage. In case
                      you have any query, fill the form below.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {usageType === "business" ? (
                      // Business Form
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
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
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
                              Business Email
                              <span className="text-red-500">*</span>
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
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
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
                            <label
                              htmlFor="businessType"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
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
                              <option value="financial">
                                Financial Services
                              </option>
                              <option value="legal">Legal</option>
                              <option value="technology">Technology</option>
                              <option value="manufacturing">
                                Manufacturing
                              </option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label
                              htmlFor="company"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
                              Company Name
                              <span className="text-red-500">*</span>
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
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
                              Country
                            </label>
                            <select
                              id="country"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors bg-white"
                            >
                              <option value="United States">
                                United States
                              </option>
                              <option value="Canada">Canada</option>
                              <option value="United Kingdom">
                                United Kingdom
                              </option>
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
                            <label
                              htmlFor="solutionType"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
                              Select Solution Type{" "}
                              <span className="text-red-500">*</span>
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
                              <option value="device-erasure">
                                Device Erasure
                              </option>
                              <option value="network-erasure">
                                Network Erasure
                              </option>
                              <option value="cloud-erasure">
                                Cloud Erasure
                              </option>
                              <option value="enterprise-suite">
                                Enterprise Suite
                              </option>
                              <option value="custom-solution">
                                Custom Solution
                              </option>
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="complianceRequirements"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
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
                              <option value="multiple">
                                Multiple Standards
                              </option>
                            </select>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Personal Form
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
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
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
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
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
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
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
                              Country
                            </label>
                            <select
                              id="country"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors bg-white"
                            >
                              <option value="United States">
                                United States
                              </option>
                              <option value="Canada">Canada</option>
                              <option value="United Kingdom">
                                United Kingdom
                              </option>
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
                            <label
                              htmlFor="solutionType"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
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
                              <option value="device-erasure">
                                Device Erasure
                              </option>
                              <option value="network-erasure">
                                Network Erasure
                              </option>
                              <option value="cloud-erasure">
                                Cloud Erasure
                              </option>
                              <option value="enterprise-suite">
                                Enterprise Suite
                              </option>
                              <option value="personal-use">Personal Use</option>
                              <option value="data-recovery">
                                Data Recovery
                              </option>
                              <option value="consultation">Consultation</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="complianceRequirements"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
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
                              <option value="personal-privacy">
                                Personal Privacy
                              </option>
                              <option value="no-specific">
                                No Specific Requirements
                              </option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
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
                    {usageType === "personal" && (
                      <div className="text-sm text-slate-600">
                        I understand that the above information is protected by{" "}
                        <a
                          href="/privacy-policy"
                          className="text-green-600 hover:underline"
                        >
                          Dsecure Privacy Policy
                        </a>
                        .
                      </div>
                    )}

                    <input
                      type="hidden"
                      name="to_email"
                      value="dhruv.rai@dsecuretech.com"
                    />

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-lg font-medium transition-colors duration-200"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit Enquiry"}
                    </button>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {offices
              .filter((office) => office.isActive)
              .map((office, i) => (
                <Reveal key={office.id} delayMs={i * 100}>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-shadow duration-300">
                    {/* Header with Company Logo & Info */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0">
                        <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center overflow-hidden">
                          {(office.company as any).logoUrl ||
                          office.company.logo?.startsWith("http") ? (
                            <img
                              src={
                                (office.company as any).logoUrl ||
                                office.company.logo
                              }
                              alt={`${office.company.name} logo`}
                              className="w-full h-full object-contain rounded-xl bg-white"
                              onError={(e) => {
                                // Fallback to company initials if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                const fallback =
                                  target.parentElement?.querySelector(
                                    ".logo-fallback",
                                  ) as HTMLElement;
                                if (fallback) {
                                  fallback.style.display = "flex";
                                }
                              }}
                            />
                          ) : (
                            <span className="text-2xl">
                              {office.company.logo}
                            </span>
                          )}
                          {/* Fallback content for failed images */}
                          <div
                            className="logo-fallback absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl items-center justify-center text-white font-bold text-lg"
                            style={{
                              display:
                                (office.company as any).logoUrl ||
                                office.company.logo?.startsWith("http")
                                  ? "none"
                                  : "flex",
                            }}
                          >
                            {office.company.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-slate-900 text-lg leading-tight">
                            {office.company.name}
                          </h3>
                          {office.isHeadquarter && (
                            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium">
                              HQ
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm flex items-center gap-1">
                          <span className="text-lg">
                            {office.location.flag}
                          </span>
                          {office.location.city}, {office.location.country}
                        </p>
                        <p className="text-slate-500 text-xs">
                          Est. {office.company.established}
                        </p>
                      </div>
                    </div>

                    {/* Primary Contact Person */}
                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {office.contacts.primary.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">
                            {office.contacts.primary.name}
                          </p>
                          <p className="text-slate-600 text-xs">
                            {office.contacts.primary.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-3 text-sm text-slate-600 mb-4">
                      {/* Address */}
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
                          {office.location.address}
                        </span>
                      </div>

                      {/* Primary Phone - Only show if phone exists */}
                      {(office.contacts.primary as any).phone && (
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
                          <a
                            href={`tel:${(office.contacts.primary as any).phone}`}
                            className="hover:text-emerald-600 transition-colors"
                          >
                            {(office.contacts.primary as any).phone}
                          </a>
                        </div>
                      )}

                      {/* Primary Email - Only show if email exists */}
                      {(office.contacts.primary as any).email && (
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
                          <a
                            href={`mailto:${(office.contacts.primary as any).email}`}
                            className="hover:text-emerald-600 transition-colors"
                          >
                            {(office.contacts.primary as any).email}
                          </a>
                        </div>
                      )}

                      {/* Working Hours & Timezone */}
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
                        <span>
                          {office.location.workingHours} •{" "}
                          {office.location.timezone}
                        </span>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mb-4">
                      <p className="text-xs font-medium text-slate-700 mb-2">
                        Key Services:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {office.services.slice(0, 3).map((service, idx) => (
                          <span
                            key={idx}
                            className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-md"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons - Only show if contact info exists */}
                    {((office.contacts.primary as any).email ||
                      (office.contacts.primary as any).phone) && (
                      <div className="flex gap-2 pt-4 border-t border-slate-200">
                        {(office.contacts.primary as any).email && (
                          <a
                            href={`mailto:${(office.contacts.primary as any).email}?subject=Meeting Request - ${office.location.city} Office`}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                          >
                            Contact Office
                          </a>
                        )}
                        {(office.contacts.primary as any).phone && (
                          <a
                            href={`tel:${(office.contacts.primary as any).phone}`}
                            className="flex-1 border border-slate-300 hover:border-emerald-500 text-slate-700 hover:text-emerald-600 text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                          >
                            Call Now
                          </a>
                        )}
                      </div>
                    )}

                    {/* Quick Contact Options - Only show if sales/support emails exist */}
                    {((office.contacts as any).sales?.email ||
                      (office.contacts as any).support?.email) && (
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <p className="text-xs text-slate-500 mb-2">
                          Quick Contact:
                        </p>
                        <div className="flex gap-4 text-xs">
                          {(office.contacts as any).sales?.email && (
                            <a
                              href={`mailto:${(office.contacts as any).sales.email}`}
                              className="text-emerald-600 hover:underline"
                            >
                              Sales: {(office.contacts as any).sales.email}
                            </a>
                          )}
                          {(office.contacts as any).support?.email && (
                            <a
                              href={`mailto:${(office.contacts as any).support.email}`}
                              className="text-emerald-600 hover:underline"
                            >
                              Support: {(office.contacts as any).support.email}
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
