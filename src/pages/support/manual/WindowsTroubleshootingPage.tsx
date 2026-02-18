import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WindowsTroubleshootingPage: React.FC = memo(() => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-windows-troubleshooting")} />
      <Helmet>
        <title>Windows Troubleshooting | D-Secure Manual</title>
        <meta name="description" content="Common Windows erasure issues and solutions for D-Secure operations." />
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
                  Windows <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Troubleshooting</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Common errors and solutions for D-Secure Windows operations
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Issues</h2>
                  <div className="space-y-6">
                    {[
                      {
                        issue: "Drive Not Detected",
                        cause: "Driver issues or hardware connection problems",
                        solution: "Update drivers, check SATA connections, try different USB port"
                      },
                      {
                        issue: "BitLocker Access Denied",
                        cause: "Insufficient permissions or locked drive",
                        solution: "Run as administrator, unlock BitLocker first, suspend protection"
                      },
                      {
                        issue: "Erasure Process Stuck",
                        cause: "Bad sectors or hardware failure",
                        solution: "Check disk health, run CHKDSK, try different erasure method"
                      },
                      {
                        issue: "SSD Secure Erase Failed",
                        cause: "Drive locked or unsupported command",
                        solution: "Check ATA security status, use manufacturer tool, try hdparm"
                      }
                    ].map((item, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-red-600 mb-2">❌ {item.issue}</h3>
                        <p className="text-slate-600 text-sm mb-3"><strong>Cause:</strong> {item.cause}</p>
                        <p className="text-emerald-600 text-sm"><strong>Solution:</strong> {item.solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Error Codes</h2>
                  <div className="space-y-4">
                    {[
                      { code: "0x80070005", desc: "Access Denied - Run as administrator" },
                      { code: "0x80070015", desc: "Device not ready - Check connections" },
                      { code: "0x8007001F", desc: "Device error - Hardware issue" },
                      { code: "0x80070057", desc: "Invalid parameter - Check command syntax" }
                    ].map((error, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          !
                        </div>
                        <div>
                          <code className="text-red-600 font-mono text-sm">{error.code}</code>
                          <p className="text-slate-600 text-sm">{error.desc}</p>
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

export default WindowsTroubleshootingPage;