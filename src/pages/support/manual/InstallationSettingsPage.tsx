import React, { memo } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const InstallationSettingsPage: React.FC = memo(() => {
  return (
    <>
      <SEOHead seo={getSEOForPage('help-manual')} />

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
                  Installation <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Settings</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Standard vs custom installation options and component selection
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Installation Types</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">Standard Installation</h3>
                      <ul className="space-y-2 text-green-800">
                        <li>• All core components</li>
                        <li>• Default installation path</li>
                        <li>• Automatic updates enabled</li>
                        <li>• Desktop shortcuts created</li>
                        <li>• Recommended for most users</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">Custom Installation</h3>
                      <ul className="space-y-2 text-blue-800">
                        <li>• Choose installation directory</li>
                        <li>• Select specific components</li>
                        <li>• Configure update settings</li>
                        <li>• Advanced security options</li>
                        <li>• For experienced users</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Component Selection</h2>
                  <div className="space-y-4">
                    {[
                      { name: "Core Engine", desc: "Essential data erasure functionality", required: true },
                      { name: "GUI Interface", desc: "Graphical user interface", required: true },
                      { name: "Command Line Tools", desc: "CLI utilities for automation", required: false },
                      { name: "Reporting Module", desc: "Generate erasure regulatory documents", required: false }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-slate-900">{item.name}</h3>
                          <p className="text-slate-600 text-sm">{item.desc}</p>
                        </div>
                        <div className={`px-3 py-1 rounded text-sm font-medium ${item.required ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                          {item.required ? 'Required' : 'Optional'}
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

export default React.memo(InstallationSettingsPage);