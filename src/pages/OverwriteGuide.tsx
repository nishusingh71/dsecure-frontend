import React from "react";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';
import Reveal from "@/components/Reveal";

const OverwriteGuide: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('overwrite-guide')} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Overwrite Guide
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                  How Many Overwrites Should I Perform on a Hard Drive?
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Guide Content */}
        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Summary Section */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Summary</h2>
                  </div>
                  <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
                    <p>
                      With the exponential growth of digital data and the alarming rise in
                      data breaches, organizations can no longer afford to neglect data
                      security—especially at the end-of-life stage of their IT assets. As
                      a company founded in 2025, <span className="font-semibold text-emerald-600">D-SecureTech</span> recognizes that data erasure
                      is not just a technical process—it's a compliance imperative and a
                      sustainability strategy.
                    </p>
                    <p>
                      The safest, most environmentally responsible method for handling
                      outdated devices is to ensure permanent data erasure, such that data
                      becomes irretrievable even through advanced forensic techniques.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Why Overwriting Matters */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Why Overwriting Matters in Data Erasure
                    </h2>
                  </div>
                  <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
                    <p>
                      Overwriting replaces the actual data on a storage device with
                      patterns like zeros, ones, or pseudo-random bits. This process is
                      essential for:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl">
                        <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center mb-3">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="font-semibold text-emerald-900">Compliance</p>
                        <p className="text-sm text-emerald-700">Standards like NIST 800-88, DoD 5220.22-M, and BSI-VSITR</p>
                      </div>
                      <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl">
                        <div className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center mb-3">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="font-semibold text-teal-900">Data Security</p>
                        <p className="text-sm text-teal-700">Before resale, disposal, or reuse</p>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-xl">
                        <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center mb-3">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="font-semibold text-cyan-900">Sustainability</p>
                        <p className="text-sm text-cyan-700">Environmentally responsible device reuse</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* How Many Passes Section */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      How Many Overwrite Passes Are Enough?
                    </h2>
                  </div>
                  <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
                    <p>
                      The answer depends on multiple factors, including device type,
                      sensitivity of the data, compliance requirements, and threat model. 
                      Here's what industry standards recommend:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-emerald-900 mb-3 flex items-center">
                          <span className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm font-bold">1</span>
                          NIST 800-88 (Recommended)
                        </h3>
                        <p className="text-emerald-800">
                          <strong>Single Pass:</strong> For modern drives (post-2001), NIST recommends a single overwrite pass with zeros or random data. 
                          This is sufficient for most commercial applications and provides excellent security with optimal performance.
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-teal-900 mb-3 flex items-center">
                          <span className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm font-bold">3</span>
                          DoD 5220.22-M (Legacy)
                        </h3>
                        <p className="text-teal-800">
                          <strong>Three Passes:</strong> Historical standard that overwrites with (1) zeros, (2) ones, then (3) random data. 
                          Still used in some government contracts but considered overkill for modern drives.
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-cyan-900 mb-3 flex items-center">
                          <span className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm font-bold">7+</span>
                          Gutmann Method (Overkill)
                        </h3>
                        <p className="text-cyan-800">
                          <strong>35 Passes:</strong> Designed for legacy drives with specific magnetic properties. 
                          Completely unnecessary for modern drives and wastes significant time and resources.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Device-Specific Recommendations */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Device-Specific Recommendations
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="border-l-4 border-emerald-500 pl-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">SSDs & Flash Storage</h3>
                        <p className="text-slate-700 mb-2">
                          <strong>Recommendation:</strong> Use ATA Secure Erase or cryptographic erasure when possible.
                        </p>
                        <p className="text-slate-700 text-sm">
                          If overwriting: Single pass is sufficient. Multiple passes provide no additional security due to wear leveling.
                        </p>
                      </div>

                      <div className="border-l-4 border-teal-500 pl-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Modern HDDs (2001+)</h3>
                        <p className="text-slate-700 mb-2">
                          <strong>Recommendation:</strong> Single pass with zeros or random data.
                        </p>
                        <p className="text-slate-700 text-sm">
                          High track density makes data recovery from overwritten sectors virtually impossible.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-4 border-cyan-500 pl-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Legacy HDDs (Pre-2001)</h3>
                        <p className="text-slate-700 mb-2">
                          <strong>Recommendation:</strong> 3 passes (DoD standard).
                        </p>
                        <p className="text-slate-700 text-sm">
                          Lower track density may leave magnetic remnants requiring multiple overwrite patterns.
                        </p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">High-Security Environments</h3>
                        <p className="text-slate-700 mb-2">
                          <strong>Recommendation:</strong> 3-7 passes + physical destruction.
                        </p>
                        <p className="text-slate-700 text-sm">
                          For classified or extremely sensitive data, combine software erasure with physical destruction.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* D-Secure Recommendations */}
              <Reveal>
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl p-8 text-white">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-6">D-Secure Recommendations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                      <div className="bg-white/10 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-3">Standard Security</h3>
                        <p className="text-emerald-100 mb-2"><strong>1 Pass</strong> - Random data</p>
                        <p className="text-emerald-50 text-sm">Ideal for most commercial applications, resale, and general disposal.</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-3">Enhanced Security</h3>
                        <p className="text-emerald-100 mb-2"><strong>3 Passes</strong> - DoD standard</p>
                        <p className="text-emerald-50 text-sm">Recommended for financial, healthcare, and regulated industries.</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-3">Maximum Security</h3>
                        <p className="text-emerald-100 mb-2"><strong>7 Passes</strong> + Verification</p>
                        <p className="text-emerald-50 text-sm">For highly classified data or when regulatory compliance demands it.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Performance Considerations */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Performance Considerations
                    </h2>
                  </div>
                  <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
                    <p>
                      More overwrite passes don't always mean better security, but they always mean longer erasure times and higher costs:
                    </p>
                    
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-amber-900 mb-3">Time & Cost Impact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-amber-800 mb-2"><strong>1TB HDD Examples:</strong></p>
                          <ul className="text-amber-700 space-y-1 text-sm">
                            <li>• 1 Pass: ~2-3 hours</li>
                            <li>• 3 Passes: ~6-9 hours</li>
                            <li>• 7 Passes: ~14-21 hours</li>
                            <li>• 35 Passes: ~70-105 hours</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-amber-800 mb-2"><strong>Cost Considerations:</strong></p>
                          <ul className="text-amber-700 space-y-1 text-sm">
                            <li>• Equipment downtime</li>
                            <li>• Power consumption</li>
                            <li>• Labor costs</li>
                            <li>• Opportunity costs</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Final Recommendation */}
              <Reveal>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Bottom Line</h2>
                    <p className="text-slate-200 text-xl leading-relaxed max-w-3xl mx-auto mb-6">
                      For 99% of use cases, <strong className="text-emerald-400">a single overwrite pass is sufficient</strong> for modern storage devices. 
                      This provides excellent security while minimizing time, cost, and environmental impact.
                    </p>
                    <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
                      Choose additional passes only when required by specific compliance mandates or when dealing with extraordinarily sensitive data.
                      D-Secure's intelligent algorithms automatically select the optimal number of passes based on your security requirements and device type.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OverwriteGuide;
