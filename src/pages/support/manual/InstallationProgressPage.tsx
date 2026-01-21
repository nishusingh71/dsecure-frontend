import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const InstallationProgressPage: React.FC = memo(() => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-installation-progress")} />
      <Helmet>
        <title>Installation Progress & Completion | D-Secure Setup Monitoring</title>
        <meta name="description" content="Monitoring installation progress and finalizing D-Secure data erasure software setup." />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Reveal>
              <div className="text-center">
                <Link to="/support/manual/installation" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Installation Guide
                </Link>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  Installation <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Progress</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Monitoring installation progress and finalizing setup
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Installation Phases</h2>
                  <div className="space-y-4">
                    {[
                      { phase: "Extracting files", desc: "Unpacking installation components", time: "30 seconds" },
                      { phase: "Installing core engine", desc: "Setting up data erasure functionality", time: "2 minutes" },
                      { phase: "Configuring system integration", desc: "Registering Windows services", time: "1 minute" },
                      { phase: "Finalizing setup", desc: "Creating shortcuts and registry entries", time: "30 seconds" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{item.phase}</h3>
                          <p className="text-slate-600 text-sm">{item.desc}</p>
                        </div>
                        <div className="text-sm text-slate-500">{item.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Completion Indicators</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">Success Signs</h3>
                      <ul className="space-y-2 text-green-800">
                        <li>• "Installation completed successfully" message</li>
                        <li>• D-Secure icon appears on desktop</li>
                        <li>• Start menu entry created</li>
                        <li>• System tray icon visible</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 mb-3">Warning Signs</h3>
                      <ul className="space-y-2 text-red-800">
                        <li>• Error messages during installation</li>
                        <li>• Installation hangs or freezes</li>
                        <li>• Missing desktop shortcuts</li>
                        <li>• Application won't launch</li>
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

export default InstallationProgressPage;