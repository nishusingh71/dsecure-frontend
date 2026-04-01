import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HardDriveIcon, MobileIcon, ServerIcon, CheckIcon, ShieldIcon, ArrowRightIcon } from "@/components/FlatIcons";
import { Laptop, Database } from "lucide-react";
import Reveal from "@/components/Reveal";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm } from "@/components/forms";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";

/**
 * BankBuildingIcon Component
 * Yeh screenshot ke mutabiq classic Bank Building design dikhata hai.
 */
const BankBuildingIcon: React.FC = () => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="relative w-48 lg:w-64 h-40 lg:h-52 flex flex-col items-center justify-center group"
  >
    {/* Triangular Roof (Pediment) */}
    <div className="relative w-full h-1/4 flex items-end justify-center">
      <svg className="w-full h-full drop-shadow-md" viewBox="0 0 200 60" preserveAspectRatio="none">
        <path 
          d="M 0 60 L 100 0 L 200 60 Z" 
          fill="#10b981" 
          stroke="#059669" 
          strokeWidth="1.5"
        />
      </svg>
      {/* BANK Text inside the triangle - Refined Typography & Visibility */}
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="text-[11px] lg:text-[13px] font-black tracking-[0.3em] text-white uppercase drop-shadow-sm">Bank</span>
      </div>
    </div>

    {/* Architrave / Top Beam */}
    <div className="w-[96%] h-3 bg-white border border-slate-200 shadow-sm relative z-20 -mt-0.5"></div>

    {/* Pillars - Thinner for more professional look */}
    <div className="w-[85%] h-1/2 flex justify-around items-start pt-0 px-4 relative z-10 bg-gradient-to-b from-slate-50/50 to-white border-x border-slate-100">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-3 lg:w-4 h-full bg-white border-t border-slate-50 border-x border-slate-200/30">
          <div className="w-full h-1 bg-slate-50/50"></div>
        </div>
      ))}
    </div>

    {/* Base Steps - More refined */}
    <div className="w-[98%] h-4 bg-white border border-slate-200 shadow-sm relative z-20"></div>
    <div className="w-[108%] h-3 bg-white border border-slate-200 shadow-md relative z-20 -mt-0.5 rounded-sm"></div>

    {/* Security Overlay Glow */}
    <div className="absolute inset-x-0 bottom-0 top-1/4 bg-gradient-to-t from-emerald-50/40 to-transparent pointer-events-none -z-1"></div>
  </motion.div>
);

/**
 * Helper component for peripheral device cards
 */
const IconCard: React.FC<{ children: React.ReactNode; position?: string; label?: string }> = ({ children, position = "", label = "" }) => {
  return (
    <div
      className={`absolute bg-white rounded-xl border border-slate-100 shadow-md
                  w-[86px] flex flex-col items-center justify-center gap-[5px]
                  py-[10px] px-[6px] pb-[8px]
                  hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 ${position}`}
    >
      {children}
      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">
        {label}
      </span>
    </div>
  );
};

/**
 * BankEcosystemGraphic Component
 * Refined drop-in replacement with animated connection lines and a central Bank Hub.
 */
const BankEcosystemGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto overflow-visible">
      <Reveal delayMs={50}>
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-visible p-1 lg:p-2">
          {/* Illustration canvas */}
          <div
            className="relative bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-2xl overflow-visible shadow-inner"
            style={{ height: "340px" }}
          >
            {/* Animated dotted connection lines - Bank Hub se sabhi devices tak */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 400 340"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* TOP CENTER: Bank → Smartphone */}
              <line x1="200" y1="125" x2="200" y2="60" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.5s" repeatCount="indefinite" />
              </line>
              
              {/* MIDDLE LEFT: Bank → Laptop */}
              <line x1="148" y1="170" x2="55" y2="170" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.8s" repeatCount="indefinite" />
              </line>
              
              {/* MIDDLE RIGHT: Bank → Server Rack */}
              <line x1="252" y1="170" x2="345" y2="170" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.6s" repeatCount="indefinite" />
              </line>
              
              {/* BOTTOM LEFT: Bank → Storage/HDD */}
              <line x1="165" y1="205" x2="60" y2="280" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                <animate attributeName="stroke-dashoffset" values="0;-11" dur="2s" repeatCount="indefinite" />
              </line>
              
              {/* BOTTOM RIGHT: Bank → RAID/NAS */}
              <line x1="235" y1="205" x2="340" y2="280" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.7s" repeatCount="indefinite" />
              </line>
            </svg>

            {/* CENTER: Bank Building Hub - ENLARGED */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] z-10 transition-transform hover:scale-105 duration-500">
              <svg width="90" height="90" viewBox="0 0 72 72" fill="none"
                   className="drop-shadow-[0_12px_24px_rgba(16,185,129,0.35)]">
                <polygon points="36,7 62,24 10,24" fill="#10b981" />
                <polygon points="36,7 62,24 10,24" fill="none" stroke="#047857" strokeWidth="1.2" />
                <text x="36" y="21" textAnchor="middle" fill="white" fontSize="6.5"
                      fontWeight="900" letterSpacing="1.2" fontFamily="sans-serif">BANK</text>
                <rect x="10" y="24" width="52" height="3" fill="#6ee7b7" rx="1" />
                {[13,23,33,43,53].map(x => (
                  <rect key={x} x={x} y="27" width="6" height="24"
                        fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.8" rx="1" />
                ))}
                <rect x="31" y="39" width="10" height="13" fill="#047857" rx="1.5" />
                <rect x="8"  y="51" width="56" height="5" fill="#10b981" rx="1" />
                <rect x="6"  y="56" width="60" height="4" fill="#047857" rx="1" />
              </svg>
            </div>

            {/* TOP CENTER: Smartphone */}
            <IconCard position="top-[10px] left-1/2 -translate-x-1/2" label="SMARTPHONE">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                   stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <circle cx="12" cy="17" r="1" fill="#16a34a" stroke="none" />
              </svg>
            </IconCard>

            {/* MIDDLE LEFT: Laptop */}
            <IconCard position="top-1/2 left-[5px] -translate-y-1/2" label="LAPTOP">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                   stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="13" rx="2" />
                <path d="M2 19h20" />
              </svg>
            </IconCard>

            {/* MIDDLE RIGHT: Server Rack */}
            <IconCard position="top-1/2 right-[5px] -translate-y-1/2" label="SERVER RACK">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                   stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" />
                <circle cx="7" cy="6"  r="1" fill="#16a34a" stroke="none" />
                <circle cx="7" cy="18" r="1" fill="#16a34a" stroke="none" />
                <line x1="11" y1="6"  x2="17" y2="6"  />
                <line x1="11" y1="18" x2="17" y2="18" />
              </svg>
            </IconCard>

            {/* BOTTOM LEFT: Storage / HDD */}
            <IconCard position="bottom-[10px] left-[5px]" label="STORAGE/HDD">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                   stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="10" rx="2" />
                <circle cx="17" cy="12" r="1.5" fill="#0d9488" stroke="none" />
                <line x1="5" y1="10" x2="12" y2="10" />
                <line x1="5" y1="14" x2="9"  y2="14" />
              </svg>
            </IconCard>

            {/* BOTTOM RIGHT: RAID / NAS */}
            <IconCard position="bottom-[10px] right-[5px]" label="RAID/NAS">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                   stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 5v5c0 1.66-4.03 3-9 3S3 11.66 3 10V5" />
                <path d="M21 10v5c0 1.66-4.03 3-9 3S3 16.66 3 15v-5" />
              </svg>
            </IconCard>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

// Simplified Icons for the Page (if used elsewhere)
// NOTE: BuildingIcon2 removed as it is replaced by BankBuildingIcon

/**
 * FinancialSolutionsPage Component
 * Is page mein Banking aur Financial institutions ke liye data erasure solutions dikhaye gaye hain.
 * Yeh EnterpriseSolutionsPage ke theme par based hai.
 */
const FinancialSolutionsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  // Secondary navbar items
  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "compliance", label: "Compliance" },
    { id: "assets", label: "Assets" },
    { id: "solutions", label: "Solutions" },
    { id: "faq", label: "FAQ" },
  ];

  // Scroll handle karne ke liye useEffect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = globalThis.scrollY;
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
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

    globalThis.addEventListener("scroll", handleScroll);
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
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
        element.getBoundingClientRect().top + globalThis.scrollY;
      globalThis.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <SEOHead seo={getSEOForPage("solutions/data-erasure-banking-finance")} />

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
                        ? "bg-emerald-600 text-white shadow-md"
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
          {/* Background pattern matching FileEraserNetwork */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl opacity-20 -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-3xl opacity-20 -ml-64 -mb-64"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              
              {/* Left Column: Content */}
              <Reveal>
                <div className="space-y-6">
                  <div>
                    <Reveal>
                      <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm border border-emerald-200">
                        <ShieldIcon className="w-3.5 h-3.5" />
                        <span>Secure Scalable Compliant</span>
                      </div>
                    </Reveal>
                    
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                      Solutions for{" "}
                      <span className="block bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent pb-1">
                        Banking & Finance
                      </span>
                    </h1>
                  </div>

                  <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                    Empower your banking operations with D-Secure's
                    military-grade data erasure. Permanently sanitize
                    end-of-life IT assets, servers, and devices to guarantee
                    100% compliance with PCI-DSS, SOX, and global financial data
                    standards.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={() => setShowLicenseModal(true)}
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-emerald-200/50 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Request Free License
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-700 px-8 py-4 rounded-xl font-bold bg-white hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-emerald-100/50"
                    >
                      Connect with Experts
                    </Link>
                  </div>

                  {/* Compliance Badges at bottom of left content */}
                  <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-emerald-100/50">
                    {["PCI-DSS", "SOX", "NIST 800-88", "GDPR"].map((badge) => (
                      <div
                        key={badge}
                        className="flex items-center gap-2 bg-white/80 px-2.5 py-1.5 rounded-full shadow-sm border border-emerald-50"
                      >
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">
                          {badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Animated Graphic */}
              <Reveal delayMs={200}>
                <BankEcosystemGraphic />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section
          id="compliance"
          className="py-16 md:py-20"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <div
                className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "#ecfdf5", color: "#065f46" }}
              >
                Regulation & Compliance
              </div>
              <h2
                className="text-3xl md:text-4xl font-extrabold mb-4"
                style={{ color: "#0f172a" }}
              >
                Ideal for Banks & Financial Institutions to Meet Compliances
              </h2>
              <p
                className="text-lg max-w-3xl mx-auto"
                style={{ color: "#6b7280" }}
              >
                Secure & Reliable Data Wiping Solution
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "PCI-DSS Compliance",
                  desc: "Achieve strict PCI DSS compliance by rendering cardholder data irreversible and unrecoverable before disposal or reallocation.",
                  icon: "💳",
                },
                {
                  title: "FACTA Disposal Rule",
                  desc: "Comply with FACTA requirements by taking reasonable measures to destroy consumer personal information.",
                  icon: "⚖️",
                },
                {
                  title: "SOX Auditor Readiness",
                  desc: "Meet Sarbanes-Oxley requirements for the secure destruction of sensitive corporate financial data.",
                  icon: "📊",
                },
                {
                  title: "GLBA Protection",
                  desc: "Ensure non-public personal information (NPI) is properly destroyed according to Gramm-Leach-Bliley Act guidelines.",
                  icon: "🛡️",
                },
                {
                  title: "EU-GDPR Article 17",
                  desc: "Implement 'Right to Erasure' for financial records across all your global operations.",
                  icon: "🇪🇺",
                },
                {
                  title: "NIST 800-88 Standards",
                  desc: "Adhere to specific media sanitization procedures recommended by NIST for the financial sector.",
                  icon: "📑",
                },
              ].map((comp) => (
                <div
                  key={comp.title}
                  className="p-8 rounded-3xl border bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-100 transition-all group"
                  style={{ borderColor: "#f1f5f9" }}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {comp.icon}
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#0f172a" }}
                  >
                    {comp.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#64748b" }}
                  >
                    {comp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Assets Section */}
        <section
          id="assets"
          className="py-16 md:py-20 bg-slate-50 overflow-hidden relative"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div
                  className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                  style={{ backgroundColor: "#ecfdf5", color: "#065f46" }}
                >
                  Supported Assets
                </div>
                <h2
                  className="text-4xl font-extrabold mb-6"
                  style={{ color: "#0f172a" }}
                >
                  Sanitize Every Storage Media
                </h2>
                <p className="text-lg mb-8" style={{ color: "#475569" }}>
                  Financial institutions handle data across a variety of
                  hardware. D-Secure ensures all cardholder and consumer data is
                  permanently removed across your entire fleet.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "PC & Laptop Wiping",
                    "Server & RAID Wiping",
                    "Mac & iMac Wiping",
                    "Chromebook Erasure",
                    "Mobile Phone Wiping",
                    "Remote Endpoint Wiping",
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#475569" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative lg:order-last w-full max-w-lg mx-auto">
                <Reveal delayMs={0}>
                  <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
                    {/* Hero Illustration Container - Professional Design */}
                    <div className="relative w-[400px] h-[400px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] scale-[0.8] sm:scale-120 lg:scale-100 transition-transform origin-center">
                      {/* Outer Glow Ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-100/40 via-transparent to-teal-100/40 blur-xl"></div>

                      {/* Outer Dashed Circle */}
                      <svg
                        className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite]"
                        viewBox="0 0 480 480"
                      >
                        <circle
                          cx="240"
                          cy="240"
                          r="225"
                          fill="none"
                          stroke="url(#gradientOuterAsset)"
                          strokeWidth="1.5"
                          strokeDasharray="12 8"
                          opacity="0.5"
                        />
                        <defs>
                          <linearGradient
                            id="gradientOuterAsset"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#14b8a6" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Inner Dashed Circle */}
                      <svg
                        className="absolute inset-0 w-full h-full animate-[spin_45s_linear_infinite_reverse]"
                        viewBox="0 0 480 480"
                      >
                        <circle
                          cx="240"
                          cy="240"
                          r="145"
                          fill="none"
                          stroke="url(#gradientInnerAsset)"
                          strokeWidth="1.5"
                          strokeDasharray="8 6"
                          opacity="0.6"
                        />
                        <defs>
                          <linearGradient
                            id="gradientInnerAsset"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#14b8a6" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Central Element - Shield with Data Protection Theme */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="relative">
                          {/* Shield Background */}
                          <div className="w-[140px] h-[160px] lg:w-[180px] lg:h-[200px] relative">
                            {/* Shield Shape */}
                            <svg
                              viewBox="0 0 100 120"
                              className="w-full h-full drop-shadow-xl overflow-visible"
                            >
                              <defs>
                                <linearGradient
                                  id="shieldGradientAsset"
                                  x1="0%"
                                  y1="0%"
                                  x2="100%"
                                  y2="100%"
                                >
                                  <stop offset="0%" stopColor="#10b981" />
                                  <stop offset="50%" stopColor="#059669" />
                                  <stop offset="100%" stopColor="#047857" />
                                </linearGradient>
                              </defs>
                              <path
                                d="M50 5 L95 25 L95 55 C95 85 75 105 50 115 C25 105 5 85 5 55 L5 25 Z"
                                fill="url(#shieldGradientAsset)"
                                className="filter drop-shadow-[0_4px_6px_rgba(16,185,129,0.3)]"
                              />
                              <path
                                d="M50 12 L88 29 L88 55 C88 80 71 97 50 106 C29 97 12 80 12 55 L12 29 Z"
                                fill="none"
                                stroke="white"
                                strokeWidth="1"
                                opacity="0.3"
                              />
                            </svg>

                            {/* Shield Content - Checkmark + Data Icon */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                              {/* Checkmark Circle */}
                              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                                <svg
                                  className="w-7 h-7 lg:w-10 lg:h-10 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span className="text-white text-[10px] lg:text-xs font-bold tracking-wider mt-2 uppercase">
                                Secured
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Product Icons - 6 icons evenly around the Shield */}
                      {/* Top - Server & RAID */}
                      <div className="absolute top-[-8px] left-1/2 -translate-x-1/2">
                        <div className="group relative">
                          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                            {/* Server Icon */}
                            <svg className="w-7 h-7 lg:w-8 lg:h-8 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><path d="M6 6h.01M6 18h.01" />
                            </svg>
                          </div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] lg:text-[10px] font-semibold text-emerald-700 whitespace-nowrap bg-white/80 px-2 py-0.5 rounded">Server & RAID</span>
                        </div>
                      </div>

                      {/* Top Left - PC & Laptop */}
                      <div className="absolute top-[90px] left-[12px] lg:top-[110px] lg:left-[15px]">
                        <div className="group relative">
                          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                            {/* Laptop Icon */}
                            <svg className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M20 16V4a2 2 0 00-2-2H6a2 2 0 00-2 2v12m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0H4M8 21h8" />
                            </svg>
                          </div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] lg:text-[9px] font-medium text-slate-600 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded">PC & Laptop</span>
                        </div>
                      </div>

                      {/* Top Right - Mac & iMac */}
                      <div className="absolute top-[90px] right-[12px] lg:top-[110px] lg:right-[15px]">
                        <div className="group relative">
                          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                            {/* iMac/Mac Icon */}
                            <svg className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <rect x="3" y="3" width="18" height="12" rx="2" /><path d="M12 15v3m-4 3h8" />
                            </svg>
                          </div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] lg:text-[9px] font-medium text-slate-600 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded">Mac & iMac</span>
                        </div>
                      </div>

                      {/* Bottom Left - Chromebook */}
                      <div className="absolute bottom-[80px] left-[12px] lg:bottom-[95px] lg:left-[15px]">
                        <div className="group relative">
                          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                            {/* Chromebook (Chrome Logo style) */}
                            <svg className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><path d="M12 8l8.5 5m-15.5 0L12 16" />
                            </svg>
                          </div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] lg:text-[9px] font-medium text-slate-600 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded">Chromebook</span>
                        </div>
                      </div>

                      {/* Bottom Right - Mobile Phone */}
                      <div className="absolute bottom-[80px] right-[12px] lg:bottom-[95px] lg:right-[15px]">
                        <div className="group relative">
                          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                            {/* Smartphone Icon */}
                            <svg className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" />
                            </svg>
                          </div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] lg:text-[9px] font-medium text-slate-600 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded">Mobile Phone</span>
                        </div>
                      </div>

                      {/* Bottom - Remote Endpoint */}
                      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">
                        <div className="group relative">
                          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                            {/* Signal/Wifi Icon - Remote Endpoint */}
                            <svg className="w-7 h-7 lg:w-8 lg:h-8 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.59 16.11a6 6 0 016.82 0M12 20h.01" />
                            </svg>
                          </div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] lg:text-[10px] font-semibold text-emerald-700 whitespace-nowrap bg-white/80 px-2 py-0.5 rounded">Remote Endpoint</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Solutions Section */}
        <section
          id="solutions"
          className="py-16 md:py-20"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <div
                className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "#ecfdf5", color: "#065f46" }}
              >
                Flexible Solutions
              </div>
              <h2
                className="text-4xl md:text-5xl font-extrabold mb-4"
                style={{ color: "#0f172a" }}
              >
                Our Solutions for Banks & Financial Institutions
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "PXE Boot Solution",
                  desc: "Erase up to 65,000 drives simultaneously over a network. Ideal for data center decommissioning in large banks.",
                  icon: "🌐",
                },
                {
                  title: "USB Boot Solution",
                  desc: "On-site standalone machine erasure for remote branches and office relocations. No internet required.",
                  icon: "🔌",
                },
                {
                  title: "MSI Remote Wiping",
                  desc: "Target Windows endpoint devices remotely via MSI package deployment. Perfect for hybrid workforce security.",
                  icon: "📡",
                  upcoming: true,
                },
                {
                  title: "File Eraser Tool",
                  desc: "Permanently wipe specific sensitive files and folders without affecting the OS or other applications.",
                  icon: "📁",
                },
                {
                  title: "Cloud Console Admin",
                  desc: "Manage users, licenses, and maintain a centralized repository of all erasure reports for global audits.",
                  icon: "☁️",
                },
                {
                  title: "Hardware Diagnostics",
                  desc: "Perform health checks and hardware profiling on machines before or after the erasure process.",
                  icon: "🛠️",
                },
              ].map((solution) => (
                <div
                  key={solution.title}
                  className={`relative p-8 rounded-3xl hover:bg-emerald-50/50 transition-all border border-transparent hover:border-emerald-100 group ${solution.upcoming ? 'opacity-90' : ''}`}
                >
                  {/* Upcoming Badge */}
                  {solution.upcoming && (
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-200 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                      Coming Soon
                    </div>
                  )}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {solution.icon}
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#0f172a" }}
                  >
                    {solution.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#64748b" }}
                  >
                    {solution.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-20 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-4xl font-extrabold mb-12 text-center"
              style={{ color: "#0f172a" }}
            >
              Common Inquiries
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "How many drives can D-Secure wipe simultaneously?",
                  a: "Administrators can perform centralized network wiping on up to 65,000 drives simultaneously using PXE boot, targeting servers across global branch networks.",
                },
                {
                  q: "Can I connect D-Secure to the cloud via Wi-Fi?",
                  a: "Yes, D-Secure supports cloud console connectivity via both Ethernet and Wi-Fi, providing flexibility for different secure facility environments.",
                },
                {
                  q: "Do the data erasure licenses expire?",
                  a: "No, D-Secure licenses do not expire over time. You have the freedom to use your purchased licenses whenever required without worrying about a deadline.",
                },
                {
                  q: "What report formats are available?",
                  a: "D-Secure provides the option to save tamper-proof erasure reports in PDF, CSV, and XML formats, facilitating easy integration with your GRC or ITAM systems.",
                },
                {
                  q: "Is it possible to customize the ISO?",
                  a: "Yes, you can customize the bootable ISO through our cloud dashboard to include specific drivers or pre-defined wiping protocols.",
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm open:shadow-lg transition-all"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none list-inside">
                    <span
                      className="text-xl font-bold pr-6"
                      style={{ color: "#0f172a" }}
                    >
                      {faq.q}
                    </span>
                    <span className="transition-transform group-open:rotate-180 text-emerald-600">
                      <svg
                        className="w-6 h-6"
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
                    </span>
                  </summary>
                  <p
                    className="mt-6 text-lg leading-relaxed"
                    style={{ color: "#64748b" }}
                  >
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onClose={() => setShowLicenseModal(false)}
          title="Request Free License - Financial"
        />
      )}
    </>
  );
};

export default FinancialSolutionsPage;
