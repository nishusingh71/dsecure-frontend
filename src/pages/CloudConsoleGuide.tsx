import React from "react";
import Reveal from "@/components/Reveal";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";

const CloudConsoleGuide: React.FC = () => {
  return (
    <>
      <SEOHead seo={getSEOForPage("cloud-console-guide")} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Cloud Console Guide
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                  Secure Cloud Data Management & Access Control
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Guide Content */}
        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <div className="max-w-4xl mx-auto space-y-8">

              {/* Cloud Security Overview */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Cloud Security Management</h2>
                  </div>
                  <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
                    <p>
                      The DSecure Cloud Console provides a centralized platform for managing data security across
                      multiple cloud environments. From data discovery and classification to encryption and
                      compliance monitoring, our console ensures your cloud data remains protected.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 p-4 rounded-xl text-center">
                        <div className="w-12 h-12 bg-emerald-500 text-white rounded-lg flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2L3 7v3c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-7-5z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-emerald-900 mb-2">Multi-Cloud Protection</h3>
                        <p className="text-emerald-700 text-sm">Unified security across AWS, Azure, GCP, and hybrid environments</p>
                      </div>

                      <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 p-4 rounded-xl text-center">
                        <div className="w-12 h-12 bg-teal-500 text-white rounded-lg flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-teal-900 mb-2">Real-time Monitoring</h3>
                        <p className="text-teal-700 text-sm">Continuous compliance and threat detection with instant alerts</p>
                      </div>

                      <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 p-4 rounded-xl text-center">
                        <div className="w-12 h-12 bg-cyan-500 text-white rounded-lg flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-cyan-900 mb-2">Automated Encryption</h3>
                        <p className="text-cyan-700 text-sm">Policy-driven encryption and key management automation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Console Features */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Cloud Console Features
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-emerald-900">Data Discovery & Classification</h3>
                        </div>
                        <p className="text-emerald-700 text-sm leading-relaxed">
                          Automatically discover and classify sensitive data across all cloud repositories.
                          AI-powered scanning identifies PII, PHI, financial data, and intellectual property.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl border border-teal-200">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-teal-900">Access Control Management</h3>
                        </div>
                        <p className="text-teal-700 text-sm leading-relaxed">
                          Centralized identity and access management with role-based permissions,
                          multi-factor authentication, and privileged access controls.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-xl border border-cyan-200">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-cyan-900">Compliance Monitoring</h3>
                        </div>
                        <p className="text-cyan-700 text-sm leading-relaxed">
                          Real-time compliance tracking for GDPR, HIPAA, SOX, PCI-DSS, and other
                          regulations with automated reporting and remediation workflows.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-purple-900">Encryption Management</h3>
                        </div>
                        <p className="text-purple-700 text-sm leading-relaxed">
                          Centralized encryption key management with hardware security modules (HSM),
                          key rotation policies, and bring-your-own-key (BYOK) support.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-indigo-500 text-white rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-indigo-900">Threat Detection</h3>
                        </div>
                        <p className="text-indigo-700 text-sm leading-relaxed">
                          Advanced threat detection using machine learning to identify suspicious activities,
                          data exfiltration attempts, and unauthorized access patterns.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl border border-pink-200">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-pink-500 text-white rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-pink-900">Audit & Reporting</h3>
                        </div>
                        <p className="text-pink-700 text-sm leading-relaxed">
                          Comprehensive audit trails with detailed logging, customizable reports,
                          and executive dashboards for security posture visibility.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Getting Started */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Getting Started with Cloud Console
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: "Initial Setup & Configuration",
                        content: "Log into the DSecure Cloud Console and complete the initial setup wizard. Connect your cloud accounts (AWS, Azure, GCP) using secure API keys or service principals.",
                        details: [
                          "Create organization and user accounts",
                          "Configure cloud provider integrations",
                          "Set up initial security policies",
                          "Verify connectivity and permissions"
                        ]
                      },
                      {
                        step: 2,
                        title: "Data Discovery & Assessment",
                        content: "Run the initial data discovery scan to identify and classify sensitive data across your cloud environments. Review findings and adjust classification rules as needed.",
                        details: [
                          "Configure data discovery rules",
                          "Run comprehensive environment scan",
                          "Review classification results",
                          "Adjust sensitivity labels and policies"
                        ]
                      },
                      {
                        step: 3,
                        title: "Policy Implementation",
                        content: "Define and deploy security policies based on your compliance requirements. Configure access controls, encryption rules, and monitoring thresholds.",
                        details: [
                          "Define data protection policies",
                          "Configure access control rules",
                          "Set up encryption requirements",
                          "Enable monitoring and alerting"
                        ]
                      },
                      {
                        step: 4,
                        title: "Monitoring & Maintenance",
                        content: "Monitor security dashboards regularly, review compliance reports, and respond to security alerts. Maintain policies and access controls as your environment evolves.",
                        details: [
                          "Monitor security dashboards",
                          "Review compliance reports",
                          "Respond to security alerts",
                          "Update policies and access controls"
                        ]
                      }
                    ].map((item, index) => (
                      <div key={index} className="border border-emerald-100 rounded-xl p-6 hover:border-emerald-200 transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-700 mb-4">{item.content}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {item.details.map((detail, detailIndex) => (
                                <div key={detailIndex} className="flex items-center text-emerald-700 text-sm">
                                  <svg className="w-4 h-4 mr-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  {detail}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Security Best Practices */}
              <Reveal>
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl p-8 text-white">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Cloud Security Best Practices</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4">Access Management</h3>
                      <ul className="space-y-2 text-emerald-100">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Implement least privilege access principles
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Enable multi-factor authentication for all users
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Regular access reviews and regulation
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Automated provisioning and deprovisioning
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4">Data Protection</h3>
                      <ul className="space-y-2 text-emerald-100">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Encrypt data at rest and in transit
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Regular key rotation and management
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Data loss prevention (DLP) policies
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Regular backup and recovery testing
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4">Compliance & Monitoring</h3>
                      <ul className="space-y-2 text-emerald-100">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Continuous compliance monitoring
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Real-time security event logging
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Regular security assessments
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Automated incident response workflows
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Compliance Standards */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Supported Compliance Standards
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { name: "GDPR", description: "EU Data Protection Regulation" },
                      { name: "HIPAA", description: "Healthcare Information Privacy" },
                      { name: "SOX", description: "Sarbanes-Oxley Financial Controls" },
                      { name: "PCI-DSS", description: "Payment Card Industry Standards" },
                      { name: "ISO 27001", description: "Information Security Management" },
                      { name: "NIST", description: "Cybersecurity Framework" },
                      { name: "SOC 2", description: "Service Organization Controls" },
                      { name: "CCPA", description: "California Consumer Privacy Act" }
                    ].map((standard, index) => (
                      <div key={index} className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200 text-center">
                        <h3 className="text-lg font-bold text-emerald-900 mb-1">{standard.name}</h3>
                        <p className="text-emerald-700 text-sm">{standard.description}</p>
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

export default CloudConsoleGuide;
