import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, ClipboardIcon, GlobeIcon, StarIcon, ArrowRightIcon, HoverIcon } from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const ErasureBestPracticesBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={getSEOForPage('blog-erasure-best-practices')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
                    Best Practices
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Data Erasure Best Practices</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Enterprise-grade strategies for implementing secure, compliant, and efficient data erasure across your organization.
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
                    <h2 className="text-2xl font-bold text-slate-900">1. Establishing a Data Erasure Policy</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        A well-defined data erasure policy is the foundation of secure IT asset disposition. It ensures consistency, compliance, and accountability across all data destruction activities.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        Your policy should define what data requires erasure, which methods to use for different sensitivity levels, who is authorized to perform erasure, and how to document the process.
                    </p>
                    <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg my-4">
                        <strong className="text-blue-800 block mb-2">Policy Essentials</strong>
                        <p className="text-sm text-blue-700">
                            Every erasure policy should align with <strong>NIST 800-88</strong> guidelines and address regulatory requirements specific to your industry (GDPR, HIPAA, PCI-DSS, etc.).
                        </p>
                    </div>
                </div>

                {/* Method Selection */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">2. Choosing the Right Erasure Method</h2>
                    <p className="text-slate-700 leading-relaxed">
                        Different media types and security requirements call for different erasure approaches:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                            <h4 className="font-bold text-indigo-900 mb-2">HDD (Hard Disk Drives)</h4>
                            <ul className="text-sm text-indigo-800 space-y-1">
                                <li>• Software overwrite (1-3 passes)</li>
                                <li>• Degaussing for maximum security</li>
                                <li>• Physical destruction if irreparable</li>
                                <li>• Verification through sampling</li>
                            </ul>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                            <h4 className="font-bold text-indigo-900 mb-2">SSD (Solid State Drives)</h4>
                            <ul className="text-sm text-indigo-800 space-y-1">
                                <li>• ATA Secure Erase command</li>
                                <li>• Cryptographic erasure (SEDs)</li>
                                <li>• NVMe Format for NVMe drives</li>
                                <li>• Physical destruction for failed drives</li>
                            </ul>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                            <h4 className="font-bold text-indigo-900 mb-2">Mobile Devices</h4>
                            <ul className="text-sm text-indigo-800 space-y-1">
                                <li>• Factory reset with verification</li>
                                <li>• MDM-initiated remote wipe</li>
                                <li>• Encryption + key destruction</li>
                                <li>• Third-party mobile erasure tools</li>
                            </ul>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                            <h4 className="font-bold text-indigo-900 mb-2">Servers & Arrays</h4>
                            <ul className="text-sm text-indigo-800 space-y-1">
                                <li>• RAID-aware erasure</li>
                                <li>• Controller-level sanitization</li>
                                <li>• Multiple simultaneous drives</li>
                                <li>• Hot-spare handling</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Process */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">3. Implementing a Secure Erasure Process</h2>
                    <ul className="space-y-3 text-slate-700">
                        <li className="flex gap-3 items-start">
                            <span className="text-blue-500 font-bold text-xl">1.</span>
                            <span><strong>Asset Identification:</strong> Document all assets requiring erasure with serial numbers, model, and location.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="text-blue-500 font-bold text-xl">2.</span>
                            <span><strong>Data Classification:</strong> Determine sensitivity level to select appropriate erasure method.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-blue-500 font-bold text-xl">3.</span>
                             <span><strong>Erasure Execution:</strong> Perform sanitization using certified tools with proper authorization.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-blue-500 font-bold text-xl">4.</span>
                             <span><strong>Verification:</strong> Confirm erasure through read-back or sampling verification.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-blue-500 font-bold text-xl">5.</span>
                             <span><strong>Documentation:</strong> Generate tamper-proof certificates for audit trails.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-blue-500 font-bold text-xl">6.</span>
                             <span><strong>Disposition:</strong> Proceed with reuse, resale, donation, or recycling.</span>
                        </li>
                    </ul>
                </div>

                {/* Common Mistakes */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">4. Common Mistakes to Avoid</h2>
                    <div className="p-6 bg-rose-50 border-l-4 border-rose-500 rounded-r-lg">
                        <ul className="text-sm text-rose-700 space-y-2">
                            <li>❌ Using quick format instead of secure erasure</li>
                            <li>❌ Applying HDD overwrite methods to SSDs</li>
                            <li>❌ Skipping verification steps</li>
                            <li>❌ Not documenting erasure with certificates</li>
                            <li>❌ Overlooking backup drives and cloud storage</li>
                            <li>❌ Using uncertified or outdated tools</li>
                        </ul>
                    </div>
                </div>

             </div>
        </Reveal>

        {/* D-Secure Solutions Section */}
        <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">D-Secure Best Practice Implementation</h2>
                
                <p className="text-slate-700 leading-relaxed mb-6">
                    D-Secure is designed to enforce best practices automatically, reducing human error and ensuring consistent, compliant erasure across your organization.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                            <ClipboardIcon className="w-5 h-5 text-blue-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Policy Enforcement</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Configure organization-wide policies that automatically select the appropriate erasure method based on device type and data sensitivity.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldIcon className="w-5 h-5 text-blue-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Automated Verification</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Built-in verification ensures every erasure is confirmed. Failed erasures are flagged for remediation or destruction.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                            <GlobeIcon className="w-5 h-5 text-blue-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Compliance Templates</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Pre-configured templates for GDPR, HIPAA, PCI-DSS, and other regulations ensure you meet specific compliance requirements.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                            <StarIcon className="w-5 h-5 text-blue-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Audit-Ready Reports</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Generate comprehensive reports with all required documentation for audits, regulatory inspections, and internal reviews.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 text-white">
                    <h4 className="font-bold mb-4 text-blue-400">Best Practices Built Into D-Secure</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Auto-detection of media type for method selection</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Mandatory verification before certificate generation</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Role-based access controls for operators</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Chain of custody documentation</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Immutable certificate storage</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>CMDB/ITSM integration for asset tracking</span>
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* Final Thoughts */}
        <Reveal>
             <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 mt-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Final Thoughts</h2>
                <p className="leading-relaxed mb-6">
                    Implementing data erasure best practices protects your organization from data breaches, regulatory fines, and reputational damage. The key is consistency—using certified tools, following documented procedures, and maintaining complete audit trails.
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                    <HoverIcon>
                        {(filled) => <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Explore D-Secure Solutions
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
          <EngagementSection blogId="erasure-best-practices" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="erasure-best-practices" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="erasure-best-practices" 
            blogTitle="Data Erasure Best Practices" 
          />
        </Reveal>
      </section>

       {/* CTA Section */}
       <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
            <Reveal>
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Implement Best Practices Today
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Get the tools and guidance you need to establish a world-class data erasure program.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all text-lg"
                        >
                            Request a Consultation
                        </Link>
                         <Link
                            to="/resources"
                            className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
                        >
                            Download Best Practices Guide
                        </Link>
                    </div>
                </div>
            </Reveal>
        </section>
    </div>
  );
};

export default React.memo(ErasureBestPracticesBlog);
