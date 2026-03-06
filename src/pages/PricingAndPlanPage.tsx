import React, { useState, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ENV } from "../config/env";
import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import { Link } from "@/components/LocaleLink";
import { useLocaleNavigate } from "@/hooks/useLocaleNavigate";
import { useLocation } from "react-router-dom";
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
import { api } from "@/utils/apiClient"; // ✅ Pre-load API client for instant access

const PricingAndPlanPage: React.FC = memo(() => {
  const { t } = useTranslation();
  const { toast, showToast, hideToast } = useToast();
  const navigate = useLocaleNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("drive-eraser");
  const [selectedLicenses, setSelectedLicenses] = useState("1");
  const [selectedYears, setSelectedYears] = useState("1");
  const [selectedOS, setSelectedOS] = useState("Select");
  const [deliveryMethod, setDeliveryMethod] = useState("electronic");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showSpecialPricingModal, setShowSpecialPricingModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);

  // Reset loading state when component mounts (handles back navigation)
  useEffect(() => {
    setIsBuyNowLoading(false);
  }, []);

  // ✅ Preload API client on component mount for instant checkout
  useEffect(() => {
    // Warm up API client connection (non-blocking)
    if (typeof window !== "undefined") {
      // Prefetch DNS for payment domain
      const link = document.createElement("link");
      link.rel = "dns-prefetch";
      link.href = "https://checkout.dodopayments.com";
      document.head.appendChild(link);
    }
  }, []);

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

    // Read product parameter from URL
    const productFromUrl = searchParams.get("product");
    if (productFromUrl) {
      setSelectedCategory(productFromUrl);
    }

    // Read section parameter to expand File Eraser section if needed
    const sectionFromUrl = searchParams.get("section");
    if (sectionFromUrl === "file-eraser") {
      setSelectedCategory("file-eraser");
    }
  }, [location.search]);

  // FIXED: Custom License Form Submission Configuration
  const customLicenseFormConfig = {
    endpoint: "https://formsubmit.co/support@dsecuretech.com", // FIXED: Correct endpoint
    requiredFields: ["contactName", "email", "numberOfLicenses", "companyName"],
    successMessage: t("form.successCustom"),
    errorMessage: t("form.errorCustom"),
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
        company: data.companyName || t("notProvided"),
        phone: data.phone || t("notProvided"),

        // License Requirements
        productName: getCurrentProduct().title,
        productCategory: selectedCategory,
        selectedPlan: getCurrentPlan().name,
        planDescription: getCurrentPlan().description,
        requestedLicenses: data.numberOfLicenses,
        licenseDuration: data.duration || t("notSpecified"),
        budgetRange: data.budget || t("notSpecified"),
        additionalRequirements: data.requirements || "None",

        // Current Product Configuration Context
        currentBasePrice: `$${getCurrentPlan().basePrice}/license`,
        currentSelectedPlan: getCurrentPlan().name,
        currentSelectedLicenses: selectedLicenses,
        currentSelectedYears: selectedYears,
        currentDeliveryMethod: deliveryMethod,

        // Marketing/Analytics Data
        pageUrl: window.location.href,
        referrer: document.referrer || t("direct"),
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
    successMessage: t("form.successSpecial"),
    errorMessage: t("form.errorSpecial"),
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
        phone: data.phone || t("notProvided"),

        // Organization Information
        organizationType: data.organizationType,
        organizationName: data.organizationName,
        numberOfLicenses: data.numberOfLicenses || t("notSpecified"),
        additionalInfo: data.additionalInfo || "None",

        // Product Context
        productName: getCurrentProduct().title,
        productCategory: selectedCategory,
        currentSelectedPlan: getCurrentPlan().name,

        // Marketing Data
        pageUrl: window.location.href,
        referrer: document.referrer || t("direct"),
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

  const {
    isSubmitting: isSpecialPricingSubmitting,
    submitForm: submitSpecialPricingForm,
  } = useFormSubmission(specialPricingFormConfig);

  const categories = [
    {
      id: "drive-eraser",
      name: t("categories.driveEraser.name"),
      subtitle: t("categories.driveEraser.subtitle"),
    },
    {
      id: "file-eraser",
      name: t("categories.fileEraser.name"),
      subtitle: t("categories.fileEraser.subtitle"),
    },
  ];

  // Plans configuration with their features and pricing based on D-Secure feature matrix
  const planOptions = [
    {
      id: "basic",
      name: t("plans.standard.name"),
      basePrice: 80,
      description: t("plans.standard.description"),
      category: t("plans.standard.category"),
      features: [
        `${t("featureStatus.included")}: ${t("features.windowsSupport")}`,
        `${t("featureStatus.included")}: ${t("features.linuxSupport")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.macosSupport")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.multiBootableOsSupport")}`,
        `${t("featureStatus.included")}: ${t("features.coreErasureCapabilities")}`,
        `${t("featureStatus.included")}: ${t("features.internationalAlgorithms")}`,
        `${t("featureStatus.included")}: ${t("features.fileFolderErase")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.eraseTracks")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.freeSpaceCleaning")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.eraseVolume")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.eraseDisk")}`,
        `${t("featureStatus.included")}: ${t("features.scheduleErase")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.cloudStorageErase")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.localPdfReports")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.whiteLabelReports")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.complianceEmailReport")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.xmlReportFormat")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.auditGradeDocuments")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.inspectionLogs")}`,
      ],
    },
    {
      id: "standard",
      name: t("plans.corporate.name"),
      basePrice: 150,
      description: t("plans.corporate.description"),
      category: t("plans.corporate.category"),
      features: [
        `${t("featureStatus.included")}: ${t("features.windowsSupport")}`,
        `${t("featureStatus.included")}: ${t("features.linuxSupport")}`,
        `${t("featureStatus.included")}: ${t("features.macosSupport")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.multiBootableOsSupport")}`,
        `${t("featureStatus.included")}: ${t("features.coreErasureCapabilities")}`,
        `${t("featureStatus.included")}: ${t("features.internationalAlgorithms")}`,
        `${t("featureStatus.included")}: ${t("features.fileFolderErase")}`,
        `${t("featureStatus.included")}: ${t("features.eraseTracks")}`,
        `${t("featureStatus.included")}: ${t("features.freeSpaceCleaning")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.eraseVolume")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.eraseDisk")}`,
        `${t("featureStatus.included")}: ${t("features.scheduleErase")}`,
        `${t("featureStatus.included")}: ${t("features.cloudStorageErase")}`,
        `${t("featureStatus.included")}: ${t("features.localPdfReports")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.whiteLabelReports")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.complianceEmailReport")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.xmlReportFormat")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.auditGradeDocuments")}`,
        `${t("featureStatus.notIncluded")}: ${t("features.inspectionLogs")}`,
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
      name: t("plans.professional.name"),
      basePrice: 250,
      description: t("plans.professional.description"),
      category: t("plans.professional.category"),
      features: [
        `${t("featureStatus.included")}: ${t("features.windowsSupport")}`,
        `${t("featureStatus.included")}: ${t("features.linuxSupport")}`,
        `${t("featureStatus.included")}: ${t("features.macosSupport")}`,
        `${t("featureStatus.included")}: ${t("features.multiBootableOsSupport")}`,
        `${t("featureStatus.included")}: ${t("features.coreErasureCapabilities")}`,
        `${t("featureStatus.included")}: ${t("features.internationalAlgorithms")}`,
        `${t("featureStatus.included")}: ${t("features.fileFolderErase")}`,
        `${t("featureStatus.included")}: ${t("features.eraseTracks")}`,
        `${t("featureStatus.included")}: ${t("features.freeSpaceCleaning")}`,
        `${t("featureStatus.included")}: ${t("features.eraseVolume")}`,
        `${t("featureStatus.included")}: ${t("features.eraseDisk")}`,
        `${t("featureStatus.included")}: ${t("features.scheduleErase")}`,
        `${t("featureStatus.included")}: ${t("features.cloudStorageErase")}`,
        `${t("featureStatus.included")}: ${t("features.localPdfReports")}`,
        `${t("featureStatus.included")}: ${t("features.whiteLabelReports")}`,
        `${t("featureStatus.included")}: ${t("features.complianceEmailReport")}`,
        `${t("featureStatus.included")}: ${t("features.xmlReportFormat")}`,
        `${t("featureStatus.included")}: ${t("features.auditGradeDocuments")}`,
        `${t("featureStatus.included")}: ${t("features.inspectionLogs")}`,
        `${t("featureStatus.included")}: ${t("features.webDashboard")}`,
        `${t("featureStatus.included")}: ${t("features.cloudCommands")}`,
        `${t("featureStatus.included")}: ${t("features.customInstaller")}`,
        `${t("featureStatus.addOn")}: ${t("features.addOnPrivateCloud")}`,
        `${t("featureStatus.included")}: ${t("features.multilevelUserLogic")}`,
        `${t("featureStatus.addOn")}: ${t("features.addOnUsbLicenses")}`,
        `${t("featureStatus.addOn")}: ${t("features.addOnVolumeLicenses")}`,
        `${t("featureStatus.addOn")}: ${t("features.addOnDataConnection")}`,
        `${t("featureStatus.addOn")}: ${t("features.addOnExtraSubUsers")}`,
        `${t("featureStatus.addOn")}: ${t("features.addOnExtraPrivateClouds")}`,
        `${t("featureStatus.addOn")}: ${t("features.addOnBootable")}`,
        `${t("featureStatus.addOn")}: ${t("features.addOnDedicatedSla")}`,
      ],
    },
    {
      id: "enterprise",
      name: t("plans.enterprise.name"),
      basePrice: 500,
      description: t("plans.enterprise.description"),
      category: t("plans.enterprise.category"),
      features: [
        `${t("featureStatus.included")}: ${t("features.windowsSupport")}`,
        `${t("featureStatus.included")}: ${t("features.linuxSupport")}`,
        `${t("featureStatus.included")}: ${t("features.macosSupport")}`,
        `${t("featureStatus.included")}: ${t("features.multiBootableOsSupport")}`,
        `${t("featureStatus.included")}: ${t("features.coreErasureCapabilities")}`,
        `${t("featureStatus.included")}: ${t("features.internationalAlgorithms")}`,
        `${t("featureStatus.included")}: ${t("features.fileFolderErase")}`,
        `${t("featureStatus.included")}: ${t("features.eraseTracks")}`,
        `${t("featureStatus.included")}: ${t("features.freeSpaceCleaning")}`,
        `${t("featureStatus.included")}: ${t("features.eraseVolume")}`,
        `${t("featureStatus.included")}: ${t("features.eraseDisk")}`,
        `${t("featureStatus.included")}: ${t("features.scheduleErase")}`,
        `${t("featureStatus.included")}: ${t("features.cloudStorageErase")}`,
        `${t("featureStatus.included")}: ${t("features.localPdfReports")}`,
        `${t("featureStatus.included")}: ${t("features.whiteLabelReports")}`,
        `${t("featureStatus.included")}: ${t("features.complianceEmailReport")}`,
        `${t("featureStatus.included")}: ${t("features.xmlReportFormat")}`,
        `${t("featureStatus.included")}: ${t("features.auditGradeDocuments")}`,
        `${t("featureStatus.included")}: ${t("features.inspectionLogs")}`,
        `${t("featureStatus.included")}: ${t("features.webDashboard")}`,
        `${t("featureStatus.included")}: ${t("features.cloudCommands")}`,
        `${t("featureStatus.included")}: ${t("features.customInstaller")}`,
        `${t("featureStatus.included")}: ${t("features.privateCloudSupport")}`,
        `${t("featureStatus.included")}: ${t("features.multilevelUserLogic")}`,
        `${t("featureStatus.included")}: ${t("features.additionalUsbLicenses")}`,
        `${t("featureStatus.included")}: ${t("features.additionalVolumeLicenses")}`,
        `${t("featureStatus.included")}: ${t("features.dataConnectionManager")}`,
        `${t("featureStatus.included")}: ${t("features.extraSubUsers")}`,
        `${t("featureStatus.included")}: ${t("features.extraPrivateClouds")}`,
        `${t("featureStatus.included")}: ${t("features.bootableIntegration")}`,
        `${t("featureStatus.included")}: ${t("features.dedicatedSlaManager")}`,
      ],
    },
    {
      id: "custom",
      name: t("plans.custom.name"),
      basePrice: 0,
      description: t("plans.custom.description"),
      category: t("plans.custom.category"),
      features: [
        `${t("featureStatus.custom")}: ${t("features.fullyCustomizedFeatureSet")}`,
        `${t("featureStatus.custom")}: ${t("features.bespokeIntegration")}`,
        `${t("featureStatus.custom")}: ${t("features.personalizedTraining")}`,
        `${t("featureStatus.custom")}: ${t("features.customCompliance")}`,
        `${t("featureStatus.custom")}: ${t("features.flexibleLicensing")}`,
        `${t("featureStatus.custom")}: ${t("features.whitelabelSolutions")}`,
        `${t("featureStatus.custom")}: ${t("features.customSla")}`,
        `${t("featureStatus.custom")}: ${t("features.dedicatedDevTeam")}`,
        `${t("featureStatus.custom")}: ${t("features.priorityFeatureRequests")}`,
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
    plan: string,
  ) => {
    const licenseCount = licenses === "custom" ? 0 : parseInt(licenses);

    if (category === "drive-eraser") {
      // Drive Eraser is fixed $20 per license (one-time purchase)
      return Math.round(20 * licenseCount * 100) / 100;
    }

    // File Eraser is fixed $40 per license per year
    const basePrice = 40;
    const yearCount = parseInt(years);

    // File Eraser is sold annually, so multiply by years
    const baseTotal =
      Math.round(basePrice * licenseCount * yearCount * 100) / 100;
    return baseTotal;
  };

  // Get plan-specific features for each product
  const getProductFeatures = (category: string, plan: string) => {
    const currentPlan = planOptions.find((p) => p.id === plan);
    if (!currentPlan) return [];

    if (category === "drive-eraser") {
      return t("driveEraserFeatures", { returnObjects: true }) as string[];
    } else if (category === "file-eraser") {
      return t("fileEraserFeatures", { returnObjects: true }) as string[];
    }
    return [];
  };

  const productData = {
    "drive-eraser": {
      title: t("products.driveEraser.title"),
      subtitle: t("products.driveEraser.subtitle"),
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "drive-eraser",
      version: "V1.0.0.0 Enterprise",
      basePrice: 20,
      originalPrice: 40,
      discountPercentage: "50% OFF",
      selectionLabel: t("products.driveEraser.selectionLabel"),
      selectionNote: t("products.driveEraser.selectionNote"),
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
      title: t("products.fileEraser.title"),
      subtitle: t("products.fileEraser.subtitle"),
      image: getProductIcon("file-eraser", 64),
      imageCategory: "file-eraser",
      version: "Professional",
      basePrice: 40,
      originalPrice: 60,
      discountPercentage: "33% OFF",
      selectionLabel: t("products.fileEraser.selectionLabel"),
      selectionNote: t("products.fileEraser.selectionNote"),
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
      return t("customQuote");

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
      return t("getPersonalizedQuote");

    if (selectedCategory === "drive-eraser") {
      return `${t("categories.driveEraser.name")} - ${selectedLicenses} ${t("licenses")} (${t("driveEraserOnetimePurchase")})`;
    }

    // File Eraser plan-based subtitle
    let subtitle = `${t("categories.fileEraser.name")} ${t("plans.professional.name")} - ${selectedLicenses} ${t("licenses")}`;
    subtitle += ` × ${selectedYears} year${parseInt(selectedYears) > 1 ? "s" : ""}`;

    return subtitle;
  };

  const getPriceNote = () => {
    if (selectedLicenses === "custom" || selectedPlan === "custom")
      return t("tailoredToYourNeeds");

    if (selectedCategory === "drive-eraser") {
      return `${t("categories.driveEraser.name")} @ $20.00/${t("licenses")} (${t("driveEraserOnetimePurchase")})`;
    }

    // File Eraser plan-based pricing
    const currentPlan = getCurrentPlan();
    let note = `${t("plans.professional.name")} @ $40.00/${t("licenses")}/year`;

    if (parseInt(selectedYears) > 1) {
      note += ` × ${selectedYears} years`;
    }

    return note;
  };

  const handleCustomLicenseSubmit = async (data: CustomLicenseData) => {
    try {
      await submitForm(data);
      showToast(t("form.toastSuccess"), "success");
      setShowCustomModal(false);
    } catch (error) {
      console.error(t("form.submissionErrorLog"), error);
      showToast(t("form.toastError"), "error");
    }
  };

  // ... inside PricingAndPlanPage component ...

  const handleBuyNow = async () => {
    // 1. Prevent double clicks
    if (isBuyNowLoading) return;

    // Prevent purchase for Drive Eraser
    if (selectedCategory === "drive-eraser") return;

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
    };

    const productId = PRODUCT_IDS[selectedCategory as keyof typeof PRODUCT_IDS];

    if (!productId) {
      showToast(t("form.invalidProduct"), "error");
      setIsBuyNowLoading(false);
      return;
    }
    // =========================================================
    // CONFIGURATION: Sirf yahan apne 2 Main Product Links dalein
    // =========================================================
    const BASE_LINKS: Record<string, string> = {
      "drive-eraser": `${ENV.DRIVE_ERASER}`, // Yahan apna Drive Eraser ka link dalein
      "file-eraser": `${ENV.FILE_ERASER}`, // Yahan apna File Eraser ka link dalein
    };

    try {
      // 3. Category ke hisab se sahi link uthao
      // const baseLink = BASE_LINKS[selectedCategory];

      // if (!baseLink) {
      //   showToast('Product link not found.', 'error');
      //   setIsBuyNowLoading(false);
      //   return;
      // }
      // setIsBuyNowLoading(false);

      // // 4. Quantity nikalo (Dropdown se)
      // const quantity = parseInt(selectedLicenses) || 1;

      // // 5. Link mein dynamically quantity add karo
      // // Logic: Agar link mein pehle se '?' hai toh '&' lagao, nahi toh '?' lagao
      // // const separator = baseLink.includes('?') ? '&' : '?';

      // // Final URL banega: https://.../pdt_ID?quantity=10
      // const finalUrl = `${baseLink}${quantity}`;

      // // 6. Redirect User
      // window.location.href = finalUrl;

      const baseLink = BASE_LINKS[selectedCategory];
      if (!baseLink) {
        showToast(t("form.productLinkNotFound"), "error");
        setIsBuyNowLoading(false);
        return;
      }

      const quantity = parseInt(selectedLicenses) || 1;

      // 🔑 Generate your own reference ID (optional but recommended)
      const clientRef = crypto.randomUUID();

      // Optional: store locally for fallback
      localStorage.setItem("pending_client_ref", clientRef);

      // Redirect URL (single router page or success page)
      const redirectUrl = encodeURIComponent(
        "https://dsecuretech.com/order-success",
      );
      const failureUrl = encodeURIComponent(
        "https://dsecuretech.com/order-failed",
      );
      // Final checkout URL
      const finalUrl =
        `${baseLink}` +
        `${quantity}` +
        `&client_ref=${clientRef}` +
        `&redirect_url=${redirectUrl}` +
        `&cancel_url=${failureUrl}`;

      // 🚀 Instant redirect
      window.location.href = finalUrl;
    } catch (error) {
      console.error(t("form.navigationError"), error);
      showToast(t("form.somethingWentWrong"), "error");
      setIsBuyNowLoading(false);
    }
  };
  const faqData = t("faq", { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;
  const faqs = Array.isArray(faqData) ? faqData : [];

  return (
    <>
      <SEOHead seo={getSEOForPage("pricing-and-plan")} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="container mx-auto px-4 xs:px-6 sm:px-6 md:px-8 py-8 xs:py-10 sm:py-12 md:py-12 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 xs:mb-14 sm:mb-16 md:mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 xs:px-6 sm:px-6 py-2 rounded-full text-xs xs:text-sm sm:text-sm font-semibold mb-4 xs:mb-6 sm:mb-6 shadow-lg">
              {t("badge")}
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 xs:mb-6 sm:mb-6 leading-tight px-2">
              {t("chooseYour")}{" "}
              <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                {t("dsecure")}
              </span>{" "}
              {t("pricing.license")}
            </h1>
            <p className="text-base xs:text-lg sm:text-xl md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              {t("subtitle")}
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
                    // Update URL with product parameter
                    navigate(`/pricing-and-plan?product=${category.id}`, {
                      replace: true,
                    });
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
                  <p className="text-xs xs:text-xs sm:text-xs opacity-90">
                    {category.subtitle}
                  </p>
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
                          ? t("driveEraserKeyFeatures")
                          : `${getCurrentProduct().title} - ${t("keyFeatures")}`}
                      </h4>
                      {false && selectedCategory === "file-eraser" && (
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
                        ),
                      )}
                    </div>

                    {/* Selection Criteria */}
                    <div className="mb-4 xs:mb-6 sm:mb-6">
                      <h3 className="text-base xs:text-lg sm:text-lg font-semibold text-gray-900 mb-3 xs:mb-4 sm:mb-4">
                        {t("pricing.configure_your_license")}
                      </h3>
                      <div
                        className={`grid gap-3 xs:gap-4 sm:gap-4 ${selectedCategory === "drive-eraser" ? "grid-cols-1" : "grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-1"}`}
                      >
                        {/* Plan Selection - Only show for File Eraser */}
                        {/* Plans hidden as per request */}
                        {false && selectedCategory === "file-eraser" && (
                          <div className="space-y-2">
                            <label className="block text-xs xs:text-sm font-semibold text-gray-700">
                              {t("pricing.select_plan")}
                            </label>
                            <p className="text-xs text-gray-500">
                              {t(
                                "pricing.features_will_update_based_on_your_selection",
                              )}
                            </p>
                            <select
                              value={selectedPlan}
                              onChange={(e) => setSelectedPlan(e.target.value)}
                              className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white text-gray-900 text-sm xs:text-base font-medium shadow-sm hover:border-gray-400"
                            >
                              {planOptions.map((plan) => (
                                <option key={plan.id} value={plan.id}>
                                  {plan.basePrice > 0
                                    ? `${plan.name} - $${plan.basePrice}/license`
                                    : plan.name}
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
                                  ? ` ${t("customQuantity")}`
                                  : `${option} ${t("licenses")}`}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* License Duration */}
                        {/* <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            {selectedCategory === "file-eraser" ? "License Duration:" : "License Type:"}
                          </label>
                          <p className="text-xs text-gray-500">
                            {selectedCategory === "file-eraser"
                              ? "File Eraser licenses are sold annually ($40/year)"
                              : "Drive Eraser is a one-time purchase"}
                          </p>
                          <select
                            value={selectedCategory === "file-eraser" ? selectedYears : "1"}
                            onChange={(e) => selectedCategory === "file-eraser" && setSelectedYears(e.target.value)}
                            disabled={selectedCategory !== "file-eraser"}
                            className={`w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white text-gray-900 font-medium shadow-sm hover:border-gray-400 ${selectedCategory !== "file-eraser" ? "bg-gray-100 cursor-not-allowed" : ""
                              }`}
                          >
                            {selectedCategory === "file-eraser" ? (
                              <>
                                <option value="1">{t("pricing.1_year")}</option>
                              </>
                            ) : (
                              <option value="1">{t("pricing.onetime_purchase")}</option>
                            )}
                          </select>
                        </div> */}
                      </div>
                    </div>

                    {/* Special Pricing Section */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="text-center">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">
                          {t(
                            "pricing.are_you_an_msp_academic_institute_or_nonprofi",
                          )}
                          {t("pricing.organization")}
                        </h4>
                        <button
                          onClick={() => setShowSpecialPricingModal(true)}
                          className="text-blue-600 hover:text-blue-700 font-medium underline transition-colors"
                        >
                          {t("pricing.contact_us_for_special_pricing")}
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
                <div className="text-center mb-6 xs:mb-8 sm:mb-8 relative">
                  {/* Early Bird Offer Label */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-md animate-bounce whitespace-nowrap">
                    {t("earlyBirdOffer")} -{" "}
                    {getCurrentProduct().discountPercentage}
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
                              : parseInt(selectedLicenses)) *
                            (selectedCategory === "file-eraser"
                              ? parseInt(selectedYears)
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

                {/* Plan Summary - Only show for File Eraser */}
                {/* Hidden for single-tier pricing */}
                {false && selectedCategory === "file-eraser" && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-100">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {getCurrentPlan().name}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      {getCurrentPlan().description}
                    </p>
                    <div className="text-xs text-teal-600 font-medium">
                      Category: {getCurrentPlan().category}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={
                    isBuyNowLoading || selectedCategory === "drive-eraser"
                  }
                  onMouseEnter={() => {
                    // ✅ Prefetch on hover for even faster response
                    if (
                      selectedLicenses !== "custom" &&
                      selectedPlan !== "custom" &&
                      selectedCategory !== "drive-eraser"
                    ) {
                      // Prefetch checkout domain connection
                      const img = new Image();
                      img.src = "https://checkout.dodopayments.com/favicon.ico";
                    }
                  }}
                  className={`w-full font-bold py-3 xs:py-4 px-4 xs:px-5 sm:px-6 rounded-xl mb-4 xs:mb-5 sm:mb-6 text-base xs:text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 
                    ${
                      selectedCategory === "drive-eraser"
                        ? "bg-slate-400 cursor-not-allowed opacity-80 text-white shadow-none"
                        : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-wait disabled:hover:scale-100"
                    }`}
                >
                  {selectedCategory === "drive-eraser"
                    ? t("comingSoon")
                    : selectedLicenses === "custom" || selectedPlan === "custom"
                      ? t("requestCustomQuote")
                      : t("buyNow")}
                </button>

                {/* Trust Indicators */}
                <div className="space-y-3 text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    {/* <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg> */}
                    {/* <span>{t("pricing.30day_moneyback_guarantee")}</span> */}
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
                    <span>{t("pricingPage.freeShipping")}</span>
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
                    <span>{t("pricingPage.instantActivation")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OS Compatibility */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="text-center">
              <span className="text-blue-700 font-medium">
                {t("osCompatibilityNote")} |
                {t("pricing.instant_delivery_available")}
              </span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl p-4 xs:p-6 sm:p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 xs:mb-6 sm:mb-8">
              {t("pricingPage.faqTitle")}
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
