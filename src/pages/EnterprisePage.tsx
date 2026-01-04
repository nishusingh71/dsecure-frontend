import React from "react";
import { useNavigate } from "react-router-dom";

const EnterprisePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Secure Compliant
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl">
              Safeguard sensitive data with DSecure's enterprise-grade data erasure platform. Ensure compliance with global data security standards and protect your organization from data breaches with regulated, permanent data erasure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Start Free Trial
              </button>



            </div>
          </div>
        </div>
        <div> <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 via-teal-400 to-emerald-500 rounded-3xl blur-3xl opacity-40 animate-pulse"></div>

          <div className="relative">
            <img
              src="/enterprise_img.png"
              alt="Security Shield"
              className="w-96 h-96 object-contain rounded-[18%] opacity-85 group-hover:opacity-100 group-hover:scale-110 group-hover:shadow-[0_0_100px_rgba(16,185,129,1)] transition-all duration-700 ease-in-out sepia-[.15] hue-rotate-[80deg] saturate-150"
            />
          </div>


        </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Industry-Leading Data Erasure Powered by D-Secure
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Centralized Management",
                description: "Manage all erasure operations from a single, intuitive dashboard"
              },
              {
                title: "Comprehensive Reporting",
                description: "Generate detailed audit reports for compliance and verification"
              },
              {
                title: "Multi-Device Support",
                description: "Erase data across desktops, servers, mobile devices, and more"
              },
              {
                title: "regulated Standards",
                description: "Meets international data erasure standards and regulations"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Erasure Standards Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Supported Data Erasure Standards Compliant With:
              </h3>
              <ul className="space-y-4">
                {[
                  "NIST 800-88 Guidelines",
                  "DoD 5220.22-M Standards",
                  "GDPR Compliance",
                  "HIPAA Requirements",
                  "ISO/IEC 27001",
                  "PCI DSS Standards"
                ].map((standard, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-slate-700">{standard}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Comprehensive Device Coverage:
              </h3>
              <ul className="space-y-4">
                {[
                  "Windows Desktops & Laptops",
                  "Mac Computers & Servers",
                  "Linux Systems",
                  "Mobile Devices (iOS & Android)",
                  "Storage Devices (HDD, SSD, USB)",
                  "Network Attached Storage (NAS)"
                ].map((device, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-slate-700">{device}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Secure Your Data?
          </h2>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            Start your free 14-day trial today. No credit card required.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Start Free Trial
          </button>
        </div>
      </section>

    </div>
  );
};

export default EnterprisePage;
