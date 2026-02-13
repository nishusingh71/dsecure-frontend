import React from "react";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';
import Reveal from "@/components/Reveal";

const MacEraseGuide: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('mac-erase-guide')} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Mac Erase Guide
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                  Securely erase Apple Silicon and Intel-based Mac devices using the D-SecureTech Drive Eraser
                  Terminal command for complete data sanitization and compliance.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Guide Content */}
        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <div className="max-w-4xl mx-auto space-y-8">{/* Terminal Command Section */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Wipe Mac Devices through Terminal Command
                    </h2>
                  </div>
                  <p className="text-slate-700 text-lg leading-relaxed">
                    D-SecureTech Drive Eraser for Mac offers a powerful solution for securely erasing and
                    diagnosing Apple Silicon Macs (M1, M2, M3, M4) and Intel-based Macs with T1 or T2 chips.
                    After wiping, your MacBook, iMac, or Mac Mini can be reused or sold safely without risk of
                    data leakage.
                  </p>
                </div>
              </Reveal>

              {/* Accessing Terminal Section */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Accessing Terminal on Mac Devices
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
                        <span className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm">M</span>
                        For Apple Silicon Macs (M1, M2, M3, M4):
                      </h3>
                      <ul className="space-y-3 text-slate-700">
                        <li className="flex items-start">
                          <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3 mt-0.5 text-sm font-bold">1</span>
                          Shut down the Mac.
                        </li>
                        <li className="flex items-start">
                          <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3 mt-0.5 text-sm font-bold">2</span>
                          Press and hold the Power button until the Options menu appears.
                        </li>
                        <li className="flex items-start">
                          <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3 mt-0.5 text-sm font-bold">3</span>
                          Click <strong>Options</strong> then <strong>Continue</strong>.
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-teal-900 mb-4 flex items-center">
                        <span className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm">i</span>
                        For Intel-based Macs:
                      </h3>
                      <ul className="space-y-3 text-slate-700">
                        <li className="flex items-start">
                          <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3 mt-0.5 text-sm font-bold">1</span>
                          Turn on or restart the Mac.
                        </li>
                        <li className="flex items-start">
                          <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3 mt-0.5 text-sm font-bold">2</span>
                          Immediately hold down <strong>Command (⌘) + R</strong>.
                        </li>
                        <li className="flex items-start">
                          <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3 mt-0.5 text-sm font-bold">3</span>
                          Release the keys when the Apple logo appears.
                        </li>
                        <li className="flex items-start">
                          <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3 mt-0.5 text-sm font-bold">4</span>
                          On the macOS Recovery screen, navigate to <strong>Utilities &gt; Terminal</strong>.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                  Steps to Erase Mac via Terminal Command
                </h2>

                <ol className="list-decimal ml-6 text-gray-700 space-y-3">
                  <li>
                    In Terminal, type the following command and press Enter:
                    <div className="bg-gray-100 rounded-lg p-4 mt-2 font-mono text-gray-800 text-sm">
                      sh &lt;(curl https://dssecure.co/m.xml)
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      (Note: There is a space between <code>sh</code> and <code>&lt;</code>)
                    </p>
                  </li>
                  <li>
                    This launches the D-SecureTech Drive Eraser (Mac) application.
                  </li>
                  <li>
                    The software opens on the <b>Erasure</b> tab by default. To run diagnostics, refer to the
                    D-SecureTech Mac Diagnostics Deployment Guide.
                  </li>
                  <li>
                    Select the drive you wish to wipe from the list.
                  </li>
                  <li>
                    Click on <b>Settings</b> (top right corner) and choose <b>Only Erasing</b>.
                  </li>
                  <li>
                    Click on the <b>Cloud</b> icon, log in with your D-SecureTech Cloud credentials, and fetch
                    your erasure licenses. Then click <b>Close</b>.
                  </li>
                  <li>
                    Select your erasure method and verification type, then click <b>Erase</b> to start the
                    wiping process.
                  </li>
                  <li>
                    Confirm by clicking <b>Yes</b> when prompted and monitor the progress.
                  </li>
                  <li>
                    Once completed, click <b>Report</b> to view and download the erasure report and
                    regulatory document of destruction. Reports are also saved to your D-SecureTech Cloud account.
                  </li>
                </ol>
              </section>

              {/* Final Note Section */}
              <Reveal>
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl p-8 text-white">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold">Success!</h2>
                  </div>
                  <p className="text-emerald-50 text-lg leading-relaxed">
                    You have successfully erased your Mac device using D-SecureTech Drive Eraser via Terminal.
                    To make your Mac functional again, reinstall macOS using Internet Recovery or a bootable
                    USB installer.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MacEraseGuide;
