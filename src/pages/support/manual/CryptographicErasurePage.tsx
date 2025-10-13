import React, { useState, memo } from "react";
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import OptimizedImage from '@/components/OptimizedImage';
import { getFallbackImage } from '@/utils/imagePlaceholders';

const CryptographicErasurePage: React.FC = memo(() => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const manualSections = [
    {
      id: 1,
      title: "Introduction & Importance",
      description: "Understanding cryptographic erasure and modern data security",
      icon: "🔐",
      subsections: [
        {
          id: 11,
          title: "Why Cryptographic Erasure Matters",
          description: "Modern data breach risks and limitations of traditional methods",
          url: "/support/manual/crypto-importance",
          pageCount: 2,
        },
        {
          id: 12,
          title: "How Cryptographic Erasure Works",
          description: "Key destruction mechanism and technical process",
          url: "/support/manual/crypto-process",
          pageCount: 2,
        },
        {
          id: 13,
          title: "Benefits & Advantages",
          description: "Speed, security, and sustainability benefits",
          url: "/support/manual/crypto-benefits",
          pageCount: 1,
        },
      ],
    },
    {
      id: 2,
      title: "Technical Implementation",
      description: "Supported devices and step-by-step erasure process",
      icon: "⚙️",
      subsections: [
        {
          id: 21,
          title: "Supported Devices & Environments",
          description: "NVMe, SATA, SAS SSDs and self-encrypting drives",
          url: "/support/manual/supported-devices",
          pageCount: 2,
        },
        {
          id: 22,
          title: "Step-by-Step Erasure Process",
          description: "Complete workflow from boot to certificate generation",
          url: "/support/manual/erasure-process",
          pageCount: 3,
        },
        {
          id: 23,
          title: "BitRaser Integration",
          description: "DSecure tools and drive eraser USB workflow",
          url: "/support/manual/bitraser-integration",
          pageCount: 2,
        },
      ],
    },
    {
      id: 3,
      title: "Comparison & Analysis",
      description: "Cryptographic vs traditional overwriting methods",
      icon: "📊",
      subsections: [
        {
          id: 31,
          title: "Feature Comparison Table",
          description: "Speed, compatibility, and compliance comparison",
          url: "/support/manual/comparison-table",
          pageCount: 2,
        },
        {
          id: 32,
          title: "Performance Analysis",
          description: "Time savings and efficiency metrics",
          url: "/support/manual/performance-analysis",
          pageCount: 1,
        },
        {
          id: 33,
          title: "Limitations & Considerations",
          description: "Encryption requirements and firmware compatibility",
          url: "/support/manual/limitations",
          pageCount: 2,
        },
      ],
    },
    {
      id: 4,
      title: "Compliance & Certification",
      description: "Regulatory standards and audit requirements",
      icon: "✅",
      subsections: [
        {
          id: 41,
          title: "Compliance Standards",
          description: "NIST, DoD, ISO, GDPR, and PDP Bill alignment",
          url: "/support/manual/compliance-standards",
          pageCount: 2,
        },
        {
          id: 42,
          title: "Certificate Generation",
          description: "Tamper-proof erasure certificates and audit trails",
          url: "/support/manual/certificate-generation",
          pageCount: 2,
        },
        {
          id: 43,
          title: "Audit & Verification",
          description: "Forensic-grade verification and compliance proof",
          url: "/support/manual/audit-verification",
          pageCount: 1,
        },
      ],
    },
    {
      id: 5,
      title: "Enterprise Applications",
      description: "Business benefits and industry use cases",
      icon: "🏢",
      subsections: [
        {
          id: 51,
          title: "Enterprise Benefits",
          description: "Cost savings, efficiency, and compliance advantages",
          url: "/support/manual/enterprise-benefits",
          pageCount: 2,
        },
        {
          id: 52,
          title: "Industry Use Cases",
          description: "Government, banking, healthcare, and ITAD applications",
          url: "/support/manual/industry-use-cases",
          pageCount: 2,
        },
        {
          id: 53,
          title: "DSecure Cloud Console",
          description: "Centralized management and reporting dashboard",
          url: "/support/manual/cloud-console",
          pageCount: 2,
        },
      ],
    },
    {
      id: 6,
      title: "Best Practices & Future",
      description: "Implementation guidelines and emerging trends",
      icon: "🚀",
      subsections: [
        {
          id: 61,
          title: "Best Practices for SSD Erasure",
          description: "Encryption setup, validation, and maintenance",
          url: "/support/manual/best-practices",
          pageCount: 2,
        },
        {
          id: 62,
          title: "Future of Secure Erasure",
          description: "AI verification, blockchain logs, and energy efficiency",
          url: "/support/manual/future-trends",
          pageCount: 2,
        },
        {
          id: 63,
          title: "Environmental Impact",
          description: "Sustainability and e-waste reduction benefits",
          url: "/support/manual/environmental-impact",
          pageCount: 1,
        },
        {
          id: 64,
          title: "Common Questions & Answers",
          description: "FAQs about cryptographic erasure process",
          url: "/support/manual/faqs",
          pageCount: 2,
        },
      ],
    },
  ];

  const filteredSections = manualSections.filter((section) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(query) ||
      section.description.toLowerCase().includes(query) ||
      section.subsections.some(
        (sub) =>
          sub.title.toLowerCase().includes(query) ||
          sub.description.toLowerCase().includes(query)
      )
    );
  });

  const toggleSection = (id: number) => {
    setActiveSection(activeSection === id ? null : id);
  };

  const getTotalPages = (section: any) => {
    return section.subsections.reduce((total: number, sub: any) => total + sub.pageCount, 0);
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('cryptographic-erasure')} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Cryptographic Erasure
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                  Secure. Instant. Irreversible. Next-generation data sanitization through encryption key destruction.
                </p>
                
                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search cryptographic erasure..."
                      className="w-full px-6 py-4 pl-12 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg shadow-sm"
                    />
                    <svg
                      className="w-6 h-6 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900 mb-2">Instant</h3>
                  <p className="text-slate-600">Seconds vs hours for traditional methods</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">🔒</span>
                  </div>
                  <h3 className="text-xl font-bold text-teal-900 mb-2">Secure</h3>
                  <p className="text-slate-600">NIST 800-88 Purge level compliance</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">🌱</span>
                  </div>
                  <h3 className="text-xl font-bold text-cyan-900 mb-2">Sustainable</h3>
                  <p className="text-slate-600">No drive wear, enables reuse</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Process Overview */}
        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  How Cryptographic Erasure Works
                </h2>
                <p className="text-xl text-slate-700 max-w-2xl mx-auto">
                  Instead of overwriting data, destroy the encryption keys — making all data permanently inaccessible
                </p>
              </div>
            </Reveal>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-xl mx-auto mb-4">
                      1
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-lg">Encrypted Drive</h3>
                    <p className="text-slate-600">Data is encrypted with AES-256 bit encryption</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-2xl flex items-center justify-center text-xl mx-auto mb-4">
                      2
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-lg">Key Destruction</h3>
                    <p className="text-slate-600">Encryption keys are permanently deleted</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-2xl flex items-center justify-center text-xl mx-auto mb-4">
                      3
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-lg">Data Inaccessible</h3>
                    <p className="text-slate-600">All data becomes cryptographically unreadable</p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">🔑</div>
                    <div>
                      <h4 className="font-semibold text-emerald-900 mb-2 text-lg">Analogy</h4>
                      <p className="text-emerald-800">
                        Imagine locking your vault and melting the only key — the vault (drive) remains, but its contents are inaccessible forever.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Cryptographic vs Traditional Overwriting
                </h2>
              </div>
            </Reveal>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 bg-slate-900 text-white">
                  <div className="p-6 font-semibold text-lg">Feature</div>
                  <div className="p-6 font-semibold bg-red-600/20 text-lg">Traditional Overwriting</div>
                  <div className="p-6 font-semibold bg-emerald-600/20 text-lg">Cryptographic Erasure</div>
                </div>

                {[
                  {
                    feature: "Speed",
                    traditional: "Slow, hours for large drives",
                    crypto: "Instant (seconds)",
                  },
                  {
                    feature: "SSD Compatibility",
                    traditional: "Ineffective due to wear-leveling",
                    crypto: "Fully supported",
                  },
                  {
                    feature: "Drive Health",
                    traditional: "Degrades over multiple passes",
                    crypto: "No wear impact",
                  },
                  {
                    feature: "Compliance Proof",
                    traditional: "Limited",
                    crypto: "Verifiable certificate",
                  },
                  {
                    feature: "Encryption Requirement",
                    traditional: "Optional",
                    crypto: "Required (AES-based)",
                  },
                ].map((row, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200 last:border-b-0"
                  >
                    <div className="p-6 font-medium bg-slate-50 text-lg">{row.feature}</div>
                    <div className="p-6 text-slate-600 text-lg">{row.traditional}</div>
                    <div className="p-6 text-emerald-600 font-medium text-lg">{row.crypto}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Manual Sections */}
        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <div className="max-w-4xl mx-auto">
              {filteredSections.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No Sections Found</h3>
                  <p className="text-slate-600">Try adjusting your search terms.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredSections.map((section, index) => (
                    <Reveal key={section.id} delayMs={index * 50}>
                      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full px-6 py-8 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">{section.icon}</div>
                            <div>
                              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                {section.title}
                              </h3>
                              <p className="text-slate-600">{section.description}</p>
                              <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                                <span>{section.subsections.length} topics</span>
                                <span>{getTotalPages(section)} pages</span>
                              </div>
                            </div>
                          </div>
                          <svg
                            className={`w-5 h-5 text-slate-500 transform transition-transform ${
                              activeSection === section.id ? "rotate-180" : ""
                            }`}
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
                        </button>

                        {activeSection === section.id && (
                          <div className="px-6 pb-6">
                            <div className="border-t border-slate-200 pt-6">
                              <div className="grid gap-4">
                                {section.subsections.map((subsection) => (
                                  <a
                                    key={subsection.id}
                                    href={subsection.url}
                                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
                                  >
                                    <div className="flex-1">
                                      <h4 className="font-medium text-slate-900 group-hover:text-emerald-600 transition-colors mb-1 text-lg">
                                        {subsection.title}
                                      </h4>
                                      <p className="text-sm text-slate-600">
                                        {subsection.description}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                      <span>{subsection.pageCount} pages</span>
                                      <svg
                                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Compliance & Certifications
                </h2>
                <p className="text-xl text-slate-700 max-w-2xl mx-auto">
                  Meets global regulatory standards for data sanitization
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                {
                  standard: "NIST SP 800-88",
                  description: "Purge level compliance",
                },
                { standard: "DoD 5220.22-M", description: "Data sanitization" },
                {
                  standard: "ISO/IEC 27040",
                  description: "Information security",
                },
                {
                  standard: "GDPR & PDP Bill",
                  description: "Right-to-erasure",
                },
              ].map((item, index) => (
                <Reveal key={item.standard} delayMs={index * 100}>
                  <div className="bg-white rounded-xl p-6 text-center border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-xl font-bold text-emerald-600 mb-2">{item.standard}</div>
                    <div className="text-sm text-slate-600">{item.description}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Quick Access
                </h2>
                <p className="text-xl text-slate-700 max-w-2xl mx-auto">
                  Essential cryptographic erasure resources
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Start Erasure",
                  description: "Begin secure data sanitization",
                  icon: "🔒",
                  url: "/services/cryptographic-erasure",
                  color: "bg-emerald-500",
                },
                {
                  title: "Compliance Guide",
                  description: "View regulatory standards",
                  icon: "📜",
                  url: "/resources/compliance",
                  color: "bg-teal-500",
                },
                {
                  title: "BitRaser Tools",
                  description: "Integration documentation",
                  icon: "💾",
                  url: "/products/bitraser-drive-eraser",
                  color: "bg-cyan-500",
                },
                {
                  title: "Enterprise Guide",
                  description: "Business implementation",
                  icon: "🏢",
                  url: "/support/manual/enterprise-benefits",
                  color: "bg-purple-500",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delayMs={index * 100}>
                  <a
                    href={item.url}
                    className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 group h-full flex flex-col border border-emerald-100"
                  >
                    <div
                      className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <span className="text-2xl text-white">{item.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm flex-grow">{item.description}</p>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Secure Your SSDs?
                </h2>
                <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                  Take full control of your data lifecycle. Cryptographic Erasure offers the perfect balance of speed, compliance, and sustainability.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a
                    href="/services/cryptographic-erasure"
                    className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-4 rounded-xl transition-colors text-lg inline-flex items-center justify-center"
                  >
                    <span className="mr-2">🔐</span>
                    Start Cryptographic Erasure
                  </a>
                  <a
                    href="/resources/compliance"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-colors text-lg inline-flex items-center justify-center"
                  >
                    <span className="mr-2">📜</span>
                    View Compliance Standards
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Common Questions
                </h2>
              </div>
            </Reveal>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "Can CryptoErase be undone?",
                  answer: "No. Once encryption keys are deleted, data is unrecoverable by any means.",
                },
                {
                  question: "Does it work on HDDs?",
                  answer: "Yes, if the drive supports hardware encryption (SED type). Otherwise, use firmware sanitize.",
                },
                {
                  question: "How long does it take?",
                  answer: "Usually under 15 minutes including verification and report generation.",
                },
              ].map((faq, index) => (
                <Reveal key={index} delayMs={index * 100}>
                  <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
                    <h3 className="font-semibold text-slate-900 mb-2 text-lg">{faq.question}</h3>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
});

export default CryptographicErasurePage;
