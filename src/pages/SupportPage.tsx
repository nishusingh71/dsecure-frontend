import React, { useState, useCallback, useMemo, memo } from "react";
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "@/components/LocaleLink";

import { useTranslation } from "react-i18next";
import { LicenseForm, type LicenseFormData } from "@/components/forms";
import { PartnershipForm, type PartnershipFormData } from "@/components/forms";
import { useToast } from "@/hooks";
import { Toast } from "@/components/ui";
import { ENV } from "@/config/env";
import { useLocaleNavigate } from "@/hooks/useLocaleNavigate";

// Form components - removed memo to prevent focus loss during typing
const FormInput: React.FC<{
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder: string;
  label: string;
}> = ({ type, name, value, onChange, required, placeholder, label }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && "*"}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
      placeholder={placeholder}
    />
  </div>
);

const FormTextarea: React.FC<{
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder: string;
  label: string;
  rows: number;
}> = ({ name, value, onChange, required, placeholder, label, rows }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && "*"}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
      placeholder={placeholder}
    />
  </div>
);

const FormSelect: React.FC<{
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: { value: string; label: string }[];
}> = ({ name, value, onChange, label, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Support Ticket Modal Component - removed memo for consistency
const SupportTicketModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  ticketForm: {
    name: string;
    email: string;
    subject: string;
    priority: string;
    category: string;
    description: string;
  };
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  priorityOptions: { value: string; label: string }[];
  categoryOptions: { value: string; label: string }[];
  isSubmitting?: boolean;
}> = ({
  isOpen,
  onClose,
  ticketForm,
  onInputChange,
  onSubmit,
  priorityOptions,
  categoryOptions,
  isSubmitting = false,
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white p-6 rounded-t-xl flex-shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {t("support.submitTicketModalTitle")}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-slate-200 transition-colors text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
              disabled={isSubmitting}
            >
              ×
            </button>
          </div>
          <p className="mt-2 text-emerald-100">
            {t("support.submitTicketModalSubtitle")}
          </p>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto modal-scroll-container">
          <form onSubmit={onSubmit} className="p-6 space-y-6 modal-scroll">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                name="name"
                value={ticketForm.name}
                onChange={onInputChange}
                required
                placeholder={t("support.fullNamePlaceholder")}
                label={t("support.fullNameLabel")}
              />

              <FormInput
                type="email"
                name="email"
                value={ticketForm.email}
                onChange={onInputChange}
                required
                placeholder={t("support.emailPlaceholder")}
                label={t("support.emailLabel")}
              />
            </div>

            <FormInput
              type="text"
              name="subject"
              value={ticketForm.subject}
              onChange={onInputChange}
              required
              placeholder={t("support.subjectPlaceholder")}
              label={t("support.subjectLabel")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                name="priority"
                value={ticketForm.priority}
                onChange={onInputChange}
                label={t("support.priorityLabel")}
                options={priorityOptions}
              />

              <FormSelect
                name="category"
                value={ticketForm.category}
                onChange={onInputChange}
                label={t("support.categoryLabel")}
                options={categoryOptions}
              />
            </div>

            <FormTextarea
              name="description"
              value={ticketForm.description}
              onChange={onInputChange}
              required
              rows={1}
              placeholder={t("support.descriptionPlaceholder")}
              label={t("support.descriptionLabel")}
            />

            <div className="flex gap-4 pt-4 sticky bottom-0 bg-white">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? t("support.submitting")
                  : t("support.submitTicket")}
              </button>
              {/* <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const SupportPage: React.FC = () => {
  const { toast, showToast, hideToast } = useToast();
  const { t } = useTranslation();
  const navigate = useLocaleNavigate();
  const [activeTicketForm, setActiveTicketForm] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "medium",
    category: "general",
    description: "",
  });

  // Memoize form options to prevent re-creation
  const priorityOptions = useMemo(
    () => [
      { value: "low", label: t("support.priorityLow") },
      { value: "medium", label: t("support.priorityMedium") },
      { value: "high", label: t("support.priorityHigh") },
      { value: "urgent", label: t("support.priorityUrgent") },
    ],
    [t],
  );

  const categoryOptions = useMemo(
    () => [
      { value: "general", label: t("support.categoryGeneral") },
      { value: "technical", label: t("support.categoryTechnical") },
      { value: "billing", label: t("support.categoryBilling") },
      { value: "feature", label: t("support.categoryFeature") },
      { value: "bug", label: t("support.categoryBug") },
    ],
    [t],
  );

  // Searchable content database
  const searchableContent = useMemo(
    () => [
      {
        id: "faqs",
        title: t("support.searchFaqs"),
        description: t("support.searchFaqsDesc"),
        url: "/support/faqs",
        category: t("support.categorySupport"),
        keywords: [
          "faq",
          "questions",
          "answers",
          "help",
          "common",
          "issues",
          "problems",
        ],
      },
      {
        id: "knowledge-base",
        title: t("support.searchKnowledgeBase"),
        description: t("support.searchKnowledgeBaseDesc"),
        url: "/support/knowledge-base",
        category: t("support.categoryDocumentation"),
        keywords: [
          "guide",
          "tutorial",
          "documentation",
          "steps",
          "how-to",
          "manual",
        ],
      },
      {
        id: "get-started",
        title: t("support.searchGetStarted"),
        description: t("support.searchGetStartedDesc"),
        url: "/support/get-started",
        category: t("support.categoryGettingStarted"),
        keywords: [
          "getting started",
          "beginner",
          "setup",
          "installation",
          "first time",
        ],
      },
      {
        id: "help-manual",
        title: t("support.searchHelpManual"),
        description: t("support.searchHelpManualDesc"),
        url: "/support/help-manual",
        category: t("support.categoryDocumentation"),
        keywords: ["manual", "documentation", "user guide", "reference"],
      },
      {
        id: "product-videos",
        title: t("support.searchProductVideos"),
        description: t("support.searchProductVideosDesc"),
        url: "/support/product-videos",
        category: t("support.categoryVideos"),
        keywords: [
          "video",
          "tutorial",
          "demo",
          "demonstration",
          "visual",
          "watch",
        ],
      },
      {
        id: "overwrite-guide",
        title: t("support.searchOverwrite"),
        description: t("support.searchOverwriteDesc"),
        url: "/support/overwrite-guide",
        category: t("support.categoryGuides"),
        keywords: [
          "overwrite",
          "hard drive",
          "hdd",
          "passes",
          "multiple",
          "secure",
        ],
      },
      {
        id: "wipe-guide",
        title: t("support.searchWipe"),
        description: t("support.searchWipeDesc"),
        url: "/support/secure-erase-hddssd",
        category: t("support.categoryGuides"),
        keywords: [
          "wipe",
          "erase",
          "delete",
          "hdd",
          "ssd",
          "hard drive",
          "solid state",
        ],
      },
      {
        id: "sas-wipe-guide",
        title: t("support.searchSas"),
        description: t("support.searchSasDesc"),
        url: "/support/sas-wipe-guide",
        category: t("support.categoryGuides"),
        keywords: ["sas", "drive", "wipe", "permanent", "enterprise", "server"],
      },
      {
        id: "mac-wipe-guide",
        title: t("support.searchMac"),
        description: t("support.searchMacDesc"),
        url: "/support/mac-eraser-guide",
        category: t("support.categoryGuides"),
        keywords: ["mac", "apple", "macbook", "imac", "board", "wipe"],
      },
      {
        id: "m1-mac-wipe-guide",
        title: t("support.searchM1Mac"),
        description: t("support.searchM1MacDesc"),
        url: "/support/mac-wipe-guide",
        category: t("support.categoryGuides"),
        keywords: ["m1", "mac", "chip", "apple silicon", "new mac", "arm"],
      },
      {
        id: "cloud-console-guide",
        title: t("support.searchCloud"),
        description: t("support.searchCloudDesc"),
        url: "/support/cloud-console-guide",
        category: t("support.categoryCloud"),
        keywords: ["cloud", "console", "remote", "management", "web interface"],
      },
      {
        id: "ssd-cryptographic-erasure",
        title: t("support.searchSsdCrypto"),
        description: t("support.searchSsdCryptoDesc"),
        url: "/support/ssd-cryptographic-erasure-guide",
        category: t("support.categoryAdvanced"),
        keywords: [
          "ssd",
          "cryptographic",
          "encryption",
          "secure erase",
          "crypto",
        ],
      },
      {
        id: "retain-os-guide",
        title: t("support.searchRetainOs"),
        description: t("support.searchRetainOsDesc"),
        url: "/support/retain-os-guide",
        category: t("support.categoryGuides"),
        keywords: [
          "retain",
          "os",
          "operating system",
          "keep",
          "preserve",
          "selective wipe",
        ],
      },
    ],
    [t],
  );

  // Trending searches data
  const trendingSearches = useMemo(
    () => ({
      [t("support.trending1")]: "/support/overwrite-guide",
      [t("support.trending2")]: "/support/secure-erase-hddssd",
      [t("support.trending3")]: "/support/sas-wipe-guide",
      [t("support.trending4")]: "/support/mac-eraser-guide",
      // "How to customize ISO file using D-Secure?": "/support/iso-customization-guide",
      [t("support.trending5")]: "/support/retain-os-guide",
      [t("support.trending6")]: "/support/mac-wipe-guide",
      [t("support.trending7")]: "/support/cloud-console-guide",
      [t("support.trending8")]: "/support/ssd-cryptographic-erasure-guide",
      // "How can I diagnose my smartphone using D-Secure?": "/support/smartphone-diagnosis-guide",
    }),
    [t],
  );

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();

    // First, search through regular searchable content
    const contentResults = searchableContent.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.keywords.some((keyword) => keyword.includes(query)),
    );

    // Then, search through trending searches for keyword matches
    const trendingResults = Object.entries(trendingSearches)
      .filter(([searchText, url]) => {
        const searchTextLower = searchText.toLowerCase();
        return (
          searchTextLower.includes(query) ||
          query
            .split(" ")
            .some((word) => word.length > 2 && searchTextLower.includes(word))
        );
      })
      .map(([searchText, url]) => ({
        title: searchText,
        description: t("support.popularQuestion"),
        category: t("support.categoryTrending"),
        url: url,
        keywords: searchText.toLowerCase().split(" "),
      }));

    // Combine results, prioritizing trending searches
    const combinedResults = [...trendingResults, ...contentResults];

    // Remove duplicates based on title and limit to 8 results
    const uniqueResults = combinedResults.filter(
      (item, index, arr) =>
        arr.findIndex(
          (t) => t.title.toLowerCase() === item.title.toLowerCase(),
        ) === index,
    );

    return uniqueResults.slice(0, 8);
  }, [searchQuery, searchableContent, trendingSearches]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        setShowSearchResults(true);
      }
    },
    [searchQuery],
  );

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      const shouldShow = value.trim().length > 0;
      setShowSearchResults(shouldShow);
      setSelectedResultIndex(-1);

      // Prevent page scroll when search results are shown
      if (shouldShow) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
    [],
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setShowSearchResults(false);
    setSelectedResultIndex(-1);
    document.body.style.overflow = "";
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showSearchResults || searchResults.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedResultIndex((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedResultIndex((prev) =>
            prev > 0 ? prev - 1 : searchResults.length - 1,
          );
          break;
        case "Enter":
          e.preventDefault();
          if (
            selectedResultIndex >= 0 &&
            selectedResultIndex < searchResults.length
          ) {
            window.location.href = searchResults[selectedResultIndex].url;
          } else {
            handleSearch(e as any);
          }
          break;
        case "Escape":
          e.preventDefault();
          clearSearch();
          break;
      }
    },
    [
      showSearchResults,
      searchResults,
      selectedResultIndex,
      handleSearch,
      clearSearch,
    ],
  );

  // Handle trending search click
  const handleTrendingSearchClick = useCallback(
    (url: string) => {
      navigate(url);
    },
    [navigate],
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Removed handleLicenseSubmit and handlePartnershipSubmit since the form components handle submission natively

  const handleTicketSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

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
        const timestampISO = now.toISOString();

        // === Prepare FormData for FormSubmit ===
        const formSubmitData = new FormData();
        formSubmitData.append(
          "_webhook",
          "https://api.dsecuretech.com/api/formsubmit/webhook",
        );
        formSubmitData.append("_captcha", "false");
        formSubmitData.append("_template", "table");
        formSubmitData.append("name", ticketForm.name.trim());
        formSubmitData.append("email", ticketForm.email.trim());
        formSubmitData.append("subject", ticketForm.subject.trim());
        formSubmitData.append("priority", ticketForm.priority.trim());
        formSubmitData.append("category", ticketForm.category.trim());
        formSubmitData.append("description", ticketForm.description.trim());
        formSubmitData.append("_replyto", ticketForm.email.trim());
        formSubmitData.append("timestamp", timestampLocal);
        formSubmitData.append("source", "Support Page - Ticket Form");
        formSubmitData.append(
          "_subject",
          `Support Ticket: ${ticketForm.subject} - D-Secure Tech`,
        );
        formSubmitData.append(
          "_cc",
          "niteshkushwaha592592@gmail.com,sainiprashant46@gmail.com,d.kumar9012@gmail.com,nishus877@gmail.com,spsingh8477@gmail.com",
        );

        // === Prepare submission data for Backend API ===
        const submissionData = {
          name: ticketForm.name.trim(),
          email: ticketForm.email.trim(),
          company: "",
          phone: "",
          country: "",
          businessType: "",
          solutionType: ticketForm.category.trim(),
          complianceRequirements: "",
          message: `[${ticketForm.priority.toUpperCase()}] ${ticketForm.subject.trim()}: ${ticketForm.description.trim()}`,
          usageType: "",
          source: "Support Page - Ticket Form",
          timestamp: timestampISO,
        };

        // Reset form and show success immediately
        setActiveTicketForm(false);
        setTicketForm({
          name: "",
          email: "",
          subject: "",
          priority: "medium",
          category: "general",
          description: "",
        });
        setIsSubmitting(false);
        showToast(t("support.ticketSuccess"), "success");

        try {
          // === 1. SUBMIT TO BACKEND API (DATABASE) ===
          const API_BASE = ENV.API_BASE_URL;
          const apiResponse = await fetch(
            `${API_BASE}/api/ContactFormSubmissions`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(submissionData),
            },
          );

          // === 2. SUBMIT TO FORMSUBMIT (EMAIL & WEBHOOK) ===
          await fetch("https://formsubmit.co/support@dsecuretech.com", {
            method: "POST",
            body: formSubmitData,
            headers: { Accept: "application/json" },
          });

          // === 3. Microsoft Excel + Teams tracking (non-blocking) ===
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
            console.error("Backend submission failed:", errorData);
          }
        } catch (error: any) {
          console.error("Form error:", error);
        }
      } catch (error) {
        console.error("FormSubmit error:", error);
        showToast(t("support.ticketError"), "error");
        setIsSubmitting(false);
      }
    },
    [ticketForm, showToast],
  );

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = e.target;
      setTicketForm((prev) => {
        // Only update if the value actually changed
        if (prev[name as keyof typeof prev] === value) {
          return prev;
        }
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    [],
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support")} />

      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                    <span className="text-brand">D-Secure</span>
                    <sup className="text-2xl text-brand"></sup>{" "}
                    {t("support.heroTitle")}
                  </h1>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-700 mb-6">
                    {t("support.heroSubtitle")}
                  </h2>

                  {/* Search Bar */}
                  <div className="max-w-2xl mx-auto relative">
                    <div className="relative">
                      <form onSubmit={handleSearch}>
                        <div className="relative">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder={t("support.searchPlaceholder")}
                            className="w-full py-4 pl-12 pr-20 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-base shadow-sm hover:shadow-md placeholder:text-slate-400"
                            autoComplete="off"
                          />
                          <svg
                            className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
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
                          {searchQuery && (
                            <button
                              type="button"
                              onClick={clearSearch}
                              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
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
                          )}
                          <button
                            type="submit"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md transition-colors font-medium text-sm"
                          >
                            {t("support.searchGo")}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Search Results Overlay */}
        {showSearchResults && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
              onClick={clearSearch}
            />

            {/* Search Results Modal */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4 z-[10000]">
              {searchResults.length > 0 ? (
                <div className="bg-white rounded-xl shadow-2xl max-h-[70vh] overflow-hidden">
                  <div className="p-4 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-emerald-900">
                        {t("support.resultsFound", {
                          count: searchResults.length,
                          query: searchQuery,
                        })}
                      </span>
                      <button
                        onClick={clearSearch}
                        className="text-emerald-600 hover:text-emerald-700 transition-colors p-1 hover:bg-emerald-100 rounded-full"
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
                  <div className="max-h-96 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <Link
                        key={`${result.title}-${index}`}
                        to={result.url}
                        className={`block p-4 hover:bg-emerald-50 transition-all border-b border-slate-100 last:border-b-0 ${
                          index === selectedResultIndex
                            ? "bg-emerald-50 border-l-4 border-l-emerald-500"
                            : ""
                        }`}
                        onClick={clearSearch}
                        onMouseEnter={() => setSelectedResultIndex(index)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-emerald-600">
                              {result.title}
                            </h3>
                            <p className="text-sm text-slate-600 mb-2">
                              {result.description}
                            </p>
                            <span className="inline-block px-2 py-1 text-xs font-medium text-emerald-700 bg-emerald-100 rounded-full">
                              {result.category}
                            </span>
                          </div>
                          <svg
                            className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                searchQuery && (
                  <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-emerald-600"
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
                    </div>
                    <p className="text-slate-900 font-semibold mb-2">
                      {t("support.noResultsFor", { query: searchQuery })}
                    </p>
                    <p className="text-sm text-slate-600 mb-4">
                      {t("support.noResultsTip")}
                    </p>
                    <button
                      onClick={clearSearch}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-all shadow-md"
                    >
                      {t("support.clearSearch")}
                    </button>
                  </div>
                )
              )}
            </div>
          </>
        )}

        {/* Trending Searches */}
        <section
          className={`py-8 bg-white border-b border-slate-200 ${showSearchResults ? "hidden" : ""}`}
        >
          <div className="container-responsive">
            <Reveal>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  {t("support.trendingSearches")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(trendingSearches).map(
                    ([search, url], index) => (
                      <div key={index} className="flex gap-2">
                        <button
                          className="flex-1 text-left text-brand hover:text-brand-600 hover:underline transition-colors p-2 rounded-md hover:bg-blue-50"
                          onClick={() => handleTrendingSearchClick(url)}
                        >
                          {search}
                        </button>
                        <Link
                          to={url}
                          className="text-slate-500 hover:text-brand transition-colors p-2 rounded-md hover:bg-slate-50"
                          title={t("support.goToGuide")}
                        ></Link>
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-4 text-sm text-slate-600"></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Self Help & Support Section */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {t("support.selfHelpTitle")}
                </h2>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  {t("support.selfHelpSubtitle")}
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* FAQs */}
              <Reveal delayMs={100}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group h-full flex flex-col">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {t("support.faqTitle")}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                    {t("support.faqDesc")}
                  </p>
                  <Link
                    to="/support/faqs"
                    className="text-brand hover:text-brand-600 font-semibold hover:underline transition-colors"
                  >
                    {t("support.learnMore")}
                  </Link>
                </div>
              </Reveal>

              {/* Knowledge Base */}
              <Reveal delayMs={200}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group h-full flex flex-col">
                  <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                    <svg
                      className="w-8 h-8 text-emerald-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {t("support.knowledgeBaseTitle")}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                    {t("support.knowledgeBaseDesc")}
                  </p>
                  <Link
                    to="/support/knowledge-base"
                    className="text-brand hover:text-brand-600 font-semibold hover:underline transition-colors"
                  >
                    {t("support.learnMore")}
                  </Link>
                </div>
              </Reveal>

              {/* Get Started */}
              <Reveal delayMs={300}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group h-full flex flex-col">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {t("support.getStartedTitle")}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                    {t("support.getStartedDesc")}
                  </p>
                  <Link
                    to="/support/get-started"
                    className="text-brand hover:text-brand-600 font-semibold hover:underline transition-colors"
                  >
                    {t("support.learnMore")}
                  </Link>
                </div>
              </Reveal>

              {/* Help Manual */}
              <Reveal delayMs={400}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group h-full flex flex-col">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                    <svg
                      className="w-8 h-8 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {t("support.helpManualTitle")}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                    {t("support.helpManualDesc")}
                  </p>
                  <Link
                    to="/support/help-manual"
                    className="text-brand hover:text-brand-600 font-semibold hover:underline transition-colors"
                  >
                    {t("support.viewHelpManual")}
                  </Link>
                </div>
              </Reveal>

              {/* Product Videos */}
              <Reveal delayMs={500}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group h-full flex flex-col">
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                    <svg
                      className="w-8 h-8 text-orange-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {t("support.productVideosTitle")}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                    {t("support.productVideosDesc")}
                  </p>
                  <Link
                    to="/support/product-videos"
                    className="text-brand hover:text-brand-600 font-semibold hover:underline transition-colors"
                  >
                    {t("support.learnMore")}
                  </Link>
                </div>
              </Reveal>

              {/* Technical Blog */}
              <Reveal delayMs={600}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group h-full flex flex-col">
                  <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-200 transition-colors">
                    <svg
                      className="w-8 h-8 text-teal-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {t("support.technicalBlogTitle")}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                    {t("support.technicalBlogDesc")}
                  </p>
                  <Link
                    to="/blog"
                    className="text-brand hover:text-brand-600 font-semibold hover:underline transition-colors"
                  >
                    {t("support.learnMore")}
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Assisted Support Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {t("support.assistedSupportTitle")}
                </h2>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  {t("support.assistedSupportSubtitle")}
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Write to Us */}
              <Reveal delayMs={100}>
                <div className="bg-slate-50 rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {t("support.writeToUsTitle")}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {t("support.writeToUsDesc")}
                  </p>
                  <button
                    onClick={() =>
                      (window.location.href = "mailto:support@dsecuretech.com")
                    }
                    className="bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto"
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
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {t("support.sendEmail")}
                  </button>
                </div>
              </Reveal>

              {/* Raise a Ticket */}
              <Reveal delayMs={200}>
                <div className="bg-slate-50 rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {t("support.raiseTicketTitle")}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {t("support.raiseTicketDesc")}
                  </p>
                  <button
                    onClick={() => setActiveTicketForm(true)}
                    className="bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto"
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
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1v-3a2 2 0 00-2-2H5z"
                      />
                    </svg>
                    {t("support.submitTicket")}
                  </button>
                </div>
              </Reveal>

              {/* Call Us */}
              <Reveal delayMs={300}>
                <div className="bg-slate-50 rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {t("support.callUsTitle")}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {t("support.callUsDesc")}
                  </p>
                  <button
                    onClick={() => (window.location.href = "tel:+911141525085")}
                    className="bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto"
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +91-844-775-0101
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Let's Get Started Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center text-white">
                <div className="flex items-center justify-center mb-8">
                  {/* <img
                    src="/path/to/support-person.png"
                    alt="Support Representative"
                    className="w-32 h-32 rounded-full mr-8"
                  /> */}
                  <div className="text-left">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                      {t("support.letsGetStarted")}
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                      {t("support.letsGetStartedDesc")}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => setShowLicenseModal(true)}
                        className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                      >
                        {t("support.requestFreeLicense")}
                      </button>
                      <button
                        onClick={() =>
                          (window.location.href = "tel:+91-844-775-0101")
                        }
                        className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                      >
                        {t("support.needHelp")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Company Stats */}
        {/* <section className="py-16 md:py-24 bg-slate-900 text-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  <span className="text-brand">D-Secure</span>
                  <sup className="text-brand text-lg"></sup> Is An Innovation
                  FROM D-Secure
                </h2>
                <p className="text-xl text-slate-300">
                  D-Secure Brings to The World Future-Ready Data Solutions
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-center">
              {[
                { number: "3M+", label: "Customers" },
                { number: "24/7", label: "Support Available" },
                { number: "100+", label: "R&D Engineers" },
                { number: "190+", label: "Countries" },
                { number: "8000+", label: "Partners" },
                { number: "100+", label: "Awards Received" },
              ].map((stat, index) => (
                <Reveal key={stat.label} delayMs={index * 100}>
                  <div className="group">
                    <div className="text-4xl md:text-5xl font-bold text-brand mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-300 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section> */}
      </div>

      {/* Support Ticket Modal */}
      <SupportTicketModal
        isOpen={activeTicketForm}
        onClose={() => setActiveTicketForm(false)}
        ticketForm={ticketForm}
        onInputChange={handleInputChange}
        onSubmit={handleTicketSubmit}
        priorityOptions={priorityOptions}
        categoryOptions={categoryOptions}
      />

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          customConfig={{
            endpoint: "https://formsubmit.co/support@dsecuretech.com",
            requiredFields: {
              fullName: "Full Name",
              email: "Email",
              company: "Company",
              usage: "Usage Type",
            },
            successMessage: t("support.licenseSuccess"),
          }}
          onClose={() => setShowLicenseModal(false)}
          title={t("support.requestFreeLicenseTitle")}
        />
      )}

      {/* Partnership Request Modal */}
      {showPartnershipModal && (
        <PartnershipForm
          customConfig={{
            endpoint: "https://formsubmit.co/support@dsecuretech.com",
            requiredFields: {
              fullName: "Full Name",
              businessEmail: "Business Email",
              companyName: "Company Name",
              partnerType: "Partnership Type",
            },
            successMessage: t("support.partnershipSuccess"),
          }}
          onClose={() => setShowPartnershipModal(false)}
          title={t("support.partnershipRequestTitle")}
        />
      )}

      {/* Toast Notification */}
      {toast && <Toast toast={toast} onClose={hideToast} />}
    </>
  );
};

export default SupportPage;
//               View Documentation →
//             </a>
//           </div>

//           <div className="bg-white light:bg-slate-800 rounded-lg p-6 xs:p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 xxl:p-18 shadow-lg hover:shadow-xl transition-shadow text-center">
//             <div className="w-12 xs:w-14 sm:w-16 md:w-18 lg:w-20 xl:w-22 xxl:w-24 h-12 xs:h-14 sm:h-16 md:h-18 lg:h-20 xl:h-22 xxl:h-24 bg-green-100 light:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
//               <svg className="w-6 xs:w-7 sm:w-8 md:w-9 lg:w-10 xl:w-11 xxl:w-12 h-6 xs:h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11 xxl:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//               </svg>
//             </div>
//             <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl xxl:text-6xl font-semibold text-slate-900 light:text-white mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
//               Live Chat
//             </h3>
//             <p className="text-slate-600 light:text-slate-300 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
//               Get instant help from our support team through live chat assistance.
//             </p>
//             <button className="text-green-600 hover:text-green-700 font-medium text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
//               Start Chat →
//             </button>
//           </div>

//           <div className="bg-white light:bg-slate-800 rounded-lg p-6 xs:p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 xxl:p-18 shadow-lg hover:shadow-xl transition-shadow text-center">
//             <div className="w-12 xs:w-14 sm:w-16 md:w-18 lg:w-20 xl:w-22 xxl:w-24 h-12 xs:h-14 sm:h-16 md:h-18 lg:h-20 xl:h-22 xxl:h-24 bg-purple-100 light:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
//               <svg className="w-6 xs:w-7 sm:w-8 md:w-9 lg:w-10 xl:w-11 xxl:w-12 h-6 xs:h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11 xxl:h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl xxl:text-6xl font-semibold text-slate-900 light:text-white mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
//               Email Support
//             </h3>
//             <p className="text-slate-600 light:text-slate-300 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
//               Submit detailed support requests and get expert assistance via email.
//             </p>
//             <a href="/contact" className="text-purple-600 hover:text-purple-700 font-medium text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
//               Send Email →
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Support Categories */}
//       <section className="mb-12 xs:mb-16 sm:mb-20 md:mb-24 lg:mb-28 xl:mb-32 xxl:mb-36">
//         <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl xxl:text-8xl font-bold text-slate-900 light:text-white mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20 text-center">
//           Support Categories
//         </h2>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-18 xxl:gap-20">
//           <div className="bg-slate-50 light:bg-slate-800 rounded-lg p-6 xs:p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 xxl:p-18">
//             <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl xxl:text-7xl font-semibold text-slate-900 light:text-white mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-10 xl:mb-11 xxl:mb-12">
//               Technical Support
//             </h3>
//             <ul className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8 xxl:space-y-9 text-slate-600 light:text-slate-300 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Software installation and configuration
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Troubleshooting and error resolution
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 System compatibility issues
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Performance optimization
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Integration assistance
//               </li>
//             </ul>
//           </div>

//           <div className="bg-slate-50 light:bg-slate-800 rounded-lg p-6 xs:p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 xxl:p-18">
//             <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl xxl:text-7xl font-semibold text-slate-900 light:text-white mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-10 xl:mb-11 xxl:mb-12">
//               Account & Billing
//             </h3>
//             <ul className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8 xxl:space-y-9 text-slate-600 light:text-slate-300 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Account management and settings
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Billing inquiries and invoice questions
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 License management and renewals
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Subscription changes and upgrades
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Payment processing support
//               </li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Contact Information */}
//       <section className="bg-blue-50 light:bg-blue-900/20 rounded-lg p-8 xs:p-10 sm:p-12 md:p-16 lg:p-20 xl:p-24 xxl:p-28 text-center">
//         <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl xxl:text-8xl font-bold text-slate-900 light:text-white mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 xxl:mb-18">
//           Need Direct Assistance?
//         </h2>
//         <p className="text-slate-600 light:text-slate-300 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl xxl:text-5xl mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20 max-w-3xl mx-auto">
//           Our dedicated support team is available during business hours to provide personalized assistance for all your data erasure needs.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16 xxl:gap-18 max-w-4xl mx-auto">
//           <div className="text-center">
//             <h3 className="font-semibold text-slate-900 light:text-white mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 xxl:mb-8 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl xxl:text-5xl">
//               Email Support
//             </h3>
//             <p className="text-blue-600 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
//               support@dsecuretech.com
//             </p>
//           </div>

//           <div className="text-center">
//             <h3 className="font-semibold text-slate-900 light:text-white mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 xxl:mb-8 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl xxl:text-5xl">
//               Phone Support
//             </h3>
//             <p className="text-blue-600 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
//               +91 11 4152 5085
//             </p>
//           </div>

//           <div className="text-center sm:col-span-2 lg:col-span-1">
//             <h3 className="font-semibold text-slate-900 light:text-white mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 xxl:mb-8 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl xxl:text-5xl">
//               Business Hours
//             </h3>
//             <p className="text-slate-600 light:text-slate-300 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
//               Mon-Fri: 9:00 AM - 6:00 PM IST
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   </div>
// </>
//   )
// }

// export default SupportPage;
