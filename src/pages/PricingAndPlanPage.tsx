import React, { useState, memo, useEffect } from "react";
import { ENV } from "../config/env";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import { useNavigate, useLocation } from "react-router-dom";
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
// Dodo Payments Overlay Checkout SDK
import { initDodoCheckout, openOverlayCheckout } from "@/utils/dodoCheckout";

const PricingAndPlanPage: React.FC = memo(() => {
  const { toast, showToast, hideToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("drive-eraser");
  // Har product ke liye alag quantity maintain karne ke liye state object
  const [licenseQuantities, setLicenseQuantities] = useState<Record<string, string>>({
    "drive-eraser": "1",
    "file-eraser": "1",
    "hardware-diagnostics": "100",
    "smart-diagnostic": "1"
  });
  // Current selected category ki quantity nikalna
  const selectedLicenses = licenseQuantities[selectedCategory] || "1";
  // Quantity update karne wala helper function
  const setSelectedLicenses = (val: string) => {
    setLicenseQuantities(prev => ({ ...prev, [selectedCategory]: val }));
  };


  const [selectedYears, setSelectedYears] = useState("1");
  const [selectedOS, setSelectedOS] = useState("Select");
  const [deliveryMethod, setDeliveryMethod] = useState("electronic");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showSpecialPricingModal, setShowSpecialPricingModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("eraser"); // "eraser" or "diagnostics"
  const [driveEraserVariant, setDriveEraserVariant] = useState("standard"); // "standard" or "diagnostics"
  const [fileEraserVariant, setFileEraserVariant] = useState("standard"); // "standard" or "network"
  const [freezeStateVariant, setFreezeStateVariant] = useState("standard"); // "standard", "smart", or "advanced"
  const [forensicImagingVariant, setForensicImagingVariant] = useState("basic"); // "basic", "advanced", or "hardware"

  // Reset loading state when component mounts (handles back navigation)
  useEffect(() => {
    setIsBuyNowLoading(false);
  }, []);

  // ✅ Dodo Payments SDK initialize on mount — overlay mode
  useEffect(() => {
    initDodoCheckout({
      onComplete: () => {
        console.log('✅ Payment complete — redirecting to success page');
        setIsBuyNowLoading(false);
        navigate('/order-success');
      },
      onClose: () => {
        console.log('🔶 User ne checkout band kiya');
        setIsBuyNowLoading(false);
      },
    });
  }, [navigate]);

  // Read URL parameters and set initial state
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Read plan parameter from URL
    const planFromUrl = searchParams.get("plan");
    if (planFromUrl) {
      // Map plan names from URL to plan IDs (supports both old names and new IDs)
      const planMapping: { [key: string]: string } = {
        base: "basic",
        basic: "basic", // Direct ID support
        standard: "standard",
        cloud: "cloud",
        network: "network",
        pro: "pro",
        enterprise: "enterprise",
      };

      const mappedPlan = planMapping[planFromUrl.toLowerCase()];
      if (mappedPlan) {
        setSelectedPlan(mappedPlan);
      }

    }

    const productFromUrl = searchParams.get("product");
    if (productFromUrl) {
      setSelectedCategory(productFromUrl);
    }


    // Read section parameter to expand File Eraser section if needed
    const sectionFromUrl = searchParams.get("section");
    if (sectionFromUrl === "file-eraser") {
      setSelectedCategory("file-eraser");
      setActiveTab("eraser");
    }

    // Read variant parameter for Drive Eraser
    const variantFromUrl = searchParams.get("variant");
    if (variantFromUrl === "diagnostics") {
      setDriveEraserVariant("diagnostics");
    } else {
      setDriveEraserVariant("standard");
    }

    // Set active tab based on selected category
    if (
      productFromUrl === "hardware-diagnostics" ||
      productFromUrl === "smart-diagnostic" ||
      productFromUrl === "smartphone-diagnostic" ||
      productFromUrl === "autopilot-mdm"
    ) {
      setActiveTab("diagnostics");
    } else if (
      productFromUrl === "data-migration" ||
      productFromUrl === "freeze-state" ||
      productFromUrl === "forensic-imaging"
    ) {
      setActiveTab("migration");
    } else if (
      productFromUrl === "drive-eraser" ||
      productFromUrl === "file-eraser" ||
      productFromUrl === "virtual-machine-eraser" ||
      productFromUrl === "smartphone-eraser"
    ) {
      setActiveTab("eraser");
    }
  }, [location.search]);

  // FIXED: Custom License Form Submission Configuration
  const customLicenseFormConfig = {
    endpoint: "https://formsubmit.co/support@dsecuretech.com", // FIXED: Correct endpoint
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
          value: Number.parseInt(data.numberOfLicenses || "0"),
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
        localStorage.getItem("customLicenseEnquiries") || "[]",
      );
      existingEnquiries.push(enquiryRecord);
      localStorage.setItem(
        "customLicenseEnquiries",
        JSON.stringify(existingEnquiries),
      );
    },
    onError: (error: Error) => {
      console.error("Custom license form submission error:", error);
    },
  };

  // Initialize form submission hook
  const { isSubmitting, submitForm } = useFormSubmission(
    customLicenseFormConfig,
  );

  // FIXED: Special Pricing Form Configuration
  const specialPricingFormConfig = {
    endpoint: "https://formsubmit.co/support@dsecuretech.com", // FIXED: Correct endpoint
    requiredFields: [
      "contactName",
      "email",
      "organizationType",
      "organizationName",
    ],
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
          value: Number.parseInt(data.numberOfLicenses || "0"),
        });
      }
    },
    onError: (error: Error) => {
      console.error("Special pricing form submission error:", error);
    },
  };

  const {
    isSubmitting: isSpecialPricingSubmitting,
    submitForm: submitSpecialPricingForm,
  } = useFormSubmission(specialPricingFormConfig);

  const categories = [
    {
      id: "drive-eraser",
      name: "Drive Eraser",
      subtitle: "Erase HDDs, SSDs in PCs, Mac & Servers",
    },
    {
      id: "hardware-diagnostics",
      name: "Hardware",
      subtitle: "Test Device Hardware Health & Performance",
    },
    {
      id: "smart-diagnostic",
      name: "Smart",
      subtitle: "Professional Hard Drive Health Monitoring",
    },
    {
      id: "file-eraser",
      name: "File Eraser",
      subtitle: "Erase Files, Folders & Volumes",
    },
    // {
    //   id: "virtual-machine-eraser",
    //   name: "VM Eraser",
    //   subtitle: "Erase Virtual Machines in VMware & Hyper-V",
    // },
    // {
    //   id: "smartphone-eraser",
    //   name: "Smartphone Eraser",
    //   subtitle: "Erase iOS & Android Devices",
    // },
    // {
    //   id: "smartphone-diagnostic",
    //   name: "Smartphone",
    //   subtitle: "iOS & Android Diagnostics",
    // },
    // {
    //   id: "autopilot-mdm",
    //   name: "Autopilot+MDM",
    //   subtitle: "Autopilot & MDM Enrollment Detection",
    // },
    // {
    //   id: "data-migration",
    //   name: "Data Migration",
    //   subtitle: "Fast & Secure Data Migration Solution",
    // },
    {
      id: "freeze-state",
      name: "Freeze State",
      subtitle: "System restore and protection solution",
    },
    // {
    //   id: "forensic-imaging",
    //   name: "Forensic Imaging",
    //   subtitle: "Professional data acquisition and analysis",
    // },
  ];

  // Tab categorization
    const filteredCategories = categories.filter((cat) => {
      if (activeTab === "eraser") {
        return (
          cat.id === "drive-eraser" ||
          cat.id === "file-eraser" ||
          cat.id === "virtual-machine-eraser" ||
          cat.id === "smartphone-eraser"
        );
      }
      if (activeTab === "migration") {
        return (
          cat.id === "data-migration" ||
          cat.id === "freeze-state" ||
          cat.id === "forensic-imaging"
        );
      }
      return (
        cat.id === "hardware-diagnostics" ||
        cat.id === "smart-diagnostic" ||
        cat.id === "smartphone-diagnostic" ||
        cat.id === "autopilot-mdm"
      );
    });

  // Plans configuration with their features and pricing based on D-Secure feature matrix
  const planOptions = [
    {
      id: "basic",
      name: "Standard",
      basePrice: 80,
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
        "NOT INCLUDED: Audit Grade Regulatory Documents",
        "NOT INCLUDED: Inspection Logs",
      ],
    },
    {
      id: "standard",
      name: "Corporate",
      basePrice: 150,
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
        "NOT INCLUDED: Audit Grade Regulatory Documents",
        "NOT INCLUDED: Inspection Logs",
      ],
    },
    // Hidden: Cloud and Network plans
    // {
    //   id: "cloud",
    //   name: "Cloud",
    //   basePrice: 150,
    //   description:
    //     "Cloud-integrated solution with advanced reporting capabilities",
    //   category: "Cloud-Enhanced Solution",
    //   features: [
    //     "INCLUDED: Windows Support",
    //     "INCLUDED: Linux Support",
    //     "INCLUDED: macOS Support",
    //     "INCLUDED: Multi-Bootable OS Support (3+)",
    //     "INCLUDED: Core Erasure Capabilities",
    //     "INCLUDED: International Algorithms (DoD 5220, Crypto Erase)",
    //     "INCLUDED: File & Folder Erase",
    //     "INCLUDED: Erase Tracks (Browser, System, App data)",
    //     "INCLUDED: Free Space Cleaning / Free Space File Cleaning",
    //     "INCLUDED: Erase Volume",
    //     "INCLUDED: Erase Disk (Full Devices)",
    //     "INCLUDED: Schedule Erase",
    //     "INCLUDED: Cloud Storage Erase (Google Drive without opening account)",
    //     "INCLUDED: Local PDF Reports",
    //     "NOT INCLUDED: White Label Reports",
    //     "INCLUDED: Compliance Email Report Format",
    //     "INCLUDED: XML Report Format",
    //     "INCLUDED: Audit Grade Compliance Certificates",
    //     "INCLUDED: Inspection Logs",
    //   ],
    // },
    // {
    //   id: "network",
    //   name: "Network",
    //   basePrice: 250,
    //   description: "Network-wide deployment with centralized management",
    //   category: "Network & Management Solution",
    //   features: [
    //     "INCLUDED: Windows Support",
    //     "INCLUDED: Linux Support",
    //     "INCLUDED: macOS Support",
    //     "INCLUDED: Multi-Bootable OS Support (3+)",
    //     "INCLUDED: Core Erasure Capabilities",
    //     "INCLUDED: International Algorithms (DoD 5220, Crypto Erase)",
    //     "INCLUDED: File & Folder Erase",
    //     "INCLUDED: Erase Tracks (Browser, System, App data)",
    //     "INCLUDED: Free Space Cleaning / Free Space File Cleaning",
    //     "INCLUDED: Erase Volume",
    //     "INCLUDED: Erase Disk (Full Devices)",
    //     "INCLUDED: Schedule Erase",
    //     "INCLUDED: Cloud Storage Erase (Google Drive without opening account)",
    //     "INCLUDED: Local PDF Reports",
    //     "INCLUDED: White Label Reports",
    //     "INCLUDED: Compliance Email Report Format",
    //     "INCLUDED: XML Report Format",
    //     "INCLUDED: Audit Grade Compliance Certificates",
    //     "INCLUDED: Inspection Logs",
    //     "INCLUDED: Web Dashboard",
    //     "INCLUDED: Cloud Commands (Remote Jobs)",
    //     "INCLUDED: Custom Installer (Auto-register functions)",
    //     "INCLUDED: Private Cloud Support",
    //     "INCLUDED: Multi-Level User Logic",
    //   ],
    // },
    {
      id: "pro",
      name: "Professional",
      basePrice: 250,
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
        "INCLUDED: Audit Grade Regulatory Documents",
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
      name: "Enterprise",
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
        "INCLUDED: Audit Grade Regulatory Documents",
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
      name: "Custom",
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

  // ── PRODUCT CONFIGURATION ──
  const productData = {
    "drive-eraser": {
      title:
        driveEraserVariant === "diagnostics"
          ? "Drive Eraser + Diagnostics"
          : "D-Secure Drive Eraser",
      subtitle:
        driveEraserVariant === "diagnostics"
          ? "Professional Data Erasure with Integrated Hardware Diagnostics & SMART Health Analysis."
          : "Secure Data Erasure Software for HDD, SSD, PC, Laptop, Mac, Chromebook & Server. (Available for Intel x64 and x86)",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "drive-eraser",
      version: "V1.0.0.0 Enterprise",
      basePrice: driveEraserVariant === "diagnostics" ? 30 : 25,
      originalPrice: driveEraserVariant === "diagnostics" ? 60 : 50,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay-per-use)",
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
      title:
        fileEraserVariant === "network"
          ? "D-Secure File Eraser Network"
          : "D-Secure File Eraser Professional",
      subtitle:
        fileEraserVariant === "network"
          ? "Enterprise network-wide file sanitization and management across your domain. (Available for Windows)"
          : "Complete File, Folder & Application Trace Elimination. (Available for Windows)",
      image: getProductIcon("file-eraser", 64),
      imageCategory: "file-eraser",
      version: fileEraserVariant === "network" ? "Network Edition" : "Professional",
      basePrice: fileEraserVariant === "network" ? 50 : 40,
      originalPrice: fileEraserVariant === "network" ? 75 : 60,
      discountPercentage: "33% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay per year license)",
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
    "hardware-diagnostics": {
      title: "D-Secure Hardware Diagnostics",
      subtitle:
        "Hardware Health Testing for Laptops, PCs, Desktops & Servers.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "hardware-diagnostics",
      version: "V1.0.0.0",
      basePrice: 10,
      originalPrice: 20,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay-per-use)",
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
    "smart-diagnostic": {
      title: "D-Secure Smart Diagnostic",
      subtitle:
        "Real-time Disk Health & Performance Monitoring.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "smart-diagnostic",
      version: "V1.0.0.0",
      basePrice: 20,
      originalPrice: 40,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay per year license)",
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
    "virtual-machine-eraser": {
      title: "D-Secure VM Eraser",
      subtitle: "Erase Virtual Hard Disks and Virtual Machines securely.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "virtual-machine-eraser",
      version: "V1.0.0.0",
      basePrice: 20,
      originalPrice: 40,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay-per-use)",
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
    "smartphone-eraser": {
      title: "D-Secure Smartphone Eraser",
      subtitle: "Erase Android & iOS Mobile Devices & Tablets.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "smartphone-eraser",
      version: "V1.0.0.0",
      basePrice: 1,
      originalPrice: 2,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay-per-use)",
      options: [
        "1",
        "10",
        "50",
        "100",
        "250",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
    },
    "smartphone-diagnostic": {
      title: "Smartphone Diagnostic",
      subtitle:
        "Comprehensive hardware & software diagnostics for mobile devices.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "smartphone-diagnostic",
      version: "V1.0.0.0",
      basePrice: 20,
      originalPrice: 40,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay per year license)",
      options: [
        "1",
        "10",
        "25",
        "50",
        "100",
        "250",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
    },
    "autopilot-mdm": {
      title: "Autopilot & MDM Detection",
      subtitle: "Instantly detect Autopilot & MDM status on devices.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "autopilot-mdm",
      version: "V1.0.0.0",
      basePrice: 5,
      originalPrice: 10,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay-per-use)",
      options: [
        "1",
        "10",
        "25",
        "50",
        "100",
        "250",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
    },
    "data-migration": {
      title: "Data Migration",
      subtitle: "Secure and high-speed data migration between devices.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "data-migration",
      version: "V1.0.0.0",
      basePrice: 5,
      originalPrice: 10,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay-per-use)",
      options: [
        "1",
        "10",
        "25",
        "50",
        "100",
        "250",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
    },
    "freeze-state": {
      title:
        freezeStateVariant === "smart"
          ? "Smart Diagnostic (Freeze State)"
          : freezeStateVariant === "advanced"
            ? "Advanced Eraser (Freeze State)"
            : "Freeze State Standard",
      subtitle:
        freezeStateVariant === "smart"
          ? "Advanced hardware health monitoring for critical systems."
          : freezeStateVariant === "advanced"
            ? "Government-grade data sanitization for high-security areas."
            : "Protect system configuration and restore on reboot.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "freeze-state",
      version: "V1.0.0.0",
      basePrice:
        freezeStateVariant === "smart"
          ? 85
          : freezeStateVariant === "advanced"
            ? 90
            : 80,
      originalPrice:
        freezeStateVariant === "smart"
          ? 170
          : freezeStateVariant === "advanced"
            ? 180
            : 160,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Licenses:",
      selectionNote: `(Starting from $${freezeStateVariant === "smart" ? 85 : freezeStateVariant === "advanced" ? 90 : 80})`,
      options: [
        "1",
        "10",
        "25",
        "50",
        "100",
        "250",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
    },
    "forensic-imaging": {
      title:
        forensicImagingVariant === "advanced"
          ? "Forensic Imaging Advanced"
          : forensicImagingVariant === "hardware"
            ? "Forensic Imaging Hardware"
            : "Forensic Imaging Basic",
      subtitle:
        forensicImagingVariant === "hardware"
          ? "Professional hardware acquisition station for forensic labs."
          : "Complete bit-stream data acquisition and forensic analysis.",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "forensic-imaging",
      version: "V1.0.0.0",
      basePrice:
        forensicImagingVariant === "advanced"
          ? 10526
          : forensicImagingVariant === "hardware"
            ? 31579
            : 1053,
      originalPrice:
        forensicImagingVariant === "advanced"
          ? 21052
          : forensicImagingVariant === "hardware"
            ? 63158
            : 2106,
      discountPercentage: "50% OFF",
      selectionLabel: "Number of Units:",
      selectionNote: `(Starting from $${forensicImagingVariant === "advanced" ? "10,526" : forensicImagingVariant === "hardware" ? "31,579" : "1,053"})`,
      options: [
        "1",
        "5",
        "10",
        "25",
        "custom",
      ],
      showDeliveryOptions: forensicImagingVariant === "hardware",
    },
  };

  const getCurrentProduct = () =>
    productData[selectedCategory as keyof typeof productData];

  // Dynamic pricing calculation based on selected configuration
  const calculatePrice = (
    category: string,
    licenses: string,
    years: string,
    plan: string,
  ) => {
    const licenseCount = licenses === "custom" ? 0 : Number.parseInt(licenses);
    const product = productData[category as keyof typeof productData];

    if (!product) return 0;

    // One-time purchase products (Drive Eraser, Hardware Diagnostics, VM Eraser, Smartphone Eraser, Autopilot+MDM)
    if (
      category === "drive-eraser" ||
      category === "hardware-diagnostics" ||
      category === "virtual-machine-eraser" ||
      category === "smartphone-eraser" ||
      category === "autopilot-mdm" ||
      category === "data-migration" ||
      category === "freeze-state" ||
      category === "forensic-imaging"
    ) {
      return Math.round(product.basePrice * licenseCount * 100) / 100;
    }

    // Subscription based products (Smart Diagnostic, File Eraser, Smartphone Diagnostic)
    if (
      category === "smart-diagnostic" ||
      category === "file-eraser" ||
      category === "smartphone-diagnostic"
    ) {
      const yearCount = Number.parseInt(years);
      return Math.round(product.basePrice * licenseCount * yearCount * 100) / 100;
    }

    return 0;
  };

  // Get plan-specific features for each product
  const getProductFeatures = (category: string, plan: string) => {
    const currentPlan = planOptions.find((p) => p.id === plan);
    if (!currentPlan) return [];

    if (category === "drive-eraser") {
      const baseFeatures = [
        "Complete Hard Drive & SSD Erasure",
        "Enterprise-Grade Security Standards",
        "Multi-Platform Device Support",
        "Compliance Reporting & Regulatory Documents",
        "Real-time Progress Monitoring",
        "Batch Processing Capabilities",
      ];

      if (driveEraserVariant === "diagnostics") {
        return [
          ...baseFeatures,
          "Advanced Hardware Diagnostics",
          "SMART Health Analysis",
          "Automated Device Grading",
        ];
      }
      return baseFeatures;
    } else if (category === "hardware-diagnostics") {
      return [
        "PC, Laptops & Mac (Intel & Silicon M1-M4)",
        "PXE Mass Diagnostics (up to 255 Machines)",
        "10+ Automated Component Health Tests",
        "12+ Manual Assessment & Interaction Tests",
        "MDM Enrollment Detection (Mac)",
        "Tamper-proof audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
        "Centralized Cloud Management Console",
        "Customizable ISO Standardization",
      ];
    } else if (category === "smart-diagnostic") {
      return [
        "Real-time Hard Drive Health Watch",
        "Monitor S.M.A.R.T. Status & Temperature",
        "Scan Disk for Damaged/Bad Sectors",
        "Create Sector-by-Sector Drive Clones",
        "Predictive Drive Failure Alerts",
        "Comprehensive SMART Attribute Reporting",
      ];
    } else if (category === "file-eraser") {
      const baseFeatures = [
        "Secure File & Folder Deletion",
        "30+ International Erasure Algorithms",
        "Real-time Progress Monitoring",
        "Windows, Mac & Linux Support",
        "Free Space Cleaning",
        "Local PDF Reports",
      ];

      if (fileEraserVariant === "network") {
        return [
          ...baseFeatures,
          "Network-wide File Wiping",
          "Centralized Admin Control",
          "Domain Network Support",
          "Compliance Reporting",
          "Web Dashboard Access",
          "Cloud Commands (Remote Jobs)",
          "Multi-Level User Logs",
        ];
      }

      return [
        ...baseFeatures,
        "Enhanced Erasure Features",
        "Cloud Report Upload/Sync",
        "White-Label Reports",
        "XML Report Format",
        "Volume & Disk Erasure",
      ];
    } else if (category === "virtual-machine-eraser") {
      return [
        "Erase VHD/VHDX/VMDK Files",
        "Supports VMware, Hyper-V, VirtualBox",
        "Multiple Erasure Algorithms",
        "Secure Report Generation",
        "Parallel VM Erasure",
        "Command Line Support",
      ];
    } else if (category === "smartphone-eraser") {
      return [
        "Android & iOS Device Wiping",
        "MDM Removal Capability",
        "Diagnostic Health Check",
        "Full Device Factory Reset",
        "Tamper-proof audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
        "Auto-Detection & Batch Wiping",
      ];
    } else if (category === "smartphone-diagnostic") {
      return [
        "iOS & Android Support",
        "Battery Health Analysis",
        "Hardware Component Test",
        "Screen & Touch Calibration",
        "Network & Connectivity Check",
        "Automated PDF Reports",
      ];
    } else if (category === "autopilot-mdm") {
      return [
        "Autopilot Status Detection",
        "MDM Enrollment Check",
        "Hardware ID Retrieval",
        "Provisioning Status Audit",
        "Deployment Readiness Test",
        "Tamper-proof audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
      ];
    } else if (category === "data-migration") {
      return [
        "High-Speed Data Transfer",
        "Secure End-to-End Encryption",
        "Selective File Migration",
        "Drive-to-Drive Cloning",
        "Post-Migration Integrity Check",
        "Detailed Transfer Logs",
      ];
    } else if (category === "freeze-state") {
      if (freezeStateVariant === "smart") {
        return [
          "Deep System Health Audit",
          "Real-time Hardware Monitoring",
          "Predictive Failure Analysis",
          "Freeze Protection Integrity Check",
          "Tamper-proof audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
          "Auto-Alerting System",
        ];
      }
      if (freezeStateVariant === "advanced") {
        return [
          "Government-Grade Sanitization",
          "30+ International Standards",
          "High-Volume Throughput",
          "Tamper-proof audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
          "Hardware-Level Integration",
          "Secure Asset Disposal Chain",
        ];
      }
      return [
        "System Configuration Protection",
        "Instant Restore on Reboot",
        "Unrestricted User Access",
        "Centralized Management Console",
        "Deploy Stealth Mode",
        "Automated Maintenance Windows",
      ];
    } else if (category === "forensic-imaging") {
      if (forensicImagingVariant === "advanced") {
        return [
          "Multi-pass Imaging Techniques",
          "Parallel Data Acquisition",
          "Live RAM Capture & Analysis",
          "Universal File System Support",
          "Encrypted Volume Decryption",
          "Advanced Forensic Reporting",
        ];
      }
      if (forensicImagingVariant === "hardware") {
        return [
          "Stationary Lab-Grade Machine",
          "Integrated Hardware Write-Blocker",
          "High-Speed NVMe/SAS Channels",
          "Touchscreen Control Interface",
          "Built-in Cooling & Power",
          "Enterprise Lifecycle Support",
        ];
      }
      return [
        "Professional Bit-Stream Imaging",
        "MD5/SHA-256 Verification Hash",
        "Basic Disk Topology Analysis",
        "Standard Case Reports",
        "USB 3.0/SATA Support",
        "Portable Field Edition",
      ];
    }
    return [];
  };


  const getDisplayPrice = () => {
    if (selectedLicenses === "custom" || selectedPlan === "custom")
      return "Custom Quote";

    const totalPrice = calculatePrice(
      selectedCategory,
      selectedLicenses,
      selectedYears,
      selectedPlan,
    );
    return `$${totalPrice.toFixed(2)}`;
  };

  const getPriceSubtitle = () => {
    if (selectedLicenses === "custom" || selectedPlan === "custom")
      return "Get Personalized Quote";

    if (selectedCategory === "drive-eraser") {
      return `Drive Eraser - ${selectedLicenses} licenses (one-time purchase)`;
    }

    if (selectedCategory === "hardware-diagnostics") {
      return `Hardware Diagnostics - ${selectedLicenses} licenses (one-time purchase)`;
    }

    if (selectedCategory === "smart-diagnostic") {
      return `Smart Diagnostic - ${selectedLicenses} licenses × ${selectedYears} year${Number.parseInt(selectedYears) > 1 ? "s" : ""}`;
    }

    if (selectedCategory === "smartphone-diagnostic") {
      return `Smartphone Diagnostic - ${selectedLicenses} licenses × ${selectedYears} year${Number.parseInt(selectedYears) > 1 ? "s" : ""}`;
    }

    if (selectedCategory === "autopilot-mdm") {
      return `Autopilot+MDM - ${selectedLicenses} licenses (one-time purchase)`;
    }

    if (selectedCategory === "data-migration") {
      return `Data Migration - ${selectedLicenses} licenses (one-time purchase)`;
    }

    if (selectedCategory === "freeze-state") {
      const variantLabel =
        freezeStateVariant === "smart"
          ? "Smart Diagnostic"
          : freezeStateVariant === "advanced"
            ? "Advanced Eraser"
            : "Standard";
      return `Freeze State ${variantLabel} - ${selectedLicenses} licenses (one-time purchase)`;
    }

    if (selectedCategory === "forensic-imaging") {
      const variantLabel =
        forensicImagingVariant === "advanced"
          ? "Advanced"
          : forensicImagingVariant === "hardware"
            ? "Hardware"
            : "Basic";
      return `Forensic Imaging ${variantLabel} - ${selectedLicenses} ${selectedLicenses === "1" ? "unit" : "units"} (one-time purchase)`;
    }
    let subtitle = `File Eraser Professional - ${selectedLicenses} licenses`;
    subtitle += ` × ${selectedYears} year${Number.parseInt(selectedYears) > 1 ? "s" : ""}`;

    return subtitle;
  };

  const getPriceNote = () => {
    // Agar custom quantity ya plan hai to message dikhao
    if (selectedLicenses === "custom" || selectedPlan === "custom")
      return "Tailored to your needs";

    const currentProduct = getCurrentProduct();

    if (selectedCategory === "drive-eraser") {
      // Drive Eraser ke liye dynamic price note ($25 standard, $30 diagnostics)
      return `Drive Eraser @ $${currentProduct.basePrice.toFixed(2)}/license (One-time purchase)`;
    }

    if (selectedCategory === "hardware-diagnostics") {
      // Hardware Diagnostic ka price note ($10)
      return `Hardware Diagnostic @ $${currentProduct.basePrice.toFixed(2)}/license (One-time purchase)`;
    }

    if (selectedCategory === "smart-diagnostic") {
      // Smart Diagnostic ka price note ($20)
      const yearCount = Number.parseInt(selectedYears);
      return `Smart Diagnostic @ $${currentProduct.basePrice.toFixed(2)}/license/year ${yearCount > 1 ? `× ${yearCount} years` : ""}`;
    }

    if (selectedCategory === "autopilot-mdm") {
      // Autopilot+MDM का price note ($5)
      return `Autopilot+MDM @ $${currentProduct.basePrice.toFixed(2)}/license (One-time purchase)`;
    }

    if (selectedCategory === "data-migration") {
      // Data Migration का price note ($5)
      return `Data Migration @ $${currentProduct.basePrice.toFixed(2)}/license (One-time purchase)`;
    }

    if (selectedCategory === "freeze-state") {
      const variantLabel =
        freezeStateVariant === "smart"
          ? "Smart Diagnostic"
          : freezeStateVariant === "advanced"
            ? "Advanced Eraser"
            : "Standard";
      return `Freeze State ${variantLabel} @ $${currentProduct.basePrice.toFixed(2)}/license (One-time purchase)`;
    }

    if (selectedCategory === "forensic-imaging") {
      const variantLabel =
        forensicImagingVariant === "advanced"
          ? "Advanced"
          : forensicImagingVariant === "hardware"
            ? "Hardware"
            : "Basic";
      return `Forensic Imaging ${variantLabel} @ $${currentProduct.basePrice.toLocaleString()}/unit (One-time purchase)`;
    }
    let note = `Professional @ $${currentProduct.basePrice.toFixed(2)}/license/year`;

    const yearCount = Number.parseInt(selectedYears);
    if (yearCount > 1) {
      note += ` × ${yearCount} years`;
    }

    return note;
  };

  const handleCustomLicenseSubmit = async (data: CustomLicenseData) => {
    // console.log("handleCustomLicenseSubmit called with data:", data);

    try {
      // Use the useFormSubmission hook to handle the form submission
      await submitForm(data);

      // Show success toast
      showToast(
        "Thank you! Your custom license request has been submitted successfully. Our sales team will contact you within 24 hours.",
        "success",
      );

      // Close modal after successful submission
      setShowCustomModal(false);
    } catch (error) {
      console.error("Custom license submission error:", error);

      // Show error toast
      showToast(
        "Failed to send your custom license request. Please try again or contact our sales team directly.",
        "error",
      );
    }
  };

  // ... inside PricingAndPlanPage component ...

  const handleBuyNow = async () => {
    // 1. Prevent double clicks
    if (isBuyNowLoading) return;

    setIsBuyNowLoading(true);

    // 2. Custom Quote logic (Same as before)
    if (selectedLicenses === "custom" || selectedPlan === "custom") {
      setShowCustomModal(true);
      setIsBuyNowLoading(false);
      return;
    }

    // Product ID mapping - Dodo Payment Product IDs
    const PRODUCT_IDS = {
      "drive-eraser": "pdt_0NVH5wJYMX70syW3ioj9R",
      "file-eraser": "pdt_0NVHHRwPSypqgPTs3kuSu",
      "smart-diagnostic": "pdt_placeholder_smart_diagnostic",
    };

    const productId = PRODUCT_IDS[selectedCategory as keyof typeof PRODUCT_IDS];

    if (!productId) {
      showToast("Invalid product selection. Please try again.", "error");
      setIsBuyNowLoading(false);
      return;
    }
    // =========================================================
    // CONFIGURATION: Sirf yahan apne 2 Main Product Links dalein
    // =========================================================
    const BASE_LINKS: Record<string, string> = {
      "drive-eraser": `${ENV.DRIVE_ERASER}`, // Yahan apna Drive Eraser ka link dalein
      "file-eraser": `${ENV.FILE_ERASER}`, // Yahan apna File Eraser ka link dalein
      "smart-diagnostic": "https://checkout.dodopayments.com/buy/pdt_placeholder_smart_diagnostic?quantity=",
    };

    try {
      const quantity = Number.parseInt(selectedLicenses) || 1;

      // 🔑 Reference ID generate karo
      const clientRef = crypto.randomUUID();
      localStorage.setItem("pending_client_ref", clientRef);

      // Drive Eraser Diagnostics variant ke liye alag product ID
      let checkoutProductId = productId;
      if (
        selectedCategory === "drive-eraser" &&
        driveEraserVariant === "diagnostics"
      ) {
        checkoutProductId = "pdt_0NaKDbbTvncIVcoWRoVvZ";
      }

      // ── OLD REDIRECT CODE (commented out) ──
      // const baseLink = BASE_LINKS[selectedCategory];
      // const finalUrl = `${baseLink}${quantity}&client_ref=${clientRef}&redirect_url=${redirectUrl}&cancel_url=${failureUrl}`;
      // window.location.href = finalUrl;

      // ── NEW: Overlay Checkout — SDK apna full-screen overlay dikhayega ──
      openOverlayCheckout(
        checkoutProductId,
        quantity,
        'https://dsecuretech.com/order-success'
      );

    } catch (error) {
      console.error("Checkout error:", error);
      showToast("Something went wrong. Please try again.", "error");
      setIsBuyNowLoading(false);
    }
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
      question: "Do you offer Volume discounts?",
      answer:
        "Yes! We offer discounts for bulk orders. Please submit a request via our Custom License form to receive a personalized quote with discounted pricing.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "All licenses include lifetime technical support via email, phone, and live chat. Enterprise customers receive priority support with dedicated account managers.",
    },
    {
      question: "What ongoing support is provided?",
      answer:
        "We provide continuous support including regular software updates, technical assistance, compliance monitoring, and renewal coordination. Think of us as your ongoing partner in data hygiene.",
    },
  ];

  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "D-Secure Data Erasure Software",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Windows, macOS, Linux",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "10.00",
      "highPrice": "500.00",
      "offerCount": "10"
    }
  };

  return (
    <>
      <SEOHead
        seo={{
          ...getSEOForPage("pricing-and-plan"),
          structuredData: pricingSchema,
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="container mx-auto px-4 xs:px-6 sm:px-6 md:px-8 py-8 xs:py-10 sm:py-12 md:py-12 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 xs:mb-14 sm:mb-16 md:mb-16">
            {/* Tab Switcher (Sub-header position) */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/80 backdrop-blur-sm p-1.5 rounded-2xl shadow-sm border border-emerald-100/50 flex gap-2 w-full max-w-lg">
                <button
                  onClick={() => {
                    setActiveTab("eraser");
                    setSelectedCategory("drive-eraser");
                    navigate(`/pricing-and-plan?product=drive-eraser`, {
                      replace: true,
                    });
                  }}
                  className={`flex-1 py-2.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === "eraser"
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-200"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${activeTab === "eraser" ? "bg-white animate-pulse" : "bg-gray-300"}`}
                  ></div>
                  Eraser
                </button>
                <button
                  onClick={() => {
                    setActiveTab("diagnostics");
                    setSelectedCategory("hardware-diagnostics");
                    navigate(`/pricing-and-plan?product=hardware-diagnostics`, {
                      replace: true,
                    });
                  }}
                  className={`flex-1 py-2.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === "diagnostics"
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-200"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${activeTab === "diagnostics" ? "bg-white animate-pulse" : "bg-gray-300"}`}
                  ></div>
                  Diagnostic
                </button>
                <button
                  onClick={() => {
                    setActiveTab("migration");
                    setSelectedCategory("data-migration");
                    navigate(`/pricing-and-plan?product=data-migration`, {
                      replace: true,
                    });
                  }}
                  className={`flex-1 py-2.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === "migration"
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-200"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${activeTab === "migration" ? "bg-white animate-pulse" : "bg-gray-300"}`}
                  ></div>
                  Migration
                </button>
              </div>
            </div>

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

          {/* Category Selection (Pill Row Switcher) */}
          <div className="flex justify-center mb-10 xs:mb-12 sm:mb-12 md:mb-12 px-2 xs:px-4">
            <div className="bg-white/80 backdrop-blur-sm p-1.5 rounded-2xl shadow-sm border border-emerald-100/50 flex flex-wrap items-stretch gap-2 w-full max-w-5xl">
              {filteredCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    // Explicitly set activeTab based on selected category type
                    if (
                      category.id === "hardware-diagnostics" ||
                      category.id === "smart-diagnostic" ||
                      category.id === "smartphone-diagnostic" ||
                      category.id === "autopilot-mdm"
                    ) {
                      setActiveTab("diagnostics");
                    } else {
                      setActiveTab("eraser");
                    }
                    // Update URL with product parameter
                    navigate(`/pricing-and-plan?product=${category.id}`, {
                      replace: true,
                    });
                  }}
                  className={`flex-1 min-w-[140px] xs:min-w-[160px] py-2.5 xs:py-3 px-3 xs:px-4 sm:px-6 rounded-xl font-bold text-sm transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-200 transform scale-[1.02]"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${selectedCategory === category.id ? "bg-white animate-pulse" : "bg-gray-400"}`}
                    ></div>
                    <span className="whitespace-nowrap text-xs xs:text-sm uppercase tracking-wider">
                      {category.name}
                    </span>
                  </div>
                  {/* Ek-line description ko comment out kiya gaya hai pills ko clean rakhne ke liye */}
                  {/* <span
                    className={`text-[9px] xs:text-[10px] font-medium leading-tight text-center opacity-80 ${selectedCategory === category.id ? "text-teal-50" : "text-gray-500"}`}
                  >
                    {category.subtitle}
                  </span> */}
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
                          : `${getCurrentProduct().title} - Key Features:`}
                      </h4>
                      {getProductFeatures(selectedCategory, selectedPlan).map(
                        (feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-2 rounded-lg"
                          >
                            <svg
                              className="w-4 h-4 text-green-800 flex-shrink-0"
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
                        ),
                      )}
                    </div>

                    {/* Drive Eraser Variant Selection */}
                    {selectedCategory === "drive-eraser" && (
                      <div className="mb-6 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                        <label className="block text-xs xs:text-sm font-bold text-emerald-900 mb-3">
                          Product Variant:
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          <button
                            onClick={() => setDriveEraserVariant("standard")}
                            className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                              driveEraserVariant === "standard"
                                ? "bg-white border-emerald-500 shadow-md scale-[1.02]"
                                : "bg-white/50 border-gray-200 hover:border-emerald-200"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${driveEraserVariant === "standard" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Standard Erasure
                              </span>
                              <span className="text-[10px] text-gray-500">
                                Pure data destruction only
                              </span>
                            </div>
                            <span className="text-sm font-bold text-emerald-800">
                              $25.00
                            </span>
                            {driveEraserVariant === "standard" && (
                              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() => setDriveEraserVariant("diagnostics")}
                            className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                              driveEraserVariant === "diagnostics"
                                ? "bg-white border-emerald-500 shadow-md scale-[1.02]"
                                : "bg-white/50 border-gray-200 hover:border-emerald-200"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${driveEraserVariant === "diagnostics" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Erasure + Diagnostics
                              </span>
                              <span className="text-[10px] text-gray-500">
                                + Smart Health Analysis
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-bold text-emerald-800">
                                $30.00
                              </span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full font-bold">Upcoming</span>
                            </div>
                            {driveEraserVariant === "diagnostics" && (
                              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* File Eraser Variant Selection */}
                    {selectedCategory === "file-eraser" && (
                      <div className="mb-6 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                        <label className="block text-xs xs:text-sm font-bold text-emerald-900 mb-3">
                          Product Variant:
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          <button
                            onClick={() => setFileEraserVariant("standard")}
                            className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                              fileEraserVariant === "standard"
                                ? "bg-white border-emerald-500 shadow-md scale-[1.02]"
                                : "bg-white/50 border-gray-200 hover:border-emerald-200"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${fileEraserVariant === "standard" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Professional Edition
                              </span>
                              <span className="text-[10px] text-gray-500">
                                Standard file wiping solution
                              </span>
                            </div>
                            <span className="text-sm font-bold text-emerald-800">
                              $40.00
                            </span>
                            {fileEraserVariant === "standard" && (
                              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() => setFileEraserVariant("network")}
                            className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                              fileEraserVariant === "network"
                                ? "bg-white border-emerald-500 shadow-md scale-[1.02]"
                                : "bg-white/50 border-gray-200 hover:border-emerald-200"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${fileEraserVariant === "network" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Network Edition
                              </span>
                              <span className="text-[10px] text-gray-500">
                                + Centralized domain management
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-bold text-emerald-800">
                                $50.00
                              </span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full font-bold">Upcoming</span>
                            </div>
                            {fileEraserVariant === "network" && (
                              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Freeze State Variant Selection */}
                    {selectedCategory === "freeze-state" && (
                      <div className="mb-6 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                        <label className="block text-xs xs:text-sm font-bold text-emerald-900 mb-3">
                          Product Variant:
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          <button
                            onClick={() => setFreezeStateVariant("standard")}
                            className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                              freezeStateVariant === "standard"
                                ? "bg-white border-emerald-500 shadow-md scale-[1.02]"
                                : "bg-white/50 border-gray-200 hover:border-emerald-200"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${freezeStateVariant === "standard" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Freeze State Standard
                              </span>
                              <span className="text-[10px] text-gray-500">
                                Core Protection & Restore
                              </span>
                            </div>
                            <span className="text-sm font-bold text-emerald-800">
                              $80.00
                            </span>
                            {freezeStateVariant === "standard" && (
                              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() => setFreezeStateVariant("smart")}
                            className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                              freezeStateVariant === "smart"
                                ? "bg-white border-emerald-500 shadow-md scale-[1.02]"
                                : "bg-white/50 border-gray-200 hover:border-emerald-200"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${freezeStateVariant === "smart" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Smart Diagnostic
                              </span>
                              <span className="text-[10px] text-gray-500">
                                + Health Monitoring
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-bold text-emerald-800">
                                $85.00
                              </span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full font-bold">Upcoming</span>
                            </div>
                            {freezeStateVariant === "smart" && (
                              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() => setFreezeStateVariant("advanced")}
                            className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                              freezeStateVariant === "advanced"
                                ? "bg-white border-emerald-500 shadow-md scale-[1.02]"
                                : "bg-white/50 border-gray-200 hover:border-emerald-200"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${freezeStateVariant === "advanced" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Advanced Eraser
                              </span>
                              <span className="text-[10px] text-gray-500">
                                + High-Level Sanitization
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-bold text-emerald-800">
                                $90.00
                              </span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full font-bold">Upcoming</span>
                            </div>
                            {freezeStateVariant === "advanced" && (
                              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Forensic Imaging Variant Selection */}
                    {selectedCategory === "forensic-imaging" && (
                      <div className="mb-6 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                        <label className="block text-xs xs:text-sm font-bold text-emerald-900 mb-3">
                          Product Variant:
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          <button
                            onClick={() => setForensicImagingVariant("basic")}
                            className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                              forensicImagingVariant === "basic"
                                ? "bg-white border-emerald-500 shadow-md scale-[1.02]"
                                : "bg-white/50 border-gray-200 hover:border-emerald-200"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${forensicImagingVariant === "basic" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Forensic Imaging Basic
                              </span>
                              <span className="text-[10px] text-gray-500">
                                Professional field imaging
                              </span>
                            </div>
                            <span className="text-sm font-bold text-emerald-800">
                              $1,053
                            </span>
                            {forensicImagingVariant === "basic" && (
                              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() => setForensicImagingVariant("advanced")}
                            className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                              forensicImagingVariant === "advanced"
                                ? "bg-white border-emerald-500 shadow-md scale-[1.02]"
                                : "bg-white/50 border-gray-200 hover:border-emerald-200"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${forensicImagingVariant === "advanced" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Advanced
                              </span>
                              <span className="text-[10px] text-gray-500">
                                + Live capture & Decryption
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-bold text-emerald-800">
                                $10,526
                              </span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full font-bold">Upcoming</span>
                            </div>
                            {forensicImagingVariant === "advanced" && (
                              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>

                          <button
                            onClick={() => setForensicImagingVariant("hardware")}
                            className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                              forensicImagingVariant === "hardware"
                                ? "bg-white border-emerald-500 shadow-md scale-[1.02]"
                                : "bg-white/50 border-gray-200 hover:border-emerald-200"
                            }`}
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span
                                className={`text-sm font-bold ${forensicImagingVariant === "hardware" ? "text-emerald-700" : "text-gray-700"}`}
                              >
                                Hardware
                              </span>
                              <span className="text-[10px] text-gray-500">
                                Stationary Lab Station
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-bold text-emerald-800">
                                $31,579
                              </span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full font-bold">Upcoming</span>
                            </div>
                            {forensicImagingVariant === "hardware" && (
                              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Selection Criteria */}
                    <div className="mb-4 xs:mb-6 sm:mb-6">
                      <h3 className="text-base xs:text-lg sm:text-lg font-semibold text-gray-900 mb-3 xs:mb-4 sm:mb-4">
                        Configure Your License
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
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
                          {selectedCategory === "hardware-diagnostics" ? (
                            /* Numeric Counter for Diagnostics */
                            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border-2 border-gray-200">
                              <button
                                onClick={() => {
                                  const current =
                                    Number.parseInt(selectedLicenses) || 100;
                                  if (current > 100) {
                                    setSelectedLicenses(
                                      (current - 100).toString(),
                                    );
                                  } else if (current === 100) {
                                    setSelectedLicenses("1");
                                  }
                                }}
                                className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-all shadow-sm active:scale-95"
                              >
                                −
                              </button>
                              <div className="flex-1 text-center">
                                <div className="text-xl font-bold text-gray-900">
                                  {selectedLicenses}
                                </div>
                                <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                                  Licenses
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  const current =
                                    Number.parseInt(selectedLicenses) || 100;
                                  if (current === 1) {
                                    setSelectedLicenses("100");
                                  } else {
                                    setSelectedLicenses(
                                      (current + 100).toString(),
                                    );
                                  }
                                }}
                                className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-all shadow-sm active:scale-95"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            /* Standard Dropdown for other products */
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
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Special Pricing Section */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">
                      Are You An MSP, Academic Institute or Non-Profit
                      Organization?
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

            {/* Enhanced Pricing Card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 xs:p-8 sm:p-8 shadow-xl border-2 border-blue-100 lg:sticky lg:top-8">
                {/* Price Display */}
                <div className="text-center mb-6 xs:mb-8 sm:mb-8 relative">
                  {/* Early Bird Offer Label */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-md animate-bounce whitespace-nowrap">
                    Early Bird Offer - {getCurrentProduct().discountPercentage}
                  </div>

                  <div className="flex flex-col items-center justify-center mb-2">
                    {selectedLicenses !== "custom" &&
                      selectedPlan !== "custom" && (
                        <div className="text-gray-400 text-lg line-through mb-1">
                          $
                          {(
                            getCurrentProduct().originalPrice *
                            (selectedLicenses === "custom"
                              ? 0
                              : Number.parseInt(selectedLicenses)) *
                            (selectedCategory === "file-eraser"
                              ? Number.parseInt(selectedYears)
                              : 1)
                          ).toFixed(2)}
                        </div>
                      )}
                    <div className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                      {getDisplayPrice()}
                    </div>
                  </div>
                  <div className="text-sm text-teal-500 font-semibold bg-teal-50 px-3 py-1 rounded-full inline-block mb-2">
                    {getPriceSubtitle()}
                  </div>
                  <div className="text-xs text-gray-500">{getPriceNote()}</div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={
                    (!((selectedCategory === "drive-eraser" && driveEraserVariant === "standard") || 
                       (selectedCategory === "file-eraser" && fileEraserVariant === "standard")) && 
                     selectedLicenses !== "custom" && 
                     selectedPlan !== "custom") ||
                    isBuyNowLoading
                  }
                  onMouseEnter={() => {
                    // ✅ Prefetch on hover for even faster response
                    if (
                      selectedLicenses !== "custom" &&
                      selectedPlan !== "custom"
                    ) {
                      // Prefetch checkout domain connection
                      const img = new Image();
                      img.src = "https://checkout.dodopayments.com/favicon.ico";
                    }
                  }}
                  className={`w-full font-bold py-3 xs:py-4 px-4 xs:px-5 sm:px-6 rounded-xl mb-4 xs:mb-5 sm:mb-6 text-base xs:text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    !((selectedCategory === "drive-eraser" && driveEraserVariant === "standard") || 
                      (selectedCategory === "file-eraser" && fileEraserVariant === "standard")) && 
                    selectedLicenses !== "custom" && 
                    selectedPlan !== "custom"
                      ? "bg-gradient-to-r from-slate-300 to-slate-400 text-white cursor-not-allowed opacity-70"
                      : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-wait disabled:hover:scale-100"
                  }`}
                >
                  {!((selectedCategory === "drive-eraser" && driveEraserVariant === "standard") || 
                     (selectedCategory === "file-eraser" && fileEraserVariant === "standard")) && 
                   selectedLicenses !== "custom" && 
                   selectedPlan !== "custom"
                    ? "Coming Soon"
                    : selectedLicenses === "custom" || selectedPlan === "custom"
                      ? "Request Custom Quote"
                      : "Buy Now"}
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
                regulated: NIST SP 800-88, DoD 5220.22-M, Common Criteria |
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
    </>
  );
});

export default PricingAndPlanPage;
