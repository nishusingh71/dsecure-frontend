import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const CaptionCallSettlementBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getBlogSEO({
        title: "CaptionCall Settlement Analysis",
        excerpt: "Lessons from the CaptionCall settlement for data privacy compliance.",
        slug: "caption-call-settlement",
        author: "Nitesh Kushwaha",
        publishDate: "July 8, 2025",
        keywords: "CaptionCall, settlement, privacy compliance",
        category: "Compliance",
        tag: "Case Study"
      })} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Data Retention
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            CaptionCall's $34.6M FCC Settlement: The Price of Data Retention
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Learn about the FCC's $34.6M settlement with CaptionCall for excessive data retention, highlighting key consumer privacy issues.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">FCC Findings & Settlement</h2>
                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            The FCC investigation revealed serious violations by CaptionCall:
                        </p>

                        <div className="space-y-6">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2 bg-gradient-to-r from-emerald-50 to-teal-50/50">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Unlawful Data Retention</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    The company unlawfully retained customer call data for <strong>three years</strong>. This was in clear violation of the FCC rule that prohibits retention of call information beyond the duration of the call as per section 225 of the Communications Act of 1934 and section 64.604(a)(2)(i)-(ii) of the TRS Rules.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2 bg-gradient-to-r from-emerald-50 to-teal-50/50">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">False Submissions</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Submitted wrong information to the TRS Fund administrator concerning reimbursement claims related to IP CTS.
                                </p>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 mt-8">
                            <h3 className="font-bold text-slate-900 text-2xl mb-4">Settlement Breakdown: $34.6 Million</h3>
                            <ul className="space-y-2 text-slate-700 text-lg">
                                <li className="flex items-start"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2.5"></span>$12 Million: TRS Fund reimbursement</li>
                                <li className="flex items-start"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2.5"></span>$13.6 Million: Relinquishing claims for IP CTS minutes</li>
                                <li className="flex items-start"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2.5"></span>$5 Million: Civil Penalty</li>
                                <li className="flex items-start"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2.5"></span>$4 Million: Investment in privacy, data protection improvements, and user awareness</li>
                            </ul>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Settlement Requirements</h2>

                        <div className="space-y-6">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">TRS Privacy & Data Protection Program</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    CaptionCall must develop and implement a privacy & data protection program within 120 days, including designating a Data Privacy Officer and developing a data retention schedule that specifies retention period, purpose of data collection, usage, and disclosure.
                                </p>
                                <p className="text-slate-700 text-lg leading-loose mt-3 font-semibold">
                                    The policy shall ensure the <strong className="text-emerald-600">safe removal and disposal of user data by sanitizing or destroying data-bearing electronic media</strong> when required.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Operating Procedures</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Within 120 days, CaptionCall shall engage an independent accessor to ensure internal compliance reporting happens regularly, non-compliance incidents are managed properly, and vendor agreements are updated.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Additional Requirements</h3>
                                <ul className="space-y-2 text-slate-700">
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Develop policies for Incident Response, Vendor Oversight, and risk assessment</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Update marketing agreements and maintain records for 2 years</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Update compliance manual and training program</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>File regular compliance reports</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">What CaptionCall Could Have Done Differently</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Data Minimization</h4>
                                <p className="text-white/90 text-sm">Collect and retain only necessary data for the minimum required duration</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Automated Data Erasure</h4>
                                <p className="text-white/90 text-sm">Implement automated data erasure policies to delete data after retention period</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Regular Audits</h4>
                                <p className="text-white/90 text-sm">Conduct regular compliance audits to identify and address retention violations</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Certified Solutions</h4>
                                <p className="text-white/90 text-sm">Use certified data erasure software to ensure compliant data disposal</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Conclusion</h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            The CaptionCall settlement serves as a stark reminder that excessive data retention can result in massive financial penalties. Organizations must implement proper data retention policies, automated erasure procedures, and certified data sanitization solutions to avoid similar consequences.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Avoid Costly Data Retention Violations
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Implement proper data retention and erasure policies with D-Secure to ensure compliance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg">
                                Request Free Demo
                            </Link>
                            <Link to="/products" className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg">
                                View Products
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>

      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="caption-call-settlement" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="caption-call-settlement" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="caption-call-settlement" 
            blogTitle="Caption Call Settlement" 
          />
        </Reveal>
      </section>

    </div>
  );

};

export default CaptionCallSettlementBlog;






