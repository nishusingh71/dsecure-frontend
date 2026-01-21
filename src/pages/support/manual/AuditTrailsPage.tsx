import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

const AuditTrailsPage: React.FC = memo(() => {
 return (
 <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-audit-trails")} />
 <Helmet>
 <title>Audit Trails | D-Secure Manual</title>
 <meta
 name="description"
 content="D-Secure audit trails guide for maintaining detailed logs for compliance and forensic purposes."
 />
 </Helmet>

 <div className="min-h-screen bg-slate-50">
 <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <Reveal>
 <div className="text-center">
 <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
 Audit <span className="text-emerald-600">Trails</span>
 </h1>
 <p className="text-xl text-slate-700 max-w-3xl mx-auto">
 Maintain comprehensive audit trails with D-Secure's detailed logging for compliance and forensic analysis
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
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
 Audit Log Categories
 </h2>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-emerald-600">System Events</h3>
 <ul className="space-y-2 text-slate-700">
 <li>• User authentication events</li>
 <li>• System startup/shutdown</li>
 <li>• Configuration changes</li>
 <li>• Error conditions</li>
 </ul>
 </div>
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-teal-600">Erasure Operations</h3>
 <ul className="space-y-2 text-slate-700">
 <li>• Operation initiation</li>
 <li>• Progress milestones</li>
 <li>• Completion status</li>
 <li>• Verification results</li>
 </ul>
 </div>
 </div>
 </div>
 </Reveal>

 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
 Log Retention & Storage
 </h2>
 <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-6">
 <div className="grid md:grid-cols-3 gap-6 text-center">
 <div>
 <div className="text-3xl font-bold text-emerald-600 mb-2">7 Years</div>
 <p className="text-sm text-slate-700">Default Retention</p>
 </div>
 <div>
 <div className="text-3xl font-bold text-teal-600 mb-2">256-bit</div>
 <p className="text-sm text-slate-700">AES Encryption</p>
 </div>
 <div>
 <div className="text-3xl font-bold text-cyan-600 mb-2">99.9%</div>
 <p className="text-sm text-slate-700">Availability SLA</p>
 </div>
 </div>
 </div>
 </div>
 </Reveal>

 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
 Compliance Reporting
 </h2>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-emerald-50 rounded-lg p-6">
 <h3 className="text-lg font-semibold text-emerald-600 mb-4">Automated Reports</h3>
 <ul className="space-y-2 text-slate-700 text-sm">
 <li>• Daily activity summaries</li>
 <li>• Weekly compliance reports</li>
 <li>• Monthly audit packages</li>
 <li>• Annual compliance reviews</li>
 </ul>
 </div>
 <div className="bg-teal-50 rounded-lg p-6">
 <h3 className="text-lg font-semibold text-teal-600 mb-4">Custom Queries</h3>
 <ul className="space-y-2 text-slate-700 text-sm">
 <li>• Date range filtering</li>
 <li>• User activity tracking</li>
 <li>• Device-specific logs</li>
 <li>• Error pattern analysis</li>
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

export default AuditTrailsPage;