import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import OptimizedImage from '@/components/OptimizedImage';
import { getFallbackImage } from '@/utils/imagePlaceholders';

// CDN Image URLs
const CDN_IMAGES = {
  hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  storage:
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  tools:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  ssd: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
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

const WindowsSystemsPage: React.FC = memo(() => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const manualSections: ManualSection[] = [
    {
      id: 1,
      title: "Introduction & Windows Architecture",
      description:
        "Understanding Windows 10/11 storage and security considerations",
      icon: "🏁",
      subsections: [
        {
          id: 11,
          title: "Introduction to Windows Data Erasure",
          description: "Importance of secure erasure in Windows environments",
          url: "/support/manual/windows-introduction",
          pageCount: 2,
        },
        {
          id: 12,
          title: "Windows Storage Architecture",
          description: "HDD, SSD, hybrid drives and file systems overview",
          url: "/support/manual/windows-storage",
          pageCount: 2,
        },
        {
          id: 13,
          title: "Security Risks & Compliance",
          description:
            "Data leaks, compliance violations, and threat prevention",
          url: "/support/manual/windows-risks",
          pageCount: 1,
        },
      ],
    },
    {
      id: 2,
      title: "Windows File Systems & Data Persistence",
      description: "Understanding where data hides in Windows systems",
      icon: "💾",
      subsections: [
        {
          id: 21,
          title: "File Systems Overview",
          description: "NTFS, FAT32, exFAT and their erasure implications",
          url: "/support/manual/windows-filesystems",
          pageCount: 2,
        },
        {
          id: 22,
          title: "Windows System Files & Caches",
          description: "Pagefile, hibernation files, and system restore points",
          url: "/support/manual/windows-system-files",
          pageCount: 2,
        },
        {
          id: 23,
          title: "Residual Data Locations",
          description: "Shadow copies, temp files, and registry remnants",
          url: "/support/manual/windows-residual-data",
          pageCount: 1,
        },
      ],
    },
    {
      id: 3,
      title: "Erasure Methods for Windows",
      description:
        "Software, cryptographic, and physical destruction approaches",
      icon: "🔄",
      subsections: [
        {
          id: 31,
          title: "Software-Based Overwrite",
          description: "Single-pass and multi-pass DoD/NIST methods",
          url: "/support/manual/windows-software-erasure",
          pageCount: 2,
        },
        {
          id: 32,
          title: "Cryptographic Erasure",
          description: "Encrypted drive key destruction procedures",
          url: "/support/manual/windows-crypto-erasure",
          pageCount: 2,
        },
        {
          id: 33,
          title: "Method Comparison",
          description: "Pros and cons of each erasure approach",
          url: "/support/manual/windows-methods-comparison",
          pageCount: 1,
        },
      ],
    },
    {
      id: 4,
      title: "Preparation & Built-in Tools",
      description: "Pre-erasure steps and Windows native erasure capabilities",
      icon: "⚙️",
      subsections: [
        {
          id: 41,
          title: "Pre-Erasure Preparation",
          description: "Backup, BitLocker management, and administrative setup",
          url: "/support/manual/windows-preparation",
          pageCount: 2,
        },
        {
          id: 42,
          title: "Windows Built-in Erasure Tools",
          description: "Reset this PC and BitLocker removal procedures",
          url: "/support/manual/windows-builtin-tools",
          pageCount: 2,
        },
        {
          id: 43,
          title: "Command Line Erasure",
          description: "Cipher, Diskpart, and PowerShell scripting methods",
          url: "/support/manual/windows-command-line",
          pageCount: 2,
        },
      ],
    },
    {
      id: 5,
      title: "Third-Party Tools & Software",
      description: "Advanced erasure tools for Windows environments",
      icon: "🔧",
      subsections: [
        {
          id: 51,
          title: "D-Secure Windows Eraser",
          description: "Specialized tool for comprehensive Windows erasure",
          url: "/support/manual/windows-dsecure-eraser",
          pageCount: 2,
        },
        {
          id: 52,
          title: "Third-Party Software Comparison",
          description: "Blancco, BitRaser, and other professional tools",
          url: "/support/manual/windows-third-party",
          pageCount: 2,
        },
        {
          id: 53,
          title: "Bootable USB Creation",
          description: "Creating secure erasure boot environments",
          url: "/support/manual/windows-bootable-usb",
          pageCount: 2,
        },
      ],
    },
    {
      id: 6,
      title: "SSD & Modern Storage",
      description: "Handling SSDs and encrypted drives in Windows",
      icon: "🚀",
      subsections: [
        {
          id: 61,
          title: "SSD-Specific Erasure",
          description: "ATA Secure Erase and TRIM considerations",
          url: "/support/manual/windows-ssd-erasure",
          pageCount: 2,
        },
        {
          id: 62,
          title: "BitLocker Management",
          description: "Suspending and removing BitLocker encryption",
          url: "/support/manual/windows-bitlocker",
          pageCount: 2,
        },
        {
          id: 63,
          title: "Self-Encrypting Drives",
          description: "SED and OPAL drive erasure procedures",
          url: "/support/manual/windows-sed-drives",
          pageCount: 1,
        },
      ],
    },
    {
      id: 7,
      title: "Advanced & Enterprise",
      description: "Enterprise-scale erasure and management",
      icon: "🏢",
      subsections: [
        {
          id: 71,
          title: "Enterprise Bulk Erasure",
          description: "SCCM, Intune, and network-based methods",
          url: "/support/manual/windows-enterprise",
          pageCount: 2,
        },
        {
          id: 72,
          title: "Verification & Compliance",
          description: "Software and cryptographic verification methods",
          url: "/support/manual/windows-verification",
          pageCount: 2,
        },
        {
          id: 73,
          title: "Audit & Reporting",
          description: "GDPR, HIPAA, PCI-DSS compliance logging",
          url: "/support/manual/windows-compliance",
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
          title: "Common Errors & Fixes",
          description: "Drive detection, erase failures, encryption issues",
          url: "/support/manual/windows-troubleshooting",
          pageCount: 2,
        },
        {
          id: 82,
          title: "Best Practices",
          description: "Combined methods and audit-ready workflows",
          url: "/support/manual/windows-best-practices",
          pageCount: 2,
        },
        {
          id: 83,
          title: "Frequently Asked Questions",
          description: "Common Windows erasure questions and answers",
          url: "/support/manual/windows-faq",
          pageCount: 1,
        },
        {
          id: 84,
          title: "Additional Resources",
          description: "Tools, templates, and Microsoft documentation",
          url: "/support/manual/windows-resources",
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
          href="https://dsecuretech.com/support/windows-systems"
        />
        <title>
          Windows Systems Data Erasure | Windows 10/11 Secure Wipe Guide
        </title>
        <meta
          name="description"
          content="Complete guide to secure data erasure on Windows systems. Procedures for HDDs, SSDs, BitLocker drives, and enterprise deployment."
        />
        <meta
          name="keywords"
          content="Windows data erasure, BitLocker erasure, Windows SSD wipe, secure delete Windows, Windows enterprise erasure"
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
                    Windows Systems{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block sm:inline">
                      Data Erasure
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                    Secure Data Erasure on Windows: Complete procedures for
                    Windows 10/11 with BitLocker, SSD support, and enterprise
                    deployment.
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Windows erasure procedures..."
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
                    alt="Windows Systems Data Erasure"
                    fallback={getFallbackImage('technology')}
                    className="w-full h-full object-cover"
                    width={1600}
                    height={900}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 md:p-8 text-white">
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                        Secure Windows Erasure
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 max-w-2xl">
                        Comprehensive procedures for Windows 10/11 systems
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
                    BitLocker compliant
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">⚡</div>
                  <div className="text-xl sm:text-2xl font-bold text-teal-600 mb-2">
                    Efficient
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Built-in tools
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">🏢</div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-600 mb-2">
                    Enterprise
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Bulk deployment
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

        {/* SSD Specific Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  SSD Specific Considerations
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Special procedures for solid-state drives in Windows
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              <Reveal delayMs={100}>
                <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-lg sm:text-xl">
                    ATA Secure Erase Process
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        1
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          Create bootable USB
                        </div>
                        <div className="text-slate-600 text-xs sm:text-sm">
                          Use Rufus or similar tool
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        2
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          Boot from USB
                        </div>
                        <div className="text-slate-600 text-xs sm:text-sm">
                          Enter BIOS and select boot device
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        3
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          Run Secure Erase
                        </div>
                        <div className="text-slate-600 text-xs sm:text-sm">
                          Use hdparm or manufacturer tool
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-lg sm:text-xl">
                    Advantages for Windows SSDs
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
                        Handles wear-leveling effectively
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
                        Resets overprovisioning areas
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
                        Supports TRIM for performance
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
                        Cryptographic erasure for self-encrypting drives
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
                  Essential Windows erasure resources
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "Built-in Tools",
                  description: "Reset this PC and command line",
                  icon: "⚙️",
                  url: "/support/manual/windows-builtin-tools",
                  color: "bg-blue-500",
                },
                {
                  title: "SSD Erasure",
                  description: "Solid-state drive procedures",
                  icon: "💾",
                  url: "/support/manual/windows-ssd-erasure",
                  color: "bg-purple-500",
                },
                {
                  title: "Troubleshooting",
                  description: "Common errors and solutions",
                  icon: "🔧",
                  url: "/support/manual/windows-troubleshooting",
                  color: "bg-orange-500",
                },
                {
                  title: "Enterprise Guide",
                  description: "Bulk erasure and management",
                  icon: "🏢",
                  url: "/support/manual/windows-enterprise",
                  color: "bg-green-500",
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
                  Need Windows Erasure Assistance?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Our experts can help you implement secure, compliant data
                  erasure procedures for your Windows environment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/services/windows-erasure"
                    className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg"
                  >
                    Windows Erasure Services
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg"
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

export default WindowsSystemsPage;
