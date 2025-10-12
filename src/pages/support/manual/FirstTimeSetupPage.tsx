import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

// CDN Image URLs - Using placeholder images that match the content
const CDN_IMAGES = {
  setup:
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  activation:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  configuration:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  scanning:
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  security:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  performance:
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

const FirstTimeSetupPage: React.FC = memo(() => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const manualSections: ManualSection[] = [
    {
      id: 1,
      title: "Preparation & Prerequisites",
      description:
        "Essential requirements and preparations before starting D-Secure setup",
      icon: "📋",
      subsections: [
        {
          id: 11,
          title: "System Requirements",
          description:
            "Verify your device meets minimum OS and hardware specifications",
          url: "/support/manual/system-requirements",
          pageCount: 1,
        },
        {
          id: 12,
          title: "Internet Connection",
          description:
            "Ensure stable high-speed connection for download and configuration",
          url: "/support/manual/internet-requirements",
          pageCount: 1,
        },
        {
          id: 13,
          title: "Activation Key",
          description:
            "Locate and prepare your 25-digit product activation key",
          url: "/support/manual/activation-key",
          pageCount: 1,
        },
      ],
    },
    {
      id: 2,
      title: "Installation Process",
      description: "Step-by-step guide to installing D-Secure on your system",
      icon: "⚡",
      subsections: [
        {
          id: 21,
          title: "Download Installer",
          description:
            "Get the latest installer from official D-Secure website",
          url: "/support/manual/download-installer",
          pageCount: 1,
        },
        {
          id: 22,
          title: "Run Setup Wizard",
          description: "Execute installer and follow on-screen instructions",
          url: "/support/manual/setup-wizard",
          pageCount: 1,
        },
        {
          id: 23,
          title: "License Agreement",
          description: "Review and accept End-User License Agreement",
          url: "/support/manual/license-agreement",
          pageCount: 1,
        },
        {
          id: 24,
          title: "Installation Path",
          description: "Choose installation location and complete setup",
          url: "/support/manual/installation-path",
          pageCount: 1,
        },
      ],
    },
    {
      id: 3,
      title: "Activation & Configuration",
      description: "Activate your license and configure initial settings",
      icon: "🔑",
      subsections: [
        {
          id: 31,
          title: "Key Activation",
          description:
            "Enter 25-digit activation key to unlock premium features",
          url: "/support/manual/key-activation",
          pageCount: 2,
        },
        {
          id: 32,
          title: "User Profile Setup",
          description: "Create primary user account with secure password",
          url: "/support/manual/user-profile",
          pageCount: 1,
        },
        {
          id: 33,
          title: "Firewall Configuration",
          description: "Customize network traffic permissions and settings",
          url: "/support/manual/firewall-setup",
          pageCount: 1,
        },
        {
          id: 34,
          title: "Scan Exclusions",
          description:
            "Define folders and files to exclude from security scans",
          url: "/support/manual/scan-exclusions",
          pageCount: 1,
        },
      ],
    },
    {
      id: 4,
      title: "Initial Security Setup",
      description: "Essential security configurations and first system scan",
      icon: "🛡️",
      subsections: [
        {
          id: 41,
          title: "First System Scan",
          description: "Run initial full system scan to establish baseline",
          url: "/support/manual/first-scan",
          pageCount: 2,
        },
        {
          id: 42,
          title: "Scan Results Review",
          description: "Analyze scan report and handle detected threats",
          url: "/support/manual/scan-results",
          pageCount: 1,
        },
        {
          id: 43,
          title: "Real-time Protection",
          description: "Enable continuous monitoring and threat detection",
          url: "/support/manual/realtime-protection",
          pageCount: 1,
        },
      ],
    },
    {
      id: 5,
      title: "Advanced Features",
      description:
        "Premium security features beyond basic antivirus protection",
      icon: "🚀",
      subsections: [
        {
          id: 51,
          title: "VPN Integration",
          description: "Encrypt internet connection for anonymous browsing",
          url: "/support/manual/vpn-setup",
          pageCount: 2,
        },
        {
          id: 52,
          title: "Secure Banking Mode",
          description:
            "Protected browser environment for financial transactions",
          url: "/support/manual/banking-mode",
          pageCount: 1,
        },
        {
          id: 53,
          title: "Parental Controls",
          description: "Manage and restrict content access for child safety",
          url: "/support/manual/parental-controls",
          pageCount: 2,
        },
      ],
    },
    {
      id: 6,
      title: "Optimization & Maintenance",
      description: "Performance tuning and update management",
      icon: "⚙️",
      subsections: [
        {
          id: 61,
          title: "Scan Scheduling",
          description: "Set up automated weekly or daily quick scans",
          url: "/support/manual/scan-scheduling",
          pageCount: 1,
        },
        {
          id: 62,
          title: "Auto-Updates",
          description: "Enable automatic virus definition updates",
          url: "/support/manual/auto-updates",
          pageCount: 1,
        },
        {
          id: 63,
          title: "Performance Tuning",
          description: "Optimize disk space and improve system speed",
          url: "/support/manual/performance-tuning",
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
          href="https://dsecuretech.com/support/first-time-setup"
        />
        <title>First Time Setup | D-Secure Activation & Configuration</title>
        <meta
          name="description"
          content="Complete first-time setup guide for D-Secure. Learn how to activate, configure, and optimize your security system for maximum protection."
        />
        <meta
          name="keywords"
          content="D-Secure first time setup, activation guide, initial configuration, security setup"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center">
                <div className="mb-6 md:mb-8">
                  <Link
                    to="/support"
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-3 md:mb-4 transition-colors text-sm sm:text-base"
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
                    First Time{" "}
                    <span className="text-green-600 block sm:inline">
                      Setup Guide
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                    Your comprehensive guide to activating and configuring your
                    D-Secure system for ultimate protection
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search setup guide..."
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-12 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm sm:text-base"
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
                    src={CDN_IMAGES.setup}
                    alt="D-Secure First Time Setup Interface"
                    className="w-full h-full object-cover rounded-2xl"
                    loading="lazy"
                    decoding="async"
                    style={{ aspectRatio: "16/9" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 md:p-8 text-white">
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                        Complete Protection Setup
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 max-w-2xl">
                        Activate and configure all security features in minutes
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
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-1 sm:mb-2">
                    10
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-slate-600">
                    Setup Pages
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-1 sm:mb-2">
                    6
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-slate-600">
                    Setup Steps
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-1 sm:mb-2">
                    99.9%
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-slate-600">
                    Threat Detection
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-1 sm:mb-2">
                    15%
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-slate-600">
                    Resource Usage
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Setup Steps Overview */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                  Setup Process
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto px-4">
                  Follow these 6 key steps to complete your D-Secure setup
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 max-w-7xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Preparation",
                  description: "Check requirements & get key",
                  icon: "📋",
                  image: CDN_IMAGES.setup,
                },
                {
                  step: "2",
                  title: "Installation",
                  description: "Download & run installer",
                  icon: "⚡",
                  image: CDN_IMAGES.activation,
                },
                {
                  step: "3",
                  title: "Activation",
                  description: "Enter 25-digit key",
                  icon: "🔑",
                  image: CDN_IMAGES.activation,
                },
                {
                  step: "4",
                  title: "Configuration",
                  description: "Setup user & firewall",
                  icon: "⚙️",
                  image: CDN_IMAGES.configuration,
                },
                {
                  step: "5",
                  title: "First Scan",
                  description: "Run system scan",
                  icon: "🛡️",
                  image: CDN_IMAGES.scanning,
                },
                {
                  step: "6",
                  title: "Features",
                  description: "Enable advanced options",
                  icon: "🚀",
                  image: CDN_IMAGES.security,
                },
              ].map((step, index) => (
                <Reveal key={step.step} delayMs={index * 100}>
                  <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                    <div className="mb-3 sm:mb-4">
                      <div className="relative w-full h-20 sm:h-24">
                        <img
                          src={step.image}
                          alt={`Step ${step.step}: ${step.title}`}
                          className="w-full h-full object-cover rounded-lg"
                          loading="lazy"
                          decoding="async"
                          style={{ aspectRatio: "4/3" }}
                        />
                      </div>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mx-auto mb-2 sm:mb-3">
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

        {/* Visual Guide Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                  Setup Visual Guide
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto px-4">
                  Key screens and interfaces you'll encounter during setup
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "Activation Screen",
                  description:
                    "Enter your 25-digit activation key exactly as provided in your purchase confirmation.",
                  image: CDN_IMAGES.activation,
                  alt: "D-Secure activation key entry interface",
                },
                {
                  title: "Configuration Dashboard",
                  description:
                    "Configure user profiles, firewall settings, and scan exclusions during initial setup.",
                  image: CDN_IMAGES.configuration,
                  alt: "D-Secure initial configuration dashboard",
                },
                {
                  title: "System Scanning",
                  description:
                    "First full system scan establishes baseline security and identifies existing threats.",
                  image: CDN_IMAGES.scanning,
                  alt: "D-Secure system scanning progress",
                },
                {
                  title: "Advanced Security",
                  description:
                    "Enable VPN, secure banking mode, and parental controls for comprehensive protection.",
                  image: CDN_IMAGES.security,
                  alt: "D-Secure advanced security features",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delayMs={index * 100}>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-base sm:text-lg">
                      {item.title}
                    </h3>
                    <div className="relative w-full h-48 sm:h-64">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover rounded-lg border border-slate-200"
                        loading="lazy"
                        decoding="async"
                        style={{ aspectRatio: "4/3" }}
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
                  Jump to essential setup sections
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "Activation Key",
                  description: "Enter your 25-digit license key",
                  icon: "🔑",
                  url: "/support/manual/key-activation",
                  color: "bg-purple-500",
                },
                {
                  title: "First System Scan",
                  description: "Run initial security scan",
                  icon: "🛡️",
                  url: "/support/manual/first-scan",
                  color: "bg-blue-500",
                },
                {
                  title: "Firewall Setup",
                  description: "Configure network protection",
                  icon: "🔥",
                  url: "/support/manual/firewall-setup",
                  color: "bg-red-500",
                },
                {
                  title: "Advanced Features",
                  description: "Enable VPN & banking mode",
                  icon: "🚀",
                  url: "/support/manual/vpn-setup",
                  color: "bg-green-500",
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
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
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

        {/* Performance Metrics */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-green-500 to-emerald-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12">
                  D-Secure Performance Metrics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      99.9%
                    </div>
                    <div className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                      Threat Detection Rate
                    </div>
                    <p className="text-green-100 text-sm sm:text-base">
                      Proven accuracy against known and zero-day threats
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      15%
                    </div>
                    <div className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                      Resource Usage
                    </div>
                    <p className="text-green-100 text-sm sm:text-base">
                      Minimal impact on system performance
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      24/7
                    </div>
                    <div className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                      Customer Support
                    </div>
                    <p className="text-green-100 text-sm sm:text-base">
                      Round-the-clock technical assistance
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
                  Download Setup Guide
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Get the complete first-time setup guide as a downloadable PDF
                  for offline reference
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors inline-flex items-center gap-2 text-sm sm:text-base">
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
                    Download Setup Guide (PDF)
                  </button>
                  <button className="bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors inline-flex items-center gap-2 text-sm sm:text-base">
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
                    Quick Reference Card (PDF)
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-4">
                  Last updated: {new Date().getFullYear()} • Version 3.2 • 10
                  pages
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                  Need Setup Assistance?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Our support team is available 24/7 to help you complete your
                  D-Secure setup
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link
                    to="/support/contact"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center text-sm sm:text-base"
                  >
                    Contact Setup Support
                  </Link>
                  <a
                    href="mailto:setup-support@dsecuretech.com"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center text-sm sm:text-base"
                  >
                    Email Setup Team
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

export default FirstTimeSetupPage;
