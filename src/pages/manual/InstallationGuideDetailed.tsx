import React from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const InstallationGuideDetailed: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>D-Secure Installation Guide - Complete Visual Tutorial</title>
        <meta 
          name="description" 
          content="Step-by-step visual installation guide for D-Secure File Eraser with detailed screenshots and system requirements."
        />
      </Helmet>

      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 via-emerald-800 to-emerald-900 py-20">
        <div className="container-responsive">
          <Reveal>
            <div className="text-center text-white">
              <div className="inline-flex items-center bg-emerald-400 text-emerald-900 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                📖 Installation Manual
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                D-Secure Installation Guide
              </h1>
              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                Complete step-by-step visual installation process with system requirements and troubleshooting tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/support/help-manual"
                  className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  ← Back to Help Manual
                </Link>
                <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF Guide
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-responsive">
          
          {/* System Requirements */}
          <Reveal>
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">System Requirements</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 mb-3">Operating System</h3>
                  <ul className="text-slate-600 space-y-2">
                    <li>• macOS X 10.13 onwards</li>
                    <li>• Windows 10/11</li>
                    <li>• Linux (Ubuntu 18+)</li>
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 mb-3">Memory</h3>
                  <ul className="text-slate-600 space-y-2">
                    <li>• 8 GB (recommended)</li>
                    <li>• 4 GB (minimum)</li>
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 mb-3">Hard Disk</h3>
                  <ul className="text-slate-600 space-y-2">
                    <li>• 250 MB of free space</li>
                    <li>• Additional space for logs</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Installation Steps */}
          <div className="space-y-12">
            
            {/* Step 1: Download */}
            <Reveal>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-emerald-600">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Download D-Secure File Eraser</h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-slate-600 mb-4">
                      Download the D-Secure installation file from the official website. Make sure to verify the file integrity before installation.
                    </p>
                    <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded">
                      <p className="text-emerald-800">
                        <strong>Note:</strong> Always download from official sources to ensure security and authenticity.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-100 rounded-xl p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-xl mb-4">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-slate-700 font-medium">D-SecureFileEraser.dmg</p>
                    <p className="text-slate-500 text-sm">Installation Package</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Step 2: Mount DMG */}
            <Reveal>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-emerald-600">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Mount the Installation Package</h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-slate-600 mb-4">
                      Double-click the downloaded .dmg file to mount the virtual volume. This will create a virtual volume named <strong>D-Secure File Eraser</strong>.
                    </p>
                    <div className="space-y-2">
                      <p className="text-slate-700 font-medium">Steps:</p>
                      <ol className="list-decimal list-inside text-slate-600 space-y-1">
                        <li>Locate the downloaded file</li>
                        <li>Double-click to mount</li>
                        <li>Wait for mounting to complete</li>
                      </ol>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-6 border-2 border-dashed border-slate-300">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-xl shadow-md mb-4">
                        <svg className="w-10 h-10 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                          <polyline points="14,2 14,8 20,8"/>
                        </svg>
                      </div>
                      <p className="font-bold text-slate-900">D-Secure File Eraser</p>
                      <p className="text-slate-500 text-sm">Virtual Volume Mounted</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Step 3: Drag to Applications */}
            <Reveal>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-emerald-600">3</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Install D-Secure Application</h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-slate-600 mb-4">
                      Drag the <strong>D-Secure File Eraser</strong> application from the mounted virtual volume to the Applications folder.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-100 rounded flex items-center justify-center">
                          <span className="text-emerald-600 font-bold text-sm">1</span>
                        </div>
                        <span className="text-slate-700">Open the mounted volume</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-100 rounded flex items-center justify-center">
                          <span className="text-emerald-600 font-bold text-sm">2</span>
                        </div>
                        <span className="text-slate-700">Drag D-Secure app to Applications</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-100 rounded flex items-center justify-center">
                          <span className="text-emerald-600 font-bold text-sm">3</span>
                        </div>
                        <span className="text-slate-700">Wait for copy to complete</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-slate-900">D-Secure</p>
                      </div>
                      <div className="text-2xl text-slate-400">→</div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"/>
                            <path d="M8 1v6h8V1"/>
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-slate-900">Applications</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Drag & Drop Installation</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Step 4: Launch Application */}
            <Reveal>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-emerald-600">4</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Launch D-Secure File Eraser</h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-slate-600 mb-4">
                      To launch the software, double-click on <strong>D-Secure File Eraser</strong> in the Applications folder.
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-4">
                      <p className="text-yellow-800">
                        <strong>Important:</strong> On first launch, macOS may show a security warning. Click "Open" to proceed.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-700 font-medium">What happens next:</p>
                      <ul className="list-disc list-inside text-slate-600 space-y-1">
                        <li>Application launches successfully</li>
                        <li>License agreement appears</li>
                        <li>Main interface becomes available</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-xl shadow-lg mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <p className="font-bold text-slate-900">D-Secure File Eraser</p>
                      <p className="text-emerald-600 text-sm">Ready to Launch</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Step 5: License Agreement */}
            <Reveal>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-emerald-600">5</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Accept License Agreement</h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-slate-600 mb-4">
                      Accept the <strong>License Agreement</strong> and then the main window of <strong>D-Secure File Eraser</strong> software is displayed.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                      <p className="text-blue-800">
                        <strong>Note:</strong> Please read the license terms carefully before accepting.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-slate-900">License Agreement</h4>
                        <p className="text-slate-500 text-sm">D-Secure End User License</p>
                      </div>
                      <div className="space-y-2">
                        <button className="w-full bg-emerald-500 text-white py-2 rounded font-medium">
                          Accept & Continue
                        </button>
                        <button className="w-full bg-slate-200 text-slate-600 py-2 rounded">
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Completion Notice */}
          <Reveal>
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-xl mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Installation Complete!</h3>
                <p className="text-emerald-100 mb-6">
                  D-Secure File Eraser has been successfully installed on your system.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/support/manual/first-time-setup"
                    className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    Next: First Time Setup →
                  </Link>
                  <Link
                    to="/support/help-manual"
                    className="bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    Back to Manual
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </div>
  );
};

export default InstallationGuideDetailed;