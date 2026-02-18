import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const ITAssetReuseBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getBlogSEO({
        title: "IT Asset Reuse Best Practices",
        excerpt: "Maximizing value through secure IT asset reuse and refurbishment.",
        slug: "it-asset-reuse",
        author: "Nitish",
        publishDate: "June 1, 2025",
        keywords: "reuse, refurbishment, circular economy",
        category: "Best Practices",
        tag: "Sustainability"
      })} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Sustainability
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            IT Asset Reuse: A Path to Sustainability
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Discover how IT asset reuse reduces costs, conserves resources, and supports environmental sustainability goals.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
                        <p className="text-slate-700 leading-loose text-xl">
                            IT asset reuse is gaining prominence due to ESG practices followed by organizations as they aim to reduce their carbon footprints. Reusing IT assets offers several benefits to organizations, including <strong className="text-emerald-600">cost reduction, conserving resources, reduced environmental impact</strong>, and helping comply with environmental laws.
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Benefits of IT Asset Reuse</h2>

                        <div className="space-y-6">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Cost Reduction</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Reusing IT assets significantly reduces capital expenditure by extending the life of existing equipment. Organizations can save thousands by refurbishing and redeploying devices instead of purchasing new ones.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Conserving Resources</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Manufacturing new IT equipment requires significant natural resources including rare earth metals, water, and energy. Reusing existing assets conserves these valuable resources and reduces the demand for new production.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Reduced Environmental Impact</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Each recycled laptop saves approximately <strong>150 kilograms of CO2</strong>, and each reused PC saves about <strong>250 kilograms</strong>. By reusing IT assets, organizations significantly reduce e-waste and their carbon footprint.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Compliance with Environmental Laws</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Many regions have implemented environmental regulations requiring responsible disposal of electronic waste. IT asset reuse helps organizations comply with these regulations while demonstrating environmental responsibility.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Supporting Circular Economy</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    IT asset reuse is a key component of the circular economy, where products are kept in use for as long as possible, extracting maximum value before recovery and regeneration.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">How D-Secure Enables IT Asset Reuse</h2>
                        <p className="leading-loose text-lg mb-6">
                            Secure data erasure is essential for IT asset reuse. D-Secure provides certified data wiping that enables organizations to safely repurpose, donate, or resell IT equipment.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Certified Erasure</h4>
                                <p className="text-white/90 text-sm">NIST-compliant data erasure ensures devices are safe for reuse</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Audit Certificates</h4>
                                <p className="text-white/90 text-sm">Tamper-proof certificates prove data has been securely erased</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Multi-Device Support</h4>
                                <p className="text-white/90 text-sm">Erase PCs, Macs, servers, and mobile devices for reuse</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Compliance Ready</h4>
                                <p className="text-white/90 text-sm">Meet R2v3, e-Stewards, and ISO 27001 requirements</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Conclusion</h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            IT asset reuse is a sustainable practice that benefits organizations financially while reducing environmental impact. By implementing certified data erasure solutions, organizations can safely repurpose IT equipment, support circular economy principles, and achieve their sustainability goals.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Enable IT Asset Reuse with D-Secure
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Securely erase data from IT assets to enable safe reuse, donation, or resale.
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
          <EngagementSection blogId="i-t-asset-reuse" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="i-t-asset-reuse" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="i-t-asset-reuse" 
            blogTitle="I T Asset Reuse" 
          />
        </Reveal>
      </section>

    </div>
  );

};

export default React.memo(ITAssetReuseBlog);






