import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";

const RetainOSGuide: React.FC = () => {
  return (
    <>
      <SEOHead seo={getSEOForPage('retain-os-guide')} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Retain OS Guide
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                  How to Wipe Everything and Retain Your Operating System
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Guide Content */}
        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <div className="max-w-4xl mx-auto space-y-8">

              {/* Overview Section */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Selective Data Erasure</h2>
                  </div>
                  <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
                    <p>
                      D-Secure's selective erasure technology allows you to permanently delete sensitive data,
                      applications, and files while preserving your operating system and essential system files.
                      This approach is ideal for device redeployment, selling, or transferring ownership without
                      the need to reinstall the operating system.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl">
                        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Preserve System Integrity</h3>
                        <p className="text-slate-600">
                          Keep your operating system and essential drivers intact while removing all personal and sensitive data.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl">
                        <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Time Efficient</h3>
                        <p className="text-slate-600">
                          Save hours of reinstallation time by preserving the OS while ensuring complete data security.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* What Gets Erased */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      What Gets Erased vs What's Retained
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Data to be Erased
                      </h3>
                      <ul className="space-y-3 text-slate-700">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          User documents and files
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Personal photos and videos
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Installed applications
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Browser data and cookies
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Email accounts and data
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          User profiles and settings
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Temporary and cache files
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Data to be Retained
                      </h3>
                      <ul className="space-y-3 text-slate-700">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Operating system files
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          System drivers
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Boot loader and system partition
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Registry system entries
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Essential system services
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Hardware compatibility layers
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Security and update frameworks
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Step-by-Step Process */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Step-by-Step Process
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Launch DSecure</h3>
                        <p className="text-slate-700">
                          Start the D-Secure application and select "Selective Erasure" or "Retain OS" mode from the main menu.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Select Target Drive</h3>
                        <p className="text-slate-700">
                          Choose the drive containing your operating system. D-Secure will automatically detect and protect system partitions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Configure Selective Settings</h3>
                        <p className="text-slate-700">
                          Review and customize which areas to erase. The system will show protected OS areas and selectable user data areas.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Choose Erasure Method</h3>
                        <p className="text-slate-700">
                          Select the appropriate erasure standard (DoD 5220.22-M, NIST 800-88, etc.) based on your security requirements.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        5
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Execute Selective Erasure</h3>
                        <p className="text-slate-700">
                          Begin the erasure process. The system will securely wipe selected areas while preserving OS integrity.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        6
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Verification & Reporting</h3>
                        <p className="text-slate-700">
                          Review the completion report and regulatory document. The system will remain bootable with a clean OS ready for redeployment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Best Practices */}
              <Reveal>
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl p-8 text-white">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Best Practices</h2>
                    <p className="text-emerald-100 text-lg">
                      Follow these guidelines for optimal selective erasure results
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Pre-Erasure Checklist
                      </h3>
                      <ul className="space-y-2 text-emerald-100">
                        <li>• Create a system restore point</li>
                        <li>• Backup essential OS configurations</li>
                        <li>• Document installed drivers</li>
                        <li>• Verify system partition health</li>
                      </ul>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Post-Erasure Steps
                      </h3>
                      <ul className="space-y-2 text-emerald-100">
                        <li>• Test system boot and functionality</li>
                        <li>• Run system file integrity checks</li>
                        <li>• Update security patches</li>
                        <li>• Generate compliance reports</li>
                      </ul>
                    </div>
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

export default RetainOSGuide;