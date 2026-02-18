import React, { memo } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";

const ComplianceStandardsPage: React.FC = memo(() => {
    return (
        <>
            <SEOHead seo={getSEOForPage('help-manual')} />

            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <Reveal>
                            <div className="text-center">
                                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                                    Compliance <span className="text-emerald-600">Standards</span>
                                </h1>
                                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                                    Meet regulatory requirements with D-Secure's comprehensive compliance standard support
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="space-y-12">
                            {/* US Standards */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
                                        US Federal Standards
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-emerald-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-emerald-600 mb-4">NIST 800-88 Rev. 1</h3>
                                            <ul className="space-y-2 text-slate-700 text-sm">
                                                <li>• Clear: Logical sanitization</li>
                                                <li>• Purge: Cryptographic erasure</li>
                                                <li>• Destroy: Physical destruction</li>
                                                <li>• Media-specific guidelines</li>
                                            </ul>
                                            <div className="mt-4 p-3 bg-white rounded border">
                                                <p className="text-xs text-slate-600">Recommended for: Federal agencies, contractors</p>
                                            </div>
                                        </div>
                                        <div className="bg-teal-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-teal-600 mb-4">DoD 5220.22-M</h3>
                                            <ul className="space-y-2 text-slate-700 text-sm">
                                                <li>• 3-pass overwrite method</li>
                                                <li>• Character, complement, random</li>
                                                <li>• Verification required</li>
                                                <li>• Regulatory document generation</li>
                                            </ul>
                                            <div className="mt-4 p-3 bg-white rounded border">
                                                <p className="text-xs text-slate-600">Recommended for: Defense contractors, classified data</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* International Standards */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
                                        International Standards
                                    </h2>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="bg-cyan-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-cyan-600 mb-4">ISO/IEC 27040</h3>
                                            <ul className="space-y-2 text-slate-700 text-sm">
                                                <li>• Storage security guidelines</li>
                                                <li>• Risk-based approach</li>
                                                <li>• Lifecycle management</li>
                                            </ul>
                                        </div>
                                        <div className="bg-emerald-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-emerald-600 mb-4">BSI-GS-M.2007-3</h3>
                                            <ul className="space-y-2 text-slate-700 text-sm">
                                                <li>• German federal standard</li>
                                                <li>• Multi-pass overwriting</li>
                                                <li>• Verification protocols</li>
                                            </ul>
                                        </div>
                                        <div className="bg-teal-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-teal-600 mb-4">CPNI HMG IS5</h3>
                                            <ul className="space-y-2 text-slate-700 text-sm">
                                                <li>• UK government standard</li>
                                                <li>• Enhanced secure deletion</li>
                                                <li>• Baseline requirements</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Industry Regulations */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
                                        Industry-Specific Regulations
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold text-emerald-600">Healthcare</h3>
                                                <div className="bg-emerald-50 rounded-lg p-4">
                                                    <h4 className="font-medium text-slate-900 mb-2">HIPAA Requirements</h4>
                                                    <ul className="space-y-1 text-sm text-slate-700">
                                                        <li>• PHI data destruction</li>
                                                        <li>• Business associate compliance</li>
                                                        <li>• Audit trail documentation</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold text-teal-600">Financial Services</h3>
                                                <div className="bg-teal-50 rounded-lg p-4">
                                                    <h4 className="font-medium text-slate-900 mb-2">PCI DSS & SOX</h4>
                                                    <ul className="space-y-1 text-sm text-slate-700">
                                                        <li>• Cardholder data protection</li>
                                                        <li>• Financial record retention</li>
                                                        <li>• Secure disposal requirements</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Compliance Matrix */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">4</span>
                                        D-Secure Compliance Matrix
                                    </h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-slate-200">
                                                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Standard</th>
                                                    <th className="text-center py-3 px-4 font-semibold text-slate-900">Supported</th>
                                                    <th className="text-center py-3 px-4 font-semibold text-slate-900">Regulated</th>
                                                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Notes</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                <tr>
                                                    <td className="py-3 px-4 text-slate-700">NIST 800-88</td>
                                                    <td className="py-3 px-4 text-center">
                                                        <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
                                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-center">
                                                        <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
                                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-600">Full compliance with Rev. 1</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 px-4 text-slate-700">DoD 5220.22-M</td>
                                                    <td className="py-3 px-4 text-center">
                                                        <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
                                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-center">
                                                        <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
                                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-600">Defense contractor approved</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 px-4 text-slate-700">GDPR Article 17</td>
                                                    <td className="py-3 px-4 text-center">
                                                        <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
                                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-center">
                                                        <span className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center mx-auto">
                                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-600">Right to erasure compliance</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Certification Process */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">5</span>
                                        Regulation & Validation
                                    </h2>
                                    <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-6">
                                        <div className="grid md:grid-cols-3 gap-6 text-center">
                                            <div>
                                                <div className="text-3xl font-bold text-emerald-600 mb-2">15+</div>
                                                <p className="text-sm text-slate-700">Compliance Standards</p>
                                            </div>
                                            <div>
                                                <div className="text-3xl font-bold text-teal-600 mb-2">100%</div>
                                                <p className="text-sm text-slate-700">Audit Success Rate</p>
                                            </div>
                                            <div>
                                                <div className="text-3xl font-bold text-cyan-600 mb-2">24/7</div>
                                                <p className="text-sm text-slate-700">Compliance Support</p>
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

export default React.memo(ComplianceStandardsPage);