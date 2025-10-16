import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

const RecoveryProceduresPage: React.FC = memo(() => {
 return (
 <>
 <Helmet>
 <title>Recovery Procedures | D-Secure Manual</title>
 <meta
 name="description"
 content="D-Secure recovery procedures guide for handling failed or interrupted erasure operations."
 />
 </Helmet>

 <div className="min-h-screen bg-slate-50">
 <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <Reveal>
 <div className="text-center">
 <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
 Recovery <span className="text-emerald-600">Procedures</span>
 </h1>
 <p className="text-xl text-slate-700 max-w-3xl mx-auto">
 Handle failed or interrupted D-Secure erasure operations with comprehensive recovery procedures
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
 Failure Detection
 </h2>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-emerald-600">Automatic Detection</h3>
 <ul className="space-y-2 text-slate-700">
 <li>• Real-time monitoring</li>
 <li>• Progress validation</li>
 <li>• Error pattern recognition</li>
 <li>• Health status checks</li>
 </ul>
 </div>
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-teal-600">Alert Systems</h3>
 <ul className="space-y-2 text-slate-700">
 <li>• Immediate notifications</li>
 <li>• Escalation procedures</li>
 <li>• Multi-channel alerts</li>
 <li>• Automated responses</li>
 </ul>
 </div>
 </div>
 </div>
 </Reveal>

 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
 Recovery Options
 </h2>
 <div className="grid md:grid-cols-3 gap-6">
 <div className="bg-emerald-50 rounded-lg p-6 text-center">
 <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
 <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
 </svg>
 </div>
 <h3 className="font-semibold text-slate-900 mb-2">Resume Operation</h3>
 <p className="text-sm text-slate-700">Continue from last checkpoint</p>
 </div>
 <div className="bg-teal-50 rounded-lg p-6 text-center">
 <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
 </svg>
 </div>
 <h3 className="font-semibold text-slate-900 mb-2">Restart Process</h3>
 <p className="text-sm text-slate-700">Begin erasure from start</p>
 </div>
 <div className="bg-cyan-50 rounded-lg p-6 text-center">
 <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
 </svg>
 </div>
 <h3 className="font-semibold text-slate-900 mb-2">Manual Intervention</h3>
 <p className="text-sm text-slate-700">Require operator action</p>
 </div>
 </div>
 </div>
 </Reveal>

 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
 Recovery Success Rate
 </h2>
 <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-6">
 <div className="grid md:grid-cols-3 gap-6 text-center">
 <div>
 <div className="text-3xl font-bold text-emerald-600 mb-2">98%</div>
 <p className="text-sm text-slate-700">Automatic Recovery</p>
 </div>
 <div>
 <div className="text-3xl font-bold text-teal-600 mb-2">15min</div>
 <p className="text-sm text-slate-700">Average Recovery Time</p>
 </div>
 <div>
 <div className="text-3xl font-bold text-cyan-600 mb-2">24/7</div>
 <p className="text-sm text-slate-700">Support Available</p>
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

export default RecoveryProceduresPage;