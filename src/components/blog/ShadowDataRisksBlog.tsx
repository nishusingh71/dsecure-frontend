import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, StarIcon, ArrowRightIcon, HoverIcon, GlobeIcon } from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const ShadowDataRisksBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={getSEOForPage('blog-shadow-data-risks')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-amber-700 bg-amber-100 rounded-full mb-4">
                    Data Governance
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Shadow Data Risks</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Understanding the hidden data lurking in your organization—and why it poses serious security and compliance risks.
                </p>
            </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <Reveal>
             <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 space-y-8">
                
                {/* What is Shadow Data */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">What is Shadow Data?</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        Shadow data is any data that exists within your organization without the knowledge or oversight of IT and security teams. It's the "hidden iceberg" of your data landscape—often vastly larger than what you can see.
                    </p>
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                        <strong className="text-amber-800 block mb-2">⚠️ The Shadow Data Problem</strong>
                        <p className="text-sm text-amber-700">
                            Studies show that organizations are typically aware of only 30-40% of their total data estate. The remaining 60-70% is shadow data—unmanaged, unprotected, and often forgotten.
                        </p>
                    </div>
                </div>

                {/* Types of Shadow Data */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Common Sources of Shadow Data</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-red-50 border border-red-200 p-5 rounded-lg">
                            <h4 className="font-bold text-red-900 mb-3">📱 Endpoint Devices</h4>
                            <ul className="text-sm text-red-800 space-y-1">
                                <li>• Employee personal devices (BYOD)</li>
                                <li>• Forgotten laptops in storage</li>
                                <li>• Old smartphones not wiped</li>
                                <li>• USB drives and external storage</li>
                            </ul>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 p-5 rounded-lg">
                            <h4 className="font-bold text-orange-900 mb-3">☁️ Unauthorized Cloud</h4>
                            <ul className="text-sm text-orange-800 space-y-1">
                                <li>• Personal Dropbox/Google Drive</li>
                                <li>• Unapproved collaboration tools</li>
                                <li>• Legacy cloud accounts</li>
                                <li>• Free trials never cancelled</li>
                            </ul>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg">
                            <h4 className="font-bold text-amber-900 mb-3">🗄️ Backup Copies</h4>
                            <ul className="text-sm text-amber-800 space-y-1">
                                <li>• Old backup tapes in offsite storage</li>
                                <li>• Snapshot copies on file servers</li>
                                <li>• Local backup drives</li>
                                <li>• Archive data never purged</li>
                            </ul>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-lg">
                            <h4 className="font-bold text-yellow-900 mb-3">📧 Email & Messaging</h4>
                            <ul className="text-sm text-yellow-800 space-y-1">
                                <li>• Deleted emails (not purged)</li>
                                <li>• Slack/Teams attachments</li>
                                <li>• Personal email forwards</li>
                                <li>• Archived mailboxes</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Security Risks */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Security & Compliance Risks</h2>
                    <p className="text-slate-700 leading-relaxed">
                        Shadow data creates multiple vectors for data breaches and regulatory violations:
                    </p>
                    
                    <div className="space-y-3">
                        <div className="bg-white border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-red-900 mb-1">🎯 Increased Attack Surface</h4>
                            <p className="text-sm text-slate-700">Every unknown data repository is an unpatched vulnerability. Attackers specifically target shadow data because it lacks security controls.</p>
                        </div>
                        <div className="bg-white border-l-4 border-orange-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-orange-900 mb-1">⚖️ Compliance Violations</h4>
                            <p className="text-sm text-slate-700">You can't comply with GDPR, HIPAA, or PCI-DSS if you don't know where your data is. Shadow data makes compliance impossible.</p>
                        </div>
                        <div className="bg-white border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-amber-900 mb-1">📜 eDiscovery Failures</h4>
                            <p className="text-sm text-slate-700">In legal proceedings, failing to produce shadow data can result in sanctions and adverse judgments ("spoliation of evidence").</p>
                        </div>
                        <div className="bg-white border-l-4 border-yellow-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-yellow-900 mb-1">💰 Storage Waste</h4>
                            <p className="text-sm text-slate-700">Organizations pay to store data they don't know exists—often for years—inflating cloud and backup costs unnecessarily.</p>
                        </div>
                    </div>
                </div>

                {/* Real-World Example */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Real-World Breach Example</h2>
                    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl">
                        <p className="text-amber-400 font-bold mb-3">// Actual Breach Scenario</p>
                        <p className="mb-2"><strong className="text-white">Incident:</strong> Healthcare provider fined $3.2M</p>
                        <p className="mb-2"><strong className="text-white">Cause:</strong> Employee copied patient records to personal laptop</p>
                        <p className="mb-2"><strong className="text-white">Discovery:</strong> Laptop sold on eBay with data intact</p>
                        <p className="mb-3"><strong className="text-white">Issue:</strong> Shadow data — IT didn't know laptop existed</p>
                        <p className="text-green-400">✓ Policy said "no PHI on personal devices"</p>
                        <p className="text-red-400">✗ No enforcement mechanism to detect violations</p>
                    </div>
                </div>

                {/* How Shadow Data Accumulates */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">How Shadow Data Accumulates</h2>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200">
                        <ol className="space-y-3 text-slate-700">
                            <li className="flex gap-3 items-start">
                                <span className="bg-amber-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                                <span><strong>Employee Departures:</strong> Staff leave, but their local data, cloud accounts, and personal devices remain unaccounted for.</span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="bg-amber-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                                <span><strong>Decentralized Purchasing:</strong> Departments buy their own cloud subscriptions without IT approval (shadow IT).</span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="bg-amber-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                                <span><strong>Mergers & Acquisitions:</strong> Inherited systems with unknown data repositories.</span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="bg-amber-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                                <span><strong>Backup Sprawl:</strong> Automated backups create copies that are never inventoried or purged.</span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="bg-amber-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                                <span><strong>BYOD Policies:</strong> Personal devices used for work create data silos outside IT control.</span>
                            </li>
                        </ol>
                    </div>
                </div>

                {/* Mitigation Strategies */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Mitigating Shadow Data Risks</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-200 p-5 rounded-lg">
                            <h4 className="font-bold text-green-900 mb-3">✅ Proactive Controls</h4>
                            <ul className="text-sm text-green-800 space-y-2">
                                <li>• Deploy Data Loss Prevention (DLP) tools</li>
                                <li>• Enforce Device Enrollment Management (MDM)</li>
                                <li>• Regular access reviews and deprovisioning</li>
                                <li>• Cloud Access Security Broker (CASB)</li>
                            </ul>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg">
                            <h4 className="font-bold text-blue-900 mb-3">🔍 Discovery & Remediation</h4>
                            <ul className="text-sm text-blue-800 space-y-2">
                                <li>• Comprehensive data discovery scans</li>
                                <li>• Asset inventory audits (quarterly)</li>
                                <li>• Secure disposal of decommissioned devices</li>
                                <li>• Data minimization policies</li>
                            </ul>
                        </div>
                    </div>
                </div>

             </div>
        </Reveal>

        {/* D-Secure Solution */}
        <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">D-Secure Shadow Data Remediation</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                    D-Secure helps eliminate shadow data by ensuring all decommissioned devices are properly discovered, inventoried, and securely erased before disposal.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
                        <StarIcon className="w-6 h-6 text-amber-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Device Discovery</h4>
                        <p className="text-xs text-slate-600">Identify all storage devices before disposal</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
                        <ShieldIcon className="w-6 h-6 text-amber-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Secure Erasure</h4>
                        <p className="text-xs text-slate-600">Eliminate data at end-of-life</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
                        <CheckIcon className="w-6 h-6 text-amber-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Audit Trail</h4>
                        <p className="text-xs text-slate-600">Prove compliance during audits</p>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
             <div className="bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 rounded-xl shadow-lg p-8 mt-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Eliminate Shadow Data Risk</h2>
                <p className="leading-relaxed mb-6">
                    Don't let unknown data become your next breach. Get visibility and control over your entire data lifecycle.
                </p>
                <Link
                    to="/contact"
                    className="inline-flex items-center bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                    <HoverIcon>
                        {(filled) => <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Request Data Discovery Assessment
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
          <EngagementSection blogId="shadow-data-risks" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="shadow-data-risks" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="shadow-data-risks" 
            blogTitle="Shadow Data Risks" 
          />
        </Reveal>
      </section>
    </div>
  );
};

export default ShadowDataRisksBlog;
