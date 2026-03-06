import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import { Link } from "@/components/LocaleLink";
import Reveal from "@/components/Reveal";
import {
  ShieldIcon,
  ClipboardIcon,
  GlobeIcon,
  HoverIcon,
} from "@/components/FlatIcons";
import { ENV } from "@/config/env";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon for D-Secure certified companies
const certifiedMarkerIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(5, 150, 105, 0.4);
        border: 3px solid white;
    ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>
    </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Type for certified company
interface CertifiedCompany {
  id: number;
  name: string;
  location: string;
  lat: number;
  lng: number;

  certDate: string;
}

// Certified companies data
const certifiedCompanies: CertifiedCompany[] = [
  {
    id: 1,
    name: "InfoTree Computers",
    location: "Dubai, UAE",
    lat: 25.2048,
    lng: 55.2708,

    certDate: "2025-01",
  },
  {
    id: 2,
    name: "Revent Store",
    location: "UAE",
    lat: 24.4539,
    lng: 54.3773,

    certDate: "2025-01",
  },
];

// FormSubmit configuration
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/support@dsecuretech.com";

const DataGuardianAwardPage: React.FC = () => {
  const { t } = useTranslation(["dataGuardianAward", "common", "seo"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof certifiedCompanies>(
    [],
  );
  const [hasSearched, setHasSearched] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [usageType, setUsageType] = useState<"business" | "personal">(
    "business",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    businessType: "",
    company: "",
    country: "United States",
    solutionType: "",
    complianceRequirements: "",
    message: "",
  });

  // Toast functionality
  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 6000);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = certifiedCompanies.filter(
        (company) =>
          company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.location.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(results);
      setHasSearched(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    const errors: string[] = [];
    if (!formData.name?.trim())
      errors.push(t("formSection.form.validation.nameRequired"));
    if (!formData.email?.trim()) {
      errors.push(t("formSection.form.validation.emailRequired"));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push(t("formSection.form.validation.emailInvalid"));
    }
    if (!formData.message?.trim())
      errors.push(t("formSection.form.validation.messageRequired"));

    if (errors.length > 0) {
      showToast(errors.join(", "), "error");
      setIsLoading(false);
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

      // Hidden fields
      formSubmitData.append(
        "_webhook",
        "https://api.dsecuretech.com/api/formsubmit/webhook",
      );
      formSubmitData.append("_captcha", "false");
      formSubmitData.append("_template", "table");

      // Form fields
      formSubmitData.append("name", formData.name.trim());
      formSubmitData.append("email", formData.email.trim());
      formSubmitData.append("message", formData.message.trim());
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
      formSubmitData.append("source", "Data Guardian Award Page");

      // Subject and CC
      formSubmitData.append(
        "_subject",
        "New Data Hygiene Assurance Enquiry - D-Secure Tech",
      );
      formSubmitData.append(
        "_cc",
        "niteshkushwaha592592@gmail.com,sainiprashant46@gmail.com,d.kumar9012@gmail.com,nishus877@gmail.com,spsingh8477@gmail.com",
      );

      // Reset form immediately for better UX
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+91",
        businessType: "",
        company: "",
        country: "United States",
        solutionType: "",
        complianceRequirements: "",
        message: "",
      });
      setIsLoading(false);
      showToast(t("formSection.form.success"), "success");

      // Submit to backend API
      const timestampISO = now.toISOString();
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
        source: "Data Guardian Award Page",
        timestamp: timestampISO,
      };

      try {
        const API_BASE = ENV.API_BASE_URL;
        await fetch(`${API_BASE}/api/ContactFormSubmissions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        });

        await fetch(FORMSUBMIT_ENDPOINT, {
          method: "POST",
          body: formSubmitData,
          headers: { Accept: "application/json" },
        });

        // Power Automate tracking (non-blocking)
        fetch(ENV.POWER_AUTOMATE_HTTP_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "REACT_CONTACT_2026",
          },
          body: JSON.stringify(submissionData),
        }).catch(() => {});
      } catch (error) {
        console.error("Submission error:", error);
      }
    } catch (error) {
      console.error("Form error:", error);
      showToast(t("formSection.form.error"), "error");
      setIsLoading(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        seo={{
          title: t("seo.title"),
          description: t("seo.description"),
          canonicalUrl: "https://dsecuretech.com/data-guardian-award",
          keywords: t("seo.keywords"),
        }}
      />
      <SEOHead seo={getSEOForPage("data-guardian-award")} />

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

      <div className="min-h-screen bg-white">
        {/* Hero Section - Light with Centered Layout */}
        <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                {/* Left Content */}
                <Reveal>
                  <div>
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-slate-900 leading-tight sm:leading-snug">
                      {t("titlePrefix")} <br className="hidden md:block" />
                      <span className="text-emerald-600">
                        {t("titleHighlight")}
                      </span>{" "}
                      <br className="hidden md:block" />
                      <span className="text-emerald-600">
                        {t("titleSuffix")}
                      </span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-10 leading-relaxed max-w-xl">
                      {t("subtitle")}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="#contact-form"
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById("contact-form")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{t("buttons.getCertified")}</span>
                      </a>
                      <a
                        href="#faq-section"
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById("faq-section")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="group bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-teal-500/30 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{t("buttons.learnMore")}</span>
                      </a>
                    </div>
                  </div>
                </Reveal>

                {/* Right - Modern Glassmorphism Certificate Card */}
                <Reveal delayMs={200}>
                  <div className="flex justify-center items-center relative w-full max-w-[520px] lg:max-w-[580px] mx-auto perspective-1000">
                    {/* Floating Dots Decoration */}
                    <div className="absolute -top-6 -right-6 w-3 h-3 bg-teal-400 rounded-full opacity-60"></div>
                    <div className="absolute -bottom-8 -left-4 w-2 h-2 bg-teal-500 rounded-full opacity-50"></div>
                    <div className="absolute top-1/4 -right-8 w-2 h-2 bg-emerald-400 rounded-full opacity-40"></div>

                    {/* Main Certificate Card - Glassmorphism Style */}
                    <div
                      className="relative z-10 w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform hover:rotate-y-2 transition-transform duration-500"
                      style={{
                        background:
                          "linear-gradient(145deg, #059669 0%, #0d9488 40%, #10b981 70%, #0f766e 100%)",
                        boxShadow:
                          "0 25px 50px -12px rgba(5, 150, 105, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
                      }}
                    >
                      {/* Subtle Light Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none"></div>

                      {/* Diagonal Light Streak */}
                      <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>

                      {/* Certificate Content */}
                      <div className="relative z-10 h-full flex flex-col p-5 sm:p-8 lg:p-10">
                        {/* Header - D-SECURE Brand */}
                        <div className="flex items-center gap-1.5 mb-4 sm:mb-6">
                          <span className="text-white/80 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
                            D-SECURE
                          </span>
                        </div>

                        {/* Center Icon - Glassmorphism Box */}
                        <div className="flex-1 flex flex-col items-center justify-center">
                          <div
                            className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-6"
                            style={{
                              background:
                                "linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(255,255,255,0.15)",
                              boxShadow:
                                "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
                            }}
                          >
                            {/* Shield Icon */}
                            <svg
                              className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white/90"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                            </svg>
                          </div>

                          {/* Title */}
                          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide mb-1 sm:mb-2">
                            {t("certificate.title")}
                          </h2>
                          <p className="text-white/60 text-xs sm:text-sm tracking-[0.15em] uppercase">
                            {t("certificate.subtitle")}
                          </p>
                        </div>

                        {/* Footer - Verified Badge */}
                        <div className="mt-auto flex justify-center">
                          <div
                            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full"
                            style={{
                              background:
                                "linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
                            }}
                          >
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                            </svg>
                            <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
                              {t("certificate.badge")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Border Accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-300/40 to-transparent"></div>
                    </div>

                    {/* Card Shadow */}
                    <div className="absolute -bottom-4 left-6 right-6 h-8 bg-emerald-900/30 blur-xl rounded-full -z-10"></div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Search for Certified Company - Green Banner */}

        {/* What is Assurance Badge Section */}
        <section className="py-12 sm:py-20 md:py-28 bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-10 sm:mb-16">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                  <span>{t("whatIsBadge.badge")}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                  {t("whatIsBadge.titlePrefix")}{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {t("whatIsBadge.titleHighlight")}
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
                  {t("whatIsBadge.desc")}
                </p>
              </div>
            </Reveal>

            {/* Feature Cards */}
            <Reveal delayMs={100}>
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-12 shadow-xl border border-slate-200/60 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <HoverIcon>
                        {(filled) => (
                          <ShieldIcon
                            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                            filled={filled}
                          />
                        )}
                      </HoverIcon>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                      {t("whatIsBadge.features.verifiableErasure")}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      {t("whatIsBadge.features.verifiableErasureDesc")}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <HoverIcon>
                        {(filled) => (
                          <ClipboardIcon
                            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                            filled={filled}
                          />
                        )}
                      </HoverIcon>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                      {t("whatIsBadge.features.auditReady")}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      {t("whatIsBadge.features.auditReadyDesc")}
                    </p>
                  </div>
                  <div className="text-center sm:col-span-2 lg:col-span-1">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <HoverIcon>
                        {(filled) => (
                          <GlobeIcon
                            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                            filled={filled}
                          />
                        )}
                      </HoverIcon>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                      {t("whatIsBadge.features.trustedBrand")}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      {t("whatIsBadge.features.trustedBrandDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <Reveal delayMs={100}>
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group">
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Complete Setup</h3>
                                    <p className="text-slate-600">Full implementation of D-Secure data hygiene tools and automated processes for your organization.</p>
                                </div>
                            </Reveal>

                            <Reveal delayMs={200}>
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:border-teal-200 transition-all duration-300 group">
                                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Continuous Process</h3>
                                    <p className="text-slate-600">Ongoing data hygiene practices with regular auditing and verification to maintain compliance.</p>
                                </div>
                            </Reveal>

                            <Reveal delayMs={300}>
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group">
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Audit Ready</h3>
                                    <p className="text-slate-600">Complete documentation and logs for compliance verification anytime, anywhere.</p>
                                </div>
                            </Reveal>
                        </div> */}
          </div>
        </section>

        {/* Data Hygiene Setup Section */}
        <section className="py-12 sm:py-20 md:py-28 bg-gradient-to-br from-slate-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-10 sm:mb-16">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{t("setup.badge")}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                  {t("setup.titlePrefix")}{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {t("setup.titleHighlight")}
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
                  {t("setup.desc")}
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={100}>
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-12 shadow-xl border border-slate-200/60 w-full mb-10 sm:mb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <HoverIcon>
                        {(filled) => (
                          <svg
                            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        )}
                      </HoverIcon>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                      {t("setup.features.eraser")}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      {t("setup.features.eraserDesc")}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <HoverIcon>
                        {(filled) => (
                          <svg
                            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                            />
                          </svg>
                        )}
                      </HoverIcon>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                      {t("setup.features.freeSpaceWipe")}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      {t("setup.features.freeSpaceWipeDesc")}
                    </p>
                  </div>
                  <div className="text-center sm:col-span-2 lg:col-span-1">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <HoverIcon>
                        {(filled) => (
                          <svg
                            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        )}
                      </HoverIcon>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                      {t("setup.features.auditLogs")}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      {t("setup.features.auditLogsDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Industries We Certify */}
        <section className="py-12 sm:py-20 md:py-28 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-10 sm:mb-16">
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span>{t("industries.badge")}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                  {t("industries.titlePrefix")}{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {t("industries.titleHighlight")}
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
                  {t("industries.desc")}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full mx-auto">
              {[
                {
                  name: t("industries.list.schools"),
                  icon: "🏫",
                  desc: t("industries.list.schoolsDesc"),
                },
                {
                  name: t("industries.list.studios"),
                  icon: "🎬",
                  desc: t("industries.list.studiosDesc"),
                },
                {
                  name: t("industries.list.startups"),
                  icon: "🚀",
                  desc: t("industries.list.startupsDesc"),
                },
                {
                  name: t("industries.list.smbs"),
                  icon: "🏢",
                  desc: t("industries.list.smbsDesc"),
                },
                {
                  name: t("industries.list.freelancers"),
                  icon: "💼",
                  desc: t("industries.list.freelancersDesc"),
                },
                {
                  name: t("industries.list.coworking"),
                  icon: "🏠",
                  desc: t("industries.list.coworkingDesc"),
                },
                {
                  name: t("industries.list.hospitals"),
                  icon: "🏥",
                  desc: t("industries.list.hospitalsDesc"),
                },
                {
                  name: t("industries.list.lawFirms"),
                  icon: "⚖️",
                  desc: t("industries.list.lawFirmsDesc"),
                },
                {
                  name: t("industries.list.itCompanies"),
                  icon: "💻",
                  desc: t("industries.list.itCompaniesDesc"),
                },
                {
                  name: t("industries.list.retailers"),
                  icon: "🛒",
                  desc: t("industries.list.retailersDesc"),
                },
                {
                  name: t("industries.list.finance"),
                  icon: "🏦",
                  desc: t("industries.list.financeDesc"),
                },
                {
                  name: t("industries.list.consultants"),
                  icon: "📊",
                  desc: t("industries.list.consultantsDesc"),
                },
              ].map((industry, index) => (
                <Reveal key={industry.name} delayMs={index * 50}>
                  <div className="bg-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-emerald-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 text-center group hover:-translate-y-1">
                    <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                      {industry.icon}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-emerald-800 mb-1">
                      {industry.name}
                    </h3>
                    <p className="text-xs text-emerald-600/70 hidden sm:block">
                      {industry.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Certified Partners Map Section */}
        <section className="py-12 sm:py-20 md:py-28 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal>
              <div className="text-center mb-10 sm:mb-16">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-white/20">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{t("map.badge")}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                  {t("map.title")}
                </h2>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8">
                  {t("map.desc")}
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto px-4 sm:px-0">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-white rounded-2xl sm:rounded-full p-3 sm:p-2 shadow-xl">
                    <input
                      type="text"
                      placeholder={t("map.searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="flex-1 px-4 sm:px-6 py-3 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm sm:text-base rounded-xl sm:rounded-full"
                    />
                    <button
                      onClick={handleSearch}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm sm:text-base rounded-xl sm:rounded-full hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 whitespace-nowrap"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      {t("map.searchButton")}
                    </button>
                  </div>

                  {/* Search Results */}
                  {hasSearched && (
                    <div className="mt-6 text-left">
                      {searchResults.length > 0 ? (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                          <p className="text-emerald-400 font-medium mb-3">
                            {t("map.found", {
                              count: searchResults.length,
                            })}
                          </p>
                          {searchResults.map((company) => (
                            <div
                              key={company.id}
                              className="flex items-center gap-3 p-3 bg-white/5 rounded-lg mb-2 last:mb-0"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-white"
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
                              <div>
                                <p className="text-white font-semibold">
                                  {company.name}
                                </p>
                                <p className="text-slate-400 text-sm">
                                  {company.location}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                          <p className="text-slate-300">
                            {t("map.notFound", {
                              query: searchQuery,
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Map Container */}
            <Reveal delayMs={100}>
              <div className="relative w-full max-w-5xl mx-auto px-2 sm:px-0">
                {/* Responsive Map Container */}
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg">
                  {/* Leaflet Map with Light Theme */}
                  <div className="relative h-[250px] xs:h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
                    <MapContainer
                      center={[24.8, 54.8]}
                      zoom={5}
                      scrollWheelZoom={false}
                      touchZoom={true}
                      dragging={true}
                      zoomControl={false}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">${t("map.openstreetmap")}</a>`}
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                      />

                      {/* InfoTree Computers - Dubai */}
                      <Marker
                        position={[25.2048, 55.2708]}
                        icon={certifiedMarkerIcon}
                      >
                        {/* <Tooltip
                                                    permanent
                                                    direction="right"
                                                    offset={[20, 0]}
                                                    className="custom-tooltip"
                                                >
                                                    <span style={{ fontWeight: 'bold', fontSize: '12px' }}>InfoTree Computers</span>
                                                </Tooltip> */}
                        <Popup>
                          <div style={{ minWidth: "200px", padding: "8px" }}>
                            <h3
                              style={{
                                fontWeight: "bold",
                                fontSize: "16px",
                                marginBottom: "8px",
                                color: "#1e293b",
                              }}
                            >
                              {t("map.infotree_computers")}
                            </h3>
                            <p
                              style={{
                                color: "#64748b",
                                fontSize: "12px",
                                marginBottom: "4px",
                              }}
                            >
                              {t("map.certifiedTo")}
                            </p>
                            <p
                              style={{
                                color: "#059669",
                                fontSize: "13px",
                                marginBottom: "12px",
                              }}
                            >
                              {t("map.certifiedType")}
                            </p>
                          </div>
                        </Popup>
                      </Marker>

                      {/* Revent Store - UAE */}
                      <Marker
                        position={[24.4539, 54.3773]}
                        icon={certifiedMarkerIcon}
                      >
                        {/* <Tooltip
                                                    permanent
                                                    direction="left"
                                                    offset={[-20, 0]}
                                                    className="custom-tooltip"
                                                >
                                                    <span style={{ fontWeight: 'bold', fontSize: '12px' }}>Revent Store</span>
                                                </Tooltip> */}
                        <Popup>
                          <div style={{ minWidth: "200px", padding: "8px" }}>
                            <h3
                              style={{
                                fontWeight: "bold",
                                fontSize: "16px",
                                marginBottom: "8px",
                                color: "#1e293b",
                              }}
                            >
                              {t("map.revent_store")}
                            </h3>
                            <p
                              style={{
                                color: "#64748b",
                                fontSize: "12px",
                                marginBottom: "4px",
                              }}
                            >
                              {t("map.certifiedTo")}
                            </p>
                            <p
                              style={{
                                color: "#0d9488",
                                fontSize: "13px",
                                marginBottom: "12px",
                              }}
                            >
                              {t("map.certifiedType")}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq-section"
          className="py-12 sm:py-20 md:py-28 bg-gradient-to-br from-slate-50 to-white"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
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
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{t("faq.badge")}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                  {t("faq.titlePrefix")}{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {t("faq.titleHighlight")}
                  </span>
                </h2>
              </div>
            </Reveal>

            <div className="w-full mx-auto space-y-2">
              {[
                {
                  question: t("faq.questions.q1"),
                  answer: t("faq.questions.a1"),
                },
                {
                  question: t("faq.questions.q2"),
                  answer: t("faq.questions.a2"),
                },
                {
                  question: t("faq.questions.q3"),
                  answer: t("faq.questions.a3"),
                },
                {
                  question: t("faq.questions.q4"),
                  answer: t("faq.questions.a4"),
                },
                {
                  question: t("faq.questions.q5"),
                  answer: t("faq.questions.a5"),
                },
              ].map((faq, index) => (
                <Reveal key={index} delayMs={index * 50}>
                  <div className="bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all duration-300 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex items-center justify-between w-full cursor-pointer p-3 sm:p-4 text-left"
                    >
                      <h3
                        className={`text-sm sm:text-lg font-bold transition-colors pr-2 sm:pr-4 ${openFaq === index ? "text-emerald-600" : "text-slate-900"}`}
                      >
                        {faq.question}
                      </h3>
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${openFaq === index ? "bg-emerald-500 rotate-180" : "bg-slate-200"}`}
                      >
                        <svg
                          className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors ${openFaq === index ? "text-white" : "text-slate-600"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>
                    {openFaq === index && (
                      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section
          id="contact-form"
          className="py-8 sm:py-10 md:py-18 bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Reveal>
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200/60 p-5 sm:p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
                      {t("formSection.title")}
                    </h2>
                    <p className="text-slate-600 text-center mb-6">
                      {t("formSection.desc")}
                    </p>

                    {/* Usage Type Toggle */}
                    <div className="mb-6 sm:mb-8">
                      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
                        <span className="text-base sm:text-lg font-medium text-slate-700 w-full sm:w-auto text-center sm:text-left">
                          {t("formSection.usage")}
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
                            className="w-5 h-5 text-emerald-600"
                          />
                          <span className="text-base sm:text-lg font-medium">
                            {t("common:form.appliedForBusiness")}
                          </span>
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
                            className="w-5 h-5 text-emerald-600"
                          />
                          <span className="text-base sm:text-lg font-medium">
                            {t("common:form.appliedForPersonal")}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Conditional Message for Personal */}
                    {usageType === "personal" && (
                      <div className="mb-6 text-center text-blue-600">
                        {t(
                          "common:form.personalNotice",
                          "Please note: Personal applications will be reviewed on a case-by-case basis.",
                        )}
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
                                {t("common:form.fullName")}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                onInvalid={(e) =>
                                  (
                                    e.target as HTMLInputElement
                                  ).setCustomValidity(
                                    t("common:form.validation.nameRequired"),
                                  )
                                }
                                onInput={(e) =>
                                  (
                                    e.target as HTMLInputElement
                                  ).setCustomValidity("")
                                }
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors"
                                placeholder={t("common:form.fullName")}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-700 mb-2"
                              >
                                {t("common:form.businessEmail")}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                onInvalid={(e) =>
                                  (
                                    e.target as HTMLInputElement
                                  ).setCustomValidity(
                                    t("common:form.validation.emailRequired"),
                                  )
                                }
                                onInput={(e) =>
                                  (
                                    e.target as HTMLInputElement
                                  ).setCustomValidity("")
                                }
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors"
                                placeholder={t("common:form.email")}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            <div>
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-slate-700 mb-2"
                              >
                                {t("common:form.phoneNumber")}
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors"
                                placeholder={t("common:form.phoneNumber")}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="businessType"
                                className="block text-sm font-medium text-slate-700 mb-2"
                              >
                                {t("common:form.businessType")}
                              </label>
                              <select
                                id="businessType"
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors bg-white"
                              >
                                <option value="">
                                  {t("common:form.businessType")}
                                </option>
                                <option value="enterprise">
                                  {t("common:form.businessTypes.enterprise")}
                                </option>
                                <option value="government">
                                  {t("common:form.businessTypes.government")}
                                </option>
                                <option value="healthcare">
                                  {t("common:form.businessTypes.healthcare")}
                                </option>
                                <option value="education">
                                  {t("common:form.businessTypes.education")}
                                </option>
                                <option value="financial">
                                  {t("common:form.businessTypes.financial")}
                                </option>
                                <option value="legal">
                                  {t("common:form.businessTypes.legal")}
                                </option>
                                <option value="technology">
                                  {t("common:form.businessTypes.technology")}
                                </option>
                                <option value="manufacturing">
                                  {t("common:form.businessTypes.manufacturing")}
                                </option>
                                <option value="other">
                                  {t("common:form.businessTypes.other")}
                                </option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            <div>
                              <label
                                htmlFor="company"
                                className="block text-sm font-medium text-slate-700 mb-2"
                              >
                                {t("common:form.companyName")}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="company"
                                name="company"
                                required
                                value={formData.company}
                                onChange={handleChange}
                                onInvalid={(e) =>
                                  (
                                    e.target as HTMLInputElement
                                  ).setCustomValidity(
                                    t("common:form.validation.nameRequired"),
                                  )
                                }
                                onInput={(e) =>
                                  (
                                    e.target as HTMLInputElement
                                  ).setCustomValidity("")
                                }
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors"
                                placeholder={t("common:form.companyName")}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium text-slate-700 mb-2"
                              >
                                {t("common:form.country")}
                              </label>
                              <select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors bg-white"
                              >
                                <option value="United States">
                                  {t("common:form.countries.us")}
                                </option>
                                <option value="India">
                                  {t("common:form.countries.in")}
                                </option>
                                <option value="United Kingdom">
                                  {t("common:form.countries.uk")}
                                </option>
                                <option value="Canada">
                                  {t("common:form.countries.ca")}
                                </option>
                                <option value="Other">
                                  {t("common:form.countries.other")}
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
                                {t("common:form.fullName")}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors"
                                placeholder={t("common:form.fullName")}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-700 mb-2"
                              >
                                {t("common:form.email")}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                onInvalid={(e) =>
                                  (
                                    e.target as HTMLInputElement
                                  ).setCustomValidity(
                                    t("common:form.validation.emailRequired"),
                                  )
                                }
                                onInput={(e) =>
                                  (
                                    e.target as HTMLInputElement
                                  ).setCustomValidity("")
                                }
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors"
                                placeholder={t("common:form.email")}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 lg:gap-6">
                            <div>
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-slate-700 mb-2"
                              >
                                {t("common:form.phoneNumber")}
                              </label>

                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors"
                                placeholder={t("common:form.phoneNumber")}
                              />
                              {/* <div className="flex w-full">
                                                                <select
                                                                    name="countryCode"
                                                                    value={formData.countryCode}
                                                                    onChange={handleChange}
                                                                    className="w-[110px] sm:w-[120px] px-2 sm:px-3 py-3 border border-slate-300 rounded-l-lg focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors bg-white text-sm sm:text-base"
                                                                >
                                                                    <option value="+1">🇺🇸 +1</option>
                                                                    <option value="+44">🇬🇧 +44</option>
                                                                    <option value="+91">🇮🇳 +91</option>
                                                                    <option value="+86">🇨🇳 +86</option>
                                                                    <option value="+49">🇩🇪 +49</option>
                                                                </select>
                                                                
                                                            </div> */}
                            </div>
                            <div>
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium text-slate-700 mb-2"
                              >
                                {t("common:form.country")}
                              </label>
                              <select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors bg-white"
                              >
                                <option value="United States">
                                  {t("common:form.countries.us")}
                                </option>
                                <option value="India">
                                  {t("common:form.countries.in")}
                                </option>
                                <option value="United Kingdom">
                                  {t("common:form.countries.uk")}
                                </option>
                                <option value="Canada">
                                  {t("common:form.countries.ca")}
                                </option>
                                <option value="Other">
                                  {t("common:form.countries.other")}
                                </option>
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
                          {t("common:form.message")}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          onInvalid={(e) =>
                            (e.target as HTMLTextAreaElement).setCustomValidity(
                              t("common:form.validation.messageRequired"),
                            )
                          }
                          onInput={(e) =>
                            (e.target as HTMLTextAreaElement).setCustomValidity(
                              "",
                            )
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors resize-none"
                          placeholder={t(
                            "common:form.messageDetail",
                            "Please let us know your requirements in detail.",
                          )}
                        />
                      </div>

                      {usageType === "personal" && (
                        <div className="text-sm text-slate-600">
                          {t("common:form.privacyNotice")}{" "}
                          <Link
                            to="/privacy-policy"
                            className="text-emerald-600 hover:underline"
                          >
                            {t("common:nav.privacyPolicy", "Privacy Policy")}
                          </Link>
                          .
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-lg text-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-white"
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
                            {t("common:form.submitting")}
                          </>
                        ) : (
                          t("common:form.submit")
                        )}
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
                      {t("contactInfo.response")}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {t("contactInfo.desc")}
                    </p>
                    <div className="space-y-3 text-sm">
                      <a
                        href="mailto:sales@dsecuretech.com"
                        className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">
                            {t("contactInfo.teams.sales")}
                          </span>
                          <p className="text-xs text-slate-800">
                            sales@dsecuretech.com
                          </p>
                        </div>
                      </a>
                      <a
                        href="mailto:support@dsecuretech.com"
                        className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">
                            {t("contactInfo.teams.support")}
                          </span>
                          <p className="text-xs text-slate-800">
                            support@dsecuretech.com
                          </p>
                        </div>
                      </a>
                      <a
                        href="mailto:legal@dsecuretech.com"
                        className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">
                            {t("contactInfo.teams.legal")}
                          </span>
                          <p className="text-xs text-slate-800">
                            legal@dsecuretech.com
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section - Dark */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal>
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                  <span>{t("cta.badge")}</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {t("cta.titlePrefix")}{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {t("cta.titleHighlight")}
                  </span>
                </h2>
                <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                  {t("cta.desc")}
                </p>
                <div className="flex justify-center">
                  <Link
                    to="/contact"
                    className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-10 py-5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <span>{t("cta.button")}</span>
                    <svg
                      className="w-5 h-5"
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
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default DataGuardianAwardPage;
