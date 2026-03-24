import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm } from "@/components/forms";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";

/**
 * HealthcareSolutionsPage Component
 * Is page mein Healthcare aur Insurance sector ke liye data erasure solutions dikhaye gaye hain.
 * Yeh EnterpriseSolutionsPage ke theme par based hai.
 */
const HealthcareSolutionsPage: React.FC = () => {
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
      <SEOHead seo={getSEOForPage("solutions/healthcare")} />

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

      <div
        className="font-['Inter',_'Segoe_UI',_'Roboto',_sans-serif] antialiased"
        style={{ backgroundColor: "#ffffff", color: "#1f2937" }}
      >
        {/* Hero Section - Overview */}
        <section
          id="overview"
          className="relative py-24 overflow-hidden"
          style={{ backgroundColor: "#e8f5e9" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div
                  className="inline-flex items-center space-x-2 px-4 py-2 backdrop-blur-sm rounded-full text-sm font-semibold shadow-sm"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.8)",
                    color: "#059669",
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Secure. HIPAA Compliant. Healthcare Focused.</span>
                </div>

                <div>
                  <h1
                    className="text-5xl md:text-6xl font-bold leading-tight mb-6"
                    style={{ color: "#1f2937" }}
                  >
                    Healthcare Data
                    <span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                      Erasure Solutions
                    </span>
                  </h1>
                  <p
                    className="text-xl leading-relaxed"
                    style={{ color: "#4b5563" }}
                  >
                    Securely erase PHI and ePHI permanently from drives, PCs, laptops, Macs, servers, and mobile devices. 
                    Ensure 100% compliance with HIPAA, GDPR, and NIST 800-88 standards for data sanitization.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowLicenseModal(true)}
                    className="inline-flex items-center justify-center text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    style={{ backgroundColor: "#059669" }}
                  >
                    Request Free License
                    <svg
                      className="ml-2 w-5 h-5"
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
                  <button
                    className="inline-flex items-center justify-center border-2 px-8 py-4 rounded-lg font-semibold transition-all"
                    style={{ borderColor: "#059669", color: "#059669" }}
                  >
                    Download Solution Overview
                  </button>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="relative">
                  <div
                    className="relative rounded-3xl shadow-2xl p-10 border"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#e5e7eb",
                    }}
                  >
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl rotate-12 opacity-20"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-emerald-500 rounded-2xl -rotate-12 opacity-20"></div>

                    <div className="relative space-y-8">
                      <div className="flex justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-50"></div>
                          <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl">
                            <svg
                              className="w-16 h-16 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="text-center space-y-3">
                        <h3 className="text-2xl font-bold" style={{ color: "#1f2937" }}>
                          PHI Protection
                        </h3>
                        <p style={{ color: "#6b7280" }}>
                          Securely sanitizing medical records across all assets
                        </p>
                      </div>

                      <div
                        className="grid grid-cols-2 gap-4 pt-6 border-t"
                        style={{ borderColor: "#e5e7eb" }}
                      >
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: "#059669" }}>
                            100%
                          </div>
                          <div className="text-xs mt-1" style={{ color: "#9ca3af" }}>
                            HIPAA Compliant
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: "#059669" }}>
                            Audit
                          </div>
                          <div className="text-xs mt-1" style={{ color: "#9ca3af" }}>
                            Ready Reports
                          </div>
                        </div>
                      </div>
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
          className="py-20"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div
                className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "#e8f5e9", color: "#059669" }}
              >
                Regulation & Standards
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1f2937" }}>
                Stay Compliant with DSecure
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
                Meet the most stringent healthcare data protection laws globally with our auditable sanitization solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "HIPAA Security Rule",
                  desc: "Safeguard PHI and ePHI with US DoD 5220.22 or NIST 800-88 wiping methods to render data unrecoverable.",
                  icon: "⚕️",
                },
                {
                  title: "EU-GDPR Readiness",
                  desc: "Comply with Article 17 (Right to Erasure) and Article 32 (Security of Processing) with permanent data deletion.",
                  icon: "🇪🇺",
                },
                {
                  title: "HITECH Act",
                  desc: "Maintain detailed audit trails and tamper-proof certificates to reduce data breach risks and meet HITECH requirements.",
                  icon: "🔒",
                },
              ].map((comp, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl border bg-slate-50 hover:shadow-lg transition-all"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <div className="text-4xl mb-4">{comp.icon}</div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "#1f2937" }}>
                    {comp.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
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
          className="py-20 bg-slate-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div
                className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "#e8f5e9", color: "#059669" }}
              >
                Device Support
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1f2937" }}>
                Sanitize Every Asset
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
                Wipe patient records from any device, anywhere, with DSecure tools.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "💻", title: "PCs & Laptops", desc: "Securely wipe Windows, Mac, and Chromebooks." },
                { icon: "💾", title: "Drives & Servers", desc: "Sanitize HDD, SSD, and large-scale server racks." },
                { icon: "📱", title: "Mobile Devices", desc: "Regulatory erasure for iOS and Android tablets/phones." },
                { icon: "📄", title: "Files & Folders", desc: "Remote wiping of specific records without losing the OS." },
              ].map((asset, idx) => (
                <div
                  key={idx}
                  className="text-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div className="text-5xl mb-4">{asset.icon}</div>
                  <h4 className="text-lg font-bold mb-2" style={{ color: "#1f2937" }}>
                    {asset.title}
                  </h4>
                  <p className="text-sm" style={{ color: "#6b7280" }}>{asset.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Solutions Section */}
        <section
          id="solutions"
          className="py-20"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#1f2937" }}>
                  Ideal for Healthcare & Insurance Providers
                </h2>
                <p className="text-lg mb-8" style={{ color: "#4b5563" }}>
                  Whether you are retiring legacy systems, repurposing equipment, or fulfilling "Right to be Forgotten" requests, 
                  DSecure provides the tools to ensure patient privacy remains intact.
                </p>
                <ul className="space-y-4">
                  {[
                    "PXE Boot solution for mass wiping of network servers",
                    "USB Boot solution for on-site standalone machine erasure",
                    "MSI Package for remote Windows endpoint wiping",
                    "Centralized Cloud Console for license & report management",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-emerald-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span style={{ color: "#4b5563" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 shadow-inner">
                <h3 className="text-2xl font-bold mb-6" style={{ color: "#065f46" }}>
                  Why Choose DSecure?
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Audit-Ready Reporting</h4>
                    <p className="text-sm text-emerald-800">Generate tamper-proof audit trails for every erasure task instantly.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Global Standards</h4>
                    <p className="text-sm text-emerald-800">Support for NIST, DoD, and other major international standards.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Scalable Architecture</h4>
                    <p className="text-sm text-emerald-800">Erase one file or 65,000 servers. DSecure scales with your organization.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="py-20 bg-slate-50"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1f2937" }}>
                Frequently Asked Questions
              </h2>
              <p style={{ color: "#6b7280" }}>Common queries about Healthcare data sanitization</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "How does DSecure help with HIPAA compliance?",
                  a: "DSecure uses industry-standard wiping methods (NIST 800-88, DoD) to permanently erase PHI from medical devices and drives, providing a tamper-proof certificate as proof of compliance for audits.",
                },
                {
                  q: "Can I erase medical devices remotely?",
                  a: "Yes, our MSI package and remote console allow you to target endpoint devices and computers over your network without physical presence, provided they are connected.",
                },
                {
                  q: "What types of health records can be erased?",
                  a: "You can erase entire drives (HDD/SSD), individual files/folders containing EMR/EHR, or even clear free space where deleted files might still reside.",
                },
                {
                  q: "Do you support offline wiping for high-security labs?",
                  a: "Yes, our USB Boot solution is perfect for isolated environments. Reports can be saved locally and synced later to the cloud console.",
                },
              ].map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all border"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-lg font-semibold" style={{ color: "#1f2937" }}>
                      {faq.q}
                    </span>
                    <svg
                      className="w-5 h-5 group-open:rotate-180 transition-transform"
                      style={{ color: "#059669" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 leading-relaxed" style={{ color: "#6b7280" }}>
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
          title="Request Free License - Healthcare"
        />
      )}
    </>
  );
};

export default HealthcareSolutionsPage;