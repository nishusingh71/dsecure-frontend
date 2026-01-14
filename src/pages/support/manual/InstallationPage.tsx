import React, { useState, memo } from "react";
import { Helmet } from 'react-helmet-async';
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import OptimizedImage from '@/components/OptimizedImage';
import { getFallbackImage } from '@/utils/imagePlaceholders';

// CDN Image URLs - Using placeholder images that match the content
const CDN_IMAGES = {
  installer:
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  dashboard:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  security:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  systemScan:
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  firewall:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  protection:
    "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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

const InstallationPage: React.FC = memo(() => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const manualSections: ManualSection[] = [
    {
      id: 1,
      title: "Installation & Setup",
      description:
        "Complete guide to installing and configuring D-Secure on your system",
      icon: "📥",
      subsections: [
        {
          id: 11,
          title: "Pre-Installation Checklist",
          description:
            "System requirements and preparation steps before installation",
          url: "/support/manual/pre-installation",
          pageCount: 2,
        },
        {
          id: 12,
          title: "Download & Run Installer",
          description:
            "Step-by-step guide to downloading and running the D-Secure installer",
          url: "/support/manual/download-installer",
          pageCount: 2,
        },
        {
          id: 13,
          title: "License Key Activation",
          description:
            "How to activate your D-Secure license and verify your subscription",
          url: "/support/manual/license-activation",
          pageCount: 2,
        },
        {
          id: 14,
          title: "Custom Installation Settings",
          description:
            "Standard vs custom installation options and component selection",
          url: "/support/manual/installation-settings",
          pageCount: 2,
        },
      ],
    },
    {
      id: 2,
      title: "Post-Installation",
      description:
        "Configuration and optimization after successful installation",
      icon: "⚙️",
      subsections: [
        {
          id: 21,
          title: "Installation Progress & Completion",
          description: "Monitoring installation progress and finalizing setup",
          url: "/support/manual/installation-progress",
          pageCount: 2,
        },
        {
          id: 22,
          title: "System Restart & First Run",
          description:
            "Post-installation restart and initial application setup",
          url: "/support/manual/first-run",
          pageCount: 2,
        },
        {
          id: 23,
          title: "Post-Installation Optimization",
          description: "Essential steps to maximize protection and performance",
          url: "/support/manual/post-install-optimization",
          pageCount: 2,
        },
      ],
    },
    {
      id: 3,
      title: "Troubleshooting",
      description: "Common installation issues and their solutions",
      icon: "🔧",
      subsections: [
        {
          id: 31,
          title: "Common Installation Issues",
          description: "Frequently encountered problems and quick solutions",
          url: "/support/manual/common-issues",
          pageCount: 2,
        },
        {
          id: 32,
          title: "License Key Problems",
          description:
            "Troubleshooting invalid license keys and activation failures",
          url: "/support/manual/license-troubleshooting",
          pageCount: 1,
        },
        {
          id: 33,
          title: "Performance Optimization",
          description: "Fixing slow system performance after installation",
          url: "/support/manual/performance-troubleshooting",
          pageCount: 1,
        },
      ],
    },
    {
      id: 4,
      title: "Security Features",
      description:
        "Comprehensive overview of D-Secure's protection capabilities",
      icon: "🛡️",
      subsections: [
        {
          id: 41,
          title: "Real-Time Monitoring",
          description: "24/7 threat detection and continuous protection",
          url: "/support/manual/real-time-monitoring",
          pageCount: 3,
        },
        {
          id: 42,
          title: "Firewall Configuration",
          description: "Customizing firewall settings for your network needs",
          url: "/support/manual/firewall-config",
          pageCount: 4,
        },
        {
          id: 43,
          title: "Virus Definition Updates",
          description: "Managing threat definitions and automatic updates",
          url: "/support/manual/virus-definitions",
          pageCount: 3,
        },
        {
          id: 44,
          title: "System Scanning",
          description: "Comprehensive system scans and threat identification",
          url: "/support/manual/system-scanning",
          pageCount: 3,
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
          href="https://dsecuretech.com/support/installation"
        />
        <title>Installation Guide | D-Secure Setup & Configuration</title>
        <meta
          name="description"
          content="Complete D-Secure installation manual with step-by-step setup instructions, troubleshooting, and post-installation optimization guide."
        />
        <meta
          name="keywords"
          content="D-Secure installation, setup guide, security software installation, D-Secure manual"
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
                    D-Secure{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block sm:inline">
                      Installation Guide
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                    Your comprehensive, step-by-step path to activating robust
                    digital security
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search installation guide..."
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
                    src={CDN_IMAGES.protection}
                    alt="D-Secure Advanced Protection Dashboard"
                    fallback={getFallbackImage('security')}
                    className="w-full h-full object-cover"
                    width={1600}
                    height={900}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 md:p-8 text-white">
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                        Advanced Digital Security
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 max-w-2xl">
                        Industry-leading threat detection with 24/7 real-time
                        monitoring
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
                <div className="p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-1 sm:mb-2">
                    10
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-slate-600">
                    Guide Pages
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-600 mb-1 sm:mb-2">
                    5
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-slate-600">
                    Installation Steps
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-600 mb-1 sm:mb-2">
                    99.9%
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-slate-600">
                    Threat Detection
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-1 sm:mb-2">
                    100M+
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-slate-600">
                    Users Protected
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Installation Steps Overview */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                  Installation Steps
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto px-4">
                  Follow these 5 simple steps to activate D-Secure protection
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Pre-Installation",
                  description: "System check & preparation",
                  icon: "📋",
                  image: CDN_IMAGES.systemScan,
                },
                {
                  step: "2",
                  title: "Download",
                  description: "Get the installer",
                  icon: "⬇️",
                  image: CDN_IMAGES.installer,
                },
                {
                  step: "3",
                  title: "Activate",
                  description: "License key setup",
                  icon: "🔑",
                  image: CDN_IMAGES.security,
                },
                {
                  step: "4",
                  title: "Install",
                  description: "Configure settings",
                  icon: "⚙️",
                  image: CDN_IMAGES.dashboard,
                },
                {
                  step: "5",
                  title: "Complete",
                  description: "Restart & optimize",
                  icon: "✅",
                  image: CDN_IMAGES.protection,
                },
              ].map((step, index) => (
                <Reveal key={step.step} delayMs={index * 100}>
                  <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                    <div className="mb-3 sm:mb-4">
                      <div className="w-full h-20 sm:h-24">
                        <OptimizedImage
                          src={step.image}
                          alt={`Step ${step.step}: ${step.title}`}
                          fallback={getFallbackImage('technology')}
                          className="w-full h-full object-cover rounded-lg"
                          width={400}
                          height={300}
                        />
                      </div>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mx-auto mb-2 sm:mb-3">
                      {step.step}
                    </div>
                    <div className="text-xl sm:text-2xl mb-2">{step.icon}</div>
                    <h3 className="font-semibold text-slate-900 mb-1 sm:mb-2 text-sm sm:text-base">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm flex-grow">
                      {step.description}
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

        {/* Visual Guide Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                  Visual Installation Guide
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto px-4">
                  Screenshots and visual references for each installation step
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "Installer Interface",
                  description:
                    "The D-Secure installer features a clean, intuitive interface with real-time progress indicators.",
                  image: CDN_IMAGES.installer,
                  alt: "D-Secure installer interface with download progress",
                },
                {
                  title: "Dashboard Overview",
                  description:
                    "Monitor your security status and access all features through the comprehensive dashboard.",
                  image: CDN_IMAGES.dashboard,
                  alt: "D-Secure security dashboard with protection status",
                },
                {
                  title: "Firewall Settings",
                  description:
                    "Customize network protection with advanced firewall rules and application controls.",
                  image: CDN_IMAGES.firewall,
                  alt: "D-Secure firewall configuration panel",
                },
                {
                  title: "Real-time Monitoring",
                  description:
                    "24/7 threat detection with detailed activity logs and instant alerts.",
                  image: CDN_IMAGES.security,
                  alt: "D-Secure real-time threat monitoring display",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delayMs={index * 100}>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-base sm:text-lg">
                      {item.title}
                    </h3>
                    <div className="w-full h-48 sm:h-64">
                      <OptimizedImage
                        src={item.image}
                        alt={item.alt}
                        fallback={getFallbackImage('security')}
                        className="w-full h-full object-cover rounded-lg border border-slate-200"
                        width={600}
                        height={450}
                      />
                    </div>
                    <p className="text-slate-600 mt-3 sm:mt-4 text-sm sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                  Quick Access
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto px-4">
                  Jump to essential installation sections
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "System Requirements",
                  description: "Check compatibility before installing",
                  icon: "💻",
                  url: "/support/manual/pre-installation",
                  color: "bg-green-500",
                },
                {
                  title: "Download Installer",
                  description: "Get the official D-Secure installer",
                  icon: "⬇️",
                  url: "/support/manual/download-installer",
                  color: "bg-blue-500",
                },
                {
                  title: "License Activation",
                  description: "Activate your 25-digit license key",
                  icon: "🔑",
                  url: "/support/manual/license-activation",
                  color: "bg-purple-500",
                },
                {
                  title: "Troubleshooting",
                  description: "Fix common installation issues",
                  icon: "🔧",
                  url: "/support/manual/common-issues",
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



        {/* Contact Support Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  Need Help with Installation?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                  Our support team is ready to help you with any installation
                  challenges.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link
                    to="/support/contact"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center text-sm sm:text-base"
                  >
                    Contact Installation Support
                  </Link>
                  <a
                    href="mailto:install-support@dsecuretech.com"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center text-sm sm:text-base"
                  >
                    Email Installation Team
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

export default InstallationPage;
