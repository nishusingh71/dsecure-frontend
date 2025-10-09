import React from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import Reveal from "@/components/Reveal";

const TechnicalDocumentation: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("technical-documentation")} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
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
                      d="M12 3l7.89 3.26a2 2 0 011.11 1.79V12c0 5.52-3.58 10.74-9 12-5.42-1.26-9-6.48-9-12V8.05a2 2 0 011.11-1.79L12 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4"
                    />
                  </svg>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    D-Secure Technical Documentation
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                  Comprehensive Implementation & Optimization Guide for Secure
                  Data Erasure Solutions
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <div className="max-w-5xl mx-auto space-y-10">
              {/* The Need for Certified Data Erasure */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    The Need for Certified Data Erasure
                  </h2>
                  <p className="text-slate-700 text-lg leading-relaxed mb-6">
                    In today's digital world, simply deleting files is not
                    enough. Data remnants pose significant security and
                    compliance risks. Certified data erasure ensures complete,
                    verifiable sanitization of sensitive information in
                    compliance with global standards.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Risk Mitigation",
                        desc: "Prevent data breaches and unauthorized access to residual data on retired assets.",
                      },
                      {
                        title: "Regulatory Compliance",
                        desc: "Meet requirements from GDPR, HIPAA, and other global data protection acts.",
                      },
                      {
                        title: "Environmental Responsibility",
                        desc: "Enable secure IT asset disposition (ITAD) and support the circular economy.",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100"
                      >
                        <h3 className="text-xl font-bold text-emerald-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-700">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Core Components */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-100 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Core Components of D-Secure Solution
                  </h2>
                  <p className="text-slate-700 mb-6">
                    D-Secure is built on a modular architecture ensuring
                    flexibility and scalability across diverse hardware and
                    environments.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Erasure Engine",
                        desc: "Proprietary algorithm for complete, verifiable data destruction across all storage types.",
                      },
                      {
                        title: "Verification Module",
                        desc: "Generates tamper-proof, auditable reports for every erasure operation.",
                      },
                      {
                        title: "Central Management Console",
                        desc: "Unified dashboard for deploying, monitoring, and managing erasure tasks remotely.",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-100"
                      >
                        <h3 className="text-xl font-bold text-teal-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-700">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Implementation Roadmap */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Implementation Roadmap: A Phased Approach
                  </h2>
                  <p className="text-slate-700 mb-6">
                    The D-Secure implementation process follows a structured
                    four-phase roadmap for efficient deployment and scalability.
                  </p>
                  <ol className="space-y-4">
                    {[
                      {
                        phase: "Phase 1: Assessment",
                        desc: "Identify target assets, storage types, and erasure standards (DoD, NIST, etc.).",
                      },
                      {
                        phase: "Phase 2: Setup & Configuration",
                        desc: "Install and configure the Central Management Console, define user roles and network settings.",
                      },
                      {
                        phase: "Phase 3: Pilot Deployment",
                        desc: "Execute erasure on a small batch of assets to validate the process and reports.",
                      },
                      {
                        phase: "Phase 4: Full Rollout",
                        desc: "Scale across the organization and integrate with existing ITAD workflows.",
                      },
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start space-x-4 bg-gradient-to-r from-emerald-50/50 to-transparent rounded-xl p-4"
                      >
                        <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">
                            {item.phase}
                          </h3>
                          <p className="text-slate-700">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              {/* Supported Storage Media */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-cyan-100 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Technical Specifications: Supported Storage Media
                  </h2>
                  <ul className="space-y-3 text-slate-700">
                    <li>• HDDs – Supports SATA, SAS, and SCSI interfaces.</li>
                    <li>
                      • SSDs – Proprietary commands for NAND flash erasure
                      including TRIM and Secure Erase.
                    </li>
                    <li>
                      • NVMe Drives – Full support for Non-Volatile Memory
                      Express storage.
                    </li>
                    <li>
                      • LUNs / Virtual Storage – Erasure for SAN/NAS logical
                      unit numbers.
                    </li>
                  </ul>
                </div>
              </Reveal>

              {/* Optimization */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-100 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Optimizing Performance and Efficiency
                  </h2>
                  <p className="text-slate-700 mb-4">
                    For best throughput and performance, ensure optimal system
                    and network configuration:
                  </p>
                  <ul className="list-disc ml-6 text-slate-700 space-y-2">
                    <li>
                      Group similar media for batch erasure to maximize hardware
                      utilization.
                    </li>
                    <li>
                      Use dedicated high-speed network connections for large
                      report transfers.
                    </li>
                    <li>Allocate sufficient RAM and CPU to erasure hosts.</li>
                  </ul>
                </div>
              </Reveal>

              {/* Audit and Compliance */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Audit & Compliance Reporting
                  </h2>
                  <p className="text-slate-700 leading-relaxed">
                    D-Secure’s Verification Module generates tamper-proof
                    reports with asset serial number, erasure method, start/end
                    time, operator ID, and cryptographic signature — ensuring
                    full regulatory audit compliance.
                  </p>
                </div>
              </Reveal>

              {/* Troubleshooting */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-100 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Troubleshooting Common Deployment Issues
                  </h2>
                  <ul className="text-slate-700 space-y-3">
                    <li>
                      <strong>Connectivity Errors:</strong> Verify firewall
                      settings and port communication with the console.
                    </li>
                    <li>
                      <strong>Media Detection Failure:</strong> Check BIOS and
                      ensure updated D-Secure boot media.
                    </li>
                    <li>
                      <strong>Slow Erasure Times:</strong> Confirm system
                      hardware meets performance guidelines.
                    </li>
                  </ul>
                </div>
              </Reveal>

              {/* Integration */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Integration with Existing ITAD Workflows
                  </h2>
                  <p className="text-slate-700 mb-4">
                    D-Secure integrates seamlessly with your IT Asset
                    Disposition (ITAD) systems using APIs for reporting and
                    management synchronization with third-party asset tracking
                    tools.
                  </p>
                </div>
              </Reveal>

              {/* Next Steps */}
              <Reveal>
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl p-8 text-white shadow-lg">
                  <h2 className="text-3xl font-bold mb-4 text-center">
                    Next Steps: Getting Started
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    {[
                      {
                        title: "Download Guides",
                        desc: "Access Technical Docs and Quick Start Guides via the client portal.",
                      },
                      {
                        title: "Schedule Training",
                        desc: "Book training with certified engineers for hands-on setup.",
                      },
                      {
                        title: "Contact Support",
                        desc: "Reach our 24/7 team for immediate technical assistance.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/10 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-emerald-100">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TechnicalDocumentation;
