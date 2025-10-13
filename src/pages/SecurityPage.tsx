import { useEffect } from "react";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';

export default function SecurityPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('security')} />

      <div className="min-h-screen bg-white light:bg-slate-900 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 xxl:py-28">
        <div className="max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 xxl:px-16">
          {/* Header Section */}
          <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24 xxl:mb-28">
            <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl xxl:text-7xl font-bold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 xxl:mb-14">
              Security Practices
            </h1>
            <p className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl xxl:text-2xl text-slate-600 light:text-slate-300 max-w-3xl mx-auto">
              Enterprise-grade security measures and certifications that protect
              your data and ensure compliance with global standards.
            </p>
          </div>

          {/* Security Overview */}
          <section className="mb-12 xs:mb-14 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28 xxl:mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-18 xxl:gap-20 items-center">
              <div>
                <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
                  Security-First Approach
                </h2>
                <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed mb-6 xs:mb-7 sm:mb-8 md:mb-8 lg:mb-9 xl:mb-10 xxl:mb-11">
                  At DSecure, security isn't an afterthought—it's the foundation
                  of everything we do. Our comprehensive security framework
                  ensures your data is protected at every stage.
                </p>
                <div className="grid grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-6 lg:gap-7 xl:gap-8 xxl:gap-9">
                  <div className="text-center p-4 xs:p-5 sm:p-6 md:p-6 lg:p-7 xl:p-8 xxl:p-9 bg-slate-50 light:bg-slate-800 rounded-lg">
                    <div className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-bold text-brand mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                      99.9%
                    </div>
                    <div className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-600 light:text-slate-400">
                      Uptime SLA
                    </div>
                  </div>
                  <div className="text-center p-4 xs:p-5 sm:p-6 md:p-6 lg:p-7 xl:p-8 xxl:p-9 bg-slate-50 light:bg-slate-800 rounded-lg">
                    <div className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-bold text-brand mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                      256-bit
                    </div>
                    <div className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-600 light:text-slate-400">
                      Encryption
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-brand/10 to-blue-500/10 light:from-brand/20 light:to-blue-500/20 p-6 xs:p-7 sm:p-8 md:p-9 lg:p-10 xl:p-11 xxl:p-12 rounded-2xl">
                <div className="flex items-center justify-center w-16 xs:w-18 sm:w-20 md:w-22 lg:w-24 xl:w-26 xxl:w-28 h-16 xs:h-18 sm:h-20 md:h-22 lg:h-24 xl:h-26 xxl:h-28 bg-brand/20 rounded-full mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9 mx-auto">
                  <svg
                    className="w-8 xs:w-9 sm:w-10 md:w-11 lg:w-12 xl:w-13 xxl:w-14 h-8 xs:h-9 sm:h-10 md:h-11 lg:h-12 xl:h-13 xxl:h-14 text-brand"
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
                </div>
                <h3 className="text-xl xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl xxl:text-4xl font-semibold text-slate-900 light:text-white text-center mb-2 xs:mb-3 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-5 xxl:mb-6">
                  Zero Trust Architecture
                </h3>
                <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 light:text-slate-300 text-center leading-relaxed">
                  Every access request is verified, regardless of location or
                  user credentials.
                </p>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-12 xs:mb-14 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28 xxl:mb-32">
            <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white text-center mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20">
              Security Certifications & Compliance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-7 sm:gap-8 md:gap-9 lg:gap-10 xl:gap-11 xxl:gap-12">
              <div className="text-center p-6 xs:p-7 sm:p-8 md:p-8 lg:p-9 xl:p-10 xxl:p-11 bg-slate-50 light:bg-slate-800 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-brand/20 rounded-lg flex items-center justify-center mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                  <span className="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl font-bold text-brand">
                    ISO
                  </span>
                </div>
                <h3 className="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl font-semibold text-slate-900 light:text-white mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                  ISO 27001
                </h3>
                <p className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-600 light:text-slate-300">
                  Information Security Management System certification
                </p>
              </div>

              <div className="text-center p-6 xs:p-7 sm:p-8 md:p-8 lg:p-9 xl:p-10 xxl:p-11 bg-slate-50 light:bg-slate-800 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-brand/20 rounded-lg flex items-center justify-center mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                  <span className="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl font-bold text-brand">
                    SOC
                  </span>
                </div>
                <h3 className="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl font-semibold text-slate-900 light:text-white mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                  SOC 2 Type II
                </h3>
                <p className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-600 light:text-slate-300">
                  Service Organization Control compliance verification
                </p>
              </div>

              <div className="text-center p-6 xs:p-7 sm:p-8 md:p-8 lg:p-9 xl:p-10 xxl:p-11 bg-slate-50 light:bg-slate-800 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-brand/20 rounded-lg flex items-center justify-center mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                  <span className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl font-bold text-brand">
                    GDPR
                  </span>
                </div>
                <h3 className="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl font-semibold text-slate-900 light:text-white mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                  GDPR Compliant
                </h3>
                <p className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-600 light:text-slate-300">
                  European data protection regulation compliance
                </p>
              </div>

              <div className="text-center p-6 xs:p-7 sm:p-8 md:p-8 lg:p-9 xl:p-10 xxl:p-11 bg-slate-50 light:bg-slate-800 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-brand/20 rounded-lg flex items-center justify-center mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                  <span className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl font-bold text-brand">
                    NIST
                  </span>
                </div>
                <h3 className="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl font-semibold text-slate-900 light:text-white mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                  NIST 800-88
                </h3>
                <p className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-600 light:text-slate-300">
                  Media sanitization and data destruction standards
                </p>
              </div>
            </div>
          </section>

          {/* Security Measures */}
          <section className="mb-12 xs:mb-14 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28 xxl:mb-32">
            <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white text-center mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20">
              Comprehensive Security Measures
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xs:gap-9 sm:gap-10 md:gap-11 lg:gap-12 xl:gap-13 xxl:gap-14">
              <div className="p-6 xs:p-7 sm:p-8 md:p-8 lg:p-9 xl:p-10 xxl:p-11 bg-white light:bg-slate-800 rounded-xl border border-slate-200 light:border-slate-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-brand/20 rounded-lg mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                  <svg
                    className="w-6 xs:w-7 sm:w-8 md:w-8 lg:w-9 xl:w-10 xxl:w-11 h-6 xs:h-7 sm:h-8 md:h-8 lg:h-9 xl:h-10 xxl:h-11 text-brand"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl font-semibold text-slate-900 light:text-white mb-3 xs:mb-4 sm:mb-4 md:mb-5 lg:mb-5 xl:mb-6 xxl:mb-7">
                  End-to-End Encryption
                </h3>
                <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 light:text-slate-300 leading-relaxed">
                  AES-256 encryption for data at rest and TLS 1.3 for data in
                  transit, ensuring maximum protection.
                </p>
              </div>

              <div className="p-6 xs:p-7 sm:p-8 md:p-8 lg:p-9 xl:p-10 xxl:p-11 bg-white light:bg-slate-800 rounded-xl border border-slate-200 light:border-slate-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-brand/20 rounded-lg mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                  <svg
                    className="w-6 xs:w-7 sm:w-8 md:w-8 lg:w-9 xl:w-10 xxl:w-11 h-6 xs:h-7 sm:h-8 md:h-8 lg:h-9 xl:h-10 xxl:h-11 text-brand"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl font-semibold text-slate-900 light:text-white mb-3 xs:mb-4 sm:mb-4 md:mb-5 lg:mb-5 xl:mb-6 xxl:mb-7">
                  Real-time Monitoring
                </h3>
                <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 light:text-slate-300 leading-relaxed">
                  24/7 security monitoring with automated threat detection and
                  instant incident response.
                </p>
              </div>

              <div className="p-6 xs:p-7 sm:p-8 md:p-8 lg:p-9 xl:p-10 xxl:p-11 bg-white light:bg-slate-800 rounded-xl border border-slate-200 light:border-slate-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-brand/20 rounded-lg mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                  <svg
                    className="w-6 xs:w-7 sm:w-8 md:w-8 lg:w-9 xl:w-10 xxl:w-11 h-6 xs:h-7 sm:h-8 md:h-8 lg:h-9 xl:h-10 xxl:h-11 text-brand"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl font-semibold text-slate-900 light:text-white mb-3 xs:mb-4 sm:mb-4 md:mb-5 lg:mb-5 xl:mb-6 xxl:mb-7">
                  Multi-Factor Authentication
                </h3>
                <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 light:text-slate-300 leading-relaxed">
                  Advanced MFA with biometric options and hardware security keys
                  for enhanced access control.
                </p>
              </div>

              <div className="p-6 xs:p-7 sm:p-8 md:p-8 lg:p-9 xl:p-10 xxl:p-11 bg-white light:bg-slate-800 rounded-xl border border-slate-200 light:border-slate-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-brand/20 rounded-lg mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                  <svg
                    className="w-6 xs:w-7 sm:w-8 md:w-8 lg:w-9 xl:w-10 xxl:w-11 h-6 xs:h-7 sm:h-8 md:h-8 lg:h-9 xl:h-10 xxl:h-11 text-brand"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <h3 className="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl font-semibold text-slate-900 light:text-white mb-3 xs:mb-4 sm:mb-4 md:mb-5 lg:mb-5 xl:mb-6 xxl:mb-7">
                  Secure Data Destruction
                </h3>
                <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 light:text-slate-300 leading-relaxed">
                  Compliant data erasure ensuring complete data destruction with
                  verifiable certificates.
                </p>
              </div>

              <div className="p-6 xs:p-7 sm:p-8 md:p-8 lg:p-9 xl:p-10 xxl:p-11 bg-white light:bg-slate-800 rounded-xl border border-slate-200 light:border-slate-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-brand/20 rounded-lg mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                  <svg
                    className="w-6 xs:w-7 sm:w-8 md:w-8 lg:w-9 xl:w-10 xxl:w-11 h-6 xs:h-7 sm:h-8 md:h-8 lg:h-9 xl:h-10 xxl:h-11 text-brand"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl font-semibold text-slate-900 light:text-white mb-3 xs:mb-4 sm:mb-4 md:mb-5 lg:mb-5 xl:mb-6 xxl:mb-7">
                  Audit & Compliance
                </h3>
                <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 light:text-slate-300 leading-relaxed">
                  Regular security audits and compliance reporting to meet
                  regulatory requirements.
                </p>
              </div>

              <div className="p-6 xs:p-7 sm:p-8 md:p-8 lg:p-9 xl:p-10 xxl:p-11 bg-white light:bg-slate-800 rounded-xl border border-slate-200 light:border-slate-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-brand/20 rounded-lg mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                  <svg
                    className="w-6 xs:w-7 sm:w-8 md:w-8 lg:w-9 xl:w-10 xxl:w-11 h-6 xs:h-7 sm:h-8 md:h-8 lg:h-9 xl:h-10 xxl:h-11 text-brand"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl font-semibold text-slate-900 light:text-white mb-3 xs:mb-4 sm:mb-4 md:mb-5 lg:mb-5 xl:mb-6 xxl:mb-7">
                  Expert Team
                </h3>
                <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 light:text-slate-300 leading-relaxed">
                  Dedicated security professionals with advanced certifications
                  and years of experience.
                </p>
              </div>
            </div>
          </section>

          {/* Security Incident Response */}
          <section className="mb-12 xs:mb-14 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28 xxl:mb-32">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 light:from-slate-800 light:to-slate-700 p-8 xs:p-9 sm:p-10 md:p-11 lg:p-12 xl:p-13 xxl:p-14 rounded-2xl">
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white text-center mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-10 xl:mb-11 xxl:mb-12">
                Incident Response Protocol
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 xs:gap-7 sm:gap-8 md:gap-9 lg:gap-10 xl:gap-11 xxl:gap-12">
                <div className="text-center">
                  <div className="w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-brand text-white rounded-full flex items-center justify-center mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                    <span className="font-bold text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl">
                      1
                    </span>
                  </div>
                  <h3 className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl font-semibold text-slate-900 light:text-white mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                    Detection
                  </h3>
                  <p className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-600 light:text-slate-300">
                    Automated systems detect threats in real-time
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-brand text-white rounded-full flex items-center justify-center mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                    <span className="font-bold text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl">
                      2
                    </span>
                  </div>
                  <h3 className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl font-semibold text-slate-900 light:text-white mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                    Containment
                  </h3>
                  <p className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-600 light:text-slate-300">
                    Immediate isolation and threat neutralization
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-brand text-white rounded-full flex items-center justify-center mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                    <span className="font-bold text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl">
                      3
                    </span>
                  </div>
                  <h3 className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl font-semibold text-slate-900 light:text-white mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                    Investigation
                  </h3>
                  <p className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-600 light:text-slate-300">
                    Forensic analysis and impact assessment
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 xs:w-13 sm:w-14 md:w-15 lg:w-16 xl:w-17 xxl:w-18 h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 xl:h-17 xxl:h-18 bg-brand text-white rounded-full flex items-center justify-center mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                    <span className="font-bold text-lg xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-3xl">
                      4
                    </span>
                  </div>
                  <h3 className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl font-semibold text-slate-900 light:text-white mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 xxl:mb-5">
                    Recovery
                  </h3>
                  <p className="text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg xxl:text-xl text-slate-600 light:text-slate-300">
                    System restoration and preventive measures
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Security Team */}
          <section className="text-center">
            <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
              Security Questions?
            </h2>
            <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 light:text-slate-300 mb-8 xs:mb-9 sm:mb-10 md:mb-11 lg:mb-12 xl:mb-13 xxl:mb-14 max-w-2xl mx-auto">
              Our security team is available to answer your questions and
              provide additional information about our security practices.
            </p>
            <div className="bg-slate-50 light:bg-slate-800 p-6 xs:p-7 sm:p-8 md:p-9 lg:p-10 xl:p-11 xxl:p-12 rounded-xl max-w-xl mx-auto">
              <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 light:text-white">
                  Security Team:
                </strong>{" "}
                security@dsecuretech.com
                <br />
                <strong className="text-slate-900 light:text-white">
                  Emergency:
                </strong>{" "}
                +1 (555) 999-SECURE
                <br />
                <strong className="text-slate-900 light:text-white">
                  Response Time:
                </strong>{" "}
                Within 1 hour
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
