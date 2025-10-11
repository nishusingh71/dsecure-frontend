import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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

  // Optional: Programmatic navigation function for plan buttons
  const handlePlanClick = (planName: string) => {
    const queryParams = new URLSearchParams({
      plan: planName.toLowerCase(),
      product: 'file-eraser',
      section: 'file-eraser'
    });
    navigate(`/pricing-and-plan?${queryParams.toString()}`);
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
          <svg
            className="w-4 h-4 text-red-500"
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
                  to="/contact?request=free-demo"
                  className="inline-flex items-center px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-2xl hover:shadow-2xl hover:scale-105 text-lg"
                >
                  Request Free Demo
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

        {/* Product Cards */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
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
                          USB, PXE Boot & EXE
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckIcon className="w-4 h-4 text-emerald-600" />
                          Digitally Signed Certificates
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-4">
                        Technical Specs
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">Supported Types</span>
                          <span className="font-semibold">HDD,SSD,NVME,etc</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">Erasure Methods</span>
                          <span className="font-semibold">26 Standards</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">Deployment</span>
                          <span className="font-semibold">USB,EXE</span>
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
                      Starting at $20
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
                      Request Free Demo
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
                          Windows, Mac & Linux Support
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckIcon className="w-4 h-4 text-emerald-600" />
                          Google Drive Erasure
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckIcon className="w-4 h-4 text-emerald-600" />
                          Comprehensive Reporting
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
                          <span className="font-semibold">Full Support</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">macOS</span>
                          <span className="font-semibold">Full Support</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">Linux</span>
                          <span className="font-semibold">Full Support</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">Cloud</span>
                          <span className="font-semibold">Enterprise</span>
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
                        Individual Users & Personal Files
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        Corporate Data Protection
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        Cloud Erasure
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        Compliance & Audit Requirements
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      Starting at $40
                    </div>
                    <div className="text-slate-600">
                      Individual & enterprise licenses available
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Link
                      to="/contact?request=free-demo&product=file-eraser"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all group-hover:translate-x-1 text-center"
                    >
                      Request Free Demo
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
          </div>
        </section>

        {/* --- Features & Plans for File Eraser --- */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  File Eraser – Features & Plans
                </h2>
                <p className="text-lg text-slate-600 mb-6 max-w-4xl mx-auto">
                  Compare all features and plans for D-Secure File Eraser. For Drive Eraser, see services below.
                </p>
              </div>
            </Reveal>

            {/* Pricing Table for File Eraser */}
            <Reveal delayMs={100}>
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

                {/* Pricing Footer with Plan Buttons */}
                <div className="bg-white p-8">
                  <div className="grid grid-cols-6 gap-4">
                    {pricingPlans.map((plan, index) => (
                      <Link
                        key={plan.name}
                        to={`/pricing-and-plan?plan=${plan.name.toLowerCase()}&product=file-eraser&section=file-eraser`}
                        className="inline-flex items-center justify-center px-4 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all text-center w-full"
                      >
                        {plan.name} Plan
                      </Link>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Link
                        to="/contact?request=free-demo&product=file-eraser"
                        className="inline-flex items-center px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl text-lg"
                      >
                        Request Free Demo
                        <ArrowRightIcon className="ml-3 w-5 h-5" />
                      </Link>
                      <Link
                        to="/pricing-and-plan?product=file-eraser"
                        className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-emerald-600 text-emerald-700 font-bold hover:bg-emerald-50 transition-all text-lg"
                      >
                        Buy Licenses
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* --- Services Table for File & Drive Eraser --- */}
            <Reveal delayMs={200}>
              <div className="mt-20 bg-slate-50 rounded-2xl shadow-lg overflow-hidden">
                <div className="text-center py-10">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Services – Available for File & Drive Eraser</h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    The following services are available for both File Eraser and Drive Eraser products.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-emerald-600 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Service</th>
                        <th className="px-6 py-4 text-center font-semibold">File Eraser</th>
                        <th className="px-6 py-4 text-center font-semibold">Drive Eraser</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      <tr>
                        <td className="px-6 py-4">Web Dashboard</td>
                        <td className="px-6 py-4 text-center">{renderFeatureIcon("check")}</td>
                        <td className="px-6 py-4 text-center">{renderFeatureIcon("check")}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Cloud Commands (Remote Jobs)</td>
                        <td className="px-6 py-4 text-center">{renderFeatureIcon("check")}</td>
                        <td className="px-6 py-4 text-center">{renderFeatureIcon("check")}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Custom Installer (auto-register machine)</td>
                        <td className="px-6 py-4 text-center">{renderFeatureIcon("check")}</td>
                        <td className="px-6 py-4 text-center">{renderFeatureIcon("check")}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Private Cloud Support</td>
                        <td className="px-6 py-4 text-center">{renderFeatureIcon("check")}</td>
                        <td className="px-6 py-4 text-center">{renderFeatureIcon("check")}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Multi-Level User Logs</td>
                        <td className="px-6 py-4 text-center">{renderFeatureIcon("check")}</td>
                        <td className="px-6 py-4 text-center">{renderFeatureIcon("check")}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">White-Label Dashboard</td>
                        <td className="px-6 py-4 text-center">{renderFeatureIcon("check")}</td>
                        <td className="px-6 py-4 text-center">{renderFeatureIcon("check")}</td>
                      </tr>
                    </tbody>
                  </table>
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
                Request Free Demo
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