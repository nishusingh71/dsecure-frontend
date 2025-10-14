import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

const CertificateGenerationPage: React.FC = memo(() => {
 return (
 <>
 <Helmet>
 <title>Certificate Generation | D-Secure Manual</title>
 <meta
 name="description"
 content="D-Secure certificate generation guide for creating tamper-proof certificates of data destruction and compliance documentation."
 />
 </Helmet>

 <div className="min-h-screen bg-slate-50">
 <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <Reveal>
 <div className="text-center">
 <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
 Certificate <span className="text-emerald-600">Generation</span>
 </h1>
 <p className="text-xl text-slate-700 max-w-3xl mx-auto">
 Generate tamper-proof certificates of data destruction with D-Secure's comprehensive documentation system
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
 Certificate Types
 </h2>
 <div className="grid md:grid-cols-3 gap-6">
 <div className="bg-emerald-50 rounded-lg p-6 text-center">
 <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
 <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 </div>
 <h3 className="font-semibold text-slate-900 mb-2">Standard Certificate</h3>
 <p className="text-sm text-slate-700">Basic erasure completion certificate with essential details</p>
 </div>
 <div className="bg-teal-50 rounded-lg p-6 text-center">
 <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
 <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
 </svg>
 </div>
 <h3 className="font-semibold text-slate-900 mb-2">Compliance Certificate</h3>
 <p className="text-sm text-slate-700">Detailed certificate meeting specific regulatory requirements</p>
 </div>
 <div className="bg-cyan-50 rounded-lg p-6 text-center">
 <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
 <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
 </svg>
 </div>
 <h3 className="font-semibold text-slate-900 mb-2">Forensic Certificate</h3>
 <p className="text-sm text-slate-700">Court-admissible certificate with cryptographic verification</p>
 </div>
 </div>
 </div>
 </Reveal>

 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
 Certificate Components
 </h2>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-emerald-600">Essential Information</h3>
 <ul className="space-y-2 text-slate-700">
 <li>• Device identification details</li>
 <li>• Erasure method and parameters</li>
 <li>• Start and completion timestamps</li>
 <li>• Verification results</li>
 <li>• Operator identification</li>
 </ul>
 </div>
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-teal-600">Security Features</h3>
 <ul className="space-y-2 text-slate-700">
 <li>• Digital signatures</li>
 <li>• Tamper-evident seals</li>
 <li>• Cryptographic hashes</li>
 <li>• Blockchain anchoring</li>
 <li>• QR code verification</li>
 </ul>
 </div>
 </div>
 </div>
 </Reveal>

 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
 Certificate Formats
 </h2>
 <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-6">
 <div className="grid md:grid-cols-4 gap-4 text-center">
 <div>
 <div className="text-2xl font-bold text-emerald-600 mb-2">PDF</div>
 <p className="text-sm text-slate-700">Printable Format</p>
 </div>
 <div>
 <div className="text-2xl font-bold text-teal-600 mb-2">XML</div>
 <p className="text-sm text-slate-700">Machine Readable</p>
 </div>
 <div>
 <div className="text-2xl font-bold text-cyan-600 mb-2">JSON</div>
 <p className="text-sm text-slate-700">API Integration</p>
 </div>
 <div>
 <div className="text-2xl font-bold text-slate-600 mb-2">HTML</div>
 <p className="text-sm text-slate-700">Web Display</p>
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

export default CertificateGenerationPage;