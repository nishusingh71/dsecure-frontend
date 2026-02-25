import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";

export default function FounderPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead seo={getSEOForPage("founder")} />

      <div className="min-h-screen bg-slate-50 py-12 md:py-20 lg:py-28">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="md:flex">
              {/* Profile Image Column */}
              <div className="md:w-1/3 bg-slate-900 p-8 text-center flex flex-col justify-center items-center h-64 md:h-auto">
                <div className="w-32 h-32 bg-slate-800 rounded-full border-4 border-slate-700 mx-auto flex items-center justify-center mb-6">
                  {/* Avatar Icon */}
                  <svg className="w-16 h-16 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Dhruv Rai</h1>
                <p className="text-brand font-medium">Founder & CEO</p>
                
                <div className="mt-8 flex gap-4 justify-center">
                   {/* LinkedIn Icon Placeholder */}
                   <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn Profile">
                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                   </a>
                </div>
              </div>

              {/* Bio Content Column */}
              <div className="md:w-2/3 p-8 md:p-12">
                <div className="prose prose-lg prose-slate max-w-none">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                    Engineering Modern Data Hygiene
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                    Dhruv Rai is the Founder and CEO of D-Secure Technologies. Recognizing the critical vulnerability gaps left by traditional, unmanaged disk wiping utilities, Dhruv established D-Secure to bring structural lifecycle governance to data sanitization.
                  </p>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">Technical Expertise & Vision</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    With an extensive background in cybersecurity architecture and compliance frameworks, Dhruv’s vision is centered on treating data destruction not as a final chore, but as an active, auditable layer of enterprise cybersecurity. He pioneered the transition from ad-hoc wiping to cryptographically verified, API-driven sanitization workflows.
                  </p>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 mt-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Areas of Authority
                    </h3>
                    <ul className="space-y-3 text-slate-700">
                      <li className="flex items-start">
                        <span className="text-brand mr-2 mt-1">•</span>
                        Cryptographic Erasure Protocols & Hardware Security Modules
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand mr-2 mt-1">•</span>
                        Regulatory mapping for NIST 800-88, GDPR, and ISO 27001
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand mr-2 mt-1">•</span>
                        Zero-Trust IT Asset Disposition (ITAD) Security
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center max-w-4xl mx-auto bg-slate-100 rounded-xl p-6 text-slate-500 text-sm">
            <p>Entity Profile: Executive Leadership / Cybersecurity Author / Data Sanitization Expert</p>
          </div>
        </div>
      </div>
    </>
  );
}
