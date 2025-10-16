import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WindowsRisksPage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Windows Security Risks & Compliance | D-Secure Data Erasure</title>
        <meta name="description" content="Understanding Windows data security risks, compliance violations, and threat prevention through secure data erasure." />
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
                  Windows Security <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Risks</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Data leaks, compliance violations, and threat prevention
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Data Leak Vulnerabilities</h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 mb-4">
                      Windows systems contain multiple data persistence locations that pose security risks:
                    </p>
                    <ul className="space-y-2 text-slate-700">
                      <li>• <strong>Pagefile.sys</strong>: Virtual memory swapped to disk containing sensitive data</li>
                      <li>• <strong>Hiberfil.sys</strong>: Hibernation file with complete memory dumps</li>
                      <li>• <strong>System Restore Points</strong>: Snapshots containing deleted files and registry data</li>
                      <li>• <strong>Shadow Copies</strong>: Volume Shadow Copy Service retains file versions</li>
                      <li>• <strong>Temporary Files</strong>: Application and system temp files with data remnants</li>
                      <li>• <strong>Registry Hives</strong>: Configuration data including passwords and keys</li>
                      <li>• <strong>Event Logs</strong>: System activity logs revealing user behavior</li>
                      <li>• <strong>Prefetch Files</strong>: Application launch data showing usage patterns</li>
                    </ul>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Compliance Violations</h2>
                  <div className="space-y-6">
                    <div className="bg-red-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 mb-3">GDPR (General Data Protection Regulation)</h3>
                      <ul className="space-y-2 text-red-800">
                        <li>• Right to erasure requirements for personal data</li>
                        <li>• Data controller obligations for secure deletion</li>
                        <li>• Potential fines up to 4% of annual revenue</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-orange-900 mb-3">HIPAA (Health Insurance Portability and Accountability Act)</h3>
                      <ul className="space-y-2 text-orange-800">
                        <li>• Protected Health Information (PHI) disposal requirements</li>
                        <li>• Administrative, physical, and technical safeguards</li>
                        <li>• Breach notification obligations</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">PCI DSS (Payment Card Industry Data Security Standard)</h3>
                      <ul className="space-y-2 text-blue-800">
                        <li>• Cardholder data environment protection</li>
                        <li>• Secure deletion of payment card information</li>
                        <li>• Regular security assessments and compliance validation</li>
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

export default WindowsRisksPage;