import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const MainDashboardPage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Main Dashboard | D-Secure User Interface Guide</title>
        <meta name="description" content="Master the D-Secure main dashboard interface for efficient data erasure operations and system monitoring." />
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
                Main <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Dashboard</span>
              </h1>
              <p className="text-xl text-slate-700 max-w-3xl">Comprehensive overview of active operations, system health, and quick access panels</p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Dashboard Overview</h2>
                <p className="text-slate-700 mb-6">The D-Secure main dashboard provides real-time visibility into all erasure operations, system status, and quick access to essential features.</p>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Key Dashboard Components</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                    <h4 className="font-bold text-emerald-900 mb-2">📊 Status Overview</h4>
                    <p className="text-slate-700">Real-time system health, active operations, and device status at a glance.</p>
                  </div>
                  <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
                    <h4 className="font-bold text-teal-900 mb-2">🔄 Active Operations</h4>
                    <p className="text-slate-700">Monitor ongoing erasure tasks with progress indicators and time estimates.</p>
                  </div>
                  <div className="bg-cyan-50 p-6 rounded-lg border border-cyan-200">
                    <h4 className="font-bold text-cyan-900 mb-2">📈 Performance Metrics</h4>
                    <p className="text-slate-700">Track throughput, completion rates, and system resource utilization.</p>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                    <h4 className="font-bold text-emerald-900 mb-2">⚡ Quick Actions</h4>
                    <p className="text-slate-700">One-click access to start erasure, view reports, and manage devices.</p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Navigation Elements</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Top navigation bar with global search and user profile</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Left sidebar with feature categories and quick links</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Central workspace for active operations and data visualization</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Right panel for notifications, alerts, and system messages</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default MainDashboardPage;
