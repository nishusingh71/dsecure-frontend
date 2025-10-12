import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

// CDN Image URLs
const CDN_IMAGES = {
  hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  process:
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  comparison:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  compliance:
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  enterprise:
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

const CryptographicErasurePage: React.FC = memo(() => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const manualSections: ManualSection[] = [
    {
      id: 1,
      title: "Introduction & Importance",
      description:
        "Understanding cryptographic erasure and modern data security",
      icon: "🔐",
      subsections: [
        {
          id: 11,
          title: "Why Cryptographic Erasure Matters",
          description:
            "Modern data breach risks and limitations of traditional methods",
          url: "/support/manual/crypto-importance",
          pageCount: 2,
        },
        {
          id: 12,
          title: "How Cryptographic Erasure Works",
          description: "Key destruction mechanism and technical process",
          url: "/support/manual/crypto-process",
          pageCount: 2,
        },
        {
          id: 13,
          title: "Benefits & Advantages",
          description: "Speed, security, and sustainability benefits",
          url: "/support/manual/crypto-benefits",
          pageCount: 1,
        },
      ],
    },
    {
      id: 2,
      title: "Technical Implementation",
      description: "Supported devices and step-by-step erasure process",
      icon: "⚙️",
      subsections: [
        {
          id: 21,
          title: "Supported Devices & Environments",
          description: "NVMe, SATA, SAS SSDs and self-encrypting drives",
          url: "/support/manual/supported-devices",
          pageCount: 2,
        },
        {
          id: 22,
          title: "Step-by-Step Erasure Process",
          description: "Complete workflow from boot to certificate generation",
          url: "/support/manual/erasure-process",
          pageCount: 3,
        },
        {
          id: 23,
          title: "BitRaser Integration",
          description: "DSecure tools and drive eraser USB workflow",
          url: "/support/manual/bitraser-integration",
          pageCount: 2,
        },
      ],
    },
    {
      id: 3,
      title: "Comparison & Analysis",
      description: "Cryptographic vs traditional overwriting methods",
      icon: "📊",
      subsections: [
        {
          id: 31,
          title: "Feature Comparison Table",
          description: "Speed, compatibility, and compliance comparison",
          url: "/support/manual/comparison-table",
          pageCount: 2,
        },
        {
          id: 32,
          title: "Performance Analysis",
          description: "Time savings and efficiency metrics",
          url: "/support/manual/performance-analysis",
          pageCount: 1,
        },
        {
          id: 33,
          title: "Limitations & Considerations",
          description: "Encryption requirements and firmware compatibility",
          url: "/support/manual/limitations",
          pageCount: 2,
        },
      ],
    },
    {
      id: 4,
      title: "Compliance & Certification",
      description: "Regulatory standards and audit requirements",
      icon: "✅",
      subsections: [
        {
          id: 41,
          title: "Compliance Standards",
          description: "NIST, DoD, ISO, GDPR, and PDP Bill alignment",
          url: "/support/manual/compliance-standards",
          pageCount: 2,
        },
        {
          id: 42,
          title: "Certificate Generation",
          description: "Tamper-proof erasure certificates and audit trails",
          url: "/support/manual/certificate-generation",
          pageCount: 2,
        },
        {
          id: 43,
          title: "Audit & Verification",
          description: "Forensic-grade verification and compliance proof",
          url: "/support/manual/audit-verification",
          pageCount: 1,
        },
      ],
    },
    {
      id: 5,
      title: "Enterprise Applications",
      description: "Business benefits and industry use cases",
      icon: "🏢",
      subsections: [
        {
          id: 51,
          title: "Enterprise Benefits",
          description: "Cost savings, efficiency, and compliance advantages",
          url: "/support/manual/enterprise-benefits",
          pageCount: 2,
        },
        {
          id: 52,
          title: "Industry Use Cases",
          description: "Government, banking, healthcare, and ITAD applications",
          url: "/support/manual/industry-use-cases",
          pageCount: 2,
        },
        {
          id: 53,
          title: "DSecure Cloud Console",
          description: "Centralized management and reporting dashboard",
          url: "/support/manual/cloud-console",
          pageCount: 2,
        },
      ],
    },
    {
      id: 6,
      title: "Best Practices & Future",
      description: "Implementation guidelines and emerging trends",
      icon: "🚀",
      subsections: [
        {
          id: 61,
          title: "Best Practices for SSD Erasure",
          description: "Encryption setup, validation, and maintenance",
          url: "/support/manual/best-practices",
          pageCount: 2,
        },
        {
          id: 62,
          title: "Future of Secure Erasure",
          description:
            "AI verification, blockchain logs, and energy efficiency",
          url: "/support/manual/future-trends",
          pageCount: 2,
        },
        {
          id: 63,
          title: "Environmental Impact",
          description: "Sustainability and e-waste reduction benefits",
          url: "/support/manual/environmental-impact",
          pageCount: 1,
        },
        {
          id: 64,
          title: "Common Questions & Answers",
          description: "FAQs about cryptographic erasure process",
          url: "/support/manual/faqs",
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
          href="https://dsecuretech.com/support/cryptographic-erasure"
        />
        <title>Cryptographic Erasure | Secure, Instant Data Sanitization</title>
        <meta
          name="description"
          content="Cryptographic Erasure: Instant, irreversible data sanitization through key destruction. NIST 800-88 compliant, SSD-optimized secure erasure technology."
        />
        <meta
          name="keywords"
          content="cryptographic erasure, crypto erase, key destruction, secure data sanitization, SSD erasure, NIST 800-88"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center">
                <div className="mb-6 md:mb-8">
                  <Link
                    to="/support"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-3 md:mb-4 transition-colors text-sm sm:text-base"
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
                    Cryptographic{" "}
                    <span className="text-indigo-600 block sm:inline">
                      Erasure
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                    Secure. Instant. Irreversible. Next-generation data
                    sanitization through encryption key destruction.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Link
                      to="/services/cryptographic-erasure"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors inline-flex items-center justify-center text-base sm:text-lg"
                    >
                      <span className="mr-2">🔒</span>
                      Start Secure Erasure
                    </Link>
                    <Link
                      to="/products/bitraser-drive-eraser"
                      className="bg-white border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors inline-flex items-center justify-center text-base sm:text-lg"
                    >
                      <span className="mr-2">📘</span>
                      Learn About BitRaser Integration
                    </Link>
                  </div>

                  {/* Search Bar */}
                  <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search cryptographic erasure..."
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-12 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
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
                    alt="Cryptographic Erasure - Secure Data Sanitization Technology"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    style={{ aspectRatio: "16/9" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 md:p-8 text-white">
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                        Instant Data Sanitization
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 max-w-2xl">
                        Render data unreadable in seconds by destroying
                        encryption keys — ensuring compliance, privacy, and
                        peace of mind.
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
                  <div className="text-3xl sm:text-4xl mb-4">⚡</div>
                  <div className="text-xl sm:text-2xl font-bold text-indigo-600 mb-2">
                    Instant
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Seconds vs hours for traditional methods
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">🔒</div>
                  <div className="text-xl sm:text-2xl font-bold text-indigo-600 mb-2">
                    Secure
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    NIST 800-88 Purge level compliance
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">🌱</div>
                  <div className="text-xl sm:text-2xl font-bold text-indigo-600 mb-2">
                    Sustainable
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    No drive wear, enables reuse
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Process Overview */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  How Cryptographic Erasure Works
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Instead of overwriting data, destroy the encryption keys —
                  making all data permanently inaccessible
                </p>
              </div>
            </Reveal>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl mx-auto mb-4">
                      1
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">
                      Encrypted Drive
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      Data is encrypted with AES-256 bit encryption
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl mx-auto mb-4">
                      2
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">
                      Key Destruction
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      Encryption keys are permanently deleted
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl mx-auto mb-4">
                      3
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">
                      Data Inaccessible
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      All data becomes cryptographically unreadable
                    </p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex items-start">
                    <div className="text-xl sm:text-2xl mr-4">🔑</div>
                    <div>
                      <h4 className="font-semibold text-indigo-900 mb-2 text-sm sm:text-base">
                        Analogy
                      </h4>
                      <p className="text-indigo-800 text-xs sm:text-sm">
                        Imagine locking your vault and melting the only key —
                        the vault (drive) remains, but its contents are
                        inaccessible forever.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Cryptographic vs Traditional Overwriting
                </h2>
              </div>
            </Reveal>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-3 bg-slate-900 text-white">
                  <div className="p-4 sm:p-6 font-semibold">Feature</div>
                  <div className="p-4 sm:p-6 font-semibold bg-red-600/20">
                    Traditional Overwriting
                  </div>
                  <div className="p-4 sm:p-6 font-semibold bg-green-600/20">
                    Cryptographic Erasure
                  </div>
                </div>

                {[
                  {
                    feature: "Speed",
                    traditional: "Slow, hours for large drives",
                    crypto: "Instant (seconds)",
                  },
                  {
                    feature: "SSD Compatibility",
                    traditional: "Ineffective due to wear-leveling",
                    crypto: "Fully supported",
                  },
                  {
                    feature: "Drive Health",
                    traditional: "Degrades over multiple passes",
                    crypto: "No wear impact",
                  },
                  {
                    feature: "Compliance Proof",
                    traditional: "Limited",
                    crypto: "Verifiable certificate",
                  },
                  {
                    feature: "Encryption Requirement",
                    traditional: "Optional",
                    crypto: "Required (AES-based)",
                  },
                ].map((row, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-3 border-b border-slate-200 last:border-b-0"
                  >
                    <div className="p-4 sm:p-6 font-medium bg-slate-50 text-sm sm:text-base">
                      {row.feature}
                    </div>
                    <div className="p-4 sm:p-6 text-slate-600 text-sm sm:text-base">
                      {row.traditional}
                    </div>
                    <div className="p-4 sm:p-6 text-green-600 font-medium text-sm sm:text-base">
                      {row.crypto}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Manual Sections */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
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
                            <div className="flex items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-slate-500">
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
                                    <h4 className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors mb-1 text-sm sm:text-base">
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

        {/* Compliance Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Compliance & Certifications
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Meets global regulatory standards for data sanitization
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {[
                {
                  standard: "NIST SP 800-88",
                  description: "Purge level compliance",
                },
                { standard: "DoD 5220.22-M", description: "Data sanitization" },
                {
                  standard: "ISO/IEC 27040",
                  description: "Information security",
                },
                {
                  standard: "GDPR & PDP Bill",
                  description: "Right-to-erasure",
                },
              ].map((item, index) => (
                <Reveal key={item.standard} delayMs={index * 100}>
                  <div className="bg-slate-50 rounded-lg p-4 sm:p-6 text-center border border-slate-200">
                    <div className="text-lg sm:text-xl font-bold text-indigo-600 mb-2">
                      {item.standard}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600">
                      {item.description}
                    </div>
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
                  Essential cryptographic erasure resources
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "Start Erasure",
                  description: "Begin secure data sanitization",
                  icon: "🔒",
                  url: "/services/cryptographic-erasure",
                  color: "bg-indigo-500",
                },
                {
                  title: "Compliance Guide",
                  description: "View regulatory standards",
                  icon: "📜",
                  url: "/resources/compliance",
                  color: "bg-green-500",
                },
                {
                  title: "BitRaser Tools",
                  description: "Integration documentation",
                  icon: "💾",
                  url: "/products/bitraser-drive-eraser",
                  color: "bg-blue-500",
                },
                {
                  title: "Enterprise Guide",
                  description: "Business implementation",
                  icon: "🏢",
                  url: "/support/manual/enterprise-benefits",
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
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
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
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                  Ready to Secure Your SSDs?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                  Take full control of your data lifecycle. Cryptographic
                  Erasure offers the perfect balance of speed, compliance, and
                  sustainability.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/services/cryptographic-erasure"
                    className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg inline-flex items-center justify-center"
                  >
                    <span className="mr-2">🔐</span>
                    Start Cryptographic Erasure
                  </Link>
                  <Link
                    to="/resources/compliance"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg inline-flex items-center justify-center"
                  >
                    <span className="mr-2">📜</span>
                    View Compliance Standards
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Common Questions
                </h2>
              </div>
            </Reveal>

            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
              {[
                {
                  question: "Can CryptoErase be undone?",
                  answer:
                    "No. Once encryption keys are deleted, data is unrecoverable by any means.",
                },
                {
                  question: "Does it work on HDDs?",
                  answer:
                    "Yes, if the drive supports hardware encryption (SED type). Otherwise, use firmware sanitize.",
                },
                {
                  question: "How long does it take?",
                  answer:
                    "Usually under 15 minutes including verification and report generation.",
                },
              ].map((faq, index) => (
                <Reveal key={index} delayMs={index * 100}>
                  <div className="bg-slate-50 rounded-lg p-4 sm:p-6 border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-2 text-base sm:text-lg">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
});

export default CryptographicErasurePage;
