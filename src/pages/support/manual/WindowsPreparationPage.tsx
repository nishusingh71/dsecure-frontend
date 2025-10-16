import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WindowsPreparationPage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Windows Pre-Erasure Preparation | D-Secure Manual</title>
        <meta name="description" content="Essential preparation steps before Windows data erasure with D-Secure." />
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
                  Pre-Erasure <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Preparation</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Backup, BitLocker management, and administrative setup for D-Secure
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Pre-Erasure Checklist</h2>
                  <div className="space-y-4">
                    {[
                      { task: "Data Backup", desc: "Backup critical data to external storage", critical: true },
                      { task: "License Keys", desc: "Document software licenses and product keys", critical: true },
                      { task: "BitLocker Status", desc: "Check encryption status and recovery keys", critical: true },
                      { task: "Admin Rights", desc: "Ensure administrative privileges", critical: false },
                      { task: "Network Disconnect", desc: "Disconnect from network during erasure", critical: false },
                      { task: "Power Supply", desc: "Ensure stable power connection", critical: false }
                    ].map((item, index) => (
                      <div key={index} className={`flex items-start space-x-4 p-4 rounded-lg ${item.critical ? 'bg-red-50 border border-red-200' : 'bg-slate-50'}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${item.critical ? 'bg-red-500' : 'bg-emerald-500'}`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{item.task}</h3>
                          <p className="text-slate-600 text-sm">{item.desc}</p>
                          {item.critical && <span className="text-red-600 text-xs font-medium">Critical Step</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">BitLocker Management</h2>
                  <div className="space-y-6">
                    <div className="bg-emerald-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-4">Check BitLocker Status</h3>
                      <div className="bg-slate-900 rounded-lg p-4">
                        <code className="text-green-400 text-sm">manage-bde -status</code>
                      </div>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-teal-900 mb-4">Backup Recovery Key</h3>
                      <div className="bg-slate-900 rounded-lg p-4">
                        <code className="text-green-400 text-sm">manage-bde -protectors -get C: -type recoverypassword</code>
                      </div>
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

export default WindowsPreparationPage;