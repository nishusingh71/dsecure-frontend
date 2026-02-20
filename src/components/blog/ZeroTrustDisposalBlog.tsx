import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, GlobeIcon, StarIcon, ArrowRightIcon, HoverIcon, LockIcon, UsersIcon } from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const ZeroTrustDisposalBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={getSEOForPage('blog-zero-trust-disposal')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-rose-700 bg-rose-100 rounded-full mb-4">
                    Security Framework
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">Zero Trust Data Disposal</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Applying Zero Trust principles to IT asset disposition: Never trust, always verify—even during data destruction.
                </p>
            </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <Reveal>
             <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 space-y-8">
                
                {/* Intro */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">1. What is Zero Trust?</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        Zero Trust is a security framework that assumes no user, device, or process should be trusted by default—even if they're inside the network perimeter. Every access request must be verified.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        When applied to data disposal, Zero Trust means verifying every step of the erasure process, never assuming data is destroyed simply because a process was initiated.
                    </p>
                    <div className="p-6 bg-rose-50 border-l-4 border-rose-500 rounded-r-lg my-4">
                        <strong className="text-rose-800 block mb-2">Core Principle</strong>
                        <p className="text-sm text-rose-700">
                            <strong>"Never trust, always verify."</strong> In data disposal, this means: verify erasure success, verify operator authorization, verify chain of custody, and verify documentation integrity.
                        </p>
                    </div>
                </div>

                {/* Zero Trust Pillars */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">2. Zero Trust Pillars for Data Disposal</h2>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-rose-50 border border-rose-200 p-4 rounded-lg">
                            <h4 className="font-bold text-rose-900 mb-2">🔐 Identity</h4>
                            <ul className="text-sm text-rose-800 space-y-1">
                                <li>• Verify operator authorization</li>
                                <li>• Multi-factor authentication</li>
                                <li>• Role-based access controls</li>
                                <li>• Audit trail of actions</li>
                            </ul>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                            <h4 className="font-bold text-orange-900 mb-2">📱 Device</h4>
                            <ul className="text-sm text-orange-800 space-y-1">
                                <li>• Identify device type precisely</li>
                                <li>• Verify serial number accuracy</li>
                                <li>• Confirm ownership/custody</li>
                                <li>• Check for hidden storage</li>
                            </ul>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                            <h4 className="font-bold text-amber-900 mb-2">✅ Verification</h4>
                            <ul className="text-sm text-amber-800 space-y-1">
                                <li>• Post-erasure read verification</li>
                                <li>• Sampling-based confirmation</li>
                                <li>• Independent forensic checks</li>
                                <li>• Certificate authenticity</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Trust But Verify */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">3. Why "Trust" Fails in Data Disposal</h2>
                    <p className="text-slate-700 leading-relaxed">
                        Organizations often trust that data is destroyed based on assertions rather than verification. This creates security gaps:
                    </p>
                     <div className="bg-slate-900 border-b border-slate-800 text-slate-100 p-6 rounded-xl font-mono text-sm leading-relaxed">
                        <p className="text-rose-400 font-bold mb-2">// Common Trust Failures</p>
                        <p className="mb-2">❌ "IT said they formatted the drives"</p>
                        <p className="mb-2">❌ "The vendor gave us a certificate"</p>
                        <p className="mb-2">❌ "We've always used this process"</p>
                        <p>❌ "The software said it completed"</p>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                        Without independent verification, these statements provide false assurance. Zero Trust demands evidence at every step.
                    </p>
                </div>

                 {/* Implementation */}
                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">4. Implementing Zero Trust Disposal</h2>
                    <ul className="space-y-3 text-slate-700">
                        <li className="flex gap-3 items-start">
                            <span className="text-rose-500 font-bold text-xl">1.</span>
                            <span><strong>Verify Identity:</strong> Require MFA for operators. Log every action with user ID, timestamp, and IP.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="text-rose-500 font-bold text-xl">2.</span>
                            <span><strong>Verify Device:</strong> Independently confirm serial numbers. Check for hidden partitions and secondary storage.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-rose-500 font-bold text-xl">3.</span>
                             <span><strong>Verify Process:</strong> Use automated verification that reads sectors post-erasure. Never rely on software reports alone.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-rose-500 font-bold text-xl">4.</span>
                             <span><strong>Verify Documentation:</strong> Use tamper-proof certificates with digital signatures. Validate against central records.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-rose-500 font-bold text-xl">5.</span>
                             <span><strong>Verify Vendors:</strong> Audit ITAD partners regularly. Don't accept certificates at face value.</span>
                        </li>
                    </ul>
                </div>

             </div>
        </Reveal>

        {/* D-Secure Solutions Section */}
        <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">D-Secure Zero Trust Features</h2>
                
                <p className="text-slate-700 leading-relaxed mb-6">
                    D-Secure is built on Zero Trust principles, providing verification at every stage of the data disposal process.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-rose-50 to-red-50 p-6 rounded-xl border border-rose-100">
                        <div className="flex items-center gap-2 mb-3">
                            <LockIcon className="w-5 h-5 text-rose-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Identity Verification</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Multi-factor authentication, role-based access, and complete audit logs ensure only authorized operators can perform erasure.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-red-50 p-6 rounded-xl border border-rose-100">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldIcon className="w-5 h-5 text-rose-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Automated Verification</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Post-erasure verification reads sectors to confirm destruction. Failed verifications trigger alerts and prevent certification.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-red-50 p-6 rounded-xl border border-rose-100">
                        <div className="flex items-center gap-2 mb-3">
                            <GlobeIcon className="w-5 h-5 text-rose-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Tamper-Proof Certificates</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Digitally signed certificates stored in immutable cloud storage. Any modification attempt is detected and blocked.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-red-50 p-6 rounded-xl border border-rose-100">
                        <div className="flex items-center gap-2 mb-3">
                            <UsersIcon className="w-5 h-5 text-rose-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Vendor Oversight</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Real-time visibility into ITAD partner operations. Verify their erasure claims with independent evidence.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 text-white">
                    <h4 className="font-bold mb-4 text-rose-400">Zero Trust Controls in D-Secure</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>MFA required for all erasure operations</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Independent serial number verification</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Post-erasure read-back verification</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Cryptographically signed certificates</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Immutable audit log storage</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Real-time ITAD partner monitoring</span>
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* Final Thoughts */}
        <Reveal>
             <div className="bg-gradient-to-br from-rose-600 via-red-600 to-orange-600 rounded-xl shadow-lg p-8 mt-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Final Thoughts</h2>
                <p className="leading-relaxed mb-6">
                    In a Zero Trust world, assumptions are vulnerabilities. Apply the same rigor to data disposal that you apply to network security. Verify every identity, every device, every process, and every document. Trust is earned through evidence, not assertions.
                </p>
                <Link
                    to="/#products"
                    className="inline-flex items-center bg-white text-rose-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                    <HoverIcon>
                        {(filled) => <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Explore Zero Trust Solutions
                    <HoverIcon>
                        {(filled) => <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />}
                    </HoverIcon>
                </Link>
            </div>
        </Reveal>
      </section>

      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="zero-trust-disposal" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="zero-trust-disposal" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="zero-trust-disposal" 
            blogTitle="Zero Trust Data Disposal" 
          />
        </Reveal>
      </section>

       {/* CTA Section */}
       <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
            <Reveal>
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Implement Zero Trust Disposal
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Get verified, auditable data destruction that meets the highest security standards.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="inline-block bg-gradient-to-r from-rose-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-rose-600 hover:to-red-600 transition-all text-lg"
                        >
                            Request Security Assessment
                        </Link>
                         <Link
                            to="/resources"
                            className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
                        >
                            Download Zero Trust Guide
                        </Link>
                    </div>
                </div>
            </Reveal>
        </section>
    </div>
  );
};

export default ZeroTrustDisposalBlog;
