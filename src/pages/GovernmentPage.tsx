import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm } from "@/components/forms";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import SolutionContactSection from "@/components/SolutionContactSection";

/**
 * GovernmentPage Component
 * Is page mein Government aur Defense bodies ke liye data erasure solutions dikhaye gaye hain.
 * Yeh EnterpriseSolutionsPage ke theme par based hai.
 */
const GovernmentPage: React.FC = () => {
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
    { id: "contact", label: "Contact" },
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
      <SEOHead seo={getSEOForPage("solutions/government")} />

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
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.9L10 1.55l7.834 3.35a1 1 0 01.666.936v4.444c0 4.635-3.044 8.718-7.5 10.12-4.456-1.402-7.5-5.485-7.5-10.12V5.836a1 1 0 01.666-.936z" clipRule="evenodd" />
                    </svg>
                    <span>Secure Scalable Compliant</span>
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                    Solutions for
                    <span className="block bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent pb-1">
                      Government
                    </span>
                  </h1>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  D-Secure helps government bodies and authorized vendors securely erase sensitive data from drives & devices.
                  Meeting NIST 800-88, DoD, and CMMC standards with automated audit trails.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => setShowLicenseModal(true)}
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-emerald-200/50 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Request Free License
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
                  {["NIST 800-88", "DoD 5220.22-M", "CMMC 2.0", "SOX"].map((badge) => (
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

              {/* Right Column: Government Ecosystem Graphic */}
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
                      {/* TOP CENTER: Govt → Workstation */}
                      <line x1="200" y1="125" x2="200" y2="60" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.5s" repeatCount="indefinite" />
                      </line>
                      {/* MIDDLE LEFT: Govt → Laptop */}
                      <line x1="148" y1="170" x2="55" y2="170" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.8s" repeatCount="indefinite" />
                      </line>
                      {/* MIDDLE RIGHT: Govt → Server */}
                      <line x1="252" y1="170" x2="345" y2="170" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.6s" repeatCount="indefinite" />
                      </line>
                      {/* BOTTOM LEFT: Govt → Mobile */}
                      <line x1="165" y1="205" x2="60" y2="280" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="2s" repeatCount="indefinite" />
                      </line>
                      {/* BOTTOM RIGHT: Govt → Classified Storage */}
                      <line x1="235" y1="205" x2="340" y2="280" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.7s" repeatCount="indefinite" />
                      </line>
                    </svg>

                    {/* CENTER: Government Building Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] z-10 transition-transform hover:scale-105 duration-500">
                      <svg width="90" height="90" viewBox="0 0 72 72" fill="none"
                           className="drop-shadow-[0_12px_24px_rgba(16,185,129,0.35)]">
                        {/* Dome */}
                        <ellipse cx="36" cy="16" rx="14" ry="8" fill="#10b981" />
                        <rect x="34" y="8" width="4" height="6" fill="#059669" rx="1" />
                        {/* Pillars */}
                        <rect x="12" y="22" width="48" height="4" fill="#6ee7b7" rx="1" />
                        {[16, 26, 36, 46].map(x => (
                          <rect key={x} x={x} y="26" width="5" height="24" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.7" rx="1" />
                        ))}
                        {/* Door */}
                        <rect x="31" y="38" width="10" height="13" fill="#047857" rx="1.5" />
                        {/* Steps */}
                        <rect x="8" y="50" width="56" height="4" fill="#10b981" rx="1" />
                        <rect x="6" y="54" width="60" height="3" fill="#059669" rx="1" />
                        <rect x="4" y="57" width="64" height="3" fill="#047857" rx="1" />
                        <text x="36" y="48" textAnchor="middle" fill="white" fontSize="4.5" fontWeight="900" fontFamily="sans-serif">GOVT</text>
                      </svg>
                    </div>

                    {/* TOP CENTER: Workstation */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 top-[10px] left-1/2 -translate-x-1/2">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">WORKSTATION</span>
                    </div>

                    {/* MIDDLE LEFT: Laptop */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 top-1/2 left-[5px] -translate-y-1/2">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="13" rx="2" /><path d="M2 19h20" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">LAPTOP</span>
                    </div>

                    {/* MIDDLE RIGHT: Server */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 top-1/2 right-[5px] -translate-y-1/2">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
                        <circle cx="7" cy="6" r="1" fill="#16a34a" stroke="none" /><circle cx="7" cy="18" r="1" fill="#16a34a" stroke="none" />
                        <line x1="11" y1="6" x2="17" y2="6" /><line x1="11" y1="18" x2="17" y2="18" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">SERVER</span>
                    </div>

                    {/* BOTTOM LEFT: Mobile */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 bottom-[10px] left-[5px]">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="#0d9488" stroke="none" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">MOBILE</span>
                    </div>

                    {/* BOTTOM RIGHT: Classified Storage */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 bottom-[10px] right-[5px]">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="10" rx="2" />
                        <circle cx="17" cy="12" r="1.5" fill="#16a34a" stroke="none" />
                        <line x1="5" y1="10" x2="12" y2="10" /><line x1="5" y1="14" x2="9" y2="14" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">STORAGE</span>
                    </div>
                  </div>
                </div>
              </div>
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
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: "#0f172a" }}>
                Meet Federal & State Regulations
              </h2>
              <p className="text-lg max-w-3xl mx-auto" style={{ color: "#64748b" }}>
                DSecure enables government organizations to completely sanitize media before it is transferred, disposed of, or reused according to global guidelines.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "NIST 800-88", desc: "Adherence to Clear and Purge methods for all media types." },
                { title: "DoD 5220.22-M", desc: "Support for 3-pass and 7-pass military overwriting standards." },
                { title: "CMMC 2.0", desc: "Maintain cybersecurity maturity for defense contractual obligations." },
                { title: "SOX & HIPAA", desc: "Compliance for financial and health data held by public bodies." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:bg-emerald-50/50 hover:border-emerald-100 transition-all group"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-700 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "#1e293b" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Assets Section */}
        <section
          id="assets"
          className="py-16 md:py-20 bg-slate-50 overflow-hidden relative"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-emerald-600/5 blur-3xl rounded-full"></div>
                <div className="relative space-y-4">
                  <div className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-50 flex items-center gap-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">💻</div>
                    <div>
                      <h4 className="font-bold text-lg">PC/Laptop/Mac</h4>
                      <p className="text-sm text-slate-500">Sanitize workstations & endpoints</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-50 flex items-center gap-6 ml-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">💽</div>
                    <div>
                      <h4 className="font-bold text-lg">Loose Drives</h4>
                      <p className="text-sm text-slate-500">HDD, SSD, NVMe, SAS, etc.</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-50 flex items-center gap-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">📱</div>
                    <div>
                      <h4 className="font-bold text-lg">Mobile Devices</h4>
                      <p className="text-sm text-slate-500">iOS & Android Diagnostics & Erasure</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-extrabold mb-8" style={{ color: "#0f172a" }}>
                  Secure Media Sanitization for the Entire Agency
                </h2>
                <div className="space-y-6">
                  {[
                    "Wipe data at facilities with or without internet",
                    "Bulk erasure of drives at high-security defense establishments",
                    "Target loose drives in a rack or chassis with PXE boot",
                    "Generate tamper-proof audit trails for every sanitized asset",
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-start gap-4">
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium" style={{ color: "#334155" }}>{benefit}</p>
                    </div>
                  ))}
                </div>
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
            <div className="text-center mb-12 md:mb-16 text-emerald-600">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: "#0f172a" }}>
                Erasure Solutions for Govt. Bodies
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                { 
                  title: "Network & PXE Wiping", 
                  desc: "Sanitize up to 65,000 devices simultaneously over a network using our scalable PXE boot variant.",
                  icon: "🌐"
                },
                { 
                  title: "USB Boot (Offline)", 
                  desc: "Ideal for defense & research labs without internet. Perform erasure via bootable USB and save reports locally.",
                  icon: "🔌"
                },
                { 
                  title: "Cloud Admin Console", 
                  desc: "Centralized management of users, licenses, and repositories. Get global visibility of data destruction trails.",
                  icon: "☁️"
                },
                { 
                  title: "Mobile Force Diagnostics", 
                  desc: "Minimize operational risk by diagnosing and erasing iOS and Android devices at high speed.",
                  icon: "🛡️"
                },
                { 
                  title: "ISO Customization", 
                  desc: "Standardize the erasure process across all locations through cloud-hosted customized ISO files.",
                  icon: "💿"
                },
                { 
                  title: "File Eraser Tool", 
                  desc: "Maintain data privacy by erasing unwanted files and traces regularly from Windows, Mac, or Linux systems.",
                  icon: "📄"
                },
              ].map((card) => (
                <div key={card.title} className="flex flex-col items-start bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-xl transition-all">
                  <div className="text-4xl mb-6">{card.icon}</div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "#1e293b" }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="py-16 md:py-20 bg-slate-50"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold mb-12 text-center" style={{ color: "#0f172a" }}>
              Common Inquiries
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Can we use DSecure in zero-internet facilities?",
                  a: "Absolutely. Our 'Physically delivered' (Offline) variant is specifically designed for high-security establishments like defense labs where internet connectivity is prohibited.",
                },
                {
                  q: "Does the software support bulk drive erasure?",
                  a: "Yes. You can wipe up to 100 drives simultaneously in a specialized chassis or target 65,000 over a network using PXE boot solutions.",
                },
                {
                  q: "How are the reports managed in large agencies?",
                  a: "Reports can be stored locally on encrypted USB sticks for offline use or centrally aggregated in a tamper-proof cloud repository for global audit readiness.",
                },
              ].map((faq) => (
                <details key={faq.q} className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm open:shadow-lg transition-all">
                  <summary className="flex items-center justify-between cursor-pointer list-none list-inside">
                    <span className="text-xl font-bold pr-6" style={{ color: "#1e293b" }}>{faq.q}</span>
                    <span className="transition-transform group-open:rotate-180 text-emerald-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-6 text-lg leading-relaxed" style={{ color: "#64748b" }}>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <SolutionContactSection source="Government Solutions Page" subjectPrefix="New Inquiry - Government Solutions" />

      </div>

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onClose={() => setShowLicenseModal(false)}
          title="Request Free License - Government"
        />
      )}
    </>
  );
};

export default GovernmentPage;
