import React, { memo } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const NavigationPage: React.FC = memo(() => {
  return (
    <>
      <SEOHead seo={getSEOForPage('help-manual')} />

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
                Navigation <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Menu System</span>
              </h1>
              <p className="text-xl text-slate-700 max-w-3xl">Complete guide to accessing all D-Secure features, tools, and administrative functions</p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Navigation Structure</h2>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200 mb-8">
                  <h3 className="text-xl font-bold text-emerald-900 mb-3">Main Menu Categories</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-slate-900 mb-2">🏠 Dashboard</h4>
                      <p className="text-slate-700">System overview, active operations, and quick stats</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-slate-900 mb-2">🔄 Operations</h4>
                      <p className="text-slate-700">Start erasure, manage tasks, view history</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-slate-900 mb-2">💾 Devices</h4>
                      <p className="text-slate-700">Device discovery, selection, and management</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-slate-900 mb-2">📋 Reports</h4>
                      <p className="text-slate-700">Regulatory documents, audit trails, compliance exports</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-slate-900 mb-2">⚙️ Settings</h4>
                      <p className="text-slate-700">Configuration, users, integrations</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Keyboard Shortcuts</h3>
                <ul className="space-y-2 text-slate-700">
                  <li><kbd className="px-2 py-1 bg-slate-200 rounded">Ctrl+D</kbd> - Dashboard</li>
                  <li><kbd className="px-2 py-1 bg-slate-200 rounded">Ctrl+E</kbd> - Start Erasure</li>
                  <li><kbd className="px-2 py-1 bg-slate-200 rounded">Ctrl+R</kbd> - Reports</li>
                  <li><kbd className="px-2 py-1 bg-slate-200 rounded">Ctrl+S</kbd> - Settings</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default NavigationPage;
