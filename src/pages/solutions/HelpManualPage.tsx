import React, { useState, memo } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

interface ManualSection {
  id: number;
  title: string;
  description: string;
  icon: string;
  subsections: ManualSubsection[];
}

interface ManualSubsection {
  id: number;
  title: string;
  description: string;
  url: string;
  pageCount: number;
}

const HelpManualPage: React.FC = memo(() => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const manualSections: ManualSection[] = [
    {
      id: 1,
      title: "Getting Started",
      description: "Essential information for new users to get up and running with D-Secure",
      icon: "🚀",
      subsections: [
        {
          id: 11,
          title: "Installation Guide",
          description: "Step-by-step installation instructions for all supported platforms",
          url: "/support/manual/installation",
          pageCount: 8
        },
        {
          id: 12,
          title: "First Time Setup",
          description: "Initial configuration and license activation procedures",
          url: "/support/manual/setup",
          pageCount: 6
        },
        {
          id: 13,
          title: "User Interface Overview",
          description: "Navigate the D-Secure interface and understand key features",
          url: "/support/manual/interface",
          pageCount: 12
        },
        {
          id: 14,
          title: "Quick Start Tutorial",
          description: "Your first data erasure operation in 10 minutes",
          url: "/support/manual/quickstart",
          pageCount: 4
        }
      ]
    },
    {
      id: 2,
      title: "Data Erasure Methods",
      description: "Comprehensive guide to different erasure algorithms and their applications",
      icon: "🔄",
      subsections: [
        {
          id: 21,
          title: "Overwrite Patterns",
          description: "Understanding DoD, NIST, and custom overwrite algorithms",
          url: "/support/manual/overwrite-patterns",
          pageCount: 15
        },
        {
          id: 22,
          title: "Cryptographic Erasure",
          description: "Key destruction and encryption-based erasure methods",
          url: "/support/manual/crypto-erasure",
          pageCount: 10
        },
        {
          id: 23,
          title: "Physical Destruction",
          description: "When and how to use physical destruction methods",
          url: "/support/manual/physical-destruction",
          pageCount: 8
        },
        {
          id: 24,
          title: "Verification Methods",
          description: "Ensuring complete and successful data erasure",
          url: "/support/manual/verification",
          pageCount: 12
        }
      ]
    },
    {
      id: 3,
      title: "Device Support",
      description: "Platform-specific instructions and device compatibility information",
      icon: "📱",
      subsections: [
        {
          id: 31,
          title: "Windows Systems",
          description: "Windows 10/11 erasure procedures and troubleshooting",
          url: "/support/manual/windows",
          pageCount: 20
        },
        {
          id: 32,
          title: "macOS Systems",
          description: "Intel and Apple Silicon Mac erasure procedures",
          url: "/support/manual/macos",
          pageCount: 18
        },
        {
          id: 33,
          title: "Linux Systems",
          description: "Cross-distribution Linux support and command-line tools",
          url: "/support/manual/linux",
          pageCount: 16
        },
        {
          id: 34,
          title: "Mobile Devices",
          description: "iOS and Android device erasure and management",
          url: "/support/manual/mobile",
          pageCount: 14
        },
        {
          id: 35,
          title: "Enterprise Servers",
          description: "Server hardware and virtualization platform support",
          url: "/support/manual/servers",
          pageCount: 25
        }
      ]
    },
    {
      id: 4,
      title: "Advanced Features",
      description: "Power user features, automation, and enterprise capabilities",
      icon: "⚙️",
      subsections: [
        {
          id: 41,
          title: "Batch Operations",
          description: "Automating erasure across multiple devices simultaneously",
          url: "/support/manual/batch-operations",
          pageCount: 12
        },
        {
          id: 42,
          title: "Remote Management",
          description: "Cloud console and remote deployment capabilities",
          url: "/support/manual/remote-management",
          pageCount: 18
        },
        {
          id: 43,
          title: "Scripting & Automation",
          description: "Automation through command-line tools and batch processing",
          url: "/support/manual/scripting",
          pageCount: 22
        },
        {
          id: 44,
          title: "Custom Configurations",
          description: "Creating custom erasure profiles and organization policies",
          url: "/support/manual/custom-configs",
          pageCount: 10
        }
      ]
    },
    {
      id: 5,
      title: "Compliance & Reporting",
      description: "Meeting regulatory requirements and generating audit documentation",
      icon: "📋",
      subsections: [
        {
          id: 51,
          title: "Compliance Standards",
          description: "NIST 800-88, DoD 5220.22-M, and international standards",
          url: "/support/manual/compliance",
          pageCount: 16
        },
        {
          id: 52,
          title: "Regulatory Document Generation",
          description: "Creating tamper-proof regulatory documents of data destruction",
          url: "/support/manual/certificates",
          pageCount: 8
        },
        {
          id: 53,
          title: "Audit Trails",
          description: "Maintaining detailed logs for compliance and forensic purposes",
          url: "/support/manual/audit-trails",
          pageCount: 12
        },
        {
          id: 54,
          title: "Chain of Custody",
          description: "Documenting device handling throughout the erasure process",
          url: "/support/manual/chain-custody",
          pageCount: 6
        }
      ]
    },
    {
      id: 6,
      title: "Troubleshooting",
      description: "Common issues, error messages, and their solutions",
      icon: "🔧",
      subsections: [
        {
          id: 61,
          title: "Common Issues",
          description: "Frequently encountered problems and quick solutions",
          url: "/support/manual/common-issues",
          pageCount: 20
        },
        {
          id: 62,
          title: "Error Codes",
          description: "Complete reference of error codes and their meanings",
          url: "/support/manual/error-codes",
          pageCount: 15
        },
        {
          id: 63,
          title: "Performance Optimization",
          description: "Optimizing erasure speed and system performance",
          url: "/support/manual/performance",
          pageCount: 12
        },
        {
          id: 64,
          title: "Recovery Procedures",
          description: "What to do when erasure operations fail or are interrupted",
          url: "/support/manual/recovery",
          pageCount: 10
        }
      ]
    }
  ];

  const filteredSections = manualSections.filter(section => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return section.title.toLowerCase().includes(query) ||
      section.description.toLowerCase().includes(query) ||
      section.subsections.some(sub =>
        sub.title.toLowerCase().includes(query) ||
        sub.description.toLowerCase().includes(query)
      );
  });

  const toggleSection = (id: number) => {
    setActiveSection(activeSection === id ? null : id);
  };

  const getTotalPages = (section: ManualSection) => {
    return section.subsections.reduce((total, sub) => total + sub.pageCount, 0);
  };

  return (
    <>
      {/* <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/support/help-manual" />
        <title>Help Manual | D-Secure Documentation & User Guide</title>
        <meta
          name="description"
          content="Comprehensive D-Secure help manual with detailed documentation, user guides, troubleshooting, and advanced features for data erasure solutions."
        />
        <meta
          name="keywords"
          content="D-Secure help manual, documentation, user guide, data erasure manual, technical documentation"
        />
        <meta name="robots" content="index, follow" />
      </Helmet> */}
      <SEOHead seo={getSEOForPage('help-manual')} />

      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center">
                <div className="mb-8">
                  <Link to="/support" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Support
                  </Link>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                    Help <span className="text-brand">Manual</span>
                  </h1>
                  <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-8">
                    Comprehensive documentation and user guide for D-Secure data erasure solutions
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-2xl mx-auto relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search manual sections..."
                      className="w-full px-6 py-4 pl-12 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-lg"
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

        {/* Manual Overview */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="container-responsive">
            <Reveal>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    {manualSections.length}
                  </div>
                  <div className="text-slate-600">Manual Sections</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    {manualSections.reduce((total, section) => total + section.subsections.length, 0)}
                  </div>
                  <div className="text-slate-600">Topics Covered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    {manualSections.reduce((total, section) => total + getTotalPages(section), 0)}
                  </div>
                  <div className="text-slate-600">Total Pages</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Manual Sections */}
        <section className="py-16 md:py-24">
          <div className="container-responsive max-w-4xl">
            {filteredSections.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No Sections Found</h3>
                <p className="text-slate-600">Try adjusting your search terms.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSections.map((section, index) => (
                  <Reveal key={section.id} delayMs={index * 50}>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full px-6 py-6 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">{section.icon}</div>
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-1">
                              {section.title}
                            </h3>
                            <p className="text-slate-600 text-sm">
                              {section.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                              <span>{section.subsections.length} topics</span>
                              <span>{getTotalPages(section)} pages</span>
                            </div>
                          </div>
                        </div>
                        <svg
                          className={`w-5 h-5 text-slate-500 transform transition-transform ${activeSection === section.id ? "rotate-180" : ""
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {activeSection === section.id && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-slate-200 pt-4">
                            <div className="grid gap-4">
                              {section.subsections.map((subsection) => (
                                <Link
                                  key={subsection.id}
                                  to={subsection.url}
                                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                                >
                                  <div className="flex-1">
                                    <h4 className="font-medium text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">
                                      {subsection.title}
                                    </h4>
                                    <p className="text-sm text-slate-600">
                                      {subsection.description}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <span>{subsection.pageCount} pages</span>
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </div>
                                </Link>
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
        </section>

        {/* Quick Access */}
        <section className="py-16 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Quick Access
                </h2>
                <p className="text-xl text-slate-700 max-w-2xl mx-auto">
                  Jump to commonly accessed manual sections
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Installation",
                  description: "Get started with installation",
                  icon: "📥",
                  url: "/support/manual/installation",
                  color: "bg-blue-500"
                },
                {
                  title: "Quick Start",
                  description: "Your first erasure in 10 minutes",
                  icon: "⚡",
                  url: "/support/manual/quickstart",
                  color: "bg-green-500"
                },
                {
                  title: "Troubleshooting",
                  description: "Fix common issues",
                  icon: "🔧",
                  url: "/support/manual/common-issues",
                  color: "bg-red-500"
                },
                {
                  title: "Error Codes",
                  description: "Understand error messages",
                  icon: "⚠️",
                  url: "/support/manual/error-codes",
                  color: "bg-yellow-500"
                }
              ].map((item, index) => (
                <Reveal key={item.title} delayMs={index * 100}>
                  <Link
                    to={item.url}
                    className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {item.description}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-16 bg-slate-100">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Download PDF Manual
                </h2>
                <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
                  Get the complete D-Secure manual as a downloadable PDF for offline reference
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Complete Manual (PDF)
                  </button>
                  <button className="bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H9.5a2 2 0 00-2 2v4a2 2 0 002 2h2m3-4v6m0 0l-3-3m3 3l3-3" />
                    </svg>
                    Quick Reference Guide (PDF)
                  </button>
                </div>
                <p className="text-sm text-slate-600 mt-4">
                  Last updated: October 2025 • Version 5.2 • 287 pages
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Can't Find What You're Looking For?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Our documentation team is constantly updating the manual. Let us know what's missing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/support"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Contact Support
                  </Link>
                  <a
                    href="mailto:docs@dsecuretech.com"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Request Documentation
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default HelpManualPage;