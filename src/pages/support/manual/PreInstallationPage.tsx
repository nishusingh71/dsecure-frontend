import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const PreInstallationPage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Pre-Installation Checklist | D-Secure System Requirements</title>
        <meta name="description" content="System requirements and preparation steps before installing D-Secure data erasure software." />
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
                  Pre-Installation <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Checklist</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  System requirements and preparation steps before installation
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">System Requirements</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-3">Minimum Requirements</h3>
                      <ul className="space-y-2 text-emerald-800">
                        <li>• Windows 10/11 (64-bit)</li>
                        <li>• 4GB RAM</li>
                        <li>• 2GB free disk space</li>
                        <li>• Administrator privileges</li>
                        <li>• Internet connection for activation</li>
                      </ul>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-teal-900 mb-3">Recommended</h3>
                      <ul className="space-y-2 text-teal-800">
                        <li>• Windows 11 (latest version)</li>
                        <li>• 8GB+ RAM</li>
                        <li>• 5GB+ free disk space</li>
                        <li>• SSD storage</li>
                        <li>• Stable broadband connection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Pre-Installation Steps</h2>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Close all applications", desc: "Ensure no programs are running that might interfere with installation" },
                      { step: "2", title: "Disable antivirus temporarily", desc: "Prevent false positives during installation process" },
                      { step: "3", title: "Check disk space", desc: "Verify sufficient free space on system drive" },
                      { step: "4", title: "Backup important data", desc: "Create system backup before installing security software" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
});

export default PreInstallationPage;