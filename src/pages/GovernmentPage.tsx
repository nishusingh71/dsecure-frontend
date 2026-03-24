import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm } from "@/components/forms";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";

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
                      d="M2.166 4.9L10 1.55l7.834 3.35a1 1 0 01.666.936v4.444c0 4.635-3.044 8.718-7.5 10.12-4.456-1.402-7.5-5.485-7.5-10.12V5.836a1 1 0 01.666-.936zM10 3.3L3.5 6.1v3.9c0 3.654 2.308 6.942 6.5 8.2 4.192-1.258 6.5-4.546 6.5-8.2V6.1L10 3.3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Safe. Compliant. Military-Grade Security.</span>
                </div>

                <div>
                  <h1
                    className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
                    style={{ color: "#0f172a" }}
                  >
                    Government Data{" "}
                    <span className="block bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                      Sanitization Solutions
                    </span>
                  </h1>
                  <p
                    className="text-xl leading-relaxed max-w-xl"
                    style={{ color: "#475569" }}
                  >
                    D-Secure helps government bodies and authorized vendors securely erase sensitive data from drives & devices. 
                    Meeting NIST 800-88, DoD, and CMMC standards with automated audit trails.
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
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
                    alt="Federal Security"
                    className="rounded-[2rem] w-full object-cover"
                  />
                  <div className="absolute top-8 left-8 bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg">
                    Defense Grade
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
