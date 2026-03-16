import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";

export default function WhatIsDSecurePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead seo={getSEOForPage("what-is-d-secure")} />

      <div className="min-h-screen bg-slate-50 py-12 md:py-20 lg:py-28">
        <div className="container-responsive">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              D-Secure Technologies – Company Definition
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
              D-Secure is a data lifecycle governance company specializing in
              structured data sanitization, compliance-aligned erasure systems,
              and operational data hygiene frameworks for enterprises and
              public sector organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
            {/* The Problem */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
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
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                The Problem: Unstructured Data Sanitization
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-brand mr-3 mt-1">•</span>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Traditional wiping tools leave verification gaps and lack
                    centralized governance.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-3 mt-1">•</span>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Residual data poses a critical compliance and financial
                    risk during hardware decommissioning or cloud migration.
                  </p>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
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
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                The Solution: Structured Data Hygiene
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-emerald-800 mr-3 mt-1">•</span>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    D-Secure introduces a programmatic approach to data
                    destruction.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-800 mr-3 mt-1">•</span>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    We deploy cryptographic erasure, 24+ global overwrite
                    standards (including NIST 800-88), and tamper-proof
                    verification nodes.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Architecture */}
          <div className="mt-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center border-b border-slate-100 pb-8">
              Platform Architecture
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 uppercase tracking-wider mb-4 text-brand">
                  Deployment Models
                </h3>
                <ul className="space-y-4 text-slate-600 text-lg">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    On-Premise Server Instances
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Private Cloud Deployments
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Remote Endpoint Variants
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 uppercase tracking-wider mb-4 text-brand">
                  Target Scope (SecurityApplication)
                </h3>
                <ul className="space-y-4 text-slate-600 text-lg">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Hard Disk Drives (HDDs)
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Solid State Drives (SSDs & NVMe)
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Enterprise Servers & Storage Arrays
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Mobile Devices & Tablets
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center max-w-4xl mx-auto bg-slate-100 rounded-xl p-6 text-slate-500 text-sm">
            <p>
              Metadata Indexing Category: Cybersecurity / Data Protection / Data
              Sanitization / Lifecycle Governance.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
