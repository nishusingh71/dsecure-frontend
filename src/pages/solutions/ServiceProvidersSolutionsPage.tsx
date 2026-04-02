import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm, PartnershipForm } from "@/components/forms";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import SolutionContactSection from "@/components/SolutionContactSection";

/**
 * ServiceProvidersSolutionsPage Component
 * MSP aur System Integrators ke liye data erasure solutions dikhaye gaye hain.
 * Yeh EnterpriseSolutionsPage ke theme aur structure par based hai.
 */
const ServiceProvidersSolutionsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  // Secondary navbar items
  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "capabilities", label: "Capabilities" },
    { id: "assets", label: "Assets" },
    { id: "compliance", label: "Compliance" },
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
      <SEOHead seo={getSEOForPage("solutions/service-providers")} />

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
                      <path fillRule="evenodd" d="M2.166 4.9L10 1.55l7.834 3.35a1 1 0 01.666.936v4.444c0 4.635-3.044 8.718-7.5 10.12-4.456-1.402-7.5-5.485-7.5-10.12V5.836a1 1 0 01.666-.936zM10 3.3L3.5 6.1v3.9c0 3.654 2.308 6.942 6.5 8.2 4.192-1.258 6.5-4.546 6.5-8.2V6.1L10 3.3z" clipRule="evenodd" />
                    </svg>
                    <span>Empowering MSPs with Scalable Security</span>
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                    Solutions for <span className="block bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent pb-1">
                    Managed Service Providers
                    </span>
                  </h1>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  Securely erase clients' data across every endpoint. D-Secure provides MSPs and System Integrators with 
                  enterprise-grade sanitization tools and centralized audit trails to ensure compliance and risk-free disposal.
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
                  <button
                    onClick={() => setShowPartnerModal(true)}
                    className="inline-flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-700 px-8 py-4 rounded-xl font-bold bg-white hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-emerald-100/50"
                  >
                    Become a Partner
                  </button>
                </div>

                {/* Compliance Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-emerald-100/50">
                  {["NIST 800-88", "PCI-DSS", "HIPAA", "GDPR"].map((badge) => (
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

              {/* Right Column: MSP Ecosystem Graphic */}
              <div className="relative w-full max-w-lg mx-auto overflow-visible">
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-visible p-1 lg:p-2">
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
                      <line x1="200" y1="125" x2="200" y2="60" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.5s" repeatCount="indefinite" />
                      </line>
                      <line x1="148" y1="170" x2="55" y2="170" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.8s" repeatCount="indefinite" />
                      </line>
                      <line x1="252" y1="170" x2="345" y2="170" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.6s" repeatCount="indefinite" />
                      </line>
                      <line x1="165" y1="205" x2="60" y2="280" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="2s" repeatCount="indefinite" />
                      </line>
                      <line x1="235" y1="205" x2="340" y2="280" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.7s" repeatCount="indefinite" />
                      </line>
                    </svg>

                    {/* CENTER: MSP Network Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] z-10 transition-transform hover:scale-105 duration-500">
                      <svg width="90" height="90" viewBox="0 0 72 72" fill="none"
                           className="drop-shadow-[0_12px_24px_rgba(16,185,129,0.35)]">
                        {/* Hexagonal hub shape */}
                        <polygon points="36,6 60,20 60,48 36,62 12,48 12,20" fill="#10b981" />
                        <polygon points="36,10 56,22 56,46 36,58 16,46 16,22" fill="#059669" />
                        {/* Network nodes inside */}
                        <circle cx="36" cy="28" r="5" fill="#d1fae5" />
                        <circle cx="26" cy="42" r="4" fill="#d1fae5" opacity="0.8" />
                        <circle cx="46" cy="42" r="4" fill="#d1fae5" opacity="0.8" />
                        {/* Connection lines */}
                        <line x1="36" y1="33" x2="28" y2="39" stroke="#6ee7b7" strokeWidth="1.5" />
                        <line x1="36" y1="33" x2="44" y2="39" stroke="#6ee7b7" strokeWidth="1.5" />
                        <line x1="30" y1="42" x2="42" y2="42" stroke="#6ee7b7" strokeWidth="1.5" />
                        <text x="36" y="54" textAnchor="middle" fill="white" fontSize="4.5" fontWeight="900" fontFamily="sans-serif">MSP</text>
                      </svg>
                    </div>

                    {/* TOP CENTER: Endpoint */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 top-[10px] left-1/2 -translate-x-1/2">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">ENDPOINT</span>
                    </div>

                    {/* MIDDLE LEFT: Server */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 top-1/2 left-[5px] -translate-y-1/2">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
                        <circle cx="7" cy="6" r="1" fill="#0d9488" stroke="none" /><circle cx="7" cy="18" r="1" fill="#0d9488" stroke="none" />
                        <line x1="11" y1="6" x2="17" y2="6" /><line x1="11" y1="18" x2="17" y2="18" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">SERVER</span>
                    </div>

                    {/* MIDDLE RIGHT: Cloud */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 top-1/2 right-[5px] -translate-y-1/2">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">CLOUD</span>
                    </div>

                    {/* BOTTOM LEFT: Mobile */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 bottom-[10px] left-[5px]">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="#0d9488" stroke="none" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">MOBILE</span>
                    </div>

                    {/* BOTTOM RIGHT: Storage */}
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

        {/* Capabilities Section */}
        <section
          id="capabilities"
          className="py-16 md:py-20"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:md:mb-16">
              <div
                className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "#ecfdf5", color: "#065f46" }}
              >
                Comprehensive Capabilities
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: "#0f172a" }}>
                Profit from Professional Sanitization
              </h2>
              <p className="text-lg max-w-3xl mx-auto" style={{ color: "#6b7280" }}>
                D-Secure provides the flexibility to offer data erasure as a managed service, onsite or remotely, 
                with full audit readiness for every client project.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Scheduled Sanitization",
                  desc: "Configure recurring erasure tasks to prevent sensitive data accumulation on client workstations & servers.",
                  icon: "📅",
                },
                {
                  title: "Onsite & Offsite Erasure",
                  desc: "Flexible deployment via USB boot or PXE network to handle client relocations or data center decommissioning.",
                  icon: "📍",
                },
                {
                  title: "Mobile Force Diagnostics",
                  desc: "Unified interface for rapid diagnosis and secure wiping of Android and iOS fleets with automated reporting.",
                  icon: "📱",
                },
                {
                  title: "Cloud Admin Console",
                  desc: "Global visibility of erasure records and centralized license management through a tamper-proof repository.",
                  icon: "☁️",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:bg-emerald-50/50 hover:border-emerald-100 transition-all group"
                >
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
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
                      <h4 className="font-bold text-lg text-slate-900">Endpoints & Portables</h4>
                      <p className="text-sm text-slate-500">PC, Laptop, Mac® & Chromebooks</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-50 flex items-center gap-6 ml-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">🗄️</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">Data Centers</h4>
                      <p className="text-sm text-slate-500">Rackmount Servers & RAID Storage</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-50 flex items-center gap-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">🗂️</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">Specific Files</h4>
                      <p className="text-sm text-slate-500">Folders, Volumes & Network Shared Drives</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-extrabold mb-8" style={{ color: "#0f172a" }}>
                  One Solution for All Client Media
                </h2>
                <div className="space-y-6">
                  {[
                    "Erase loose drives in bulk at high-speed",
                    "Handle Apple M1/M2/M3 chips and T2 security Macs effortlessly",
                    "Support for 14+ international erasure standards",
                    "Customizable reports with company logo & watermarking",
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

        {/* Compliance Section */}
        <section
          id="compliance"
          className="py-16 md:py-20"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: "#0f172a" }}>
                Regulatory & Audit Readiness
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
                Generate verifiable, tamper-proof audit trails for every sanitized asset to meet your client's compliance needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "NIST 800-88", desc: "Adherence to Clear and Purge methods for all modern media types." },
                { title: "PCI-DSS", desc: "Secure disposal of cardholder data rendering it completely unrecoverable." },
                { title: "HIPAA", desc: "Maintain patient privacy through secure media sanitization protocols." },
                { title: "EU-GDPR", desc: "Enable the 'Right to Erasure' as a service for your global clients." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-8 rounded-3xl border border-slate-100 bg-white hover:bg-emerald-50/30 hover:border-emerald-100 transition-all"
                >
                  <h3 className="text-xl font-bold mb-3 text-emerald-700">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{item.desc}</p>
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
              MSP Partner FAQs
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "How many drives can we wipe simultaneously as an MSP?",
                  a: "Administrators can perform centralized network wiping on up to 65,000 drives simultaneously using PXE boot, targeting servers across global branch networks or data centers.",
                },
                {
                  q: "Do the data erasure licenses expire?",
                  a: "No, D-Secure licenses do not expire over time. You have the freedom to use your purchased licenses whenever required for your client projects without worrying about a deadline.",
                },
                {
                  q: "Can we use the solution in zero-internet environments?",
                  a: "Yes, our standalone USB boot solution allows for onsite machine erasure where internet connectivity is prohibited or unavailable, with reports saved locally.",
                },
                {
                  q: "Is it possible to customize the reports for our clients?",
                  a: "Absolutely. You can customize the erasure reports with your company logo and watermarking through the cloud console to provide a branded experience for your clients.",
                },
              ].map((faq) => (
                <details key={faq.q} className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm open:shadow-lg transition-all">
                  <summary className="flex items-center justify-between cursor-pointer list-none list-inside">
                    <span className="text-xl font-bold pr-6 font-bold" style={{ color: "#1e293b" }}>{faq.q}</span>
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
        <SolutionContactSection source="Service Providers Solutions Page" subjectPrefix="New Inquiry - Service Providers Solutions" />
      </div>

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onClose={() => setShowLicenseModal(false)}
          title="Request Free License - MSP Solution"
        />
      )}

      {showPartnerModal && (
        <PartnershipForm
          onClose={() => setShowPartnerModal(false)}
          title="Register as a D-Secure Partner"
          preSelectedPartnerType="Consulting Partner"
        />
      )}
    </>
  );
};

export default ServiceProvidersSolutionsPage;
