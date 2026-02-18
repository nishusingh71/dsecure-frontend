import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WindowsBuiltinToolsPage: React.FC = memo(() => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-windows-builtin-tools")} />
      {/* <Helmet>
        <title>Windows Built-in Erasure Tools | D-Secure Manual</title>
        <meta name="description" content="Guide to Windows built-in data erasure tools including Reset this PC and BitLocker removal procedures." />
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
                  Windows Built-in <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Erasure Tools</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Using Windows native tools for secure data erasure and system reset
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
                    Reset This PC
                  </h2>
                  <div className="space-y-6">
                    <p className="text-slate-700">
                      Windows 10/11 includes a built-in reset feature that can remove personal files and reinstall Windows.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-emerald-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-emerald-900 mb-4">Keep My Files Option</h3>
                        <ul className="space-y-2 text-emerald-800 text-sm">
                          <li>• Removes apps and settings</li>
                          <li>• Keeps personal files</li>
                          <li>• Reinstalls Windows</li>
                          <li>• Not suitable for secure erasure</li>
                        </ul>
                      </div>
                      <div className="bg-teal-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-teal-900 mb-4">Remove Everything Option</h3>
                        <ul className="space-y-2 text-teal-800 text-sm">
                          <li>• Removes all personal files</li>
                          <li>• Removes apps and settings</li>
                          <li>• Reinstalls Windows</li>
                          <li>• Better for data removal</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
                    Cipher Command
                  </h2>
                  <div className="space-y-4">
                    <p className="text-slate-700">
                      The cipher command can overwrite deleted data on NTFS volumes.
                    </p>
                    <div className="bg-slate-900 rounded-lg p-4">
                      <code className="text-green-400 text-sm">
                        cipher /w:C:\
                      </code>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-4">
                      <h4 className="font-semibold text-cyan-900 mb-2">Command Options:</h4>
                      <ul className="space-y-1 text-cyan-800 text-sm">
                        <li>• /w - Wipes unused space</li>
                        <li>• Three-pass overwrite</li>
                        <li>• Works on NTFS only</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
                    BitLocker Management
                  </h2>
                  <div className="space-y-4">
                    <p className="text-slate-700">
                      For encrypted drives, proper BitLocker key management is essential for secure erasure.
                    </p>
                    <div className="grid gap-4">
                      {[
                        { step: "1", title: "Suspend BitLocker", desc: "manage-bde -protectors -disable C:" },
                        { step: "2", title: "Delete Keys", desc: "manage-bde -protectors -delete C:" },
                        { step: "3", title: "Format Drive", desc: "format C: /fs:NTFS /p:3" }
                      ].map((item) => (
                        <div key={item.step} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900">{item.title}</h4>
                            <code className="text-sm text-slate-600 bg-slate-200 px-2 py-1 rounded">{item.desc}</code>
                          </div>
                        </div>
                      ))}
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

export default React.memo(WindowsBuiltinToolsPage);