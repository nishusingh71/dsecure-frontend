import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WindowsBitLockerPage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Windows BitLocker Management | Suspension & Cryptographic Erasure</title>
        <meta name="description" content="BitLocker management procedures for Windows including suspension, key removal, and cryptographic erasure integration." />
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
                  BitLocker <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Management</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Suspending and removing BitLocker encryption
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">BitLocker Overview</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">Key Features</h3>
                      <ul className="space-y-2 text-blue-800">
                        <li>• Full volume encryption using AES 128/256-bit</li>
                        <li>• TPM (Trusted Platform Module) integration</li>
                        <li>• Pre-boot authentication support</li>
                        <li>• Recovery key and password options</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">Encryption Methods</h3>
                      <ul className="space-y-2 text-green-800">
                        <li>• XTS-AES: Default encryption algorithm</li>
                        <li>• CBC-AES: Legacy compatibility mode</li>
                        <li>• Hardware Encryption: SED drive integration</li>
                        <li>• Software Encryption: CPU-based processing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Management Commands</h2>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">BitLocker Status & Control</h4>
                    <pre className="text-sm bg-slate-800 text-green-400 p-3 rounded overflow-x-auto">
{`# Check BitLocker status
manage-bde -status

# Suspend BitLocker protection
manage-bde -protectors -disable C:

# Remove BitLocker encryption
manage-bde -off C:`}
                    </pre>
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

export default WindowsBitLockerPage;