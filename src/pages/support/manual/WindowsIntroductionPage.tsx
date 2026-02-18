import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WindowsIntroductionPage: React.FC = memo(() => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-windows-introduction")} />
      {/* <Helmet>
        <title>Windows Data Erasure Introduction | D-Secure Manual</title>
        <meta name="description" content="Introduction to secure data erasure in Windows environments with D-Secure solutions." />
      </Helmet> 
      */}

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Reveal>
              <div className="text-center">
                <Link to="/support/manual/windows" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Windows Systems
                </Link>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  Windows Data <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Erasure</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Understanding the importance of secure data erasure in Windows environments
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-12">
              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Windows Data Erasure Matters</h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 mb-4">
                      Windows systems store data across multiple locations including system files, registry entries, 
                      temporary files, and hidden partitions. Simple deletion or formatting doesn't remove this data permanently.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="bg-emerald-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-emerald-900 mb-3">Security Risks</h3>
                        <ul className="space-y-2 text-emerald-800">
                          <li>• Data recovery by unauthorized users</li>
                          <li>• Corporate espionage threats</li>
                          <li>• Identity theft from personal data</li>
                          <li>• Compliance violations</li>
                        </ul>
                      </div>
                      <div className="bg-teal-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-teal-900 mb-3">D-Secure Solutions</h3>
                        <ul className="space-y-2 text-teal-800">
                          <li>• DoD 5220.22-M compliant erasure</li>
                          <li>• NIST SP 800-88 standards</li>
                          <li>• BitLocker integration</li>
                          <li>• Enterprise deployment tools</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Windows Data Storage Locations</h2>
                  <div className="space-y-4">
                    {[
                      { title: "System Files", desc: "Windows registry, system logs, and configuration files" },
                      { title: "User Data", desc: "Documents, downloads, desktop files, and application data" },
                      { title: "Temporary Files", desc: "Browser cache, system temp files, and application caches" },
                      { title: "Hidden Areas", desc: "Swap files, hibernation files, and system restore points" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{item.title}</h3>
                          <p className="text-slate-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
});

export default React.memo(WindowsIntroductionPage);