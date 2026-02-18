import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const CommonCriteriaBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
            <SEOHead seo={getBlogSEO({
        title: "Common Criteria Certification Explained",
        excerpt: "Understanding Common Criteria certification and why it matters for data erasure software.",
        slug: "common-criteria",
        author: "Nitesh Kushwaha",
        publishDate: "February 10, 2025",
        keywords: "Common Criteria, EAL certification, security standards",
        category: "Compliance",
        tag: "Certification"
      })} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Certification & Compliance
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                            Common Criteria Certified Data Wiping Software
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            D-Secure Drive Eraser is Common Criteria certified for Evaluation Assurance Level 2 (EAL2), solidifying its status as a trusted and certified data erasure solution.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">What is Common Criteria Certification?</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-6">
                            Common Criteria Certified software undergoes rigorous testing and verification by a competent Common Criteria Test Laboratory (CCTL). These test laboratories are spread globally across Certificate Authorizing Member countries that are part of the Common Criteria Recognition Arrangement (CCRA).
                        </p>
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                            <h4 className="font-bold text-slate-900 text-xl mb-3">About CCRA</h4>
                            <p className="text-lg text-slate-700 leading-loose">
                                The <strong>Common Criteria Recognition Arrangement (CCRA)</strong> is a multiparty international agreement to mutually recognize and accept the evaluation of IT products based on the Common Criteria Certification methodology. There are 18 member countries including Australia, Canada, France, Germany, India, Japan, Netherlands, and more.
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Certification Authorities Worldwide</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                                <h4 className="font-bold text-emerald-700 text-xl mb-3">India - IC3S</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    The Indian CC Certification Scheme (IC3S) operates within the Standardization Testing and Quality Certification Directorate (STQC), part of the Ministry of Electronics & Information Technology under the Government of India.
                                </p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                                <h4 className="font-bold text-emerald-700 text-xl mb-3">Netherlands - TrustCB</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    TrustCB B.V., accredited by the Dutch Accreditation Council, certifies IT security products, processes, and services according to international and industry standards.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">D-Secure Drive Eraser Evaluation Process</h2>
                        <p className="text-lg leading-loose mb-8">
                            D-Secure Drive Eraser underwent exhaustive testing for Common Criteria certification with the following evaluation methodology:
                        </p>

                        <div className="space-y-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3">Evaluation Framework</h3>
                                <ul className="space-y-2 text-white/90">
                                    <li>• Software evaluated based on Common Criteria Standard Version 3.1 Revision 5</li>
                                    <li>• Testing performed at accredited Common Criteria Test Laboratory (CCTL)</li>
                                    <li>• Compliance with EAL2 (Evaluation Assurance Level 2) requirements</li>
                                </ul>
                            </div>

                            <div className="bg-white/10 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3">Testing Components for EAL2 Compliance</h3>
                                <div className="grid md:grid-cols-3 gap-4 mt-4">
                                    <div className="bg-white/10 rounded-lg p-4 text-center">
                                        <h5 className="font-bold mb-2">Developer Testing</h5>
                                        <p className="text-sm text-white/80">Comprehensive test coverage analysis</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-4 text-center">
                                        <h5 className="font-bold mb-2">Independent Testing</h5>
                                        <p className="text-sm text-white/80">Evaluation team verification</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-4 text-center">
                                        <h5 className="font-bold mb-2">Penetration Testing</h5>
                                        <p className="text-sm text-white/80">Security vulnerability assessment</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Evaluation Results & Findings</h2>

                        <div className="space-y-6">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h4 className="font-bold text-emerald-700 text-xl mb-2">Developer Testing Results</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Evaluators analyzed the developer's test coverage and found them complete and satisfactory. The correspondence between tests identified in developer documentation and the functional specification was complete.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h4 className="font-bold text-emerald-700 text-xl mb-2">Independent Testing Results</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    The evaluation team simulated the developer's tests and successfully reproduced them at CCTL. They analyzed code snippets to ascertain erasure algorithm implementations meet requirements of standards. The product was found to comply with the Security Target.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h4 className="font-bold text-emerald-700 text-xl mb-2">Vulnerability & Penetration Testing</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    No vulnerabilities were found in the public domain. The application has no external interfaces with IP addresses or network-level access, and no vulnerabilities have ever been reported. Testing revealed the software contains no exploitable vulnerability for 'Basic Attack Potential.'
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Official Validator Comments</h2>
                        <blockquote className="text-lg text-slate-700 leading-loose italic border-l-4 border-emerald-600 pl-6 py-4 bg-white rounded-r-lg">
                            "The results of the evaluation of product and process documentation, testing, and vulnerability assessment confirm that D-Secure Drive Eraser satisfies all the security functional requirements and assurance requirements as defined. Hence, the TOE (Target of Evaluation) is recommended for EAL2 Certification."
                        </blockquote>
                        <p className="text-lg text-slate-700 leading-loose mt-6">
                            Following this comprehensive evaluation, D-Secure Drive Eraser received the prestigious <strong>Common Criteria EAL2 Certification</strong>, establishing it as a trusted, tested, and certified data erasure solution.
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">What EAL2 Certification Means for You</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                                <h4 className="font-bold text-emerald-700 text-xl mb-3">For Enterprises</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Confidence that your data erasure solution has been independently verified by international authorities. Meets stringent security requirements for government and regulated industries.
                                </p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                                <h4 className="font-bold text-emerald-700 text-xl mb-3">For ITAD Providers</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Offer your clients proven, certified data destruction services. Differentiate your business with internationally recognized credentials.
                                </p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                                <h4 className="font-bold text-emerald-700 text-xl mb-3">For Compliance Officers</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Demonstrate due diligence with certified tools. Simplify audit processes with independent third-party validation.
                                </p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                                <h4 className="font-bold text-emerald-700 text-xl mb-3">For EaaS Providers</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    If you're offering Erasure as a Service (EaaS), use certified drive-wiping software that meets the highest international standards.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Trusted. Tested. Certified.
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Choose D-Secure Drive Eraser for Common Criteria EAL2 certified data erasure. Proven security, international recognition, and complete compliance assurance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg">
                                Request Free Demo
                            </Link>
                            <Link to="/products" className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg">
                                View Certifications
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>

      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="common-criteria" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="common-criteria" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="common-criteria" 
            blogTitle="Common Criteria" 
          />
        </Reveal>
      </section>

    </div>
  );

};

export default React.memo(CommonCriteriaBlog);
