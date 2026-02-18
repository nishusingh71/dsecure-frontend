import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const ResellerProfitsBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getBlogSEO({
        title: "Maximizing Reseller Profits with Erasure",
        excerpt: "How certified data erasure increases IT equipment resale value.",
        slug: "reseller-profits",
        author: "Nitesh Kushwaha",
        publishDate: "November 21, 2025",
        keywords: "reseller, profits, certified erasure",
        category: "Strategy",
        tag: "Business"
      })} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            ITAD Business
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            How Resellers Can Maximize Profits with Data Erasure
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Learn how IT asset resellers can increase profit margins by offering certified data erasure services to their clients.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">The Revenue Opportunity</h2>
                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            IT asset resellers often focus solely on hardware sales, missing significant revenue opportunities in data erasure services. Certified data erasure adds value to refurbished devices and builds trust with enterprise buyers concerned about data security.
                        </p>
                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            By incorporating D-Secure data erasure into your workflow, you can command premium prices for certified-erased devices while providing clients with compliance documentation they need for audits.
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">Benefits for Resellers</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3"> Higher Margins</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Add 10-20% to device resale value with certified data erasure.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3"> Compliance Ready</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Provide tamper-proof certificates meeting NIST and IEEE standards.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3"> Customer Trust</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Build long-term relationships with enterprise customers seeking secure disposal.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3"> Recurring Revenue</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Create ongoing service agreements for data erasure needs.
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
                            Partner with D-Secure
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Join our reseller program and add certified data erasure to your service offerings today.
                        </p>
                        <Link to="/contact" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg">
                            Become a Partner
                        </Link>
                    </div>
                </Reveal>
            </section>

      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="reseller-profits" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="reseller-profits" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="reseller-profits" 
            blogTitle="Reseller Profits" 
          />
        </Reveal>
      </section>

    </div>
  );

};

export default React.memo(ResellerProfitsBlog);






