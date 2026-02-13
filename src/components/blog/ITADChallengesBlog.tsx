import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const ITADChallengesBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getSEOForPage('blog')} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            ITAD
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            Top ITAD Challenges and How to Overcome Them
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Common challenges faced by IT Asset Disposition providers and strategies to address them effectively.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">The ITAD Industry Landscape</h2>
                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            IT Asset Disposition (ITAD) providers face unique challenges in today's rapidly evolving technology landscape. From managing diverse device types to meeting stringent compliance requirements, ITAD companies must continuously adapt to stay competitive.
                        </p>
                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            D-Secure provides the tools and solutions ITAD providers need to overcome these challenges while maximizing operational efficiency and maintaining the highest security standards.
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">Key ITAD Challenges</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3"> Data Security</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Ensuring complete data destruction across all device types while meeting compliance standards.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3"> Scalability</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Processing high volumes of devices efficiently without compromising quality.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3"> Documentation</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Generating comprehensive audit trails for every device processed.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3"> Device Diversity</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Managing erasure for HDDs, SSDs, mobile devices, and specialized equipment.
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
                            Optimize Your ITAD Operations
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Learn how D-Secure can help your ITAD business overcome challenges and improve efficiency.
                        </p>
                        <Link to="/contact" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg">
                            Contact Sales
                        </Link>
                    </div>
                </Reveal>
            </section>
        </div>
    );
};

export default ITADChallengesBlog;






