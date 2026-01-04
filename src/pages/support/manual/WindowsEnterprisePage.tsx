import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WindowsEnterprisePage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Windows Enterprise Erasure | D-Secure Manual</title>
        <meta name="description" content="Enterprise-scale Windows data erasure with D-Secure bulk operations and management." />
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
                  Windows Enterprise <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Erasure</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  SCCM, Intune, and network-based methods for D-Secure bulk operations
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Enterprise Deployment Methods</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-4">SCCM Integration</h3>
                      <ul className="space-y-2 text-emerald-800 text-sm">
                        <li>• Deploy D-Secure via SCCM packages</li>
                        <li>• Automated task sequences</li>
                        <li>• Centralized reporting</li>
                        <li>• Scheduled erasure operations</li>
                      </ul>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-teal-900 mb-4">Microsoft Intune</h3>
                      <ul className="space-y-2 text-teal-800 text-sm">
                        <li>• Cloud-based management</li>
                        <li>• Remote wipe capabilities</li>
                        <li>• Compliance policies</li>
                        <li>• Mobile device support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Bulk Operations</h2>
                  <div className="space-y-6">
                    <div className="bg-cyan-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-cyan-900 mb-4">D-Secure Enterprise Console</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cyan-600 mb-2">1000+</div>
                          <p className="text-sm text-cyan-800">Devices Simultaneously</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cyan-600 mb-2">24/7</div>
                          <p className="text-sm text-cyan-800">Monitoring</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cyan-600 mb-2">99.9%</div>
                          <p className="text-sm text-cyan-800">Success Rate</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[
                        { step: "1", title: "Device Discovery", desc: "Automatic network scanning and device identification" },
                        { step: "2", title: "Policy Assignment", desc: "Apply erasure policies based on device groups" },
                        { step: "3", title: "Scheduled Execution", desc: "Execute erasure during maintenance windows" },
                        { step: "4", title: "Compliance Reporting", desc: "Generate audit reports and regulatory documents" }
                      ].map((item) => (
                        <div key={item.step} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {item.step}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">{item.title}</h4>
                            <p className="text-slate-600 text-sm">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Compliance & Reporting</h2>
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Enterprise Features</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ul className="space-y-2 text-slate-700 text-sm">
                        <li>✅ GDPR compliance reporting</li>
                        <li>✅ HIPAA audit trails</li>
                        <li>✅ SOX documentation</li>
                        <li>✅ Custom compliance templates</li>
                      </ul>
                      <ul className="space-y-2 text-slate-700 text-sm">
                        <li>✅ Real-time dashboards</li>
                        <li>✅ Automated notifications</li>
                        <li>✅ Regulatory document generation</li>
                        <li>✅ API integration</li>
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

export default WindowsEnterprisePage;