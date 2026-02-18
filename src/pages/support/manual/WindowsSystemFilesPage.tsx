import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WindowsSystemFilesPage: React.FC = memo(() => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-windows-system-files")} />
      {/* <Helmet>
        <title>Windows System Files & Caches | Pagefile, Hibernation, Restore Points</title>
        <meta name="description" content="Managing Windows system files including pagefile, hibernation files, and system restore points for secure data erasure." />
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
                  Windows System <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Files</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Pagefile, hibernation files, and system restore points
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Pagefile.sys</h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 mb-4">
                      Virtual memory file that extends physical RAM and contains sensitive data from running applications.
                    </p>
                    <div className="bg-red-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-red-900 mb-3">Security Risks</h3>
                      <ul className="space-y-2 text-red-800">
                        <li>• Stores memory pages when physical RAM is full</li>
                        <li>• Contains passwords, encryption keys, and personal information</li>
                        <li>• Persists across system reboots by default</li>
                      </ul>
                    </div>
                    <div className="bg-slate-100 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Commands</h4>
                      <pre className="text-sm bg-slate-800 text-green-400 p-3 rounded overflow-x-auto">
{`# Disable pagefile
wmic computersystem set AutomaticManagedPagefile=False

# Clear pagefile on shutdown
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management" /v ClearPageFileAtShutdown /t REG_DWORD /d 1`}
                      </pre>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Hiberfil.sys</h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 mb-4">
                      Hibernation file containing complete memory dump with full system memory snapshot.
                    </p>
                    <div className="bg-orange-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-orange-900 mb-3">Security Implications</h3>
                      <ul className="space-y-2 text-orange-800">
                        <li>• Full system memory snapshot including sensitive data</li>
                        <li>• Encryption keys, passwords, and application data</li>
                        <li>• Larger than physical RAM size (75% of RAM)</li>
                        <li>• Accessible to forensic analysis tools</li>
                      </ul>
                    </div>
                    <div className="bg-slate-100 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">PowerShell Commands</h4>
                      <pre className="text-sm bg-slate-800 text-green-400 p-3 rounded overflow-x-auto">
{`# Disable hibernation
powercfg /hibernate off

# Verify hibernation status
powercfg /availablesleepstates`}
                      </pre>
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

export default React.memo(WindowsSystemFilesPage);