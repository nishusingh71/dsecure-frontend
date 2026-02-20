import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, ClipboardIcon, GlobeIcon, StarIcon, ArrowRightIcon, HoverIcon } from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const OverwriteGuideBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={getSEOForPage('blog-overwrite-guide')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full mb-4">
                    Technical Guide
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Data Overwrite Methods Guide</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Understanding different overwrite patterns and their effectiveness for secure data erasure. From single-pass to DoD standards.
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
                    <h2 className="text-2xl font-bold text-slate-900">1. What is Data Overwriting?</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        Data overwriting is the process of replacing existing data on a storage device with new patterns of data, making the original data unrecoverable. This is one of the most common software-based data sanitization methods.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        When you delete a file normally, only the reference to that file is removed—the actual data remains on the disk until it's overwritten by new data. Secure overwriting intentionally writes new data patterns to every sector, ensuring the original data cannot be recovered.
                    </p>
                    <div className="p-6 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg my-4">
                        <strong className="text-purple-800 block mb-2">Key Principle</strong>
                        <p className="text-sm text-purple-700">
                            Modern NIST 800-88 guidelines state that <strong>a single overwrite pass is sufficient</strong> for most modern hard drives. The myth of needing 35 passes (Gutmann method) originated from older magnetic storage technology and is no longer applicable.
                        </p>
                    </div>
                </div>

                {/* Overwrite Patterns */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">2. Common Overwrite Patterns</h2>
                    <p className="text-slate-700 leading-relaxed">
                        Different standards specify different overwrite patterns. Here are the most commonly used methods:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                            <h4 className="font-bold text-indigo-900 mb-2">Zero Fill (1 Pass)</h4>
                            <ul className="text-sm text-indigo-800 space-y-1">
                                <li>• Writes zeros to all sectors</li>
                                <li>• Fastest method</li>
                                <li>• NIST 800-88 Clear level</li>
                                <li>• Suitable for low-sensitivity data</li>
                            </ul>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                            <h4 className="font-bold text-indigo-900 mb-2">Random Data (1-3 Passes)</h4>
                            <ul className="text-sm text-indigo-800 space-y-1">
                                <li>• Writes cryptographically random data</li>
                                <li>• More secure than zeros</li>
                                <li>• NIST 800-88 Purge level</li>
                                <li>• Recommended for most use cases</li>
                            </ul>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                            <h4 className="font-bold text-indigo-900 mb-2">DoD 5220.22-M (3 Passes)</h4>
                            <ul className="text-sm text-indigo-800 space-y-1">
                                <li>• Pass 1: Zeros</li>
                                <li>• Pass 2: Ones</li>
                                <li>• Pass 3: Random data</li>
                                <li>• Legacy government standard</li>
                            </ul>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                            <h4 className="font-bold text-indigo-900 mb-2">DoD 5220.22-M ECE (7 Passes)</h4>
                            <ul className="text-sm text-indigo-800 space-y-1">
                                <li>• Extended 7-pass version</li>
                                <li>• Alternating patterns</li>
                                <li>• Maximum security for HDDs</li>
                                <li>• Significantly longer time</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* When to Use */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">3. Choosing the Right Method</h2>
                    <p className="text-slate-700 leading-relaxed">
                        The appropriate overwrite method depends on the sensitivity of your data and regulatory requirements:
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-100">
                                    <th className="border border-slate-300 p-3 text-left font-bold">Data Sensitivity</th>
                                    <th className="border border-slate-300 p-3 text-left font-bold">Recommended Method</th>
                                    <th className="border border-slate-300 p-3 text-left font-bold">Compliance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-slate-300 p-3">Low (General office data)</td>
                                    <td className="border border-slate-300 p-3">1-pass Zero Fill</td>
                                    <td className="border border-slate-300 p-3">Internal reuse</td>
                                </tr>
                                <tr className="bg-slate-50">
                                    <td className="border border-slate-300 p-3">Medium (Customer data)</td>
                                    <td className="border border-slate-300 p-3">1-pass Random</td>
                                    <td className="border border-slate-300 p-3">GDPR, CCPA</td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-300 p-3">High (Financial/Health)</td>
                                    <td className="border border-slate-300 p-3">3-pass DoD or Random</td>
                                    <td className="border border-slate-300 p-3">HIPAA, PCI-DSS</td>
                                </tr>
                                <tr className="bg-slate-50">
                                    <td className="border border-slate-300 p-3">Maximum (Classified)</td>
                                    <td className="border border-slate-300 p-3">7-pass or Destruction</td>
                                    <td className="border border-slate-300 p-3">Government, Military</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Verification */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">4. Verification After Overwrite</h2>
                    <p className="text-slate-700 leading-relaxed">
                        Overwriting is only effective if verified. Professional data erasure tools include verification processes:
                    </p>
                    <ul className="space-y-3 text-slate-700">
                        <li className="flex gap-3 items-start">
                            <span className="text-purple-500 font-bold text-xl">✓</span>
                            <span><strong>Read-back Verification:</strong> Reads sectors after writing to confirm the overwrite pattern was applied.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="text-purple-500 font-bold text-xl">✓</span>
                            <span><strong>Sampling Verification:</strong> Randomly samples a percentage of sectors to verify erasure.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-purple-500 font-bold text-xl">✓</span>
                             <span><strong>Certificate Generation:</strong> Creates tamper-proof documentation of the erasure process.</span>
                        </li>
                    </ul>
                </div>

             </div>
        </Reveal>

        {/* D-Secure Solutions Section */}
        <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">D-Secure Overwrite Capabilities</h2>
                
                <p className="text-slate-700 leading-relaxed mb-6">
                    D-Secure supports all major overwrite standards with automatic verification and certificate generation for compliance documentation.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                        <div className="flex items-center gap-2 mb-3">
                            <ClipboardIcon className="w-5 h-5 text-purple-600" filled={true} />
                            <h4 className="font-bold text-slate-900">20+ Overwrite Algorithms</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            From simple zero-fill to 35-pass Gutmann, D-Secure includes all major standards including NIST, DoD, HMG, VSITR, and custom patterns.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldIcon className="w-5 h-5 text-purple-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Automatic Verification</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Built-in read-back verification with configurable sampling rates ensures every overwrite operation is confirmed successful.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                        <div className="flex items-center gap-2 mb-3">
                            <GlobeIcon className="w-5 h-5 text-purple-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Compliance Reporting</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Generate audit-ready certificates with drive serial numbers, timestamps, algorithm used, and verification results.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                        <div className="flex items-center gap-2 mb-3">
                            <StarIcon className="w-5 h-5 text-purple-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Batch Processing</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Process multiple drives simultaneously with parallel erasure capabilities, ideal for enterprise and ITAD environments.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 text-white">
                    <h4 className="font-bold mb-4 text-purple-400">Supported Standards</h4>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>NIST 800-88</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>DoD 5220.22-M</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>HMG Infosec S5</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>VSITR</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Gutmann (35-pass)</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Schneier (7-pass)</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>RCMP TSSIT OPS-II</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Custom Patterns</span>
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* Final Thoughts */}
        <Reveal>
             <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-xl shadow-lg p-8 mt-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Final Thoughts</h2>
                <p className="leading-relaxed mb-6">
                    Choosing the right overwrite method is crucial for balancing security requirements with operational efficiency. Modern NIST guidelines simplify this decision—for most cases, a single random pass with verification is sufficient. The key is using certified software that provides proper verification and documentation.
                </p>
                <Link
                    to="/#products"
                    className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                    <HoverIcon>
                        {(filled) => <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Explore Erasure Solutions
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
          <EngagementSection blogId="overwrite-guide" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="overwrite-guide" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="overwrite-guide" 
            blogTitle="Data Overwrite Methods Guide" 
          />
        </Reveal>
      </section>

       {/* CTA Section */}
       <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
            <Reveal>
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Start Secure Data Erasure Today
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Get access to certified overwrite tools that meet all major international standards.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all text-lg"
                        >
                            Request a Demo
                        </Link>
                         <Link
                            to="/resources"
                            className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
                        >
                            Download Overwrite Guide
                        </Link>
                    </div>
                </div>
            </Reveal>
        </section>
    </div>
  );
};

export default OverwriteGuideBlog;
