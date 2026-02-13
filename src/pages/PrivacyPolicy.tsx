import React from "react";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';

const PrivacyPolicy = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('privacy-policy')} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">D-Secure</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Learn how we collect, use, and protect your personal information
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 md:p-12">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                Our Privacy Policy informs you on how your personal information is
                collected, used, and protected by{" "}
                <strong className="text-slate-900 dark:text-white">D-Secure Technologies Pvt. Ltd.</strong>
              </p>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  1. Introduction
                </h2>
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                  <p className="leading-relaxed">
                    Welcome to <strong className="text-slate-900 dark:text-white">D-Secure</strong> website and software privacy
                    policy, provided by D-Secure Technologies Pvt. Ltd. with registered
                    office address: 205, Skipper Corner, 88, Nehru Place, New Delhi -
                    110019, India.
                  </p>
                  <p className="leading-relaxed">
                    D-Secure ("we", "us", or "our") respects the privacy rights of its
                    users and understands the importance of protecting and handling
                    information collected about you in accordance with law and best
                    practices. This Privacy Notice explains how we collect, process, and
                    secure your data, and your rights as a user.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  2. Acceptance and Use
                </h2>
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                  <p className="leading-relaxed">
                    By downloading or using the D-Secure website or software, you signify
                    acceptance of this Privacy Policy. Clicking "Accept" when this policy
                    appears on our site constitutes official consent to collect, use, and
                    disclose your personal information as described here.
                  </p>
                  <p className="leading-relaxed">
                    If you do not agree with or are not comfortable with any aspect of
                    this Privacy Policy, you should immediately discontinue using the
                    D-Secure website and its related services.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  3. Who We Are
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  We specialize in Data Recovery, Email Repair, File Repair, and Secure
                  Data Erasure solutions under the D-Secure brand.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  4. Summary of Personal Information and Use
                </h2>
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                  <p className="leading-relaxed">
                    D-Secure may collect or obtain personal data about you through various
                    methods including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Directly from you (e.g., when you contact us)</li>
                    <li>When you visit, download, or install our software</li>
                    <li>When you sign up or sign in to use our services</li>
                    <li>From third-party service providers or partners</li>
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  5. Purposes of Data Collection
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 dark:text-slate-300">
                  <li>To provide and improve our services</li>
                  <li>To complete your purchase and maintain communication</li>
                  <li>To comply with legal obligations</li>
                  <li>For user engagement, marketing, and analytics</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  6. Your Rights
                </h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 dark:text-slate-300">
                    <li>Access your personal data</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to processing of your data</li>
                    <li>Request data portability</li>
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  7. Contact Us
                </h2>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <a href="mailto:privacy@D-Securetech.com" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold">
                        privacy@D-Securetech.com
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-700 dark:text-slate-300">
                        205, Skipper Corner, 88, Nehru Place, New Delhi - 110019, India
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;