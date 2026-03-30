import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm } from "@/components/forms";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";

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
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-6.75 3.524z" />
                  </svg>
                  <span>Secure. Privacy-Compliant. Education Focused.</span>
                </div>

                <div>
                  <h1
                    className="text-5xl md:text-6xl font-bold leading-tight mb-6"
                    style={{ color: "#1f2937" }}
                  >
                    Digital Data{" "}
                    <span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                      Erasure for Schools
                    </span>
                  </h1>
                  <p
                    className="text-xl leading-relaxed"
                    style={{ color: "#4b5563" }}
                  >
                    Securely erase student and staff sensitive data permanently from Chromebooks, PCs, laptops, and lab servers. 
                    Ensure 100% compliance with FERPA and COPPA standards for student data privacy while decommissioning old IT assets.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowLicenseModal(true)}
                    className="inline-flex items-center justify-center text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    style={{ backgroundColor: "#059669" }}
                  >
                    Get Free Campus License
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
                    Campus Solution Guide
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="text-center space-y-3">
                        <h3 className="text-2xl font-bold" style={{ color: "#1f2937" }}>
                          Student Data Protection
                        </h3>
                        <p style={{ color: "#6b7280" }}>
                          Compliance-verified sanitization across school assets
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
                            FERPA Compliant
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: "#059669" }}>
                            Ready
                          </div>
                          <div className="text-xs mt-1" style={{ color: "#9ca3af" }}>
                            Audit Trails
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
                Education Privacy & Standards
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1f2937" }}>
                Strict Compliance for Institutions
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
                Meet student data protection laws with our auditable sanitization solutions for schools and universities.
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
                Hardware Support
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1f2937" }}>
                Erase Campus IT Assets
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
                Supporting a wide range of devices found in modern educational environments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "🎓", title: "Chromebooks", desc: "Bulk wiping for student laptops and education-grade devices." },
                { icon: "🔬", title: "Lab PCs & Macs", desc: "Sanitize high-performance workstations in research and computer labs." },
                { icon: "🏫", title: "School Servers", desc: "Securely erase server-side student information and admin records." },
                { icon: "📱", title: "Staff Tablets", desc: "Sanitize iOS and Android devices used by faculty and staff." },
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

        {/* School Solutions Section */}
        <section
          id="solutions"
          className="py-20"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#1f2937" }}>
                  Institutional Grade Data Disposal
                </h2>
                <p className="text-lg mb-8" style={{ color: "#4b5563" }}>
                  Educational institutions frequently upgrade technology. We help IT departments manage large-scale data destruction 
                  efficiently without physical disk destruction, promoting green campus initiatives.
                </p>
                <ul className="space-y-4">
                  {[
                    "Network PXE booting for mass wiping of entire computer labs",
                    "USB sanitization for hybrid work laptops and off-site staff",
                    "Cloud-based management for central tracking across multiple campuses",
                    "Sustainability-focused disposal through high-grade reusable wiping",
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
                  Why Education Leaders Trust D-Secure?
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Compliance Verification</h4>
                    <p className="text-sm text-emerald-800">Generate auditable proofs for State and Federal privacy auditors.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Asset Lifetime Value</h4>
                    <p className="text-sm text-emerald-800">Erase data while keeping the hardware intact for resale or donations.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Campus-Wide Centralization</h4>
                    <p className="text-sm text-emerald-800">Manage all student data sanitization from a single web dashboard.</p>
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
              <p style={{ color: "#6b7280" }}>Common queries for institutional IT teams</p>
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
          title="Request Free Campus License - Education"
        />
      )}
    </>
  );
};

export default EducationPage;
