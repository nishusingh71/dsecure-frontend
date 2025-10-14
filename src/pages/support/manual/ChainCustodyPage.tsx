import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

const ChainCustodyPage: React.FC = memo(() => {
 return (
 <>
 <Helmet>
 <title>Chain of Custody | D-Secure Manual</title>
 <meta
 name="description"
 content="D-Secure chain of custody guide for documenting device handling throughout the erasure process."
 />
 </Helmet>

 <div className="min-h-screen bg-slate-50">
 <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <Reveal>
 <div className="text-center">
 <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
 Chain of <span className="text-emerald-600">Custody</span>
 </h1>
 <p className="text-xl text-slate-700 max-w-3xl mx-auto">
 Document device handling throughout the D-Secure erasure process with comprehensive chain of custody tracking
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
 Custody Documentation
 </h2>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-emerald-600">Required Information</h3>
 <ul className="space-y-2 text-slate-700">
 <li>• Device serial numbers</li>
 <li>• Custodian identification</li>
 <li>• Transfer timestamps</li>
 <li>• Location tracking</li>
 <li>• Handling procedures</li>
 </ul>
 </div>
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-teal-600">Digital Signatures</h3>
 <ul className="space-y-2 text-slate-700">
 <li>• Cryptographic verification</li>
 <li>• Tamper-evident records</li>
 <li>• Multi-party authentication</li>
 <li>• Blockchain anchoring</li>
 <li>• Legal admissibility</li>
 </ul>
 </div>
 </div>
 </div>
 </Reveal>

 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
 Custody Workflow
 </h2>
 <div className="space-y-6">
 <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
 <h3 className="text-lg font-semibold text-slate-900 mb-4">Process Steps</h3>
 <div className="grid md:grid-cols-4 gap-4">
 <div className="text-center">
 <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-2">
 <span className="text-white font-bold">1</span>
 </div>
 <p className="text-sm text-slate-700">Device Receipt</p>
 </div>
 <div className="text-center">
 <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2">
 <span className="text-white font-bold">2</span>
 </div>
 <p className="text-sm text-slate-700">Inventory & Tag</p>
 </div>
 <div className="text-center">
 <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2">
 <span className="text-white font-bold">3</span>
 </div>
 <p className="text-sm text-slate-700">Secure Storage</p>
 </div>
 <div className="text-center">
 <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-2">
 <span className="text-white font-bold">4</span>
 </div>
 <p className="text-sm text-slate-700">Erasure Process</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </Reveal>

 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
 Compliance Benefits
 </h2>
 <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-6">
 <div className="grid md:grid-cols-3 gap-6 text-center">
 <div>
 <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
 <p className="text-sm text-slate-700">Audit Compliance</p>
 </div>
 <div>
 <div className="text-3xl font-bold text-teal-600 mb-2">Legal</div>
 <p className="text-sm text-slate-700">Court Admissible</p>
 </div>
 <div>
 <div className="text-3xl font-bold text-cyan-600 mb-2">24/7</div>
 <p className="text-sm text-slate-700">Tracking Available</p>
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

export default ChainCustodyPage;