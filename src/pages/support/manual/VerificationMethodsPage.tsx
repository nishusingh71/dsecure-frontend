import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

// CDN Image URLs
const CDN_IMAGES = {
  hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  software:
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  physical:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  cryptographic:
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  sampling:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
};

interface ManualSection {
  id: number;
  title: string;
  description: string;
  icon: string;
  subsections: ManualSubsection[];
}

interface ManualSubsection {
  id: number;
  title: string;
  description: string;
  url: string;
  pageCount: number;
}

const VerificationMethodsPage: React.FC = memo(() => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const manualSections: ManualSection[] = [
    {
      id: 1,
      title: "Overview & Importance",
      description:
        "Understanding verification and its critical role in data security",
      icon: "🔍",
      subsections: [
        {
          id: 11,
          title: "Verification Overview",
          description: "Ensuring data erasure integrity and completeness",
          url: "/support/manual/verification-overview",
          pageCount: 2,
        },
        {
          id: 12,
          title: "Why Verification Matters",
          description: "Compliance, risk mitigation, and audit requirements",
          url: "/support/manual/verification-importance",
          pageCount: 2,
        },
        {
          id: 13,
          title: "Risk Management",
          description: "Eliminating uncertainty about residual data",
          url: "/support/manual/verification-risks",
          pageCount: 1,
        },
      ],
    },
    {
      id: 2,
      title: "Software Verification",
      description: "Digital confirmation of data overwriting and erasure",
      icon: "💻",
      subsections: [
        {
          id: 21,
          title: "Software Verification Process",
          description: "Scanning and confirming complete data overwriting",
          url: "/support/manual/software-verification",
          pageCount: 2,
        },
        {
          id: 22,
          title: "Read-Back Verification",
          description: "Comparing written patterns to ensure completeness",
          url: "/support/manual/readback-verification",
          pageCount: 2,
        },
        {
          id: 23,
          title: "Log Generation & Analysis",
          description: "Compliance logging and error detection",
          url: "/support/manual/verification-logs",
          pageCount: 1,
        },
        {
          id: 24,
          title: "Supported Media Types",
          description: "HDDs, SSDs, flash drives, and removable media",
          url: "/support/manual/software-supported-media",
          pageCount: 1,
        },
      ],
    },
    {
      id: 3,
      title: "Physical Inspection",
      description: "Visual and mechanical confirmation of physical destruction",
      icon: "👁️",
      subsections: [
        {
          id: 31,
          title: "Physical Inspection Standards",
          description: "Compliance with destruction size requirements",
          url: "/support/manual/physical-inspection",
          pageCount: 2,
        },
        {
          id: 32,
          title: "Fragment Size Verification",
          description: "Ensuring shredded pieces meet security standards",
          url: "/support/manual/fragment-verification",
          pageCount: 2,
        },
        {
          id: 33,
          title: "Visual Confirmation",
          description: "Manual inspection for complete destruction",
          url: "/support/manual/visual-confirmation",
          pageCount: 1,
        },
        {
          id: 34,
          title: "Destruction Quality Control",
          description: "Quality assurance for physical destruction processes",
          url: "/support/manual/destruction-quality",
          pageCount: 1,
        },
      ],
    },
    {
      id: 4,
      title: "Cryptographic Verification",
      description: "Confirming key destruction and encryption integrity",
      icon: "🔐",
      subsections: [
        {
          id: 41,
          title: "Cryptographic Verification Process",
          description: "Validating encryption key deletion and access control",
          url: "/support/manual/crypto-verification",
          pageCount: 2,
        },
        {
          id: 42,
          title: "Key Destruction Confirmation",
          description: "Ensuring encryption keys are permanently deleted",
          url: "/support/manual/key-destruction-verify",
          pageCount: 2,
        },
        {
          id: 43,
          title: "Access Control Verification",
          description: "Confirming data is cryptographically inaccessible",
          url: "/support/manual/access-verification",
          pageCount: 1,
        },
        {
          id: 44,
          title: "Supported Encryption Systems",
          description: "Self-encrypting drives, cloud storage, encrypted media",
          url: "/support/manual/supported-encryption",
          pageCount: 1,
        },
      ],
    },
    {
      id: 5,
      title: "Sampling & Audit Methods",
      description: "Statistical verification for large-scale operations",
      icon: "📊",
      subsections: [
        {
          id: 51,
          title: "Sampling Methodology",
          description: "Random sampling techniques and statistical confidence",
          url: "/support/manual/sampling-methodology",
          pageCount: 2,
        },
        {
          id: 52,
          title: "Statistical Confidence Levels",
          description: "Calculating verification reliability",
          url: "/support/manual/statistical-confidence",
          pageCount: 2,
        },
        {
          id: 53,
          title: "Audit Trail Generation",
          description: "Creating verifiable audit logs and reports",
          url: "/support/manual/audit-trails",
          pageCount: 2,
        },
      ],
    },
    {
      id: 6,
      title: "Verification Standards",
      description: "Compliance and regulatory requirements for verification",
      icon: "📜",
      subsections: [
        {
          id: 61,
          title: "NIST SP 800-88 Guidelines",
          description:
            "Verification requirements for clear, purge, and destroy",
          url: "/support/manual/nist-guidelines",
          pageCount: 2,
        },
        {
          id: 62,
          title: "DoD 5220.22-M Standards",
          description: "Defense-level verification procedures",
          url: "/support/manual/dod-standards",
          pageCount: 2,
        },
        {
          id: 63,
          title: "GDPR & Data Protection",
          description: "EU data protection verification requirements",
          url: "/support/manual/gdpr-verification",
          pageCount: 1,
        },
      ],
    },
    {
      id: 7,
      title: "Tools & Implementation",
      description: "Practical tools and best practices for verification",
      icon: "🛠️",
      subsections: [
        {
          id: 71,
          title: "Verification Tools Overview",
          description: "Software and hardware tools for verification",
          url: "/support/manual/verification-tools",
          pageCount: 2,
        },
        {
          id: 72,
          title: "Implementation Best Practices",
          description: "Step-by-step verification workflows",
          url: "/support/manual/implementation-practices",
          pageCount: 2,
        },
        {
          id: 73,
          title: "Common Challenges & Solutions",
          description: "Addressing verification failures and errors",
          url: "/support/manual/verification-challenges",
          pageCount: 1,
        },
      ],
    },
    {
      id: 8,
      title: "Industry Applications",
      description: "Sector-specific verification requirements",
      icon: "🏭",
      subsections: [
        {
          id: 81,
          title: "Financial Services",
          description: "PCI-DSS verification requirements",
          url: "/support/manual/financial-verification",
          pageCount: 2,
        },
        {
          id: 82,
          title: "Healthcare",
          description: "HIPAA-compliant verification processes",
          url: "/support/manual/healthcare-verification",
          pageCount: 2,
        },
        {
          id: 83,
          title: "Government & Defense",
          description: "Classified data verification standards",
          url: "/support/manual/government-verification",
          pageCount: 2,
        },
      ],
    },
  ];

  const filteredSections = manualSections.filter((section) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(query) ||
      section.description.toLowerCase().includes(query) ||
      section.subsections.some(
        (sub) =>
          sub.title.toLowerCase().includes(query) ||
          sub.description.toLowerCase().includes(query)
      )
    );
  });

  const toggleSection = (id: number) => {
    setActiveSection(activeSection === id ? null : id);
  };

  const getTotalPages = (section: ManualSection) => {
    return section.subsections.reduce((total, sub) => total + sub.pageCount, 0);
  };

  return (
    <>
      <Helmet>
        <link
          rel="canonical"
          href="https://dsecuretech.com/support/verification-methods"
        />
        <title>
          Verification Methods | Data Erasure Confirmation & Assurance
        </title>
        <meta
          name="description"
          content="Complete guide to data erasure verification methods: software, physical, cryptographic, and sampling techniques. NIST-compliant assurance."
        />
        <meta
          name="keywords"
          content="data erasure verification, software verification, physical inspection, cryptographic verification, NIST verification"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-teal-50 to-cyan-50 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center">
                <div className="mb-6 md:mb-8">
                  <Link
                    to="/support"
                    className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium mb-3 md:mb-4 transition-colors text-sm sm:text-base"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to Support
                  </Link>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 leading-tight">
                    Verification{" "}
                    <span className="text-teal-600 block sm:inline">
                      Methods
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                    Comprehensive guide to confirming data erasure success:
                    Software, physical, cryptographic, and sampling methods for
                    total assurance.
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search verification methods..."
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-12 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-sm sm:text-base"
                      />
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2"
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
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-6xl mx-auto">
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
                  <img
                    src={CDN_IMAGES.hero}
                    alt="Data Verification and Assurance Dashboard"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    style={{ aspectRatio: "16/9" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 md:p-8 text-white">
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                        Verified Data Security
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 max-w-2xl">
                        Confirm complete data erasure with multiple verification
                        methods — ensuring compliance and peace of mind.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">✅</div>
                  <div className="text-xl sm:text-2xl font-bold text-teal-600 mb-2">
                    Assured
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    No residual data risks
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">📜</div>
                  <div className="text-xl sm:text-2xl font-bold text-teal-600 mb-2">
                    Compliant
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    NIST & DoD standards
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">🔍</div>
                  <div className="text-xl sm:text-2xl font-bold text-teal-600 mb-2">
                    Verifiable
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Audit-ready reports
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Verification Methods Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Verification Methods
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Choose the right verification technique for your security
                  needs
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "Software Verification",
                  description: "Digital scanning and pattern confirmation",
                  image: CDN_IMAGES.software,
                  alt: "Software verification interface",
                },
                {
                  title: "Physical Inspection",
                  description: "Visual confirmation of destruction",
                  image: CDN_IMAGES.physical,
                  alt: "Physical media inspection process",
                },
                {
                  title: "Cryptographic Verification",
                  description: "Key destruction and access testing",
                  image: CDN_IMAGES.cryptographic,
                  alt: "Cryptographic verification tools",
                },
                {
                  title: "Sampling Methods",
                  description: "Statistical assurance for bulk operations",
                  image: CDN_IMAGES.sampling,
                  alt: "Sampling and audit dashboard",
                },
              ].map((method, index) => (
                <Reveal key={method.title} delayMs={index * 100}>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-base sm:text-lg">
                      {method.title}
                    </h3>
                    <div className="relative h-32 sm:h-40 md:h-48">
                      <img
                        src={method.image}
                        alt={method.alt}
                        className="w-full h-full object-cover rounded-lg border border-slate-200"
                        loading="lazy"
                        decoding="async"
                        style={{ aspectRatio: "4/3" }}
                      />
                    </div>
                    <p className="text-slate-600 mt-3 sm:mt-4 text-sm sm:text-base">
                      {method.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Manual Sections */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {filteredSections.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-slate-400"
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
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                  No Sections Found
                </h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  Try adjusting your search terms.
                </p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {filteredSections.map((section, index) => (
                  <Reveal key={section.id} delayMs={index * 50}>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="text-lg sm:text-2xl">
                            {section.icon}
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                              {section.title}
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm">
                              {section.description}
                            </p>
                            <div className="flex items-center gap-2 sm:gap-4 mt-2 text-xs text-slate-500">
                              <span>{section.subsections.length} topics</span>
                              <span>{getTotalPages(section)} pages</span>
                            </div>
                          </div>
                        </div>
                        <svg
                          className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 transform transition-transform ${
                            activeSection === section.id ? "rotate-180" : ""
                          }`}
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
                      </button>

                      {activeSection === section.id && (
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                          <div className="border-t border-slate-200 pt-4">
                            <div className="grid gap-3 sm:gap-4">
                              {section.subsections.map((subsection) => (
                                <Link
                                  key={subsection.id}
                                  to={subsection.url}
                                  className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                                >
                                  <div className="flex-1">
                                    <h4 className="font-medium text-slate-900 group-hover:text-teal-600 transition-colors mb-1 text-sm sm:text-base">
                                      {subsection.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                      {subsection.description}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                                    <span>{subsection.pageCount} pages</span>
                                    <svg
                                      className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform"
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
                        </div>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Industries We Serve
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {[
                {
                  industry: "Financial Services",
                  description: "PCI-DSS and financial data compliance",
                  icon: "💰",
                  color: "bg-green-500",
                },
                {
                  industry: "Healthcare & Pharma",
                  description: "HIPAA and patient data protection",
                  icon: "🏥",
                  color: "bg-blue-500",
                },
                {
                  industry: "Government & Defense",
                  description: "Classified data and national security",
                  icon: "🏛️",
                  color: "bg-purple-500",
                },
                {
                  industry: "ITAD & Data Centers",
                  description: "Large-scale verification operations",
                  icon: "🔧",
                  color: "bg-orange-500",
                },
              ].map((industry, index) => (
                <Reveal key={industry.industry} delayMs={index * 100}>
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-6 text-center shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 ${industry.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                    >
                      <span className="text-xl sm:text-2xl text-white">
                        {industry.icon}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                      {industry.industry}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      {industry.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Quick Access
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Essential verification resources
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "Software Verification",
                  description: "Digital confirmation methods",
                  icon: "💻",
                  url: "/support/manual/software-verification",
                  color: "bg-blue-500",
                },
                {
                  title: "Compliance Standards",
                  description: "NIST, DoD, GDPR requirements",
                  icon: "📋",
                  url: "/support/manual/verification-standards",
                  color: "bg-teal-500",
                },
                {
                  title: "Audit Preparation",
                  description: "Audit trail generation",
                  icon: "📊",
                  url: "/support/manual/audit-preparation",
                  color: "bg-green-500",
                },
                {
                  title: "Industry Guides",
                  description: "Sector-specific verification",
                  icon: "🏭",
                  url: "/support/manual/industry-applications",
                  color: "bg-purple-500",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delayMs={index * 100}>
                  <Link
                    to={item.url}
                    className="bg-white rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 group h-full flex flex-col"
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <span className="text-xl sm:text-2xl text-white">
                        {item.icon}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm flex-grow">
                      {item.description}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-teal-500 to-cyan-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                  Ensure Total Data Security
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
                  Protect your organization by pairing destruction or erasure
                  with industry-standard verification methods.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="bg-white text-teal-600 hover:bg-teal-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg"
                  >
                    Contact DSecure for Verification
                  </Link>
                  <Link
                    to="/services/verification"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg"
                  >
                    Learn About Verification Services
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default VerificationMethodsPage;
