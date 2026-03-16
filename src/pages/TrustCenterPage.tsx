import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";

export default function TrustCenterPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead seo={getSEOForPage("trust-center")} />

      <div className="min-h-screen bg-slate-50 py-12 md:py-20 lg:py-28">
        <div className="container-responsive">
          {/* Header Section */}
          <div className="text-center mb-16 md:mb-24">
            <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
               <svg className="w-10 h-10 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
               </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              D-Secure Trust Center
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Transparency, compliance, and security are the foundations of our platform. 
              Review our operational principles, security disclosures, and privacy commitments.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Security Disclosures */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
               <div className="flex items-center mb-6">
                 <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900">Security Posture</h2>
               </div>
               <p className="text-slate-600 mb-6">Learn how we protect our infrastructure and your data through continuous monitoring and third-party penetration testing.</p>
               <ul className="space-y-3">
                 <li><a href="/security" className="text-brand hover:text-brand-dark font-medium flex items-center">Platform Security Architecture <span className="ml-1">→</span></a></li>
                 <li><a href="#" className="text-brand hover:text-brand-dark font-medium flex items-center">Vulnerability Disclosure Program <span className="ml-1">→</span></a></li>
                 <li><span className="text-slate-400">SOC 2 Type II Report (Available under NDA)</span></li>
               </ul>
            </div>

            {/* Privacy & Legal */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
               <div className="flex items-center mb-6">
                 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900">Privacy & Terms</h2>
               </div>
               <p className="text-slate-600 mb-6">Review our commitments to data privacy, intellectual property, and acceptable use policies governing the D-Secure platform.</p>
               <ul className="space-y-3">
                 <li><a href="/privacy-policy" className="text-brand hover:text-brand-dark font-medium flex items-center">Privacy Policy <span className="ml-1">→</span></a></li>
                 <li><a href="/terms-of-service" className="text-brand hover:text-brand-dark font-medium flex items-center">Terms of Service <span className="ml-1">→</span></a></li>
                 <li><a href="/cookie-policy" className="text-brand hover:text-brand-dark font-medium flex items-center">Cookie Policy <span className="ml-1">→</span></a></li>
                 <li><a href="/legal-policy" className="text-brand hover:text-brand-dark font-medium flex items-center">Legal Notice <span className="ml-1">→</span></a></li>
               </ul>
            </div>

            {/* Compliance Hub */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 md:col-span-2">
               <div className="flex items-center mb-6">
                 <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900">Regulatory Compliance Alignment</h2>
               </div>
               <p className="text-slate-600 mb-6 max-w-3xl">We engineer our solutions to help organizations meet and exceed global regulatory standards for data disposal. Learn how our tamper-proof verification engine aligns with your industry requirements.</p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
                  <div className="text-center p-4">
                    <strong className="block text-slate-900 mb-2">NIST 800-88</strong>
                    <span className="text-sm text-slate-500">Media Sanitization (Clear & Purge)</span>
                  </div>
                  <div className="text-center p-4">
                    <strong className="block text-slate-900 mb-2">GDPR</strong>
                    <span className="text-sm text-slate-500">Article 17 Right to Erasure</span>
                  </div>
                  <div className="text-center p-4">
                    <strong className="block text-slate-900 mb-2">ISO 27001</strong>
                    <span className="text-sm text-slate-500">Asset Disposal Controls</span>
                  </div>
                  <div className="text-center p-4">
                    <strong className="block text-slate-900 mb-2">HIPAA / HITECH</strong>
                    <span className="text-sm text-slate-500">ePHI Destruction Protocols</span>
                  </div>
               </div>
            </div>

            {/* Systems Status */}
            <div className="bg-slate-900 p-8 md:p-10 rounded-2xl shadow-xl border border-slate-800 md:col-span-2 flex flex-col md:flex-row items-center justify-between text-white">
               <div>
                  <h2 className="text-2xl font-bold mb-2">Platform Availability</h2>
                  <p className="text-slate-400">Monitor real-time system status and historical uptime.</p>
               </div>
               <div className="mt-6 md:mt-0 flex items-center space-x-6">
                  <div className="flex items-center text-emerald-400 font-medium">
                     <span className="relative flex h-3 w-3 mr-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                     </span>
                     All Systems Operational
                  </div>
                  <a href="/status" className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-medium transition-colors border border-slate-700">
                     View Status Page
                  </a>
               </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
