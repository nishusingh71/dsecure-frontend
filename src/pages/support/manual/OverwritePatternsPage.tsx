import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import OptimizedImage from '@/components/OptimizedImage';
import { getFallbackImage } from '@/utils/imagePlaceholders';

// CDN Image URLs
const CDN_IMAGES = {
  hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  concepts:
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  standards:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  implementation:
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  ssd: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
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

const OverwritePatternsPage: React.FC = memo(() => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const manualSections: ManualSection[] = [
    {
      id: 1,
      title: "Introduction & Fundamentals",
      description: "Understanding data sanitization and overwrite basics",
      icon: "🔐",
      subsections: [
        {
          id: 11,
          title: "Introduction to Overwrite & Data Sanitization",
          description:
            "Learn why simple deletion is insufficient for data security",
          url: "/support/manual/overwrite-introduction",
          pageCount: 2,
        },
        {
          id: 12,
          title: "Why Why Overwriting Matters: Risks & Threats",
          description:
            "Understand the risks of residual data and forensic recovery",
          url: "/support/manual/overwrite-risks",
          pageCount: 2,
        },
        {
          id: 13,
          title: "Basic Concepts: Clear, Purge, Destroy",
          description: "NIST definitions and different sanitization levels",
          url: "/support/manual/sanitization-concepts",
          pageCount: 2,
        },
      ],
    },
    {
      id: 2,
      title: "Historical Standards",
      description: "Traditional DoD standards and their evolution",
      icon: "📜",
      subsections: [
        {
          id: 21,
          title: "DoD 5220.22-M Standards Overview",
          description:
            "Historical context and modern relevance of DoD standards",
          url: "/support/manual/dod-standards",
          pageCount: 2,
        },
        {
          id: 22,
          title: "DoD 3-Pass Algorithm",
          description: "Binary zeros, ones, and random pattern sequence",
          url: "/support/manual/dod-3pass",
          pageCount: 2,
        },
        {
          id: 23,
          title: "DoD 7-Pass Algorithm (ECE Variant)",
          description: "Extended 7-pass sequence with additional randomization",
          url: "/support/manual/dod-7pass",
          pageCount: 2,
        },
      ],
    },
    {
      id: 3,
      title: "Modern Standards & Guidelines",
      description: "NIST SP 800-88 and contemporary approaches",
      icon: "🔄",
      subsections: [
        {
          id: 31,
          title: "NIST SP 800-88: Clear, Purge & Destroy",
          description: "Modern guidelines for media sanitization",
          url: "/support/manual/nist-800-88",
          pageCount: 2,
        },
        {
          id: 32,
          title: "NIST Guidelines for Modern Storage",
          description: "HDD, SSD, and flash memory considerations",
          url: "/support/manual/nist-modern-storage",
          pageCount: 2,
        },
        {
          id: 33,
          title: "Comparing DoD vs NIST Approaches",
          description: "Strengths and weaknesses of different standards",
          url: "/support/manual/standards-comparison",
          pageCount: 2,
        },
      ],
    },
    {
      id: 4,
      title: "Custom Algorithms & Patterns",
      description: "Designing tailored overwrite solutions",
      icon: "⚙️",
      subsections: [
        {
          id: 41,
          title: "Custom Overwrite Algorithm Design",
          description: "Variable pass counts and mixed pattern strategies",
          url: "/support/manual/custom-algorithms",
          pageCount: 3,
        },
        {
          id: 42,
          title: "Pattern Selection & Randomization",
          description: "Choosing effective patterns and random seeds",
          url: "/support/manual/pattern-selection",
          pageCount: 2,
        },
        {
          id: 43,
          title: "Implementation Considerations",
          description: "Sector-level writes, bad blocks, and hidden areas",
          url: "/support/manual/implementation-considerations",
          pageCount: 2,
        },
      ],
    },
    {
      id: 5,
      title: "Storage-Specific Challenges",
      description: "HDD, SSD, and flash memory considerations",
      icon: "💾",
      subsections: [
        {
          id: 51,
          title: "SSD & Flash Memory Challenges",
          description: "Wear-leveling, remapped blocks, and overprovisioning",
          url: "/support/manual/ssd-challenges",
          pageCount: 2,
        },
        {
          id: 52,
          title: "Hardware-Level Sanitization",
          description: "ATA Secure Erase, TRIM, and cryptographic erase",
          url: "/support/manual/hardware-sanitization",
          pageCount: 2,
        },
        {
          id: 53,
          title: "Performance & Trade-offs",
          description: "Security margin vs performance considerations",
          url: "/support/manual/performance-tradeoffs",
          pageCount: 2,
        },
      ],
    },
    {
      id: 6,
      title: "Verification & Compliance",
      description: "Ensuring effectiveness and meeting regulations",
      icon: "✅",
      subsections: [
        {
          id: 61,
          title: "Verification Techniques",
          description: "Read-back comparison, sampling, and error handling",
          url: "/support/manual/verification-techniques",
          pageCount: 2,
        },
        {
          id: 62,
          title: "Security Assurance & Regulation",
          description: "Audit trails, regulatory documents, and third-party validation",
          url: "/support/manual/security-assurance",
          pageCount: 2,
        },
        {
          id: 63,
          title: "Use Cases & Scenario Examples",
          description: "Enterprise, defense, and data center applications",
          url: "/support/manual/use-cases",
          pageCount: 2,
        },
        {
          id: 64,
          title: "Future Trends & Emerging Standards",
          description: "IEEE 2883, cryptographic erase, and automation",
          url: "/support/manual/future-trends",
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
          href="https://dsecuretech.com/support/overwrite-patterns"
        />
        <title>
          Overwrite Patterns & Data Sanitization | D-Secure Technical Guide
        </title>
        <meta
          name="description"
          content="Comprehensive guide to overwrite patterns, data sanitization algorithms, DoD and NIST standards, and secure data erasure techniques."
        />
        <meta
          name="keywords"
          content="overwrite patterns, data sanitization, DoD 5220.22-M, NIST SP 800-88, secure erasure, data destruction"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center">
                <div className="mb-6 md:mb-8">
                  <Link
                    to="/support"
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-3 md:mb-4 transition-colors text-sm sm:text-base"
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
                    Overwrite Patterns{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block sm:inline">
                      & Data Sanitization
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                    Comprehensive guide to secure data erasure algorithms, DoD
                    and NIST standards, and modern sanitization techniques
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search overwrite patterns..."
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-12 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-sm sm:text-base"
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
                  <OptimizedImage
                    src={CDN_IMAGES.hero}
                    alt="Data Sanitization and Overwrite Patterns"
                    fallback={getFallbackImage('security')}
                    className="w-full h-full object-cover"
                    width={1600}
                    height={900}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 md:p-8 text-white">
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                        Secure Data Erasure
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 max-w-2xl">
                        Implementing DoD, NIST, and custom overwrite patterns
                        for complete data sanitization
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Key Concepts */}
        <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">🔢</div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-600 mb-2">
                    Multi-Pass
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Zeros, ones, random patterns
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">📊</div>
                  <div className="text-xl sm:text-2xl font-bold text-teal-600 mb-2">
                    Standards
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    DoD, NIST, IEEE compliant
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">⚡</div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-600 mb-2">
                    Efficient
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Modern SSD optimization
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Overwrite Patterns Overview */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Overwrite Patterns Overview
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Key algorithms and standards for secure data sanitization
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "DoD 5220.22-M",
                  description: "Traditional 3-pass and 7-pass algorithms",
                  passes: "3-7",
                  icon: "📜",
                },
                {
                  title: "NIST SP 800-88",
                  description: "Modern clear, purge, and destroy guidelines",
                  passes: "1+",
                  icon: "🔄",
                },
                {
                  title: "Custom Patterns",
                  description: "Tailored multi-pass with randomization",
                  passes: "Variable",
                  icon: "⚙️",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delayMs={index * 100}>
                  <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-slate-200 h-full flex flex-col">
                    <div className="text-4xl sm:text-5xl mb-4">{item.icon}</div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-base sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm sm:text-base flex-grow">
                      {item.description}
                    </p>
                    <div className="bg-emerald-50 text-emerald-600 font-medium px-4 py-2 rounded-lg text-sm">
                      {item.passes} Passes
                    </div>
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
                          className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 transform transition-transform ${activeSection === section.id ? "rotate-180" : ""
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
                                    <h4 className="font-medium text-slate-900 group-hover:text-emerald-600 transition-colors mb-1 text-sm sm:text-base">
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

        {/* Comparison Table */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Algorithm Comparison
                </h2>
              </div>
            </Reveal>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-4 bg-slate-900 text-white">
                  <div className="p-4 sm:p-6 font-semibold">Algorithm</div>
                  <div className="p-4 sm:p-6 font-semibold bg-blue-600/20">
                    Passes
                  </div>
                  <div className="p-4 sm:p-6 font-semibold bg-green-600/20">
                    Security Level
                  </div>
                  <div className="p-4 sm:p-6 font-semibold bg-orange-600/20">
                    Best For
                  </div>
                </div>

                {[
                  {
                    algorithm: "DoD 3-Pass",
                    passes: "3",
                    security: "Medium",
                    bestFor: "HDDs, Basic Security",
                  },
                  {
                    algorithm: "DoD 7-Pass",
                    passes: "7",
                    security: "High",
                    bestFor: "Sensitive Data HDDs",
                  },
                  {
                    algorithm: "NIST Purge",
                    passes: "1+",
                    security: "Modern High",
                    bestFor: "SSDs, Enterprise",
                  },
                  {
                    algorithm: "Custom Multi-Pass",
                    passes: "Variable",
                    security: "Customizable",
                    bestFor: "Specific Needs",
                  },
                ].map((row, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-4 border-b border-slate-200 last:border-b-0"
                  >
                    <div className="p-4 sm:p-6 font-medium bg-slate-50 text-sm sm:text-base">
                      {row.algorithm}
                    </div>
                    <div className="p-4 sm:p-6 text-slate-600 text-sm sm:text-base">
                      {row.passes}
                    </div>
                    <div className="p-4 sm:p-6 text-green-600 font-medium text-sm sm:text-base">
                      {row.security}
                    </div>
                    <div className="p-4 sm:p-6 text-orange-600 font-medium text-sm sm:text-base">
                      {row.bestFor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SSD Considerations */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  SSD Considerations
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Special challenges for solid-state drives
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              <Reveal delayMs={100}>
                <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-lg sm:text-xl">
                    Recommended Methods
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 text-slate-700">
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0"
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
                      <span className="text-sm sm:text-base">
                        ATA Secure Erase command
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0"
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
                      <span className="text-sm sm:text-base">
                        Cryptographic key destruction
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0"
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
                      <span className="text-sm sm:text-base">
                        TRIM-enabled single-pass overwrite
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0"
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
                      <span className="text-sm sm:text-base">
                        Firmware-level sanitization
                      </span>
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-lg sm:text-xl">
                    Challenges
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 text-slate-700">
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <span className="text-sm sm:text-base">
                        Wear-leveling hides data blocks
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <span className="text-sm sm:text-base">
                        Overprovisioning areas inaccessible
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <span className="text-sm sm:text-base">
                        TRIM may not affect all cells
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <span className="text-sm sm:text-base">
                        Remapped blocks may not be user-addressable
                      </span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Quick Access
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto px-4">
                  Jump to essential overwrite pattern sections
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "DoD 3-Pass",
                  description: "Classic 3-pass algorithm",
                  icon: "🔢",
                  url: "/support/manual/dod-3pass",
                  color: "bg-blue-500",
                },
                {
                  title: "NIST Guidelines",
                  description: "Modern SP 800-88 standards",
                  icon: "📋",
                  url: "/support/manual/nist-800-88",
                  color: "bg-green-500",
                },
                {
                  title: "SSD Challenges",
                  description: "Flash memory considerations",
                  icon: "💾",
                  url: "/support/manual/ssd-challenges",
                  color: "bg-purple-500",
                },
                {
                  title: "Custom Algorithms",
                  description: "Tailored solutions",
                  icon: "⚙️",
                  url: "/support/manual/custom-algorithms",
                  color: "bg-orange-500",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delayMs={index * 100}>
                  <Link
                    to={item.url}
                    className="bg-slate-50 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 group h-full flex flex-col"
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <span className="text-xl sm:text-2xl text-white">
                        {item.icon}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
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

        {/* Compliance Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
                  Compliance & Regulation
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      DoD
                    </div>
                    <div className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                      5220.22-M
                    </div>
                    <p className="text-white/90 text-sm sm:text-base">
                      Historical standard for defense applications
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      NIST
                    </div>
                    <div className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                      SP 800-88
                    </div>
                    <p className="text-white/90 text-sm sm:text-base">
                      Modern guideline for all storage types
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      IEEE
                    </div>
                    <div className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                      2883
                    </div>
                    <p className="text-white/90 text-sm sm:text-base">
                      Emerging standards for future needs
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                  Download Technical Guide
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Get the complete overwrite patterns and data sanitization
                  guide as a downloadable PDF
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors inline-flex items-center gap-2 text-sm sm:text-base">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download Overwrite Guide (PDF)
                  </button>
                  <button className="bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors inline-flex items-center gap-2 text-sm sm:text-base">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H9.5a2 2 0 00-2 2v4a2 2 0 002 2h2m3-4v6m0 0l-3-3m3 3l3-3"
                      />
                    </svg>
                    Algorithm Reference (PDF)
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-4">
                  Last updated: {new Date().getFullYear()} • Version 2.3 • 15
                  pages
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                  Need Technical Assistance?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Our security experts can help you implement the right
                  overwrite patterns for your specific needs
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link
                    to="/support/contact"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center text-sm sm:text-base"
                  >
                    Contact Security Team
                  </Link>
                  <a
                    href="mailto:security@dsecuretech.com"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center text-sm sm:text-base"
                  >
                    Email Security Experts
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default OverwritePatternsPage;
