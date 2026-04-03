import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm } from "@/components/forms";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import SolutionContactSection from "@/components/SolutionContactSection";
import SolutionHeroGraphic from "@/components/SolutionHeroGraphic";

/**
 * EducationPage Component
 * Is page mein Educational Institutions (Schools, Universities) ke liye data erasure solutions dikhaye gaye hain.
 * Yeh HealthcareSolutionsPage ke Emerald Green theme aur BitRaser data par based hai.
 */
const EducationPage: React.FC = () => {
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
      const scrollPosition = typeof window !== "undefined" ? window.scrollY : 0;
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
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
      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
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
        element.getBoundingClientRect().top + (typeof window !== "undefined" ? window.scrollY : 0);
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <SEOHead seo={getSEOForPage("solutions/education")} />

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
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-6.75 3.524z" />
                    </svg>
                    <span>Secure Privacy-Compliant Education</span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                    Solutions for{" "}
                    <span className="block bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent pb-1">
                      Educational Institutions
                    </span>
                  </h1>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  Securely erase student and staff sensitive data permanently
                  from Chromebooks, PCs, laptops, and lab servers. Ensure 100%
                  compliance with FERPA and COPPA standards for student data
                  privacy while decommissioning old IT assets.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => setShowLicenseModal(true)}
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-emerald-200/50 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Get Free Campus License
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
                    href="https://assets.dsecuretech.com/pdf/DSECURE_EDUCATION.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold bg-white transition-all duration-300 shadow-lg"
                  >
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
                        d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                      />
                    </svg>
                    Solution Overview
                  </a>
                </div>

                {/* Compliance Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-emerald-100/50">
                  {["FERPA", "COPPA", "NIST 800-88", "GDPR"].map((badge) => (
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

              {/* Right Column: Interactive Education Ecosystem */}
              <SolutionHeroGraphic
                centerIcon={
                  <svg width="80" height="80" viewBox="0 0 72 72" fill="none" className="drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)]">
                    <rect x="16" y="18" width="40" height="38" fill="#10b981" rx="3" />
                    <rect x="18" y="20" width="36" height="34" fill="#059669" rx="2" />
                    <rect x="33" y="8" width="6" height="12" fill="#059669" rx="1" />
                    <polygon points="36,5 42,11 36,11" fill="#10b981" />
                    {[22, 32, 42].map(x =>
                      [24, 34].map(y => (
                        <rect key={`${x}-${y}`} x={x} y={y} width="8" height="6" fill="#d1fae5" rx="0.5" />
                      ))
                    )}
                    <rect x="30" y="42" width="12" height="14" fill="#047857" rx="2" />
                    <circle cx="39" cy="50" r="1" fill="#6ee7b7" />
                    <rect x="12" y="56" width="48" height="4" fill="#10b981" rx="1" />
                    <rect x="10" y="60" width="52" height="3" fill="#047857" rx="1" />
                  </svg>
                }
                centerLabel="CAMPUS"
                devices={[
                  {
                    label: "CHROMEBOOK",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M2 19h20" /></svg>,
                  },
                  {
                    label: "LAB PC",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
                  },
                  {
                    label: "SERVER",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><circle cx="7" cy="6" r="1" fill="#16a34a" stroke="none" /><circle cx="7" cy="18" r="1" fill="#16a34a" stroke="none" /><line x1="11" y1="6" x2="17" y2="6" /><line x1="11" y1="18" x2="17" y2="18" /></svg>,
                  },
                  {
                    label: "TABLET",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="10" y1="18" x2="14" y2="18" /></svg>,
                  },
                  {
                    label: "STORAGE",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="10" rx="2" /><circle cx="17" cy="12" r="1.5" fill="#16a34a" stroke="none" /><line x1="5" y1="10" x2="12" y2="10" /><line x1="5" y1="14" x2="9" y2="14" /></svg>,
                  },
                ]}/>
            </div>
          </div>
        </section>


        {/* Compliance Section */}
        <section
          id="compliance"
          className="py-20"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div
                className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "#e8f5e9", color: "#059669" }}
              >
                Education Privacy & Standards
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: "#1f2937" }}
              >
                Strict Compliance for Institutions
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: "#6b7280" }}
              >
                Meet student data protection laws with our auditable
                sanitization solutions for schools and universities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "FERPA Compliance",
                  desc: "Protect student educational records during equipment disposal to ensure Family Educational Rights and Privacy Act adherence.",
                  icon: "🎓",
                },
                {
                  title: "COPPA Readiness",
                  desc: "Comply with Children's Online Privacy Protection Act by permanently deleting kids' personal data from school-issued devices.",
                  icon: "🛡️",
                },
                {
                  title: "NIST 800-88",
                  desc: "Follow the latest U.S. federal media sanitization guidelines to render data completely unrecoverable by forensic tools.",
                  icon: "📜",
                },
                {
                  title: "Tamper-proof Reports",
                  desc: "Automated compliance-verified certificates generated for every asset wiped, providing a clear audit trail for regulators.",
                  icon: "✅",
                },
              ].map((comp, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl border bg-slate-50 hover:shadow-lg transition-all"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <div className="text-4xl mb-4">{comp.icon}</div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#1f2937" }}
                  >
                    {comp.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6b7280" }}
                  >
                    {comp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Assets Section */}
        <section id="assets" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div
                className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "#e8f5e9", color: "#059669" }}
              >
                Hardware Support
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: "#1f2937" }}
              >
                Erase Campus IT Assets
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: "#6b7280" }}
              >
                Supporting a wide range of devices found in modern educational
                environments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🎓",
                  title: "Chromebooks",
                  desc: "Bulk wiping for student laptops and education-grade devices.",
                },
                {
                  icon: "🔬",
                  title: "Lab PCs & Macs",
                  desc: "Sanitize high-performance workstations in research and computer labs.",
                },
                {
                  icon: "🏫",
                  title: "School Servers",
                  desc: "Securely erase server-side student information and admin records.",
                },
                {
                  icon: "📱",
                  title: "Staff Tablets",
                  desc: "Sanitize iOS and Android devices used by faculty and staff.",
                },
              ].map((asset, idx) => (
                <div
                  key={idx}
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

        {/* School Solutions Section */}
        <section
          id="solutions"
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
                  Institutional Grade Data Disposal
                </h2>
                <p className="text-lg mb-8" style={{ color: "#4b5563" }}>
                  Educational institutions frequently upgrade technology. We
                  help IT departments manage large-scale data destruction
                  efficiently without physical disk destruction, promoting green
                  campus initiatives.
                </p>
                <ul className="space-y-4">
                  {[
                    "Network PXE booting for mass wiping of entire computer labs",
                    "USB sanitization for hybrid work laptops and off-site staff",
                    "Cloud-based management for central tracking across multiple campuses",
                    "Sustainability-focused disposal through high-grade reusable wiping",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
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
                  Why Education Leaders Trust D-Secure?
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">
                      Compliance Verification
                    </h4>
                    <p className="text-sm text-emerald-800">
                      Generate auditable proofs for State and Federal privacy
                      auditors.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">
                      Asset Lifetime Value
                    </h4>
                    <p className="text-sm text-emerald-800">
                      Erase data while keeping the hardware intact for resale or
                      donations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">
                      Campus-Wide Centralization
                    </h4>
                    <p className="text-sm text-emerald-800">
                      Manage all student data sanitization from a single web
                      dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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
                Common queries for institutional IT teams
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "How does D-Secure ensure FERPA compliance?",
                  a: "D-Secure uses NIST-level wiping to ensure all personally identifiable information (PII) of students is non-recoverable, and then creates a compliance-verified audit report as proof for regulators.",
                },
                {
                  q: "Can we wipe devices across different campus buildings?",
                  a: "Yes, our cloud console allows you to manage erasure tasks across geographically dispersed campus sites, providing real-time visibility into every asset being sanitized.",
                },
                {
                  q: "Is it possible to donate old school computers securely?",
                  a: "Absolutely. D-Secure wipes the storage data but keeps the device working perfectly. You can donate sanitized PCs with a Compliance Certificate to ensure the school's data never leaves the campus.",
                },
                {
                  q: "What standards are used for institutional wiping?",
                  a: "We support NIST 800-88, US Department of Defense (DoD), and other international sanitization standards to ensure the highest level of information security.",
                },
              ].map((faq, idx) => (
                <details
                  key={idx}
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
        <SolutionContactSection
          source="Education Solutions Page"
          subjectPrefix="New Inquiry - Education Solutions"
        />
      </div>

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onClose={() => setShowLicenseModal(false)}
          title="Request Free Campus License - Education"
        />
      )}
    </>
  );
};

export default EducationPage;
