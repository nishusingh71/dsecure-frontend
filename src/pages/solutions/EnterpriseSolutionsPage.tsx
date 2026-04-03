import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { LicenseForm } from "@/components/forms";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import SolutionHeroGraphic from "@/components/SolutionHeroGraphic";
import SolutionContactSection from "@/components/SolutionContactSection";

const EnterpriseSolutionsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "capabilities", label: "Capabilities" },
    { id: "assets", label: "Assets" },
    { id: "compliance", label: "Compliance" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

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
      <SEOHead seo={getSEOForPage("enterprise-solutions")} />

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
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure Scalable Compliant</span>
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                    Solutions for{" "}
                    <span className="block bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent pb-1">
                      Enterprise
                    </span>
                  </h1>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  Reliable data erasure for hard drives, laptops, desktops,
                  Macs, mobile devices, and rackmount storage. Helps achieve
                  compliance with data protection laws & standards, including
                  GDPR, CCPA, and ISO 27001.
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
                    href="https://assets.dsecuretech.com/pdf/DSECUR_enterprise.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold bg-white transition-all duration-300 shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                    Solution Overview
                  </a>
                </div>

                {/* Compliance Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-emerald-100/50">
                  {["GDPR", "CCPA", "ISO 27001", "NIST 800-88"].map((badge) => (
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

              {/* Right Column: Interactive Enterprise Ecosystem */}
              <SolutionHeroGraphic
                centerIcon={
                  <svg width="80" height="80" viewBox="0 0 72 72" fill="none" className="drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)]">
                    <rect x="14" y="12" width="44" height="48" fill="#10b981" rx="3" />
                    <rect x="16" y="14" width="40" height="44" fill="#059669" rx="2" />
                    {[20, 30, 40].map(x =>
                      [20, 28, 36, 44].map(y => (
                        <rect key={`${x}-${y}`} x={x} y={y} width="8" height="5" fill="#d1fae5" rx="0.5" />
                      ))
                    )}
                    <rect x="30" y="48" width="12" height="10" fill="#047857" rx="1.5" />
                    <rect x="12" y="10" width="48" height="4" fill="#10b981" rx="1" />
                    <rect x="28" y="5" width="16" height="7" fill="#059669" rx="1" />
                    <rect x="10" y="58" width="52" height="4" fill="#047857" rx="1" />
                  </svg>
                }
                centerLabel="ENTERPRISE"
                devices={[
                  {
                    label: "DESKTOP",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
                  },
                  {
                    label: "LAPTOP",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M2 19h20" /></svg>,
                  },
                  {
                    label: "SERVER",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><circle cx="7" cy="6" r="1" fill="#16a34a" stroke="none" /><circle cx="7" cy="18" r="1" fill="#16a34a" stroke="none" /><line x1="11" y1="6" x2="17" y2="6" /><line x1="11" y1="18" x2="17" y2="18" /></svg>,
                  },
                  {
                    label: "MOBILE",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="#0d9488" stroke="none" /></svg>,
                  },
                  {
                    label: "CLOUD",
                    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" /></svg>,
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="capabilities"
          className="py-20"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div
                className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "#e8f5e9", color: "#059669" }}
              >
                Key Capabilities
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: "#1f2937" }}
              >
                Scalable Enterprise Erasure
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: "#6b7280" }}
              >
                Data erasure software built for large-scale operations across
                physical and online networks
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🌐",
                  title: "Network Server Wiping",
                  desc: "Wipe up to 65,000 drives simultaneously over a network using PXE boot, with support for RAID dismantling.",
                },
                {
                  icon: "📁",
                  title: "File & Folder Erasure",
                  desc: "Securely erase sensitive files locally or over a network without affecting the OS, meeting data minimisation principles.",
                },
                {
                  icon: "💻",
                  title: "Multiple Device Management",
                  desc: "Centrally manage, monitor, and execute secure erasure protocols across a wide range of enterprise devices including laptops, desktops, and endpoint machines.",
                },
                {
                  icon: "☁️",
                  title: "Cloud Console Utility",
                  desc: "Centralized admin console for managing users, licenses, and maintaining a repository of tamper-proof audit reports with certificate.",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="group p-6 rounded-2xl hover:shadow-lg transition-all border border-transparent hover:border-emerald-100"
                  style={{ backgroundColor: "#f9fafb" }}
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: "#1f2937" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6b7280" }}
                  >
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Device Support Section */}
        <section
          id="assets"
          className="py-20 bg-gradient-to-b"
          style={{ background: "linear-gradient(to bottom, #f9fafb, #ffffff)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div
                className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "#e8f5e9", color: "#059669" }}
              >
                Supported Assets
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: "#1f2937" }}
              >
                Erase Any Storage IT Asset
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: "#6b7280" }}
              >
                Achieve complete sanitization across your entire hardware fleet
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "💾",
                  title: "Drive Wiping",
                  desc: "Guarantees wiping of HDDs and SSDs for PCs and Servers.",
                },
                {
                  icon: "💻",
                  title: "Mac Wiping",
                  desc: "Secure erasure for Apple Silicon (M-Series) and Intel-based Macs.",
                },
                {
                  icon: "📱",
                  title: "Mobile Wiping",
                  desc: "Regulatory data erasure for iOS and Android smartphones & tablets.",
                },
                {
                  icon: "🗑️",
                  title: "File Erasure",
                  desc: "Wipe files, histories, and traces on a machine or over a network.",
                },
              ].map((device, idx) => (
                <div
                  key={idx}
                  className="text-center p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <div className="text-6xl mb-4">{device.icon}</div>
                  <h4
                    className="text-xl font-bold mb-2"
                    style={{ color: "#1f2937" }}
                  >
                    {device.title}
                  </h4>
                  <p className="text-sm" style={{ color: "#6b7280" }}>
                    {device.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Solutions (Certifications & Compliance) Section */}
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
                Compliant
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: "#1f2937" }}
              >
                Global Compliance Standards
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: "#6b7280" }}
              >
                Approved by global bodies for safe and permanent data
                sanitization
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                // {
                //   title: "ADISA Assurance Level 5",
                //   desc: "Compliant to the highest level for data sanitization effectiveness.",
                //   features: [
                //     "IEEE 2883 Clear & Purge Methods",
                //     "NIST 800-88 Purge compliance",
                //     "Forensic verifiability",
                //   ],
                // },
                {
                  title: "NIST 800-88 Compliance",
                  desc: "Ensures compliance with US government standards for media sanitization.",
                  features: [
                    "Clear, Purge, and Destroy guidelines",
                    "Tamper-proof audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
                    "Cryptographic erase support",
                  ],
                },
                {
                  title: "HIPAA & GDPR Ready",
                  desc: "Aligns perfectly with strict regional data protection laws globally.",
                  features: [
                    "PHI and ePHI data protection",
                    "Right to be forgotten compliance",
                    "Tamper-proof audit trails",
                  ],
                },
                {
                  title: "Common Criteria EAL2",
                  desc: "Internationally recognized IC3S security standard verification.",
                  features: [
                    "Regulatory security controls",
                    "Independent lab validation",
                    "Government-grade trust",
                  ],
                },
              ].map((solution, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl hover:shadow-lg transition-all border"
                  style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}
                >
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: "#1f2937" }}
                  >
                    {solution.title}
                  </h3>
                  <p className="mb-6" style={{ color: "#6b7280" }}>
                    {solution.desc}
                  </p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, fidx) => (
                      <li
                        key={fidx}
                        className="flex items-center text-sm"
                        style={{ color: "#4b5563" }}
                      >
                        <svg
                          className="w-5 h-5 mr-2 flex-shrink-0"
                          style={{ color: "#059669" }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="py-20 bg-gradient-to-b"
          style={{ background: "linear-gradient(to bottom, #f9fafb, #ffffff)" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div
                className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "#e8f5e9", color: "#059669" }}
              >
                FAQ
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: "#1f2937" }}
              >
                Enterprise Solutions Questions
              </h2>
              <p className="text-lg" style={{ color: "#6b7280" }}>
                Frequently asked questions regarding our enterprise erasure
                platform
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "What types of drives can be erased over the network?",
                  a: "Administrators can perform centralized network wiping on up to 65,000 drives simultaneously using PXE boot, targeting servers, laptops, and desktop fleets seamlessly.",
                },
                {
                  q: "Does it support automatic RAID dismantling?",
                  a: "Yes, our enterprise Drive Eraser seamlessly supports automatic RAID dismantling during the server erasure process, simplifying data center decommissioning.",
                },
                {
                  q: "Can I erase files without removing the OS?",
                  a: "Yes, File Eraser allows you to permanently erase sensitive or unwanted files, folders, email traces, and free space without disrupting the underlying operating system.",
                },
                {
                  q: "Do you provide offline wiping support?",
                  a: "Yes. Our bootable USB solutions are ideal for high-security facilities (like military or R&D environments) with strict internet usage policies, allowing offline erasure and secure report saving.",
                },
                {
                  q: "Where are the tamper-proof audit reports with certificate saved?",
                  a: "For internet-connected endpoints, tamper-proof, digitally signed certificates are instantly uploaded to a secure, centralized Cloud Console. For offline tasks, they can be saved locally.",
                },
              ].map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl p-6 shadow-sm hover:shadow-md transition-all border"
                  style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}
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
        <SolutionContactSection source="Enterprise Solutions Page" subjectPrefix="New Inquiry - Enterprise Solutions" />
      </div>

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onClose={() => setShowLicenseModal(false)}
          title="Request Free License - Enterprise"
        />
      )}
    </>
  );
};

export default EnterpriseSolutionsPage;
