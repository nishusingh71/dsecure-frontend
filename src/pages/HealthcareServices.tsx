import React from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import Reveal from "@/components/Reveal";
import { useNavigate } from "react-router-dom";

const HealthcareServices: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("healthcare-services")} />

      <div className="min-h-screen bg-white">

        {/* Hero Section */}
        {/* <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-4xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                  Secure regulated
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl">
                  Data security and compliance for healthcare organizations. 
                  Protect patient data with regulated, compliant data erasure 
                  solutions that meet HIPAA, HITECH, and global privacy standards.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Start Free Trial
                  </button>
                  
                 
                </div>
              </div>
            </Reveal>
          </div>

          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block opacity-10">
            <svg className="w-96 h-96" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" />
              <path d="M100 40 L100 80 M100 120 L100 160 M60 100 L80 100 M120 100 L140 100" stroke="currentColor" strokeWidth="4" className="text-teal-500" />
            </svg>
          </div>
        </section> */}

        <section className="bg-green-50 min-h-[80vh] flex items-start pt-4">
          <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row justify-between items-center px-6 py-4 gap-8">
            {/* Left Block */}
            <div className="flex-1">
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full mb-5 shadow">
                <span className="text-green-500 mr-2">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M9 12l2-2 4 4H5l4-4z" /></svg>
                </span>
                <span className="text-md font-medium text-green-700">Secure regulated</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
                Secure regulated <span className="text-green-700"></span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Data security and compliance for healthcare organizations. Protect patient data with regulated, compliant data erasure solutions that meet HIPAA, HITECH, and global privacy standards.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold rounded-lg bg-green-600 text-white transition hover:bg-green-700 shadow">
                Start Free Trial →
              </button>
            </div>

            {/* Right Block */}
            <div className="flex-1 max-w-md w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
              <div className="bg-blue-600 rounded-xl p-5 mb-6">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="text-white">
                  <path fill="currentColor" d="M12 2C8 2 5 5 5 8v4c0 .5.5 1 1 1h2v2a1 1 0 001 1h6a1 1 0 001-1v-2h2a1 1 0 001-1V8c0-3-3-6-7-6zm1 16a2 2 0 11-4 0h4zm-7-8v2h14V8c0-3-3-6-7-6S6 5 6 8v2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Secure regulated</h2>
              <div className="text-gray-500 mb-6">NIST 800-88 regulated Data Erasure</div>
              <div className="flex justify-between w-full pt-4 mt-4 border-t">
                <div className="flex flex-col items-center flex-1">
                  <span className="text-green-700 text-xl font-bold">10k+</span>
                  <span className="text-gray-500 text-sm">Devices</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <span className="text-green-700 text-xl font-bold">150+</span>
                  <span className="text-gray-500 text-sm">Countries</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <span className="text-green-700 text-xl font-bold">99.9%</span>
                  <span className="text-gray-500 text-sm">Success</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Solution Overview */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Secure Data Erasure for Healthcare & Insurance Compliance
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Meet HIPAA requirements with regulated data sanitization across medical devices,
                  servers, and storage systems.
                </p>
              </div>
            </Reveal>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: "HIPAA Compliant Erasure",
                  description: "Ensure complete compliance with healthcare data protection regulations",
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                    </svg>
                  )
                },
                {
                  title: "Medical Device Sanitization",
                  description: "Securely erase data from medical imaging devices, diagnostic equipment, and more",
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM12 18c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                    </svg>
                  )
                },
                {
                  title: "Audit-Ready Reporting",
                  description: "Generate tamper-proof regulatory documents for regulatory audits and compliance verification",
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                    </svg>
                  )
                },
                {
                  title: "Patient Data Protection",
                  description: "Permanently erase PHI (Protected Health Information) from decommissioned systems",
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )
                },
                {
                  title: "Multi-Device Support",
                  description: "Erase data from computers, servers, mobile devices, and storage media",
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z" />
                    </svg>
                  )
                },
                {
                  title: "Cloud & On-Premise",
                  description: "Flexible deployment options for hybrid healthcare IT environments",
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <Reveal key={index} delayMs={index * 100}>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200 hover:shadow-xl transition-all duration-300 h-full">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mb-4 text-white">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-emerald-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Healthcare Use Cases
                </h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Hospitals & Medical Centers",
                  description: "Secure disposal of patient records, imaging data, and administrative systems",
                  image: "🏥"
                },
                {
                  title: "Insurance Companies",
                  description: "Compliant erasure of policyholder information and claims data",
                  image: "🛡️"
                },
                {
                  title: "Pharmaceutical Companies",
                  description: "Protect clinical trial data and research information",
                  image: "💊"
                },
                {
                  title: "Medical Device Manufacturers",
                  description: "Sanitize devices before resale or recycling",
                  image: "⚕️"
                }
              ].map((useCase, index) => (
                <Reveal key={index}>
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-all duration-300">
                    <div className="text-5xl mb-4">{useCase.image}</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{useCase.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{useCase.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Standards */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              {/* <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-emerald-200">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
                    Trusted Regulations & Compliance
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-4">
                      {[
                        "HIPAA/HITECH Compliance",
                        "NIST 800-88 Guidelines",
                        "ISO 27001 regulated"
                      ].map((cert, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-slate-700 font-medium">{cert}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-4">
                      {[
                        "GDPR Article 17 Ready",
                        "DoD 5220.22-M Standards",
                        "Audit-Ready Documentation"
                      ].map((cert, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-slate-700 font-medium">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div> */}
            </Reveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center text-white max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Protect Patient Data with DSecure
                </h2>
                <p className="text-xl text-emerald-50 mb-8">
                  Schedule a consultation with our healthcare data security experts
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">

                  <button
                    onClick={() => navigate('/contact')}
                    className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl transition-all duration-300">
                    Contact Sales
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "100+", label: "Healthcare Clients" },
                { number: "5M+", label: "Devices Sanitized" },
                { number: "100%", label: "HIPAA Compliant" },
                { number: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <Reveal key={index}>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-slate-600 font-medium">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default HealthcareServices;
