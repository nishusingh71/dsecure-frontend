import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const StatusIndicatorsPage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Status Indicators & Alerts | D-Secure</title>
        <meta name="description" content="Understanding system alerts, warning indicators, and notification management in D-Secure." />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <Link to="/support/manual/user-interface" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to User Interface Guide
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Status Indicators & <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Alerts</span>
              </h1>
              <p className="text-xl text-slate-700 max-w-3xl">Understanding system alerts, warning indicators, and notification management</p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Status Indicator Types</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <h3 className="font-bold text-green-900 mb-2">🟢 Success - Operation Complete</h3>
                    <p className="text-slate-700">Erasure completed successfully with verification passed</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-bold text-blue-900 mb-2">🔵 In Progress - Active Operation</h3>
                    <p className="text-slate-700">Erasure currently running with real-time progress updates</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <h3 className="font-bold text-yellow-900 mb-2">🟡 Warning - Attention Required</h3>
                    <p className="text-slate-700">Non-critical issues that may affect performance</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                    <h3 className="font-bold text-red-900 mb-2">🔴 Error - Operation Failed</h3>
                    <p className="text-slate-700">Critical failure requiring immediate attention</p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Alert Management</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Real-time notifications for operation status changes</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Email alerts for critical events and completions</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Customizable alert thresholds and preferences</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Alert history and acknowledgment tracking</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default StatusIndicatorsPage;
