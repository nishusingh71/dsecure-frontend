import { useEffect } from 'react'
import React from "react";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('terms-of-service')} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm0 6h6v2H7v-2z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">D-Secure</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Effective Date: October 4, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 md:p-12">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  1. Agreement to Terms
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  By accessing or using D-Secure's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  2. Use License
                </h2>
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                  <p className="leading-relaxed">
                    Permission is granted to temporarily download one copy of D-Secure materials for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display</li>
                    <li>attempt to reverse engineer any software contained on the website</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  3. Disclaimer
                </h2>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    The materials on D-Secure's website are provided on an 'as is' basis. D-Secure makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  4. Limitations
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  In no event shall D-Secure or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on D-Secure's website, even if D-Secure or a D-Secure authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  5. Accuracy of Materials
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  The materials appearing on D-Secure's website could include technical, typographical, or photographic errors. D-Secure does not warrant that any of the materials on its website are accurate, complete, or current. D-Secure may make changes to the materials contained on its website at any time without notice.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  6. Links
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  D-Secure has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by D-Secure of the site. Use of any such linked website is at the user's own risk.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  7. Modifications
                </h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    D-Secure may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  8. Governing Law
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Delhi/New Delhi, India.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  9. Contact Information
                </h2>
                <div className="bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <a href="mailto:legal@D-Securetech.com" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold">
                        legal@D-Securetech.com
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
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
  )
}