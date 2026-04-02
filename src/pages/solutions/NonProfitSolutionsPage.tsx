import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm } from "@/components/forms";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import SolutionContactSection from "@/components/SolutionContactSection";

/**
 * NonProfitSolutionsPage Component
 * Non-Profit Organizations (NGOs/Charities) ke liye data erasure solutions.
 * HealthcareSolutionsPage ke theme par based hai.
 * Content bitraser non-profit page se inspired hai — bina unke naam ya claims use kiye.
 */
const NonProfitSolutionsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  // Secondary navbar ke items
  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "use-cases", label: "Use Cases" },
    { id: "assets", label: "Assets" },
    { id: "compliance", label: "Compliance" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  // Scroll handle karne ke liye useEffect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        window.dispatchEvent(
          new CustomEvent("stickyNavVisible", {
            detail: { visible: shouldShow },
          }),
        );
      }

      const sections = sectionNavItems.map((item) =>
        document.getElementById(item.id),
      );
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop - 150 <= scrollPosition) {
          setActiveSection(sectionNavItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        window.dispatchEvent(
          new CustomEvent("stickyNavVisible", { detail: { visible: false } }),
        );
      }
    };
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <SEOHead seo={getSEOForPage("solutions/non-profit")} />

      {/* ================= STICKY SECTION NAV ================= */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white border-b border-emerald-100 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <Link
                to="/"
                className="flex items-center"
                aria-label="Return to D-Secure Homepage"
              >
                <ThemeAwareLogo
                  className="h-7 sm:h-8 w-auto"
                  responsive={true}
                />
              </Link>
              <nav className="flex items-center gap-1 overflow-x-auto py-2">
                {sectionNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-emerald-500 text-white shadow-md"
                        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* ================= HERO SECTION ================= */}
        <section
          id="overview"
          className="min-h-[600px] flex items-start pt-8 lg:pt-12 pb-8 lg:pb-12 relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl opacity-20 -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-3xl opacity-20 -ml-64 -mb-64"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Left Column: Content */}
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm border border-emerald-200">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Secure Data Disposal for Social Impact</span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                    Solutions for
                    <span className="block bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent pb-1">
                      Non-Profit Organizations
                    </span>
                  </h1>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  Comply with data privacy laws by securely erasing sensitive
                  donor, beneficiary, and financial records from drives and
                  devices before reuse, donation, or disposal. D-Secure helps
                  NGOs and charities protect community trust through
                  cost-effective, audit-ready data sanitization.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => setShowLicenseModal(true)}
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-emerald-200/50 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Request Free License
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
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-700 px-8 py-4 rounded-xl font-bold bg-white transition-all duration-300 shadow-lg pointer-events-none opacity-50 cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                    Solution Overview
                  </a>
                </div>

                {/* Compliance Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-emerald-100/50">
                  {["NIST 800-88", "GDPR", "HIPAA", "ISO 27001"].map(
                    (badge) => (
                      <div
                        key={badge}
                        className="flex items-center gap-2 bg-white/80 px-2.5 py-1.5 rounded-full shadow-sm border border-emerald-50"
                      >
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">
                          {badge}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Right Column: Non-Profit Ecosystem Graphic */}
              <div className="relative w-full max-w-lg mx-auto overflow-visible">
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-visible p-1 lg:p-2">
                  {/* Illustration canvas */}
                  <div
                    className="relative bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-2xl overflow-visible shadow-inner"
                    style={{ height: "340px" }}
                  >
                    {/* Animated dotted connection lines */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                      viewBox="0 0 400 340"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {/* TOP CENTER */}
                      <line x1="200" y1="125" x2="200" y2="60" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.5s" repeatCount="indefinite" />
                      </line>
                      {/* MIDDLE LEFT */}
                      <line x1="148" y1="170" x2="55" y2="170" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.8s" repeatCount="indefinite" />
                      </line>
                      {/* MIDDLE RIGHT */}
                      <line x1="252" y1="170" x2="345" y2="170" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.6s" repeatCount="indefinite" />
                      </line>
                      {/* BOTTOM LEFT */}
                      <line x1="165" y1="205" x2="60" y2="280" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="2s" repeatCount="indefinite" />
                      </line>
                      {/* BOTTOM RIGHT */}
                      <line x1="235" y1="205" x2="340" y2="280" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.7s" repeatCount="indefinite" />
                      </line>
                    </svg>

                    {/* CENTER: Community/NGO Hub with Heart + Shield */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] z-10 transition-transform hover:scale-105 duration-500">
                      <svg
                        width="90"
                        height="90"
                        viewBox="0 0 72 72"
                        fill="none"
                        className="drop-shadow-[0_12px_24px_rgba(16,185,129,0.35)]"
                      >
                        {/* Shield shape */}
                        <path
                          d="M36 6 L58 16 L58 38 C58 50 48 60 36 66 C24 60 14 50 14 38 L14 16 Z"
                          fill="#10b981"
                        />
                        <path
                          d="M36 10 L54 18 L54 38 C54 48 46 56 36 62 C26 56 18 48 18 38 L18 18 Z"
                          fill="#059669"
                        />
                        {/* Heart inside shield */}
                        <path
                          d="M36 28 C36 24 30 20 26 24 C22 28 26 34 36 42 C46 34 50 28 46 24 C42 20 36 24 36 28Z"
                          fill="#d1fae5"
                        />
                        {/* Text label */}
                        <text
                          x="36"
                          y="54"
                          textAnchor="middle"
                          fill="white"
                          fontSize="4.5"
                          fontWeight="900"
                          fontFamily="sans-serif"
                        >
                          NGO
                        </text>
                      </svg>
                    </div>

                    {/* TOP CENTER: PC/Mac */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 top-[10px] left-1/2 -translate-x-1/2">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">
                        PC/MAC
                      </span>
                    </div>

                    {/* MIDDLE LEFT: Laptop */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 top-1/2 left-[5px] -translate-y-1/2">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="13" rx="2" />
                        <path d="M2 19h20" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">
                        LAPTOP
                      </span>
                    </div>

                    {/* MIDDLE RIGHT: Server */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 top-1/2 right-[5px] -translate-y-1/2">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="8" rx="2" />
                        <rect x="2" y="14" width="20" height="8" rx="2" />
                        <circle cx="7" cy="6" r="1" fill="#16a34a" stroke="none" />
                        <circle cx="7" cy="18" r="1" fill="#16a34a" stroke="none" />
                        <line x1="11" y1="6" x2="17" y2="6" />
                        <line x1="11" y1="18" x2="17" y2="18" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">
                        SERVER
                      </span>
                    </div>

                    {/* BOTTOM LEFT: Mobile */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 bottom-[10px] left-[5px]">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" />
                        <circle cx="12" cy="17" r="1" fill="#0d9488" stroke="none" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">
                        MOBILE
                      </span>
                    </div>

                    {/* BOTTOM RIGHT: Storage/HDD */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 bottom-[10px] right-[5px]">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="10" rx="2" />
                        <circle cx="17" cy="12" r="1.5" fill="#16a34a" stroke="none" />
                        <line x1="5" y1="10" x2="12" y2="10" />
                        <line x1="5" y1="14" x2="9" y2="14" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">
                        STORAGE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= USE CASES SECTION ================= */}
        <section
          id="use-cases"
          className="py-20"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div
                className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "#e8f5e9", color: "#059669" }}
              >
                Use Cases
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: "#1f2937" }}
              >
                Reliable, Efficient & Cost-Effective Data Wiping
              </h2>
              <p
                className="text-lg max-w-3xl mx-auto"
                style={{ color: "#6b7280" }}
              >
                Whether you are donating devices, retiring legacy systems, or
                managing beneficiary records, D-Secure ensures your
                organization's data never falls into the wrong hands.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Device Donation & Reuse",
                  desc: "Securely wipe drives and devices using globally recognized erasure standards before donating them for a noble cause. Permanently remove donor, beneficiary, and financial records before reuse.",
                  icon: "🎁",
                },
                {
                  title: "Bulk Erasure at Remote Locations",
                  desc: "Wipe 100 drives in a chassis or up to 65,000 over a network using PXE boot. Deploy erasure at facilities without internet through offline USB boot.",
                  icon: "🌍",
                },
                {
                  title: "Automated File-Level Erasure",
                  desc: "Schedule erasure of sensitive files, funding details, and PII at regular intervals. Erase specific records without affecting the operating system or other applications.",
                  icon: "📄",
                },
                {
                  title: "Mobile Device Management",
                  desc: "Simultaneously erase and diagnose up to 40 iOS and Android devices. Safely reuse donated phones for field staff and volunteers after certified data erasure.",
                  icon: "📱",
                },
                {
                  title: "Cloud Console Management",
                  desc: "Centralized admin console for managing users, licenses, and reports. Customize ISO to standardize erasure across all branch locations worldwide.",
                  icon: "☁️",
                },
                {
                  title: "Remote Endpoint Wiping",
                  desc: "Remotely wipe data from Windows endpoint devices via MSI package. Deploy locally or through management tools without physical access to computers.",
                  icon: "🔗",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-8 rounded-2xl border bg-slate-50 hover:shadow-lg transition-all group"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#1f2937" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6b7280" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SUPPORTED ASSETS SECTION ================= */}
        <section id="assets" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div
                className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "#e8f5e9", color: "#059669" }}
              >
                Device Support
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: "#1f2937" }}
              >
                One Solution for All Device Types
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: "#6b7280" }}
              >
                Sanitize donor records and beneficiary data from any device —
                whether at your main office or remote field locations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "💻",
                  title: "PCs, Laptops & Macs",
                  desc: "Securely wipe Windows, Mac, and Chromebooks. Support for Apple Silicon (M1–M4) and Intel-based Macs.",
                },
                {
                  icon: "💾",
                  title: "Drives of All Types",
                  desc: "Erase SATA, PATA, HDD, SSD, NVMe, and M.2 drives. Wipes user-inaccessible areas like HPA & DCO.",
                },
                {
                  icon: "🗄️",
                  title: "Servers & Data Centers",
                  desc: "Centralized wiping of up to 65,000 server drives simultaneously over a network using PXE boot.",
                },
                {
                  icon: "📱",
                  title: "Mobile Devices",
                  desc: "Certified erasure for iOS and Android phones and tablets. 50+ diagnostic tests for device health assessment.",
                },
              ].map((asset) => (
                <div
                  key={asset.title}
                  className="text-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div className="text-5xl mb-4">{asset.icon}</div>
                  <h4
                    className="text-lg font-bold mb-2"
                    style={{ color: "#1f2937" }}
                  >
                    {asset.title}
                  </h4>
                  <p className="text-sm" style={{ color: "#6b7280" }}>
                    {asset.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= COMPLIANCE SECTION ================= */}
        <section
          id="compliance"
          className="py-20"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  className="text-3xl md:text-4xl font-bold mb-6"
                  style={{ color: "#1f2937" }}
                >
                  Audit-Ready Compliance for Non-Profits
                </h2>
                <p className="text-lg mb-8" style={{ color: "#4b5563" }}>
                  Generate verifiable, tamper-proof audit trails for every
                  sanitized asset. Meet data privacy laws that mandate secure
                  disposal — whether for funding organizations, board reporting,
                  or partner transparency requirements.
                </p>
                <ul className="space-y-4">
                  {[
                    "Tamper-proof erasure certificates for audit purposes",
                    "Compliance with EU-GDPR, HIPAA, PCI-DSS, CCPA & DPDPA",
                    "Software-based certificates as proof of secure sanitization",
                    "Centralized cloud repository for all reports & certificates",
                    "ISO customization to standardize erasure across locations",
                  ].map((item) => (
                    <li key={item} className="flex items-start space-x-3">
                      <svg
                        className="w-5 h-5 text-emerald-500 mt-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span style={{ color: "#4b5563" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 shadow-inner">
                <h3
                  className="text-2xl font-bold mb-6"
                  style={{ color: "#065f46" }}
                >
                  Why Choose D-Secure?
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">
                      Sustainable Data Disposal
                    </h4>
                    <p className="text-sm text-emerald-800">
                      Securely sanitize devices for donation and reuse instead of
                      physical destruction — reducing e-waste and extending
                      device lifecycles.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">
                      Cost-Effective for NGOs
                    </h4>
                    <p className="text-sm text-emerald-800">
                      Licenses never expire. Use them whenever required for
                      projects without worrying about deadlines or recurring
                      costs.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">
                      Global Scalability
                    </h4>
                    <p className="text-sm text-emerald-800">
                      From a single office workstation to 65,000 distributed
                      servers — D-Secure scales with your organization's mission.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">
                      Offline & Remote Support
                    </h4>
                    <p className="text-sm text-emerald-800">
                      Perform erasure at facilities without internet using USB
                      boot. Reports are saved locally and can be synced later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section id="faq" className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "#1f2937" }}
              >
                Frequently Asked Questions
              </h2>
              <p style={{ color: "#6b7280" }}>
                Common queries about data sanitization for Non-Profit
                Organizations
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "How many drives can we wipe simultaneously?",
                  a: "You can wipe up to 100 drives at a time on a single machine using USB boot. For network-based erasure, you can simultaneously wipe up to 65,000 drives over PXE boot, making it ideal for large-scale operations across multiple offices.",
                },
                {
                  q: "Do D-Secure licenses expire?",
                  a: "No, D-Secure licenses do not expire. You have the freedom to use purchased licenses whenever required for your projects without worrying about a deadline or recurring subscription costs.",
                },
                {
                  q: "Can we perform erasure at locations without internet access?",
                  a: "Yes, our standalone USB boot solution enables secure drive wiping at facilities without internet connectivity. Reports are saved locally and can be synced to the cloud console when connectivity is available.",
                },
                {
                  q: "Does D-Secure help with regulatory compliance?",
                  a: "Yes. D-Secure performs secure erasure on devices and generates verifiable audit trails that help comply with global data protection laws like EU-GDPR, HIPAA, CCPA, GLBA, and DPDPA. Every erasure produces a tamper-proof certificate.",
                },
                {
                  q: "Can we customize the erasure reports with our organization's branding?",
                  a: "Yes, you can customize the ISO and erasure reports through the cloud console. This standardizes erasure at all locations, and you can add your organization's logo and watermarking to the generated reports.",
                },
                {
                  q: "Is there support for mobile device erasure and diagnostics?",
                  a: "Yes, D-Secure supports simultaneous erasure and diagnostics of up to 40 iOS and Android devices. You can run 50+ health-check tests to assess device condition before deciding on reuse or disposal.",
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all border"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span
                      className="text-lg font-semibold"
                      style={{ color: "#1f2937" }}
                    >
                      {faq.q}
                    </span>
                    <svg
                      className="w-5 h-5 group-open:rotate-180 transition-transform"
                      style={{ color: "#059669" }}
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
                  </summary>
                  <p
                    className="mt-4 leading-relaxed"
                    style={{ color: "#6b7280" }}
                  >
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <SolutionContactSection source="Non-Profit Solutions Page" subjectPrefix="New Inquiry - Non-Profit Solutions" />
      </div>

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onClose={() => setShowLicenseModal(false)}
          title="Request Free License - Non-Profit"
        />
      )}
    </>
  );
};

export default NonProfitSolutionsPage;
