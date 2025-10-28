import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const FinancialSolutionsPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("financial-solutions")} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-violet-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  D-Secure: Financial Services Solutions
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                Banking-Grade Security Standards for Financial Institutions
              </p>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
                alt="Financial Services Solutions"
                className="rounded-2xl shadow-lg mx-auto max-h-[400px] object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 bg-white/70">
          <div className="container-responsive max-w-5xl mx-auto space-y-10">
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Ultra-Secure Data Sanitization
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Ultra-secure data sanitization for financial institutions with stringent regulatory 
                  requirements. Our solutions ensure complete data protection while meeting SOX, PCI DSS, 
                  GDPR, and other critical compliance standards that govern the financial services industry.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80"
                  alt="Financial Security"
                  className="rounded-xl shadow-md mx-auto"
                />
              </div>
            </Reveal>

            {/* Key Benefits */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-indigo-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Financial Industry Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "SOX & PCI DSS Compliance",
                      desc: "Meet Sarbanes-Oxley and Payment Card Industry Data Security Standard requirements with certified erasure.",
                      img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Customer Data Protection",
                      desc: "Protect sensitive customer PII and financial data with military-grade sanitization processes.",
                      img: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1760089918/uh9vcisoo7jwfggjbilf.jpg",
                    },
                    {
                      title: "Trading System Sanitization",
                      desc: "Secure erasure of high-frequency trading systems and proprietary financial algorithms.",
                      img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Regulatory Reporting",
                      desc: "Automated compliance documentation and audit trails for regulatory examinations.",
                      img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
                    },
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center"
                    >
                      <img
                        src={feature.img}
                        alt={feature.title}
                        className="rounded-xl mb-4 h-40 w-full object-cover shadow-sm"
                      />
                      <h3 className="text-xl font-bold text-blue-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-700">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Use Cases */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Financial Services Use Cases
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Trading Floor Equipment",
                      desc: "Secure erasure of high-frequency trading systems and financial modeling workstations.",
                      icon: "📈",
                    },
                    {
                      title: "Customer Data Protection",
                      desc: "Complete sanitization of customer PII and financial data across all systems.",
                      icon: "🔐",
                    },
                    {
                      title: "Regulatory Compliance",
                      desc: "Meet SOX, PCI DSS, and GDPR compliance requirements with certified erasure reports.",
                      icon: "✅",
                    },
                    {
                      title: "Branch Closures",
                      desc: "Complete sanitization during office relocations and branch consolidations.",
                      icon: "🏦",
                    },
                    {
                      title: "ATM & Point-of-Sale",
                      desc: "Secure decommissioning of ATMs and POS systems with transaction data erasure.",
                      icon: "💳",
                    },
                    {
                      title: "Mobile Banking Devices",
                      desc: "Enterprise-grade mobile device erasure for banking apps and customer data.",
                      icon: "📱",
                    },
                  ].map((useCase, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-r from-blue-50/60 to-transparent rounded-xl p-6 flex items-start gap-4 border border-blue-100"
                    >
                      <div className="text-4xl">{useCase.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-800 mb-2">
                          {useCase.title}
                        </h3>
                        <p className="text-slate-700">{useCase.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Compliance Standards */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-indigo-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Compliance Standards Supported
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "SOX (Sarbanes-Oxley)",
                    "PCI DSS",
                    "GDPR",
                    "GLBA (Gramm-Leach-Bliley)",
                    "FFIEC Guidelines",
                    "ISO 27001",
                    "NIST 800-88",
                    "DoD 5220.22-M",
                    "FINRA Requirements",
                  ].map((standard, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4"
                    >
                      <svg
                        className="w-6 h-6 text-blue-600 flex-shrink-0"
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
                      <span className="text-slate-800 font-medium">{standard}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* CTA Section */}
            <Reveal>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                  Secure Your Financial Institution Today
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Partner with D-Secure to ensure complete data protection and regulatory 
                  compliance for your financial services organization.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/contact"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-lg"
                  >
                    Request Consultation
                  </Link>
                  <Link
                    to="/compliance"
                    className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                  >
                    View Compliance
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default FinancialSolutionsPage;
