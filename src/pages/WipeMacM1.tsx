import React from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

const WipeMacM1Guide: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>WipeMacM1 Guide | DSecure - Securely Erase Your M1 Mac</title>
        <meta
          name="description"
          content="Learn how to securely wipe your Apple M1 Mac using professional data erasure methods without compromising security."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm0 2a9 9 0 100 18 9 9 0 000-18z"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    WipeMacM1 Guide
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                  The Professional Guide to Securely Erasing Your M1 Mac
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
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-indigo-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Why Proper Data Erasure Matters on M1 Macs
                    </h2>
                  </div>
                  <p className="text-slate-700 text-lg leading-relaxed mb-4">
                    M1 Macs integrate advanced security features like
                    hardware-verified secure boot and automatic encryption,
                    making data protection critical. Simply deleting files isn’t
                    enough; residual data can remain accessible without a
                    thorough wipe.
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2">
                    <li>
                      Protects your privacy when selling, donating, or recycling
                      your Mac.
                    </li>
                    <li>
                      Ensures your personal data cannot be recovered by
                      unauthorized users.
                    </li>
                  </ul>
                </div>
              </Reveal>

              {/* Step-by-Step Process */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-indigo-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Step-by-Step Secure Wiping Process
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {[
                      "Back Up Your Data Before You Wipe",
                      "Sign Out of Apple Services to Avoid Activation Lock",
                      "Use 'Erase All Content and Settings' for Fast Reset",
                      "Alternative Method – macOS Recovery",
                      "Understanding FileVault Encryption",
                      "Final Checks Before Selling",
                    ].map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {step}
                          </h3>
                          <p className="text-slate-700 leading-relaxed">
                            {index === 0 &&
                              "Use Time Machine or iCloud to back up important files before erasure."}
                            {index === 1 &&
                              "Sign out of iCloud, iMessage, and Apple Music to prevent activation lock."}
                            {index === 2 &&
                              "Use macOS Monterey or later’s 'Erase All Content and Settings' option to reset quickly."}
                            {index === 3 &&
                              "Boot into Recovery mode, erase 'Macintosh HD' via Disk Utility, and reinstall macOS."}
                            {index === 4 &&
                              "FileVault encryption ensures your erased data remains unreadable and secure."}
                            {index === 5 &&
                              "After wiping, shut down before transferring ownership and unpair Bluetooth devices."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Best Practices */}
              <Reveal>
                <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-8 text-white">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Best Practices</h2>
                    <p className="text-indigo-100 text-lg">
                      Follow these professional tips for a safe and verified Mac
                      erasure
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <svg
                          className="w-6 h-6 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Pre-Wipe Checklist
                      </h3>
                      <ul className="space-y-2 text-indigo-100">
                        <li>• Create a verified Time Machine backup</li>
                        <li>• Sign out of all Apple accounts</li>
                        <li>• Verify FileVault status</li>
                        <li>• Confirm macOS version compatibility</li>
                      </ul>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <svg
                          className="w-6 h-6 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        Post-Wipe Steps
                      </h3>
                      <ul className="space-y-2 text-indigo-100">
                        <li>• Ensure macOS boots correctly</li>
                        <li>• Test for drive and security functionality</li>
                        <li>• Review erasure certificates</li>
                        <li>• Prepare for new user setup</li>
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

export default WipeMacM1Guide;
