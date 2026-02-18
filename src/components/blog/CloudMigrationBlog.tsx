import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const CloudMigrationBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getBlogSEO({
        title: "Data Erasure During Cloud Migration",
        excerpt: "Best practices for secure data erasure when migrating to cloud infrastructure.",
        slug: "cloud-migration",
        author: "Nitish",
        publishDate: "October 6, 2026",
        keywords: "cloud migration, data erasure, on-premise decommission",
        category: "Technical Guide",
        tag: "Cloud"
      })} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Cloud Security
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            Data Erasure During Cloud Migration
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Essential data security practices when migrating from on-premise infrastructure to cloud environments.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">The Cloud Migration Challenge</h2>
                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            When organizations migrate to the cloud, they often overlook the security of legacy on-premise storage devices. These devices may contain years of sensitive data that must be properly sanitized before disposal or redeployment.
                        </p>
                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            D-Secure provides comprehensive solutions for securely erasing data from decommissioned servers, storage arrays, and workstations during cloud migration projects.
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">Cloud Migration Security Steps</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">1. Inventory Analysis</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Identify all on-premise devices containing sensitive data before migration.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">2. Data Classification</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Categorize data by sensitivity to determine appropriate erasure methods.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">3. Certified Erasure</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Apply D-Secure erasure with NIST/IEEE compliant methods.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">4. Documentation</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Generate certificates for audit trails and compliance verification.
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
                            Secure Your Cloud Migration
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Don't leave sensitive data behind. Ensure complete data erasure during your cloud migration with D-Secure.
                        </p>
                        <Link to="/contact" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg">
                            Get Expert Guidance
                        </Link>
                    </div>
                </Reveal>
            </section>

      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="cloud-migration" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="cloud-migration" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="cloud-migration" 
            blogTitle="Cloud Migration" 
          />
        </Reveal>
      </section>

    </div>
  );

};

export default React.memo(CloudMigrationBlog);






