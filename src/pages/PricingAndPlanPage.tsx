import React, { useState, memo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CustomLicenseModal, {
  CustomLicenseData,
} from "../components/CustomLicenseModal";
import SpecialPricingModal from "../components/SpecialPricingModal";
import { useToast } from "@/hooks";
import { Toast } from "@/components/ui";
import { ProductImage } from "@/components/ProductImage";
import { getProductIcon } from "@/utils/productIcons";
import {
  useFormSubmission,
  formDataTransformers,
} from "@/hooks/useFormSubmission";

const PricingAndPlanPage: React.FC = memo(() => {
  const { toast, showToast, hideToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("drive-eraser");
  const [selectedLicenses, setSelectedLicenses] = useState("10");
  const [selectedYears, setSelectedYears] = useState("1");
  const [selectedOS, setSelectedOS] = useState("Select");
  const [deliveryMethod, setDeliveryMethod] = useState("electronic");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showSpecialPricingModal, setShowSpecialPricingModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("basic");

  // Read URL parameters and set initial state
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    // Read plan parameter from URL
    const planFromUrl = searchParams.get('plan');
    if (planFromUrl) {
      // Map plan names from URL to plan IDs
      const planMapping: { [key: string]: string } = {
        'base': 'basic',
        'standard': 'standard', 
        'cloud': 'cloud',
        'network': 'network',
        'pro': 'pro',
        'enterprise': 'enterprise'
      };
      
      const mappedPlan = planMapping[planFromUrl.toLowerCase()];
      if (mappedPlan) {
        setSelectedPlan(mappedPlan);
      }
    }
    
    // Read product parameter from URL
    const productFromUrl = searchParams.get('product');
    if (productFromUrl) {
      setSelectedCategory(productFromUrl);
    }
    
    // Read section parameter to expand File Eraser section if needed
    const sectionFromUrl = searchParams.get('section');
    if (sectionFromUrl === 'file-eraser') {
      setSelectedCategory('file-eraser');
    }
  }, [location.search]);

  // Custom License Form Submission Configuration
  const customLicenseFormConfig = {
    endpoint: "https://formsubmit.co/dhruv.rai@dsecuretech.com",
    requiredFields: ["contactName", "email", "numberOfLicenses", "companyName"],
    successMessage:
      "Thank you! Your custom license request has been submitted successfully. Our sales team will contact you within 24 hours with a personalized quote.",
    errorMessage:
      "Failed to send your custom license request. Please try again or contact our sales team directly.",
    resetFormAfterSubmit: false,
    transformData: (data: Record<string, any>) => {
      // Transform and enrich the form data with context
      const enrichedData = {
        // Form submission identification
        _subject: `Custom License Request - ${getCurrentProduct().title}`,
        formType: "Custom License Request",
        submissionDate: new Date().toLocaleString(),
        timestamp: new Date().toISOString(),

        // Customer Information
        customerName: data.contactName,
        customerEmail: data.email,
        company: data.companyName || "Not provided",
        phone: data.phone || "Not provided",

        // License Requirements
        productName: getCurrentProduct().title,
        productCategory: selectedCategory,
        selectedPlan: getCurrentPlan().name,
        planDescription: getCurrentPlan().description,
        requestedLicenses: data.numberOfLicenses,
        licenseDuration: data.duration || "Not specified",
        budgetRange: data.budget || "Not specified",
        additionalRequirements: data.requirements || "None",

        // Current Product Configuration Context
        currentBasePrice: `$${getCurrentPlan().basePrice}/license`,
        currentSelectedPlan: getCurrentPlan().name,
        currentSelectedLicenses: selectedLicenses,
        currentSelectedYears: selectedYears,
        currentDeliveryMethod: deliveryMethod,

        // Marketing/Analytics Data
        pageUrl: window.location.href,
        referrer: document.referrer || "Direct",
        userAgent: navigator.userAgent,
      };

      return formDataTransformers.removeEmptyFields(enrichedData);
    },
    onSuccess: (data: Record<string, any>) => {
      // Close modal on success
      setShowCustomModal(false);

      // Optional: Track in analytics
      if (typeof (window as any).gtag !== "undefined") {
        (window as any).gtag("event", "custom_license_request", {
          event_category: "sales",
          event_label: selectedCategory,
          value: parseInt(data.numberOfLicenses || "0"),
        });
      }

      // Store locally for user reference
      const enquiryRecord = {
        id: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
        customerName: data.contactName,
        customerEmail: data.email,
        productName: getCurrentProduct().title,
        licenseQuantity: data.numberOfLicenses,
        status: "submitted",
      };

      const existingEnquiries = JSON.parse(
        localStorage.getItem("customLicenseEnquiries") || "[]"
      );
      existingEnquiries.push(enquiryRecord);
      localStorage.setItem(
        "customLicenseEnquiries",
        JSON.stringify(existingEnquiries)
      );
    },
    onError: (error: Error) => {
      console.error("Custom license form submission error:", error);
    },
  };

  // Initialize form submission hook
  const { isSubmitting, submitForm } = useFormSubmission(
    customLicenseFormConfig
  );

  // Special Pricing Form Configuration
  const specialPricingFormConfig = {
    endpoint: "https://formsubmit.co/dhruv.rai@dsecuretech.com",
    requiredFields: ["contactName", "email", "organizationType", "organizationName"],
    successMessage:
      "Thank you! Your special pricing request has been submitted successfully. Our team will contact you within 24 hours with customized pricing for your organization.",
    errorMessage:
      "Failed to send your special pricing request. Please try again or contact our sales team directly.",
    resetFormAfterSubmit: false,
    transformData: (data: Record<string, any>) => {
      const enrichedData = {
        _subject: `Special Pricing Request - ${data.organizationType} - ${getCurrentProduct().title}`,
        formType: "Special Pricing Request",
        submissionDate: new Date().toLocaleString(),
        timestamp: new Date().toISOString(),

        // Contact Information
        contactName: data.contactName,
        email: data.email,
        phone: data.phone || "Not provided",
        
        // Organization Information
        organizationType: data.organizationType,
        organizationName: data.organizationName,
        numberOfLicenses: data.numberOfLicenses || "Not specified",
        additionalInfo: data.additionalInfo || "None",

        // Product Context
        productName: getCurrentProduct().title,
        productCategory: selectedCategory,
        currentSelectedPlan: getCurrentPlan().name,
        
        // Marketing Data
        pageUrl: window.location.href,
        referrer: document.referrer || "Direct",
        userAgent: navigator.userAgent,
      };

      return formDataTransformers.removeEmptyFields(enrichedData);
    },
    onSuccess: (data: Record<string, any>) => {
      setShowSpecialPricingModal(false);
      
      if (typeof (window as any).gtag !== "undefined") {
        (window as any).gtag("event", "special_pricing_request", {
          event_category: "sales",
          event_label: data.organizationType,
          value: parseInt(data.numberOfLicenses || "0"),
        });
      }
    },
    onError: (error: Error) => {
      console.error("Special pricing form submission error:", error);
    },
  };

  const { isSubmitting: isSpecialPricingSubmitting, submitForm: submitSpecialPricingForm } = useFormSubmission(
    specialPricingFormConfig
  );

  const categories = [
    {
      id: "drive-eraser",
      name: "Drive Eraser",
      subtitle: "Erase HDDs, SSDs in PCs, Mac & Servers",
    },
    {
      id: "file-eraser",
      name: "File Eraser",
      subtitle: "Erase Files, Folders & Volumes",
    },
  ];

  // Plans configuration with their features and pricing based on D-Secure feature matrix
  const planOptions = [
    {
      id: "basic",
      name: "Basic Plan",
      basePrice: 40,
      description:
        "Essential data erasure features for individuals and small teams",
      category: "Platform & OS Support",
      features: [
        "INCLUDED: Windows Support",
        "INCLUDED: Linux Support",
        "NOT INCLUDED: macOS Support",
        "NOT INCLUDED: Multi-Bootable OS Support (3+)",
        "INCLUDED: Core Erasure Capabilities",
        "INCLUDED: International Algorithms (DoD 5220, Crypto Erase)",
        "INCLUDED: File & Folder Erase",
        "NOT INCLUDED: Erase Tracks (Browser, System, App data)",
        "NOT INCLUDED: Free Space Cleaning / Free Space File Cleaning",
        "NOT INCLUDED: Erase Volume",
        "NOT INCLUDED: Erase Disk (Full Devices)",
        "INCLUDED: Schedule Erase",
        "NOT INCLUDED: Cloud Storage Erase (Google Drive without opening account)",
        "NOT INCLUDED: Local PDF Reports",
        "NOT INCLUDED: White Label Reports",
        "NOT INCLUDED: Compliance Email Report Format",
        "NOT INCLUDED: XML Report Format",
        "NOT INCLUDED: Audit Grade Compliance Certificates",
        "NOT INCLUDED: Inspection Logs",
      ],
    },
    {
      id: "standard",
      name: "Standard Plan",
      basePrice: 80,
      description:
        "Enhanced features with broader OS support and core capabilities",
      category: "Standard Business Solution",
      features: [
        "INCLUDED: Windows Support",
        "INCLUDED: Linux Support",
        "INCLUDED: macOS Support",
        "NOT INCLUDED: Multi-Bootable OS Support (3+)",
        "INCLUDED: Core Erasure Capabilities",
        "INCLUDED: International Algorithms (DoD 5220, Crypto Erase)",
        "INCLUDED: File & Folder Erase",
        "INCLUDED: Erase Tracks (Browser, System, App data)",
        "INCLUDED: Free Space Cleaning / Free Space File Cleaning",
        "NOT INCLUDED: Erase Volume",
        "NOT INCLUDED: Erase Disk (Full Devices)",
        "INCLUDED: Schedule Erase",
        "INCLUDED: Cloud Storage Erase (Google Drive without opening account)",
        "INCLUDED: Local PDF Reports",
        "NOT INCLUDED: White Label Reports",
        "NOT INCLUDED: Compliance Email Report Format",
        "NOT INCLUDED: XML Report Format",
        "NOT INCLUDED: Audit Grade Compliance Certificates",
        "NOT INCLUDED: Inspection Logs",
      ],
    },
    {
      id: "cloud",
      name: "Cloud Plan",
      basePrice: 150,
      description:
        "Cloud-integrated solution with advanced reporting capabilities",
      category: "Cloud-Enhanced Solution",
      features: [
        "INCLUDED: Windows Support",
        "INCLUDED: Linux Support",
        "INCLUDED: macOS Support",
        "INCLUDED: Multi-Bootable OS Support (3+)",
        "INCLUDED: Core Erasure Capabilities",
        "INCLUDED: International Algorithms (DoD 5220, Crypto Erase)",
        "INCLUDED: File & Folder Erase",
        "INCLUDED: Erase Tracks (Browser, System, App data)",
        "INCLUDED: Free Space Cleaning / Free Space File Cleaning",
        "INCLUDED: Erase Volume",
        "INCLUDED: Erase Disk (Full Devices)",
        "INCLUDED: Schedule Erase",
        "INCLUDED: Cloud Storage Erase (Google Drive without opening account)",
        "INCLUDED: Local PDF Reports",
        "NOT INCLUDED: White Label Reports",
        "INCLUDED: Compliance Email Report Format",
        "INCLUDED: XML Report Format",
        "INCLUDED: Audit Grade Compliance Certificates",
        "INCLUDED: Inspection Logs",
      ],
    },
    {
      id: "network",
      name: "Network Plan",
      basePrice: 250,
      description: "Network-wide deployment with centralized management",
      category: "Network & Management Solution",
      features: [
        "INCLUDED: Windows Support",
        "INCLUDED: Linux Support",
        "INCLUDED: macOS Support",
        "INCLUDED: Multi-Bootable OS Support (3+)",
        "INCLUDED: Core Erasure Capabilities",
        "INCLUDED: International Algorithms (DoD 5220, Crypto Erase)",
        "INCLUDED: File & Folder Erase",
        "INCLUDED: Erase Tracks (Browser, System, App data)",
        "INCLUDED: Free Space Cleaning / Free Space File Cleaning",
        "INCLUDED: Erase Volume",
        "INCLUDED: Erase Disk (Full Devices)",
        "INCLUDED: Schedule Erase",
        "INCLUDED: Cloud Storage Erase (Google Drive without opening account)",
        "INCLUDED: Local PDF Reports",
        "INCLUDED: White Label Reports",
        "INCLUDED: Compliance Email Report Format",
        "INCLUDED: XML Report Format",
        "INCLUDED: Audit Grade Compliance Certificates",
        "INCLUDED: Inspection Logs",
        "INCLUDED: Web Dashboard",
        "INCLUDED: Cloud Commands (Remote Jobs)",
        "INCLUDED: Custom Installer (Auto-register functions)",
        "INCLUDED: Private Cloud Support",
        "INCLUDED: Multi-Level User Logic",
      ],
    },
    {
      id: "pro",
      name: "Pro Plan",
      basePrice: 400,
      description:
        "Professional solution with premium add-ons and customization",
      category: "Professional Solution",
      features: [
        "INCLUDED: Windows Support",
        "INCLUDED: Linux Support",
        "INCLUDED: macOS Support",
        "INCLUDED: Multi-Bootable OS Support (3+)",
        "INCLUDED: Core Erasure Capabilities",
        "INCLUDED: International Algorithms (DoD 5220, Crypto Erase)",
        "INCLUDED: File & Folder Erase",
        "INCLUDED: Erase Tracks (Browser, System, App data)",
        "INCLUDED: Free Space Cleaning / Free Space File Cleaning",
        "INCLUDED: Erase Volume",
        "INCLUDED: Erase Disk (Full Devices)",
        "INCLUDED: Schedule Erase",
        "INCLUDED: Cloud Storage Erase (Google Drive without opening account)",
        "INCLUDED: Local PDF Reports",
        "INCLUDED: White Label Reports",
        "INCLUDED: Compliance Email Report Format",
        "INCLUDED: XML Report Format",
        "INCLUDED: Audit Grade Compliance Certificates",
        "INCLUDED: Inspection Logs",
        "INCLUDED: Web Dashboard",
        "INCLUDED: Cloud Commands (Remote Jobs)",
        "INCLUDED: Custom Installer (Auto-register functions)",
        "ADD-ON: Free + add-on Private Cloud Support",
        "INCLUDED: Multi-Level User Logic",
        "ADD-ON: Free + add-on Additional USB Erasure Licenses",
        "ADD-ON: Free + add-on Additional Volume Erasure Licenses",
        "ADD-ON: Free + add-on Data Connection Manager",
        "ADD-ON: Free + add-on Extra Sub Users",
        "ADD-ON: Free + add-on Extra Private Clouds",
        "ADD-ON: Free + add-on Bootable Integration (MLO & Quick Tools)",
        "ADD-ON: Free + add-on Dedicated SLA/Support Manager",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      basePrice: 500,
      description:
        "Complete enterprise solution with all features and dedicated support",
      category: "Complete Enterprise Solution",
      features: [
        "INCLUDED: Windows Support",
        "INCLUDED: Linux Support",
        "INCLUDED: macOS Support",
        "INCLUDED: Multi-Bootable OS Support (3+)",
        "INCLUDED: Core Erasure Capabilities",
        "INCLUDED: International Algorithms (DoD 5220, Crypto Erase)",
        "INCLUDED: File & Folder Erase",
        "INCLUDED: Erase Tracks (Browser, System, App data)",
        "INCLUDED: Free Space Cleaning / Free Space File Cleaning",
        "INCLUDED: Erase Volume",
        "INCLUDED: Erase Disk (Full Devices)",
        "INCLUDED: Schedule Erase",
        "INCLUDED: Cloud Storage Erase (Google Drive without opening account)",
        "INCLUDED: Local PDF Reports",
        "INCLUDED: White Label Reports",
        "INCLUDED: Compliance Email Report Format",
        "INCLUDED: XML Report Format",
        "INCLUDED: Audit Grade Compliance Certificates",
        "INCLUDED: Inspection Logs",
        "INCLUDED: Web Dashboard",
        "INCLUDED: Cloud Commands (Remote Jobs)",
        "INCLUDED: Custom Installer (Auto-register functions)",
        "INCLUDED: Private Cloud Support (Included)",
        "INCLUDED: Multi-Level User Logic",
        "INCLUDED: Additional USB Erasure Licenses (Included)",
        "INCLUDED: Additional Volume Erasure Licenses (Included)",
        "INCLUDED: Data Connection Manager (Included)",
        "INCLUDED: Extra Sub Users (Included)",
        "INCLUDED: Extra Private Clouds (Included)",
        "INCLUDED: Bootable Integration (MLO & Quick Tools) (Included)",
        "INCLUDED: Dedicated SLA/Support Manager (Included)",
      ],
    },
    {
      id: "custom",
      name: "Custom Plan",
      basePrice: 0,
      description:
        "Tailored solution designed specifically for your organization's needs",
      category: "Custom Enterprise Solution",
      features: [
        "CUSTOM: Fully Customized Feature Set",
        "CUSTOM: Bespoke Integration & Development",
        "CUSTOM: Personalized Training & Onboarding",
        "CUSTOM: Custom Compliance Requirements",
        "CUSTOM: Flexible Licensing Model",
        "CUSTOM: White-label Solutions Available",
        "CUSTOM: Custom SLA & Support Terms",
        "CUSTOM: Dedicated Development Team",
        "CUSTOM: Priority Feature Requests",
      ],
    },
  ];

  // Get current plan details
  const getCurrentPlan = () => {
    return (
      planOptions.find((plan) => plan.id === selectedPlan) || planOptions[0]
    );
  };

  // Dynamic pricing calculation based on selected plan
  const calculatePrice = (
    category: string,
    licenses: string,
    years: string,
    plan: string
  ) => {
    const licenseCount = licenses === "custom" ? 0 : parseInt(licenses);
    
    if (category === "drive-eraser") {
      // Drive Eraser is fixed $20 per license (one-time purchase)
      return Math.round(20 * licenseCount * 100) / 100;
    }
    
    // File Eraser uses plan-based pricing
    const currentPlan = planOptions.find((p) => p.id === plan);
    if (!currentPlan || plan === "custom") return 0;

    const basePrice = currentPlan.basePrice;
    const yearCount = parseInt(years);

    // File Eraser is sold annually, so multiply by years
    const baseTotal = Math.round(basePrice * licenseCount * yearCount * 100) / 100;
    return baseTotal;
  };

  // Get plan-specific features for each product
  const getProductFeatures = (category: string, plan: string) => {
    const currentPlan = planOptions.find((p) => p.id === plan);
    if (!currentPlan) return [];

    if (category === "drive-eraser") {
      return [
        "Complete Hard Drive & SSD Erasure",
        "Enterprise-Grade Security Standards", 
        "Multi-Platform Device Support",
        "Compliance Reporting & Certificates",
        "Real-time Progress Monitoring",
        "Batch Processing Capabilities",
      ];
    } else if (category === "file-eraser") {
      // Return plan-specific features based on selected plan
      const baseFeatures = [
        "Secure File & Folder Deletion",
        "30+ International Erasure Algorithms",
        "Real-time Progress Monitoring",
      ];

      const planSpecificFeatures = {
        basic: [
          "Windows Support Only",
          "Basic File & Folder Erase",
          "Essential Erasure Capabilities",
        ],
        standard: [
          "Windows, Mac & Linux Support",
          "Free Space Cleaning",
          "Local PDF Reports",
          "Enhanced Erasure Features",
        ],
        cloud: [
          "All Standard Features",
          "Cloud Report Upload/Sync",
          "White-Label Reports",
          "XML Report Format",
          "Volume & Disk Erasure",
        ],
        network: [
          "All Cloud Features", 
          "Network Deployment",
          "Web Dashboard Access",
          "Cloud Commands (Remote Jobs)",
          "Multi-Level User Logs",
        ],
        pro: [
          "All Network Features",
          "Custom Installer (1 included)",
          "Private Cloud Support",
          "Premium Add-ons Available",
          "Priority Support",
        ],
        enterprise: [
          "All Pro Features Included",
          "5 Custom Installers",
          "Unlimited Private Clouds",
          "Dedicated Support Manager",
          "Bespoke Integrations Available",
        ],
        custom: [
          "Fully Customized Feature Set",
          "Bespoke Integration & Development",
          "Custom Compliance Requirements",
          "White-label Solutions",
          "Dedicated Development Team",
        ],
      };

      return [...baseFeatures, ...(planSpecificFeatures[plan as keyof typeof planSpecificFeatures] || [])];
    }
    return [];
  };

  const productData = {
    "drive-eraser": {
      title: "D-Secure Drive Eraser",
      subtitle:
        "Secure Data Erasure Software for HDD, SSD, PC, Laptop, Mac, Chromebook & Server",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "drive-eraser",
      version: "V1.0.0.0 Enterprise",
      basePrice: 20,
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay Per Use)",
      options: [
        "1",
        "10",
        "25",
        "50",
        "100",
        "250",
        "300",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: true,
    },
    "file-eraser": {
      title: "D-Secure File Eraser Professional",
      subtitle: "Complete File, Folder & Application Trace Elimination",
      image: getProductIcon("file-eraser", 64),
      imageCategory: "file-eraser",
      version: "Professional",
      basePrice: 40,
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay Per License)",
      options: [
        "1",
        "10",
        "25",
        "50",
        "100",
        "250",
        "300",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
    },
  };

  const getCurrentProduct = () =>
    productData[selectedCategory as keyof typeof productData];

  const getDisplayPrice = () => {
    if (selectedLicenses === "custom" || selectedPlan === "custom")
      return "Custom Quote";

    const totalPrice = calculatePrice(
      selectedCategory,
      selectedLicenses,
      selectedYears,
      selectedPlan
    );
    return `$${totalPrice.toFixed(2)}`;
  };

  const getPriceSubtitle = () => {
    if (selectedLicenses === "custom" || selectedPlan === "custom")
      return "Get Personalized Quote";

    if (selectedCategory === "drive-eraser") {
      return `Drive Eraser - ${selectedLicenses} licenses (one-time purchase)`;
    }

    // File Eraser plan-based subtitle
    let subtitle = `${getCurrentPlan().name} - ${selectedLicenses} licenses`;
    subtitle += ` × ${selectedYears} year${parseInt(selectedYears) > 1 ? 's' : ''}`;
    
    return subtitle;
  };

  const getPriceNote = () => {
    if (selectedLicenses === "custom" || selectedPlan === "custom")
      return "Tailored to your needs";

    if (selectedCategory === "drive-eraser") {
      return "Drive Eraser @ $20.00/license (one-time purchase)";
    }

    // File Eraser plan-based pricing
    const currentPlan = getCurrentPlan();
    let note = `${currentPlan.name} @ $${currentPlan.basePrice.toFixed(2)}/license/year`;
    
    if (parseInt(selectedYears) > 1) {
      note += ` × ${selectedYears} years`;
    }

    return note;
  };

  const handleCustomLicenseSubmit = async (data: CustomLicenseData) => {
    console.log("handleCustomLicenseSubmit called with data:", data);
    // Use the useFormSubmission hook to handle the form submission
    await submitForm(data);
  };

  const handleBuyNow = () => {
    if (selectedLicenses === "custom" || selectedPlan === "custom") {
      setShowCustomModal(true);
      return;
    }

    const totalPrice = calculatePrice(
      selectedCategory,
      selectedLicenses,
      selectedYears,
      selectedPlan
    );

    let paymentData;

    if (selectedCategory === "drive-eraser") {
      // Drive Eraser fixed pricing data
      paymentData = {
        productName: getCurrentProduct().title,
        productImage: getCurrentProduct().image,
        productImageCategory: getCurrentProduct().imageCategory,
        productVersion: getCurrentProduct().version,
        quantity: selectedLicenses,
        duration: "1", // Always 1 year for Drive Eraser (one-time)
        unitPrice: 20, // Fixed $20 per license
        totalPrice: totalPrice,
        deliveryMethod: deliveryMethod,
        features: [
          "Complete Hard Drive & SSD Erasure",
          "Enterprise-Grade Security Standards",
          "Multi-Platform Device Support",
          "Compliance Reporting & Certificates",
          "Real-time Progress Monitoring",
          "Batch Processing Capabilities",
        ],
        planName: undefined, // No plan for Drive Eraser
        planDescription: undefined, // No plan description
        category: selectedCategory,
      };
    } else {
      // File Eraser plan-based pricing data
      const currentPlan = getCurrentPlan();
      paymentData = {
        productName: getCurrentProduct().title,
        productImage: getCurrentProduct().image,
        productImageCategory: getCurrentProduct().imageCategory,
        productVersion: getCurrentProduct().version,
        quantity: selectedLicenses,
        duration: selectedYears,
        unitPrice: currentPlan.basePrice,
        totalPrice: totalPrice,
        deliveryMethod: deliveryMethod,
        features: currentPlan.features,
        planName: currentPlan.name,
        planDescription: currentPlan.description,
        category: selectedCategory,
      };
    }

    // Store payment data in localStorage for the payment page
    localStorage.setItem("paymentData", JSON.stringify(paymentData));

    // Navigate directly to payment page without login requirement
    navigate("/checkout");
  };

  const faqs = [
    {
      question: "How do I get my License?",
      answer:
        "Each product license is assigned based on the number of devices you choose. You will receive login credentials to access D-Secure Cloud and the necessary installation files after your order is confirmed. The total number of licenses will correspond to the number of devices selected during purchase. Once the order is confirmed, your product access details will be delivered instantly.",
    },
    {
      question: "If I order 1000 licenses, how many drives can I wipe?",
      answer:
        "Each license allows you to wipe one drive. So with 1000 licenses, you can wipe 1000 drives.",
    },
    {
      question: "Are there any shipping charges?",
      answer:
        "We offer FREE shipping for all physical deliveries worldwide. For digital delivery, you receive instant access via email.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and purchase orders for enterprise customers.",
    },
    {
      question: "Do you offer volume discounts?",
      answer:
        "Yes! We offer automatic volume discounts: 10% off for 25+ licenses, 15% off for 50+ licenses, and 20% off for 100+ licenses. Contact us for custom pricing on larger orders.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "All licenses include lifetime technical support via email, phone, and live chat. Enterprise customers receive priority support with dedicated account managers.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Pricing & Plans - D-Secure Data Erasure Software | Professional
          Licenses
        </title>
        <meta
          name="description"
          content="Choose the perfect D-Secure data erasure license plan. Drive Eraser, Admin Console, Mobile Eraser & File Eraser. Volume discounts available. Free shipping worldwide."
        />
        <meta
          name="keywords"
          content="data erasure pricing, secure delete software cost, NIST compliant erasure license, enterprise data wiping plans"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="container mx-auto px-4 xs:px-6 sm:px-6 md:px-8 py-8 xs:py-10 sm:py-12 md:py-12 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 xs:mb-14 sm:mb-16 md:mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 xs:px-6 sm:px-6 py-2 rounded-full text-xs xs:text-sm sm:text-sm font-semibold mb-4 xs:mb-6 sm:mb-6 shadow-lg">
              SECURE • COMPLIANT
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 xs:mb-6 sm:mb-6 leading-tight px-2">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                D-Secure
              </span>{" "}
              License
            </h1>
            <p className="text-base xs:text-lg sm:text-xl md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Professional data erasure solutions trusted by enterprises
              worldwide. NIST & DoD compliant with lifetime support and instant
              deployment.
            </p>
          </div>

          {/* Category Selection */}
          <div className="flex justify-center mb-8 xs:mb-10 sm:mb-12 md:mb-12">
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 xs:gap-4 sm:gap-4 max-w-2xl w-full px-4 xs:px-0 sm:px-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                  }}
                  className={`p-4 xs:p-5 sm:p-6 rounded-xl text-left transition-all duration-300 border-2 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white border-teal-500 shadow-xl transform scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:shadow-lg hover:scale-102"
                  }`}
                >
                  <h3 className="font-semibold text-xs xs:text-sm sm:text-sm mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs xs:text-xs sm:text-xs opacity-90">{category.subtitle}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xs:gap-8 sm:gap-8 mb-8 xs:mb-10 sm:mb-12 md:mb-12">
            {/* Product Image and Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-4 xs:p-6 sm:p-6 shadow-sm">
                <div className="flex flex-col xs:flex-row sm:flex-row items-start space-y-4 xs:space-y-0 xs:space-x-6 sm:space-x-6">
                  {/* Enhanced Product Image */}
                  <ProductImage
                    category={selectedCategory}
                    productName={getCurrentProduct().title}
                    version={getCurrentProduct().version}
                    size="large"
                    className="flex-shrink-0"
                  />

                  {/* Product Info */}
                  <div className="flex-1 w-full xs:w-auto sm:w-auto">
                    <h2 className="text-xl xs:text-2xl sm:text-2xl md:text-2xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-4">
                      {getCurrentProduct().title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {getCurrentProduct().subtitle}
                    </p>

                    {/* Dynamic Product Features */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3">
                        {selectedCategory === "drive-eraser" 
                          ? "Drive Eraser - Key Features:" 
                          : `${getCurrentPlan().name} - Key Features:`}
                      </h4>
                      {selectedCategory === "file-eraser" && (
                        <p className="text-xs text-gray-600 mb-3 italic">
                          {getCurrentPlan().description}
                        </p>
                      )}
                      {getProductFeatures(selectedCategory, selectedPlan).map(
                        (feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-2 rounded-lg"
                          >
                            <svg
                              className="w-4 h-4 text-green-600 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">
                              {feature}
                            </span>
                          </div>
                        )
                      )}
                    </div>

                    {/* Selection Criteria */}
                    <div className="mb-4 xs:mb-6 sm:mb-6">
                      <h3 className="text-base xs:text-lg sm:text-lg font-semibold text-gray-900 mb-3 xs:mb-4 sm:mb-4">
                        Configure Your License
                      </h3>
                      <div className={`grid gap-3 xs:gap-4 sm:gap-4 ${selectedCategory === "drive-eraser" ? "grid-cols-1" : "grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"}`}>
                        {/* Plan Selection - Only show for File Eraser */}
                        {selectedCategory === "file-eraser" && (
                          <div className="space-y-2">
                            <label className="block text-xs xs:text-sm font-semibold text-gray-700">
                              Select Plan:
                            </label>
                            <p className="text-xs text-gray-500">
                              Features will update based on your selection
                            </p>
                            <select
                              value={selectedPlan}
                              onChange={(e) => setSelectedPlan(e.target.value)}
                              className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white text-gray-900 text-sm xs:text-base font-medium shadow-sm hover:border-gray-400"
                            >
                              {planOptions.map((plan) => (
                                <option key={plan.id} value={plan.id}>
                                  {plan.name} - $
                                  {plan.basePrice > 0
                                    ? `${plan.basePrice}/license`
                                    : "Custom"}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* License Quantity */}
                        <div className="space-y-2">
                          <label className="block text-xs xs:text-sm font-semibold text-gray-700">
                            {getCurrentProduct().selectionLabel}
                          </label>
                          {getCurrentProduct().selectionNote && (
                            <p className="text-xs text-gray-500">
                              {getCurrentProduct().selectionNote}
                            </p>
                          )}
                          <select
                            value={selectedLicenses}
                            onChange={(e) =>
                              setSelectedLicenses(e.target.value)
                            }
                            className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white text-gray-900 text-sm xs:text-base font-medium shadow-sm hover:border-gray-400"
                          >
                            {getCurrentProduct().options.map((option) => (
                              <option key={option} value={option}>
                                {option === "custom"
                                  ? " Custom Quantity"
                                  : `${option} licenses`}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* License Duration */}
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            {selectedCategory === "file-eraser" ? "License Duration:" : "License Type:"}
                          </label>
                          <p className="text-xs text-gray-500">
                            {selectedCategory === "file-eraser" 
                              ? "File Eraser licenses are sold annually" 
                              : "Drive Eraser is a one-time purchase"}
                          </p>
                          <select
                            value={selectedCategory === "file-eraser" ? selectedYears : "1"}
                            onChange={(e) => selectedCategory === "file-eraser" && setSelectedYears(e.target.value)}
                            disabled={selectedCategory !== "file-eraser"}
                            className={`w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white text-gray-900 font-medium shadow-sm hover:border-gray-400 ${
                              selectedCategory !== "file-eraser" ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
                          >
                            {selectedCategory === "file-eraser" ? (
                              <>
                                <option value="1">1 Year</option>
                                <option value="2">2 Years</option>
                                <option value="3">3 Years</option>
                                <option value="5">5 Years</option>
                              </>
                            ) : (
                              <option value="1">One-time Purchase</option>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Special Pricing Section */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="text-center">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">
                          Are You An MSP, Academic Institute or Non-Profit Organization?
                        </h4>
                        <button
                          onClick={() => setShowSpecialPricingModal(true)}
                          className="text-blue-600 hover:text-blue-700 font-medium underline transition-colors"
                        >
                          Contact Us For Special Pricing
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Pricing Card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 xs:p-8 sm:p-8 shadow-xl border-2 border-blue-100 lg:sticky lg:top-8">
                {/* Price Display */}
                <div className="text-center mb-6 xs:mb-8 sm:mb-8">
                  <div className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent mb-2 xs:mb-3 sm:mb-3">
                    {getDisplayPrice()}
                  </div>
                  <div className="text-sm text-teal-500 font-semibold bg-teal-50 px-3 py-1 rounded-full inline-block mb-2">
                    {getPriceSubtitle()}
                  </div>
                  <div className="text-xs text-gray-500">{getPriceNote()}</div>
                </div>

                {/* Plan Summary - Only show for File Eraser */}
                {selectedCategory === "file-eraser" && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-100">
                    <h4 className="font-semibold text-gray-900 mb-2">{getCurrentPlan().name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{getCurrentPlan().description}</p>
                    <div className="text-xs text-teal-600 font-medium">
                      Category: {getCurrentPlan().category}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-3 xs:py-4 px-4 xs:px-5 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4 xs:mb-5 sm:mb-6 text-base xs:text-lg"
                >
                  {selectedLicenses === "custom" || selectedPlan === "custom"
                    ? " Request Custom Quote"
                    : " Buy Now"}
                </button>

                {/* Trust Indicators */}
                <div className="space-y-3 text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Free worldwide shipping</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Instant activation & support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OS Compatibility */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="text-center">
              <span className="text-blue-700 font-medium">
                OS Compatibility: Windows, Mac, Linux, DOS & Chrome OS |
                Certified: NIST SP 800-88, DoD 5220.22-M, Common Criteria |
                Instant Delivery Available
              </span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl p-4 xs:p-6 sm:p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 xs:mb-6 sm:mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full px-4 xs:px-5 sm:px-6 py-3 xs:py-4 text-left text-sm xs:text-base font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`w-5 h-5 transform transition-transform ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 xs:px-5 sm:px-6 py-3 xs:py-4 text-sm xs:text-base text-gray-700 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Toast Component */}
        {toast && <Toast toast={toast} onClose={hideToast} />}

        {/* Custom License Modal */}
        {showCustomModal && (
          <CustomLicenseModal
            onSubmit={handleCustomLicenseSubmit}
            onClose={() => setShowCustomModal(false)}
            isOpen={showCustomModal}
            productName={getCurrentProduct().title}
            isLoading={isSubmitting}
          />
        )}

        {/* Special Pricing Modal */}
        {showSpecialPricingModal && (
          <SpecialPricingModal
            onSubmit={submitSpecialPricingForm}
            onClose={() => setShowSpecialPricingModal(false)}
            isOpen={showSpecialPricingModal}
            productName={getCurrentProduct().title}
            isLoading={isSpecialPricingSubmitting}
          />
        )}
      </div>
    </>
  );
});

export default PricingAndPlanPage;
