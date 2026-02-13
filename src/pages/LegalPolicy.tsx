import React from "react";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';
import { useNavigate } from "react-router-dom";

const LegalPolicy: React.FC = () => {
  const navigate = useNavigate?.();

  const handleBack = () => {
    if (navigate) navigate("/");
    else window.location.href = "/";
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('legal-policy')} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">D-Secure</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Legal Policy
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our legal framework and compliance requirements
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 md:p-12">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  1. Legal Framework
                </h2>
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                  <p className="leading-relaxed">
                    D-Secure Technologies Pvt. Ltd. operates under the legal framework established by Indian law 
                    and international data protection standards. Our services comply with applicable regulations 
                    and industry best practices for data erasure and security.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  2. Service Agreement
                </h2>
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                  <p className="leading-relaxed">
                    By using D-Secure services, you agree to our terms of service and acknowledge 
                    that you have read and understood our legal obligations and your rights as a user.
                  </p>
                  <p className="leading-relaxed">
                    Our software solutions are provided "as is" with appropriate warranties and 
                    limitations as outlined in our complete terms of service.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  3. Compliance Standards
                </h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    D-Secure follows international standards including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 dark:text-slate-300">
                    <li>NIST 800-88 Guidelines for Media Sanitization</li>
                    <li>Common Criteria for Information Technology Security Evaluation</li>
                    <li>GDPR compliance for data protection</li>
                    <li>ISO/IEC standards for information security</li>
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  4. Liability and Limitations
                </h2>
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                  <p className="leading-relaxed">
                    D-Secure's liability is limited to the extent permitted by applicable law. 
                    Users are responsible for ensuring proper backup and testing before using 
                    our data erasure solutions.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  5. Jurisdiction
                </h2>
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                  <p className="leading-relaxed">
                    This Legal Policy is governed by Indian law and subject to the exclusive 
                    jurisdiction of courts in Delhi/New Delhi, India.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  6. Contact Information
                </h2>
                <div className="bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    For legal inquiries or concerns, please contact us:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <a href="mailto:legal@D-Securetech.com" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
                        legal@D-Securetech.com
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
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

export default LegalPolicy;