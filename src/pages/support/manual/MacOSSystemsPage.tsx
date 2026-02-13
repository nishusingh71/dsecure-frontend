import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import OptimizedImage from '@/components/OptimizedImage';
import { getFallbackImage } from '@/utils/imagePlaceholders';

// CDN Image URLs
const CDN_IMAGES = {
  hero: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  storage:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  tools:
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  silicon:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  enterprise:
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
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

const MacOSSystemsPage: React.FC = memo(() => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const manualSections: ManualSection[] = [
    {
      id: 1,
      title: "Introduction & macOS Architecture",
      description:
        "Understanding macOS storage and Apple Silicon considerations",
      icon: "🍎",
      subsections: [
        {
          id: 11,
          title: "macOS Data Erasure Introduction",
          description: "Importance of secure erasure on macOS environments",
          url: "/support/manual/macos-introduction",
          pageCount: 2,
        },
        {
          id: 12,
          title: "Intel vs Apple Silicon Differences",
          description: "M1/M2 Macs vs Intel-based Mac architecture differences",
          url: "/support/manual/macos-architecture",
          pageCount: 2,
        },
        {
          id: 13,
          title: "Security Risks & Compliance",
          description:
            "Data breach risks and compliance requirements for macOS",
          url: "/support/manual/macos-risks",
          pageCount: 1,
        },
      ],
    },
    {
      id: 2,
      title: "macOS Storage & File Systems",
      description: "APFS, HFS+, and storage architecture overview",
      icon: "💾",
      subsections: [
        {
          id: 21,
          title: "File Systems Overview",
          description: "APFS vs HFS+ and their erasure implications",
          url: "/support/manual/macos-filesystems",
          pageCount: 2,
        },
        {
          id: 22,
          title: "Storage Architectures",
          description: "SSD vs Fusion Drive and hardware considerations",
          url: "/support/manual/macos-storage",
          pageCount: 2,
        },
        {
          id: 23,
          title: "Encryption & Secure Enclave",
          description: "FileVault, encryption, and Secure Enclave role",
          url: "/support/manual/macos-encryption",
          pageCount: 1,
        },
      ],
    },
    {
      id: 3,
      title: "Erasure Methods for macOS",
      description:
        "Software, cryptographic, and physical destruction approaches",
      icon: "🔄",
      subsections: [
        {
          id: 31,
          title: "Software-Based Overwrite",
          description: "Multi-pass options and secure erase methods",
          url: "/support/manual/macos-software-erasure",
          pageCount: 2,
        },
        {
          id: 32,
          title: "Cryptographic Erasure",
          description: "FileVault key destruction and instant erasure",
          url: "/support/manual/macos-crypto-erasure",
          pageCount: 2,
        },
        {
          id: 33,
          title: "Method Comparison",
          description: "Pros and cons of each macOS erasure approach",
          url: "/support/manual/macos-methods-comparison",
          pageCount: 1,
        },
      ],
    },
    {
      id: 4,
      title: "Preparation & Built-in Tools",
      description: "Pre-erasure steps and macOS native erasure capabilities",
      icon: "⚙️",
      subsections: [
        {
          id: 41,
          title: "Pre-Erasure Preparation",
          description: "Backup, iCloud, Find My Mac, and firmware settings",
          url: "/support/manual/macos-preparation",
          pageCount: 2,
        },
        {
          id: 42,
          title: "macOS Built-in Erasure Tools",
          description: "Disk Utility and secure erase options",
          url: "/support/manual/macos-builtin-tools",
          pageCount: 2,
        },
        {
          id: 43,
          title: "FileVault Procedures",
          description: "Encryption key management and destruction",
          url: "/support/manual/macos-filevault",
          pageCount: 2,
        },
      ],
    },
    {
      id: 5,
      title: "Platform-Specific Procedures",
      description: "Intel Macs vs Apple Silicon Mac erasure workflows",
      icon: "🔧",
      subsections: [
        {
          id: 51,
          title: "Intel Mac Erasure",
          description: "Recovery Mode and Disk Utility for Intel-based Macs",
          url: "/support/manual/macos-intel-procedures",
          pageCount: 2,
        },
        {
          id: 52,
          title: "Apple Silicon Erasure",
          description: "M1/M2 Recovery Mode and Secure Enclave considerations",
          url: "/support/manual/macos-apple-silicon",
          pageCount: 2,
        },
        {
          id: 53,
          title: "SSD-Specific Considerations",
          description: "Modern SSD erasure and cryptographic advantages",
          url: "/support/manual/macos-ssd-considerations",
          pageCount: 1,
        },
      ],
    },
    {
      id: 6,
      title: "Third-Party Tools & External Media",
      description: "External software solutions and removable media handling",
      icon: "💻",
      subsections: [
        {
          id: 61,
          title: "Third-Party Erasure Software",
          description:
            "D-Secure Mac Eraser, Blancco, Permanent Eraser comparison",
          url: "/support/manual/macos-third-party",
          pageCount: 2,
        },
        {
          id: 62,
          title: "External Drives & Removable Media",
          description: "USB drives, external SSD/HDD secure erasure",
          url: "/support/manual/macos-external-media",
          pageCount: 2,
        },
        {
          id: 63,
          title: "Tool Selection Guide",
          description: "Choosing the right tool for your macOS environment",
          url: "/support/manual/macos-tool-selection",
          pageCount: 1,
        },
      ],
    },
    {
      id: 7,
      title: "Advanced Scenarios & Enterprise",
      description: "Complex environments and large-scale deployment",
      icon: "🏢",
      subsections: [
        {
          id: 71,
          title: "System & Boot Drive Erasure",
          description: "Safely erasing macOS system partitions",
          url: "/support/manual/macos-system-drive",
          pageCount: 2,
        },
        {
          id: 72,
          title: "Enterprise Bulk Erasure",
          description: "Network methods, Jamf, Mosyle for large-scale wipe",
          url: "/support/manual/macos-enterprise",
          pageCount: 2,
        },
        {
          id: 73,
          title: "Verification & Compliance",
          description: "Software and cryptographic verification methods",
          url: "/support/manual/macos-verification",
          pageCount: 2,
        },
        {
          id: 74,
          title: "Audit Trails & Reporting",
          description: "GDPR, HIPAA, PCI-DSS compliance and logging",
          url: "/support/manual/macos-compliance",
          pageCount: 1,
        },
      ],
    },
    {
      id: 8,
      title: "Troubleshooting & Best Practices",
      description: "Problem resolution and implementation guidelines",
      icon: "🔍",
      subsections: [
        {
          id: 81,
          title: "Troubleshooting Common Errors",
          description:
            "Drive visibility, erase failures, and encryption issues",
          url: "/support/manual/macos-troubleshooting",
          pageCount: 2,
        },
        {
          id: 82,
          title: "Best Practices",
          description: "Combined methods and audit-ready workflows",
          url: "/support/manual/macos-best-practices",
          pageCount: 2,
        },
        {
          id: 83,
          title: "Frequently Asked Questions",
          description: "Common macOS erasure questions and answers",
          url: "/support/manual/macos-faq",
          pageCount: 1,
        },
        {
          id: 84,
          title: "Additional Resources",
          description: "Tools, templates, and Apple documentation",
          url: "/support/manual/macos-resources",
          pageCount: 1,
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
          href="https://D-Securetech.com/support/macos-systems"
        />
        <title>
          macOS Systems Data Erasure | Intel & Apple Silicon Procedures
        </title>
        <meta
          name="description"
          content="Complete guide to secure data erasure on macOS systems. Procedures for Intel and Apple Silicon Macs, FileVault encryption, and enterprise deployment."
        />
        <meta
          name="keywords"
          content="macOS data erasure, Apple Silicon erasure, M1 Mac secure delete, FileVault erasure, macOS SSD erasure"
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
                    macOS Systems{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block sm:inline">
                      Data Erasure
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                    Secure Data Erasure on macOS: Complete procedures for Intel
                    and Apple Silicon Macs with FileVault encryption and
                    enterprise deployment.
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search macOS erasure procedures..."
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
                    alt="macOS Systems Data Erasure"
                    fallback={getFallbackImage('technology')}
                    className="w-full h-full object-cover"
                    width={1600}
                    height={900}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 md:p-8 text-white">
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                        Secure macOS Data Erasure
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 max-w-2xl">
                        Comprehensive procedures for Intel and Apple Silicon
                        Macs
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
                  <div className="text-3xl sm:text-4xl mb-4">🔒</div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-600 mb-2">
                    Secure
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    FileVault & Secure Enclave compliant
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">⚡</div>
                  <div className="text-xl sm:text-2xl font-bold text-teal-600 mb-2">
                    Efficient
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Cryptographic erasure in seconds
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">🏢</div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-600 mb-2">
                    Enterprise
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Bulk deployment ready
                  </div>
                </div>
              </div>
            </Reveal>
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

        {/* Apple Silicon Specific Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Apple Silicon Specific Considerations
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Special procedures for M1/M2 Macs with Secure Enclave
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              <Reveal delayMs={100}>
                <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-lg sm:text-xl">
                    M1/M2 Recovery Process
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        1
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          Shut down Mac completely
                        </div>
                        <div className="text-slate-600 text-xs sm:text-sm">
                          Ensure all applications are closed
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        2
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          Press and hold Power button
                        </div>
                        <div className="text-slate-600 text-xs sm:text-sm">
                          Continue holding until startup options appear
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        3
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          Select Options → Continue
                        </div>
                        <div className="text-slate-600 text-xs sm:text-sm">
                          Choose Disk Utility for erasure
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-lg sm:text-xl">
                    Secure Enclave Advantages
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
                        Hardware-based encryption key storage
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
                        Instant cryptographic erasure capability
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
                        Enhanced security for FileVault encryption
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
                        No multi-pass overwrite required for SSDs
                      </span>
                    </li>
                  </ul>
                </div>
              </Reveal>
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
                  Essential macOS erasure resources
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "Apple Silicon",
                  description: "M1/M2 specific procedures",
                  icon: "🚀",
                  url: "/support/manual/macos-apple-silicon",
                  color: "bg-emerald-600",
                },
                {
                  title: "Intel Macs",
                  description: "Traditional Mac procedures",
                  icon: "🔧",
                  url: "/support/manual/macos-intel-procedures",
                  color: "bg-teal-600",
                },
                {
                  title: "FileVault Guide",
                  description: "Encryption key management",
                  icon: "🔒",
                  url: "/support/manual/macos-filevault",
                  color: "bg-cyan-600",
                },
                {
                  title: "Enterprise",
                  description: "Bulk erasure and management",
                  icon: "🏢",
                  url: "/support/manual/macos-enterprise",
                  color: "bg-emerald-700",
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

        {/* Final CTA Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                  Need macOS Erasure Assistance?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Our experts can help you implement secure, compliant data
                  erasure procedures for your Intel and Apple Silicon Mac
                  environment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/services/macos-erasure"
                    className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg"
                  >
                    macOS Erasure Services
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg"
                  >
                    Consult Our Experts
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

export default MacOSSystemsPage;
