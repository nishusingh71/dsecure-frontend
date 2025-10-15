import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const DeviceSelectionPage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Device Discovery & Selection | D-Secure</title>
        <meta name="description" content="Advanced device detection, filtering, and selection for targeted erasure operations." />
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
                Device Discovery & <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Selection</span>
              </h1>
              <p className="text-xl text-slate-700 max-w-3xl">Advanced device detection, filtering, and selection for targeted erasure operations</p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Device Discovery Process</h2>
                
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-emerald-50 p-6 rounded-lg text-center border border-emerald-200">
                    <div className="text-3xl mb-3">🔍</div>
                    <h3 className="font-bold text-emerald-900 mb-2">Auto-Scan</h3>
                    <p className="text-slate-700 text-sm">Automatic detection of connected devices</p>
                  </div>
                  <div className="bg-teal-50 p-6 rounded-lg text-center border border-teal-200">
                    <div className="text-3xl mb-3">🎯</div>
                    <h3 className="font-bold text-teal-900 mb-2">Filter</h3>
                    <p className="text-slate-700 text-sm">Advanced filtering by type, size, status</p>
                  </div>
                  <div className="bg-cyan-50 p-6 rounded-lg text-center border border-cyan-200">
                    <div className="text-3xl mb-3">✅</div>
                    <h3 className="font-bold text-cyan-900 mb-2">Select</h3>
                    <p className="text-slate-700 text-sm">Multi-select for batch operations</p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">Device Information Display</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Device model, manufacturer, and serial number</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Storage capacity and interface type (SATA/NVMe/USB)</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Current status and health indicators</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Previous erasure history and timestamps</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default DeviceSelectionPage;
