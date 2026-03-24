import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm, PartnershipForm } from "@/components/forms";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";

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
                  <span>Empowering MSPs with Scalable Data Security</span>
                </div>

                <div>
                  <h1
                    className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
                    style={{ color: "#0f172a" }}
                  >
                    Managed Service{" "}
                    <span className="block bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                      Provider Solutions
                    </span>
                  </h1>
                  <p
                    className="text-xl leading-relaxed max-w-xl"
                    style={{ color: "#475569" }}
                  >
                    Securely erase clients’ data across every endpoint. D-Secure provides MSPs and System Integrators with 
                    enterprise-grade sanitization tools and centralized audit trails to ensure compliance and risk-free disposal.
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
                  <button
                    onClick={() => setShowPartnerModal(true)}
                    className="inline-flex items-center justify-center border-2 px-8 py-4 rounded-xl font-bold transition-all bg-white hover:bg-slate-50 shadow-sm"
                    style={{ borderColor: "#059669", color: "#059669" }}
                  >
                    Become a Partner
                  </button>
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
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <h3 className="text-2xl font-bold" style={{ color: "#1f2937" }}>
                        Partner Excellence
                      </h3>
                      <p style={{ color: "#6b7280" }}>
                        Scalable sanitization for your global client base
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">65k</div>
                        <div className="text-xs mt-1 text-slate-400 uppercase tracking-wider font-bold">Simultaneous Erasure</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">Pure</div>
                        <div className="text-xs mt-1 text-slate-400 uppercase tracking-wider font-bold">Cloud Management</div>
                      </div>
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
