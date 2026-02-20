import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const PHIErasureBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getBlogSEO({
        title: "PHI Erasure Requirements",
        excerpt: "Meeting Protected Health Information erasure requirements under HIPAA.",
        slug: "phi-erasure",
        author: "Nitesh Kushwaha",
        publishDate: "May 25, 2025",
        keywords: "PHI, HIPAA, healthcare, erasure",
        category: "Compliance",
        tag: "Healthcare"
      })} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Healthcare Compliance
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            Secure PHI & ePHI Erasure: Protecting Patient Privacy
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Learn key strategies for securely erasing PHI and ePHI in healthcare to protect patient privacy and comply with legal regulations.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
                        <p className="text-slate-700 leading-loose text-xl">
                            In the healthcare industry, the handling and disposal of <strong className="text-emerald-600">Protected Health Information (PHI)</strong> and <strong className="text-emerald-600">Electronic Protected Health Information (ePHI)</strong> are controlled by various legal statutes. Non-compliance with these laws implies certain financial and reputational losses.
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Regulatory Framework</h2>

                        <div className="space-y-6">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">HIPAA Privacy Rule</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Guides the healthcare industry in the USA and requires PHI to be protected through physical, technical, and administrative measures from creation till the disposal stage.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">HIPAA Security Rule</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    45 CFR 164.310(d)(2)(i) Disposal and (ii) Media Re-use requires all covered entities and business associates to implement procedures for the disposition of ePHI from storage devices and/or removal of ePHI before media is reused.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2 bg-gradient-to-r from-emerald-50 to-teal-50/50">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Penalties for Non-Compliance</h3>
                                <ul className="space-y-2 text-slate-700">
                                    <li className="flex items-start"><span className="w-2 h-2 bg-gradient-to-r from-emerald-50 to-teal-500 rounded-full mr-3 mt-2"></span>Up to <strong>$50,000 fine per violation</strong> for willful violations</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-gradient-to-r from-emerald-50 to-teal-500 rounded-full mr-3 mt-2"></span>Maximum annual penalty of up to <strong>$1.5 million</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">Disposing of PHI and ePHI Securely</h2>
                        <p className="leading-loose text-lg mb-6">
                            Healthcare organizations must implement secure data erasure practices to protect patient privacy and meet compliance requirements.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">HIPAA-Compliant Erasure</h4>
                                <p className="text-white/90 text-sm">Use certified data erasure software that meets HIPAA disposal requirements</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Audit Documentation</h4>
                                <p className="text-white/90 text-sm">Generate tamper-proof certificates for compliance verification</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Multi-Device Support</h4>
                                <p className="text-white/90 text-sm">Erase PHI/ePHI from servers, workstations, mobile devices, and storage media</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Verification</h4>
                                <p className="text-white/90 text-sm">Verify complete erasure to ensure data is irrecoverable</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Conclusion</h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            Secure erasure of PHI and ePHI is not just a best practice — it's a legal requirement. Healthcare organizations must implement certified data erasure solutions to protect patient privacy, avoid costly penalties, and maintain trust in an increasingly regulated environment.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Protect Patient Privacy with D-Secure
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Ensure HIPAA-compliant erasure of PHI and ePHI with certified data sanitization.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg">
                                Request Free Demo
                            </Link>
                            <Link to="/#products" className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg">
                                View Products
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>

      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="p-h-i-erasure" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="p-h-i-erasure" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="p-h-i-erasure" 
            blogTitle="P H I Erasure" 
          />
        </Reveal>
      </section>

    </div>
  );

};

export default PHIErasureBlog;






