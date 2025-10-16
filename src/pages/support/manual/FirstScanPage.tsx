import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const FirstScanPage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>First System Scan | D-Secure Initial Security Baseline</title>
        <meta name="description" content="Run initial full system scan to establish baseline security and identify existing threats with D-Secure." />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Reveal>
              <div className="text-center">
                <Link to="/support/manual/first-time-setup" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to First Time Setup
                </Link>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  First System <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Scan</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Run initial full system scan to establish baseline security
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Scan Types</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-emerald-50 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">Quick Scan</h3>
                      <p className="text-sm text-slate-700 mb-3">Scans critical system areas</p>
                      <div className="text-xs text-emerald-600 font-medium">~5 minutes</div>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">Full Scan</h3>
                      <p className="text-sm text-slate-700 mb-3">Complete system analysis</p>
                      <div className="text-xs text-teal-600 font-medium">~30-60 minutes</div>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">Custom Scan</h3>
                      <p className="text-sm text-slate-700 mb-3">User-defined scan areas</p>
                      <div className="text-xs text-cyan-600 font-medium">Variable</div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Recommended First Scan</h2>
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Full System Scan</h3>
                        <p className="text-slate-700 mb-4">
                          We recommend running a complete full system scan for your first scan to establish a comprehensive security baseline.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-emerald-900 mb-2">What it scans:</h4>
                            <ul className="text-sm text-emerald-800 space-y-1">
                              <li>• All files and folders</li>
                              <li>• System memory</li>
                              <li>• Registry entries</li>
                              <li>• Boot sectors</li>
                              <li>• Network connections</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-teal-900 mb-2">Benefits:</h4>
                            <ul className="text-sm text-teal-800 space-y-1">
                              <li>• Detects existing threats</li>
                              <li>• Establishes clean baseline</li>
                              <li>• Identifies vulnerabilities</li>
                              <li>• Optimizes future scans</li>
                              <li>• Provides detailed report</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Starting Your First Scan</h2>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Open D-Secure", desc: "Launch the application from desktop shortcut or Start menu" },
                      { step: "2", title: "Navigate to Scan", desc: "Click on 'Scan' tab in the main interface" },
                      { step: "3", title: "Select Full Scan", desc: "Choose 'Full System Scan' from scan options" },
                      { step: "4", title: "Start Scan", desc: "Click 'Start Scan' button to begin the process" },
                      { step: "5", title: "Monitor Progress", desc: "Watch real-time progress and scan statistics" },
                      { step: "6", title: "Review Results", desc: "Examine scan report when complete" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {item.step}
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

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">During the Scan</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">What to Expect</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li>• Real-time progress indicator</li>
                        <li>• Current file being scanned</li>
                        <li>• Threats found counter</li>
                        <li>• Estimated time remaining</li>
                        <li>• System performance impact minimal</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Best Practices</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li>• Keep system plugged in (laptops)</li>
                        <li>• Avoid heavy system usage</li>
                        <li>• Don't interrupt the scan</li>
                        <li>• Close unnecessary applications</li>
                        <li>• Ensure stable internet connection</li>
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
});

export default FirstScanPage;