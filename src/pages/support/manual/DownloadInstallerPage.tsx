import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const DownloadInstallerPage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Download & Run Installer | D-Secure Installation Guide</title>
        <meta name="description" content="Step-by-step guide to downloading and running the D-Secure installer safely and securely." />
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
                  Download & Run <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Installer</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Step-by-step guide to downloading and running the D-Secure installer
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Download Process</h2>
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">Official Download Sources</h3>
                      <ul className="space-y-2 text-blue-800">
                        <li>• D-Secure official website: D-Securetech.com</li>
                        <li>• Customer portal download section</li>
                        <li>• Email link from purchase confirmation</li>
                        <li>• Authorized reseller portals</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 mb-3">Security Warning</h3>
                      <p className="text-red-800">
                        Only download D-Secure from official sources. Verify file integrity using provided checksums to ensure authenticity.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Installation Steps</h2>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Locate downloaded file", desc: "Find DSSecure_Setup.exe in your Downloads folder" },
                      { step: "2", title: "Right-click and run as administrator", desc: "Ensure proper permissions for installation" },
                      { step: "3", title: "Accept UAC prompt", desc: "Allow the installer to make changes to your device" },
                      { step: "4", title: "Follow installation wizard", desc: "Complete the guided setup process" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
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

export default DownloadInstallerPage;