import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import Reveal from "@/components/Reveal";
import {
  DatabaseIcon,
  ShieldIcon,
  CloudIcon,
  ArrowRightIcon,
  CheckIcon,
  ServerIcon,
  GearIcon,
  ClipboardIcon,
  StarIcon,
  LightningIcon,
} from "@/components/FlatIcons";

const ProductPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    platform: true,
    core: false,
    reporting: false,
    services: false,
    addons: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const pricingPlans = [
    { name: "Base", tag: "" },
    { name: "Standard", tag: "" },
    { name: "Cloud", tag: "" },
    { name: "Network", tag: "Popular" },
    { name: "Pro", tag: "" },
    { name: "Enterprise", tag: "Premium" },
  ];

  const features = {
    platform: [
      {
        name: "Windows Support",
        base: "check",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: "Linux Support",
        base: "x",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: "macOS Support",
        base: "x",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: "Multi-language UI & Reports (17+)",
        base: "pending",
        standard: "pending",
        cloud: "pending",
        network: "pending",
        pro: "pending",
        enterprise: "pending",
      },
    ],
    core: [
      {
        name: "30+ International Algorithms (SSD Trim, Crypto Erase)",
        base: "check",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: "File & Folder Erase",
        base: "check",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: "Erase Traces (Browser, System, App data)",
        base: "check",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: "Erase Deleted Data / Free Space",
        base: "x",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: "Erase Volume",
        base: "x",
        standard: "x",
        cloud: "x",
        network: "locked",
        pro: "locked",
        enterprise: "check-5",
      },
      {
        name: "Erase Disk (Full Device)",
        base: "x",
        standard: "x",
        cloud: "x",
        network: "locked",
        pro: "locked",
        enterprise: "check-1",
      },
      {
        name: "Scheduled Erase",
        base: "check-file",
        standard: "check-expanded",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: "Cloud Storage Erase (Google Drive, others coming soon)",
        base: "check",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
    ],
    reporting: [
      {
        name: "Local PDF Reports",
        base: "x",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: "White-Label Reports",
        base: "x",
        standard: "x",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: "Cloud Report Upload/Sync",
        base: "x",
        standard: "x",
        cloud: "check-slow",
        network: "check-improved",
        pro: "check-fast",
        enterprise: "check-fastest",
      },
      {
        name: "XML Report Format",
        base: "x",
        standard: "x",
        cloud: "x",
        network: "x",
        pro: "pending",
        enterprise: "check",
      },
      {
        name: "Audit-Grade Compliance Certificates",
        base: "x",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: "User/Action Logs",
        base: "x",
        standard: "x",
        cloud: "x",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
    ],
    services: [
      {
        name: "Web Dashboard",
        base: "limited",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: "Cloud Commands (Remote Jobs)",
        base: "x",
        standard: "x",
        cloud: "x",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: "Custom Installer (auto-register machine)",
        base: "locked",
        standard: "locked",
        cloud: "locked",
        network: "locked",
        pro: "check-1",
        enterprise: "check-5",
      },
      {
        name: "Sub-User Management",
        base: "locked-profiles",
        standard: "locked",
        cloud: "locked",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
      {
        name: "Private Cloud Support",
        base: "x",
        standard: "x",
        cloud: "x",
        network: "x",
        pro: "check-1",
        enterprise: "check-1",
      },
      {
        name: "Multi-Level User Logs",
        base: "x",
        standard: "x",
        cloud: "x",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: "White-Label Dashboard",
        base: "x",
        standard: "x",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
    ],
    addons: [
      {
        name: "Additional Disk Erasure Licenses",
        base: "x",
        standard: "x",
        cloud: "x",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
      {
        name: "Additional Volume Erasure Licenses",
        base: "x",
        standard: "x",
        cloud: "x",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
      {
        name: "Extra Custom Installer Packages",
        base: "locked",
        standard: "locked",
        cloud: "locked",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
      {
        name: "Extra Sub-Users",
        base: "locked",
        standard: "locked",
        cloud: "locked",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
      {
        name: "Extra Private Clouds",
        base: "x",
        standard: "locked",
        cloud: "locked",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
      {
        name: "Bespoke Integrations (SIEM, IT tools, etc.)",
        base: "locked",
        standard: "locked",
        cloud: "locked",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
      {
        name: "Dedicated SLA/Support Manager",
        base: "locked",
        standard: "locked",
        cloud: "locked",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
    ],
  };

  const renderFeatureIcon = (value: string) => {
    switch (value) {
      case "check":
        return <CheckIcon className="w-4 h-4 text-emerald-600" />;
      case "check-1":
        return (
          <div className="flex items-center space-x-1">
            <CheckIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-600">1</span>
          </div>
        );
      case "check-5":
        return (
          <div className="flex items-center space-x-1">
            <CheckIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-600">5</span>
          </div>
        );
      case "check-file":
        return (
          <div className="flex items-center space-x-1">
            <ClipboardIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-600">Files</span>
          </div>
        );
      case "check-expanded":
        return (
          <div className="flex items-center space-x-1">
            <ClipboardIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-600">All</span>
          </div>
        );
      case "check-slow":
        return (
          <div className="flex items-center space-x-1">
            <LightningIcon className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium text-amber-500">Basic</span>
          </div>
        );
      case "check-improved":
        return (
          <div className="flex items-center space-x-1">
            <LightningIcon className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-medium text-emerald-500">Fast</span>
          </div>
        );
      case "check-fast":
        return (
          <div className="flex items-center space-x-1">
            <LightningIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-600">Faster</span>
          </div>
        );
      case "check-fastest":
        return (
          <div className="flex items-center space-x-1">
            <LightningIcon className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-medium text-purple-600">Premium</span>
          </div>
        );
      case "x":
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case "locked":
        return (
          <div className="flex items-center space-x-1">
            <ShieldIcon className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-medium text-amber-600">Add-on</span>
          </div>
        );
      case "locked-profiles":
        return (
          <div className="flex items-center space-x-1">
            <ShieldIcon className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-medium text-amber-600">Profiles</span>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center space-x-1">
            <StarIcon className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-blue-600">
              Coming Soon
            </span>
          </div>
        );
      case "limited":
        return (
          <div className="flex items-center space-x-1">
            <GearIcon className="w-4 h-4 text-slate-600" />
            <span className="text-xs font-medium text-slate-600">Limited</span>
          </div>
        );
      default:
        return <span className="text-xs font-medium">{value}</span>;
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("products")} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 text-slate-800 overflow-hidden">
        {/* Hero Section */}
        <section className="relative text-center py-20 px-6 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-emerald-700 mb-6">
                D-Secure Data Erasure Solutions
              </h1>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="max-w-4xl mx-auto text-xl sm:text-2xl text-slate-600 mb-8 leading-relaxed">
                Enterprise-grade drive and file erasure software trusted by
                global organizations for secure, certified data destruction.
              </p>
            </Reveal>
            <Reveal delayMs={200}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                <Link
                  to="/contact?request=free-license"
                  className="inline-flex items-center px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-2xl hover:shadow-2xl hover:scale-105 text-lg"
                >
                  Request Free License
                  <ArrowRightIcon className="ml-3 w-5 h-5" />
                </Link>
                <Link
                  to="/pricing-and-plan"
                  className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-emerald-600 text-emerald-700 font-bold hover:bg-emerald-50 transition-all text-lg"
                >
                  Buy Licenses
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Trust Bar
        <section className="py-12 bg-white border-y border-emerald-100">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-sm uppercase tracking-wider text-slate-500 mb-8 font-semibold">
              Trusted By Global Companies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {Array.from({ length: 16 }).map((_, index) => (
                <div
                  key={index}
                  className="w-20 h-10 bg-slate-300 rounded-lg flex items-center justify-center text-slate-600 font-semibold text-sm"
                >
                  Client {index + 1}
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Product Cards */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
          <div className="grid lg:grid-cols-2 gap-8 h-full">
            {/* Product 1 - Drive Eraser */}
            <Reveal>
              <div className="flex flex-col h-full bg-white rounded-3xl shadow-2xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 p-10 border border-emerald-100 group relative overflow-hidden">
                <div className="absolute top-6 right-6 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
                <div className="flex-none">
                  <DatabaseIcon className="w-16 h-16 text-emerald-600 mb-6 transition-transform group-hover:scale-110" />
                  <h3 className="text-3xl font-bold mb-2 text-slate-900">
                    D-Secure Drive Eraser
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed text-lg font-semibold">
                    Secure Drive Wiping Software
                  </p>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Wipe Hard Drive, SSD, PC, Laptop, Mac® & Server. Deploy via
                    USB & PXE Boot on Supported Devices.
                  </p>
                </div>

                {/* Certifications */}
                <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    Tested & Approved
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                    <div className="text-center p-2 bg-white rounded border">
                      <div className="font-semibold text-emerald-700">
                        NIST Compliance
                      </div>
                    </div>
                    <div className="text-center p-2 bg-white rounded border">
                      <div className="font-semibold text-emerald-700">
                        Common Criteria Approved
                      </div>
                    </div>
                    <div className="text-center p-2 bg-white rounded border">
                      <div className="font-semibold text-emerald-700">
                        ADISA Approved
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 flex-1">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4">
                      Key Features
                    </h4>
                    <ul className="text-slate-700 space-y-3 text-sm">
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        26 Global Erasure Standards
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        Cloud Console Integration
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        USB, PXE Boot & MSI Deployment
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        Digitally Signed Certificates
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        API & ERP Integration
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        Autopilot Detection
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4">
                      Technical Specs
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-600">
                          Supported Devices
                        </span>
                        <span className="font-semibold">1000+ Models</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-600">Erasure Methods</span>
                        <span className="font-semibold">26 Standards</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-600">Deployment</span>
                        <span className="font-semibold">USB, PXE, MSI</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-600">Licenses</span>
                        <span className="font-semibold">Never Expire</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Key Benefits
                  </h4>
                  <ul className="text-slate-700 space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-600" />
                      Safeguard Privacy & Mitigate Risks
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-600" />
                      Prevent Data Thefts & Leakage
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-600" />
                      Get Maximum Resale Value
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-600" />
                      Compliance with Global Standards
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    Starting at $299
                  </div>
                  <div className="text-slate-600">
                    Pay-per-use licenses that never expire
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Link
                    to="/contact?request=free-license&product=drive-eraser"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all group-hover:translate-x-1 text-center"
                  >
                    Request Free License
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/pricing-and-plan?product=drive-eraser"
                    className="flex-1 inline-flex items-center justify-center px-6 py-4 rounded-xl border-2 border-emerald-600 text-emerald-700 font-semibold hover:bg-emerald-50 transition-all text-center"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Product 2 - File Eraser */}
            <Reveal delayMs={100}>
              <div className="flex flex-col h-full bg-white rounded-3xl shadow-2xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 p-10 border border-emerald-100 group relative overflow-hidden">
                <div className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  BEST RATED
                </div>
                <div className="flex-none">
                  <ServerIcon className="w-16 h-16 text-emerald-600 mb-6 transition-transform group-hover:scale-110" />
                  <h3 className="text-3xl font-bold mb-2 text-slate-900">
                    D-Secure File Eraser
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed text-lg font-semibold">
                    File & Folder Erasure Software
                  </p>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Wipe Files from Windows, Mac, & Linux Systems. Also Wipe
                    Servers & Data on Domain Network Connected Computers via
                    Network Edition.
                  </p>
                </div>

                {/* Award */}
                <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-2 text-center">
                    Best File Erasure Software
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 flex-1">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4">
                      Key Features
                    </h4>
                    <ul className="text-slate-700 space-y-3 text-sm">
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        File & Folder Erasure
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        Browser History Cleaning
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        Volume Erasure
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        Network Edition Available
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        Scheduled Automation
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        No System Downtime
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4">
                      Platform Support
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-600">Windows</span>
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-600">Mac</span>
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-600">Linux</span>
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-600">Network</span>
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Use Cases
                  </h4>
                  <ul className="text-slate-700 space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-600" />
                      Protecting Data Privacy
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-600" />
                      Free-Up Disk Space
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-600" />
                      Security and Compliance
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-600" />
                      Regular Data Hygiene
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    Starting at $149
                  </div>
                  <div className="text-slate-600">
                    Individual & enterprise licenses available
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Link
                    to="/contact?request=free-license&product=file-eraser"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all group-hover:translate-x-1 text-center"
                  >
                    Request Free License
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/pricing-and-plan?product=file-eraser"
                    className="flex-1 inline-flex items-center justify-center px-6 py-4 rounded-xl border-2 border-emerald-600 text-emerald-700 font-semibold hover:bg-emerald-50 transition-all text-center"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Ideal For Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 text-center">
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-12">
                IDEAL FOR ENTERPRISE, GOVERNMENT, SMB & ITAD
              </h2>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="text-lg text-slate-600 mb-8 max-w-4xl mx-auto">
                Wipe Hard Drives, SSDs & Devices Onsite, Offsite & Remotely.
                D-Secure serves your needs for a certified data wiping solution
                that assures permanent erasure of drives & devices.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  SCALABLE, MANAGEABLE & COST EFFECTIVE
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Comprehensive data erasure solutions designed for
                  enterprise-scale deployment
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <ShieldIcon className="w-14 h-14 text-emerald-600 mb-4 transition-transform group-hover:scale-110" />
                  ),
                  title: "Secure & Certified Data Erasure",
                  description:
                    "Permanently wipes data beyond recovery from SSD, HDD, PC, Laptop, Mac, Chromebook & Servers with Common Criteria, NIST & ADISA certifications.",
                },
                {
                  icon: (
                    <CloudIcon className="w-14 h-14 text-emerald-600 mb-4 transition-transform group-hover:scale-110" />
                  ),
                  title: "Cloud Console Management",
                  description:
                    "Create/edit users, manage license distribution & maintain central repository of reports. Private Cloud available at additional cost.",
                },
                {
                  icon: (
                    <ServerIcon className="w-14 h-14 text-emerald-600 mb-4 transition-transform group-hover:scale-110" />
                  ),
                  title: "26 Global Wiping Standards",
                  description:
                    "Supports international erasure methods including NIST 800-88, DoD 3 & 7 Passes, IEEE 2883:2022 with Random & Total verification.",
                },
                {
                  icon: (
                    <DatabaseIcon className="w-14 h-14 text-emerald-600 mb-4 transition-transform group-hover:scale-110" />
                  ),
                  title: "Flexible Deployment Options",
                  description:
                    "Deploy via USB, PXE Boot or MSI. Offline variant available for non-internet locations. Remote wiping via endpoint management systems.",
                },
                {
                  icon: (
                    <CheckIcon className="w-14 h-14 text-emerald-600 mb-4 transition-transform group-hover:scale-110" />
                  ),
                  title: "Certified Compliance",
                  description:
                    "100% tamper-proof digitally signed certificate of destruction for compliance with GDPR, CCPA, ISO 27001 & more.",
                },
                {
                  icon: (
                    <GearIcon className="w-14 h-14 text-emerald-600 mb-4 transition-transform group-hover:scale-110" />
                  ),
                  title: "Automated Workflows",
                  description:
                    "Fully automate media sanitization using ISO customization. Streamline workflows and eliminate human errors.",
                },
              ].map((feature, index) => (
                <Reveal key={index} delayMs={index * 100}>
                  <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 h-full">
                    <div className="flex flex-col items-start">
                      {feature.icon}
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Comparison Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  Complete Feature & Services Pricing Sheet
                </h2>
                <p className="text-lg text-slate-600 mb-6 max-w-4xl mx-auto">
                  Comprehensive comparison of all data erasure features across
                  our complete product lineup. Explore detailed capabilities,
                  platform support, enterprise-grade security features, and
                  compliance standards.
                </p>
                <p className="text-slate-500 max-w-2xl mx-auto">
                  Professional data sanitization with verifiable compliance
                  reporting • Custom enterprise pricing available
                </p>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delayMs={100}>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">6</div>
                  <div className="text-sm text-slate-600">Service Tiers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">75+</div>
                  <div className="text-sm text-slate-600">Features</div>
                </div>
                <div className="text-center">
                  <CheckIcon className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                  <div className="text-sm text-slate-600">Enterprise Ready</div>
                </div>
                <div className="text-center">
                  <ShieldIcon className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                  <div className="text-sm text-slate-600">NIST Compliant</div>
                </div>
                <div className="text-center">
                  <CloudIcon className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                  <div className="text-sm text-slate-600">Global Standards</div>
                </div>
                <div className="text-center">
                  <ServerIcon className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                  <div className="text-sm text-slate-600">Multi-Platform</div>
                </div>
              </div>
            </Reveal>

            {/* Pricing Table */}
            <Reveal delayMs={200}>
              <div className="bg-slate-50 rounded-2xl shadow-lg overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-7 gap-0 bg-emerald-600 text-white">
                  <div className="p-6 font-semibold">Feature</div>
                  {pricingPlans.map((plan, index) => (
                    <div key={plan.name} className="p-6 text-center relative">
                      <div className="font-bold text-lg">{plan.name}</div>
                      {plan.tag && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                          {plan.tag}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Platform & OS Support Section */}
                <div className="border-b border-slate-200">
                  <button
                    onClick={() => toggleSection("platform")}
                    className="w-full p-6 text-left bg-slate-100 hover:bg-slate-200 transition-colors flex justify-between items-center"
                  >
                    <span className="font-semibold text-slate-900">
                      Platform & OS Support
                    </span>
                    {expandedSections.platform ? (
                      <ArrowRightIcon className="w-5 h-5 rotate-[-90deg]" />
                    ) : (
                      <ArrowRightIcon className="w-5 h-5 rotate-90" />
                    )}
                  </button>
                  {expandedSections.platform && (
                    <div className="bg-white">
                      {features.platform.map((feature, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-7 gap-0 border-b border-slate-100 last:border-b-0"
                        >
                          <div className="p-4 border-r border-slate-100 text-sm text-slate-700 flex items-center">
                            {feature.name}
                          </div>
                          {pricingPlans.map((plan) => (
                            <div
                              key={plan.name}
                              className="p-4 border-r border-slate-100 last:border-r-0 text-center flex items-center justify-center"
                            >
                              {renderFeatureIcon(
                                feature[
                                  plan.name.toLowerCase() as keyof typeof feature
                                ]
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Core Erasure Capabilities Section */}
                <div className="border-b border-slate-200">
                  <button
                    onClick={() => toggleSection("core")}
                    className="w-full p-6 text-left bg-slate-100 hover:bg-slate-200 transition-colors flex justify-between items-center"
                  >
                    <span className="font-semibold text-slate-900">
                      Core Erasure Capabilities
                    </span>
                    {expandedSections.core ? (
                      <ArrowRightIcon className="w-5 h-5 rotate-[-90deg]" />
                    ) : (
                      <ArrowRightIcon className="w-5 h-5 rotate-90" />
                    )}
                  </button>
                  {expandedSections.core && (
                    <div className="bg-white">
                      {features.core.map((feature, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-7 gap-0 border-b border-slate-100 last:border-b-0"
                        >
                          <div className="p-4 border-r border-slate-100 text-sm text-slate-700 flex items-center">
                            {feature.name}
                          </div>
                          {pricingPlans.map((plan) => (
                            <div
                              key={plan.name}
                              className="p-4 border-r border-slate-100 last:border-r-0 text-center flex items-center justify-center"
                            >
                              {renderFeatureIcon(
                                feature[
                                  plan.name.toLowerCase() as keyof typeof feature
                                ]
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reporting & Compliance Section */}
                <div className="border-b border-slate-200">
                  <button
                    onClick={() => toggleSection("reporting")}
                    className="w-full p-6 text-left bg-slate-100 hover:bg-slate-200 transition-colors flex justify-between items-center"
                  >
                    <span className="font-semibold text-slate-900">
                      Reporting & Compliance
                    </span>
                    {expandedSections.reporting ? (
                      <ArrowRightIcon className="w-5 h-5 rotate-[-90deg]" />
                    ) : (
                      <ArrowRightIcon className="w-5 h-5 rotate-90" />
                    )}
                  </button>
                  {expandedSections.reporting && (
                    <div className="bg-white">
                      {features.reporting.map((feature, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-7 gap-0 border-b border-slate-100 last:border-b-0"
                        >
                          <div className="p-4 border-r border-slate-100 text-sm text-slate-700 flex items-center">
                            {feature.name}
                          </div>
                          {pricingPlans.map((plan) => (
                            <div
                              key={plan.name}
                              className="p-4 border-r border-slate-100 last:border-r-0 text-center flex items-center justify-center"
                            >
                              {renderFeatureIcon(
                                feature[
                                  plan.name.toLowerCase() as keyof typeof feature
                                ]
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Services & Management Section */}
                <div className="border-b border-slate-200">
                  <button
                    onClick={() => toggleSection("services")}
                    className="w-full p-6 text-left bg-slate-100 hover:bg-slate-200 transition-colors flex justify-between items-center"
                  >
                    <span className="font-semibold text-slate-900">
                      Services & Management
                    </span>
                    {expandedSections.services ? (
                      <ArrowRightIcon className="w-5 h-5 rotate-[-90deg]" />
                    ) : (
                      <ArrowRightIcon className="w-5 h-5 rotate-90" />
                    )}
                  </button>
                  {expandedSections.services && (
                    <div className="bg-white">
                      {features.services.map((feature, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-7 gap-0 border-b border-slate-100 last:border-b-0"
                        >
                          <div className="p-4 border-r border-slate-100 text-sm text-slate-700 flex items-center">
                            {feature.name}
                          </div>
                          {pricingPlans.map((plan) => (
                            <div
                              key={plan.name}
                              className="p-4 border-r border-slate-100 last:border-r-0 text-center flex items-center justify-center"
                            >
                              {renderFeatureIcon(
                                feature[
                                  plan.name.toLowerCase() as keyof typeof feature
                                ]
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add-Ons Section */}
                <div className="border-b border-slate-200">
                  <button
                    onClick={() => toggleSection("addons")}
                    className="w-full p-6 text-left bg-slate-100 hover:bg-slate-200 transition-colors flex justify-between items-center"
                  >
                    <span className="font-semibold text-slate-900">
                      Add-On / Optional Customization
                    </span>
                    {expandedSections.addons ? (
                      <ArrowRightIcon className="w-5 h-5 rotate-[-90deg]" />
                    ) : (
                      <ArrowRightIcon className="w-5 h-5 rotate-90" />
                    )}
                  </button>
                  {expandedSections.addons && (
                    <div className="bg-white">
                      {features.addons.map((feature, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-7 gap-0 border-b border-slate-100 last:border-b-0"
                        >
                          <div className="p-4 border-r border-slate-100 text-sm text-slate-700 flex items-center">
                            {feature.name}
                          </div>
                          {pricingPlans.map((plan) => (
                            <div
                              key={plan.name}
                              className="p-4 border-r border-slate-100 last:border-r-0 text-center flex items-center justify-center"
                            >
                              {renderFeatureIcon(
                                feature[
                                  plan.name.toLowerCase() as keyof typeof feature
                                ]
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pricing Footer */}
                <div className="bg-white p-8">
                  <div className="grid grid-cols-6 gap-4">
                    {pricingPlans.map((plan, index) => (
                      <div key={plan.name} className="text-center">
                        <div className="mb-4">
                          <div className="text-sm text-slate-600 mb-2">
                            Starting at
                          </div>
                          <div className="text-2xl font-bold text-emerald-600">
                            Contact Sales
                          </div>
                        </div>
                        <Link
                          to="/contact"
                          className="inline-block w-full py-3 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold"
                        >
                          {plan.name} Plan
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Link
                        to="/contact"
                        className="px-8 py-4 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors font-semibold"
                      >
                        Request Custom Quote
                      </Link>
                      <Link
                        to="/free-trial"
                        className="px-8 py-4 border-2 border-emerald-600 text-emerald-700 rounded-xl hover:bg-emerald-50 transition-colors font-semibold"
                      >
                        Try Enterprise Free for 1 Device (14 Days)
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-20 px-6 sm:px-10 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Secure Your Data Destruction Process?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-emerald-100 mb-8">
              Join thousands of enterprises worldwide that trust D-Secure for
              certified, compliant data erasure solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-emerald-700 font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg"
              >
                Request Free License
                <ArrowRightIcon className="ml-3 w-5 h-5" />
              </Link>
              <Link
                to="/pricing-and-plan"
                className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-white text-white font-bold hover:bg-white hover:text-emerald-700 transition-all text-lg"
              >
                Buy Licenses Now
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
};

export default ProductPage;
