import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

const BatchOperationsPage: React.FC = memo(() => {
 return (
 <>
 <Helmet>
 <title>Batch Operations | D-Secure Manual</title>
 <meta
 name="description"
 content="D-Secure batch operations guide for automating erasure across multiple devices simultaneously with enterprise-grade efficiency."
 />
 </Helmet>

 <div className="min-h-screen bg-slate-50">
 {/* Header */}
 <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <Reveal>
 <div className="text-center">
 <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
 Batch <span className="text-emerald-600">Operations</span>
 </h1>
 <p className="text-xl text-slate-700 max-w-3xl mx-auto">
 Automate D-Secure erasure operations across multiple devices simultaneously for maximum efficiency
 </p>
 </div>
 </Reveal>
 </div>
 </section>

 {/* Content */}
 <section className="py-16 lg:py-20">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <div className="space-y-12">
 {/* Batch Setup */}
 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
 Batch Configuration
 </h2>
 <div className="space-y-6">
 <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
 <h3 className="text-lg font-semibold text-slate-900 mb-4">Device Discovery Methods</h3>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-3">
 <h4 className="font-medium text-emerald-600">Network Scanning</h4>
 <ul className="space-y-1 text-sm text-slate-700">
 <li>• IP range discovery</li>
 <li>• Active Directory integration</li>
 <li>• DHCP lease scanning</li>
 <li>• Custom port scanning</li>
 </ul>
 </div>
 <div className="space-y-3">
 <h4 className="font-medium text-teal-600">Manual Import</h4>
 <ul className="space-y-1 text-sm text-slate-700">
 <li>• CSV file import</li>
 <li>• Asset management integration</li>
 <li>• Barcode scanning</li>
 <li>• Manual device entry</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 </div>
 </Reveal>

 {/* Operation Types */}
 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
 Batch Operation Types
 </h2>
 <div className="grid md:grid-cols-3 gap-6">
 <div className="bg-emerald-50 rounded-lg p-6 text-center">
 <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
 <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
 </svg>
 </div>
 <h3 className="font-semibold text-slate-900 mb-2">Sequential</h3>
 <p className="text-sm text-slate-700">Process devices one after another for maximum reliability</p>
 </div>
 <div className="bg-teal-50 rounded-lg p-6 text-center">
 <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
 <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
 </svg>
 </div>
 <h3 className="font-semibold text-slate-900 mb-2">Parallel</h3>
 <p className="text-sm text-slate-700">Process multiple devices simultaneously for speed</p>
 </div>
 <div className="bg-cyan-50 rounded-lg p-6 text-center">
 <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
 </svg>
 </div>
 <h3 className="font-semibold text-slate-900 mb-2">Scheduled</h3>
 <p className="text-sm text-slate-700">Automate operations during off-peak hours</p>
 </div>
 </div>
 </div>
 </Reveal>

 {/* Progress Monitoring */}
 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
 Progress Monitoring
 </h2>
 <div className="space-y-6">
 <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-lg p-6">
 <h3 className="text-lg font-semibold text-slate-900 mb-4">Real-time Dashboard</h3>
 <div className="grid md:grid-cols-4 gap-4">
 <div className="text-center">
 <div className="text-2xl font-bold text-emerald-600 mb-1">156</div>
 <p className="text-xs text-slate-600">Devices Queued</p>
 </div>
 <div className="text-center">
 <div className="text-2xl font-bold text-teal-600 mb-1">42</div>
 <p className="text-xs text-slate-600">In Progress</p>
 </div>
 <div className="text-center">
 <div className="text-2xl font-bold text-cyan-600 mb-1">89</div>
 <p className="text-xs text-slate-600">Completed</p>
 </div>
 <div className="text-center">
 <div className="text-2xl font-bold text-slate-600 mb-1">3</div>
 <p className="text-xs text-slate-600">Failed</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </Reveal>

 {/* Error Handling */}
 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">4</span>
 Error Handling & Recovery
 </h2>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-emerald-600">Automatic Recovery</h3>
 <ul className="space-y-2 text-slate-700">
 <li>• Retry failed operations</li>
 <li>• Skip problematic devices</li>
 <li>• Continue with remaining queue</li>
 <li>• Generate failure reports</li>
 </ul>
 </div>
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-teal-600">Notification System</h3>
 <ul className="space-y-2 text-slate-700">
 <li>• Email alerts for failures</li>
 <li>• SMS notifications</li>
 <li>• Webhook integrations</li>
 <li>• SNMP trap support</li>
 </ul>
 </div>
 </div>
 </div>
 </Reveal>

 {/* Performance Metrics */}
 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">5</span>
 Performance Optimization
 </h2>
 <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-6">
 <div className="grid md:grid-cols-3 gap-6 text-center">
 <div>
 <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
 <p className="text-sm text-slate-700">Concurrent Devices</p>
 </div>
 <div>
 <div className="text-3xl font-bold text-teal-600 mb-2">95%</div>
 <p className="text-sm text-slate-700">Time Reduction</p>
 </div>
 <div>
 <div className="text-3xl font-bold text-cyan-600 mb-2">24/7</div>
 <p className="text-sm text-slate-700">Automated Operations</p>
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

export default BatchOperationsPage;