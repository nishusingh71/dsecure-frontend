import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WindowsSSDErasurePage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Windows SSD Erasure | D-Secure Manual</title>
        <meta name="description" content="Complete guide to secure SSD erasure in Windows using ATA Secure Erase and TRIM considerations." />
      </Helmet>

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
                  Windows SSD <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Erasure</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Specialized procedures for secure SSD data erasure in Windows environments
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">SSD vs HDD Erasure Differences</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-red-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 mb-4">❌ Traditional Methods</h3>
                      <ul className="space-y-2 text-red-800 text-sm">
                        <li>• Overwriting patterns ineffective</li>
                        <li>• Wear-leveling bypasses writes</li>
                        <li>• Hidden spare blocks remain</li>
                        <li>• TRIM may not work properly</li>
                      </ul>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-4">✅ SSD-Specific Methods</h3>
                      <ul className="space-y-2 text-emerald-800 text-sm">
                        <li>• ATA Secure Erase command</li>
                        <li>• Cryptographic key destruction</li>
                        <li>• Manufacturer utilities</li>
                        <li>• Firmware-level sanitization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
                    ATA Secure Erase Process
                  </h2>
                  <div className="space-y-6">
                    <p className="text-slate-700">
                      The most effective method for SSD erasure, supported by most modern SSDs.
                    </p>
                    <div className="space-y-4">
                      {[
                        { step: "1", title: "Check Support", desc: "hdparm -I /dev/sdX | grep -i erase", detail: "Verify drive supports secure erase" },
                        { step: "2", title: "Set Password", desc: "hdparm --user-master u --security-set-pass p /dev/sdX", detail: "Enable security to unlock erase" },
                        { step: "3", title: "Start Erase", desc: "hdparm --user-master u --security-erase p /dev/sdX", detail: "Execute secure erase command" },
                        { step: "4", title: "Verify", desc: "hdparm -I /dev/sdX | grep -i erase", detail: "Confirm erase completion" }
                      ].map((item) => (
                        <div key={item.step} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900">{item.title}</h4>
                            <code className="text-sm text-slate-600 bg-slate-200 px-2 py-1 rounded block mt-1">{item.desc}</code>
                            <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
                    Windows SSD Tools
                  </h2>
                  <div className="grid gap-6">
                    <div className="bg-cyan-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-cyan-900 mb-4">Manufacturer Tools</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-cyan-800 mb-2">Samsung Magician</h4>
                          <p className="text-sm text-cyan-700">Secure erase for Samsung SSDs</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-cyan-800 mb-2">Intel SSD Toolbox</h4>
                          <p className="text-sm text-cyan-700">Intel SSD management and erasure</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-cyan-800 mb-2">Crucial Storage Executive</h4>
                          <p className="text-sm text-cyan-700">Micron/Crucial SSD utilities</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-cyan-800 mb-2">WD SSD Dashboard</h4>
                          <p className="text-sm text-cyan-700">Western Digital SSD tools</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Best Practices</h2>
                  <div className="space-y-4">
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4">
                      <h4 className="font-semibold text-emerald-900 mb-2">✅ Recommended</h4>
                      <ul className="space-y-1 text-emerald-800 text-sm">
                        <li>• Use ATA Secure Erase when available</li>
                        <li>• Verify TRIM is enabled</li>
                        <li>• Use manufacturer tools for best results</li>
                        <li>• Test on non-critical drives first</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                      <h4 className="font-semibold text-red-900 mb-2">❌ Avoid</h4>
                      <ul className="space-y-1 text-red-800 text-sm">
                        <li>• Multiple overwrite passes (causes wear)</li>
                        <li>• Generic disk wiping tools</li>
                        <li>• Assuming format is sufficient</li>
                        <li>• Ignoring firmware updates</li>
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

export default WindowsSSDErasurePage;