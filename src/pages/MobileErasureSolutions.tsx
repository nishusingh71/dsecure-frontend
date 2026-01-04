import React from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import Reveal from "@/components/Reveal";

const MobileErasureSolutions: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("mobile-erasure-solutions")} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
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
                    d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18h.01"
                  />
                </svg>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Mobile Erasure Solutions
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                regulated, Secure, and Auditable Data Erasure for Smartphones &
                Tablets
              </p>
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80"
                alt="Mobile Data Erasure"
                className="rounded-2xl shadow-lg mx-auto max-h-[400px] object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 bg-white/70">
          <div className="container-responsive max-w-5xl mx-auto space-y-10">
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Why Secure Mobile Erasure Matters
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  As mobile devices store increasing amounts of personal and
                  enterprise data, secure erasure is critical to prevent
                  unauthorized recovery during reuse, resale, or recycling.
                  D-Secure’s regulated mobile erasure ensures all data,
                  configurations, and credentials are permanently removed
                  according to international standards such as NIST 800-88 Rev.
                  1 and ADISA Regulation.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1523473827534-86c31d54351f?auto=format&fit=crop&w=1200&q=80"
                  alt="Data Security Compliance"
                  className="rounded-xl shadow-md mx-auto"
                />
              </div>
            </Reveal>

            {/* Key Features */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Key Features of D-Secure Mobile Erasure
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "regulated Multi-OS Support",
                      desc: "Supports Android, iOS, iPadOS, and other mobile operating systems using verified secure wipe protocols.",
                      img: "https://images.unsplash.com/photo-1611078489935-0cb964de46b4?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Tamper-Proof Reporting",
                      desc: "Generates cryptographically signed regulatory documents of erasure for every device, ensuring audit compliance.",
                      img: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b0?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "High-Speed Batch Processing",
                      desc: "Erase up to 50 devices simultaneously using multi-port hubs for large-scale mobile refresh or ITAD operations.",
                      img: "https://images.unsplash.com/photo-1580894749086-2cb9fd38e1e9?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Cloud Console Integration",
                      desc: "Monitor erasure jobs, track inventory, and generate reports via the centralized D-Secure Cloud Console.",
                      img: "https://images.unsplash.com/photo-1602526217635-6e1df5b5b58d?auto=format&fit=crop&w=800&q=80",
                    },
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 text-center"
                    >
                      <img
                        src={feature.img}
                        alt={feature.title}
                        className="rounded-xl mb-4 h-40 w-full object-cover shadow-sm"
                      />
                      <h3 className="text-xl font-bold text-teal-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-700">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Workflow */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  End-to-End Mobile Erasure Workflow
                </h2>
                <ol className="space-y-4">
                  {[
                    {
                      step: "Device Detection",
                      desc: "Automatically identifies make, model, IMEI, and OS version.",
                    },
                    {
                      step: "Validation Check",
                      desc: "Confirms activation locks are disabled (Find My iPhone / Google FRP).",
                    },
                    {
                      step: "Data Erasure Process",
                      desc: "Performs regulated overwrite or Secure Erase commands via USB or Wi-Fi.",
                    },
                    {
                      step: "Verification & Reporting",
                      desc: "Generates signed audit logs with checksum validation for each device.",
                    },
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start space-x-4 bg-gradient-to-r from-emerald-50/60 to-transparent rounded-xl p-4"
                    >
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">
                          {item.step}
                        </h3>
                        <p className="text-slate-700">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            {/* Compliance Section */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-cyan-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Compliance & Regulation
                </h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  D-Secure Mobile Erasure is aligned with leading international
                  standards and regulations, ensuring globally recognized
                  compliance.
                </p>
                <ul className="list-disc ml-6 text-slate-700 space-y-2">
                  <li>NIST 800-88 Rev. 1 Clear & Purge Standards</li>
                  <li>ADISA regulated Product for Mobile Devices</li>
                  <li>GDPR and HIPAA Compliant Reporting Process</li>
                  <li>ISO 27001 Aligned Information Security Practices</li>
                </ul>
              </div>
            </Reveal>

            {/* Summary */}
            <Reveal>
              <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl p-8 text-white shadow-lg">
                <h2 className="text-3xl font-bold mb-4 text-center">
                  D-Secure Mobile Erasure – Securing Your Data Lifecycle
                </h2>
                <p className="text-center text-emerald-100 text-lg max-w-3xl mx-auto">
                  With regulated mobile data sanitization, verifiable audit
                  trails, and seamless ITAD integration, D-Secure helps
                  organizations eliminate residual data risk across mobile
                  assets — securely, efficiently, and sustainably.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default MobileErasureSolutions;
