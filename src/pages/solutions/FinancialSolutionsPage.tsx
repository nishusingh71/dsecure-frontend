import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm } from "@/components/forms";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";

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
      <SEOHead seo={getSEOForPage("solutions/financial-services")} />

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

      <div
        className="font-['Inter',_'Segoe_UI',_'Roboto',_sans-serif] antialiased"
        style={{ backgroundColor: "#ffffff", color: "#1f2937" }}
      >
        {/* Hero Section - Overview */}
        <section
          id="overview"
          className="relative min-h-[85vh] flex items-center py-12 md:py-16 overflow-hidden"
          style={{ backgroundColor: "#f8fafc" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-3xl opacity-20 -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-100/50 rounded-full blur-3xl opacity-20 -ml-64 -mb-64"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in-up">
                <div
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-bold shadow-sm border border-emerald-100"
                  style={{ color: "#065f46" }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Safe. Compliant. Banking-Grade Security.</span>
                </div>

                <div>
                  <h1
                    className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
                    style={{ color: "#0f172a" }}
                  >
                    Financial Data{" "}
                    <span className="block bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                      Erasure Solutions
                    </span>
                  </h1>
                  <p
                    className="text-xl leading-relaxed max-w-xl"
                    style={{ color: "#475569" }}
                  >
                    Using D-Secure, erase financial data permanently from drives, laptops, Macs, servers & mobile devices. 
                    Ensure 100% compliance with PCI-DSS, SOX, GLBA, and FACTA standards for data sanitization.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowLicenseModal(true)}
                    className="inline-flex items-center justify-center text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] transform"
                    style={{ backgroundColor: "#059669" }}
                  >
                    Request Free License
                  </button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center border-2 px-8 py-4 rounded-xl font-bold transition-all bg-white hover:bg-slate-50 shadow-sm"
                    style={{ borderColor: "#059669", color: "#059669" }}
                  >
                    Connect with Experts
                  </Link>
                </div>
              </div>

              <div className="hidden md:block relative animate-fade-in">
                <div className="absolute inset-0 bg-emerald-400 blur-[80px] opacity-10 rounded-full"></div>
                <div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl border border-emerald-50 overflow-hidden transform hover:rotate-1 transition-transform duration-500">
                  <div className="relative space-y-8 p-6">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-50"></div>
                        <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl flex items-center justify-center shadow-xl">
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
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <h3 className="text-2xl font-bold" style={{ color: "#1f2937" }}>
                        Financial Security
                      </h3>
                      <p style={{ color: "#6b7280" }}>
                        Guaranteed sanitization for audit readiness
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">100%</div>
                        <div className="text-xs mt-1 text-slate-400 uppercase tracking-wider font-bold">PCI DSS Ready</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">Audit</div>
                        <div className="text-xs mt-1 text-slate-400 uppercase tracking-wider font-bold">Compliant Trails</div>
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
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: "#0f172a" }}>
                Unmatched Financial Compliance
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
                DSecure enables financial organizations to completely sanitize media before it is transferred, disposed of, or reused according to global guidelines.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "PCI-DSS Compliance",
                  desc: "Secure disposal of cardholder data when it is no longer needed, rendering it completely unrecoverable.",
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
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{comp.icon}</div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>
                    {comp.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
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
                <h2 className="text-4xl font-extrabold mb-6" style={{ color: "#0f172a" }}>
                  Sanitize Every Storage Media
                </h2>
                <p className="text-lg mb-8" style={{ color: "#475569" }}>
                  Financial institutions handle data across a variety of hardware. D-Secure ensures all cardholder and consumer data is permanently removed across your entire fleet.
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
                      <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium" style={{ color: "#475569" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-emerald-50">
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1760089918/uh9vcisoo7jwfggjbilf.jpg"
                  alt="Banking Data Security"
                  className="rounded-[2rem] w-full shadow-inner"
                />
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
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: "#0f172a" }}>
                Ideal for Banks & Financial Institutions
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
                  className="p-8 rounded-3xl hover:bg-emerald-50/50 transition-all border border-transparent hover:border-emerald-100 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{solution.icon}</div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>
                    {solution.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                    {solution.desc}
                  </p>
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
                    <span className="text-xl font-bold pr-6" style={{ color: "#0f172a" }}>{faq.q}</span>
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
