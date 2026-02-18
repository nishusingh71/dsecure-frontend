import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, GlobeIcon, StarIcon, ArrowRightIcon, HoverIcon, ClipboardIcon } from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const SECComplianceBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={getSEOForPage('blog-sec-compliance')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                    Financial Compliance
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">SEC Compliance & Data Disposal</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Meeting SEC Regulation S-P requirements for secure disposal of customer information in broker-dealer and investment advisory firms.
                </p>
            </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <Reveal>
             <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 space-y-8">
                
                {/* Introduction */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Understanding SEC Regulation S-P</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        The Securities and Exchange Commission's Regulation S-P (Privacy of Consumer Financial Information) requires financial institutions to implement safeguards to protect customer information—including during disposal.
                    </p>
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                        <strong className="text-emerald-800 block mb-2">📋 Regulation S-P: Safeguards Rule</strong>
                        <p className="text-sm text-emerald-700">
                            Section 248.30(b) requires firms to "properly dispose of consumer information" by implementing policies and procedures to protect against unauthorized access to or use of customer information in connection with its disposal.
                        </p>
                    </div>
                </div>

                {/* Who Must Comply */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Who Must Comply?</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg">
                            <h4 className="font-bold text-blue-900 mb-3">Covered Entities</h4>
                            <ul className="text-sm text-blue-800 space-y-2">
                                <li>✓ Broker-dealers</li>
                                <li>✓ Investment companies</li>
                                <li>✓ Investment advisers (SEC-registered)</li>
                                <li>✓ Transfer agents</li>
                            </ul>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-lg">
                            <h4 className="font-bold text-indigo-900 mb-3">Protected Information</h4>
                            <ul className="text-sm text-indigo-800 space-y-2">
                                <li>✓ Social Security numbers</li>
                                <li>✓ Account numbers</li>
                                <li>✓ Transaction histories</li>
                                <li>✓ Any personally identifiable financial information</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Disposal Requirements */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">SEC Data Disposal Requirements</h2>
                    <p className="text-slate-700 leading-relaxed">
                        The SEC's Disposal Rule works in conjunction with Regulation S-P to mandate specific data destruction practices:
                    </p>
                    <div className="space-y-3">
                        <div className="bg-white border-l-4 border-emerald-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-emerald-900 mb-1">1. Written Policies & Procedures</h4>
                            <p className="text-sm text-slate-700">Documented disposal procedures that address the proper disposal of consumer information.</p>
                        </div>
                        <div className="bg-white border-l-4 border-emerald-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-emerald-900 mb-1">2. Appropriate Disposal Methods</h4>
                            <p className="text-sm text-slate-700">Use methods that render information unreadable or undecipherable (shredding, burning, pulverizing for paper; wiping, degaussing, or destruction for electronic media).</p>
                        </div>
                        <div className="bg-white border-l-4 border-emerald-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-emerald-900 mb-1">3. Third-Party Vendor Oversight</h4>
                            <p className="text-sm text-slate-700">Exercise due diligence in selecting service providers and require contractual commitments to proper disposal.</p>
                        </div>
                        <div className="bg-white border-l-4 border-emerald-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-emerald-900 mb-1">4. Employee Training</h4>
                            <p className="text-sm text-slate-700">Train staff on disposal procedures and the importance of protecting customer information.</p>
                        </div>
                        <div className="bg-white border-l-4 border-emerald-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-emerald-900 mb-1">5. Periodic Review</h4>
                            <p className="text-sm text-slate-700">Regularly review and update disposal policies to address evolving threats and technologies.</p>
                        </div>
                    </div>
                </div>

                {/* Electronic Media Disposal */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Electronic Media Disposal Standards</h2>
                    <p className="text-slate-700 leading-relaxed">
                        For electronic storage media containing customer information, the SEC expects firms to use industry-recognized data sanitization standards:
                    </p>
                    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl font-mono text-sm leading-relaxed">
                        <p className="text-emerald-400 font-bold mb-3">// Acceptable Disposal Methods</p>
                        <p className="mb-2">✓ DoD 5220.22-M (3 or 7-pass overwrite)</p>
                        <p className="mb-2">✓ NIST 800-88 compliant sanitization</p>
                        <p className="mb-2">✓ Cryptographic erasure (SEDs)</p>
                        <p className="mb-3">✓ Physical destruction (shredding, degaussing)</p>
                        <p className="text-red-400">✗ Standard delete or format (INSUFFICIENT)</p>
                    </div>
                </div>

                {/* Vendor Management */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Third-Party Vendor Due Diligence</h2>
                    <p className="text-slate-700 leading-relaxed">
                        If using ITAD vendors or disposal services, SEC requires firms to:
                    </p>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                        <h4 className="font-bold text-amber-900 mb-4">Vendor Evaluation Checklist</h4>
                        <div className="space-y-2 text-sm text-slate-700">
                            <div className="flex items-start gap-2">
                                <CheckIcon className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" filled={true} />
                                <span>Verify vendor's data destruction certifications (R2, e-Stewards, NAID AAA)</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckIcon className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" filled={true} />
                                <span>Require contractual commitments to SEC-compliant disposal methods</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckIcon className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" filled={true} />
                                <span>Obtain certificates of destruction with device-level detail</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckIcon className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" filled={true} />
                                <span>Conduct periodic audits of vendor facilities and processes</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckIcon className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" filled={true} />
                                <span>Verify vendor has adequate insurance and indemnification clauses</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Examination Preparedness */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">SEC Examination Preparedness</h2>
                    <p className="text-slate-700 leading-relaxed">
                        During examinations, the SEC will look for evidence of compliance with disposal requirements. Be prepared to demonstrate:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                            <h4 className="font-bold text-purple-900 mb-2">📄 Documentation</h4>
                            <ul className="text-sm text-purple-800 space-y-1">
                                <li>• Written disposal policies</li>
                                <li>• Vendor contracts and SOC reports</li>
                                <li>• Certificates of destruction</li>
                                <li>• Training records</li>
                            </ul>
                        </div>
                        <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg">
                            <h4 className="font-bold text-pink-900 mb-2">🔍 Evidence of Implementation</h4>
                            <ul className="text-sm text-pink-800 space-y-1">
                                <li>• Audit trails of disposal events</li>
                                <li>• Annual policy reviews</li>
                                <li>• Regular vendor assessments</li>
                                <li>• Incident response procedures</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Penalties */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Penalties for Non-Compliance</h2>
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                        <strong className="text-red-800 block mb-2">⚠️ Consequences of Violations</strong>
                        <ul className="text-sm text-red-700 space-y-2">
                            <li>• Civil monetary penalties up to $92,000 per violation</li>
                            <li>• Censure or suspension of firm operations</li>
                            <li>• Reputational damage and loss of client trust</li>
                            <li>• Potential individual liability for executives</li>
                            <li>• Class action lawsuits from affected customers</li>
                        </ul>
                    </div>
                </div>

             </div>
        </Reveal>

        {/* D-Secure SEC Solution */}
        <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">D-Secure SEC Compliance Package</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                    D-Secure provides turnkey SEC Regulation S-P compliance with automated documentation, audit trails, and examination-ready reporting.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100">
                        <ClipboardIcon className="w-6 h-6 text-emerald-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Automated Certificates</h4>
                        <p className="text-xs text-slate-600">Device-level destruction verification for SEC exams</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100">
                        <ShieldIcon className="w-6 h-6 text-emerald-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Compliant Methods</h4>
                        <p className="text-xs text-slate-600">DoD 5220.22-M and NIST 800-88 as standard</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100">
                        <GlobeIcon className="w-6 h-6 text-emerald-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Cloud Audit Trail</h4>
                        <p className="text-xs text-slate-600">Immutable records for regulatory review</p>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
             <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-8 mt-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Ensure SEC Compliance</h2>
                <p className="leading-relaxed mb-6">
                    Get expert guidance on meeting SEC Regulation S-P requirements and preparing for examinations.
                </p>
                <Link
                    to="/contact"
                    className="inline-flex items-center bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                    <HoverIcon>
                        {(filled) => <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Schedule Compliance Review
                    <HoverIcon>
                        {(filled) => <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />}
                    </HoverIcon>
                </Link>
            </div>
        </Reveal>
      </section>

      {/* Engagement Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="sec-compliance" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="sec-compliance" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="sec-compliance" 
            blogTitle="SEC Compliance & Data Disposal" 
          />
        </Reveal>
      </section>
    </div>
  );
};

export default SECComplianceBlog;
