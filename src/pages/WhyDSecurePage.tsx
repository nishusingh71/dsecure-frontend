import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";

export default function WhyDSecurePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead seo={getSEOForPage("why-d-secure")} />

      <div className="min-h-screen bg-slate-50 py-12 md:py-20 lg:py-28">
        <div className="container-responsive">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Why Choose D-Secure for Data Lifecycle Governance?
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
              We move organizations beyond basic data wiping utilities into
              structured, highly governed data sanitization frameworks—proactively
              eliminating residual data risks and ensuring absolute compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Imperative Area */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The Imperative for Structured Sanitization
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Legacy wiping tools lack verifiable audit trails, leaving enterprises
                exposed to data breaches during hardware decommissioning, lease
                returns, or cloud migrations. Ad-hoc processes escalate non-compliance risks under strict frameworks like GDPR and NIST 800-88.
              </p>
            </div>

            {/* Verification Block */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-emerald-800"
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
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Unmatched Verification & Auditability
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                D-Secure provides cryptographic erasure coupled with tamper-proof
                logs. Every sanitization action generates a digitally signed
                Certificate of Destruction, ensuring your internal teams and
                external auditors have absolute, verifiable proof of data removal.
              </p>
            </div>

            {/* Integration Block */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Seamless Workflow Integration
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Whether deploying across isolated local networks, complex multi-cloud
                environments, or remote endpoints, D-Secure integrates directly
                into your existing IT asset disposition (ITAD) and lifecycle
                management pipelines with robust API support.
              </p>
            </div>

            {/* Compliance Block */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The Ultimate Compliance Advantage
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Achieve strict alignment with over 24 global security standards,
                including NIST 800-88 Purge parameters, ISO 27001 data disposal
                clauses, and SOC 2 asset management frameworks. D-Secure turns
                data erasure from a tactical chore into a strategic compliance asset.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center max-w-4xl mx-auto bg-slate-100 rounded-xl p-6 text-slate-500 text-sm">
            <p>
              Metadata Category Alignment: Enterprise Compliance Strategy / Data
              Hygiene / Lifecycle Governance Risk Management.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
